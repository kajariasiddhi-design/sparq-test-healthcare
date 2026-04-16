import React, { useMemo, useEffect, useRef } from 'react';
import { LifestyleFormData, UploadedImage, LifestyleFormSuggestions, Language, TranscribedClip } from '../types';
import { lifestyleFormTranslations } from '../data/lifestyleTranslations';
import { formTranslations, translations } from '../data/translations';
import ImageUploader from './ImageUploader.tsx';
import AudioTranscriptionManager from './AudioTranscriptionManager.tsx';
import { Section, Label, TextInput, TextArea, MultiChips, SingleChips, SuggestedInput, TranslatedText } from './FormElements.tsx';

interface LifestyleFormProps {
    form: LifestyleFormData;
    update: (path: string | string[], value: any) => void;
    lang: Language;
    isImageBased: boolean;
    packImages: UploadedImage[];
    setPackImages: (images: UploadedImage[]) => void;
    suggestions: LifestyleFormSuggestions;
    isAnalyzing: boolean;
    handleAnalyzeTranscript: () => void;
    audioRecorderRef: React.RefObject<{ stopAll: () => void }>;
    clipDuration: number;
    transcribedClips: TranscribedClip[];
    setTranscribedClips: React.Dispatch<React.SetStateAction<TranscribedClip[]>>;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    selectedSalesperson: string;
    onAcceptAllSuggestions?: () => void;
}

