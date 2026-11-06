/**
 * GENERAL TOOLS & HELPERS
 * 
 * WHAT THIS FILE DOES:
 * - A collection of "Calculators" and "Translators" used throughout the app.
 * - Cleans up messy data so the AI can understand it.
 * - Tells the app how to turn many small pieces of information into a single clean package.
 * - Figures out if a product is a food item or an industrial tool based on what was typed.
 */

import { NewFormData, Language, UploadedImage, IndustrialFormData, LifestyleFormData, RetailFormData, HealthcareFormData } from './types';
import { psychographicOptions } from './data/psychographics';
import { formTranslations, industrialFormTranslations } from './data/translations';
import { lifestyleFormTranslations } from './data/lifestyleTranslations';
import { healthcareFormTranslations } from './data/healthcareTranslations';
import { retailFormTranslations } from './data/retailTranslations';

/**
 * Returns the initial empty state for the form data.
 */
export const getInitialFormData = (): NewFormData => ({
    customerID: "",
    salesperson: "",
    brandName: "",
    adBrand: "",
    productName: "",
    productType: "",
    productPackForm: "",
    productPackFormOther: "",
    brandSpecial: "",
    foundedYear: "",
    founder: "",
    brandRegions: "",
    notable: { Look: "", Feel: "", Smell: "", Taste: "" },
    uniqueProcesses: "",
    uniqueIngredients: "",
    uniqueOther: "",
    consumerProblem: "",
    demographics: { age: [], gender: "", genderOther: "" },
    consumerDemographics: { age: [], gender: "", genderOther: "", income: [], geography: [] },
    psychographics: [],
    brandAsPerson: "",
    usage: "",
    functionalBenefits: "",
    competitorBenefitDifference: "",
    consumerExperienceAfter: "",
    competitors: "",
    desiredImageryTone: "",
    desiredImageryWorld: "",
    desiredImageryAttributes: [],
    desiredViewOther: "",
    consumerViewPersona: "",
    consumerViewPersonaOther: "",
    adObjectives: [],
    adObjectiveDetails: {},
    adFocus: [],
    adFocusDetails: {},
    dialogueLanguage: "",
    fullTranscript: "",
});

export const getInitialIndustrialFormData = (): IndustrialFormData => ({
    customerID: "",
    salesperson: "",
    productPackForm: "",
    productPackFormOther: "",
    brandSpecial: "",
    brands: "",
    adBrand: "",
    productName: "",
    founder: "",
    foundedYear: "",
    brandRegions: "",
    aspect_look: "",
    aspect_feel: "",
    aspect_materials: "",
    aspect_tech: "",
    aspect_skill: "",
    certifications: "",
    consumerAge: [],
    consumerGender: "",
    consumerIncome: [],
    consumerGeography: [],
    psychographicOrientation: [],
    consumerProblem: "",
    customerInfluencer: "",
    showInfluencer: "",
    customerInfluencerType: "",
    usage: "",
    benefits: "",
    competitorBenefitDifference: "",
    consumerExperienceAfter: "",
    competitors: "",
    desiredImageryTone: "",
    desiredImageryWorld: "",
    desiredImageryAttributes: [],
    brandAsPerson: "",
    brandAsPersonOther: "",
    adObjectives: [],
    adObjectiveDetails: {},
    adFocus: [],
    adFocusDetails: {},
    dialogueLanguage: "",
    packagingDetails: "",
    productAppearance: "",
    fullTranscript: "",
});

export const getInitialLifestyleFormData = (): LifestyleFormData => ({
    customerID: "", salesperson: "",
    brandSpecial: "", brands: "", adBrand: "", productName: "", subCategory: [], subCategoryOther: "",
    founder: "", foundedYear: "", brandRegions: "", specialLook: "", specialMaterials: "", specialTech: "", specialCollections: "", specialOthers: "", certifications: "",
    consumerAge: [], consumerGender: "", consumerIncome: [], consumerGeography: [], consumerProblem: "",
    customerAge: [], customerGender: "", customerLifestyle: [],
    usageOccasions: "", shoppingExperience: "", shoppingCompany: [],
    keyBenefits: "", competitorDifference: "", emotionalOutcome: "", emotionalOutcomeManual: "",
    competitors: "",
    desiredTone: "", desiredWorld: "", desiredAttributes: [], desiredAttributesOther: "", brandAsPerson: "", brandAsPersonOther: "",
    adObjectives: [], adObjectiveDetails: {}, adImportantMessages: [], adMessageDetails: {}, featureStore: "", featureFounderEmployee: "", featureFounderEmployeeBrief: "", dialogueLanguage: "",
    fullTranscript: ""
});

export const getInitialRetailFormData = (): RetailFormData => ({
    customerID: "", salesperson: "",
    brandSpecial: "", storeName: "", primaryCategories: [], primaryCategoriesOther: "", storeCountRegions: "",
    founder: "", foundedYear: "", regions: "", specialRange: "", specialAmbience: "", specialValue: "", specialService: "", specialOthers: "", recognitions: "",
    shopperAge: [], shopperGender: "", shopperIncome: [], shopperGeography: [], shopperCoreNeed: "", shopperLifestyle: [], shoppingCompany: [], shoppingCompanyOther: "", otherCustomerSegment: "", otherCustomerSegmentBrief: "",
    shopperJourney: "", shoppingOccasion: [], shoppingOccasionOther: "",
    keyBenefits: "", competitorStandout: "", shopperFeel: "", shopperFeelManual: "",
    competitors: "",
    desiredTone: "", desiredWorld: "", storeAsPerson: "", storeAsPersonOther: "",
    adObjectives: [], adObjectiveDetails: {}, adImportantMessages: [], adMessageDetails: {}, ongoingOffer: "", offerDetails: "", dialogueLanguage: "",
    fullTranscript: ""
});

export const getInitialHealthcareFormData = (): HealthcareFormData => ({
    customerID: "", salesperson: "",
    brandSpecial: "", hospitalName: "", facilityCountRegions: "", primarySpecialties: "",
    founder: "", foundedYear: "", specialAilments: "", specialDoctors: "", specialTechnology: "", specialValue: "", specialDiagnosisTime: "", specialService: "", specialOthers: "", recognitions: "",
    patientAge: [], patientGender: "", patientIncome: [], patientOrigin: [], patientGeography: [], otherCustomerSegment: "", otherCustomerSegmentBrief: "",
    specialtyScope: "", treatments: [], treatmentsOther: "", decisionMakerLifestyle: [], companions: [], companionsOther: "",
    keyBenefits: "", competitorStandout: "", patientFeel: "",
    competitors: "",
    desiredTone: "", desiredWorld: "", hospitalAsPerson: "", hospitalAsPersonOther: "",
    adObjectives: [], adObjectiveDetails: {}, adImportantMessages: [], adMessageDetails: {}, dialogueLanguage: "",
    facilityListLink: "",
    fullTranscript: ""
});


/**
 * Transforms the raw form data into a more descriptive, human-readable format for the webhook payload.
 */
