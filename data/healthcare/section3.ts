import { addTranslations } from "../translation-utils";

export const section3 = {
    title: addTranslations("Target Audience", "लक्षित दर्शक", "இலக்கு பார்வையாளர்கள்", "లక్ష్య ప్రేక్షకులు", "લક્ષ્ય પ્રેક્ષકો"),
    q3_1: {
      text: addTranslations("Primary Patient Profile", "प्राथमिक मरीज़ प्रोफ़ाइल", "முதன்மை நோயாளி விவரக்குறிப்பு", "ప్రాథమిక రోగి ప్రొఫైల్", "પ્રાથમિક દર્દી પ્રોફાઇલ"),
      age: addTranslations("Age Group", "आयु समूह", "வயதுக் குழு", "వయస్సు వర్గం", "ઉંમર જૂથ"),
      gender: addTranslations("Gender", "लिंग", "பாலினம்", "లింగం", "લિંગ"),
      income: addTranslations("Income", "आय", "வருமானம்", "ఆదాయం", "આવક"),
      origin: addTranslations("Where do majority of your patients come from", "आपके अधिकांश मरीज़ कहाँ से आते हैं", "உங்கள் நோயாளிகளில் பெரும்பாலோர் எங்கிருந்து வருகிறார்கள்", "మీ రోగులలో ఎక్కువ మంది ఎక్కడి నుండి వస్తారు", "તમારા મોટાભાગના દર્દીઓ ક્યાંથી આવે છે"),
      geography: addTranslations("Geography", "भूगोल", "புவியியல்", "భౌగోళికం", "ભૂગોળ"),
    },
    ageOptions: {
      "0-7": addTranslations("0–7", "0–7", "0–7", "0–7", "0–7"),
      "8-15": addTranslations("8–15", "8–15", "8–15", "8–15", "8–15"),
      "15-21": addTranslations("15–21", "15–21", "15–21", "15–21", "15–21"),
      "22-30": addTranslations("22–30", "22–30", "22–30", "22–30", "22–30"),
      "31-50": addTranslations("31–50", "31–50", "31–50", "31–50", "31–50"),
      "50+": addTranslations("50+", "50+", "50+", "50+", "50+"),
    },
    genderOptions: {
      "Men": addTranslations("Men", "पुरुष", "ஆண்கள்", "పురుషులు", "પુરુષો"),
      "Women": addTranslations("Women", "महिलाएं", "பெண்கள்", "మహిళలు", "મહિલાઓ"),
      "Men and Women": addTranslations("Men and Women", "पुरुष और महिलाएं", "ஆண்கள் மற்றும் பெண்கள்", "పురుషులు మరియు మహిళలు", "પુરુષો અને મહિલાઓ"),
    },
    incomeOptions: {
      "Lower": addTranslations("Lower", "निम्न", "குறைந்த", "తక్కువ", "નીચું"),
      "Middle": addTranslations("Middle", "मध्य", "நடுத்தர", "మధ్యతరగతి", "મધ્યમ"),
      "Upper Middle": addTranslations("Upper Middle", "उच्च मध्य", "உயர் நடுத்தர", "ఎగువ మధ్యతరగతి", "ઉચ્ચ મધ્યમ"),
      "HNI": addTranslations("HNI", "HNI", "HNI", "HNI", "HNI"),
    },
    originOptions: {
      "Same city / town": addTranslations("Same city / town", "उसी शहर / कस्बे से", "அதே நகரம் / ஊர்", "అదే నగరం / పట్టణం", "એ જ શહેર / નગર"),
      "Other cities / towns": addTranslations("Other cities / towns", "अन्य शहरों / कस्बों से", "மற்ற நகரங்கள் / ஊர்கள்", "ఇతర నగరాలు / పట్టణాలు", "અન્ય શહેરો / નગરો"),
    },
    geoOptions: {
      "Big Cities": addTranslations("Big Cities", "बड़े शहर", "பெரிய நகரங்கள்", "పెద్ద నగరాలు", "મોટા શહેરો"),
      "Smaller towns": addTranslations("Smaller towns", "छोटे शहर", "சிறிய நகரங்கள்", "చిన్న పట్టణాలు", "નાના શહેરો"),
      "Rural": addTranslations("Rural", "ग्रामीण", "கிராமப்புற", "గ్రామీణ", "ગ્રામીણ"),
      "All": addTranslations("All", "सभी", "அனைத்தும்", "అన్నీ", "બધા"),
    },
    q3B: {
      text: addTranslations("Beyond the primary segment, is there any other customer segment you’d like to focus on?", "प्राथमिक वर्ग के अलावा, क्या कोई अन्य ग्राहक वर्ग है जिस पर आप ध्यान केंद्रित करना चाहेंगे?", "முதன்மைப் பிரிவைத் தவிர, நீங்கள் கவனம் செலுத்த விரும்பும் வேறு ஏதேனும் வாடிக்கையாளர் பிரிவு உள்ளதா?", "ప్రాథమిక విభాగానికి మించి, మీరు దృష్టి పెట్టాలనుకుంటున్న ఇతర కస్టమర్ విభాగం ఏదైనా ఉందా?", "પ્રાથમિક સેગમેન્ટ સિવાય, શું અન્ય કોઈ ગ્રાહક સેગમેન્ટ છે જેના પર તમે ધ્યાન કેન્દ્રિત કરવા માંગો છો?"),
      options: {
        "No other segments": addTranslations("No other segments", "कोई अन्य खंड नहीं", "வேறு பிரிவுகள் இல்லை", "మరే ఇతర విభాగాలు లేవు", "બીજા કોઈ સેગમેન્ટ્સ નથી"),
        "Kids": addTranslations("Kids", "बच्चे", "குழந்தைகள்", "పిల్లలు", "બાળકો"),
        "Others": addTranslations("Others", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      },
      placeholder: addTranslations("Describe the segment briefly", "वर्ग का संक्षेप में वर्णन करें", "பிரிவை சுருக்கமாக விவரிக்கவும்", "విభాగాన్ని సంక్షిప్తంగా వివరించండి", "સેગમેન્ટનું ટૂંકમાં વર્ણન કરો"),
    },
    q3_2: {
      text: addTranslations("What are the main treatments that patients come to your hospital / clinic for?", "मरीज़ आपके अस्पताल / क्लिनिक में मुख्य रूप से किन इलाजों के लिए आते हैं?", "நோயாளிகள் உங்கள் மருத்துவமனை / கிளினிக்கிற்கு வரும் முக்கிய சிகிச்சைகள் யாவை?", "రోగులు మీ ఆసుపత్రి / క్లినిక్‌కు వచ్చే ప్రధాన చికిత్సలు ఏమిటి?", "દર્દીઓ તમારી હોસ્પિટલ / ક્લિનિકમાં મુખ્યત્વે કઈ સારવાર માટે આવે છે?"),
      scopeOptions: {
        "Multi-specialty": addTranslations("Multi-specialty", "मल्टी-स्पेशियलिटी", "பல்நோக்கு", "మల్టీ-స్పెషాలిటీ", "મલ્ટી-સ્પેશિયાલિટી"),
        "Single / select specialties or clinics": addTranslations("Single / select specialties or clinics", "एकल / चुनिंदा विशेषताएँ या क्लिनिक", "ஒற்றை / தேர்ந்தெடுத்த சிறப்புப் பிரிவுகள் அல்லது கிளினிக்குகள்", "ఒకే / ఎంపిక చేసిన ప్రత్యేకతలు లేదా క్లినిక్‌లు", "એકલ / પસંદગીની વિશેષતાઓ અથવા ક્લિનિક્સ"),
      },
      // Keys are the option text from the questionnaire; `hint` and `keywords` let a
      // salesperson find a specialty by the body part or illness ("heart", "eyes").
      options: {
        "General Medicine": { label: addTranslations("General Medicine", "सामान्य चिकित्सा", "பொது மருத்துவம்", "జనరల్ మెడిసిన్", "જનરલ મેડિસિન"), hint: "Fever, infections, everyday illnesses", keywords: "physician fever cold cough infection bp" },
        "General Surgery": { label: addTranslations("General Surgery", "सामान्य सर्जरी", "பொது அறுவை சிகிச்சை", "జనరల్ సర్జరీ", "જનરલ સર્જરી"), hint: "Common operations like hernia, appendix, gall bladder", keywords: "operation hernia appendix gallbladder piles laparoscopy" },
        "Cardiology": { label: addTranslations("Cardiology", "कार्डियोलॉजी", "இதயவியல்", "కార్డియాలజీ", "કાર્ડિયોલોજી"), hint: "Heart", keywords: "heart cardiac dil angioplasty bypass chest pain" },
        "Oncology": { label: addTranslations("Oncology", "ऑन्कोलॉजी", "புற்றுநோயியல்", "ఆంకాలజీ", "ઓન્કોલોજી"), hint: "Cancer", keywords: "cancer tumour tumor chemo chemotherapy radiation" },
        "Orthopedics": { label: addTranslations("Orthopedics", "ऑर्थोपेडिक्स", "எலும்பியல்", "ఆర్థోపెడిక్స్", "ઓર્થોપેડિક્સ"), hint: "Bones and joints", keywords: "bone joint knee hip fracture haddi spine orthopaedics" },
        "Neurology and Neurosurgery": { label: addTranslations("Neurology and Neurosurgery", "न्यूरोलॉजी और न्यूरोसर्जरी", "நரம்பியல் மற்றும் நரம்பு அறுவை சிகிச்சை", "న్యూరాలజీ మరియు న్యూరోసర్జరీ", "ન્યુરોલોજી અને ન્યુરોસર્જરી"), hint: "Brain, spine, nerves", keywords: "brain nerve spine stroke paralysis headache epilepsy" },
        "Gastroenterology": { label: addTranslations("Gastroenterology", "गैस्ट्रोएंटेरोलॉजी", "இரைப்பை குடலியல்", "గ్యాస్ట్రోఎంటరాలజీ", "ગેસ્ટ્રોએન્ટેરોલોજી"), hint: "Stomach, liver, digestion", keywords: "stomach liver digestion pet acidity endoscopy" },
        "Nephrology": { label: addTranslations("Nephrology", "नेफ्रोलॉजी", "சிறுநீரகவியல்", "నెఫ్రాలజీ", "નેફ્રોલોજી"), hint: "Kidneys, dialysis", keywords: "kidney dialysis gurda renal" },
        "Urology": { label: addTranslations("Urology", "यूरोलॉजी", "சிறுநீர்ப்பையியல்", "యూరాలజీ", "યુરોલોજી"), hint: "Urinary problems, kidney stones, prostate", keywords: "urine urinary stone prostate bladder" },
        "Gynecology and Obstetrics": { label: addTranslations("Gynecology and Obstetrics", "स्त्री रोग और प्रसूति", "மகப்பேறு மற்றும் பெண்ணோயியல்", "గైనకాలజీ మరియు ప్రసూతి", "સ્ત્રીરોગ અને પ્રસૂતિ"), hint: "Women’s health, pregnancy, delivery", keywords: "women pregnancy delivery maternity gynaecology obgyn" },
        "Fertility / IVF": { label: addTranslations("Fertility / IVF", "प्रजनन / IVF", "கருவுறுதல் / IVF", "సంతానోత్పత్తి / IVF", "ફર્ટિલિટી / IVF"), hint: "Help with having a baby", keywords: "ivf fertility infertility test tube baby conceive" },
        "Pediatrics": { label: addTranslations("Pediatrics", "बाल रोग", "குழந்தை மருத்துவம்", "పీడియాట్రిక్స్", "બાળરોગ"), hint: "Children", keywords: "child children kids baby newborn bachche paediatrics" },
        "Pulmonology": { label: addTranslations("Pulmonology", "पल्मोनोलॉजी", "நுரையீரலியல்", "పల్మోనాలజీ", "પલ્મોનોલોજી"), hint: "Lungs, breathing, asthma", keywords: "lung breathing asthma chest tb" },
        "Endocrinology": { label: addTranslations("Endocrinology", "एंडोक्रिनोलॉजी", "நாளமில்லாச் சுரப்பியியல்", "ఎండోక్రినాలజీ", "એન્ડોક્રિનોલોજી"), hint: "Diabetes, thyroid, hormones", keywords: "diabetes sugar thyroid hormone" },
        "ENT": { label: addTranslations("ENT", "ईएनटी", "ENT", "ENT", "ENT"), hint: "Ear, nose, throat", keywords: "ear nose throat hearing sinus" },
        "Ophthalmology": { label: addTranslations("Ophthalmology", "नेत्र रोग", "கண் மருத்துவம்", "నేత్ర వైద్యం", "નેત્રરોગ"), hint: "Eyes", keywords: "eye eyes vision cataract lasik aankh" },
        "Dentistry": { label: addTranslations("Dentistry", "दंत चिकित्सा", "பல் மருத்துவம்", "దంత వైద్యం", "દંત ચિકિત્સા"), hint: "Teeth", keywords: "teeth tooth dental daant braces" },
        "Dermatology": { label: addTranslations("Dermatology", "त्वचा रोग", "தோல் மருத்துவம்", "చర్మ వైద్యం", "ત્વચારોગ"), hint: "Skin, hair", keywords: "skin hair acne" },
        "Psychiatry and Psychology": { label: addTranslations("Psychiatry and Psychology", "मनोचिकित्सा और मनोविज्ञान", "மனநல மருத்துவம் மற்றும் உளவியல்", "సైకియాట్రీ మరియు సైకాలజీ", "મનોચિકિત્સા અને મનોવિજ્ઞાન"), hint: "Mental health", keywords: "mental depression anxiety stress counselling" },
        "Cosmetic and Plastic Surgery": { label: addTranslations("Cosmetic and Plastic Surgery", "कॉस्मेटिक और प्लास्टिक सर्जरी", "அழகு மற்றும் பிளாஸ்டிக் அறுவை சிகிச்சை", "కాస్మెటిక్ మరియు ప్లాస్టిక్ సర్జరీ", "કોસ્મેટિક અને પ્લાસ્ટિક સર્જરી"), hint: "Appearance, reconstruction", keywords: "cosmetic plastic aesthetic hair transplant burns" },
        "Physiotherapy and Rehabilitation": { label: addTranslations("Physiotherapy and Rehabilitation", "फिजियोथेरेपी और पुनर्वास", "இயன்முறை மருத்துவம் மற்றும் மறுவாழ்வு", "ఫిజియోథెరపీ మరియు పునరావాసం", "ફિઝિયોથેરાપી અને પુનર્વસન"), hint: "Recovery and exercise therapy", keywords: "physio rehab recovery exercise" },
        "Transplant Surgery": { label: addTranslations("Transplant Surgery", "प्रत्यारोपण सर्जरी", "உறுப்பு மாற்று அறுவை சிகிச்சை", "అవయవ మార్పిడి శస్త్రచికిత్స", "ટ્રાન્સપ્લાન્ટ સર્જરી"), hint: "Organ transplants", keywords: "transplant organ kidney liver" },
        "Diagnostics": { label: addTranslations("Diagnostics", "डायग्नोस्टिक्स", "நோயறிதல் பரிசோதனைகள்", "డయాగ్నోస్టిక్స్", "ડાયગ્નોસ્ટિક્સ"), hint: "Tests, scans, lab", keywords: "test scan lab mri ct xray x-ray blood pathology" },
        "Ayurveda and Homeopathy": { label: addTranslations("Ayurveda and Homeopathy", "आयुर्वेद और होम्योपैथी", "ஆயுர்வேதம் மற்றும் ஹோமியோபதி", "ఆయుర్వేదం మరియు హోమియోపతి", "આયુર્વેદ અને હોમિયોપેથી"), hint: "Traditional and alternative medicine", keywords: "ayurveda homeopathy herbal natural siddha unani" },
      } as Record<string, { label: ReturnType<typeof addTranslations>; hint: string; keywords: string }>,
      othersLabel: addTranslations("Others", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      searchPlaceholder: addTranslations("Start typing a specialty, e.g. heart, eyes, Cardiology", "विशेषता टाइप करना शुरू करें, जैसे heart, eyes, Cardiology", "சிறப்புப் பிரிவை தட்டச்சு செய்யத் தொடங்குங்கள், எ.கா. heart, eyes, Cardiology", "ప్రత్యేకతను టైప్ చేయడం ప్రారంభించండి, ఉదా. heart, eyes, Cardiology", "વિશેષતા ટાઇપ કરવાનું શરૂ કરો, દા.ત. heart, eyes, Cardiology"),
      noMatch: addTranslations("Not on the list? Choose Others and type it in.", "सूची में नहीं है? 'अन्य' चुनें और लिखें।", "பட்டியலில் இல்லையா? 'மற்றவை' என்பதைத் தேர்ந்தெடுத்து தட்டச்சு செய்யவும்.", "జాబితాలో లేదా? 'ఇతర' ఎంచుకుని టైప్ చేయండి.", "યાદીમાં નથી? 'અન્ય' પસંદ કરો અને લખો."),
      placeholder_other: addTranslations("Others: please specify the specialty the clinic offers", "अन्य: कृपया क्लिनिक द्वारा दी जाने वाली विशेषता बताएं", "மற்றவை: கிளினிக் வழங்கும் சிறப்புப் பிரிவைக் குறிப்பிடவும்", "ఇతర: క్లినిక్ అందించే ప్రత్యేకతను దయచేసి పేర్కొనండి", "અન્ય: કૃપા કરીને ક્લિનિક દ્વારા આપવામાં આવતી વિશેષતા જણાવો"),
    },
    q3_3: {
      text: addTranslations("What does the typical lifestyle and beliefs of the decision makers look like? (select up to 3 options)", "निर्णय लेने वालों की सामान्य जीवनशैली और विश्वास कैसे दिखते हैं? (अधिकतम 3 विकल्प चुनें)", "முடிவெடுப்பவர்களின் பொதுவான வாழ்க்கை முறை மற்றும் நம்பிக்கைகள் எப்படி இருக்கும்? (அதிகபட்சம் 3 விருப்பங்களைத் தேர்ந்தெடுக்கவும்)", "నిర్ణయాలు తీసుకునేవారి సాధారణ జీవనశైలి మరియు నమ్మకాలు ఎలా ఉంటాయి? (గరిష్టంగా 3 ఎంపికలను ఎంచుకోండి)", "નિર્ણય લેનારાઓની સામાન્ય જીવનશૈલી અને માન્યતાઓ કેવી દેખાય છે? (3 વિકલ્પો સુધી પસંદ કરો)"),
      note: addTranslations("Select up to 3. These options apply to all age groups and genders.", "अधिकतम 3 चुनें। ये विकल्प सभी आयु समूहों और लिंगों पर लागू होते हैं।", "அதிகபட்சம் 3 தேர்ந்தெடுக்கவும். இந்த விருப்பங்கள் அனைத்து வயதுக் குழுக்களுக்கும் பாலினங்களுக்கும் பொருந்தும்.", "గరిష్టంగా 3 ఎంచుకోండి. ఈ ఎంపికలు అన్ని వయస్సు వర్గాలకు మరియు లింగాలకు వర్తిస్తాయి.", "3 સુધી પસંદ કરો. આ વિકલ્પો બધા ઉંમર જૂથો અને લિંગ પર લાગુ પડે છે."),
      // `value` is the exact questionnaire text, which is what gets stored and sent
      options: [
        { value: "Modern medicine seeker - Trusts hospitals, tests, and prescribed medicines", title: addTranslations("Modern medicine seeker", "आधुनिक चिकित्सा पसंद करने वाले", "நவீன மருத்துவத்தை நாடுபவர்", "ఆధునిక వైద్యాన్ని కోరేవారు", "આધુનિક દવા પસંદ કરનાર"), desc: addTranslations("Trusts hospitals, tests, and prescribed medicines", "अस्पतालों, जांचों और डॉक्टर द्वारा लिखी दवाओं पर भरोसा करते हैं", "மருத்துவமனைகள், பரிசோதனைகள், பரிந்துரைக்கப்பட்ட மருந்துகளை நம்புபவர்", "ఆసుపత్రులు, పరీక్షలు, సూచించిన మందులను నమ్ముతారు", "હોસ્પિટલો, ટેસ્ટ અને સૂચવેલી દવાઓ પર વિશ્વાસ રાખે છે") },
        { value: "Alternate therapies - Prefers Ayurveda, homeopathy, or natural care", title: addTranslations("Alternate therapies", "वैकल्पिक चिकित्सा", "மாற்று சிகிச்சைகள்", "ప్రత్యామ్నాయ చికిత్సలు", "વૈકલ્પિક ઉપચાર"), desc: addTranslations("Prefers Ayurveda, homeopathy, or natural care", "आयुर्वेद, होम्योपैथी या प्राकृतिक देखभाल पसंद करते हैं", "ஆயுர்வேதம், ஹோமியோபதி அல்லது இயற்கை சிகிச்சையை விரும்புபவர்", "ఆయుర్వేదం, హోమియోపతి లేదా సహజ సంరక్షణను ఇష్టపడతారు", "આયુર્વેદ, હોમિયોપેથી અથવા કુદરતી સંભાળ પસંદ કરે છે") },
        { value: "Quality seeker - Wants the best care, not the lowest price", title: addTranslations("Quality seeker", "गुणवत्ता चाहने वाले", "தரத்தை நாடுபவர்", "నాణ్యతను కోరేవారు", "ગુણવત્તા શોધનાર"), desc: addTranslations("Wants the best care, not the lowest price", "सबसे कम कीमत नहीं, सबसे अच्छी देखभाल चाहते हैं", "குறைந்த விலை அல்ல, சிறந்த சிகிச்சையை விரும்புபவர்", "తక్కువ ధర కాదు, ఉత్తమ సంరక్షణ కోరుకుంటారు", "સૌથી ઓછી કિંમત નહીં, શ્રેષ્ઠ સંભાળ ઇચ્છે છે") },
        { value: "Value seeker - Wants good treatment at a fair price", title: addTranslations("Value seeker", "मूल्य चाहने वाले", "மதிப்பை நாடுபவர்", "విలువను కోరేవారు", "મૂલ્ય શોધનાર"), desc: addTranslations("Wants good treatment at a fair price", "उचित कीमत पर अच्छा इलाज चाहते हैं", "நியாயமான விலையில் நல்ல சிகிச்சையை விரும்புபவர்", "సరసమైన ధరకు మంచి చికిత్స కోరుకుంటారు", "વાજબી કિંમતે સારી સારવાર ઇચ્છે છે") },
        { value: "Convenience seeker - Wants less waiting, everything in one place", title: addTranslations("Convenience seeker", "सुविधा चाहने वाले", "வசதியை நாடுபவர்", "సౌలభ్యాన్ని కోరేవారు", "સુવિધા શોધનાર"), desc: addTranslations("Wants less waiting, everything in one place", "कम इंतज़ार, सब कुछ एक ही जगह चाहते हैं", "குறைந்த காத்திருப்பு, அனைத்தும் ஒரே இடத்தில் வேண்டும்", "తక్కువ నిరీక్షణ, అన్నీ ఒకే చోట కావాలి", "ઓછી રાહ, બધું એક જ જગ્યાએ ઇચ્છે છે") },
        { value: "Conservative treatment seeker - Prefers medicines, surgery only if needed", title: addTranslations("Conservative treatment seeker", "रूढ़िवादी इलाज चाहने वाले", "பழமைவாத சிகிச்சையை நாடுபவர்", "సంప్రదాయ చికిత్సను కోరేవారు", "રૂઢિચુસ્ત સારવાર શોધનાર"), desc: addTranslations("Prefers medicines, surgery only if needed", "दवाइयाँ पसंद करते हैं, सर्जरी सिर्फ़ ज़रूरत होने पर", "மருந்துகளை விரும்புபவர், தேவைப்பட்டால் மட்டுமே அறுவை சிகிச்சை", "మందులను ఇష్టపడతారు, అవసరమైతేనే శస్త్రచికిత్స", "દવાઓ પસંદ કરે છે, જરૂર હોય તો જ સર્જરી") },
        { value: "Default treatment seeker - Follows what the doctor recommends", title: addTranslations("Default treatment seeker", "डॉक्टर की सलाह मानने वाले", "வழக்கமான சிகிச்சையை நாடுபவர்", "సాధారణ చికిత్సను కోరేవారు", "સામાન્ય સારવાર શોધનાર"), desc: addTranslations("Follows what the doctor recommends", "डॉक्टर जो सलाह दें, वही मानते हैं", "மருத்துவர் பரிந்துரைப்பதைப் பின்பற்றுபவர்", "వైద్యుడు సూచించినదే పాటిస్తారు", "ડૉક્ટર જે ભલામણ કરે તે અનુસરે છે") },
        { value: "Premium lifestyle - Chooses premium hospitals for comfort and status", title: addTranslations("Premium lifestyle", "प्रीमियम जीवनशैली", "பிரீமியம் வாழ்க்கை முறை", "ప్రీమియం జీవనశైలి", "પ્રીમિયમ જીવનશૈલી"), desc: addTranslations("Chooses premium hospitals for comfort and status", "आराम और प्रतिष्ठा के लिए प्रीमियम अस्पताल चुनते हैं", "வசதிக்கும் அந்தஸ்துக்கும் பிரீமியம் மருத்துவமனைகளைத் தேர்ந்தெடுப்பவர்", "సౌకర్యం మరియు హోదా కోసం ప్రీమియం ఆసుపత్రులను ఎంచుకుంటారు", "આરામ અને પ્રતિષ્ઠા માટે પ્રીમિયમ હોસ્પિટલો પસંદ કરે છે") },
      ],
    },
    q3_4: {
      text: addTranslations("Who typically accompanies the patient when they visit the hospital / clinic?", "जब मरीज़ अस्पताल / क्लिनिक जाते हैं तो आमतौर पर उनके साथ कौन होता है?", "நோயாளி மருத்துவமனை / கிளினிக்கிற்கு வரும்போது பொதுவாக அவருடன் யார் வருவார்கள்?", "రోగి ఆసుపత్రి / క్లినిక్‌ను సందర్శించినప్పుడు సాధారణంగా వారి వెంట ఎవరు ఉంటారు?", "જ્યારે દર્દી હોસ્પિટલ / ક્લિનિકની મુલાકાત લે છે ત્યારે સામાન્ય રીતે તેમની સાથે કોણ હોય છે?"),
      note: addTranslations("Select all that apply.", "जो भी लागू हों, सभी चुनें।", "பொருந்தும் அனைத்தையும் தேர்ந்தெடுக்கவும்.", "వర్తించే అన్నింటినీ ఎంచుకోండి.", "લાગુ પડતા બધા પસંદ કરો."),
      options: {
        "Alone": addTranslations("Alone", "अकेले", "தனியாக", "ఒంటరిగా", "એકલા"),
        "With spouse / partner": addTranslations("With spouse / partner", "पति-पत्नी / साथी के साथ", "வாழ்க்கைத் துணை / துணையுடன்", "జీవిత భాగస్వామి / భాగస్వామితో", "જીવનસાથી / ભાગીદાર સાથે"),
        "With family": addTranslations("With family", "परिवार के साथ", "குடும்பத்துடன்", "కుటుంబంతో", "પરિવાર સાથે"),
        "Others": addTranslations("Others", "अन्य", "மற்றவை", "ఇతర", "અન્ય"),
      },
      placeholder: addTranslations("Describe briefly", "संक्षेप में वर्णन करें", "சுருக்கமாக விவரிக்கவும்", "సంక్షిప్తంగా వివరించండి", "ટૂંકમાં વર્ણન કરો"),
    }
};
