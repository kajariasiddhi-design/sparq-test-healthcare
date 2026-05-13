import { addTranslations } from "../translation-utils";

export const section1 = {
    title: addTranslations("Product Showcase", "उत्पाद प्रदर्शन", "தயாரிப்பு காட்சி", "ఉత్పత్తి ప్రదర్శన", "ઉત્પાદન પ્રદર્શન"),
    context: addTranslations("In case the brand has multiple product lines, tell us which one the advertising should focus on.", "यदि ब्रांड की कई उत्पाद शृंखलाएं हैं, तो हमें बताएं कि विज्ञापन किस पर केंद्रित होना चाहिए।", "பிராண்டிற்கு பல தயாரிப்பு வரிசைகள் இருந்தால், விளம்பரம் எதில் கவனம் செலுத்த வேண்டும் என்பதை எங்களிடம் கூறுங்கள்.", "బ్రాండ్‌లో బహుళ ఉత్పత్తి శ్రేణులు ఉంటే, ప్రకటన దేనిపై దృష్టి పెట్టాలో మాకు చెప్పండి.", "જો બ્રાન્ડ પાસે બહુવિધ પ્રોડક્ટ લાઇન્સ છે, તો અમને જણાવો કે જાહેરાત શેના પર ધ્યાન કેન્દ્રિત કરવી જોઈએ."),
    q1_1: {
      text: addTranslations("Tell us something about your brand and what makes it special.", "हमें अपने ब्रांड के बारे में कुछ बताएं और क्या इसे खास बनाता है।", "உங்கள் பிராண்டைப் பற்றியும், அதை சிறப்புறச் செய்வது என்ன என்பதைப் பற்றியும் எங்களிடம் கூறுங்கள்.", "మీ బ్రాండ్ గురించి మరియు దానిని ఏది ప్రత్యేకంగా చేస్తుందో మాకు చెప్పండి.", "તમારી બ્રાન્ડ વિશે અમને કંઈક કહો અને તેને શું વિશેષ બનાવે છે."),
      placeholder: addTranslations("e.g., We are South India's largest multi-brand electronics retailer with 25 stores, the widest product range, and zero-cost EMI on all major brands.", "e.g., We are South India's largest multi-brand electronics retailer with 25 stores...", "e.g., We are South India's largest multi-brand electronics retailer with 25 stores...", "e.g., We are South India's largest multi-brand electronics retailer with 25 stores...", "e.g., We are South India's largest multi-brand electronics retailer with 25 stores..."),
    },
    q1_2: {
      text: addTranslations("What is the name of the store / retail chain / product you want to advertise?", "आप किस स्टोर / रिटेल श्रृंखला / उत्पाद का विज्ञापन करना चाहते हैं?", "நீங்கள் எந்த கடை / சில்லறை வரிசை / தயாரிப்பை விளம்பரப்படுத்த விரும்புகிறீர்கள்?", "మీరు ఏ స్టోర్ / రిటైల్ చైన్ / ఉత్పత్తిని ప్రచారం చేయాలనుకుంటున్నారు?", "તમે કયા સ્ટોર / રિટેલ ચેઇન / પ્રોડક્ટની જાહેરાત કરવા માંગો છો?"),
      placeholder: addTranslations("e.g., CMR Shopping Mall, SPP Silks, Vijay Sales", "e.g., CMR Shopping Mall, SPP Silks, Vijay Sales", "e.g., CMR Shopping Mall...", "e.g., CMR...", "e.g., CMR..."),
    },
    q1_3: {
      text: addTranslations("What are the primary categories available in your store?", "आपके स्टोर में उपलब्ध प्राथमिक श्रेणियां क्या हैं?", "உங்கள் கடையில் கிடைக்கும் முதன்மை வகைகள் யாவை?", "మీ స్టోర్‌లో అందుబాటులో ఉన్న ప్రాథమిక వర్గాలు ఏమిటి?", "તમારા સ્ટોરમાં ઉપલબ્ધ પ્રાથમિક શ્રેણીઓ કઈ છે?"),
      options: {
        "Fashion & Apparel": addTranslations("Fashion & Apparel", "फैशन और परिधान", "ஃபேஷன் & ஆடை", "ఫ్యాషన్ & దుస్తులు", "ફેશન અને એપરલ"),
        "Jewellery": addTranslations("Jewellery", "आभूषण", "நகைகள்", "ఆభరణాలు", "જ્વેલરી"),
        "Electronics & Appliances": addTranslations("Electronics & Appliances", "इलेक्ट्रॉनिक्स और उपकरण", "எலக்ட்ரானிக்ஸ் & உபகரணங்கள்", "ఎలక్ట్రానిక్స్ & ఉపకరణాలు", "ઇલેક્ટ્રોનિક્સ અને એપ્લાயન્સીસ"),
        "Footwear": addTranslations("Footwear", "जूते", "காலணிகள்", "పాదరక్షలు", "ફૂટવેર"),
        "Home & Furnishings": addTranslations("Home & Furnishings", "घर और फर्निशिंग", "வீடு & தளபாடங்கள்", "గృహ & ఫర్నిషింగ్స్", "હોમ અને ફર્નિશિંગ્સ"),
        "Multi-category / General": addTranslations("Multi-category / General", "मल्टी-श्रेणी / सामान्य", "பல வகை / பொதுவானவை", "బహుళ-వర్గం / సాధారణ", "મલ્ટી કેટેગરી / સામાન્ય"),
        "Others": addTranslations("Others", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      },
      placeholder_other: addTranslations("State other categories", "अन्य श्रेणियां बताएं", "மற்ற வகைகளைக் குறிப்பிடவும்", "ఇతర వర్గాలను పేర్కొనండి", "અન્ય શ્રેણીઓ જણાવો"),
    },
    q1_4: {
      text: addTranslations("How many stores / outlets do you have, and in which regions?", "आपके पास कितने स्टोर / आउटलेट हैं, और किन क्षेत्रों में?", "உங்களிடம் எத்தனை கடைகள் / விற்பனை நிலையங்கள் உள்ளன, எந்த பகுதிகளில்?", "మీకు ఎన్ని స్టోర్‌లు / అవుట్‌లెట్‌లు ఉన్నాయి, మరియు ఏ ప్రాంతాల్లో?", "તમારી પાસે કેટલા સ્ટોર્સ / આઉટલેટ્સ છે, અને કયા પ્રદેશોમાં?"),
      placeholder: addTranslations("e.g., 12 stores across Tamil Nadu, Andhra Pradesh, and Karnataka", "उदा., तमिलनाडु, आंध्र प्रदेश और कर्नाटक में 12 स्टोर", "எ.கா., தமிழ்நாடு, ஆந்திரப் பிரதேசம் மற்றும் கர்நாடகாவில் 12 கடைகள்", "ఉదా., తమిళనాడు, ఆంధ్రప్రదేశ్ మరియు కర్ణాటక అంతటా 12 దుకాణాలు", "દા.ત., તમિલનાડુ, આંધ્રપ્રદેશ અને કર્ણાટકમાં 12 સ્ટોર્સ"),
    }
};