export const transformDataForWebhook = (data: NewFormData, lang: Language, packImages: UploadedImage[], category: 'fmcg', isImageBased: boolean = false) => {
    const psychographicMap = new Map(psychographicOptions.map(p => [p.id, p.title]));

    const getTextFromKey = (options: Record<string, any>, key: string) => {
        if (!key) return '';
        return options[key]?.[lang] || options[key]?.en || key;
    };

    const getOtherValue = (key: string | string[], otherValue: string) => {
        const checkKey = Array.isArray(key) ? 'Other' : key;
        return (Array.isArray(key) ? key.includes('Other') : key === 'Other') && otherValue ? `: ${otherValue}` : '';
    }

    const adObjectives = parseArrayOrCsv(data.adObjectives).map(key => {
        const objectiveText = getTextFromKey(formTranslations.section7.q7_4.options, key);
        const detail = data.adObjectiveDetails[key];
        return detail ? `${objectiveText}: ${detail}` : objectiveText;
    });

    const adFocus = parseArrayOrCsv(data.adFocus).map(key => {
        const focusText = getTextFromKey(formTranslations.section7.q7_5.options, key);
        const detail = data.adFocusDetails[key];
        return detail ? `${focusText}: ${detail}` : focusText;
    });

    const desiredImageryAttributes = parseArrayOrCsv(data.desiredImageryAttributes).map(key => {
        const text = getTextFromKey(formTranslations.section7.q7_1.options_attributes, key);
        const otherDetail = getOtherValue(key, data.desiredViewOther || '');
        return `${text}${otherDetail}`;
    });

    // If Image Only Mode is ON, we only send essential fields and images
    if (isImageBased) {
        return {
            language: lang,
            category: category,
            "Salesperson": data.salesperson,
            "Customer ID": data.customerID,
            "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
            "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        };
    }

    const transformedPayload = {
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Brand Name": data.brandName,
        "Ad Brand": data.adBrand,
        "Product to Showcase": data.productName,
        "Product Type": data.productType,
        "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Brand's Special Qualities": data.brandSpecial,
        // Flattened "Origin & Heritage"
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Primary Regions": data.brandRegions,
        "Notable Look/Shape": data.notable.Look,
        "Notable Feel/Texture": data.notable.Feel,
        "Notable Smell/Aroma": data.notable.Smell,
        "Notable Taste": data.notable.Taste,
        "Unique Processes": data.uniqueProcesses,
        "Unique Ingredients": data.uniqueIngredients,
        "Certifications / Validations": data.uniqueOther,
        "Consumer Problem / Issue": data.consumerProblem,
        // Flattened "Target Audience"
        "Consumer - Age": parseArrayOrCsv(data.consumerDemographics.age).map(ageKey => getTextFromKey(formTranslations.section3.consumerAgeOptions, ageKey)).join(', '),
        "Consumer - Gender": `${getTextFromKey(formTranslations.section3.genderOptions, data.consumerDemographics.gender)}${getOtherValue(data.consumerDemographics.gender, data.consumerDemographics.genderOther)}`,
        "Consumer - Income": parseArrayOrCsv(data.consumerDemographics.income).map(key => getTextFromKey(formTranslations.section3.incomeOptions, key)).join(', '),
        "Consumer - Geography": parseArrayOrCsv(data.consumerDemographics.geography).map(key => getTextFromKey(formTranslations.section3.geoOptions, key)).join(', '),
        "Customer - Age": parseArrayOrCsv(data.demographics.age).map(ageKey => getTextFromKey(formTranslations.section3.customerAgeOptions, ageKey)).join(', '),
        "Customer - Gender": `${getTextFromKey(formTranslations.section3.genderOptions, data.demographics.gender)}${getOtherValue(data.demographics.gender, data.demographics.genderOther)}`,
        "Lifestyle & Beliefs": parseArrayOrCsv(data.psychographics).map(p => psychographicMap.get(p) || p),
        // Flattened "Brand Usage"
        "Consumer Usage (When & How)": data.usage,
        // Flattened "Benefit & Experience"
        "Benefits Offered": data.functionalBenefits,
        "Unique Benefits vs Competitors": data.competitorBenefitDifference,
        "Consumer Experience After Use": data.consumerExperienceAfter,
        // Flattened "Competition"
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        // Flattened "Desired Perception & Ad Objectives"
        "Desired Brand Tone": getTextFromKey(formTranslations.section7.q7_1.options_tone, data.desiredImageryTone),
        "Desired Brand World": getTextFromKey(formTranslations.section7.q7_1.options_world, data.desiredImageryWorld),
        "Desired Brand Attributes": desiredImageryAttributes,
        "Consumer's View of Brand Persona": `${getTextFromKey(formTranslations.section7.q7_2.options, data.consumerViewPersona)}${getOtherValue(data.consumerViewPersona, data.consumerViewPersonaOther)}`,
        "Ad Objectives": adObjectives,
        "Ad Focus (in order of priority)": adFocus,
        "Dialogue Language": data.dialogueLanguage,
        "Session Transcript": data.fullTranscript,
    };

    return {
        language: lang,
        category: category,
        ...transformedPayload
    };
};

export const transformIndustrialDataForWebhook = (data: IndustrialFormData, lang: Language, packImages: UploadedImage[], category: 'industrial', isImageBased: boolean = false) => {
    const getTextFromKey = (options: Record<string, any>, key: string) => {
        if (!key) return '';
        return options[key]?.[lang] || options[key]?.en || key;
    };

    const getOtherValue = (key: string, otherValue: string) => {
        return key === 'other' && otherValue ? `: ${otherValue}` : '';
    }

    const adObjectives = parseArrayOrCsv(data.adObjectives).map(key => {
        const objectiveText = getTextFromKey(industrialFormTranslations.section7.q7_3.options, key);
        const detail = data.adObjectiveDetails[key];
        return detail ? `${objectiveText}: ${detail}` : objectiveText;
    });

    const adFocus = parseArrayOrCsv(data.adFocus).map(key => {
        const focusText = getTextFromKey(industrialFormTranslations.section7.q7_4.options, key);
        const detail = data.adFocusDetails[key];
        return detail ? `${focusText}: ${detail}` : focusText;
    });

    const desiredImageryAttributes = parseArrayOrCsv(data.desiredImageryAttributes).map(key => {
        return getTextFromKey(formTranslations.section7.q7_1.options_attributes, key);
    });

    // If Image Only Mode is ON, we only send essential fields and images
    if (isImageBased) {
        return {
            language: lang,
            category: category,
            "Salesperson": data.salesperson,
            "Customer ID": data.customerID,
            "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
            "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        };
    }

    const transformedPayload = {
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Brand Name": data.adBrand,
        "Ad Brand": data.adBrand,
        "Products/Brands Offered": data.brands,
        "Product to Showcase": data.productName,
        "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Desired Brand Attributes": desiredImageryAttributes,
        "Brand's Special Qualities": data.brandSpecial,
        // Flattened "Origin & Heritage"
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Primary Regions": data.brandRegions,
        "Look / Design / Finish": data.aspect_look,
        "Feel / Texture": data.aspect_feel,
        "Unique Raw Materials": data.aspect_materials,
        "Technology / Machinery / Manufacturing Process / Techniques": data.aspect_tech,
        "Team Skill Expertise": data.aspect_skill,
        "Certifications / Validations": data.certifications,
        // Flattened "Target Audience"
        "Consumer - Age": parseArrayOrCsv(data.consumerAge).map(key => getTextFromKey(industrialFormTranslations.section3.ageOptions, key)).join(', '),
        "Consumer - Gender": getTextFromKey(industrialFormTranslations.section3.genderOptions, data.consumerGender),
        "Consumer - Income": parseArrayOrCsv(data.consumerIncome).map(key => getTextFromKey(industrialFormTranslations.section3.incomeOptions, key)).join(', '),
        "Consumer - Geography": parseArrayOrCsv(data.consumerGeography).map(key => getTextFromKey(industrialFormTranslations.section3.geoOptions, key)).join(', '),
        "Typical Household Type": parseArrayOrCsv(data.psychographicOrientation).map(key => getTextFromKey(industrialFormTranslations.section3.psychographicOptions, key)).join(', '),
        "Consumer Problem": data.consumerProblem,
        "Primary Customer / Influencer": data.customerInfluencer,
        "Show Influencer in Ad?": data.showInfluencer,
        "Influencer Type": data.showInfluencer === 'yes' ? getTextFromKey(industrialFormTranslations.section3.influencerTypeOptions, data.customerInfluencerType) : "",
        // Flattened "Brand Usage"
        "Consumer Usage (When & How)": data.usage,
        // Flattened "Benefit & Experience"
        "Benefits Offered": data.benefits,
        "Unique Benefits vs Competitors": data.competitorBenefitDifference,
        "Consumer Experience After Use": data.consumerExperienceAfter,
        // Flattened "Competition"
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        // Flattened "Desired Perception & Ad Objectives"
        "Desired Brand Tone": getTextFromKey(industrialFormTranslations.section7.q7_1.options_tone, data.desiredImageryTone),
        "Desired Brand World": getTextFromKey(industrialFormTranslations.section7.q7_1.options_world, data.desiredImageryWorld),
        "Consumer's View of Brand Persona": `${getTextFromKey(industrialFormTranslations.section7.q7_2.options, data.brandAsPerson)}${getOtherValue(data.brandAsPerson, data.brandAsPersonOther)}`,
        "Ad Objectives": adObjectives,
        "Ad Focus (in order of priority)": adFocus,
        // Flattened "Product Representation & Packaging"
        "Product Appearance Preference": data.productAppearance,
        "Dialogue Language": data.dialogueLanguage,
        "Session Transcript": data.fullTranscript,
    };

    return {
        language: lang,
        category: category,
        ...transformedPayload
    };
};

export const transformLifestyleDataForWebhook = (data: LifestyleFormData, lang: Language, packImages: UploadedImage[], category: 'lifestyle', isImageBased: boolean = false) => {
    return {
        language: lang,
        category: category,
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Brand Name": data.brands,
        "adBrand": data.adBrand,
        "Product to Showcase": data.productName,
        "Product Sub-category": (() => { const items = data.subCategory.filter(s => s !== 'Others'); if (data.subCategory.includes('Others') && data.subCategoryOther) { items.push(`Others: ${data.subCategoryOther}`); } return items.join(', '); })(),
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Brand's Special Qualities": data.brandSpecial,
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Primary Regions": data.brandRegions,
        "Design / Craftsmanship": data.specialLook,
        "Materials / Fabric / Finish": data.specialMaterials,
        "Unique Technique / Process": data.specialTech,
        "Exclusive Collections": data.specialCollections,
        "Special Others": data.specialOthers,
        "Certifications / Validations": data.certifications,
        "Consumer - Age": data.consumerAge.join(', '),
        "Consumer - Gender": data.consumerGender,
        "Consumer - Income": data.consumerIncome.join(', '),
        "Consumer - Geography": data.consumerGeography.join(', '),
        "Customer - Age": data.customerAge.join(', '),
        "Customer - Gender": data.customerGender,
        "Lifestyle & Beliefs": data.customerLifestyle,
        "Other Customer Segment": data.otherCustomerSegment === 'Others' ? `Others: ${data.otherCustomerSegmentBrief || ''}` : (data.otherCustomerSegment || ''),
        "Consumer Problem": data.consumerProblem,
        "Consumer Usage Occasions": data.usageOccasions,
        "In-store Shopping Experience": data.shoppingExperience,
        "Shopping Company": (() => { const items = data.shoppingCompany.filter(s => s !== 'Others'); if (data.shoppingCompany.includes('Others') && data.shoppingCompanyOtherBrief) { items.push(`Others: ${data.shoppingCompanyOtherBrief}`); } return items.join(', '); })(),
        "Benefits Offered": data.keyBenefits,
        "Unique Benefits vs Competitors": data.competitorDifference,
        "Consumer Emotional Outcome": data.emotionalOutcome,
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        "Desired Brand Tone": data.desiredTone,
        "Desired Brand World": data.desiredWorld,
        "Desired Brand Attributes": data.desiredAttributes.map(a => a === 'Other' ? `Other: ${data.desiredAttributesOther || ''}` : a).join(', '),
        "Brand Persona": data.brandAsPerson === 'Other' ? `Other: ${data.brandAsPersonOther || ''}` : data.brandAsPerson,
        "Ad Objectives": data.adObjectives.map(o => `${o}: ${data.adObjectiveDetails[o] || ''}`),
        "Important Messages": data.adImportantMessages.map(m => `${m}: ${data.adMessageDetails[m] || ''}`),
        "Feature Founder/Employee": data.featureFounderEmployee === 'Yes' ? (data.featureFounderEmployeeBrief ? `Yes: ${data.featureFounderEmployeeBrief}` : 'Yes') : (data.featureFounderEmployee || ''),
        "Feature Store in Ad": data.featureStore,
        "Store Link": data.storesListLink || '',
        "Dialogue Language": data.dialogueLanguage,
        "Session Transcript": data.fullTranscript,
    };
};

export const transformRetailDataForWebhook = (data: RetailFormData, lang: Language, packImages: UploadedImage[], category: 'retail', isImageBased: boolean = false) => {
    return {
        language: lang,
        category: category,
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Store Name": data.storeName,
        "Brand Name": data.storeName,
        "Primary Categories": data.primaryCategories.map(c => c === 'Others' ? `Others: ${data.primaryCategoriesOther}` : c).join(', '),
        "Store Count and Regions": data.storeCountRegions,
        "Store Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Store's Special Qualities": data.brandSpecial,
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Primary Regions": data.regions,
        "Range / Variety": data.specialRange,
        "Store Experience / Ambience": data.specialAmbience,
        "Value / Pricing": data.specialValue,
        "Service / Trust": data.specialService,
        "Others": data.specialOthers,
        "Recognitions": data.recognitions,
        "Shopper - Age": data.shopperAge.join(', '),
        "Shopper - Gender": data.shopperGender,
        "Shopper - Income": data.shopperIncome.join(', '),
        "Shopper - Geography": data.shopperGeography.join(', '),
        "Shopper Core Need": data.shopperCoreNeed,
        "Shopper Lifestyle": data.shopperLifestyle,
        "Other Customer Segment": data.otherCustomerSegment === 'Others' ? `Others: ${data.otherCustomerSegmentBrief || ''}` : (data.otherCustomerSegment || ''),
        "Shopping Company": Array.isArray(data.shoppingCompany) ? data.shoppingCompany.map(w => w === 'Others' ? `Others: ${data.shoppingCompanyOther || ''}` : w).join(", ") : "",
        "Shopper Journey": data.shopperJourney,
        "Shopping Occasion trigger": data.shoppingOccasion.map(s => s === 'Others' || s === 'Other' ? `Others: ${data.shoppingOccasionOther || ''}` : s).join(', '),
        "Key Benefits Offered": data.keyBenefits,
        "Competitor Standout Benefits": data.competitorStandout,
        "Shopper Feel Post Visit": data.shopperFeel,
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        "Desired Store Tone": data.desiredTone,
        "Desired Brand World": data.desiredWorld,
        "Store Persona": data.storeAsPerson === 'Other' ? `Other: ${data.storeAsPersonOther || ''}` : data.storeAsPerson,
        "Ad Objectives": data.adObjectives.map(o => `${o}: ${data.adObjectiveDetails[o] || ''}`),
        "Important Messages": data.adImportantMessages.map(m => `${m}: ${data.adMessageDetails[m] || ''}`),
        "Ongoing Offer Event": data.ongoingOffer === 'Yes' ? (data.offerDetails ? `Yes: ${data.offerDetails}` : 'Yes') : 'No',
        "Store Link": data.storesListLink || '',
        "Dialogue Language": data.dialogueLanguage,
        "Session Transcript": data.fullTranscript,
    };
};

export const transformHealthcareDataForWebhook = (data: HealthcareFormData, lang: Language, packImages: UploadedImage[], category: 'healthcare', isImageBased: boolean = false) => {
    const treatments = data.specialtyScope === 'Multi-specialty'
        ? 'Multi-specialty'
        : data.treatments.map(t => {
            if (t === 'Others') return `Others: ${data.treatmentsOther || ''}`;
            const hint = healthcareFormTranslations.section3.q3_2.options[t]?.hint;
            return hint ? `${t}: ${hint}` : t;
        }).join(', ');
    return {
        language: lang,
        category: category,
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Hospital Name": data.hospitalName,
        "Brand Name": data.hospitalName,
        "Hospital / Clinic Count and Regions": data.facilityCountRegions,
        "Primary Specialties / Medical Services": data.primarySpecialties,
        "Hospital Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Hospital's Special Qualities": data.brandSpecial,
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Ailments / Specialties Offered": data.specialAilments,
        "Popular Doctors": data.specialDoctors,
        "Technology Used": data.specialTechnology,
        "Value / Pricing": data.specialValue,
        "Time Taken in Diagnosis": data.specialDiagnosisTime,
        "Service / Trust": data.specialService,
        "Others": data.specialOthers,
        "Recognitions": data.recognitions,
        "Patient - Age": data.patientAge.join(', '),
        "Patient - Gender": data.patientGender,
        "Patient - Income": data.patientIncome.join(', '),
        "Patient - Comes From": data.patientOrigin.join(', '),
        "Patient - Geography": data.patientGeography.join(', '),
        "Other Customer Segment": data.otherCustomerSegment === 'Others' ? `Others: ${data.otherCustomerSegmentBrief || ''}` : (data.otherCustomerSegment || ''),
        "Main Treatments": treatments,
        "Decision Maker Lifestyle": data.decisionMakerLifestyle,
        "Accompanied By": data.companions.map(c => c === 'Others' ? `Others: ${data.companionsOther || ''}` : c).join(', '),
        "Key Benefits Offered": data.keyBenefits,
        "Competitor Standout Benefits": data.competitorStandout,
        "Patient Feel Post Visit": data.patientFeel,
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        "Desired Brand Tone": data.desiredTone,
        "Desired Brand World": data.desiredWorld,
        "Hospital Persona": data.hospitalAsPerson === 'Other' ? `Other: ${data.hospitalAsPersonOther || ''}` : data.hospitalAsPerson,
        "Ad Objectives": data.adObjectives.map(o => `${o}: ${data.adObjectiveDetails[o] || ''}`),
        "Important Messages": data.adImportantMessages.map(m => `${m}: ${data.adMessageDetails[m] || ''}`),
        "Hospital List Link": data.facilityListLink || '',
        "Dialogue Language": data.dialogueLanguage,
        "Session Transcript": data.fullTranscript,
    };
};

/**
 * Maps the raw, flat data from a webhook response to the nested NewFormData structure.
 */
/**
 * Helper to parse array fields that might be JSON arrays or CSV strings.
 */
/** Psychographic options that were reworded, so past responses still load against the new wording. */
const RENAMED_PSYCHOGRAPHICS: Record<string, string> = {
    "Young Boys — Boyfriend (Cafés, casual outings)": "Young Boys — With girlfriend (Cafés, casual outings)",
    "Young Men — Boyfriend / Husband (Dating, shared activities)": "Young Men — With girlfriend / wife (Dating, shared activities)",
    "Youth (Boys) — Boyfriend": "Youth (Boys) — With girlfriend",
};
const migratePsychographic = (title: string): string => RENAMED_PSYCHOGRAPHICS[title.trim()] || title;

/** "Regional" replaced the "Desi" Brand World options, so past responses load against the new wording. */
const migrateBrandWorld = (value: any): string => {
    const world = safeStr(value).trim();
    return world === 'Desi' || world === 'Desi / Regional' ? 'Regional' : world;
};

export const parseArrayOrCsv = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(String).filter(Boolean);
    if (typeof value === 'string') {
        const trimmed = value.trim();
        // Handle JSON array
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
            } catch (e) {
                // Fallback to CSV/Newline if JSON parse fails
            }
        }
        // Split by either comma or newline
        return trimmed.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    }
    return [String(value)];
};

