import { addTranslations } from "../translation-utils";

export const section7 = {
    title: addTranslations("Desired Perception and Ad Objectives", "वांछित धारणा और विज्ञापन उद्देश्य", "விரும்பிய கருத்து மற்றும் விளம்பர நோக்கங்கள்", "కావలసిన అవగాహన మరియు ప్రకటన లక్ష్యాలు", "ઇચ્છિત ધારણા અને જાહેરાత ઉદ્દેશ્યો"),
    q7_1: {
      text: addTranslations("How would you like consumers to perceive this brand?", "आप क्या चाहेंगे कि उपभोक्ता इस ब्रांड को कैसे देखें?", "நுகர்வோர் இந்த பிராண்டை எப்படி உணர வேண்டும் என்று நீங்கள் விரும்புகிறீர்கள்?", "వినియోగదారులు ఈ బ్రాండ్‌ను ఎలా చూడాలని మీరు కోరుకుంటున్నారు?", "તમે શું ઈચ્છો છો કે ગ્રાહકો આ બ્રાન્ડને કેવી રીતે જોવે?"),
      tone: addTranslations("Tone", "टोन", "டோன்", "టోన్", "ટોન"),
      world: addTranslations("Brand World", "ब्रांड की दुनिया", "பிராண்ட் உலகம்", "బ్రాండ్ ప్రపంచం", "બ્રાન્ડ వర్લ્ડ"),
      attributes: addTranslations("Attributes (up to 2)", "गुण (2 तक)", "பண்புகள் (2 வரை)", "లక్షణాలు (2 వరకు)", "ગુણધર્મો (2 સુધી)"),
      options: {
        tone: ["Youthful", "Mature", "Light-hearted", "Serious"],
        world: ["Premium", "Luxury", "Mass / Popular", "International"],
        attributes: ["Crafted / Artisanal", "Modern / Contemporary", "Traditional / Heritage", "Innovative", "Other"]
      }
    },
        q7_2: {
      text: addTranslations("If the brand were a person, how would consumers see this person?", "यदि ब्रांड एक व्यक्ति होता, तो उपभोक्ता इस व्यक्ति को कैसे देखते?", "பிராண்ட் ஒரு நபராக இருந்தால், நுகர்வோர் இந்த நபரை எப்படிப் பார்ப்பார்கள்?", "బ్రాండ్ ఒక వ్యక్తి అయితే, వినియోగదారులు ఆ వ్యక్తిని ఎలా చూస్తారు?", "જો બ્રાન્ડ એક વ્યક્તિ હોત, તો ગ્રાહકો આ વ્યક્તિને કેવી રીતે જોશે?"),
      options: ["Friend", "Expert / Advisor", "Family Elder", "Spouse", "Celebrity", "Mentor", "Aspirational Peer", "Other"],
      placeholder: addTranslations("Describe the brand persona", "ब्रांड व्यक्तित्व का वर्णन करें", "பிராண்ட் ஆளுமையை விவரிக்கவும்", "బ్రాండ్ వ్యక్తిత్వాన్ని వివరించండి", "બ્રાન્ડ વ્યક્તિત્વનું વર્ણન કરો"),
    },
    q7_3: {
      text: addTranslations("What is the primary objective of this ad?", "इस विज्ञापन का प्राथमिक उद्देश्य क्या है?", "இந்த விளம்பரத்தின் முதன்மை நோக்கம் என்ன?", "ఈ ప్రకటన యొక్క ప్రాథమిక లక్ష్యం ఏమిటి?", "આ જાહેરાતનો પ્રાથમિક ઉદ્દેશ્ય શું છે?"),
      options: [
        "Build Awareness (make my brand top of mind)",
        "Build Emotions / Image (connect with the user on an emotional level)",
        "New Launch (introduce a new product / variant)",
        "Festive / Seasonal Offer",
        "Drive Footfall to Store",
        "Other"
      ],
      placeholder: addTranslations("Briefly describe what you mean by this objective", "संक्षेप में बताएं कि इस उद्देश्य से आपका क्या तात्पर्य है", "இந்த நோக்கத்தின் மூலம் நீங்கள் எதைக் குறிப்பிடுகிறீர்கள் என்பதைச் சுருக்கமாக விவரிக்கவும்", "ఈ లక్ష్యం ద్వారా మీరు ఏమి ఉద్దేశించారో క్లుప్తంగా వివరించండి", "આ ఉદ્దేశ్య ద్వారా તમાరో અર્થ શું છે તે ટૂંકમાં વર્ણવો"),
    },
    q7_4: {
      text: addTranslations("What is the most important thing the ad should communicate?", "विज्ञापन द्वारा संवाद की जाने वाली सबसे महत्वपूर्ण बात क्या है?", "விளம்பரம் தெரிவிக்க வேண்டிய மிக முக்கியமான விஷயம் எது?", "ప్రకటన తెలియజేయవలసిన అత్యంతమైన విషయం ఏమిటి?", "જાહેરાતે જે સૌથી મહત્વની વાત જણાવવી જોઈએ તે શું છે?"),
      options: ["Brand Heritage / Trust", "Product Design / Aesthetics", "Product Benefit", "Emotions", "Unique Differentiator", "Other"],
      placeholder: addTranslations("Describe what specifically about this should come out in the ad", "वर्णन करें कि विज्ञापन में विशेष रूप से इसके बारे में क्या सामने आना चाहिए", "விளம்பரத்தில் இதைப் பற்றி குறிப்பாக என்ன வர வேண்டும் என்பதை விவரிக்கவும்", "ప్రకటనలో దీని గురించి ప్రత్యేకంగా ఏమి రావాలో వివరించండి", "જાહેરાતમાં આના વિશે ખાસ કરીને શું બહાર આવવું જોઈએ તેનું વર્ણન કરો"),
    },
    q7_5: {
      text: addTranslations("Should the ad prominently feature the store or the shopping experience?", "क्या विज्ञापन में स्टोर या खरीदारी के अनुभव को प्रमुखता से दिखाया जाना चाहिए?", "விளம்பரத்தில் ஸ்டோர் அல்லது ஷாப்பிங் அனுபவம் முக்கியமாக இடம்பெற வேண்டுமா?", "ప్రకటనలో స్టోర్ లేదా షాపింగ్ అనుభవం ప్రముఖంగా ఉండాలా?", "શું જાહેરાતમાં સ્ટોર અથવા શોપિંગ અનુભવને મુખ્ય રીતે દર્શાવવો જોઈએ?"),
      options: {
        "Yes": addTranslations("Yes - store experience is part of our brand story", "हाँ - स्टोर का अनुभव हमारी ब्रांड कहानी का हिस्सा है", "ஆம் - ஸ்டோர் அனுபவம் எங்கள் பிராண்ட் கதையின் ஒரு பகுதியாகும்", "అవును - స్టోర్ అనుభవం మా బ్రాండ్ కథలో భాగం", "હા - સ્ટોરનો અનુભવ એ અમારી બ્રાન્ડ સ્ટોરીનો એક ભાગ છે"),
        "No": addTranslations("No - focus on product and emotion only", "नहीं - केवल उत्पाद और भावना पर ध्यान दें", "இல்லை - தயாரிப்பு மற்றும் உணர்ச்சியில் மட்டும் கவனம் செலுத்துங்கள்", "లేదు - ఉత్పత్తి మరియు భావోద్వేగంపై మాత్రమే దృష్టి పెట్టండి", "ના - ફક્ત ઉત્પાદન અને લાગણી પર ધ્યાન કેન્દ્રિત કરો"),
      }
    },
    q7_language: {
      text: addTranslations("Which language should the tagline / dialogues / voiceovers be in?", "टैगलाइन / डायलॉग / वॉइसओवर किस भाषा में होने चाहिए?", "டேக்லைன் / வசனங்கள் / குரல் நடை எந்த மொழியில் இருக்க வேண்டும்?", "ట్యాగ్‌లైన్ / సంభాషణలు / వాయిస్‌ఓవర్‌లు ఏ భాషలో ఉండాలి?", "ટેગલાઇન / સંવાદ / વૉઇસઓવર કઈ ભાષામાં હોવા જોઈએ?"),
      placeholder: addTranslations("Please specify", "कृपया बताएं", "தயவுசெய்து குறிப்பிடவும்", "దయచేసి పేర్కొనండి", "કૃપા કરીને જણાવો"),
    },
    q7_6: {
      text: addTranslations("Should the founder or any employee of the company feature in the ad?", "क्या कंपनी के संस्थापक या किसी कर्मचारी को विज्ञापन में शामिल किया जाना चाहिए?", "நிறுவனத்தின் நிறுவனர் அல்லது ஏதேனும் ஊழியர் விளம்பரத்தில் இடம்பெற வேண்டுமா?", "కంపెనీ వ్యవస్థాపకుడు లేదా ఏదైనా ఉద్యోగి ప్రకటనలో ఉండాలా?", "શું કંપનીના સ્થાપક અથવા કોઈપણ કર્મચારી જાહેરાતમાં હોવા જોઈએ?"),
      options: {
        "Yes": addTranslations("Yes", "हाँ", "ஆம்", "అవును", "હા"),
        "No": addTranslations("No", "नहीं", "இல்லை", "లేదు", "ના"),
      },
      placeholder: addTranslations("Describe who should be featured in the ad", "वर्णन करें कि विज्ञापन में किसे दिखाया जाना चाहिए", "விளம்பரத்தில் யார் இடம்பெற வேண்டும் என்பதை விவரிக்கவும்", "ప్రకటనలో ఎవరు ఉండాలో వివరించండి", "જાહેરાતમાં કોને દર્શાવવા જોઈએ તેનું વર્ણન કરો"),
    }
  };