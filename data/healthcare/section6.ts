import { addTranslations } from "../translation-utils";

export const section6 = {
    title: addTranslations("Desired Perception and Ad Objectives", "वांछित धारणा और विज्ञापन उद्देश्य", "விரும்பிய கருத்து மற்றும் விளம்பர நோக்கங்கள்", "కావలసిన అవగాహన మరియు ప్రకటన లక్ష్యాలు", "ઇચ્છિત ધારણા અને જાહેરાત ઉદ્દેશ્યો"),
    q6_1: {
      text: addTranslations("How would you like patients to perceive your hospital / chain?", "आप क्या चाहेंगे कि मरीज़ आपके अस्पताल / श्रृंखला को किस रूप में देखें?", "நோயாளிகள் உங்கள் மருத்துவமனை / சங்கிலியை எப்படி உணர வேண்டும் என்று நீங்கள் விரும்புகிறீர்கள்?", "రోగులు మీ ఆసుపత్రి / చైన్‌ను ఎలా గ్రహించాలని మీరు కోరుకుంటున్నారు?", "તમે દર્દીઓ તમારી હોસ્પિટલ / ચેઇનને કેવી રીતે સમજે તેવું ઈચ્છો છો?"),
      tone: addTranslations("Tone", "टोन", "டோன்", "టోన్", "ટોન"),
      world: addTranslations("Brand World", "ब्रांड की दुनिया", "பிராண்ட் உலகம்", "బ్రాండ్ ప్రపంచం", "બ્રાન્ડ વર્લ્ડ"),
      options: {
        tone: ["Trustworthy / Mature", "Aspirational", "Technical and competency-oriented", "Warm / family-oriented"],
        world: ["Premium", "Mass / Popular", "Value-driven", "Regional", "Modern / International"],
      }
    },
    q6_2: {
      text: addTranslations("If the hospital / chain were a person, how would patients describe them?", "यदि अस्पताल / श्रृंखला एक व्यक्ति होता, तो मरीज़ उनका वर्णन कैसे करते?", "மருத்துவமனை / சங்கிலி ஒரு நபராக இருந்தால், நோயாளிகள் அவரை எப்படி விவரிப்பார்கள்?", "ఆసుపత్రి / చైన్ ఒక వ్యక్తి అయితే, రోగులు వారిని ఎలా వివరిస్తారు?", "જો હોસ્પિટલ / ચેઇન વ્યક્તિ હોત, તો દર્દીઓ તેનું વર્ણન કેવી રીતે કરશે?"),
      note: addTranslations("Select 1.", "1 चुनें।", "1 தேர்ந்தெடுக்கவும்.", "1 ఎంచుకోండి.", "1 પસંદ કરો."),
      options: ["Friend", "Expert / Advisor", "Family Elder", "Mentor", "Other"],
      placeholder: addTranslations("Describe the brand persona", "ब्रांड व्यक्तित्व का वर्णन करें", "பிராண்ட் ஆளுமையை விவரிக்கவும்", "బ్రాండ్ వ్యక్తిత్వాన్ని వివరించండి", "બ્રાન્ડ વ્યક્તિત્વનું વર્ણન કરો"),
    },
    q6_3: {
      text: addTranslations("What is the primary objective of this ad?", "इस विज्ञापन का प्राथमिक उद्देश्य क्या है?", "இந்த விளம்பரத்தின் முதன்மை நோக்கம் என்ன?", "ఈ ప్రకటన యొక్క ప్రాథమిక లక్ష్యం ఏమిటి?", "આ જાહેરાતનો પ્રાથમિક ઉદ્દેશ્ય શું છે?"),
      note: addTranslations("Select all that apply, then briefly describe what you mean by each objective below.", "जो भी लागू हों, सभी चुनें, फिर नीचे संक्षेप में बताएं कि हर उद्देश्य से आपका क्या मतलब है।", "பொருந்தும் அனைத்தையும் தேர்ந்தெடுத்து, ஒவ்வொரு நோக்கத்தின் மூலம் நீங்கள் எதைக் குறிப்பிடுகிறீர்கள் என்பதை கீழே சுருக்கமாக விவரிக்கவும்.", "వర్తించే అన్నింటినీ ఎంచుకుని, ప్రతి లక్ష్యం ద్వారా మీరు ఏమి ఉద్దేశించారో క్రింద క్లుప్తంగా వివరించండి.", "લાગુ પડતા બધા પસંદ કરો, પછી નીચે દરેક ઉદ્દેશ્યથી તમારો અર્થ શું છે તે ટૂંકમાં વર્ણવો."),
      options: [
        "Build Awareness",
        "Convey Emotions",
        "Build Brand Image / Trust",
        "New Hospital / Specialty",
        "Other"
      ],
      placeholder: addTranslations("Briefly describe what you mean by this objective", "संक्षेप में बताएं कि इस उद्देश्य से आपका क्या तात्पर्य है", "இந்த நோக்கத்தின் மூலம் நீங்கள் எதைக் குறிப்பிடுகிறீர்கள் என்பதைச் சுருக்கமாக விவரிக்கவும்", "ఈ లక్ష్యం ద్వారా మీరు ఏమి ఉద్దేశించారో క్లుప్తంగా వివరించండి", "આ ઉદ્દેશ્ય દ્વારા તમારો અર્થ શું છે તે ટૂંકમાં વર્ણવો"),
    },
    q6_4: {
      text: addTranslations("What is the most important thing the ad should communicate?", "विज्ञापन द्वारा संवाद की जाने वाली सबसे महत्वपूर्ण बात क्या है?", "விளம்பரம் தெரிவிக்க வேண்டிய மிக முக்கியமான விஷயம் எது?", "ప్రకటన తెలియజేయవలసిన అత్యంత ముఖ్యమైన విషయం ఏమిటి?", "જાહેરાતે જણાવવી જોઈએ તે સૌથી મહત્વની વાત કઈ છે?"),
      note: addTranslations("Select all that apply, then describe what specifically about each should come out in the ad.", "जो भी लागू हों, सभी चुनें, फिर बताएं कि विज्ञापन में हर एक के बारे में विशेष रूप से क्या सामने आना चाहिए।", "பொருந்தும் அனைத்தையும் தேர்ந்தெடுத்து, விளம்பரத்தில் ஒவ்வொன்றைப் பற்றியும் குறிப்பாக என்ன வர வேண்டும் என்பதை விவரிக்கவும்.", "వర్తించే అన్నింటినీ ఎంచుకుని, ప్రకటనలో ప్రతి దాని గురించి ప్రత్యేకంగా ఏమి రావాలో వివరించండి.", "લાગુ પડતા બધા પસંદ કરો, પછી જાહેરાતમાં દરેક વિશે ખાસ કરીને શું બહાર આવવું જોઈએ તેનું વર્ણન કરો."),
      options: ["Range of treatments", "Focus on specialty", "Focus on specific ailments", "Focus on renowned doctors", "Patient Experience", "Technology Used", "Brand Trust & Heritage", "Other"],
      placeholder: addTranslations("Describe what specifically about this should come out in the ad", "वर्णन करें कि विज्ञापन में विशेष रूप से इसके बारे में क्या सामने आना चाहिए", "விளம்பரத்தில் இதைப் பற்றி குறிப்பாக என்ன வர வேண்டும் என்பதை விவரிக்கவும்", "ప్రకటనలో దీని గురించి ప్రత్యేకంగా ఏమి రావాలో వివరించండి", "જાહેરાતમાં આના વિશે ખાસ કરીને શું બહાર આવવું જોઈએ તેનું વર્ણન કરો"),
    },
    q6_5: {
      text: addTranslations("Which language should the tagline / dialogues / voiceovers be in?", "टैगलाइन / डायलॉग / वॉइसओवर किस भाषा में होने चाहिए?", "டேக்லைன் / வசனங்கள் / குரல் நடை எந்த மொழியில் இருக்க வேண்டும்?", "ట్యాగ్‌లైన్ / సంభాషణలు / వాయిస్‌ఓవర్‌లు ఏ భాషలో ఉండాలి?", "ટેગલાઇન / સંવાદ / વૉઇસઓવર કઈ ભાષામાં હોવા જોઈએ?"),
      placeholder: addTranslations("Please specify", "कृपया बताएं", "தயவுசெய்து குறிப்பிடவும்", "దయచేసి పేర్కొనండి", "કૃપા કરીને જણાવો"),
    }
  };