const LifestyleForm: React.FC<LifestyleFormProps> = ({
    form, update, lang, isImageBased, packImages, setPackImages,
    suggestions, isAnalyzing, handleAnalyzeTranscript, audioRecorderRef,
    clipDuration, transcribedClips, setTranscribedClips,
    isSubmitting, onSubmit, onCancel,
    selectedSalesperson, onAcceptAllSuggestions
}) => {
    
    // Auto-update salesperson if not matching global
    useEffect(() => {
        if (selectedSalesperson && form.salesperson !== selectedSalesperson) {
            update('salesperson', selectedSalesperson);
        }
    }, [selectedSalesperson, form.salesperson, update]);

    const handleAdObjectiveDetailsChange = (key: string, val: string) => {
        update('adObjectiveDetails', { ...form.adObjectiveDetails, [key]: val });
    };

    const handleAdMessageDetailsChange = (key: string, val: string) => {
        update('adMessageDetails', { ...form.adMessageDetails, [key]: val });
    };

    const { section1, section2, section3, section4, section5, section6, section7, section8 } = lifestyleFormTranslations;

    const activeCategories = useMemo(() => {
        const categories: Array<keyof typeof section3.q3_3.categories> = [];
        const isYouth = (form.customerAge || []).includes('15-25');
        const isOlder = (form.customerAge || []).some(a => ['26-35', '36-50', '50+'].includes(a));
        
        const isMen = form.customerGender === 'Men' || form.customerGender === 'Men and Women';
        const isWomen = form.customerGender === 'Women' || form.customerGender === 'Men and Women';

        if (isMen) {
            if (isYouth) categories.push('youth_men');
            if (isOlder) categories.push('men');
        }
        if (isWomen) {
            if (isYouth) categories.push('youth_women');
            if (isOlder) categories.push('women');
        }
        return categories;
    }, [form.customerAge, form.customerGender, section3.q3_3.categories]);

    // Filter out "Kids 6-14" from customerAgeOptions
    const filteredCustomerAgeOptions = useMemo(() => {
        const options = { ...formTranslations.section3.customerAgeOptions };
        delete (options as any)["Kids 6-14"];
        return options;
    }, []);


    return (
        <form onSubmit={onSubmit} className="space-y-6 pb-24">

            {/* AI Audio Section */}
            {!isImageBased && (
                <section className="bg-gradient-to-br from-indigo-50 to-blue-50/50 rounded-2xl border border-indigo-100 p-6 shadow-sm mb-10">
                    <AudioTranscriptionManager
                        ref={audioRecorderRef as any}
                        fullTranscript={form.fullTranscript}
                        onTranscriptChange={(t) => update('fullTranscript', t)}
                        lang={lang}
                        disabled={isImageBased}
                        clipDuration={clipDuration}
                        clips={transcribedClips}
                        setClips={setTranscribedClips}
                    />
                    {form.fullTranscript && (
                        <div className="mt-4 flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={handleAnalyzeTranscript}
                                disabled={isAnalyzing}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400"
                            >
                                {isAnalyzing ? (<div className="loader mr-2 -ml-1"></div>) : null}
                                <TranslatedText lang={lang} text={isAnalyzing ? formTranslations.audio.analysing : formTranslations.audio.analyse} />
                            </button>
                            {onAcceptAllSuggestions && Object.keys(suggestions).length > 0 && (
                                <button
                                    type="button"
                                    onClick={onAcceptAllSuggestions}
                                    className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                                >
                                    Accept All Suggestions
                                </button>
                            )}
                        </div>
                    )}
                </section>
            )}

            {/* 1. Product Showcase */}
            <Section lang={lang} kIndex={1} title={section1.title} context={section1.context}>
                <div className="space-y-6">
                    <SuggestedInput lang={lang} suggestion={suggestions.brandSpecial} onAccept={(val) => update('brandSpecial', val)}>
                        <Label qIndex="1.1" lang={lang} text={section1.q1_1.text} required />
                        <TextArea
                            lang={lang}
                            value={form.brandSpecial}
                            onChange={(val) => update('brandSpecial', val)}
                            placeholder={section1.q1_1.placeholder}
                            required
                        />
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.brands} onAccept={(val) => update('brands', val)}>
                        <Label qIndex="1.2" lang={lang} text={section1.q1_2.text} required />
                        <TextInput
                            id="q1_2_input"
                            lang={lang}
                            value={form.brands}
                            onChange={(val) => update('brands', val)}
                            placeholder={section1.q1_2.placeholder}
                            required
                        />
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.adBrand} onAccept={(val) => update('adBrand', val)}>
                        <Label qIndex="1.3" lang={lang} text={section1.q1_3.text} required />
                        <TextInput
                            lang={lang}
                            value={form.adBrand}
                            onChange={(val) => update('adBrand', val)}
                            placeholder={section1.q1_3.placeholder}
                            required
                        />
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.productName} onAccept={(val) => update('productName', val)}>
                        <Label qIndex="1.4" lang={lang} text={section1.q1_4.text} required />
                        <TextInput
                            lang={lang}
                            value={form.productName}
                            onChange={(val) => update('productName', val)}
                            placeholder={section1.q1_4.placeholder}
                            required
                        />
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.subCategory} onAccept={(val) => update('subCategory', val)}>
                        <Label lang={lang} text={section1.q1_4.subCategory} required />
                        <SingleChips
                            lang={lang}
                            options={section1.q1_4.options}
                            value={form.subCategory}
                            onChange={(val) => update('subCategory', val)}
                        />
                        {form.subCategory === 'Other' && (
                            <div className="mt-3">
                                <TextInput
                                    lang={lang}
                                    value={form.subCategoryOther || ''}
                                    onChange={(val) => update('subCategoryOther', val)}
                                    placeholder={lifestyleFormTranslations.specifyOther}
                                    required
                                />
                            </div>
                        )}
                    </SuggestedInput>
                </div>
            </Section>

            {/* 2. Origin and Heritage */}
            {!isImageBased && (
                <Section lang={lang} kIndex={2} title={section2.title}>
                    <div className="space-y-6">
                        <div>
                            <Label qIndex="2.1" lang={lang} text={section2.q2_1.text} className="mb-3" />
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <SuggestedInput lang={lang} suggestion={suggestions.founder} onAccept={(val) => update('founder', val)}>
                                    <TextInput
                                        lang={lang}
                                        value={form.founder}
                                        onChange={(val) => update('founder', val)}
                                        placeholder={section2.q2_1.placeholder_founder}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.foundedYear} onAccept={(val) => update('foundedYear', val)}>
                                    <TextInput
                                        lang={lang}
                                        value={form.foundedYear}
                                        onChange={(val) => update('foundedYear', val)}
                                        placeholder={section2.q2_1.placeholder_year}
                                    />
                                </SuggestedInput>
                            </div>
                            <Label lang={lang} text={section2.q2_1.presence} className="mb-2" />
                            <SuggestedInput lang={lang} suggestion={suggestions.brandRegions} onAccept={(val) => update('brandRegions', val)}>
                                <TextInput
                                    lang={lang}
                                    value={form.brandRegions}
                                    onChange={(val) => update('brandRegions', val)}
                                    placeholder={section2.q2_1.placeholder_presence}
                                />
                            </SuggestedInput>
                        </div>

                        <div>
                            <Label qIndex="2.2" lang={lang} text={section2.q2_2.text} className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(section2.q2_2.options).map(([key, labelText]) => (
                                    <div key={key}>
                                        <Label lang={lang} text={labelText} className="mb-2 font-medium" />
                                        <SuggestedInput
                                            lang={lang}
                                            suggestion={(suggestions as any)[`special${key}`]}
                                            onAccept={(val) => update(`special${key}`, val)}
                                        >
                                            <TextInput
                                                lang={lang}
                                                value={(form as any)[`special${key}` === 'specialDesign' ? 'specialLook' : `special${key}`] || ''}
                                                onChange={(val) => update(`special${key}` === 'specialDesign' ? 'specialLook' : `special${key}`, val)}
                                                placeholder={section2.q2_2.placeholders[key as keyof typeof section2.q2_2.placeholders]}
                                            />
                                        </SuggestedInput>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <SuggestedInput lang={lang} suggestion={suggestions.certifications} onAccept={(val) => update('certifications', val)}>
                            <Label qIndex="2.3" lang={lang} text={section2.q2_3.text} />
                            <TextInput
                                lang={lang}
                                value={form.certifications}
                                onChange={(val) => update('certifications', val)}
                                placeholder={section2.q2_3.placeholder}
                            />
                        </SuggestedInput>
                    </div>
                </Section>
            )}

            {/* 3. Target Audience */}
            {!isImageBased && (
                <Section lang={lang} kIndex={3} title={section3.title} context={section3.context}>
                    <div className="space-y-8">
                        <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
                            <Label 
                                qIndex="3A1" 
                                lang={lang} 
                                text={{
                                    en: "Primary Consumer (person who uses / wears the product)",
                                    hi: "प्राथमिक उपभोक्ता (वह व्यक्ति जो उत्पाद का उपयोग करता / पहनता है)",
                                    ta: "முதன்மை நுகர்வோர் (தயாரிப்பைப் பயன்படுத்தும் / அணியும் நபர்)",
                                    te: "ప్రాథమిక వినియోగదారు (ఉత్పత్తిని ఉపయోగించే/ధరించే వ్యక్తి)",
                                    gu: "પ્રાથમિક ઉપભોક્તા (જે વ્યક્તિ ઉત્પાદનનો ઉપયોગ કરે છે / પહેરે છે)"
                                }} 
                                className="font-semibold text-lg text-neutral-800 mb-4 block" 
                            />
                            <div className="space-y-6">
                                <SuggestedInput lang={lang} suggestion={suggestions.consumerAge} onAccept={(val) => update('consumerAge', val)}>
                                    <Label lang={lang} text={section3.q3A.age} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={formTranslations.section3.consumerAgeOptions}
                                        value={form.consumerAge}
                                        onChange={(val) => update('consumerAge', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.consumerGender} onAccept={(val) => update('consumerGender', val)}>
                                    <Label lang={lang} text={section3.q3A.gender} className="text-[15px]" />
                                    <SingleChips
                                        lang={lang}
                                        options={formTranslations.section3.genderOptions}
                                        value={form.consumerGender}
                                        onChange={(val) => update('consumerGender', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.consumerIncome} onAccept={(val) => update('consumerIncome', val)}>
                                    <Label lang={lang} text={section3.q3A.income} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={formTranslations.section3.incomeOptions}
                                        value={form.consumerIncome}
                                        onChange={(val) => update('consumerIncome', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.consumerGeography} onAccept={(val) => update('consumerGeography', val)}>
                                    <Label lang={lang} text={section3.q3A.geography} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={formTranslations.section3.geoOptions}
                                        value={form.consumerGeography}
                                        onChange={(val) => update('consumerGeography', val)}
                                    />
                                </SuggestedInput>
                            </div>
                        </div>

                        <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
                            <Label 
                                qIndex="3A2" 
                                lang={lang} 
                                text={{
                                    en: "Primary Consumer Problem",
                                    hi: "प्राथमिक उपभोक्ता समस्या",
                                    ta: "முதன்மை நுகர்வோர் பிரச்சினை",
                                    te: "ప్రాథమిక వినియోగదారు సమస్య",
                                    gu: "પ્રાથમિક ઉપભોક્તા સમસ્ય"
                                }} 
                                className="font-semibold text-lg text-neutral-800 mb-4 block" 
                            />
                            <div className="space-y-6">
                                <SuggestedInput lang={lang} suggestion={suggestions.consumerProblem} onAccept={(val) => update('consumerProblem', val)}>
                                    <Label qIndex="3A2" lang={lang} text={section3.q3_2.text} />
                                    <TextInput
                                        lang={lang}
                                        value={form.consumerProblem}
                                        onChange={(val) => update('consumerProblem', val)}
                                        placeholder={section3.q3_2.placeholder}
                                    />
                                </SuggestedInput>
                            </div>
                        </div>

                        <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
                            <Label 
                                qIndex="3B" 
                                lang={lang} 
                                text={{
                                    en: "Primary Customer (person who buys)",
                                    hi: "प्राथमिक ग्राहक (जो व्यक्ति खरीदता है)",
                                    ta: "முதன்மை வாடிக்கையாளர் (வாங்கும் நபர்)",
                                    te: "ప్రాథమిక కస్టమర్ (కొనుగోలు చేసే వ్యక్తి)",
                                    gu: "પ્રાથમિક ગ્રાહક (જે વ્યક્તિ ખરીદે છે)"
                                }} 
                                className="font-semibold text-lg text-neutral-800 mb-4 block" 
                            />
                            <div className="space-y-6">
                                <SuggestedInput lang={lang} suggestion={suggestions.customerAge} onAccept={(val) => update('customerAge', val)}>
                                    <Label lang={lang} text={section3.q3B.age} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={filteredCustomerAgeOptions}
                                        value={form.customerAge}
                                        onChange={(val) => update('customerAge', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.customerGender} onAccept={(val) => update('customerGender', val)}>
                                    <Label lang={lang} text={section3.q3B.gender} className="text-[15px]" />
                                    <SingleChips
                                        lang={lang}
                                        options={formTranslations.section3.genderOptions}
                                        value={form.customerGender}
                                        onChange={(val) => update('customerGender', val)}
                                    />
                                </SuggestedInput>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Label qIndex="3.3" lang={lang} text={section3.q3_3.text} className="mb-4 block" />
                            <SuggestedInput lang={lang} suggestion={suggestions.customerLifestyle} onAccept={(val) => update('customerLifestyle', val)}>
                                <div className="space-y-6">
                                    {activeCategories.length > 0 ? (
                                        activeCategories.map((cat) => {
                                            return (
                                                <div key={cat} className="p-4 border border-neutral-100 rounded-xl bg-slate-50 shadow-sm">
                                                    <h4 className="font-semibold text-indigo-900 mb-4 pb-2 border-b border-indigo-100 flex items-center justify-between">
                                                        <span>{section3.q3_3.categories[cat][lang] || section3.q3_3.categories[cat].en}</span>
                                                        <span className="text-xs font-normal text-indigo-400">Select up to 2</span>
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                                        {section3.q3_3.options[cat].map((opt: string) => {
                                                            const isSelected = form.customerLifestyle.includes(opt);
                                                            const selectedInCategory = form.customerLifestyle.filter(v => section3.q3_3.options[cat].includes(v)).length;
                                                            const limitReached = selectedInCategory >= 2;
                                                            const isDisabled = !isSelected && limitReached;
                                                            
                                                            const titlePart = opt.includes('(') ? opt.split('(')[0].trim() : opt;
                                                            const descPart = opt.includes('(') ? opt.split('(')[1].replace(')', '').trim() : '';
                                                            const capitalizedDesc = descPart ? descPart.charAt(0).toUpperCase() + descPart.slice(1) : '';

                                                            return (
                                                                <div 
                                                                    key={opt} 
                                                                    onClick={() => {
                                                                        if (isSelected) {
                                                                            update('customerLifestyle', form.customerLifestyle.filter(v => v !== opt));
                                                                        } else if (!limitReached) {
                                                                            update('customerLifestyle', [...form.customerLifestyle, opt]);
                                                                        }
                                                                    }}
                                                                    className={`flex flex-col rounded-xl border-2 transition-all cursor-pointer overflow-hidden bg-white shadow-sm h-full ${
                                                                        isSelected 
                                                                            ? 'border-blue-600 ring-1 ring-blue-600 scale-[1.02]' 
                                                                            : isDisabled 
                                                                                ? 'border-neutral-200 opacity-40 grayscale-[0.5]' 
                                                                                : 'border-neutral-100 hover:border-blue-300'
                                                                    }`}
                                                                >
                                                                    <div className="aspect-square w-full bg-slate-50 flex items-center justify-center text-slate-400 text-[10px] text-center p-4">
                                                                        {/* Placeholder for psychographic imagery */}
                                                                        <div className="p-2 border border-slate-200 rounded text-[9px] uppercase tracking-tighter">IMAGE PREVIEW</div>
                                                                    </div>
                                                                    <div className="p-3">
                                                                        <div className="font-bold text-[13px] text-neutral-900 leading-tight">
                                                                            {titlePart}
                                                                        </div>
                                                                        <div className="text-[11px] text-neutral-500 leading-tight mt-1">
                                                                            {capitalizedDesc}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="p-8 border-2 border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-neutral-400 bg-neutral-50">
                                            <p className="text-sm font-medium">Please select Primary Customer Age and Gender first</p>
                                            <p className="text-xs mt-1">Options will appear based on your selection</p>
                                        </div>
                                    )}
                                </div>
                            </SuggestedInput>
                        </div>
                    </div>
                </Section>
            )}

            {/* 4. Brand Usage */}
            {!isImageBased && (
                <Section lang={lang} kIndex={4} title={section4.title}>
                    <div className="space-y-6">
                        <SuggestedInput lang={lang} suggestion={suggestions.usageOccasions} onAccept={(val) => update('usageOccasions', val)}>
                            <Label qIndex="4.1" lang={lang} text={section4.q4_1.text} />
                            <TextInput
                                lang={lang}
                                value={form.usageOccasions}
                                onChange={(val) => update('usageOccasions', val)}
                                placeholder={section4.q4_1.placeholder}
                            />
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.shoppingExperience} onAccept={(val) => update('shoppingExperience', val)}>
                            <Label qIndex="4.2" lang={lang} text={section4.q4_2.text} />
                            <TextArea
                                lang={lang}
                                value={form.shoppingExperience}
                                onChange={(val) => update('shoppingExperience', val)}
                                placeholder={section4.q4_2.placeholder}
                            />
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.shoppingCompany} onAccept={(val) => update('shoppingCompany', val)}>
                            <Label qIndex="4.3" lang={lang} text={section4.q4_3.text} />
                            <MultiChips
                                lang={lang}
                                options={section4.q4_3.options}
                                value={form.shoppingCompany}
                                onChange={(val) => update('shoppingCompany', val)}
                            />
                        </SuggestedInput>
                    </div>
                </Section>
            )}

            {/* 5. Benefit & Experience */}
            {!isImageBased && (
                <Section lang={lang} kIndex={5} title={section5.title}>
                    <div className="space-y-6">
                        <SuggestedInput lang={lang} suggestion={suggestions.keyBenefits} onAccept={(val) => update('keyBenefits', val)}>
                            <Label qIndex="5.1" lang={lang} text={section5.q5_1.text} />
                            <TextArea
                                lang={lang}
                                value={form.keyBenefits}
                                onChange={(val) => update('keyBenefits', val)}
                                placeholder={section5.q5_1.placeholder}
                            />
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.competitorDifference} onAccept={(val) => update('competitorDifference', val)}>
                            <Label qIndex="5.2" lang={lang} text={section5.q5_2.text} />
                            <TextArea
                                lang={lang}
                                value={form.competitorDifference}
                                onChange={(val) => update('competitorDifference', val)}
                                placeholder={section5.q5_2.placeholder}
                            />
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.emotionalOutcome} onAccept={(val) => update('emotionalOutcome', val)}>
                            <Label qIndex="5.3" lang={lang} text={section5.q5_3.text} className="mb-3" />
                            <div className="flex flex-wrap gap-2 mb-4">
                                {section5.q5_3.options.map(opt => {
                                    const currentText = form.emotionalOutcome || "";
                                    const isSelected = currentText.includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                if (isSelected) {
                                                    const newVal = (typeof currentText === 'string' ? currentText : "")
                                                        .split(',')
                                                        .map(s => s.trim())
                                                        .filter(s => s !== opt)
                                                        .join(', ');
                                                    update('emotionalOutcome', newVal);
                                                } else {
                                                    const textStr = typeof currentText === 'string' ? currentText : "";
                                                    const newVal = textStr 
                                                        ? `${textStr.trim().endsWith(',') ? textStr.trim() : textStr.trim() + ','} ${opt}`
                                                        : opt;
                                                    update('emotionalOutcome', newVal.replace(/,\s*,/g, ', ').trim());
                                                }
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-neutral-100 text-neutral-800 border-transparent hover:bg-neutral-200'}`}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                            <TextArea
                                lang={lang}
                                value={form.emotionalOutcome}
                                onChange={(val) => update('emotionalOutcome', val)}
                                placeholder={section5.q5_3.placeholder}
                            />
                        </SuggestedInput>
                    </div>
                </Section>
            )}

            {/* 6. Competition */}
            {!isImageBased && (
                <Section lang={lang} kIndex={6} title={section6.title}>
                    <SuggestedInput lang={lang} suggestion={suggestions.competitors} onAccept={(val) => update('competitors', val)}>
                        <Label qIndex="6.1" lang={lang} text={section6.q6_1.text} />
                        <TextArea
                            lang={lang}
                            value={form.competitors}
                            onChange={(val) => update('competitors', val)}
                            placeholder={section6.q6_1.placeholder}
                            rows={3}
                        />
                    </SuggestedInput>
                </Section>
            )}

            {/* 7. Desired Perception */}
            {!isImageBased && (
                <Section lang={lang} kIndex={7} title={section7.title}>
                    <div className="space-y-6">
                        <div>
                            <Label qIndex="7.1" lang={lang} text={section7.q7_1.text} className="mb-4 text-base" />
                            <div className="space-y-4 pl-4 border-l-2 border-indigo-100">
                                <SuggestedInput lang={lang} suggestion={suggestions.desiredTone} onAccept={(val) => update('desiredTone', val)}>
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                        <Label lang={lang} text={section7.q7_1.tone} className="text-sm font-semibold text-indigo-900/70 min-w-[100px]" />
                                        <div className="flex flex-wrap gap-2">
                                            {section7.q7_1.options.tone.map(opt => (
                                                <button
                                                    key={opt} type="button"
                                                    onClick={() => update('desiredTone', form.desiredTone === opt ? "" : opt)}
                                                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${form.desiredTone === opt ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </SuggestedInput>

                                <SuggestedInput lang={lang} suggestion={suggestions.desiredWorld} onAccept={(val) => update('desiredWorld', val)}>
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                        <Label lang={lang} text={section7.q7_1.world} className="text-sm font-semibold text-indigo-900/70 min-w-[100px]" />
                                        <div className="flex flex-wrap gap-2">
                                            {section7.q7_1.options.world.map(opt => (
                                                <button
                                                    key={opt} type="button"
                                                    onClick={() => update('desiredWorld', form.desiredWorld === opt ? "" : opt)}
                                                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${form.desiredWorld === opt ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </SuggestedInput>

                                <SuggestedInput lang={lang} suggestion={suggestions.desiredAttributes} onAccept={(val) => update('desiredAttributes', val)}>
                                    <div className="flex flex-wrap items-start gap-x-8 gap-y-2">
                                        <Label lang={lang} text={section7.q7_1.attributes} className="text-sm font-semibold text-indigo-900/70 min-w-[100px] mt-1" />
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {section7.q7_1.options.attributes.map(opt => {
                                                    const active = form.desiredAttributes.includes(opt);
                                                    return (
                                                        <button
                                                            key={opt} type="button"
                                                            onClick={() => {
                                                                if (active) update('desiredAttributes', form.desiredAttributes.filter(v => v !== opt));
                                                                else if (form.desiredAttributes.length < 2) update('desiredAttributes', [...form.desiredAttributes, opt]);
                                                            }}
                                                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${active ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'}`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                            {form.desiredAttributes.includes('Other') && (
                                                <TextInput
                                                    lang={lang}
                                                    value={form.desiredAttributesOther || ''}
                                                    onChange={(val) => update('desiredAttributesOther', val)}
                                                    placeholder={lifestyleFormTranslations.specifyOther}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </SuggestedInput>
                            </div>
                        </div>

                        <SuggestedInput lang={lang} suggestion={suggestions.brandAsPerson} onAccept={(val) => update('brandAsPerson', val)}>
                            <Label qIndex="7.2" lang={lang} text={section7.q7_2.text} />
                            <div className="flex flex-wrap gap-2 mt-3">
                                {section7.q7_2.options.filter(o => o !== 'Other').map(opt => (
                                    <button
                                        key={opt} type="button"
                                        onClick={() => update('brandAsPerson', form.brandAsPerson === opt ? "" : opt)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                                            form.brandAsPerson === opt 
                                                ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' 
                                                : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.adObjectives} onAccept={(val) => update('adObjectives', val)}>
                            <Label qIndex="7.3" lang={lang} text={section7.q7_3.text} />
                            <div className="space-y-4 mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {section7.q7_3.options.map(opt => {
                                        const active = form.adObjectives.includes(opt);
                                        return (
                                            <button
                                                key={opt} type="button"
                                                onClick={() => {
                                                    if (active) {
                                                        update('adObjectives', form.adObjectives.filter(v => v !== opt));
                                                        const newDetails = { ...form.adObjectiveDetails };
                                                        delete newDetails[opt];
                                                        update('adObjectiveDetails', newDetails);
                                                    } else {
                                                        update('adObjectives', [...form.adObjectives, opt]);
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${active ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-neutral-300'}`}
                                            >
                                                {opt}
                                            </button>
                                        )
                                    })}
                                </div>
                                 {form.adObjectives.map(obj => (
                                    <div key={obj} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">{obj}</label>
                                        <TextInput
                                            lang={lang}
                                            value={form.adObjectiveDetails[obj] || ''}
                                            onChange={(val) => handleAdObjectiveDetailsChange(obj, val)}
                                            placeholder={section7.q7_3.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.adImportantMessages} onAccept={(val) => update('adImportantMessages', val)}>
                            <Label qIndex="7.4" lang={lang} text={section7.q7_4.text} />
                            <div className="space-y-4 mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {section7.q7_4.options.map(opt => {
                                        const active = form.adImportantMessages.includes(opt);
                                        return (
                                            <button
                                                key={opt} type="button"
                                                onClick={() => {
                                                    if (active) {
                                                        update('adImportantMessages', form.adImportantMessages.filter(v => v !== opt));
                                                        const newDetails = { ...form.adMessageDetails };
                                                        delete newDetails[opt];
                                                        update('adMessageDetails', newDetails);
                                                    } else {
                                                        update('adImportantMessages', [...form.adImportantMessages, opt]);
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${active ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-neutral-300'}`}
                                            >
                                                {opt}
                                            </button>
                                        )
                                    })}
                                </div>
                                 {form.adImportantMessages.map(msg => (
                                    <div key={msg} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">{msg}</label>
                                        <TextInput
                                            lang={lang}
                                            value={form.adMessageDetails[msg] || ''}
                                            onChange={(val) => handleAdMessageDetailsChange(msg, val)}
                                            placeholder={section7.q7_4.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>
                        </SuggestedInput>

                        <div>
                            <Label qIndex="7.5" lang={lang} text={section7.q7_5.text} />
                            <div className="mt-3">
                                <SingleChips
                                    lang={lang}
                                    options={section7.q7_5.options}
                                    value={form.featureStore}
                                    onChange={(val) => update('featureStore', val)}
                                />
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            {/* Salesperson & Images Upload Section */}
            <Section lang={lang} title={lifestyleFormTranslations.section8.title}>
                <div className="space-y-6">
                    <div>
                        <Label lang={lang} text={section8.salesperson} required className="mb-2" />
                        <div className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-[15px] bg-slate-50 text-slate-700 font-medium">
                            {form.salesperson || <span className="text-slate-400">Selected from start screen</span>}
                        </div>
                    </div>
                    <div>
                        <Label lang={lang} text={section8.customerID} className="mb-2" />
                        <TextInput
                            lang={lang}
                            value={form.customerID || ''}
                            onChange={(val) => update('customerID', val)}
                            placeholder={section8.customerID}
                        />
                    </div>
                    
                    <div className="pt-4">
                        <Label lang={lang} text={section8.images} className="mb-4" />
                        <ImageUploader 
                            uploadedImages={packImages} 
                            onImagesChange={setPackImages} 
                            lang={lang} 
                        />
                    </div>
                </div>
            </Section>

            <div className="mt-6">
                <button type="submit" disabled={isSubmitting} className="w-full h-12 inline-flex justify-center items-center px-4 border border-teal-600 text-sm font-bold rounded-md shadow-sm text-teal-700 bg-white hover:bg-teal-600 hover:text-white disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 transition-colors uppercase tracking-wide">
                    {isSubmitting ? <TranslatedText lang={lang} text={translations.submitting} /> : <TranslatedText lang={lang} text={translations.submitToWebhook} />}
                </button>
                {isSubmitting && (
                    <button type="button" onClick={onCancel} className="w-full mt-3 h-12 inline-flex justify-center items-center px-4 border border-slate-300 text-sm font-bold rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 uppercase tracking-wide">
                        <TranslatedText lang={lang} text={translations.cancel} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default LifestyleForm;