/**
 * Safely coerce any webhook value to a string.
 * Handles arrays (joins with ', '), null/undefined (returns ''), and other types.
 */
const safeStr = (val: any): string => {
    if (typeof val === 'string') return val;
    if (val == null) return '';
    if (Array.isArray(val)) return val.map(String).filter(Boolean).join(', ');
    return String(val);
};

export type FormCategory = 'fmcg' | 'industrial' | 'lifestyle' | 'retail' | 'healthcare';

/**
 * Questions whose answer opens a free-text box. `when` lists the options that open it; without
 * `when`, the box is keyed by option, with one detail per selected option (e.g. Ad Objectives).
 * Option spellings differ by question and category, so these match the checks in each form.
 */
export const TRANSCRIPT_FOLLOW_UPS: Record<FormCategory, { field: string; followUp: string; when?: string[] }[]> = {
    fmcg: [
        { field: 'desiredImageryAttributes', followUp: 'desiredViewOther', when: ['Other'] },
        { field: 'consumerViewPersona', followUp: 'consumerViewPersonaOther', when: ['Other'] },
        { field: 'adObjectives', followUp: 'adObjectiveDetails' },
        { field: 'adFocus', followUp: 'adFocusDetails' },
    ],
    industrial: [
        { field: 'brandAsPerson', followUp: 'brandAsPersonOther', when: ['other'] },
        { field: 'adObjectives', followUp: 'adObjectiveDetails' },
        { field: 'adFocus', followUp: 'adFocusDetails' },
    ],
    lifestyle: [
        { field: 'subCategory', followUp: 'subCategoryOther', when: ['Others'] },
        { field: 'otherCustomerSegment', followUp: 'otherCustomerSegmentBrief', when: ['Others'] },
        { field: 'shoppingCompany', followUp: 'shoppingCompanyOtherBrief', when: ['Others'] },
        { field: 'desiredAttributes', followUp: 'desiredAttributesOther', when: ['Other'] },
        { field: 'brandAsPerson', followUp: 'brandAsPersonOther', when: ['Other'] },
        { field: 'adObjectives', followUp: 'adObjectiveDetails' },
        { field: 'adImportantMessages', followUp: 'adMessageDetails' },
        { field: 'featureFounderEmployee', followUp: 'featureFounderEmployeeBrief', when: ['Yes'] },
    ],
    retail: [
        { field: 'primaryCategories', followUp: 'primaryCategoriesOther', when: ['Others'] },
        { field: 'otherCustomerSegment', followUp: 'otherCustomerSegmentBrief', when: ['Others'] },
        { field: 'shoppingCompany', followUp: 'shoppingCompanyOther', when: ['Others'] },
        { field: 'shoppingOccasion', followUp: 'shoppingOccasionOther', when: ['Other'] },
        { field: 'storeAsPerson', followUp: 'storeAsPersonOther', when: ['Other'] },
        { field: 'adObjectives', followUp: 'adObjectiveDetails' },
        { field: 'adImportantMessages', followUp: 'adMessageDetails' },
        { field: 'ongoingOffer', followUp: 'offerDetails', when: ['Yes'] },
    ],
    healthcare: [
        { field: 'otherCustomerSegment', followUp: 'otherCustomerSegmentBrief', when: ['Others'] },
        { field: 'treatments', followUp: 'treatmentsOther', when: ['Others'] },
        { field: 'companions', followUp: 'companionsOther', when: ['Others'] },
        { field: 'hospitalAsPerson', followUp: 'hospitalAsPersonOther', when: ['Other'] },
        { field: 'adObjectives', followUp: 'adObjectiveDetails' },
        { field: 'adImportantMessages', followUp: 'adMessageDetails' },
    ],
};

/** The prompt section telling the AI how to fill each follow-up box for this category. */
export const buildFollowUpInstructions = (category: FormCategory): string => {
    const lines = TRANSCRIPT_FOLLOW_UPS[category].map(({ field, followUp, when }) => when
        ? `- ${followUp}: only if ${field} is or includes "${when[0]}", write what the transcript says about it. Otherwise leave it out.`
        : `- ${followUp}: a JSON object with one entry for each option chosen in ${field}. The key is the exact option and the value is what the transcript says about it, such as the specific message, event or goal.`);
    return `Some answers open a free-text box on the form. Fill these whenever the transcript gives the information, using only what was actually said:
${lines.join('\n')}
Always pick a listed option when one fits, even if the wording in the transcript differs. Use the Others / Other option only for something that truly fits none of the listed options, and describe it in that option's free-text box.`;
};

const selectedOptions = (value: any): string[] => {
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === 'string') return value.split(',').map(s => s.trim()).filter(Boolean);
    return [];
};

