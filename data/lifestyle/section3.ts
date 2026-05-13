import { addTranslations } from "../translation-utils";

export const section3 = {
    title: addTranslations("Target Audience", "लक्षित दर्शक", "இலக்கு பார்வையாளர்கள்", "లక్ష్య ప్రేక్షకులు", "લક્ષ્ય પ્રેક્ષકો"),
    context: addTranslations("Note: The person who uses the product and the person who buys it may be different.", "नोट: उत्पाद का उपयोग करने वाला व्यक्ति और इसे खरीदने वाला व्यक्ति अलग हो सकता है।", "குறிப்பு: தயாரிப்பைப் பயன்படுத்துபவர் மற்றும் அதை வாங்குபவர் வேறாக இருக்கலாம்.", "గమనిక: ఉత్పత్తిని ఉపయోగించే వ్యక్తి మరియు కొనుగోలు చేసే వ్యక్తి భిన్నంగా ఉండవచ్చు.", "નોંધ: જે વ્યક્તિ ઉત્પાદનનો ઉપયોગ કરે છે અને જે વ્યક્તિ તેને ખરીદે છે તે અલગ હોઈ શકે છે."),
    q3A: {
      text: addTranslations("Primary Consumer (person who uses / wears the product)", "प्राथमिक उपभोक्ता (वह व्यक्ति जो उत्पाद का उपयोग करता / पहनता है)", "முதன்மை நுகர்வோர் (தயாரிப்பைப் பயன்படுத்தும் / அணியும் நபர்)", "ప్రాథమిక వినియోగదారు (ఉత్పత్తిని ఉపయోగించే/ధరించే వ్యక్తి)", "પ્રાથમિક ઉપભોક્તા (જે વ્યક્તિ ઉત્પાદનનો ઉપયોગ કરે છે / પહેરે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ઉંમર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
      income: addTranslations("Income", "आय", "வருமானம்", "ఆదాయం", "આવક"),
      geography: addTranslations("Geography", "भूगोल", "புவியியல்", "భౌగోళికం", "ભૂગોળ"),
    },
    consumerAgeOptions: {
      "Babies <5": addTranslations("Babies <5", "बच्चे <5", "குழந்தைகள் <5", "శిశువులు <5", "બાળકો <5"),
      "15-21": addTranslations("15–21", "15–21", "15–21", "15–21", "15–21"),
      "22-30": addTranslations("22–30", "22–30", "22–30", "22–30", "22–30"),
      "31-50": addTranslations("31–50", "31–50", "31–50", "31–50", "31–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    customerAgeOptions: {
      "15-21": addTranslations("15–21", "15–21", "15–21", "15–21", "15–21"),
      "22-30": addTranslations("22–30", "22–30", "22–30", "22–30", "22–30"),
      "31-50": addTranslations("31–50", "31–50", "31–50", "31–50", "31–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    genderOptions: {
      "Men": addTranslations("Men", "पुरुष", "ஆண்கள்", "పురుషులు", "પુરુષો"),
      "Women": addTranslations("Women", "महिलाएं", "பெண்கள்", "మహిళలు", "મહિલાઓ"),
      "Men and Women": addTranslations("Men and Women", "पुरुष और महिलाएं", "ஆண்கள் மற்றும் பெண்கள்", "పురుషులు మరియు మహిళలు", "પુરુషో અને મહિલાઓ"),
    },
    incomeOptions: {
      "Lower": addTranslations("Lower", "निम्न", "குறைந்த", "తక్కువ", "નીચું"),
      "Middle": addTranslations("Middle", "मध्य", "நடுத்தர", "మధ్యతరగతి", "મધ્યમ"),
      "Upper Middle": addTranslations("Upper Middle", "उच्च मध्य", "உயர் நடுத்தர", "ఎగువ మధ్యతరగతి", "ઉચ્ચ મધ્યમ"),
      "HNI": addTranslations("HNI", "HNI", "HNI", "HNI", "HNI"),
    },
    geoOptions: {
      "Big Cities": addTranslations("Big Cities", "बड़े शहर", "பெரிய நகரங்கள்", "పెద్ద నగరాలు", "મોટા શહેરો"),
      "Smaller towns": addTranslations("Smaller towns", "छोटे शहर", "சிறிய நகரங்கள்", "చిన్న పట్టణాలు", "નાના શહેરો"),
      "Rural": addTranslations("Rural", "ग्रामीण", "கிராமப்புற", "గ్రామీణ", "ગ્રામીણ"),
      "All": addTranslations("All", "सभी", "அனைத்தும்", "అన్నీ", "બધા"),
    },
    q3_2: {
      text: addTranslations("What consumer need or problem does your brand address?", "आपका ब्रांड किस उपभोक्ता आवश्यकता या समस्या का समाधान करता है?", "உங்கள் பிராண்ட் எந்த நுகர்வோர் தேவை அல்லது சிக்கலை நிவர்த்தி செய்கிறது?", "మీ బ్రాండ్ వినియోగదారుల ఏ అవసరాన్ని లేదా సమస్యను పరిష్కరిస్తుంది?", "તમારી બ્રાન્ડ ગ્રાહકની કઈ જરૂરિયાત અથવા સમસ્યાને સંબોધે છે?"),
      placeholder: addTranslations("e.g., Consumers want authentic jewellery at transparent pricing", "उदा. उपभोक्ता पारदर्शी मूल्य निर्धारण पर प्रामाणिक आभूषण चाहते हैं", "எ.கா. நுகர்வோர் வெளிப்படையான விலையில் உண்மையான நகைகளை விரும்புகிறார்கள்", "ఉదా. వినియోగదారులు పారదర్శక ధరతో అసలైన ఆభరణాలను కోరుకుంటారు", "દા.ત., ગ્રાહકો પારદર્શક કિંમતે અસલી જ્વેલરી ઈચ્છે છે"),
    },
    q3B: {
      text: addTranslations("Primary Customer / Shopper", "प्राथमिक ग्राहक (जो व्यक्ति खरीदता है)", "முதன்மை வாடிக்கையாளர் (வாங்கும் நபர்)", "ప్రాథమిక కస్టమర్ (కొనుగోలు చేసే వ్యక్తి)", "પ્રાથમિક ગ્રાહક (જે વ્યક્તિ ખરીદે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ઉંમર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
      sub_question: addTranslations("Beyond the primary shopper, is there any other customer segment you'd like to focus on?", "प्राथमिक खरीदार के अलावा, क्या कोई अन्य ग्राहक वर्ग है जिस पर आप ध्यान केंद्रित करना चाहेंगे?", "முதன்மை கடைக்காரரைத் தவிர, நீங்கள் கவனம் செலுத்த விரும்பும் வேறு ஏதேனும் வாடிக்கையாளர் பிரிவு உள்ளதா?", "ప్రాథమిక దుకాణదారునికి మించి, మీరు దృష్టి పెట్టాలనుకుంటున్న ఇతర కస్టమర్ విభాగం ఏదైనా ఉందా?", "પ્રાથમિક ગ્રાહક સિવાય, શું અન્ય કોઈ ગ્રાહક સેગમેન્ટ છે જેના પર તમે ધ્યાન કેન્દ્રિત કરવા માંગો છો?"),
      sub_options: {
        "No other segments": addTranslations("No other segments", "कोई अन्य खंड नहीं", "வேறு பிரிவுகள் இல்லை", "మరే ఇతర విభాగాలు లేవు", "બીજા કોઈ સેગમેન્ટ્સ નથી"),
        "Kids": addTranslations("Kids", "बच्चे", "குழந்தைகள்", "పిల్లలు", "બાળકો"),
        "Others": addTranslations("Others", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      },
      sub_placeholder: addTranslations("Describe the customer segment briefly", "ग्राहक वर्ग का संक्षेप में वर्णन करें", "வாடிக்கையாளர் பிரிவை சுருக்கமாக விவரிக்கவும்", "కస్టమర్ విభాగాన్ని సంక్షిప్తంగా వివరించండి", "ગ્રાહક વિભાગનું ટૂંકમાં વર્ણન કરો"),
    },
    q3_3: {
      text: addTranslations("What does their typical lifestyle and beliefs look like? (select up to 3 options)", "उनकी सामान्य जीवनशैली और विश्वास कैसे दिखते हैं? (अधिकतम 2 विकल्प चुनें)", "அவர்களின் பொதுவான வாழ்க்கை முறை மற்றும் நம்பிக்கைகள் எப்படி இருக்கும்? (அதிகபட்சம் 2 விருப்பங்களைத் தேர்ந்தெடுக்கவும்)", "వారి సాధారణ జీవనశైలి మరియు నమ్మకాలు ఎలా ఉంటాయి? (గరిష్టంగా 2 ఎంపికలను ఎంచుకోండి)", "તેમની સામાન્ય જીવનશૈલી અને માન્યાતાઓ કેવી દેખાય છે? (2 વિકલ્પો સુધી પસંદ કરો)"),
      categories: {
        kids: addTranslations("Kids", "बच्चे", "குழந்தைகள்", "పిల్లలు", "બાળકો"),
        young_girls: addTranslations("Young Girls (15–21)", "युवा लड़कियां (15-21)", "இளம் பெண்கள் (15-21)", "యువతులు (15-21)", "યુવતીઓ (15-21)"),
        young_boys: addTranslations("Young Boys (15–21)", "युवा लड़के (15-21)", "இளம் சிறுவர்கள் (15-21)", "యువకులు (15-21)", "યુવાનો (15-21)"),
        young_women: addTranslations("Young Women (22–30)", "युवा महिलाएं (22-30)", "இளம் பெண்கள் (22-30)", "యువతులు (22-30)", "યુવતીઓ (22-30)"),
        young_men: addTranslations("Young Men (22–30)", "युवा पुरुष (22-30)", "இளம் ஆண்கள் (22-30)", "యువకులు (22-30)", "યુવાનો (22-30)"),
        women: addTranslations("Women (31+)", "महिलाएं (31+)", "பெண்கள் (31+)", "మహిళలు (31+)", "મહિળાઓ (31+)"),
        men: addTranslations("Men (31+)", "पुरुष (31+)", "ஆண்கள் (31+)", "పురుషులు (31+)", "પુરુషો (31+)"),
      },
      options: {
        kids: [
          "Kids — Playing with friends (Parks, games)",
          "Kids — Superhero (Imagination, playful)",
          "Kids — Smart achiever (Curious, talented)",
          "Kids — With family (Outings, rituals)",
          "Kids — Leader of the pack (Initiates games)",
          "Kids — Fashion conscious (Interested in clothes/style)"
        ],
        young_boys: [
          "Young Boys — Traditional (Classic styles, cultural roots)",
          "Young Boys — Adventurous (Outdoors, sports, exploring)",
          "Young Boys — Leader of the pack (Confident, popular)",
          "Young Boys — Boyfriend (Cafés, casual outings)",
          "Young Boys — Social, with friends (Hangouts, fun)",
          "Young Boys — Achiever (Academics, success-driven)",
          "Young Boys — Premium quality seeker (Prefers known brands)",
          "Young Boys — Fashion conscious (Style-aware)",
          "Young Boys — Value-for-money seeker (Budget-conscious)"
        ],
        young_men: [
          "Young Men — Traditional (Culturally rooted)",
          "Young Men — Adventurous (Outdoors, exploration)",
          "Young Men — Boyfriend / Husband (Dating, shared activities)",
          "Young Men — Social, with friends (Nightlife, hangouts)",
          "Young Men — Corporate (Work-focused style)",
          "Young Men — Achiever (Career-driven)",
          "Young Men — Premium quality seeker (Invests in durability)",
          "Young Men — Fashion conscious (Trend-aware)",
          "Young Men — Value-for-money seeker (Optimises spend)"
        ],
        men: [
          "Men — Traditional (Classic, cultural roots)",
          "Men — Traditional, with family (Home and rituals)",
          "Men — Modern, with family (Contemporary lifestyle)",
          "Men — Adventurous (Outdoors, travel)",
          "Men — Corporate (Professional, formal)",
          "Men — Premium quality seeker (Status and durability)",
          "Men — Fashion conscious (Well-dressed, style-aware)",
          "Men — Value-for-money seeker (Sensible, practical)"
        ],
        young_girls: [
          "Young Girls — Traditional, at home (Family-oriented)",
          "Young Girls — Social, with friends (Socializing, fun)",
          "Young Girls — Modern (Trend-driven, fashion)",
          "Young Girls — Modern, with boyfriend (Dates, outings)",
          "Young Girls — Achiever (Academics, arts)",
          "Young Girls — Premium quality seeker (Brand-conscious)",
          "Young Girls — Fashion conscious (Influence-led)",
          "Young Girls — Value-for-money seeker (Smart shopper)"
        ],
        young_women: [
          "Young Women — Traditional, at home (Rooted, family focus)",
          "Young Women — Social, with friends (Active social life)",
          "Young Women — Modern (Urban lifestyle)",
          "Young Women — Modern, with boyfriend / husband (Partnership)",
          "Young Women — Corporate (Workplace fashion)",
          "Young Women — Achiever (Goal-oriented)",
          "Young Women — Premium quality seeker (Investment pieces)",
          "Young Women — Fashion conscious (Polished style)",
          "Young Women — Value-for-money seeker (Durability at price)"
        ],
        women: [
          "Women — Traditional with family (Celebrations, rituals)",
          "Women — Modern homemaker with family (Efficient, modern)",
          "Women — Corporate (Work-to-weekend style)",
          "Women — Premium quality seeker (Luxury and status)",
          "Women — Fashion conscious (Latest trends)",
          "Women — Value-for-money seeker (Practical, long-lasting)"
        ]
      }
    }
};