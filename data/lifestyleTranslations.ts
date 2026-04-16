import { addTranslations, formTranslations } from './translations';

export const lifestyleFormTranslations = {
  specifyOther: addTranslations("Please specify...", "कृपया निर्दिष्ट करें...", "குறிப்பிடவும்...", "దయచేసి పేర్కొனండి...", "કૃપા કરીને સ્પષ્ટ કરો..."),
  
  section1: {
    title: addTranslations("Product Showcase", "उत्पाद प्रदर्शन", "தயாரிப்பு காட்சி", "ఉత్పత్తి ప్రదర్శన", "ઉત્પાદન ప్రదర్శన"),
    context: addTranslations("In case the brand has multiple product lines, tell us which one the advertising should focus on.", "यदि ब्रांड की कई उत्पाद शृंखलाएं हैं, तो हमें बताएं कि विज्ञापन किस पर केंद्रित होना चाहिए।", "பிராண்டிற்கு பல தயாரிப்பு வரிசைகள் இருந்தால், விளம்பரம் எதில் கவனம் செலுத்த வேண்டும் என்பதை எங்களிடம் கூறுங்கள்.", "బ్రాండ్‌లో బహుళ ఉత్పత్తి శ్రేణులు ఉంటే, ప్రకటన దేనిపై దృష్టి పెట్టాలో మాకు చెప్పండి.", "જો બ્રાન્ડ પાસે બહુવિધ પ્રોડક્ટ લાઇન્સ છે, તો અમને જણાવો કે જાહેરાત શેના પર ધ્યાન કેન્દ્રિત કરવી જોઈએ."),
    q1_1: {
      text: addTranslations("Tell us something about your brand and what makes it special.", "हमें अपने ब्रांड के बारे में कुछ बताएं और क्या इसे खास बनाता है।", "உங்கள் பிராண்டைப் பற்றியும், அதை சிறப்புற செய்வது என்ன என்பதைப் பற்றியும் எங்களிடம் கூறுங்கள்.", "మీ బ్రాండ్ గురించి మరియు దానిని ఏది ప్రత్యేకంగా చేస్తుందో మాకు చెప్పండి.", "તમારી బ્રાન્ડ વિશે અમને કંઈક કહો અને તેને શું વિશેષ બનાવે છે."),
      placeholder: addTranslations("e.g., We are a 40-year-old jewellery brand known for traditional gold craftsmanship.", "उदा., हम 40 साल पुराने आभूषण ब्रांड हैं जिसे पारंपरिक सोने की शिल्प कौशल के लिए जाना जाता है।", "எ.கா., நாங்கள் 40 ஆண்டுகள் பழமையான நகை பிராண்ட், பாரம்பரிய தங்க வேலைப்பாடுகளுக்குப் பெயர் பெற்றவர்கள்.", "ఉదా. మేము సాంప్రదాయ బంగారు అలంకరణకు ప్రసిద్ధి చెందిన 40 ఏళ్ల నాటి నగల బ్రాండ్.", "દા.ત., અમે 40 વર્ષ જૂની જ્વેલરી బ્રાન્ડ છીએ જે પરંપરાગત ગોલ્ડ ક્રાફ્ટિંગ માટે જાણીતી છે."),
    },
    q1_2: {
      text: addTranslations("What is the name of your brand?", "आपके ब्रांड का नाम क्या है?", "உங்கள் பிராண்டின் பெயர் என்ன?", "మీ బ్రాండ్ పేరు ఏమిటి?", "તમારી బ્રાન્ડનું નામ શું છે?"),
      placeholder: addTranslations("e.g., Tanishq, Raymond, etc.", "उदा. तनिष्क, रेमंड, आदि", "எ.கா. தனிஷ்க், ரேமண்ட் போன்றவை.", "ఉదా. తనిష్క్, రేమండ్, మొదలైనవి.", "દા.ત., તનિષ્ક, રેમન્ડ, વગેરે."),
    },
    q1_3: {
      text: addTranslations("Which brand or product line do you want to advertise? (Pick one)", "आप किस ब्रांड या उत्पाद श्रृंखला का विज्ञापन करना चाहते हैं? (एक चुनें)", "நீங்கள் எந்த பிராண்ட் அல்லது தயாரிப்பு வரிசையை விளம்பரப்படுத்த விரும்புகிறீர்கள்? (ஒன்றைத் தேர்ந்தெடுக்கவும்)", "మీరు ఏ బ్రాండ్ లేదా ఉత్పత్తి శ్రేణిని ప్రచారం చేయాలనుకుంటున్నారు? (ఒకటి ఎంచుకోండి)", "તમે કઈ బ્રાન્ડ કે પ્રોડક્ટ લાઇન પર જાહેરાત કરવા માંગો છો? (એક પસંદ કરો)"),
      placeholder: addTranslations("e.g., Same as above.", "उदा. ऊपर जैसा ही।", "எ.கா. மேலே உள்ளதைப் போலவே.", "ఉదా. పైన పేర్కొన్న విధంగానే.", "દા.ત., ઉપર મુજબ."),
    },
    q1_4: {
      text: addTranslations("Product name / category", "उत्पाद का नाम / श्रेणी", "தயாரிப்பு பெயர் / வகை", "ఉత్పత్తి పేరు / వర్గం", "ઉત્પત્તિનું નામ / શ્રેણી"),
      placeholder: addTranslations("e.g., Diamond bridal jewellery, Men’s formal shirts, Leather footwear", "उदा. डायमंड ब्राइडल ज्वेलरी, पुरुषों की फॉर्मल शर्ट, चमड़े के जूते", "எ.கா. வைர திருமண நகைகள், ஆண்களுக்கான முறைசார் சட்டைகள், தோல் காலணிகள்", "ఉదా. డైమండ్ బ్రైడల్ జ్వేలరీ, పురుషుల ఫార్మల్ షర్టులు, లెదర్ ఫుట్‌వేర్", "દા.ત., ડાયમંડ બ્રાઇડલ જ્વેલરી, મેન્સ ફોર્મલ શર્ટ્સ, લેધર ફૂટવેર"),
      subCategory: addTranslations("Sub-category", "उप-श्रेणी", "துணை வகை", "ఉప-వర్గం", "પેટા-શ્રેણી"),
      options: {
        "Jewellery": addTranslations("Jewellery", "आभूषण", "நகைகள்", "ఆభరణాలు", "જ્વેલરી"),
        "Apparel": addTranslations("Apparel", "पोशाक", "ஆடை", "దుస్తులు", "એપરલ"),
        "Footwear": addTranslations("Footwear", "जूते", "காலணிகள்", "పాదరక్షలు", "ફૂટવેર"),
        "Watches": addTranslations("Watches & Accessories", "घड़ियाँ और सहायक उपकरण", "கடிகாரங்கள் & துணைக்கருவிகள்", "వాచీలు & ఉపకరణాలు", "વોચ અને એસેસરીઝ"),
        "Other": addTranslations("Other", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      }
    }
  },
  section2: {
    title: addTranslations("Origin and Heritage", "उत्पत्ति और विरासत", "தோற்றம் மற்றும் பாரம்பரியம்", "మూలం మరియు వారసత్వం", "મૂળ અને વારસો"),
    q2_1: {
      text: addTranslations("How old is the brand, and who started it?", "ब्रांड कितना पुराना है और इसे किसने शुरू किया?", "பிராண்ட் எவ்வளவு பழமையானது, அதை யார் தொடங்கினார்கள்?", "బ్రాండ్ ఎంత పాతది, మరియు దానిని ఎవరు ప్రారంభించారు?", "બ્રાન્ડ કેટલી જૂની છે, અને તેની શરૂઆત કોણે કરી?"),
      placeholder_founder: addTranslations("Founder's full name(s)", "संस्थापक का पूरा नाम", "நிறுவனர் முழு பெயர்(கள்)", "వ్యవస్థాపకుని పూర్తి పేరు(లు)", "સ્થાપકનું પૂરું નામ(ઓ)"),
      placeholder_year: addTranslations("YYYY", "YYYY", "YYYY", "YYYY", "YYYY"),
      presence: addTranslations("Regions and key locations / market areas the brand is primarily present in", "ब्रांड मुख्य रूप से किन क्षेत्रों और प्रमुख स्थानों / बाजार क्षेत्रों में मौजूद है", "பிராண்ட் பிரதானமாக இருக்கும் பிராந்தியங்கள் மற்றும் முக்கிய இடங்கள் / சந்தை பகுதிகள்", "బ్రాండ్ ప్రధానంగా ఉన్న ప్రాంతాలు మరియు కీలక ప్రాంతాలు / మార్కెట్ ప్రాంతాలు", "બ્રાન્ડ મુખ્યત્વે કયા પ્રદેશો અને મુખ્ય સ્થળો / બજાર વિસ્તારોમાં હાજર છે"),
      placeholder_presence: addTranslations("e.g., South India, Tier-1 cities nationally.", "उदा. दक्षिण भारत, राष्ट्रीय स्तर पर टियर -1 शहर।", "எ.கா. தென்னிந்தியா, தேசிய அளவில் டயர்-1 நகரங்கள்.", "ఉదా. దక్షిణ భారతదేశం, జాతీయంగా టైర్-1 నగరం.", "દા.ત., દક્ષિણ ભારત, રાષ્ટ્રીય સ્તરે ટાયર-1 શહેરો."),
    },
    q2_2: {
      text: addTranslations("What are some special aspects of your product?", "आपके उत्पाद के कुछ विशेष पहलू क्या हैं?", "உங்கள் தயாரிப்பின் சில சிறப்பு அம்சங்கள் யாவை?", "మీ ఉత్పత్తి యొక్క కొన్ని ప్రత్యేక అంశాలు ఏమిటి?", "તમારા ઉત્પાદનના કેટલાક વિશેષ પાસાઓ શું છે?"),
      options: {
        "Design": addTranslations("Design / Craftsmanship", "डिजाइन / शिल्प कौशल", "வடிவமைப்பு / கைவினைத்திறன்", "డిజైన్ / హస్తకళ", "ડિઝાઇન / ક્રાફ્ટમેનશિપ"),
        "Materials": addTranslations("Materials / Fabric / Finish", "सामग्री / कपड़ा / फिनिश", "பொருட்கள் / துணி / பூச்சு", "మెటీరియల్స్ / ఫ్యాబ్రిక్ / ఫినిష్", "મટિરિયલ્સ / ફેબ્રિક / ફિનિશ"),
        "Technique": addTranslations("Unique Technique / Process", "अद्वितीय तकनीक / प्रक्रिया", "தனித்துவமான நுட்பம் / செயல்முறை", "ప్రత్యేకమైన సాంకేతికత / ప్రక్రియ", "અનન્ય તકનીક / પ્રક્રિયા"),
        "Collections": addTranslations("Exclusive Collections / Collaborations", "विशिष्ट संग्रह / सहयोग", "பிரத்யேக தொகுப்புகள் / ஒத்துழைப்புகள்", "ప్రత్యేక సేకరణలు / సహకారాలు", "વિશિષ્ટ સંગ્રહો / સહયોગ"),
      },
      placeholders: {
        "Design": addTranslations("e.g., handcrafted, temple jewellery, fusion silhouettes", "उदा. हस्तशिल्प, मंदिर के आभूषण, फ्यूजन सिल्हूट", "எ.கா. கைவினைப்பொருட்கள், கோயில் நகைகள், இணைவு நிழல்கள்", "ఉదా. చేతితో తయారు చేసినవి, ఆలయ ఆభరణాలు, ఫ్యూజన్ సిల్హౌట్‌లు", "દા.ત., હેન્ડક્રાફ્ટેડ, ટેમ્પલ જ્વેલરી, ફ્યૂજન સિલુએટ્સ"),
        "Materials": addTranslations("e.g., 22-karat gold, pure cotton, vegetable-tanned leather", "उदा. 22-कैरेट सोना, शुद्ध कपास, वनस्पति-टैन्ड चमड़ा", "எ.கா. 22-காரட் தங்கம், தூய பருத்தி, காய்கறி-பதப்படுத்தப்பட்ட தோல்", "ఉదా. 22-క్యారెట్ బంగారం, స్వచ్ఛమైన పత్తి, వెజిటబుల్-టాన్డ్ లెదర్", "દા.ત., 22-કેરેટ సోનું, શુદ્ધ કપાસ, વેજીટેબલ-ટેન્ડ લેધર"),
        "Technique": addTranslations("e.g., Kundan setting, block printing, Goodyear welt", "उदा. कुंदन सेटिंग, ब्लॉक प्रिंटिंग, गुडइयर वेल्ट", "எ.கா. குந்தன் அமைப்பு, பிளாக் பிரிண்டிங், குட்இயர் வெல்ட்", "ఉదా. కుందన్ అమరిక, బ్లాక్ ప్రింటింగ్, గుడ్ ఇయర్ వెల్ట్", "દા.ત., કુંદન સેટિંગ, બ્લોક પ્રિન્ટિંગ, ગુડયર વેલ્ટ"),
        "Collections": addTranslations("e.g., bridal collection, designer tie-up", "उदा. ब्राइडल कलेक्शन, डिज़ाइनर टाई-अप", "எ.கா. திருமண சேகரிப்பு, வடிவமைப்பாளர் கூட்டு", "ఉదా. వివాహ సేకరణ, డిజైనర్ టై-అప్", "દા.ત., બ્રાઇડલ કલેક્શન, ડિઝાઇનર ટાઇ-અપ"),
      }
    },
    q2_3: {
      text: addTranslations("Any certifications or quality marks that support the above?", "उपरोक्त का समर्थन करने वाले कोई प्रमाणपत्र या गुणवत्ता चिह्न?", "மேற்கூறியவற்றை ஆதரிக்கும் ஏதேனும் சான்றிதழ்கள் அல்லது தரக் குறியீடுகள்?", "పైన పేర్కొన్న వాటికి మద్దతు ఇచ్చే ఏవైనా ధృవపత్రాలు లేదా నాణ్యత గుర్తులు?", "ઉપરોક્તને સમર્થન આપતા કોઈ પ્રમાણપત્રો અથવા ગુણવત્તા ગુણ?"),
      placeholder: addTranslations("e.g., BIS Hallmark, certified organic fabric", "उदा. BIS हॉलमार्क, प्रमाणित जैविक कपड़ा", "எ.கா. BIS ஹால்மார்க், சான்றளிக்கப்பட்ட ஆர்கானிக் துணி", "ఉదా. BIS హాల్‌మార్క్, ధృవీకరించబడిన సేంద్రీయ వస్త్రం", "દા.ત., BIS હોલમાર્ક, પ્રમાણિત ઓર્ગેનિક ફેબ્રિક"),
    }
  },
  section3: {
    title: addTranslations("Target Audience", "लक्षित दर्शक", "இலக்கு பார்வையாளர்கள்", "లక్ష్య ప్రేక్షకులు", "લક્ષ્ય પ્રેક્ષકો"),
    context: addTranslations("Note: The person who uses the product and the person who buys it may be different.", "नोट: उत्पाद का उपयोग करने वाला व्यक्ति और इसे खरीदने वाला व्यक्ति अलग हो सकता है।", "குறிப்பு: தயாரிப்பைப் பயன்படுத்துபவர் மற்றும் அதை வாங்குபவர் வேறாக இருக்கலாம்.", "గమనిక: ఉత్పత్తిని ఉపయోగించే వ్యక్తి మరియు కొనుగోలు చేసే వ్యక్తి భిన్నంగా ఉండవచ్చు.", "નોંધ: જે વ્યક્તિ ઉત્પાદનનો ઉપયોગ કરે છે અને જે વ્યક્તિ તેને ખરીદે છે તે અલગ હોઈ શકે છે."),
    q3A: {
      text: addTranslations("Primary Consumer (person who uses / wears the product)", "प्राथमिक उपभोक्ता (वह व्यक्ति जो उत्पाद का उपयोग करता / पहनता है)", "முதன்மை நுகர்வோர் (தயாரிப்பைப் பயன்படுத்தும் / அணியும் நபர்)", "ప్రాథమిక వినియోగదారు (ఉత్పత్తిని ఉపయోగించే/ధరించే వ్యక్తి)", "પ્રાથમિક ઉપભોક્તા (જે વ્યક્તિ ઉત્પાદનનો ઉપયોગ કરે છે / પહેરે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ఉંમર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
      income: addTranslations("Income", "आय", "வருமானம்", "ఆదాయం", "આવક"),
      geography: addTranslations("Geography", "भूगोल", "புவியியல்", "భౌగోళికం", "ભూગોળ"),
    },
    q3_2: {
      text: addTranslations("What consumer need or problem does your brand address?", "आपका ब्रांड किस उपभोक्ता आवश्यकता या समस्या का समाधान करता है?", "உங்கள் பிராண்ட் எந்த நுகர்வோர் தேவை அல்லது சிக்கலை நிவர்த்தி செய்கிறது?", "మీ బ్రాండ్ వినియోగదారుల ఏ అవసరాన్ని లేదా సమస్యను పరిష్కరిస్తుంది?", "તમારી બ્રાન્ડ ગ્રાહકની કઈ જરૂરિયાત અથવા સમસ્યાને સંબોધે છે?"),
      placeholder: addTranslations("e.g., Consumers want authentic jewellery at transparent pricing", "उदा. उपभोक्ता पारदर्शी मूल्य निर्धारण पर प्रामाणिक आभूषण चाहते हैं", "எ.கா. நுகர்வோர் வெளிப்படையான விலையில் உண்மையான நகைகளை விரும்புகிறார்கள்", "ఉదా. వినియోగదారులు పారదర్శక ధరతో అసలైన ఆభరణాలను కోరుకుంటారు", "દા.ત., ગ્રાહકો પારદર્શક કિંમતે અસલી જ્વેલરી ઈચ્છે છે"),
    },
    q3B: {
      text: addTranslations("Primary Customer (person who buys)", "प्राथमिक ग्राहक (जो व्यक्ति खरीदता है)", "முதன்மை வாடிக்கையாளர் (வாங்கும் நபர்)", "ప్రాథమిక కస్టమర్ (కొనుగోలు చేసే వ్యక్తి)", "પ્રાથમિક గ્રાહક (જે વ્યક્તિ ખરીદે છે)"),
      age: addTranslations("Age", "आयु", "வயது", "వయస్సు", "ఉંమર"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
    },
    q3_3: {
      text: addTranslations("What does their typical lifestyle and beliefs look like? (select up to 2 options)", "उनकी सामान्य जीवनशैली और विश्वास कैसे दिखते हैं? (अधिकतम 2 विकल्प चुनें)", "அவர்களின் பொதுவான வாழ்க்கை முறை மற்றும் நம்பிக்கைகள் எப்படி இருக்கும்? (அதிகபட்சம் 2 விருப்பங்களைத் தேர்ந்தெடுக்கவும்)", "వారి సాధారణ జీవనశైలి మరియు నమ్మకాలు ఎలా ఉంటాయి? (గరిష్టంగా 2 ఎంపికలను ఎంచుకోండి)", "તેમની સામાન્ય જીવનશૈલી અને માન્યાતાઓ કેવી દેખાય છે? (2 વિકલ્પો સુધી પસંદ કરો)"),
      categories: {
        youth_men: addTranslations("Youth (Men, 15–25)", "युवा (पुरुष, 15–25)", "இளைஞர்கள் (ஆண்கள், 15–25)", "యువకులు (పురుషులు, 15–25)", "યુવાનો (પુરુષો, 15–25)"),
        men: addTranslations("Men (26+)", "पुरुष (26+)", "ஆண்கள் (26+)", "పురుషులు (26+)", "પુરુષો (26+)"),
        youth_women: addTranslations("Youth (Women, 15–25)", "युवा (महिलाएं, 15–25)", "இளைஞர்கள் (பெண்கள், 15–25)", "யువతులు (பெண்கள், 15–25)", "યુવતીઓ (મહિલાઓ, 15–25)"),
        women: addTranslations("Women (26+)", "महिलाएं (26+)", "பெண்கள் (26+)", "మహిళలు (26+)", "મહિળાઓ (26+)"),
      },
      options: {
        youth_men: [
          "Trendsetter (fashion-forward, shops for self-expression)",
          "Fitness-First (sport-driven, prioritises active wear)",
          "Casual Explorer (relaxed, comfort over trends)",
          "Brand-Conscious (status-driven, prefers known names)",
          "Occasion Dresser (shops for weddings, festivals, events)"
        ],
        men: [
          "Urban Professional (invests in formals and smart casuals)",
          "Style-Aware Family Man (balances style with family priorities)",
          "Traditional (classic styles rooted in cultural aesthetics)",
          "Active Outdoorsman (performance and adventure-ready clothing)",
          "Premium Aspirant (seeks luxury brands and exclusive stores)"
        ],
        youth_women: [
          "Fashion-Forward (trend-driven, shops frequently, influencer-led)",
          "Traditional-Modern (blends ethnic and western wear)",
          "College Casual (budget-aware, shops with friends)",
          "Achiever (career-focused, smart-casual and professional)",
          "Occasion Shopper (buys for weddings, festivals, events)"
        ],
        women: [
          "Working Professional (versatile work-to-weekend wardrobe)",
          "Family-First Shopper (shops for self deliberately, less often)",
          "Festive Traditionalist (festive occasions drive most purchases)",
          "Premium Lifestyle Seeker (branded shopping as self-reward)",
          "Quality-Conscious (researches before buying, values durability)"
        ]
      }
    }
  },
  section4: {
    title: addTranslations("Brand Usage", "ब्रांड उपयोग", "பிராண்ட் பயன்பாடு", "బ్రాండ్ వాడకం", "બ્રાન્ડ વપરાશ"),
    q4_1: {
      text: addTranslations("When and on what occasions do consumers typically buy or use your product?", "उपभोक्ता आमतौर पर आपके उत्पाद को कब और किन अवसरों पर खरीदते या उपयोग करते हैं?", "நுகர்வோர் வழக்கமாக உங்கள் தயாரிப்பை எப்போது, எந்த சந்தர்ப்பங்களில் வாங்குகிறார்கள் அல்லது பயன்படுத்துகிறார்கள்?", "వినియోగదారులు సాధారణంగా మీ ఉత్పత్తిని ఎప్పుడు మరియు ఏ సందర్భాలలో కొనుగోలు చేస్తారు లేదా ఉపయోగిస్తారు?", "જ્યારે અને કયા પ્રસંગોએ ગ્રાહકો સામાન્ય રીતે તમારા ઉત્પાદનને ખરીદતા અથવા વાપરતા હોય છે?"),
      placeholder: addTranslations("e.g., Weddings, festivals, gifting, back-to-college, everyday premium wear", "उदा. शादियाँ, त्यौहार, उपहार देना, बैक-टू-कॉलेज, रोज़मर्रा के प्रीमियम कपड़े", "எ.கா. திருமணங்கள், திருவிழாக்கள், பரிசளித்தல், கல்லூரிக்குத் திரும்புதல், தினசரி பிரீமியம் உடைகள்", "ఉదా. వివాహాలు, పండుగలు, బహుమతులు ఇవ్వడం, బ్యాక్-టు-కాలేజ్, రోజువారీ ప్రీమియం దుస్తులు", "દા.ત., લગ્ન, તહેવારો, ભેટ આપવી, બેક-ટુ-કોલેજ, રોજિંદા પ્રીમિયમ વસ્ત્રો"),
    },
    q4_2: {
      text: addTranslations("Describe the typical in-store shopping experience at your outlet.", "अपने आउटलेट पर विशिष्ट इन-स्टोर खरीदारी अनुभव का वर्णन करें।", "உங்கள் விற்பனை நிலையத்தில் வழக்கமான ஸ்டோர் ஷாப்பிங் அனுபவத்தை விவரிக்கவும்.", "మీ అవుట్‌లెట్‌లో సాధారణ ఇన్-స్టోర్ షాపింగ్ అనుభవాన్ని వివరించండి.", "તમારા આઉટલેટ પર વિશિષ્ટ ઇન-સ્ટોર શોપિંગ અનુભવનું વર્ણન કરો."),
      placeholder: addTranslations("e.g., Customer is guided by a consultant, tries on pieces, spends 30–45 minutes", "उदा. ग्राहक को एक सलाहकार द्वारा निर्देशित किया जाता है, वह पीस आज़माता है, 30-45 मिनट बिताता है", "எ.கா. வாடிக்கையாளர் ஒரு ஆலோசகரால் வழிநடத்தப்படுகிறார், துண்டுகளை முயற்சி செய்கிறார், 30-45 நிமிடங்கள் செலவிடுகிறார்", "ఉదా. కస్టమర్‌కు కన్సల్టెంట్ మార్గనిర్దేశం చేస్తారు, వస్తువులను ధరించి చూస్తారు, 30–45 నిమిషాలు గడుపుతారు", "દા.ત., ગ્રાહકને કન્સલ્ટન્ટ દ્વારા માર્ગદર્શન આપવામાં આવે છે, તે પીસ ટ્રાય કરે છે, 30-45 મિનિટ વિતાવે છે"),
    },
    q4_3: {
      text: addTranslations("Who typically accompanies the customer when they shop?", "जब ग्राहक खरीदारी करते हैं तो आमतौर पर उनके साथ कौन होता है?", "வாடிக்கையாளர் ஷாப்பிங் செய்யும்போது பொதுவாக அவருடன் யார் வருவார்கள்?", "కస్టమర్ షాపింగ్ చేసేటప్పుడు సాధారణంగా వారి వెంట ఎవరు ఉంటారు?", "જ્યારે గ્રાહક ખરીદી કરે છે ત્યારે સામાન્ય રીતે તેમની સાથે కోણ હોય છે?"),
      options: {
        "Alone": addTranslations("Alone", "अकेले", "தனியாக", "ఒంటరిగా", "એకల"),
        "Spouse": addTranslations("With spouse / partner", "पति-पत्नी / साथी के साथ", "வாழ்க்கைத் துணை / துணையுடன்", "జీవిత భాగస్వామి / భాగస్వామితో", "જીવનસાથી / ભાગીદાર સાથે"),
        "Family": addTranslations("With family", "परिवार के साथ", "குடும்பத்துடன்", "కుடும்பంతో", "પરિવાર સાથે"),
        "Friends": addTranslations("With friends", "दोस्तों के साथ", "நண்பர்களுடன்", "స్నేహితులతో", "મિત્રો સાથે"),
      }
    }
  },
  section5: {
    title: addTranslations("Benefit and Experience", "लाभ और अनुभव", "பயன் மற்றும் அனுபவம்", "ప్రయోజనం & అనుభవం", "લાભ અને અનુભવ"),
    q5_1: {
      text: addTranslations("What are the key benefits your brand offers?", "आपका ब्रांड कौन से प्रमुख लाभ प्रदान करता है?", "உங்கள் பிராண்ட் வழங்கும் முக்கிய நன்மைகள் யாவை?", "మీ బ్రాండ్ అందించే కీలక ప్రయోజనాలు ఏమిటి?", "તમારી બ્રાન્ડ કયા મુખ્ય લાભો પ્રદાન કરે છે?"),
      placeholder: addTranslations("e.g., Authentic purity, widest design range, comfortable fit, fashion-forward styling", "उदा. प्रामाणिक शुद्धता, व्यापक डिजाइन रेंज, आरामदायक फिट, फैशन-फॉरवर्ड स्टाइलिंग", "எ.கா. உண்மையான தூய்மை, வரம்பு வடிவமைப்பு வரம்பு, வசதியான பொருத்தம், ஃபேஷன்-ஃபார்வர்டு ஸ்டைலிங்", "ఉదా. అసలైన స్వచ్ఛత, విస్తృతమైన డిజైన్ శ్రేణి, సౌకర్యవంతమైన ఫిట్, ఫ్యాషన్-ఫార్వర్డ్ స్టైలింగ్", "દા.ત., અસલી શુદ્ધતા, વિશાળ ડિઝાઇન શ્રેણી, આરામદાયક ફિટ, ફેશન-ફોરવર્ડ સ્ટાઇલ"),
    },
    q5_2: {
      text: addTranslations("Which of these benefits are different from your competitors?", "इनमें से कौन से लाभ आपके प्रतिस्पर्धियों से अलग हैं?", "இந்த நன்மைகளில் எது உங்கள் போட்டியாளர்களிடமிருந்து வேறுபட்டது?", "ఈ ప్రయోజనాలలో ఏది మీ పోటీదారుల నుండి భిన్నంగా ఉంటుంది?", "આમાંના કયા લાભો તમારા સ્પર્ધકોથી અલગ છે?"),
      placeholder: addTranslations("e.g., Only brand offering hallmarked jewellery at mass-market pricing in this region", "उदा. इस क्षेत्र में बड़े पैमाने पर बाजार मूल्य पर हॉलमार्क वाले आभूषण पेश करने वाला एकमात्र ब्रांड", "எ.கா. இந்தப் பகுதியில் வெகுஜன சந்தை விலையில் முத்திரையிடப்பட்ட நகைகளை வழங்கும் ஒரே பிராண்ட்", "ఉదా. ఈ ప్రాంతంలో తక్కువ ధరలో హాల్‌మార్క్ ఉన్న ఆభరణాలను అందిస్తున్న ఏకైక బ్రాండ్", "દા.ત., આ પ્રદેશમાં માસ-માર્કેટ કિંમતે હોલમાર્કવાળી જ્વેલરી ઓફર કરતી એકમાત્ર બ્રાન્ડ"),
    },
    q5_3: {
      text: addTranslations("How does the consumer feel after buying or wearing your product?", "आपका उत्पाद खरीदने या पहनने के बाद उपभोक्ता को कैसा महसूस होता है?", "உங்கள் தயாரிப்பை வாங்கிய பிறகு அல்லது அணிந்த பிறகு நுகர்வோர் எப்படி உணருகிறார்கள்?", "మీ ఉత్పత్తిని కొనుగోలు చేసిన తర్వాత లేదా ధరించిన తర్వాత వినియోగదారు ఎలా భావిస్తారు?", "તમારું ઉત્પાદન ખરીદ્યા કે પહેર્યા પછી ગ્રાહકને કેવું લાગે છે?"),
      options: [
        "I feel more beautiful and admired",
        "I feel confident and proud",
        "I belong to a premium world",
        "I feel proud of my cultural identity",
        "I have made a smart choice",
        "I feel elevated / special"
      ],
      placeholder: addTranslations("Describe the emotional outcome or feeling...", "भावनात्मक परिणाम या भावना का वर्णन करें...", "உணர்ச்சிவசமான விளைவு அல்லது உணர்வை விவரிக்கவும்...", "భావోద్వేగ ఫలితం లేదా అనుభూతిని వివరించండి...", "ભાવનાત્મક પરિણામ કે લાગણીનું વર્ણન કરો..."),
    }
  },
  section6: {
    title: addTranslations("Competition", "प्रतियोगिता", "போட்டி", "పోటీ", "સ્પર્ધા"),
    q6_1: {
      text: addTranslations("Who are your primary competitors?", "आपके प्राथमिक प्रतियोगी कौन हैं?", "உங்கள் முதன்மை போட்டியாளர்கள் யார்?", "మీ ప్రాథమిక పోటీదారులు ఎవరు?", "તમારા પ્રાથમિક સ્પર્ધકો કોણ છે?"),
      placeholder: addTranslations("e.g., Tanishq, PC Jewellers, Malabar Gold  /  Zara, H&M, FabIndia  /  Bata, Woodland", "उदा. तनिष्क, पीसी ज्वैलर्स, मालाबार गोल्ड / ज़ारा, एचएंडएम, फैबइंडिया / बाटा, वुडलैंड", "எ.கா. தனிஷ்க், பிசி ஜூவல்லர்ஸ், மலபார் கோல்ட் / ஜாரா, எச்&எம், ஃபேப்இண்டியா / பாட்டா, உட்லேண்ட்", "ఉదా. తనిష్క్, పిసి జ్యువెలర్స్, మలబార్ గోల్డ్ / జారా, హెచ్ & ఎమ్, ఫ్యాబ్ ఇండియా / బాటా, వుడ్ ల్యాండ్", "દા.ત., તનિસ્ક, પીસી જ્વેલર્સ, મલબાર गोल्ड / ઝારા, એચએન્ડએમ, ફેબઇન્ડિયા / બાટા, વૂડલેન્ડ"),
    }
  },
  section7: {
    title: addTranslations("Desired Perception and Ad Objectives", "वांछित धारणा और विज्ञापन उद्देश्य", "விரும்பிய கருத்து மற்றும் விளம்பர நோக்கங்கள்", "కావలసిన అవగాహన మరియు ప్రకటన లక్ష్యాలు", "ઇચ્છિત ધારણા અને જાહેરાత ઉદ્દેશ્યો"),
    q7_1: {
      text: addTranslations("How would you like consumers to perceive this brand?", "आप क्या चाहेंगे कि उपभोक्ता इस ब्रांड को कैसे देखें?", "நுகர்வோர் இந்த பிராண்டை எப்படி உணர வேண்டும் என்று நீங்கள் விரும்புகிறீர்கள்?", "వినియోగదారులు ఈ బ్రాండ్‌ను ఎలా చూడాలని మీరు కోరుకుంటున్నారు?", "તમે શું ઈચ્છો છો કે ગ્રાહકો આ બ્રાન્ડને કેવી રીતે જોવે?"),
      tone: addTranslations("Tone", "टोन", "டோன்", "టోన్", "ટોન"),
      world: addTranslations("Brand World", "ब्रांड की दुनिया", "பிராண்ட் உலகம்", "బ్రాండ్ ప్రపంచం", "બ્રાન્ડ వర్લ્ડ"),
      attributes: addTranslations("Attributes (up to 2)", "गुण (2 तक)", "பண்புகள் (2 வரை)", "లక్షణాలు (2 వరకు)", "ગુણધર્મો (2 સુધી)"),
      options: {
        tone: ["Youthful", "Mature", "Light-hearted", "Serious"],
        world: ["Premium", "Luxury", "Mass / Popular", "Desi", "International"],
        attributes: ["Crafted / Artisanal", "Modern / Contemporary", "Traditional / Heritage", "Innovative", "Other"]
      }
    },
    q7_2: {
      text: addTranslations("If the brand were a person, how would consumers see this person?", "यदि ब्रांड एक व्यक्ति होता, तो उपभोक्ता इस व्यक्ति को कैसे देखते?", "பிராண்ட் ஒரு நபராக இருந்தால், நுகர்வோர் இந்த நபரை எப்படிப் பார்ப்பார்கள்?", "బ్రాండ్ ఒక వ్యక్తి అయితే, వినియోగదారులు ఆ వ్యక్తిని ఎలా చూస్తారు?", "જો બ્રાન્ડ એક వ్యక్తి હોત, તો ગ્રાહકો આ వ్యక్తిને કેવી રીતે જોશે?"),
      options: ["Friend", "Expert / Advisor", "Family Elder", "Spouse", "Celebrity", "Mentor", "Aspirational Peer", "Other"]
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
    }
  },
  section8: {
    title: addTranslations("To Be Filled by Salesperson Only", "केवल विक्रेता द्वारा भरा जाना है", "விற்பனையாளரால் மட்டுமே நிரப்பப்பட வேண்டும்", "విక్రయదారుడు మాత్రమే నింపాలి", "ફક્ત સેલ્સપર્સન દ્વારા ભરવામાં આવશે"),
    salesperson: addTranslations("Salesperson Name", "विक्रेता का नाम", "விற்பனையாளர் பெயர்", "విక్రయదారుని పేరు", "સેલ્સపર્સનનું નામ"),
    customerID: addTranslations("Client Customer ID (Optional)", "क्लाइंट कस्टमर आईडी (वैकल्पिक)", "வாடிக்கையாளர் ஐடி (விருப்பத்தேர்வு)", "కస్టమర్ ID (ఐచ్ఛికం)", "ક્લાયંટ ગ્રાહక ID (વૈકલ્પિક)"),
    images: addTranslations("Product / Store Images", "उत्पाद / स्टोर छवियाँ", "தயாரிப்பு / स्टोर படங்கள்", "ఉత్పత్తి / స్టోర్ చిత్రాలు", "ઉત્પાદન / સ્ટોર છબીઓ"),
  }
};