const toDetailsObject = (value: any): Record<string, any> | null => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) return value;
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) return parsed;
        } catch (e) {
            return null;
        }
    }
    return null;
};

/** Removes follow-up text whose box would stay closed, so hidden answers are never submitted. */
export const cleanFollowUpSuggestions = (category: FormCategory, suggestions: Record<string, any>): Record<string, any> => {
    const cleaned = { ...suggestions };

    if (category === 'healthcare') {
        if (cleaned.decisionMakerLifestyle !== undefined) {
            const options = healthcareFormTranslations.section3.q3_3.options.map(o => o.value);
            cleaned.decisionMakerLifestyle = pickKnownOptions(cleaned.decisionMakerLifestyle, options).selected.slice(0, 3);
        }
        const treatments = selectedOptions(cleaned.treatments);
        if (cleaned.specialtyScope === 'Multi-specialty') {
            delete cleaned.treatments;
            delete cleaned.treatmentsOther;
        } else if (treatments.length > 0) {
            cleaned.specialtyScope = 'Single / select specialties or clinics';
        }
    }

    TRANSCRIPT_FOLLOW_UPS[category].forEach(({ field, followUp, when }) => {
        if (cleaned[followUp] === undefined) return;
        const chosen = selectedOptions(cleaned[field]);
        if (when) {
            const text = safeStr(cleaned[followUp]).trim();
            if (text && chosen.some(c => when.includes(c))) cleaned[followUp] = text;
            else delete cleaned[followUp];
            return;
        }
        const details = toDetailsObject(cleaned[followUp]) || {};
        const kept: Record<string, string> = {};
        chosen.forEach(option => {
            const match = Object.keys(details).find(k => k.trim().toLowerCase() === option.trim().toLowerCase());
            const text = match ? safeStr(details[match]).trim() : '';
            if (text) kept[option] = text;
        });
        if (Object.keys(kept).length > 0) cleaned[followUp] = kept;
        else delete cleaned[followUp];
    });
    return cleaned;
};

/** Accepting a suggestion also accepts the free-text answer that goes with it. */
export const acceptWithFollowUps = (
    category: FormCategory,
    field: string,
    value: any,
    suggestions: Record<string, any>,
    update: (field: any, value: any) => void
) => {
    update(field, value);
    TRANSCRIPT_FOLLOW_UPS[category]
        .filter(rule => rule.field === field && suggestions[rule.followUp] !== undefined)
        .forEach(rule => update(rule.followUp, suggestions[rule.followUp]));
};

/** The suggestion text shown to the salesperson, including any free-text answer. */
export const describeFollowUps = (category: FormCategory, field: string, suggestions: Record<string, any>): string | undefined => {
    const rule = TRANSCRIPT_FOLLOW_UPS[category].find(r => r.field === field && suggestions[r.followUp] !== undefined);
    if (!rule) return undefined;
    const followUp = suggestions[rule.followUp];
    return selectedOptions(suggestions[field]).map(option => {
        if (rule.when) return rule.when.includes(option) ? `${option}: ${followUp}` : option;
        return followUp[option] ? `${option}: ${followUp[option]}` : option;
    }).join(', ');
};

/**
 * Brand inputs for the custom world prompt, mirroring each category's n8n worlds prompt. `keys` are
 * the app's payload names, tried in order, since a few differ from the names used in the n8n nodes.
 */
const CUSTOM_WORLD_INPUTS: Record<FormCategory, { label: string; keys: string[] }[]> = {
    fmcg: [
        { label: 'Brand Name', keys: ['Ad Brand', 'Brand Name'] },
        { label: 'Product to Showcase', keys: ['Product to Showcase'] },
        { label: 'Category', keys: ['Product Type', 'category'] },
        { label: 'Region', keys: ['Primary Regions'] },
        { label: 'Persona', keys: ["Consumer's View of Brand Persona"] },
    ],
    industrial: [
        { label: 'Brand Name', keys: ['Ad Brand', 'Brand Name'] },
        { label: 'Product to Showcase', keys: ['Product to Showcase'] },
        { label: 'Category', keys: ['Product Type', 'category'] },
        { label: 'Region', keys: ['Primary Regions'] },
        { label: 'Persona', keys: ["Consumer's View of Brand Persona"] },
    ],
    lifestyle: [
        { label: 'Product to Showcase', keys: ['Product to Showcase'] },
        { label: 'Category', keys: ['Product Sub-category', 'category'] },
        { label: 'Primary Regions', keys: ['Primary Regions'] },
        { label: 'User (Consumer) – Income', keys: ['Consumer - Income'] },
        { label: 'User (Consumer) – Geography', keys: ['Consumer - Geography'] },
        { label: 'Buyer (Customer) – Age', keys: ['Customer - Age'] },
        { label: 'Buyer (Customer) – Gender', keys: ['Customer - Gender'] },
        { label: 'Lifestyle & Beliefs (psychographics)', keys: ['Lifestyle & Beliefs'] },
        { label: 'Desired Brand Worlds', keys: ['Desired Brand World'] },
    ],
    retail: [
        { label: 'Primary Categories', keys: ['Primary Categories'] },
        { label: 'Store Count and Regions', keys: ['Store Count and Regions'] },
        { label: 'Primary Regions', keys: ['Primary Regions'] },
        { label: 'Shopper – Age', keys: ['Shopper - Age'] },
        { label: 'Shopper – Gender', keys: ['Shopper - Gender'] },
        { label: 'Shopper – Income', keys: ['Shopper - Income'] },
        { label: 'Shopper – Geography', keys: ['Shopper - Geography'] },
        { label: 'Shopper Lifestyle', keys: ['Shopper Lifestyle'] },
        { label: 'Typical Shopper/Decision Maker', keys: ['Shopping Company'] },
        { label: 'Desired Brand Worlds', keys: ['Desired Brand World'] },
    ],
    healthcare: [
        { label: 'Primary Specialties / Medical Services', keys: ['Primary Specialties / Medical Services'] },
        { label: 'Main Treatments Patients Come For', keys: ['Main Treatments'] },
        { label: 'Hospital / Clinic Count and Regions', keys: ['Hospital / Clinic Count and Regions'] },
        { label: 'Patient – Age', keys: ['Patient - Age'] },
        { label: 'Patient – Gender', keys: ['Patient - Gender'] },
        { label: 'Patient – Income', keys: ['Patient - Income'] },
        { label: 'Patient – Geography', keys: ['Patient - Geography'] },
        { label: 'Where Most Patients Come From', keys: ['Patient - Comes From'] },
        { label: "Decision Makers' Lifestyle & Beliefs", keys: ['Decision Maker Lifestyle'] },
        { label: 'Who Usually Accompanies the Patient', keys: ['Accompanied By'] },
        { label: 'Desired Brand World', keys: ['Desired Brand World'] },
    ],
};

/** The n8n worlds prompt, adapted to one world that follows the user's request. */
export const buildCustomWorldPrompt = (context: Record<string, any>, userRequest: string, positioning?: any): string => {
    const inputs = (CUSTOM_WORLD_INPUTS[context?.category as FormCategory] || [])
        .map(({ label, keys }) => {
            const key = keys.find(k => safeStr(context[k]).trim());
            return key ? `${label}: ${safeStr(context[key]).trim()}` : '';
        })
        .filter(Boolean);
    const positioningText = safeStr(typeof positioning === 'object' ? positioning?.english_positioning : positioning).trim();
    const brandSection = inputs.length > 0
        ? inputs.join('\n')
        : positioningText ? `Positioning: ${positioningText}` : 'No brand inputs are available. Default to a generic Indian setting.';

    return `You are a World-Creation Assistant for Indian brand advertising.

Your ONLY job is to generate **exactly one** vivid Indian scenario that can become the world of an ad about to begin — meaning a **pure setting** or **environment**, NOT a story. The user has asked for a specific world. Follow their request, and use the brand inputs to get the locale and the people right.

STRICT RULES:
• A "world" = a place + atmosphere + cultural texture.
• DO NOT describe hooks, emotions, or product usage.
• **Mention** the characters likely to be found in the world.
• DO NOT create story beats like someone opening a tiffin, tasting food, remembering something, etc.
• DO NOT include obstacles, pivots, resolutions, feelings, or transformations.
• DO NOT include any dialogue or implied narrative.
• DO NOT mention the brand name or the product. The world is only a setting and its people.
• Write in simple everyday English (**no difficult vocabulary**), with no Hindi or Hinglish wording, even if the request is written that way.
• Must be culturally authentic to India (region → if provided; else pan-India).
• The world must be **1–2 sentences maximum**, focusing ONLY on the scene/environment with 20-30 words only.

FORMAT RULES:
• Return ONLY the JSON object matching the schema below.
• The "label" = short title for the world (e.g., "The Village Courtyard").
• The "snapshot" = 1–2 sentences describing ONLY the environment with 20-30 words only.

Return JSON matching EXACTLY this schema:
{
  "label": "string",
  "snapshot": "string"
}

User's request: ${userRequest}

Brand inputs:
${brandSection}`;
};

/**
 * Target audience for the world and pillar recommendation prompts. Each category names these
 * fields differently (Consumer, Customer, Shopper, Patient).
 */
export const getTargetAudience = (info: Record<string, any>): string => {
    const age = info["Consumer - Age"] || info["Customer - Age"] || info["Shopper - Age"] || info["Patient - Age"];
    const gender = info["Consumer - Gender"] || info["Customer - Gender"] || info["Shopper - Gender"] || info["Patient - Gender"];
    return [age, gender].filter(Boolean).join(', ') || 'Not specified';
};

export const inferCategory = (data: any): 'fmcg' | 'industrial' | 'lifestyle' | 'retail' | 'healthcare' => {
    // Check for explicit category field first
    if (data.category === 'industrial' || data.Category === 'industrial') return 'industrial';
    if (data.category === 'lifestyle' || data.Category === 'lifestyle') return 'lifestyle';
    if (data.category === 'retail' || data.Category === 'retail') return 'retail';
    if (data.category === 'healthcare' || data.Category === 'healthcare') return 'healthcare';
    if (data.category === 'fmcg' || data.Category === 'fmcg') return 'fmcg';

    if (data['Products/Brands Offered']) return 'industrial';
    if (data['Product Sub-category'] || data['Design / Craftsmanship']) return 'lifestyle';
    if (data['Primary Categories'] || data['Store\'s Special Qualities']) return 'retail';
    if (data['Hospital Persona'] || data['Hospital\'s Special Qualities']) return 'healthcare';

    // Industrial unique indicators
    if (data['Typical Household Type'] || data['Show Influencer in Ad?'] || data['Primary Customer / Influencer']) return 'industrial';

    // FMCG unique indicators
    if (data['Notable Taste'] || data['Notable Smell/Aroma'] || data['Notable Look/Shape'] || data['Notable Feel/Texture']) return 'fmcg';

    // Default fallback
    return 'fmcg';
};

