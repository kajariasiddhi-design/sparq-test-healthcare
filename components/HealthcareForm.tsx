import React, { useEffect, useRef } from 'react';
import { acceptWithFollowUps, describeFollowUps } from '../utils';
import { HealthcareFormData, UploadedImage, HealthcareFormSuggestions, Language, TranscribedClip } from '../types';
import { healthcareFormTranslations } from '../data/healthcareTranslations';
import { formTranslations, translations } from '../data/translations';
import ImageUploader from './ImageUploader.tsx';
import AudioTranscriptionManager from './AudioTranscriptionManager.tsx';
import SearchableMultiSelect from './SearchableMultiSelect.tsx';
import { Section, Label, TextInput, TextArea, MultiChips, SingleChips, SuggestedInput, TranslatedText } from './FormElements.tsx';

interface HealthcareFormProps {
    form: HealthcareFormData;
    update: (path: string | string[], value: any) => void;
    lang: Language;
    isImageBased: boolean;
    packImages: UploadedImage[];
    setPackImages: (images: UploadedImage[]) => void;
    suggestions: HealthcareFormSuggestions;
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

const LIFESTYLE_LIMIT = 3;

const HealthcareForm: React.FC<HealthcareFormProps> = ({
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

    // Move the cursor into the "Others" box as soon as Others is picked in Q3.2
    const hadTreatmentsOther = useRef(form.treatments.includes('Others'));
    useEffect(() => {
        const hasOther = form.treatments.includes('Others');
        if (hasOther && !hadTreatmentsOther.current) {
            document.getElementById('q3_2_other_input')?.focus();
        }
        hadTreatmentsOther.current = hasOther;
    }, [form.treatments]);

    const { section1, section2, section3, section4, section5, section6, section7 } = healthcareFormTranslations;

    // Unlike the other categories, lifestyle options are not tied to the patient's age or
    // gender: a 7-year-old patient does not choose the hospital, the decision maker does.
    const lifestyleCount = form.decisionMakerLifestyle.length;

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

            {/* 1. Hospitals / healthcare service Showcase */}
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

                    <SuggestedInput lang={lang} suggestion={suggestions.hospitalName} onAccept={(val) => update('hospitalName', val)}>
                        <Label qIndex="1.2" lang={lang} text={section1.q1_2.text} required />
                        <TextInput
                            id="q1_2_input"
                            lang={lang}
                            value={form.hospitalName}
                            onChange={(val) => update('hospitalName', val)}
                            placeholder={section1.q1_2.placeholder}
                            required
                        />
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.facilityCountRegions} onAccept={(val) => update('facilityCountRegions', val)}>
                        <Label qIndex="1.3" lang={lang} text={section1.q1_3.text} required />
                        <TextInput
                            lang={lang}
                            value={form.facilityCountRegions}
                            onChange={(val) => update('facilityCountRegions', val)}
                            placeholder={section1.q1_3.placeholder}
                            required
                        />
                    </SuggestedInput>

                    <SuggestedInput lang={lang} suggestion={suggestions.primarySpecialties} onAccept={(val) => update('primarySpecialties', val)}>
                        <Label qIndex="1.4" lang={lang} text={section1.q1_4.text} required />
                        <TextInput
                            lang={lang}
                            value={form.primarySpecialties}
                            onChange={(val) => update('primarySpecialties', val)}
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
                            <div className="grid grid-cols-2 gap-4">
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
                        </div>

                        <div>
                            <Label qIndex="2.2" lang={lang} text={section2.q2_2.text} className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(section2.q2_2.options).map(([key, labelText]) => {
                                    const fieldMap: { [key: string]: keyof HealthcareFormData } = {
                                        "List of ailments they come for / specialties offered": "specialAilments",
                                        "Popular doctors": "specialDoctors",
                                        "Technology used": "specialTechnology",
                                        "Value / Pricing": "specialValue",
                                        "Time taken in diagnosis": "specialDiagnosisTime",
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
                            <Label qIndex="3.1" lang={lang} text={section3.q3_1.text} className="font-semibold text-lg text-neutral-800 mb-4 block" />
                            <div className="space-y-4">
                                <SuggestedInput lang={lang} suggestion={suggestions.patientAge} onAccept={(val) => update('patientAge', val)}>
                                    <Label lang={lang} text={section3.q3_1.age} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={section3.ageOptions}
                                        value={form.patientAge}
                                        onChange={(val) => update('patientAge', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.patientGender} onAccept={(val) => update('patientGender', val)}>
                                    <Label lang={lang} text={section3.q3_1.gender} className="text-[15px]" />
                                    <SingleChips
                                        lang={lang}
                                        options={section3.genderOptions}
                                        value={form.patientGender}
                                        onChange={(val) => update('patientGender', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.patientIncome} onAccept={(val) => update('patientIncome', val)}>
                                    <Label lang={lang} text={section3.q3_1.income} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={section3.incomeOptions}
                                        value={form.patientIncome}
                                        onChange={(val) => update('patientIncome', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.patientOrigin} onAccept={(val) => update('patientOrigin', val)}>
                                    <Label lang={lang} text={section3.q3_1.origin} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={section3.originOptions}
                                        value={form.patientOrigin}
                                        onChange={(val) => update('patientOrigin', val)}
                                    />
                                </SuggestedInput>
                                <SuggestedInput lang={lang} suggestion={suggestions.patientGeography} onAccept={(val) => update('patientGeography', val)}>
                                    <Label lang={lang} text={section3.q3_1.geography} className="text-[15px]" />
                                    <MultiChips
                                        lang={lang}
                                        options={section3.geoOptions}
                                        value={form.patientGeography}
                                        onChange={(val) => update('patientGeography', val)}
                                    />
                                </SuggestedInput>

                                <div className="mt-6">
                                    <Label lang={lang} text={section3.q3B.text} className="text-[15px]" />
                                    <SuggestedInput lang={lang} suggestion={(suggestions as any).otherCustomerSegment} displayValue={describeFollowUps('healthcare', 'otherCustomerSegment', suggestions as any)} onAccept={(val) => acceptWithFollowUps('healthcare', 'otherCustomerSegment', val, suggestions as any, update)}>
                                    <SingleChips
                                        lang={lang}
                                        options={section3.q3B.options}
                                        value={form.otherCustomerSegment || ''}
                                        onChange={(val) => update('otherCustomerSegment', val)}
                                    />
                                    </SuggestedInput>
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
                            <Label qIndex="3.2" lang={lang} text={section3.q3_2.text} />
                            <SuggestedInput lang={lang} suggestion={suggestions.specialtyScope} onAccept={(val) => update('specialtyScope', val)}>
                                <SingleChips
                                    lang={lang}
                                    options={section3.q3_2.scopeOptions}
                                    value={form.specialtyScope}
                                    onChange={(val) => update('specialtyScope', val)}
                                />
                            </SuggestedInput>
                            <SuggestedInput
                                lang={lang}
                                suggestion={suggestions.treatments}
                                displayValue={describeFollowUps('healthcare', 'treatments', suggestions as any)}
                                onAccept={(val) => {
                                    update('specialtyScope', 'Single / select specialties or clinics');
                                    acceptWithFollowUps('healthcare', 'treatments', val, suggestions as any, update);
                                }}
                            >
                                {form.specialtyScope === 'Single / select specialties or clinics' && (
                                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                                        <SearchableMultiSelect
                                            lang={lang}
                                            options={section3.q3_2.options}
                                            value={form.treatments}
                                            onChange={(val) => update('treatments', val)}
                                            placeholder={section3.q3_2.searchPlaceholder}
                                            noMatchText={section3.q3_2.noMatch}
                                            othersKey="Others"
                                            othersLabel={section3.q3_2.othersLabel}
                                        />
                                        {form.treatments.includes('Others') && (
                                            <div className="mt-3">
                                                <TextInput
                                                    id="q3_2_other_input"
                                                    lang={lang}
                                                    value={form.treatmentsOther || ''}
                                                    onChange={(val) => update('treatmentsOther', val)}
                                                    placeholder={section3.q3_2.placeholder_other}
                                                    required
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </SuggestedInput>
                        </div>

                        <div className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
                            <SuggestedInput lang={lang} suggestion={suggestions.decisionMakerLifestyle} onAccept={(val) => update('decisionMakerLifestyle', val)}>
                                <Label qIndex="3.3" lang={lang} text={section3.q3_3.text} hint={section3.q3_3.note} className="mb-4 block" />
                                <div className="p-4 border border-neutral-100 rounded-xl bg-slate-50 shadow-sm">
                                    <div className="flex justify-end mb-3">
                                        <span className="text-xs font-normal text-indigo-400">{lifestyleCount} / {LIFESTYLE_LIMIT} selected</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {section3.q3_3.options.map((opt) => {
                                            const isSelected = form.decisionMakerLifestyle.includes(opt.value);
                                            const isDisabled = !isSelected && lifestyleCount >= LIFESTYLE_LIMIT;
                                            const title = opt.title[lang] || opt.title.en;
                                            const desc = opt.desc[lang] || opt.desc.en;
                                            return (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    disabled={isDisabled}
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            update('decisionMakerLifestyle', form.decisionMakerLifestyle.filter(v => v !== opt.value));
                                                        } else if (lifestyleCount < LIFESTYLE_LIMIT) {
                                                            update('decisionMakerLifestyle', [...form.decisionMakerLifestyle, opt.value]);
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
                                                    <div className="p-3">
                                                        <div className={`font-bold text-[13px] leading-tight mb-1 ${isSelected ? 'text-indigo-900' : 'text-neutral-800'}`}>
                                                            {title}
                                                        </div>
                                                        <div className={`text-[11px] leading-tight ${isSelected ? 'text-indigo-700 font-medium' : 'text-neutral-500'}`}>
                                                            {desc}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </SuggestedInput>
                        </div>

                        <SuggestedInput lang={lang} suggestion={suggestions.companions} displayValue={describeFollowUps('healthcare', 'companions', suggestions as any)} onAccept={(val) => acceptWithFollowUps('healthcare', 'companions', val, suggestions as any, update)}>
                            <Label qIndex="3.4" lang={lang} text={section3.q3_4.text} hint={section3.q3_4.note} />
                            <MultiChips
                                lang={lang}
                                options={section3.q3_4.options}
                                value={form.companions || []}
                                onChange={(val) => update('companions', val)}
                            />
                            {form.companions?.includes('Others') && (
                                <div className="mt-3">
                                    <TextInput
                                        lang={lang}
                                        value={form.companionsOther || ''}
                                        onChange={(val) => update('companionsOther', val)}
                                        placeholder={section3.q3_4.placeholder}
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
                        <SuggestedInput lang={lang} suggestion={suggestions.keyBenefits} onAccept={(val) => update('keyBenefits', val)}>
                            <Label qIndex="4.1" lang={lang} text={section4.q4_1.text} />
                            <TextArea
                                lang={lang}
                                value={form.keyBenefits}
                                onChange={(val) => update('keyBenefits', val)}
                                placeholder={section4.q4_1.placeholder}
                            />
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.competitorStandout} onAccept={(val) => update('competitorStandout', val)}>
                            <Label qIndex="4.2" lang={lang} text={section4.q4_2.text} />
                            <TextArea
                                lang={lang}
                                value={form.competitorStandout}
                                onChange={(val) => update('competitorStandout', val)}
                                placeholder={section4.q4_2.placeholder}
                            />
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.patientFeel} onAccept={(val) => update('patientFeel', val)}>
                            <Label qIndex="4.3" lang={lang} text={section4.q4_3.text} className="mb-3" />
                            <div className="flex flex-wrap gap-2 mb-4">
                                {section4.q4_3.options.map(opt => {
                                    const currentText = form.patientFeel || "";
                                    const isSelected = currentText.includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                if (isSelected) {
                                                    const newVal = currentText
                                                        .split(',')
                                                        .map(s => s.trim())
                                                        .filter(s => s !== opt)
                                                        .join(', ');
                                                    update('patientFeel', newVal);
                                                } else {
                                                    const newVal = currentText
                                                        ? `${currentText.trim().endsWith(',') ? currentText.trim() : currentText.trim() + ','} ${opt}`
                                                        : opt;
                                                    update('patientFeel', newVal.replace(/,\s*,/g, ', ').trim());
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
                                value={form.patientFeel}
                                onChange={(val) => update('patientFeel', val)}
                                placeholder={section4.q4_3.placeholder}
                            />
                        </SuggestedInput>
                    </div>
                </Section>
            )}

            {!isImageBased && (
                <Section lang={lang} kIndex={5} title={section5.title}>
                    <SuggestedInput lang={lang} suggestion={suggestions.competitors} onAccept={(val) => update('competitors', val)}>
                        <Label qIndex="5.1" lang={lang} text={section5.q5_1.text} />
                        <TextArea
                            lang={lang}
                            value={form.competitors}
                            onChange={(val) => update('competitors', val)}
                            placeholder={section5.q5_1.placeholder}
                            rows={3}
                        />
                    </SuggestedInput>
                </Section>
            )}

            {!isImageBased && (
                <Section lang={lang} kIndex={6} title={section6.title}>
                    <div className="space-y-6">
                        <div>
                            <Label qIndex="6.1" lang={lang} text={section6.q6_1.text} className="mb-4 text-base" />
                            <div className="space-y-4 pl-4 border-l-2 border-indigo-100">
                                <SuggestedInput lang={lang} suggestion={suggestions.desiredTone} onAccept={(val) => update('desiredTone', val)}>
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                        <Label lang={lang} text={section6.q6_1.tone} className="text-sm font-semibold text-indigo-900/70 min-w-[100px]" />
                                        <div className="flex flex-wrap gap-2">
                                            {section6.q6_1.options.tone.map(opt => (
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
                                        <Label lang={lang} text={section6.q6_1.world} className="text-sm font-semibold text-indigo-900/70 min-w-[100px]" />
                                        <div className="flex flex-wrap gap-2">
                                            {section6.q6_1.options.world.map(opt => (
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

                        <SuggestedInput lang={lang} suggestion={suggestions.hospitalAsPerson} displayValue={describeFollowUps('healthcare', 'hospitalAsPerson', suggestions as any)} onAccept={(val) => acceptWithFollowUps('healthcare', 'hospitalAsPerson', val, suggestions as any, update)}>
                            <Label qIndex="6.2" lang={lang} text={section6.q6_2.text} hint={section6.q6_2.note} />
                            <div className="mt-3">
                                <SingleChips
                                    lang={lang}
                                    options={section6.q6_2.options}
                                    value={form.hospitalAsPerson}
                                    onChange={(val) => update('hospitalAsPerson', val)}
                                />
                                {form.hospitalAsPerson === 'Other' && (
                                    <div className="mt-3">
                                        <TextInput
                                            lang={lang}
                                            value={form.hospitalAsPersonOther || ''}
                                            onChange={(val) => update('hospitalAsPersonOther', val)}
                                            placeholder={section6.q6_2.placeholder}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.adObjectives} displayValue={describeFollowUps('healthcare', 'adObjectives', suggestions as any)} onAccept={(val) => acceptWithFollowUps('healthcare', 'adObjectives', val, suggestions as any, update)}>
                            <Label qIndex="6.3" lang={lang} text={section6.q6_3.text} hint={section6.q6_3.note} />
                            <div className="space-y-4 mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {section6.q6_3.options.map(opt => {
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
                                            placeholder={section6.q6_3.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>
                        </SuggestedInput>

                        <SuggestedInput lang={lang} suggestion={suggestions.adImportantMessages} displayValue={describeFollowUps('healthcare', 'adImportantMessages', suggestions as any)} onAccept={(val) => acceptWithFollowUps('healthcare', 'adImportantMessages', val, suggestions as any, update)}>
                            <Label qIndex="6.4" lang={lang} text={section6.q6_4.text} hint={section6.q6_4.note} />
                            <div className="space-y-4 mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {section6.q6_4.options.map(opt => {
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
                                            placeholder={section6.q6_4.placeholder}
                                        />
                                    </div>
                                ))}
                            </div>
                        </SuggestedInput>

                        <div>
                            <Label qIndex="6.5" lang={lang} text={section6.q6_5.text} className="mb-2" />
                            <TextInput
                                lang={lang}
                                value={form.dialogueLanguage || ''}
                                onChange={(val) => update('dialogueLanguage', val)}
                                placeholder={section6.q6_5.placeholder}
                            />
                        </div>
                    </div>
                </Section>
            )}

            {/* Salesperson & Images Upload Section */}
            <Section lang={lang} title={section7.title}>
                <div className="space-y-6">
                    <div>
                        <Label lang={lang} text={section7.salesperson} required className="mb-2" />
                        <div className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-[15px] bg-slate-50 text-slate-700 font-medium">
                            {form.salesperson || <span className="text-slate-400">Selected from start screen</span>}
                        </div>
                    </div>
                    <div>
                        <Label lang={lang} text={section7.customerID} className="mb-2" />
                        <TextInput
                            lang={lang}
                            value={form.customerID || ''}
                            onChange={(val) => update('customerID', val)}
                            placeholder={section7.customer_placeholder}
                        />
                    </div>

                    <div>
                        <Label lang={lang} text={section7.listLink} />
                        <TextInput
                            lang={lang}
                            value={form.facilityListLink || ""}
                            onChange={(val) => update("facilityListLink", val)}
                            placeholder={section7.listLink_placeholder}
                        />
                    </div>

                    <div className="pt-4">
                        <Label lang={lang} text={section7.images} className="mb-4" />
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

export default HealthcareForm;
