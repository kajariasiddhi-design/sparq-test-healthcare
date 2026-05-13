import { addTranslations } from "./translation-utils";
import { section1 } from "./fmcg/section1";
import { section2 } from "./fmcg/section2";
import { section3 } from "./fmcg/section3";
import { section4 } from "./fmcg/section4";
import { section5 } from "./fmcg/section5";
import { section6 } from "./fmcg/section6";
import { section7 } from "./fmcg/section7";

export const fmcgFormTranslations = {
  audio: {
    title: addTranslations("Voice Recording", "वॉइस रिकॉर्डिंग", "குரல் பதிவு", "వాయిస్ రికార్డింగ్", "વૉઇસ રેકોર્ડિંગ"),
    context: addTranslations("Talk about your brand and product for AI-powered suggestions", "AI-संचालित सुझावों के लिए अपने ब्रांड और उत्पाद के बारे में बात करें", "AI-இயக்கப்படும் பரிந்துரைகளுக்கு உங்கள் பிராண்ட் மற்றும் தயாரிப்பு பற்றி பேசுங்கள்", "AI-ఆధారిత సూచనల కోసం మీ బ్రాండ్ మరియు ఉత్పత్తి గురించి మాట్లాడండి", "AI-સંચાલિત સૂચનો માટે તમારી બ્રાન્ડ અને ઉત્પાદન વિશે વાત કરો"),
    analyse: addTranslations("Analyse Voice Recording", "वॉइस रिकॉर्डिंग का विश्लेषण करें", "குரல் பதிவை பகுப்பாய்வு செய்யுங்கள்", "వాయిస్ రికార్డింగ్‌ను విశ్లేషించండి", "વૉઇસ રેકોર્ડિંગનું વિશ્લેષણ કરો"),
    analysing: addTranslations("Analysing...", "विश्लेषण हो रहा है...", "பகுப்பாய்வு செய்கிறது...", "విశ్లేషిస్తోంది...", "વિશ્લેષણ કરી રહ્યું છે..."),
    suggestionTitle: addTranslations("AI Suggestion", "AI सुझाव", "AI பரிந்துரை", "AI సూచన", "AI સૂચન"),
    addNote: addTranslations("Start Recording", "रिकॉर्डिंग शुरू करें", "பதிவு தொடங்கு", "రికార్డింగ్ ప్రారంభించండి", "રેકોર્ડિંગ શરૂ કરો"),
    stopNote: addTranslations("Stop Recording", "रिकॉर्डिंग बंद करें", "பதிவு நிறுத்து", "రికార్డింగ్ ఆపండి", "રેકોર્ડિંગ બંધ કરો"),
    micSource: addTranslations("Mic Source", "माइक स्रोत", "மைக் மூலம்", "మైక్ మూలం", "માઇક સ્ત્રોત"),
    status: {
      idle: addTranslations("Idle", "निष्क्रिय", "செயலற்ற", "నిష్క్రియ", "નિષ્ક્રિય"),
      recording: addTranslations("Recording...", "रिकॉर्डिंग हो रही है...", "பதிவு செய்கிறது...", "రికార్డింగ్ జరుగుతోంది...", "રેકોર્ડિંગ થઈ રહ્યું છે..."),
      processing: addTranslations("Processing...", "प्रसंस्करण हो रहा है...", "செயலாக்குகிறது...", "ప్రాసెస్ చేస్తోంది...", "પ્રક્રિયા થઈ રહી છે..."),
      error: addTranslations("Mic Error", "माइक त्रुटि", "மைக் பிழை", "మైక్ లోపం", "માઇક ભૂલ")
    },
    clipsTitle: addTranslations("Recorded Clips", "रिकॉर्ड किए गए क्लिप्स", "பதிவு செய்யப்பட்ட கிளிப்புகள்", "రికార్డ్ చేసిన క్లిప్‌లు", "રેકોર્ડ કરેલા ક્લિપ્સ"),
    retryFailed: addTranslations("Retry Failed", "पुनः प्रयास विफल रहा", "மீண்டும் முயற்சி தோல்வியடைந்தது", "మళ్ళీ ప్రయత్నం విఫలమైంది", "ફરીથી પ્રયાસ નિષ્ફળ રહ્યો"),
    transcriptTitle: addTranslations("Current Full Transcript", "वर्तमान पूर्ण ट्रांसक्रिप्शन", "தற்போதைய முழு படியெடுப்பு", "ప్రస్తుత పూర్తి ట్రాన్స్‌క్రిప్షన్", "વર્તમાન સંપૂર્ણ ટ્રાન્સક્રિપ્શન"),
    transcriptExpand: addTranslations("Expand", "विस्तार करें", "விரிவாக்கு", "విస్తరించు", "વિસ્તાર કરો"),
    transcriptModalTitle: addTranslations("Full Transcript", "पूर्ण ट्रांसक्रिप्शन", "முழு படியெடுப்பு", "పూర్తి ట్రాన్స్‌క్రిప్షన్", "સંપૂર્ણ ટ્રાન્સક્રિપ્શન"),
    copy: addTranslations("Copy", "कॉपी करें", "நகலெடு", "కాపీ చేయి", "કૉપિ કરો"),
    transcriptClose: addTranslations("Close", "बंद करें", "மூடு", "మూసివేయి", "બંધ કરો")
  },
  salespersonSection: {
    title: addTranslations("Salesperson Details", "सेल्सपर्सन विवरण", "விற்பனையாளர் விவரங்கள்", "సేల్స్‌పర్సన్ వివరాలు", "સેલ્સપર્સન વિગતો"),
    context: addTranslations("Confirm salesperson and customer identity", "सेल्सपर्सन और ग्राहक की पहचान की पुष्टि करें", "விற்பனையாளர் மற்றும் வாடிக்கையாளர் அடையாளத்தை உறுதிப்படுத்தவும்", "సేల్స్‌పర్సన్ మరియు కస్టమర్ గుర్తింపును నిర్ధారించండి", "સેલ્સપર્સન અને ગ્રાહક ઓળખ પુષ્ટિ કરો"),
    salesperson: addTranslations("Salesperson", "सेल्सपर्सन", "விற்பனையாளர்", "సేల్స్‌పర్సన్", "સેલ્સપર્સન"),
    customerID: addTranslations("Customer ID", "ग्राहक आईडी", "வாடிக்கையாளர் ID", "కస్టమర్ ID", "ગ્રાહક ID"),
    customerIDPlaceholder: addTranslations("Enter Customer ID from ERP", "ERP से ग्राहक आईडी दर्ज करें", "ERP-இலிருந்து வாடிக்கையாளர் ID-ஐ உள்ளிடவும்", "ERP నుండి కస్టమర్ IDని నమోదు చేయండి", "ERPમાંથી ગ્રાહક ID દાખલ કરો"),
  },
  specifyOther: addTranslations("Please specify...", "कृपया निर्दिष्ट करें...", "குறிப்பிடவும்...", "దయచేసి పేర్కొనండి...", "કૃપા કરીને જણાવો..."),
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7
};