/**
 * Finds known option values inside a saved answer. Matching on the options, rather than splitting on
 * commas, keeps options that contain commas intact. Anything unrecognised is returned as `rest`.
 */
export const pickKnownOptions = (raw: any, options: string[]): { selected: string[]; rest: string } => {
    let text = parseArrayOrCsv(raw).join(', ');
    const hits: { opt: string; at: number }[] = [];
    [...options].sort((a, b) => b.length - a.length).forEach(opt => {
        let from = 0;
        let at = text.indexOf(opt, from);
        while (at !== -1) {
            const before = text.slice(0, at).trimEnd();
            const after = text.slice(at + opt.length).trimStart();
            if ((before === '' || before.endsWith(',')) && (after === '' || after.startsWith(','))) {
                hits.push({ opt, at });
                text = text.slice(0, at) + '\u0000'.repeat(opt.length) + text.slice(at + opt.length);
                return;
            }
            from = at + opt.length;
            at = text.indexOf(opt, from);
        }
    });
    const rest = text.replace(/\u0000+/g, '').split(',').map(s => s.trim()).filter(Boolean).join(', ');
    return { selected: hits.sort((a, b) => a.at - b.at).map(h => h.opt), rest };
};

/** Same idea for "Option: detail" answers such as Ad Objectives, where details can contain commas. */
const pickOptionDetails = (raw: any, options: string[]): { selected: string[]; details: { [key: string]: string } } => {
    const text = parseArrayOrCsv(raw).join(', ');
    const hits = options
        .map(opt => {
            let at = text.indexOf(`${opt}:`);
            while (at > 0 && !text.slice(0, at).trimEnd().endsWith(',')) {
                at = text.indexOf(`${opt}:`, at + 1);
            }
            return { opt, at };
        })
        .filter(h => h.at !== -1)
        .sort((a, b) => a.at - b.at);
    const details: { [key: string]: string } = {};
    hits.forEach((h, i) => {
        const end = i + 1 < hits.length ? hits[i + 1].at : text.length;
        const detail = text.slice(h.at + h.opt.length + 1, end).trim().replace(/,$/, '').trim();
        if (detail) details[h.opt] = detail;
    });
    return { selected: hits.map(h => h.opt), details };
};

