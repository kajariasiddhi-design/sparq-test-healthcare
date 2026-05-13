import { addTranslations } from "../translation-utils";

export const section3 = {
    title: addTranslations("Target Audience", "लक्षित दर्शक", "இலக்கு பார்வையாளர்கள்", "లక్ష్య ప్రేక్షకులు", "લક્ષ્ય પ્રેક્ષકો"),
    context: addTranslations("Who is the primary customer (buyer) and who is the primary consumer (user)? They could be the same.", "प्राथमिक ग्राहक (खरीदार) कौन है और प्राथमिक उपभोक्ता (उपयोगकर्ता) कौन है? वे समान हो सकते हैं।", "முதன்மை வாடிக்கையாளர் (வாங்குபவர்) யார் மற்றும் முதன்மை நுகர்வோர் (பயனர்) யார்? அவர்கள் ஒரே மாதிரியாக இருக்கலாம்.", "ప్రాథమిక కస్టమర్ (కొనుగోలుదారు) ఎవరు మరియు ప్రాథమిక వినియోగదారు (వాడుకరి) ఎవరు? వారు ఒకేలా ఉండవచ్చు.", "પ્રાથમિક ગ્રાહક (ખરીદનાર) કોણ છે અને પ્રાથમિક ઉપભોક્તા (વપરાશકર્તા) કોણ છે? તેઓ સમાન હોઈ શકે છે."),
    q3_1A: {
      text: addTranslations("Primary consumer (person who uses)", "प्राथमिक उपभोक्ता (जो व्यक्ति उपयोग करता है)", "முதன்மை நுகர்வோர் (பயன்படுத்தும் நபர்)", "ప్రాథమిక వినియోగదారు (ఉపయోగించే వ్యక్తి)", "પ્રાથમિક ઉપભોક્તા (જે વ્યક્તિ ઉપયોગ કરે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ઉંમર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
    },
    q3_1B: {
      text: addTranslations("Primary customer (person who buys)", "प्राथमिक ग्राहक (जो व्यक्ति खरीदता है)", "முதன்மை வாடிக்கையாளர் (வாங்கும் நபர்)", "ప్రాథమిక కస్టమర్ (కొనుగోలు చేసే వ్యక్తి)", "પ્રાથમિક ગ્રાહક (જે વ્યક્તિ ખરીદે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ઉંમર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
      income: addTranslations("Income", "आय", "வருமானம்", "ఆదాయం", "આવક"),
      geography: addTranslations("Geography", "भूगोल", "புவியியல்", "భౌగోళికం", "ભૂગોળ"),
    },
    consumerAgeOptions: {
      "Babies < 5": addTranslations("Babies < 5", "बच्चे < 5", "குழந்தைகள் < 5", "శిశువులు < 5", "બાળકો < 5"),
      "Kids 6-14": addTranslations("Kids 6–14", "बच्चे 6–14", "குழந்தைகள் 6–14", "పిల్లలు 6–14", "બાળકો 6–14"),
      "15-25": addTranslations("15–25", "15–25", "15–25", "15–25", "15–25"),
      "26-35": addTranslations("26–35", "26–35", "26–35", "26–35", "26–35"),
      "36-50": addTranslations("36–50", "36–50", "36–50", "36–50", "36–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    customerAgeOptions: {
      "Kids 6-14": addTranslations("Kids 6–14", "बच्चे 6–14", "குழந்தைகள் 6–14", "పిల్లలు 6–14", "બાળકો 6–14"),
      "15-25": addTranslations("15–25", "15–25", "15–25", "15–25", "15–25"),
      "26-35": addTranslations("26–35", "26–35", "26–35", "26–35", "26–35"),
      "36-50": addTranslations("36–50", "36–50", "36–50", "36–50", "36–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    genderOptions: {
      "Men": addTranslations("Men", "पुरुष", "ஆண்கள்", "పురుషులు", "પુરુષો"),
      "Women": addTranslations("Women", "महिलाएं", "பெண்கள்", "మహిళలు", "મહિલાઓ"),
      "Men and Women": addTranslations("Men and Women", "पुरुष और महिलाएं", "ஆண்கள் மற்றும் பெண்கள்", "పురుషులు మరియు మహిళలు", "પુરુષો અને મહિલાઓ"),
    },
    incomeOptions: {
      "Lower": addTranslations("Lower", "निम्न", "குறைந்த", "తక్కువ", "નીચું"),
      "Lower middle": addTranslations("Lower middle", "निम्न मध्य", "குறைந்த நடுத்தர", "దిగువ మధ్యతరగతి", "નીચું મધ્યમ"),
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
      text: addTranslations("What does their typical lifestyle and beliefs look like? (select up to 2 options)", "उनकी सामान्य जीवनशैली और विश्वास कैसे दिखते हैं? (अधिकतम 2 विकल्प चुनें)", "அவர்களின் பொதுவான வாழ்க்கை முறை மற்றும் நம்பிக்கைகள் எப்படி இருக்கும்? (அதிகபட்சம் 2 விருப்பங்களைத் தேர்ந்தெடுக்கவும்)", "వారి సాధారణ జీవనశైలి మరియు నమ్మకాలు ఎలా ఉంటాయి? (గరిష్టంగా 2 ఎంపికలను ఎంచుకోండి)", "તેમની સામાન્ય જીવનશૈલી અને માન્યતાઓ કેવી દેખાય છે? (2 વિકલ્પો સુધી પસંદ કરો)"),
      category_men: addTranslations("Men (26+)", "पुरुष (26+)", "ஆண்கள் (26+)", "పురుషులు (26+)", "પુરુષો (26+)"),
      category_women: addTranslations("Women (26+)", "महिलाएं (26+)", "பெண்கள் (26+)", "మహిళలు (26+)", "મહિલાઓ (26+)"),
      category_youth_boys: addTranslations("Youth Boy (15–25)", "युवा लड़का (15–25)", "இளைஞர் (சிறுவன்) (15–25)", "యువత (అబ్బాయి) (15–25)", "યુવક (15–25)"),
      category_youth_girls: addTranslations("Youth Girl (15–25)", "युवा लड़की (15–25)", "இளைஞர் (சிறுமி) (15–25)", "యువత (అమ్మాయి) (15–25)", "યુવતી (15–25)"),
      category_kids: addTranslations("Kids (0–14)", "बच्चे (0–14)", "குழந்தைகள் (0–14)", "పిల్లలు (0–14)", "બાળકો (0–14)"),
    },
  };