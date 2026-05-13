import React, { useEffect, useMemo } from 'react';
import { RetailFormData, UploadedImage, RetailFormSuggestions, Language, TranscribedClip } from '../types';
import { retailFormTranslations } from '../data/retailTranslations';
import { formTranslations, translations } from '../data/translations';
import ImageUploader from './ImageUploader.tsx';
import AudioTranscriptionManager from './AudioTranscriptionManager.tsx';
import { Section, Label, TextInput, TextArea, MultiChips, SingleChips, SuggestedInput, TranslatedText } from './FormElements.tsx';
import { psychographicImageMap } from '../data/lifestyleRetailPsychographics';

interface RetailFormProps {
    form: RetailFormData;
    update: (path: string | string[], value: any) => void;
    lang: Language;
    isImageBased: boolean;
    packImages: UploadedImage[];
    setPackImages: (images: UploadedImage[]) => void;
    suggestions: RetailFormSuggestions;
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

const RetailForm: React.FC<RetailFormProps> = ({
    form, update, lang, isImageBased, packImages, setPackImages,
    suggestions, isAnalyzing, handleAnalyzeTranscript, audioRecorderRef,
    clipDuration, transcribedClips, setTranscribedClips,
    isSubmitting, onSubmit, onCancel,
    selectedSalesperson, onAcceptAllSuggestions
}) => {

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

    const { section1, section2, section3, section4, section5, section6, section7, section8 } = retailFormTranslations;

    // We get the Lifestyle & Belief options as required by user
    const lifestyleOptions = [
        "Deal-Driven Family",
        "One-Stop Shopper",
        "Experience Seeker",
        "Quality & Trust Seeker",
        "Aspirational Shopper",
        "Planned Bulk Buyer"
    ];


    const activeCategories = useMemo(() => {
        const categories: string[] = [];
        
        const hasDemographics = (form.shopperAge && form.shopperAge.length > 0) || 
                               form.shopperGender ||
                               form.otherCustomerSegment === 'Kids';

        if (!hasDemographics) return [];

        if (form.otherCustomerSegment === 'Kids') {
            categories.push('kids');
        }
        
        const ages = [...(form.shopperAge || [])];
        const gender = form.shopperGender;
        const isMen = gender === 'Men' || gender === 'Men and Women';
        const isWomen = gender === 'Women' || gender === 'Men and Women';
        
        if (isWomen && ages.includes('15-21')) categories.push('young_girls');
        if (isMen && ages.includes('15-21')) categories.push('young_boys');
        if (isWomen && ages.includes('22-30')) categories.push('young_women');
        if (isMen && ages.includes('22-30')) categories.push('young_men');
        if (isWomen && (ages.includes('31-50') || ages.includes('50+'))) categories.push('women');
        if (isMen && (ages.includes('31-50') || ages.includes('50+'))) categories.push('men');
        
        return Array.from(new Set(categories));
    }, [form.otherCustomerSegment, form.shopperAge, form.shopperGender]);

    return (
        <form onSubmit={onSubmit} className="space-y-6 pb-24">
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

                    <SuggestedInput lang={lang} suggestion={suggestions.storeName} onAccept={(val) => update('storeName', val)}>
                        <Label qIndex="1.2" lang={lang} text={section1.q1_2.text} required />
                        <TextInput
                            id="q1_2_input"
                            lang={lang}
                            value={form.storeName}
                            onChange={(val) => update('storeName', val)}
                            placeholder={section1.q1_2.placeholder}
                            required
                        />
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.primaryCategories} onAccept={(val) => update('primaryCategories', val)}>
                        <Label qIndex="1.3" lang={lang} text={section1.q1_3.text} required />
                        <MultiChips
                            lang={lang}
                            options={section1.q1_3.options}
                            value={form.primaryCategories}
                            onChange={(val) => update('primaryCategories', val)}
                        />
                        {form.primaryCategories.includes("Others") && (
                            <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                <TextInput
                                    lang={lang}
                                    value={form.primaryCategoriesOther || ''}
                                    onChange={(val) => update('primaryCategoriesOther', val)}
                                    placeholder={section1.q1_3.placeholder_other}
                                    required
                                />
                            </div>
                        )}
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.storeCountRegions} onAccept={(val) => update('storeCountRegions', val)}>
                        <Label qIndex="1.4" lang={lang} text={section1.q1_4.text} required />
                        <TextInput
                            lang={lang}
                            value={form.storeCountRegions}
                            onChange={(val) => update('storeCountRegions', val)}
                            placeholder={section1.q1_4.placeholder}
                            required
                        />
                    </SuggestedInput>
                </div>
            </Section>

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
                            <SuggestedInput lang={lang} suggestion={suggestions.regions} onAccept={(val) => update('regions', val)}>
                                <TextInput
                                    lang={lang}
                                    value={form.regions}
                                    onChange={(val) => update('regions', val)}
                                    placeholder={section2.q2_1.placeholder_presence}
                                />
                            </SuggestedInput>
                        </div>

