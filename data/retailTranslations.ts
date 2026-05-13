import { addTranslations } from "./translation-utils";
import { section1 } from "./retail/section1";
import { section2 } from "./retail/section2";
import { section3 } from "./retail/section3";
import { section4 } from "./retail/section4";
import { section5 } from "./retail/section5";
import { section6 } from "./retail/section6";
import { section7 } from "./retail/section7";
import { section8 } from "./retail/section8";

export const retailFormTranslations = {
  specifyOther: addTranslations("Please specify...", "कृपया निर्दिष्ट करें...", "குறிப்பிடவும்...", "దయచేసి పేర్కొనండి...", "કૃપા કરીને જણાવો..."),
  describeCategory: addTranslations("Describe the category", "श्रेणी का वर्णन करें", "வகை விவரணம்", "వర్గాన్ని వివరించండి", "શ્રેણીનું વર્ણન કરો"),
  describeBriefly: addTranslations("Describe briefly", "संक्षेप में वर्णन करें", "சுருக்கமாக விவரிக்கவும்", "సంక్షిప్తంగా వివరించండి", "સંક્ષિપ્તમાં વર્ણન કરો"),
  pasteStoreLink: addTranslations("Paste link of store list here", "यहाँ स्टोर सूची का लिंक पेस्ट करें", "கடைகள் பட்டியல் இணைப்பை இங்கே ஒட்டவும்", "స్టోర్ జాబితా లింక్‌ను ఇక్కడ పేస్ట్ చేయండి", "સ્ટોર યાદીની લિંક અહીં પેસ્ટ કરો"),
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  section8
};
