import { addTranslations } from "./translation-utils";
import { MultilingualText } from '../types';



export const translations = {
  appTitle: addTranslations('SPARQ', 'SPARQ', 'SPARQ', 'SPARQ', 'SPARQ'),
  appSubtitle: addTranslations('', '', '', '', ''),
  fillSample: addTranslations('Fill with Sample Data', 'सैंपल डेटा से भरें', 'மாதிரி தரவுடன் நிரப்புக', 'నమూనా డేటాతో నింపండి', 'નમૂના ડેટાથી ભરો'),
  selectSamplePrompt: addTranslations('Select a sample brand to load...', 'लोड करने के लिए एक सैंपल ब्रांड चुनें...', 'ஏற்ற ஒரு மாதிரி பிராண்டைத் தேர்ந்தெடுக்கவும்...', 'లోడ్ చేయడానికి నమూనా బ్రాండ్‌ను ఎంచుకోండి...', 'લોડ કરવા માટે નમૂના બ્રાન્ડ પસંદ કરો...'),
  resetForm: addTranslations('Reset Form', 'फ़ॉर्म रीसेट करें', 'படிவத்தை மீட்டமை', 'ఫారమ్‌ను రీసెట్ చేయండి', 'ફોર્મ રીસેટ કરો'),
  loadPastResponses: addTranslations('Load Past Responses', 'पिछली प्रतिक्रियाएँ लोड करें', 'பழைய பதில்களை ஏற்றவும்', 'గత ప్రతిస్పందనలను లోడ్ చేయండి', 'ભૂતકાળના પ્રતિભાવો લોડ કરો'),
  selectCategory: addTranslations('Select Category', 'श्रेणी चुनें', 'வகையைத் தேர்ந்தெடுக்கவும்', 'వర్గాన్ని ఎంచుకోండి', 'શ્રેણી પસંદ કરો'),

  settings: {
    title: addTranslations('Settings', 'सेटिंग्स', 'அமைப்புகள்', 'సెట్టింగ్‌లు', 'સેટિંગ્સ'),
    imageBasedTitle: addTranslations('Image-Based Description', 'सिर्फ़ इमेज से विवरण', 'பட அடிப்படையிலான വിവരണം', 'చిత్ర-ఆధారిత వివరణ', 'છબી-આધારિત વર્ણન'),
    imageBasedHint: addTranslations('Enable this to use only images to generate the description. All other fields will be disabled.', 'केवल छवियों का उपयोग करके विवरण उत्पन्न करने के लिए इसे सक्षम करें। अन्य सभी फ़ील्ड अक्षम हो जाएंगे।', 'விளக்கத்தை உருவாக்க படங்களை மட்டும் பயன்படுத்த இதை இயக்கவும். மற்ற எல்லா புலங்களும் முடக்கப்படும்.', 'వివరణను రూపొందించడానికి చిత్రాలను మాత్రమే ఉపయోగించడానికి దీన్ని ప్రారంభించండి. అన్ని ఇతర ఫీల్డ్‌లు నిలిపివేయబడతాయి.', 'વર્ણન જનરેટ કરવા માટે ફક્ત છબીઓનો ઉપયોગ કરવા માટે આને સક્ષમ કરો. અન્ય તમામ ફીલ્ડ્સ અક્ષમ થઈ જશે.'),
    webhookEnv: addTranslations('Webhook Environment', 'वेबहुक एनवायरनमेंट', 'Webhook சூழல்', 'వెబ్‌హుక్ ఎన్విరాన్‌మెంట్', 'વેબહુക്ക് પર્યાવરણ'),
    production: addTranslations('Production', 'प्रोडक्शन', 'உற்பத்தி', 'ప్రొడక్షన్', 'ઉત્પાદન'),
    test: addTranslations('Test', 'टेस्ट', 'சோதனை', 'టెస్ట్', 'પરીક્ષણ'),
    clipDuration: addTranslations('Audio Clip Duration', 'ऑडियो क्लिप अवधि', 'ஆடியோ கிளிப் கால அளவு', 'ఆడియో క్లిప్ వ్యవధి', 'ઓડિયો ક્લિપ અવધિ'),
  },

  loadResponsesModal: {
    title: addTranslations('Load Past Responses', 'पिछली प्रतिक्रियाएँ लोड करें', 'பழைய பதில்களை ஏற்றவும்', 'గత ప్రతిస్పందనలను లోడ్ చేయండి', 'ભૂતકાળના પ્રતિભાવો લોડ કરો'),
    dateLabel: addTranslations('Date', 'तारीख', 'தேதி', 'తేదీ', 'તારીખ'),
    userLabel: addTranslations('User', 'उपयोगकर्ता', 'பயனர்', 'వినియోగదారు', 'વપરાશકર્તા'),
    stateLabel: addTranslations('State', 'राज्य', 'மாநிலம்', 'రాష్ట్రం', 'રાજ્ય'),
    cityLabel: addTranslations('City', 'शहर', 'நகரம்', 'నగరం', 'શહેર'),
    salespersonLabel: addTranslations('Salesperson', 'सेल्सपर्सन', 'விற்பனையாளர்', 'సేల్స్‌పర్సన్', 'સેલ્સપર્સન'),
    salespersonPlaceholder: addTranslations('Select a salesperson...', 'एक विक्रेता चुनें...', 'ஒரு விற்பனையாளரைத் தேர்ந்தெடுக்கவும்...', 'ఒక విక్రయదారుడిని ఎంచుకోండి...', 'સેલ્સપર્સન પસંદ કરો...'),
    regionLabel: addTranslations('Region', 'क्षेत्र', 'பிராந்தியம்', 'ప్రాంతం', 'ક્ષેત્ર'),
    regionPlaceholder: addTranslations('Select a region...', 'एक क्षेत्र चुनें...', 'ஒரு பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்...', 'ఒక ప్రాంతాన్ని ఎంచుకోండి...', 'એક ક્ષેત્ર પસંદ કરો...'),
    userPlaceholder: addTranslations('Type to search for a user...', 'उपयोगकर्ता खोजने के लिए टाइप करें...', 'பயனரைத் தேட தட்டச்சு செய்யவும்...', 'వినియోగదారు కోసం శోధించడానికి టైప్ చేయండి...', 'વપરાશકર્તા શોધવા માટે ટાઇપ કરો...'),
    findResponses: addTranslations('Find Responses', 'प्रतिक्रियाएँ खोजें', 'பதில்களைக் கண்டறியவும்', 'ప్రతిస్పందనలను కనుగొనండి', 'પ્રતિભાવો શોધો'),
    fetchingUsers: addTranslations('Fetching users...', 'उपयोगकर्ता लाए जा रहे हैं...', 'பயனர்களைப் பெறுகிறது...', 'వినియోగదారులను పొందుతోంది...', 'વપરાશકર્તાઓ લાવી રહ્યાં છે...'),
    fetchingResponses: addTranslations('Fetching your past responses...', 'आपकी पिछली प्रतिक्रियाएँ लाई जा रही हैं...', 'உங்கள் பழைய பதில்கள் பெறப்படுகின்றன...', 'మీ గత ప్రతిస్పందనలు పొందబడుతున్నాయి...', 'તમારા ભૂતકાળના પ્રતિભાવો લાવી રહ્યાં છે...'),
    noResponsesFound: addTranslations('No responses found for this date. Try another date.', 'इस तारीख के लिए कोई प्रतिक्रिया नहीं मिली। कोई और तारीख आज़माएँ।', 'இந்தத் தேதிக்கு பதில்கள் எதுவும் இல்லை. வேறு தேதியை முயற்சிக்கவும்.', 'ఈ తేదీకి ప్రతిస్పందనలు కనుగొనబడలేదు. మరో తేదీని ప్రయత్నించండి.', 'આ તારીખ માટે કોઈ પ્રતિસાદ મળ્યો નથી. બીજી તારીખ અજમાવો.'),
    useThisResponse: addTranslations('Use This Response', 'इस प्रतिक्रिया का उपयोग करें', 'இந்த பதிலை பயன்படுத்தவும்', 'ఈ ప్రతిస్పందనను ఉపయోగించండి', 'આ પ્રતિસાદનો ઉપયોગ કરો'),
    selectResponsePrompt: addTranslations('Select a response from the list below.', 'नीचे दी गई सूची से एक प्रतिक्रिया चुनें।', 'கீழே உள்ள பட்டியலிலிருந்து ஒரு பதிலை தேர்ந்தெடுக்கவும்.', 'క్రింది జాబితా నుండి ప్రతిస్పందనను ఎంచుకోండి.', 'નીચેની સૂચિમાંથી પ્રતિસાદ પસંદ કરો.'),
    loadedNotification: addTranslations('Loaded past response for', 'के लिए पिछली प्रतिक्रिया लोड की गई', '-க்கான பழைய பதில் ஏற்றப்பட்டது', 'కోసం గత ప్రతిస్పందన లోడ్ చేయబడింది', 'માટે ભૂતકાળનો પ્રતિભાવ લોડ થયો'),
    categoryLabel: addTranslations('Category', 'श्रेणी', 'வகை', 'వర్గం', 'શ્રેણી'),
    fmcgOption: addTranslations('FMCG', 'FMCG', 'FMCG', 'FMCG', 'FMCG'),
    industrialOption: addTranslations('Industrial Goods', 'औद्योगिक सामान', 'தொழில்துறை பொருட்கள்', 'పారిశ్రామిక వస్తువులు', 'ઔદ્યોગિક માલ'),
  },

  submitToWebhook: addTranslations('Generate Brand Description', 'ब्रांड विवरण बनाएँ', 'பிராண்ட் விளக்கத்தை உருவாக்கு', 'బ్రాండ్ వివరణను రూపొందించండి', 'બ્રાન્ડ વર્ણન જનરેટ કરો'),
  submitting: addTranslations('Submitting...', 'सबमिट हो रहा है...', 'சமர்ப்பிக்கிறது...', 'సమర్పిస్తోంది...', 'સબમિટ કરી રહ્યું છે...'),
  pleaseSelectSalesperson: addTranslations('Please select a salesperson before submitting.', 'सबमिट करने से पहले कृपया एक सेल्सपर्सन चुनें।', 'சமர்ப்பிக்கும் முன் ஒரு விற்பனையாளரைத் தேர்ந்தெடுக்கவும்.', 'సమర్పించే ముందు దయచేసి ఒక విక్రయదారుడిని ఎంచుకోండి.', 'સબમિટ કરતા પહેલા કૃપા કરીને સેલ્સપર્સન પસંદ કરો.'),
  pleaseSelectRegionAndSalesperson: addTranslations('Please select a region and salesperson to continue.', 'जारी रखने के लिए कृपया एक क्षेत्र और सेल्सपर्सन चुनें।', 'தொடர்வதற்கு ஒரு பிராந்தியத்தையும் விற்பனையாளரையும் தேர்ந்தெடுக்கவும்.', 'కొనసాగించడానికి దయచేసి ఒక ప్రాంతం మరియు విక్రయదారుడిని ఎంచుకోండి.', 'ચાલુ રાખવા માટે કૃપા કરીને એક ક્ષેત્ર અને સેલ્સપર્સન પસંદ કરો.'),
  regionLabel: addTranslations('Region', 'क्षेत्र', 'பிராந்தியம்', 'ప్రాంతం', 'ક્ષેત్ર'),
  salespersonLabel: addTranslations('Salesperson', 'सेल्सपर्सन', 'விற்பனையாளர்', 'సేల్స్‌పర్సన్', 'સેલ્સપર્સન'),
  selectRegionPlaceholder: addTranslations('Select a region...', 'एक क्षेत्र चुनें...', 'ஒரு பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்...', 'ఒక ప్రాంతాన్ని ఎంచుకోండి...', 'એક ક્ષેત્ર પસંદ કરો...'),
  selectSalespersonPlaceholder: addTranslations('Select a salesperson...', 'एक विक्रेता चुनें...', 'ஒரு விற்பனையாளரைத் தேர்ந்தெடுக்கவும்...', 'ఒక విక్రయదారుడిని ఎంచుకోండి...', 'સેલ્સપર્સન પસંદ કરો...'),
  errorTitle: addTranslations('Error', 'गड़बड़', 'பிழை', 'లోపం', 'ભૂલ'),
  generating: addTranslations('Generating...', 'बन रहा है...', 'உருவாக்குகிறது...', 'జనరేట్ చేస్తోంది...', 'જનરેટ કરી રહ્યું છે...'),
  pleaseFillQuestion1_2: addTranslations('Please fill the mandatory question 1.2 before submitting.', 'सबमिट करने से पहले कृपया अनिवार्य प्रश्न 1.2 भरें।', 'சமர்ப்பிக்கும் முன் கட்டாயக் கேள்வி 1.2-ஐ நிரப்பவும்.', 'సమర్పించే ముందు దయచేసి తప్పనిసరి ప్రశ్న 1.2ని పూరించండి.', 'સબમિટ કરતા પહેલા કૃપા કરીને ફરજિયાત પ્રશ્ન 1.2 ભરો.'),

  generateAdPillars: addTranslations('Generate Ad Pillars', 'विज्ञापन स्तंभ बनाएँ', 'விளம்பரத் தூண்களை உருவாக்கு', 'ప్రకటన స్తంభాలను రూపొందించండి', 'જાહેરાત પિલર્સ જનરેટ કરો'),
  generateStory: addTranslations('Generate Story', 'कहानी बनाएँ', 'கதையை உருவாக்கு', 'కథను రూపొందించండి', 'વાર્તા જનરેટ કરો'),
  generateSketch: addTranslations('Generate Sketch', 'स्केच बनाएं', 'ஸ்கெட்ச் உருவாக்கவும்', 'స్కెచ్ గీయండి', 'સ્કેચ જનરેટ કરો'),
  generateVisual: addTranslations('Generate Visual', 'विज़ुअल बनाएं', 'விஷுவல் உருவாக்கவும்', 'విజువల్ உరுவாக்கవுండి', 'વિઝ્યુઅલ જનરેટ કરો'),
  fetchMedia: addTranslations('Fetch Media', 'मीडिया प्राप्त करें', 'மீடியாவைப் பெறவும்', 'మీడియాను పొందండి', 'મીડિયા મેળવો'),
  generateAdImages: addTranslations('Generate Ad Images', 'विज्ञापन छवियाँ बनाएँ', 'விளம்பரப் படங்களை உருவாக்கு', 'ప్రకటన చిత్రాలను రూపొందించండి', 'જાહેરાત છબીઓ જનરેટ કરો'),

  footerText: addTranslations('Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting', 'Developed for Qube Cinema Technologies by MXV Consulting'),
  edit: addTranslations('Edit', 'एडिट करें', 'திருத்து', 'సవరించు', 'સંપાદિત કરો'),
  save: addTranslations('Save', 'सेव करें', 'சேமி', 'సేవ్ చేయి', 'સાચવો'),
  positioningStatementTitle: addTranslations('Brand Description', 'ब्रांड का विवरण', 'பிராண்ட் விளக்கம்', 'బ్రాండ్ వివరణ', 'બ્રાન્ડ વર્ણન'),

  webhookRequired: addTranslations('Webhook URL is required.', 'वेबहुक URL ज़रूरी है।', 'Webhook URL தேவை.', 'వెబ్‌హుక్ URL అవసరం.', 'વેબહુક્કું URL આવશ્યક છે.'),
  webhookInvalid: addTranslations('The active Webhook URL is invalid.', 'सक्रिय वेबहुк URL अमान्य है।', 'செயலில் உள்ள Webhook URL தவறானது.', 'క్రియాశీల వెబ్‌హుక్ URL చెల్లదు.', 'સક્રિય વેબહુക്ക് URL અમાન્ય છે.'),
  brandDescriptionSuggestionsTitle: addTranslations('Image based AI suggestions to enhance the Brand Description', 'ब्रांड विवरण को बेहतर बनाने के लिए इमेज आधारित AI सुझाव', 'பிராண்ட் விளக்கத்தை மேம்படுத்த பட அடிப்படையிலான AI பரிந்துரைகள்', 'బ్రాండ్ వివరణను మెరుగుపరచడానికి చిత్రం ఆధారిత AI సూచనలు', 'બ્રાન્ડ વર્ણનને વધારવા માટે છબી આધારિત AI સૂચનો'),
  fetchingSuggestions: addTranslations('Fetching suggestions...', 'सुझाव लाए जा रहे हैं...', 'பரிந்துரைகளைப் பெறுகிறது...', 'సూచనలను పొందుతోంది...', 'સૂચનો લાવી રહ્યાં છે...'),
  accept: addTranslations('Accept', 'स्वीकार करें', 'ஏற்கவும்', 'అంగీకరించు', 'સ્વીકારો'),
  accepted: addTranslations('Accepted', 'स्वीकृत', 'ஏற்றுக்கொள்ளப்பட்டது', 'అంగీకరించబడింది', 'સ્વીકૃત'),
  ignore: addTranslations('Ignore', 'अनदेखा करें', 'புறக்கணிக்கவும்', 'విస్మరించు', 'અવગણો'),
  undo: addTranslations('Undo', 'पूर्ववत् करें', 'செயல்தவிர்', 'చర్యరద్దుచెయ్యి', 'પૂર્વવત્ કરો'),
  acceptAll: addTranslations('Accept All', 'सभी स्वीकार करें', 'அனைத்தையும் ஏற்றுக்கொள்', 'అన్నీ ఆమోదించండి', 'બધા સ્વીકારો'),
  ignoreAll: addTranslations('Ignore All', 'सभी को अनदेखा करें', 'அனைத்தையும் புறக்கணி', 'అన్నీ విస్మరించండి', 'બધાને અવગણો'),
  previewUpdate: addTranslations('Preview Updated Description', 'अपडेटेड विवरण का प्रीव्यू देखें', 'புதுப்பிக்கப்பட்ட விளக்கத்தை முன்னோட்டமிடு', 'నవీకరించబడిన వివరణను ప్రివ్యూ చేయండి', 'અપડેટ થયેલ વર્ણનનું પૂર્વદર્શન કરો'),
  rewriting: addTranslations('Rewriting...', 'फिर से लिखा जा रहा है...', 'மீண்டும் எழுதுகிறது...', 'తిరిగి వ్రాస్తోంది...', 'ફરીથી લખી રહ્યું છે...'),
  originalDescription: addTranslations('Original Description', 'मूल विवरण', 'அசல் விளக்கம்', 'అసలు వివరణ', 'મૂળ વર્ણન'),
  revisedDescription: addTranslations('Revised Description', 'संशोधित विवरण', 'திருத்தப்பட்ட விளக்கம்', 'సవరించిన వివరణ', 'સુધારેલું વર્ણન'),
  useThis: addTranslations('Use This Version', 'इस संस्करण का उपयोग करें', 'இந்த பதிப்பைப் பயன்படுத்தவும்', 'ఈ సంస్కరణను ఉపయోగించండి', 'આ સંસ્કરણનો ઉપયોગ કરો'),
  cancel: addTranslations('Cancel', 'रद्द करें', 'ரத்துசெய்', 'రద్దు చేయి', 'રદ કરો'),
  close: addTranslations('Close', 'बंद करें', 'மூடு', 'మూసివేయి', 'બંધ કરો'),
  download: addTranslations('Download', 'डाउनलोड', 'பதிவிறக்கு', 'డౌన్‌లోడ్', 'ડાઉનલોડ કરો'),
  viewOriginal: addTranslations('View Original', 'मूल देखें', 'அசலைப் பார்க்கவும்', 'అసలైనది వీక్షించండి', 'મૂળ જુઓ'),
  originalVersion: addTranslations('Original Version', 'मूल संस्करण', 'அசல் பதிப்பு', 'అసలు వెర్షన్', 'મૂળ સંસ્કરણ'),
};


import { fmcgFormTranslations } from "./fmcgTranslations";
import { industrialFormTranslations } from "./industrialTranslations";

// FMCG was originally exported as formTranslations
export const formTranslations = fmcgFormTranslations;
export { industrialFormTranslations };
import { lifestyleFormTranslations } from "./lifestyleTranslations";
import { retailFormTranslations } from "./retailTranslations";
export { lifestyleFormTranslations, retailFormTranslations };