                        <div>
                            <Label qIndex="2.2" lang={lang} text={section2.q2_2.text} className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(section2.q2_2.options).map(([key, labelText]) => {
                                    const fieldMap: { [key: string]: keyof RetailFormData } = {
                                        "Range / Variety": "specialRange",
                                        "Store Experience / Ambience": "specialAmbience",
                                        "Value / Pricing": "specialValue",
                                        "Service / Trust": "specialService",
                                        "Others": "specialOthers"
                                    };
                                    const field = fieldMap[key];
                                    return (
                                        <div key={key}>
                                            <Label lang={lang} text={labelText} className="mb-1 font-medium text-sm text-neutral-700" />
                                            <SuggestedInput
                                                lang={lang}
                                                suggestion={(suggestions as any)[field]}
                                                onAccept={(val) => update(field, val)}
                                            >
                                                <TextInput
                                                    lang={lang}
                                                    value={(form as any)[field] || ''}
                                                    onChange={(val) => update(field, val)}
                                                    placeholder={section2.q2_2.placeholders[key as keyof typeof section2.q2_2.placeholders]}
                                                />
                                            </SuggestedInput>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <SuggestedInput lang={lang} suggestion={suggestions.recognitions} onAccept={(val) => update('recognitions', val)}>
                            <Label qIndex="2.3" lang={lang} text={section2.q2_3.text} />
                            <TextInput
                                lang={lang}
                                value={form.recognitions}
                                onChange={(val) => update('recognitions', val)}
                                placeholder={section2.q2_3.placeholder}
                            />
                        </SuggestedInput>
                    </div>
                </Section>
            )}

            {!isImageBased && (
                <Section lang={lang} kIndex={3} title={section3.title}>
                    <div className="space-y-6">
                        <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
                            <Label 
                                qIndex="3.1" 
                                lang={lang} 
                                text={{
                                    en: "Primary Shopper Profile",
                                    hi: "प्राथमिक खरीदार प्रोफ़ाइल",
                                    ta: "முதன்மை ஷாப்பர் விவரக்குறிப்பு",
                                    te: "ప్రాథమిక షాపర్ ప్రొఫైల్",
                                    gu: "પ્રાથમિક દુકાનદાર પ્રોફાઇલ"
                                }} 
                                className="font-semibold text-lg text-neutral-800 mb-4 block" 
                            />
                            <div className="space-y-4">
                                <SuggestedInput lang={lang} suggestion={suggestions.shopperAge} onAccept={(val) => update('shopperAge', val)}>
                                    <Label lang={lang} text={section3.q3A.age} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={section3.consumerAgeOptions}
                                        value={form.shopperAge}
                                        onChange={(val) => update('shopperAge', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.shopperGender} onAccept={(val) => update('shopperGender', val)}>
                                    <Label lang={lang} text={section3.q3A.gender} className="text-[15px]" />
                                    <SingleChips
                                        lang={lang}
                                        options={section3.genderOptions}
                                        value={form.shopperGender}
                                        onChange={(val) => update('shopperGender', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.shopperIncome} onAccept={(val) => update('shopperIncome', val)}>
                                    <Label lang={lang} text={section3.q3A.income} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={section3.incomeOptions}
                                        value={form.shopperIncome}
                                        onChange={(val) => update('shopperIncome', val)}
                                    />
                                </SuggestedInput>
                                                                <SuggestedInput lang={lang} suggestion={suggestions.shopperGeography} onAccept={(val) => update('shopperGeography', val)}>
                                    <Label lang={lang} text={section3.q3A.geography} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={section3.geoOptions}
                                        value={form.shopperGeography}
                                        onChange={(val) => update('shopperGeography', val)}
                                    />
                                </SuggestedInput>

                                <div className="mt-6">
                                    <Label lang={lang} text={section3.q3B.text} className="text-[15px]" />
                                    <SingleChips
                                        lang={lang}
                                        options={section3.q3B.options}
                                        value={form.otherCustomerSegment || ''}
                                        onChange={(val) => update('otherCustomerSegment', val)}
                                    />
                                    {form.otherCustomerSegment === 'Others' && (
                                        <div className="mt-3">
                                            <TextInput
                                                lang={lang}
                                                value={form.otherCustomerSegmentBrief || ''}
                                                onChange={(val) => update('otherCustomerSegmentBrief', val)}
                                                placeholder={section3.q3B.placeholder}
                                                required
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
                            <SuggestedInput lang={lang} suggestion={suggestions.shopperCoreNeed} onAccept={(val) => update('shopperCoreNeed', val)}>
                                <Label qIndex="3.2" lang={lang} text={section3.q3_2.text} />
                                <TextInput
                                    lang={lang}
                                    value={form.shopperCoreNeed}
                                    onChange={(val) => update('shopperCoreNeed', val)}
                                    placeholder={section3.q3_2.placeholder}
                                />
                            </SuggestedInput>
                        </div>

                                                <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
                                <SuggestedInput lang={lang} suggestion={suggestions.shopperLifestyle} onAccept={(val) => update('shopperLifestyle', val)}>
                                    <Label qIndex="3.3" lang={lang} text={section3.q3_3.text} className="mb-4 block" />
                                    <div className="space-y-6">
                                        {activeCategories.length > 0 ? (
                                        activeCategories.map((cat) => {
                                            return (
                                                <div key={cat} className="p-4 border border-neutral-100 rounded-xl bg-slate-50 shadow-sm">
                                                    <h4 className="font-semibold text-indigo-900 mb-4 pb-2 border-b border-indigo-100 flex items-center justify-between">
                                                        <span>{section3.q3_3.categories[cat] ? (section3.q3_3.categories[cat][lang] || section3.q3_3.categories[cat].en) : cat}</span>
                                                        <span className="text-xs font-normal text-indigo-400">Select up to 3</span>
                                                    </h4>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                        {section3.q3_3.options[cat] && section3.q3_3.options[cat].map((opt: string) => {
                                                            const isSelected = form.shopperLifestyle.includes(opt);
                                                            const selectedInCategory = form.shopperLifestyle.filter(v => section3.q3_3.options[cat].includes(v)).length;
                                                            const limitReached = selectedInCategory >= 3;
                                                            const isDisabled = !isSelected && limitReached;
                                                            
                                                            const titlePart = opt.includes('(') ? opt.split('(')[0].trim() : opt;
                                                            const descPart = opt.includes('(') ? opt.split('(')[1].replace(')', '').trim() : '';
                                                            const capitalizedDesc = descPart ? descPart.charAt(0).toUpperCase() + descPart.slice(1) : '';

                                                            return (
                                                                <button
                                                                    key={opt}
                                                                    type="button"
                                                                    disabled={isDisabled}
                                                                    onClick={() => {
                                                                        if (isSelected) {
                                                                            update('shopperLifestyle', form.shopperLifestyle.filter(v => v !== opt));
                                                                        } else if (!limitReached) {
                                                                            update('shopperLifestyle', [...form.shopperLifestyle, opt]);
                                                                        }
                                                                    }}
                                                                    className={`flex flex-col text-left overflow-hidden rounded-xl border-2 transition-all ${
                                                                        isSelected 
                                                                            ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600 shadow-sm' 
                                                                            : isDisabled 
                                                                                ? 'border-neutral-100 opacity-50 cursor-not-allowed bg-neutral-50' 
                                                                                : 'border-white bg-white shadow-sm hover:border-indigo-200 hover:shadow-md'
                                                                    }`}
                                                                >
                                                                    <div className="aspect-[4/3] w-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 overflow-hidden">
                                                                        {psychographicImageMap[opt] ? (
                                                                            <img src={psychographicImageMap[opt]} alt={titlePart} className="w-full h-full object-contain" />
                                                                        ) : (
                                                                            <div className="p-2 border border-slate-200 rounded text-[9px] uppercase tracking-tighter">IMAGE PREVIEW</div>
                                                                        )}
                                                                    </div>
                                                                    <div className="p-3">
                                                                    <div className={`font-bold text-[13px] leading-tight mb-1 ${isSelected ? 'text-indigo-900' : 'text-neutral-800'}`}>
                                                                        {titlePart}
                                                                    </div>
                                                                    {capitalizedDesc && (
                                                                        <div className={`text-[11px] leading-tight ${isSelected ? 'text-indigo-700 font-medium' : 'text-neutral-500'}`}>
                                                                            {capitalizedDesc}
                                                                        </div>
                                                                    )}
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })
                                        ) : (
                                            <div className="p-8 border-2 border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-neutral-400 bg-neutral-50">
                                                <p className="text-sm font-medium">Please select Primary Shopper Age and Gender first</p>
                                                <p className="text-xs mt-1">Options will appear based on your selection</p>
                                            </div>
                                        )}
                                    </div>
                                </SuggestedInput>
                            </div>

                                                                        <SuggestedInput lang={lang} suggestion={suggestions.shoppingCompany} onAccept={(val) => update('shoppingCompany', val)}>
                            <Label qIndex="3.4" lang={lang} text={section3.q3_4.text} />
                            <MultiChips
                                lang={lang}
                                options={section3.q3_4.options}
                                value={form.shoppingCompany || []}
                                onChange={(val) => update('shoppingCompany', val)}
                            />
                            {form.shoppingCompany?.includes('Others') && (
                                <div className="mt-3">
                                    <TextInput
                                        lang={lang}
                                        value={form.shoppingCompanyOther || ''}
                                        onChange={(val) => update('shoppingCompanyOther', val)}
                                        placeholder={retailFormTranslations.describeBriefly || 'Describe briefly'}
                                        required
                                    />
                                </div>
                            )}
                        </SuggestedInput>
                    </div>
                </Section>
            )}

            {!isImageBased && (
                <Section lang={lang} kIndex={4} title={section4.title}>
                    <div className="space-y-6">
                        <SuggestedInput lang={lang} suggestion={suggestions.shopperJourney} onAccept={(val) => update('shopperJourney', val)}>
                            <Label qIndex="4.1" lang={lang} text={section4.q4_1.text} />
                            <TextArea
                                lang={lang}
                                value={form.shopperJourney}
                                onChange={(val) => update('shopperJourney', val)}
                                placeholder={section4.q4_1.placeholder}
                            />
                        </SuggestedInput>

                                                                        <SuggestedInput lang={lang} suggestion={suggestions.shoppingOccasion} onAccept={(val) => update('shoppingOccasion', val)}>
                            <Label qIndex="4.2" lang={lang} text={section4.q4_2.text} />
                            <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {section4.q4_2.options.map(opt => {
                                        const active = form.shoppingOccasion.includes(opt);
                                        return (
                                            <button
                                                key={opt} type="button"
                                                onClick={() => {
                                                    if (active) update('shoppingOccasion', form.shoppingOccasion.filter(v => v !== opt));
                                                    else if (form.shoppingOccasion.length < 2) update('shoppingOccasion', [...form.shoppingOccasion, opt]);
                                                    else update('shoppingOccasion', [...form.shoppingOccasion.slice(1), opt]);
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${active ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-neutral-300'}`}
                                            >
                                                {opt}
                                            </button>
                                        )
                                    })}
                                </div>
                                {form.shoppingOccasion.includes('Other') && (
                                    <div className="mt-3">
                                        <TextInput
                                            lang={lang}
                                            value={form.shoppingOccasionOther || ''}
                                            onChange={(val) => update('shoppingOccasionOther', val)}
                                            placeholder={section4.q4_2.placeholder}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </SuggestedInput>
                    </div>
                </Section>
            )}

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

                        <SuggestedInput lang={lang} suggestion={suggestions.competitorStandout} onAccept={(val) => update('competitorStandout', val)}>
                            <Label qIndex="5.2" lang={lang} text={section5.q5_2.text} />
                            <TextArea
                                lang={lang}
                                value={form.competitorStandout}
                                onChange={(val) => update('competitorStandout', val)}
                                placeholder={section5.q5_2.placeholder}
                            />
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.shopperFeel} onAccept={(val) => update('shopperFeel', val)}>
                            <Label qIndex="5.3" lang={lang} text={section5.q5_3.text} className="mb-3" />
                            <div className="flex flex-wrap gap-2 mb-4">
                                {section5.q5_3.options.map(opt => {
                                    const currentText = form.shopperFeel || "";
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
                                                    update('shopperFeel', newVal);
                                                } else {
                                                    const textStr = typeof currentText === 'string' ? currentText : "";
                                                    const newVal = textStr 
                                                        ? `${textStr.trim().endsWith(',') ? textStr.trim() : textStr.trim() + ','} ${opt}`
                                                        : opt;
                                                    update('shopperFeel', newVal.replace(/,\s*,/g, ', ').trim());
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
                                value={form.shopperFeel}
                                onChange={(val) => update('shopperFeel', val)}
                                placeholder={section5.q5_3.placeholder}
                            />
                        </SuggestedInput>
                    </div>
                </Section>
            )}

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
                            </div>
                        </div>

                        <SuggestedInput lang={lang} suggestion={suggestions.desiredPerson} onAccept={(val) => update('storeAsPerson', val)}>
                            <Label qIndex="7.2" lang={lang} text={section7.q7_2.text} />
                            <div className="mt-3">
                                <SingleChips
                                    lang={lang}
                                    options={section7.q7_2.options}
                                    value={form.storeAsPerson}
                                    onChange={(val) => update('storeAsPerson', val)}
                                />
                                {form.storeAsPerson === 'Other' && (
                                    <div className="mt-3">
                                        <TextInput
                                            lang={lang}
                                            value={form.storeAsPersonOther || ''}
                                            onChange={(val) => update('storeAsPersonOther', val)}
                                            placeholder={section7.q7_2.placeholder}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.adObjective} onAccept={(val) => update('adObjective', val)}>
                            <Label qIndex="7.3" lang={lang} text={section7.q7_3.text} />
                            <div className="space-y-4 mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {section7.q7_3.options.map(opt => {
                                        const active = (form.adObjectives || []).includes(opt);
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
                                                        update('adObjectives', [...(form.adObjectives || []), opt]);
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${active ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-neutral-300'}`}
                                            >
                                                {opt}
                                            </button>
                                        )
                                    })}
                                </div>
                                 {(form.adObjectives || []).map(obj => (
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
                                        const active = (form.adImportantMessages || []).includes(opt);
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
                                                        update('adImportantMessages', [...(form.adImportantMessages || []), opt]);
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${active ? 'bg-neutral-900 text-white shadow-sm border-neutral-900' : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-neutral-300'}`}
                                            >
                                                {opt}
                                            </button>
                                        )
                                    })}
                                </div>
                                 {(form.adImportantMessages || []).map(msg => (
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
                                    value={form.ongoingOffer}
                                    onChange={(val) => update('ongoingOffer', val)}
                                />
                                {form.ongoingOffer === 'Yes' && (
                                    <div className="mt-3">
                                        <TextInput
                                            lang={lang}
                                            value={form.offerDetails || ''}
                                            onChange={(val) => update('offerDetails', val)}
                                            placeholder={section7.q7_5.placeholder}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            {/* Salesperson & Images Upload Section */}
            <Section lang={lang} title={retailFormTranslations.section8.title}>
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

                    <div>
                        <Label lang={lang} text={{
                            en: "If the brand has a list of stores, please include the link of the stores list here",
                            hi: "यदि ब्रांड के पास स्टोर की सूची है, तो कृपया यहां स्टोर सूची का लिंक शामिल करें",
                            ta: "பிராண்டில் கடைகளின் பட்டியல் இருந்தால், தயவுசெய்து கடைகளின் பட்டியலின் இணைப்பை இங்கே சேர்க்கவும்",
                            te: "బ్రాండ్‌లో స్టోర్‌ల జాబితా ఉంటే, దయచేసి స్టోర్‌ల జాబితా లింక్‌ను ఇక్కడ చేర్చండి",
                            gu: "જો બ્રાન્ડ પાસે સ્ટોર્સની સૂચિ હોય, તો કૃપા કરીને અહીં સ્ટોર્સની સૂચિની લિંક શામેલ કરો"
                        }} />
                        <TextInput
                            lang={lang}
                            value={form.storesListLink || ""}
                            onChange={(val) => update("storesListLink", val)}
                            placeholder="Paste link of store list here"
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

export default RetailForm;
