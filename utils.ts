/**
 * GENERAL TOOLS & HELPERS
 * 
 * WHAT THIS FILE DOES:
 * - A collection of "Calculators" and "Translators" used throughout the app.
 * - Cleans up messy data so the AI can understand it.
 * - Tells the app how to turn many small pieces of information into a single clean package.
 * - Figures out if a product is a food item or an industrial tool based on what was typed.
 */

import { NewFormData, Language, UploadedImage, IndustrialFormData, LifestyleFormData, RetailFormData } from './types';
import { psychographicOptions } from './data/psychographics';
import { formTranslations, industrialFormTranslations } from './data/translations';
import { lifestyleFormTranslations } from './data/lifestyleTranslations';
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
    adObjectives: [], adObjectiveDetails: {}, adImportantMessages: [], adMessageDetails: {}, featureStore: "", featureFounderEmployee: "", featureFounderEmployeeBrief: "",
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
    adObjectives: [], adObjectiveDetails: {}, adImportantMessages: [], adMessageDetails: {}, ongoingOffer: "", offerDetails: "",
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
        "Session Transcript": data.fullTranscript,
    };
};

/**
 * Maps the raw, flat data from a webhook response to the nested NewFormData structure.
 */
/**
 * Helper to parse array fields that might be JSON arrays or CSV strings.
 */
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

export const inferCategory = (data: any): 'fmcg' | 'industrial' | 'lifestyle' | 'retail' => {
    // Check for explicit category field first
    if (data.category === 'industrial' || data.Category === 'industrial') return 'industrial';
    if (data.category === 'lifestyle' || data.Category === 'lifestyle') return 'lifestyle';
    if (data.category === 'retail' || data.Category === 'retail') return 'retail';
    if (data.category === 'fmcg' || data.Category === 'fmcg') return 'fmcg';

    if (data['Products/Brands Offered']) return 'industrial';
    if (data['Product Sub-category'] || data['Design / Craftsmanship']) return 'lifestyle';
    if (data['Primary Categories'] || data['Store\'s Special Qualities']) return 'retail';

    // Industrial unique indicators
    if (data['Typical Household Type'] || data['Show Influencer in Ad?'] || data['Primary Customer / Influencer']) return 'industrial';

    // FMCG unique indicators
    if (data['Notable Taste'] || data['Notable Smell/Aroma'] || data['Notable Look/Shape'] || data['Notable Feel/Texture']) return 'fmcg';

    // Default fallback
    return 'fmcg';
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
    if (data["Desired Brand World"]) formData.desiredImageryWorld = worldReverseMap.get(data["Desired Brand World"].trim()) || data["Desired Brand World"];

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

    formData.psychographics = parseArrayOrCsv(data["Psychographics"] || data["Lifestyle & Beliefs"]).map(title => psychographicTitleToIdMap.get(title.trim())).filter((id): id is string => !!id);

    // Reverse map for desired imagery
    const imageryToneReverseMap = createReverseMap(formTranslations.section7.q7_1.options_tone);
    const imageryWorldReverseMap = createReverseMap(formTranslations.section7.q7_1.options_world);
    const imageryAttributesReverseMap = createReverseMap(formTranslations.section7.q7_1.options_attributes);

    // Support new flat keys and old combined key
    if (data["Desired Brand Tone"]) formData.desiredImageryTone = imageryToneReverseMap.get(data["Desired Brand Tone"].trim()) || data["Desired Brand Tone"];
    if (data["Desired Brand World"]) formData.desiredImageryWorld = imageryWorldReverseMap.get(data["Desired Brand World"].trim()) || data["Desired Brand World"];

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
    formData.customerLifestyle = parseArrayOrCsv(data["Lifestyle & Beliefs"] || data["Typical Lifestyle/Style Preference"]);

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
    formData.desiredWorld = data["Desired Brand World"] || '';
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
    formData.shopperLifestyle = parseArrayOrCsv(data["Shopper Lifestyle"]);

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
    formData.desiredWorld = data["Desired Brand World"] || '';
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