import { addTranslations } from "../translation-utils";

export const section7 = {
    title: addTranslations("Desired Perception and Ad Objectives", "वांछित धारणा और विज्ञापन उद्देश्य", "விரும்பிய கருத்து மற்றும் விளம்பர நோக்கங்கள்", "కావలసిన అవగాహన మరియు ప్రకటన లక్ష్యాలు", "ઇચ્છિત ધારણા અને જાહેરાત ઉદ્દેશ્યો"),
    q7_1: {
      text: addTranslations("How would you like shoppers to perceive your store?", "आप क्या चाहेंगे कि खरीदार आपके स्टोर को किस रूप में देखें?", "ஷாப்பர்கள் உங்கள் கடையை எப்படி உணர வேண்டும் என்று நீங்கள் விரும்புகிறீர்கள்?", "షాపర్‌లు మీ స్టోర్‌ను ఎలా గ్రహించాలనుకుంటున్నారు?", "તમે દુકાનદારો તમારા સ્ટોરને કેવી રીતે સમજે તેવું ઈચ્છો છો?"),
      tone: addTranslations("Tone", "टोन", "டோன்", "టోన్", "ટોન"),
      world: addTranslations("Brand World", "ब्रांड की दुनिया", "பிராண்ட் உலகம்", "బ్రాండ్ ప్రపంచం", "બ્રાન્ડ વર્લ્ડ"),
      options: {
        tone: ["Youthful / Fun", "Trustworthy / Mature", "Aspirational", "Warm / Family-oriented"],
        world: ["Premium", "Mass / Popular", "Value-driven", "Desi / Regional", "Modern / International"],
      }
    },
        q7_2: {
      text: addTranslations("If the store were a person, how would shoppers describe them?", "यदि स्टोर एक व्यक्ति होता, तो खरीदार उनका वर्णन कैसे करते?", "கடை ஒரு நபராக இருந்தால், கடைக்காரர்கள் அவற்றை எப்படி விவரிப்பார்கள்?", "స్టోర్ ఒక వ్యక్తి అయితే, దుకాణదారులు వాటిని ఎలా వివరిస్తారు?", "જો સ્ટોર વ્યક્તિ હોત, તો દુકાનદારો તેનું વર્ણન કેવી રીતે કરશે?"),
      options: ["Friend", "Expert / Advisor", "Family Elder", "Spouse", "Celebrity", "Mentor", "Aspirational Peer", "Other"],
      placeholder: addTranslations("Describe the brand persona", "ब्रांड व्यक्तित्व का वर्णन करें", "பிராண்ட் ஆளுமையை விவரிக்கவும்", "బ్రాండ్ వ్యక్తిత్వాన్ని వివరించండి", "બ્રાન્ડ વ્યક્તિત્વનું વર્ણન કરો"),
    },
    q7_3: {
      text: addTranslations("What is the primary objective of this ad?", "इस विज्ञापन का प्राथमिक उद्देश्य क्या है?", "இந்த விளம்பரத்தின் முதன்மை நோக்கம் என்ன?", "ఈ ప్రకటన యొక్క ప్రాథమిక లక్ష్యం ఏమిటి?", "આ જાહેરાતનો પ્રાથમિક ઉદ્દેશ્ય શું છે?"),
      options: [
        "Build Awareness",
        "Drive Footfall",
        "Promote a Sale / Offer",
        "New Store / Product Launch",
        "Build Brand Image / Trust",
        "Other"
      ],
      placeholder: addTranslations("Briefly describe what you mean by this objective", "संक्षेप में बताएं कि इस उद्देश्य से आपका क्या तात्पर्य है", "இந்த நோக்கத்தின் மூலம் நீங்கள் எதைக் குறிப்பிடுகிறீர்கள் என்பதைச் சுருக்கமாக விவரிக்கவும்", "ఈ లక్ష్యం ద్వారా మీరు ఏమి ఉద్దేశించారో క్లుప్తంగా వివరించండి", "આ ઉદ્દેશ્ય દ્વારા તમારો અર્થ શું છે તે ટૂંકમાં વર્ણવો"),
    },
    q7_4: {
      text: addTranslations("What is the most important thing the ad should communicate?", "विज्ञापन द्वारा संवाद की जाने वाली सबसे महत्वपूर्ण बात क्या है?", "விளம்பரம் தெரிவிக்க வேண்டிய மிக முக்கியமான விஷயம் எது?", "ప్రకటన తెలియజేయవలసిన అత్యంత ముఖ్యమైన విషయం ఏమిటి?", "જાહેરાતે જે સૌથી મહત્વની વાત જણાવવી જોઈએ તેનું વર્ણન કરો"),
      options: ["Range & Variety", "Value / Offers / Pricing", "Store Experience", "Brand Trust & Heritage", "Convenience / One-stop Shop", "Other"],
      placeholder: addTranslations("Describe what specifically about this should come out in the ad", "वर्णन करें कि विज्ञापन में विशेष रूप से इसके बारे में क्या सामने आना चाहिए", "விளம்பரத்தில் இதைப் பற்றி குறிப்பாக என்ன வர வேண்டும் என்பதை விவரிக்கவும்", "ప్రకటనలో దీని గురించి ప్రత్యేకంగా ఏమి రావాలో వివరించండి", "જાહેરાતમાં આના વિશે ખાસ કરીને શું બહાર આવવું જોઈએ તેનું વર્ણન કરો"),
    },
    q7_5: {
      text: addTranslations("Is there an ongoing offer, sale event, or festive campaign this ad should be tied to?", "क्या कोई चालू ऑफर, बिक्री कार्यक्रम या उत्सव अभियान है जिससे इस विज्ञापन को जोड़ा जाना चाहिए?", "இந்த விளம்பரத்துடன் இணைக்கப்பட வேண்டிய ஏதேனும் தற்போதைய சலுகை, விற்பனை நிகழ்வு அல்லது பண்டிகை பிரச்சாரம் உள்ளதா?", "ఈ ప్రకటనకు అనుసంధానించబడిన కొనసాగుతున్న ఆఫర్, విక్రయ ఈవెంట్ లేదా పండుగ ప్రచారం ఉందా?", "શું કોઈ ચાલુ ઓફર, સેલ ઈવેન્ટ અથવા ઉત્સવની ઝુંબેશ છે જેની સાથે આ જાહેરાત જોડાયેલી હોવી જોઈએ?"),
      options: {
        "Yes": addTranslations("Yes", "हाँ", "ஆம்", "అవును", "હા"),
        "No": addTranslations("No", "नहीं", "இல்லை", "లేదు", "ના"),
      },
      placeholder: addTranslations("e.g., Diwali Dhamaka Sale — up to 50% off on all electronics and apparel, 15 to 30 October.", "उदा., दिवाली धमाका सेल - सभी इलेक्ट्रॉनिक्स और परिधानों पर 50% तक की छूट, 15 से 30 अक्टूबर।", "எ.கா., தீபாவளி தமாக்கா விற்பனை - அனைத்து எலக்ட்ரானிக்ஸ் மற்றும் ஆடைகளுக்கும் 50% வரை தள்ளுபடி, அக்டோபர் 15 முதல் 30 வரை.", "ఉదా., దీపావళి ధమాకా సేల్ — అన్ని ఎలక్ట్రానిక్స్ మరియు దుస్తులపై 50% వరకు తగ్గింపు, అక్టోబర్ 15 నుండి 30 వరకు.", "દા.ત., દિવાળી ધમાકા સેલ - તમામ ઇલેક્ટ્રોનિક્સ અને એપરલ પર 50% સુધીની છૂટ, 15 થી 30 ઓક્ટોબર."),
    }
  };