export const mapRawDataToHealthcareFormData = (raw: any): HealthcareFormData => {
    const formData = getInitialHealthcareFormData();
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    const s3 = healthcareFormTranslations.section3;
    const s6 = healthcareFormTranslations.section6;

    formData.salesperson = safeStr(data["Salesperson"]);
    formData.customerID = safeStr(data["Customer ID"]);
    formData.hospitalName = safeStr(data["Hospital Name"] || data["Brand Name"] || data["Ad Brand"]);
    formData.brandSpecial = safeStr(data["Hospital's Special Qualities"]);
    formData.facilityCountRegions = safeStr(data["Hospital / Clinic Count and Regions"]);
    formData.primarySpecialties = safeStr(data["Primary Specialties / Medical Services"]);

    const [founder, year] = safeStr(data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';
    formData.specialAilments = safeStr(data["Ailments / Specialties Offered"]);
    formData.specialDoctors = safeStr(data["Popular Doctors"]);
    formData.specialTechnology = safeStr(data["Technology Used"]);
    formData.specialValue = safeStr(data["Value / Pricing"]);
    formData.specialDiagnosisTime = safeStr(data["Time Taken in Diagnosis"]);
    formData.specialService = safeStr(data["Service / Trust"]);
    formData.specialOthers = safeStr(data["Special Others"] || data["Others"]);
    formData.recognitions = safeStr(data["Recognitions"]);

    formData.patientAge = pickKnownOptions(data["Patient - Age"], Object.keys(s3.ageOptions)).selected;
    formData.patientGender = safeStr(data["Patient - Gender"]);
    formData.patientIncome = pickKnownOptions(data["Patient - Income"], Object.keys(s3.incomeOptions)).selected;
    formData.patientOrigin = pickKnownOptions(data["Patient - Comes From"], Object.keys(s3.originOptions)).selected;
    formData.patientGeography = pickKnownOptions(data["Patient - Geography"], Object.keys(s3.geoOptions)).selected;

    const segment = safeStr(data["Other Customer Segment"]);
    if (segment.startsWith('Others:')) {
        formData.otherCustomerSegment = 'Others';
        formData.otherCustomerSegmentBrief = segment.replace(/^Others:\s*/, '');
    } else {
        formData.otherCustomerSegment = segment as HealthcareFormData['otherCustomerSegment'];
    }

    const treatmentsText = safeStr(data["Main Treatments"]);
    if (treatmentsText === 'Multi-specialty') {
        formData.specialtyScope = 'Multi-specialty';
    } else if (treatmentsText) {
        // Newer records hold "Oncology: Cancer"; older ones hold just "Oncology"
        const specialties = Object.entries(s3.q3_2.options);
        const specialtyTexts = specialties.flatMap(([key, opt]) => [key, `${key}: ${opt.hint}`]);
        const { selected: matched, rest } = pickKnownOptions(treatmentsText, specialtyTexts);
        const selected = matched.map(text => specialties.find(([key, opt]) => text === key || text === `${key}: ${opt.hint}`)![0]);
        const other = rest.replace(/^Others:\s*/, '');
        formData.specialtyScope = 'Single / select specialties or clinics';
        formData.treatments = other ? [...selected, 'Others'] : selected;
        formData.treatmentsOther = other;
    }

    formData.decisionMakerLifestyle = pickKnownOptions(data["Decision Maker Lifestyle"], s3.q3_3.options.map(o => o.value)).selected;

    const companions = pickKnownOptions(data["Accompanied By"], Object.keys(s3.q3_4.options));
    const companionsOther = companions.rest.replace(/^Others:\s*/, '');
    formData.companions = companionsOther ? [...companions.selected.filter(c => c !== 'Others'), 'Others'] : companions.selected;
    formData.companionsOther = companionsOther;

    formData.keyBenefits = safeStr(data["Key Benefits Offered"]);
    formData.competitorStandout = safeStr(data["Competitor Standout Benefits"]);
    formData.patientFeel = safeStr(data["Patient Feel Post Visit"]);
    formData.competitors = parseArrayOrCsv(data["Primary Competitors"]).join('\n');

    formData.desiredTone = safeStr(data["Desired Brand Tone"]);
    formData.desiredWorld = safeStr(data["Desired Brand World"]);
    const persona = safeStr(data["Hospital Persona"]);
    if (persona.startsWith('Other:')) {
        formData.hospitalAsPerson = 'Other';
        formData.hospitalAsPersonOther = persona.replace(/^Other:\s*/, '');
    } else {
        formData.hospitalAsPerson = persona;
    }

    const objectives = pickOptionDetails(data["Ad Objectives"], s6.q6_3.options);
    formData.adObjectives = objectives.selected;
    formData.adObjectiveDetails = objectives.details;
    const messages = pickOptionDetails(data["Important Messages"], s6.q6_4.options);
    formData.adImportantMessages = messages.selected;
    formData.adMessageDetails = messages.details;

    formData.facilityListLink = safeStr(data["Hospital List Link"]);
    formData.dialogueLanguage = safeStr(data["Dialogue Language"]);
    formData.fullTranscript = safeStr(data["Transcript"] || data["Session Transcript"]);

    return formData;
};

export const mapRawDataToIndustrialFormData = (raw: any): IndustrialFormData => {
    const formData = getInitialIndustrialFormData();
    // Handle both array response (first item) and direct object
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    const createReverseMap = (options: Record<string, any>) => {
        const map = new Map<string, string>();
        Object.entries(options).forEach(([key, labels]) => {
            if (typeof labels === 'object' && labels !== null) {
                Object.values(labels).forEach(label => {
                    if (typeof label === 'string') map.set(label.trim(), key);
                });
            } else if (typeof labels === 'string') {
                map.set(labels.trim(), key);
            }
        });
        return map;
    };

    const splitOther = (val: string, reverseMap: Map<string, string>) => {
        if (!val) return { key: '', other: '' };
        const parts = val.split(':');
        const label = parts[0].trim();
        const key = reverseMap.get(label);
        if (key === 'Other' || key === 'other') {
            return { key, other: parts.slice(1).join(':').trim() };
        }
        return { key: key || val, other: '' };
    };

    const genderReverseMap = createReverseMap(industrialFormTranslations.section3.genderOptions);
    const ageReverseMap = createReverseMap(industrialFormTranslations.section3.ageOptions);
    const incomeReverseMap = createReverseMap(industrialFormTranslations.section3.incomeOptions);
    const geoReverseMap = createReverseMap(industrialFormTranslations.section3.geoOptions);
    const influencerTypeReverseMap = createReverseMap(industrialFormTranslations.section3.influencerTypeOptions);
    const toneReverseMap = createReverseMap(industrialFormTranslations.section7.q7_1.options_tone);
    const worldReverseMap = createReverseMap(industrialFormTranslations.section7.q7_1.options_world);
    const brandAsPersonReverseMap = createReverseMap(industrialFormTranslations.section7.q7_2.options);
    const adObjectivesReverseMap = createReverseMap(industrialFormTranslations.section7.q7_3.options);
    const adFocusReverseMap = createReverseMap(industrialFormTranslations.section7.q7_4.options);
    const psychographicReverseMap = createReverseMap(industrialFormTranslations.section3.psychographicOptions);

    formData.fullTranscript = data["Transcript"] || data["Session Transcript"] || '';
    formData.salesperson = data["Salesperson"] || '';
    formData.customerID = data["Customer ID"] || '';
    formData.brandSpecial = data["Brand's Special Qualities"] || '';
    formData.brands = data["Brands/Products Offered"] || data["Products/Brands Offered"] || '';
    formData.adBrand = data["Ad Brand"] || data["Brand Name"] || '';
    formData.usage = data["Consumer Usage (When & How)"] || '';
    formData.productName = data["Product to Showcase"] || '';
    formData.productAppearance = data["Product Appearance Preference"] || data["Product Appearance In Ad"] || '';

    const [founder, year] = (data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';
    formData.brandRegions = parseArrayOrCsv(data["Primary Regions"]).join(', ') || '';

    formData.aspect_look = data["Notable Look/Shape"] || data["Look / Design / Finish"] || data["Look/Design/Finish"] || '';
    formData.aspect_materials = data["Unique Ingredients"] || data["Unique Raw Materials"] || '';
    formData.aspect_tech = data["Unique Processes"] || data["Technology / Machinery / Manufacturing Process / Techniques"] || data["Unique Techniques"] || '';
    formData.aspect_skill = data["Skill/Talent"] || data["Team Skill Expertise"] || '';

    formData.certifications = data["Certifications / Validations"] || data["Certifications / External Validation"] || '';

    formData.consumerAge = parseArrayOrCsv(data["Consumer - Age"] || data["Customer - Age"]).map(v => ageReverseMap.get(v.trim()) || v);
    formData.consumerGender = genderReverseMap.get(data["Consumer - Gender"] || data["Customer - Gender"]) || data["Consumer - Gender"] || '';
    formData.consumerIncome = parseArrayOrCsv(data["Consumer - Income"] || data["Customer - Income"]).map(v => incomeReverseMap.get(v.trim()) || v);
    formData.consumerGeography = parseArrayOrCsv(data["Consumer - Geography"] || data["Customer - Geography"]).map(v => geoReverseMap.get(v.trim()) || v);

    formData.psychographicOrientation = parseArrayOrCsv(data["Psychographics"] || data["Lifestyle & Beliefs"] || data["Typical Household Type"] || data["Household"]).map(v => psychographicReverseMap.get(v.trim()) || v);

    formData.consumerProblem = data["Problem"] || data["Consumer Problem / Issue"] || '';
    formData.customerInfluencer = data["Primary Customer / Influencer"] || '';

    if (data["Influencer Type"]) {
        formData.showInfluencer = 'yes';
        const { key, other } = splitOther(data["Influencer Type"], influencerTypeReverseMap);
        formData.customerInfluencerType = key as any;
    }

    formData.benefits = parseArrayOrCsv(data["Benefits Offered"] || data["Benefits"]).join(', ') || '';
    formData.competitorBenefitDifference = data["Unique Benefits vs Competitors"] || '';
    formData.consumerExperienceAfter = parseArrayOrCsv(data["Consumer Experience After Use"]).join(', ') || '';

    formData.competitors = parseArrayOrCsv(data["Primary Competitors"] || data["Competitors"]).join('\n');

    if (data["Desired Brand Tone"]) formData.desiredImageryTone = toneReverseMap.get(data["Desired Brand Tone"].trim()) || data["Desired Brand Tone"];
    const savedWorld = migrateBrandWorld(data["Desired Brand World"]);
    if (savedWorld) formData.desiredImageryWorld = worldReverseMap.get(savedWorld) || savedWorld;

    // Fallback for old combined key
    if (!formData.desiredImageryTone || !formData.desiredImageryWorld) {
        const imageryRaw = parseArrayOrCsv(data["Desired Brand Imagery"]);
        if (!formData.desiredImageryTone) {
            const toneItem = imageryRaw.find(v => toneReverseMap.has(v.trim()));
            if (toneItem) formData.desiredImageryTone = toneReverseMap.get(toneItem.trim()) || '';
        }
        if (!formData.desiredImageryWorld) {
            const worldItem = imageryRaw.find(v => worldReverseMap.has(v.trim()));
            if (worldItem) formData.desiredImageryWorld = worldReverseMap.get(worldItem.trim()) || '';
        }
    }

    if (data["Consumer's View of Brand Persona"]) {
        const { key, other } = splitOther(data["Consumer's View of Brand Persona"], brandAsPersonReverseMap);
        formData.brandAsPerson = key;
        formData.brandAsPersonOther = other;
    }

    const adObjRaw = parseArrayOrCsv(data["Ad Objectives"]);
    const newAdObjectives: string[] = [];
    const newAdObjectiveDetails: { [key: string]: string } = {};
    adObjRaw.forEach(item => {
        const parts = item.split(':');
        const key = adObjectivesReverseMap.get(parts[0].trim());
        if (key) {
            newAdObjectives.push(key);
            if (parts.length > 1) newAdObjectiveDetails[key] = parts.slice(1).join(':').trim();
        }
    });
    formData.adObjectives = newAdObjectives;
    formData.adObjectiveDetails = newAdObjectiveDetails;

    const imageryAttributesReverseMap = createReverseMap(formTranslations.section7.q7_1.options_attributes);
    const attributesRaw = parseArrayOrCsv(data["Desired Brand Attributes"]);
    attributesRaw.forEach(val => {
        const { key } = splitOther(val, imageryAttributesReverseMap);
        if (key) {
            formData.desiredImageryAttributes.push(key);
        }
    });

    const adFocusRaw = parseArrayOrCsv(data["Ad Focus (in order of priority)"]);
    const newAdFocus: string[] = [];
    const newAdFocusDetails: { [key: string]: string } = {};
    adFocusRaw.forEach(item => {
        const parts = item.split(':');
        const key = adFocusReverseMap.get(parts[0].trim());
        if (key) {
            newAdFocus.push(key);
            if (parts.length > 1) newAdFocusDetails[key] = parts.slice(1).join(':').trim();
        }
    });
    formData.adFocus = newAdFocus;
    formData.adFocusDetails = newAdFocusDetails;

    // Only set showInfluencer if not already set by Influencer Type presence
    if (!formData.showInfluencer || formData.showInfluencer !== 'yes') {
        formData.showInfluencer = data["Show Influencer in Ad?"] || data["Show Influencer In Ad"] || data["showInfluencer"] || 'no';
    }

    const packFormRaw = data["Product Pack Form"] || '';
    const packFormReverseMap = createReverseMap(formTranslations.section1.q1_4.packForm.options);
    const { key: pfKey, other: pfOther } = splitOther(packFormRaw, packFormReverseMap);
    formData.productPackForm = pfKey;
    formData.productPackFormOther = pfOther;

    formData.dialogueLanguage = data["Dialogue Language"] || '';
    formData.fullTranscript = data["Session Transcript"] || data["Transcript"] || '';

    return formData;
};

/**
 * Maps the raw, flat data from a webhook response to the nested NewFormData structure.
 */
export const mapRawDataToFormData = (raw: any): NewFormData => {
    const formData = getInitialFormData();

    // Handle both array response (first item) and direct object
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    const createReverseMap = (options: Record<string, any>) => {
        const map = new Map<string, string>();
        Object.entries(options).forEach(([key, labels]) => {
            if (typeof labels === 'object' && labels !== null) {
                Object.values(labels).forEach(label => {
                    if (typeof label === 'string') map.set(label.trim(), key);
                });
            } else if (typeof labels === 'string') {
                map.set(labels.trim(), key);
            }
        });
        return map;
    };

    const splitOther = (val: string, reverseMap: Map<string, string>) => {
        if (!val) return { key: '', other: '' };
        const parts = val.split(':');
        const label = parts[0].trim();
        const key = reverseMap.get(label);
        if (key === 'Other' || key === 'other') {
            return { key, other: parts.slice(1).join(':').trim() };
        }
        return { key: key || val, other: '' };
    };

    const genderReverseMap = createReverseMap(formTranslations.section3.genderOptions);
    const consumerAgeReverseMap = createReverseMap(formTranslations.section3.consumerAgeOptions);
    const customerAgeReverseMap = createReverseMap(formTranslations.section3.customerAgeOptions);
    const incomeReverseMap = createReverseMap(formTranslations.section3.incomeOptions);
    const geoReverseMap = createReverseMap(formTranslations.section3.geoOptions);
    const consumerViewPersonaReverseMap = createReverseMap(formTranslations.section7.q7_2.options);
    const adObjectivesReverseMap = createReverseMap(formTranslations.section7.q7_4.options);
    const adFocusReverseMap = createReverseMap(formTranslations.section7.q7_5.options);
    const psychographicTitleToIdMap = new Map(psychographicOptions.map(p => [p.title.trim(), p.id]));

    formData.salesperson = data["Salesperson"] || '';
    formData.customerID = data["Customer ID"] || '';
    formData.brandName = data["Brand Name"] || '';
    formData.adBrand = data["Ad Brand"] || '';
    formData.productName = data["Product to Showcase"] || '';
    formData.productType = data["Product Type"] || '';
    formData.brandSpecial = data["Brand's Special Qualities"] || '';
    formData.brandRegions = data["Primary Regions"] || '';
    formData.notable.Look = data["Notable Look/Shape"] || '';
    formData.notable.Feel = data["Notable Feel/Texture"] || '';
    formData.notable.Smell = data["Notable Smell/Aroma"] || '';
    formData.notable.Taste = data["Notable Taste"] || '';
    formData.uniqueProcesses = data["Unique Processes"] || data["Unique Techniques"] || '';
    formData.uniqueIngredients = data["Unique Ingredients"] || '';
    formData.uniqueOther = data["Certifications / Validations"] || data["Certifications / External Validation"] || '';
    formData.consumerProblem = data["Consumer Problem / Issue"] || data["Problem"] || '';
    formData.usage = data["Consumer Usage (When & How)"] || '';
    formData.functionalBenefits = data["Benefits Offered"] || '';
    formData.competitorBenefitDifference = data["Unique Benefits vs Competitors"] || '';
    formData.consumerExperienceAfter = data["Consumer Experience After Use"] || '';
    formData.competitors = parseArrayOrCsv(data["Primary Competitors"] || data["Competitors"]).join('\n');
    formData.fullTranscript = data["Session Transcript"] || data["Transcript"] || '';

    const [founder, year] = (data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';

    formData.demographics.age = parseArrayOrCsv(data["Customer - Age"]).map(v => customerAgeReverseMap.get(v.trim()) || v);
    const { key: cgKey, other: cgOther } = splitOther(data["Customer - Gender"], genderReverseMap);
    formData.demographics.gender = cgKey;
    formData.demographics.genderOther = cgOther;

    formData.consumerDemographics.age = parseArrayOrCsv(data["Consumer - Age"]).map(v => consumerAgeReverseMap.get(v.trim()) || v);
    const { key: cogKey, other: cogOther } = splitOther(data["Consumer - Gender"], genderReverseMap);
    formData.consumerDemographics.gender = cogKey;
    formData.consumerDemographics.genderOther = cogOther;

    formData.consumerDemographics.income = parseArrayOrCsv(data["Consumer - Income"]).map(v => incomeReverseMap.get(v.trim()) || v);
    formData.consumerDemographics.geography = parseArrayOrCsv(data["Consumer - Geography"]).map(v => geoReverseMap.get(v.trim()) || v);

    formData.psychographics = parseArrayOrCsv(data["Psychographics"] || data["Lifestyle & Beliefs"]).map(title => psychographicTitleToIdMap.get(migratePsychographic(title).trim())).filter((id): id is string => !!id);

    // Reverse map for desired imagery
    const imageryToneReverseMap = createReverseMap(formTranslations.section7.q7_1.options_tone);
    const imageryWorldReverseMap = createReverseMap(formTranslations.section7.q7_1.options_world);
    const imageryAttributesReverseMap = createReverseMap(formTranslations.section7.q7_1.options_attributes);

    // Support new flat keys and old combined key
    if (data["Desired Brand Tone"]) formData.desiredImageryTone = imageryToneReverseMap.get(data["Desired Brand Tone"].trim()) || data["Desired Brand Tone"];
    const savedWorld = migrateBrandWorld(data["Desired Brand World"]);
    if (savedWorld) formData.desiredImageryWorld = imageryWorldReverseMap.get(savedWorld) || savedWorld;

    const attributesRaw = parseArrayOrCsv(data["Desired Brand Attributes"]);
    attributesRaw.forEach(val => {
        const { key, other } = splitOther(val, imageryAttributesReverseMap);
        if (key) {
            formData.desiredImageryAttributes.push(key);
            if (key === 'Other') formData.desiredViewOther = other;
        }
    });

    // Fallback for old combined key
    if (!formData.desiredImageryTone || !formData.desiredImageryWorld || formData.desiredImageryAttributes.length === 0) {
        const desiredImageryRaw = parseArrayOrCsv(data["Desired Brand Imagery"]);

        desiredImageryRaw.forEach(itemStr => {
            const trimmedItem = itemStr.trim();
            const { key, other } = splitOther(trimmedItem, imageryToneReverseMap);
            if (key && !formData.desiredImageryTone && imageryToneReverseMap.has(trimmedItem)) {
                formData.desiredImageryTone = key;
                return;
            }

            const { key: wKey } = splitOther(trimmedItem, imageryWorldReverseMap);
            if (wKey && !formData.desiredImageryWorld && imageryWorldReverseMap.has(trimmedItem)) {
                formData.desiredImageryWorld = wKey;
                return;
            }

            const { key: aKey, other: aOther } = splitOther(trimmedItem, imageryAttributesReverseMap);
            if (aKey && imageryAttributesReverseMap.has(trimmedItem.split(':')[0].trim())) {
                formData.desiredImageryAttributes.push(aKey);
                if (aKey === 'Other') formData.desiredViewOther = aOther;
                return;
            }
        });
    }

    const { key: cvpKey, other: cvpOther } = splitOther(data["Consumer's View of Brand Persona"] || data["Consumer View Persona:"], consumerViewPersonaReverseMap);
    formData.consumerViewPersona = cvpKey;
    formData.consumerViewPersonaOther = cvpOther;

    const adObjectivesRaw = parseArrayOrCsv(data["Ad Objectives"]);
    const newAdObjectives: string[] = [];
    const newAdObjectiveDetails: { [key: string]: string } = {};
    adObjectivesRaw.forEach((item: string) => {
        const parts = item.split(':');
        const objectiveFullText = parts[0].trim();
        const detail = parts.length > 1 ? parts.slice(1).join(':').trim() : '';

        const objectiveKey = adObjectivesReverseMap.get(objectiveFullText);
        if (objectiveKey) {
            newAdObjectives.push(objectiveKey);
            if (detail) {
                newAdObjectiveDetails[objectiveKey] = detail;
            }
        }
    });
    formData.adObjectives = newAdObjectives;
    formData.adObjectiveDetails = newAdObjectiveDetails;

    const adFocusRaw = parseArrayOrCsv(data["Ad Focus (in order of priority)"]);
    const newAdFocus: string[] = [];
    const newAdFocusDetails: { [key: string]: string } = {};
    adFocusRaw.forEach((item: string) => {
        const parts = item.split(':');
        const objectiveFullText = parts[0].trim();
        const detail = parts.length > 1 ? parts.slice(1).join(':').trim() : '';
        const objectiveKey = adFocusReverseMap.get(objectiveFullText);
        if (objectiveKey) {
            newAdFocus.push(objectiveKey);
            if (detail) {
                newAdFocusDetails[objectiveKey] = detail;
            }
        }
    });
    formData.adFocus = newAdFocus;
    formData.adFocusDetails = newAdFocusDetails;

    const packFormRaw = data["Product Pack Form"] || '';
    const packFormReverseMap = createReverseMap(formTranslations.section1.q1_4.packForm.options);
    const { key: pfKey, other: pfOther } = splitOther(packFormRaw, packFormReverseMap);
    formData.productPackForm = pfKey;
    formData.productPackFormOther = pfOther;

    formData.dialogueLanguage = data["Dialogue Language"] || '';

    return formData;
};

/**
 * Robustly extracts the target array from a webhook response. It intelligently searches
 * the data structure for an array whose elements match the expected structure.
 * This handles multiple common wrapper formats.
 * @param data The raw data from the webhook.
 * @returns An array of items, or null if no matching array can be extracted.
 */
export const extractArrayFromWebhookResponse = (data: any): any[] | null => {
    if (!data) return null;

    // Unified helper to navigate nested response structures
    const getOutput = (d: any) => {
        if (!d) return null;
        if (Array.isArray(d) && d.length > 0) {
            let item = d[0];
            if (item && item.response && item.response.body) {
                const body = item.response.body;
                item = Array.isArray(body) && body.length > 0 ? body[0] : body;
            }
            return item?.output;
        }
        return d.output;
    }

    const output = getOutput(data);
    if (output) {
        if (output.stories && Array.isArray(output.stories)) return output.stories;
        if (output.pillars && Array.isArray(output.pillars)) return output.pillars;
        if (output.worlds && Array.isArray(output.worlds)) return output.worlds;
    }

    // Fallback search for other structures
    let finalArray: any[] | null = null;

    const isSubmission = (obj: any) => obj && typeof obj === 'object' && obj.hasOwnProperty('executionID');
    const isPillar = (obj: any) => obj && typeof obj === 'object' && (obj.hasOwnProperty('pillar_id') || obj.hasOwnProperty('name'));
    const isStory = (obj: any) => obj && typeof obj === 'object' && (obj.hasOwnProperty('storyline') || obj.hasOwnProperty('logline'));
    const isWorld = (obj: any) => obj && typeof obj === 'object' && (obj.hasOwnProperty('why_it_fits') || obj.hasOwnProperty('why')) && (obj.hasOwnProperty('title') || obj.hasOwnProperty('label'));

    const findDataArray = (value: any) => {
        if (finalArray) return;

        if (Array.isArray(value) && value.length > 0) {
            if (isSubmission(value[0]) || isPillar(value[0]) || isStory(value[0]) || isWorld(value[0])) {
                finalArray = value;
                return;
            }
        }

        if (typeof value === 'object' && value !== null) {
            if (value.stories && Array.isArray(value.stories)) {
                finalArray = value.stories;
                return;
            }
            if (value.pillars && Array.isArray(value.pillars)) {
                finalArray = value.pillars;
                return;
            }
            if (value.worlds && Array.isArray(value.worlds)) {
                finalArray = value.worlds;
                return;
            }
            for (const key in value) {
                findDataArray(value[key]);
            }
        }
    };

    findDataArray(data);
    return finalArray;
};


export const mapRawDataToLifestyleFormData = (raw: any): LifestyleFormData => {
    const formData = getInitialLifestyleFormData();
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    formData.salesperson = data["Salesperson"] || '';
    formData.customerID = data["Customer ID"] || '';
    formData.brands = data["Brand Name"] || '';
    formData.adBrand = data["adBrand"] || data["Ad Brand"] || '';
    formData.productName = data["Product to Showcase"] || '';
    const subCats = parseArrayOrCsv(data["Product Sub-category"]);
    const subCatOther = subCats.find(s => s.startsWith('Others:'));
    formData.subCategory = subCatOther ? subCats.map(s => s.startsWith('Others:') ? 'Others' : s) : subCats;
    formData.subCategoryOther = subCatOther ? subCatOther.replace(/^Others:\s*/, '') : '';
    formData.brandSpecial = data["Brand's Special Qualities"] || '';
    
    const [founder, year] = safeStr(data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';
    formData.brandRegions = data["Primary Regions"] || '';
    
    formData.specialLook = data["Design / Craftsmanship"] || data["Design/Craftsmanship"] || '';
    formData.specialMaterials = data["Materials / Fabric / Finish"] || data["Materials/Fabric/Finish"] || '';
    formData.specialTech = data["Unique Technique / Process"] || data["Unique Technique/Process"] || '';
    formData.specialCollections = data["Exclusive Collections"] || data["Exclusive Collections/Collaborations"] || '';
    formData.specialOthers = data["Special Others"] || '';
    formData.certifications = data["Certifications / Validations"] || data["Certifications / External Validation"] || '';
    
    formData.consumerAge = parseArrayOrCsv(data["Consumer - Age"]);
    formData.consumerGender = data["Consumer - Gender"] || '';
    formData.consumerIncome = parseArrayOrCsv(data["Consumer - Income"]);
    formData.consumerGeography = parseArrayOrCsv(data["Consumer - Geography"]);
    formData.consumerProblem = data["Consumer Problem"] || data["Problem"] || '';

    formData.customerAge = parseArrayOrCsv(data["Customer - Age"]);
    formData.customerGender = data["Customer - Gender"] || '';
    formData.customerLifestyle = parseArrayOrCsv(data["Lifestyle & Beliefs"] || data["Typical Lifestyle/Style Preference"]).map(migratePsychographic);

    const ocSeg = safeStr(data["Other Customer Segment"]);
    if (ocSeg.startsWith('Others:')) {
        formData.otherCustomerSegment = 'Others';
        formData.otherCustomerSegmentBrief = ocSeg.replace(/^Others:\s*/, '');
    } else {
        formData.otherCustomerSegment = ocSeg;
    }

    formData.usageOccasions = data["Consumer Usage Occasions"] || '';
    formData.shoppingExperience = data["In-store Shopping Experience"] || '';
    const rawLifestyleCompany = parseArrayOrCsv(data["Shopping Company"] || data["Typical Shopping Companions"]);
    const lifestyleCompanyOther = rawLifestyleCompany.find(s => s.startsWith('Others:'));
    formData.shoppingCompany = lifestyleCompanyOther ? rawLifestyleCompany.map(s => s.startsWith('Others:') ? 'Others' : s) : rawLifestyleCompany;
    formData.shoppingCompanyOtherBrief = lifestyleCompanyOther ? lifestyleCompanyOther.replace(/^Others:\s*/, '') : '';

    formData.keyBenefits = data["Benefits Offered"] || '';
    formData.competitorDifference = data["Unique Benefits vs Competitors"] || '';
    formData.emotionalOutcome = data["Consumer Emotional Outcome"] || data["Consumer Experience After Use"] || '';
    
    formData.competitors = parseArrayOrCsv(data["Primary Competitors"]).join('\n');
    
    formData.desiredTone = data["Desired Brand Tone"] || '';
    formData.desiredWorld = migrateBrandWorld(data["Desired Brand World"]);
    const rawAttrs = parseArrayOrCsv(data["Desired Brand Attributes"]);
    const attrOther = rawAttrs.find(a => a.startsWith('Other:'));
    formData.desiredAttributes = attrOther ? rawAttrs.map(a => a.startsWith('Other:') ? 'Other' : a) : rawAttrs;
    formData.desiredAttributesOther = attrOther ? attrOther.replace(/^Other:\s*/, '') : '';

    const bapRaw = safeStr(data["Brand Persona"] || data["Consumer's View of Brand Persona"]);
    if (bapRaw.startsWith('Other:')) {
        formData.brandAsPerson = 'Other';
        formData.brandAsPersonOther = bapRaw.replace(/^Other:\s*/, '');
    } else {
        formData.brandAsPerson = bapRaw;
    }
    
    const adObjRaw = parseArrayOrCsv(data["Ad Objectives"]);
    adObjRaw.forEach(item => {
        const parts = item.split(':');
        const key = parts[0].trim();
        if (key) {
            formData.adObjectives.push(key);
            if (parts.length > 1) formData.adObjectiveDetails[key] = parts.slice(1).join(':').trim();
        }
    });

    const msgRaw = parseArrayOrCsv(data["Important Messages"] || data["Ad Focus (in order of priority)"]);
    msgRaw.forEach(item => {
        const parts = item.split(':');
        const key = parts[0].trim();
        if (key) {
            formData.adImportantMessages.push(key);
            if (parts.length > 1) formData.adMessageDetails[key] = parts.slice(1).join(':').trim();
        }
    });

    formData.featureStore = data["Feature Store in Ad"] || '';

    const ffRaw = safeStr(data["Feature Founder/Employee"]);
    if (ffRaw.startsWith('Yes:')) {
        formData.featureFounderEmployee = 'Yes';
        formData.featureFounderEmployeeBrief = ffRaw.replace(/^Yes:\s*/, '');
    } else {
        formData.featureFounderEmployee = ffRaw;
    }

    formData.storesListLink = data["Store Link"] || '';
    formData.dialogueLanguage = data["Dialogue Language"] || '';
    formData.fullTranscript = data["Session Transcript"] || data["Transcript"] || '';

    return formData;
};

export const mapRawDataToRetailFormData = (raw: any): RetailFormData => {
    const formData = getInitialRetailFormData();
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    formData.salesperson = data["Salesperson"] || '';
    formData.customerID = data["Customer ID"] || '';
    formData.storeName = data["Store Name"] || data["Brand Name"] || '';
    const primCats = parseArrayOrCsv(data["Primary Categories"]);
    const primOther = primCats.find(s => s.startsWith('Others:'));
    formData.primaryCategories = primOther ? primCats.map(s => s.startsWith('Others:') ? 'Others' : s) : primCats;
    formData.primaryCategoriesOther = primOther ? primOther.replace(/^Others:\s*/, '') : '';
    formData.storeCountRegions = data["Store Count and Regions"] || '';
    formData.brandSpecial = data["Store's Special Qualities"] || data["Brand's Special Qualities"] || '';

    const [founder, year] = safeStr(data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';
    formData.regions = data["Primary Regions"] || '';

    formData.specialRange = data["Range / Variety"] || data["Range/Variety"] || '';
    formData.specialAmbience = data["Store Experience / Ambience"] || data["Store Experience/Ambience"] || '';
    formData.specialValue = data["Value / Pricing"] || data["Value/Pricing"] || '';
    formData.specialService = data["Service / Trust"] || data["Service/Trust"] || '';
    formData.specialOthers = data["Others"] || data["specialOthers"] || '';
    formData.recognitions = data["Recognitions"] || '';
    
    formData.shopperAge = parseArrayOrCsv(data["Shopper - Age"]);
    formData.shopperGender = data["Shopper - Gender"] || '';
    formData.shopperIncome = parseArrayOrCsv(data["Shopper - Income"]);
    formData.shopperGeography = parseArrayOrCsv(data["Shopper - Geography"]);
    formData.shopperCoreNeed = data["Shopper Core Need"] || data["Problem"] || '';
    formData.shopperLifestyle = parseArrayOrCsv(data["Shopper Lifestyle"]).map(migratePsychographic);

    const ocSegR = safeStr(data["Other Customer Segment"]);
    if (ocSegR.startsWith('Others:')) {
        formData.otherCustomerSegment = 'Others';
        formData.otherCustomerSegmentBrief = ocSegR.replace(/^Others:\s*/, '');
    } else {
        formData.otherCustomerSegment = ocSegR;
    }

    const rawCompany = parseArrayOrCsv(data["Shopping Company"] || data["Typical Shopper/Decision Maker"]);
    const companyOther = rawCompany.find(s => s.startsWith('Others:'));
    formData.shoppingCompany = companyOther ? rawCompany.map(s => s.startsWith('Others:') ? 'Others' : s) : rawCompany;
    formData.shoppingCompanyOther = companyOther ? companyOther.replace(/^Others:\s*/, '') : '';
    
    formData.shopperJourney = data["Shopper Journey"] || '';
    const rawOccasion = parseArrayOrCsv(data["Shopping Occasion trigger"] || data["Shopping Occasion"]);
    const occasionOther = rawOccasion.find(s => s.startsWith('Others:'));
    formData.shoppingOccasion = occasionOther ? rawOccasion.map(s => s.startsWith('Others:') ? 'Other' : s) : rawOccasion;
    formData.shoppingOccasionOther = occasionOther ? occasionOther.replace(/^Others:\s*/, '') : '';
    
    formData.keyBenefits = data["Key Benefits Offered"] || data["Benefits Offered"] || '';
    formData.competitorStandout = data["Competitor Standout Benefits"] || data["Unique Benefits vs Competitors"] || '';
    formData.shopperFeel = data["Shopper Feel Post Visit"] || data["Consumer Experience After Shopping"] || '';
    
    formData.competitors = parseArrayOrCsv(data["Primary Competitors"]).join('\n');
    
    formData.desiredTone = data["Desired Store Tone"] || data["Desired Brand Tone"] || '';
    formData.desiredWorld = migrateBrandWorld(data["Desired Brand World"]);
    const sapRaw = safeStr(data["Store Persona"] || data["Consumer's View of Brand Persona"]);
    if (sapRaw.startsWith('Other:')) {
        formData.storeAsPerson = 'Other';
        formData.storeAsPersonOther = sapRaw.replace(/^Other:\s*/, '');
    } else {
        formData.storeAsPerson = sapRaw;
    }
    
    const adObjRaw = parseArrayOrCsv(data["Ad Objectives"]);
    adObjRaw.forEach(item => {
        const parts = item.split(':');
        const key = parts[0].trim();
        if (key) {
            formData.adObjectives.push(key);
            if (parts.length > 1) formData.adObjectiveDetails[key] = parts.slice(1).join(':').trim();
        }
    });

    const msgRawR = parseArrayOrCsv(data["Important Messages"] || data["Ad Focus (in order of priority)"]);
    msgRawR.forEach(item => {
        const parts = item.split(':');
        const key = parts[0].trim();
        if (key) {
            formData.adImportantMessages.push(key);
            if (parts.length > 1) formData.adMessageDetails[key] = parts.slice(1).join(':').trim();
        }
    });

    const ongoingOfferRaw = safeStr(data["Ongoing Offer Event"] || data["Ongoing Offer/Event"]);
    formData.ongoingOffer = ongoingOfferRaw === 'No' || !ongoingOfferRaw ? 'No' : 'Yes';
    formData.offerDetails = ongoingOfferRaw && ongoingOfferRaw !== 'No' ? ongoingOfferRaw.replace(/^Yes:\s*/, '') : '';
    formData.storesListLink = data["Store Link"] || '';
    formData.dialogueLanguage = data["Dialogue Language"] || '';
    formData.fullTranscript = data["Session Transcript"] || data["Transcript"] || '';

    return formData;
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            } else {
                reject(new Error("Failed to convert blob to base64."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const stripHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

/**
 * Detects and collapses consecutive repetition loops in AI-generated transcripts.
 * Gemini occasionally hallucinates by repeating the same word or phrase dozens
 * or hundreds of times in a row. This function scans for such patterns (phrase
 * lengths of 1–8 words) and collapses them if they repeat more than 10 times
 * consecutively, preserving one clean instance of the phrase.
 *
 * Examples cleaned:
 *   "yes yes yes yes yes yes yes yes yes yes yes yes" → "yes"
 *   "very good very good very good ...×40" → "very good"
 *   "the product is great the product is great ...×20" → "the product is great"
 */
export const cleanRepetitions = (text: string): string => {
    if (!text || text.trim() === '') return text;

    const REPETITION_THRESHOLD = 10; // min consecutive repeats to trigger cleanup
    const MAX_PHRASE_WORDS = 8;      // max phrase length (in words) to check

    const words = text.split(/\s+/);
    const result: string[] = [];
    let i = 0;

    while (i < words.length) {
        let collapsed = false;

        // Try phrase lengths from longest to shortest for best match
        for (let phraseLen = MAX_PHRASE_WORDS; phraseLen >= 1; phraseLen--) {
            if (i + phraseLen > words.length) continue;

            const phrase = words.slice(i, i + phraseLen);
            const phraseStr = phrase.join(' ');

            // Count how many times this phrase repeats consecutively from position i
            let repeatCount = 0;
            let j = i;
            while (
                j + phraseLen <= words.length &&
                words.slice(j, j + phraseLen).join(' ') === phraseStr
            ) {
                repeatCount++;
                j += phraseLen;
            }

            if (repeatCount >= REPETITION_THRESHOLD) {
                // Keep exactly one instance, skip the rest
                result.push(...phrase);
                i = j; // jump past all repetitions
                collapsed = true;
                break;
            }
        }

        if (!collapsed) {
            result.push(words[i]);
            i++;
        }
    }

    return result.join(' ');
};