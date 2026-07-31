import { enTranslations } from '../translations/en';
import { hiTranslations } from '../translations/hi';
import { guTranslations } from '../translations/gu';
import { mrTranslations } from '../translations/mr';

export const uiTranslations = {
  en: enTranslations.ui,
  hi: hiTranslations.ui,
  gu: guTranslations.ui,
  mr: mrTranslations.ui
};

export const moduleTitleTranslations: {
  [language: string]: { [englishTitle: string]: string }
} = {
  hi: hiTranslations.moduleTitles,
  gu: guTranslations.moduleTitles,
  mr: mrTranslations.moduleTitles
};

export const moduleDescriptionTranslations: {
  [language: string]: { [englishDesc: string]: string }
} = {
  hi: {
    "Master standard terminology of players and processes in international trade.": "इंटरनेशनल ट्रेड में काम आने वाले मुख्य शब्दों और प्रक्रियाओं की आसान जानकारी।",
    "Understand core goods properties, custom classifications, and compliance metrics.": "प्रोडक्ट की मुख्य खूबियां, कस्टम क्लासिफिकेशन और नियमों की पूरी जानकारी।",
    "Learn metrics, standards, and calculations for shipping weight and volume.": "शिपिंग में वजन, वॉल्यूम और उनके कैलकुलेशन के तरीकों को समझें।",
    "Understand container types, dimensions, stuffing, and payload regulations.": "कंटेनर के प्रकार, साइज, लोडिंग और वजन से जुड़े नियमों की जानकारी।",
    "Learn shipping terms, delivery methods, port logistics, and incoterms.": "शिपिंग टर्म्स, डिलीवरी के तरीके, पोर्ट लॉजिस्टिक्स और इन्कोटर्म्स के बारे में जानें।"
  },
  gu: {
    "Master standard terminology of players and processes in international trade.": "આંતરરાષ્ટ્રીય વ્યાપારની મૂળભૂત શરતો અને પ્રક્રિયાઓની સરળ સમજ."
  },
  mr: {
    "Master standard terminology of players and processes in international trade.": "आंतरराष्ट्रीय व्यापारातील मूलभूत संज्ञा आणि प्रक्रियांची सोपी ओळख."
  }
};

// Hardcoded high fidelity translation mappings for main lessons
export const lessonTextTranslations: {
  [language: string]: {
    [lessonId: string]: {
      title?: string;
      definition?: string;
      whyImportant?: string;
      businessExample?: string;
      writtenExplanation?: string;
      summary?: string;
      importantNotes?: string[];
      commonMistakes?: string[];
      practicalTips?: string[];
    }
  }
} = {
  hi: (hiTranslations as any).lessons || {},
  gu: (guTranslations as any).lessons || {},
  mr: (mrTranslations as any).lessons || {},
  en: (enTranslations as any).lessons || {}
};

export const translateDynamicContent = (
  text: string,
  title: string,
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  if (!text || lang === 'en') return text;

  let translated = text;

  // 1. Replacements for Hindi (hi)
  if (lang === 'hi') {
    translated = translated
      .replaceAll('Supplier Verification is the formal process of vetting, auditing, and validating a foreign manufacturer\'s legality, capabilities, quality standards, and financial health prior to placing orders.', 'सप्लायर वेरिफिकेशन (Supplier Verification) ऑर्डर देने से पहले एक विदेशी निर्माता की वैधता, क्षमताओं, गुणवत्ता मानकों और वित्तीय स्थिति की जांच, ऑडिट और सत्यापन करने की औपचारिक प्रक्रिया है।')
      .replaceAll('Supplier Verification is the formal process of vetting, auditing, and validating a foreign manufacturer\'s legality, capabilities, quality standards, and financial health prior to placing orders.', 'सप्लायर वेरिफिकेशन (Supplier Verification) ऑर्डर देने से पहले एक विदेशी निर्माता की वैधता, क्षमताओं, गुणवत्ता मानकों और वित्तीय स्थिति की जांच, ऑडिट और सत्यापन करने की औपचारिक प्रक्रिया है।')
      .replaceAll('Supplier vetting involves validating licenses, auditing machine logs, checking legal accounts, and social compliance.', 'सप्लायर सत्यापन में लाइसेंसों की पुष्टि करना, मशीन लॉग का ऑडिट करना, कानूनी खातों और सामाजिक अनुपालन की जांच करना शामिल है।')
      .replaceAll('RBC Imports hires a local third-party inspector in Ningbo, China, to conduct an on-site factory audit, check their business license, verify ISO certifications, and inspect manufacturing machinery before paying a $20,000 deposit.', 'RBC निंगबो, चीन में $20,000 जमा करने से पहले ऑन-साइट फैक्ट्री ऑडिट करने, उनके व्यावसायिक लाइसेंस की जांच करने, ISO प्रमाणपत्रों को सत्यापित करने और निर्माण मशीनरी का निरीक्षण करने के लिए एक स्थानीय तीसरे पक्ष के निरीक्षक को नियुक्त करता है।')
      .replaceAll('It mitigates global supply risks, preventing financial fraud, poor production quality, cargo delays, and legal issues (such as child labor or chemical compliance violations).', 'यह वैश्विक आपूर्ति जोखिमों को कम करता है, वित्तीय धोखाधड़ी, खराब उत्पादन गुणवत्ता, कार्गो देरी और कानूनी मुद्दों (जैसे बाल श्रम या रासायनिक अनुपालन उल्लंघन) को रोकता है।')
      .replaceAll('Mismatch in company names is a major red flag.', 'कंपनी के नामों में बेमेल होना एक बड़ा रेड फ्लैग है।')
      .replaceAll('Paying deposits into a personal bank account instead of a registered corporate business account.', 'पंजीकृत कॉर्पोरेट व्यवसाय खाते के बजाय व्यक्तिगत बैंक खाते में जमा राशि का भुगतान करना।')
      .replaceAll('After Sales Support is RBC\'s customer service framework managing warranty claims, technical usage assistance, spare parts replacement, and repeat import reorders.', 'आफ्टर सेल्स सपोर्ट (After Sales Support) RBC का ग्राहक सेवा ढांचा है जो वारंटी दावों, तकनीकी उपयोग सहायता, स्पेयर पार्ट्स प्रतिस्थापन, और पुनरावृत्ति आयात रीऑर्डर का प्रबंधन करता है।')
      .replaceAll('Builds long-term client trust, drives customer retention, and generates high-value repeat import contract orders.', 'दीर्घकालिक ग्राहक विश्वास का निर्माण करता है, ग्राहक प्रतिधारण को बढ़ाता है, और उच्च-मूल्य वाले पुनरावृत्ति आयात अनुबंध आदेश उत्पन्न करता है।')
      .replaceAll('RBC provides 12-month replacement warranty and supplies spare circuit boards within 48 hours for a machinery client in Ahmedabad.', 'RBC 12-महीने की रिप्लेसमेंट वारंटी प्रदान करता है और अहमदाबाद में एक मशीनरी ग्राहक के लिए 48 घंटों के भीतर स्पेयर सर्किट बोर्ड की आपूर्ति करता है।')
      .replaceAll('Ignoring customer post-delivery quality feedback or warranty replacement requests.', 'ग्राहक के वितरण के बाद के गुणवत्ता फीडबैक या वारंटी रिप्लेसमेंट अनुरोधों की अनदेखी करना।')
      .replaceAll('Conduct a follow-up feedback call 14 days post-delivery to measure customer satisfaction.', 'ग्राहक संतुष्टि को मापने के लिए वितरण के 14 दिन बाद एक फॉलो-अप फीडबैक कॉल करें।')
      .replaceAll('After Sales Support provides warranty service, technical spare parts, and repeat order management.', 'आफ्टर सेल्स सपोर्ट वारंटी सेवा, तकनीकी स्पेयर पार्ट्स और पुनरावृत्ति ऑर्डर प्रबंधन प्रदान करता है।')
      .replaceAll('Customer Delivery Process is RBC\'s outbound logistics workflow scheduling local truck transport, issuing GST tax invoices, and delivering goods to client doors.', 'कस्टमर डिलीवरी प्रोसेस (Customer Delivery Process) RBC का आउटबाउंड लॉजिस्टिक्स वर्कफ़्लो है जो स्थानीय ट्रक परिवहन का निर्धारण करता है, GST कर चालान जारी करता है, और ग्राहकों के दरवाजों तक सामान पहुंचाता है।')
      .replaceAll('Guarantees safe final-mile delivery, secures signed proof of delivery (POD), and enables client invoice collection.', 'सुरक्षित अंतिम-माइल डिलीवरी की गारंटी देता है, हस्ताक्षरित डिलीवरी सबूत (POD) सुरक्षित करता है, और ग्राहक चालान संग्रह सक्षम बनाता है।')
      .replaceAll('RBC dispatches 2 trucks delivering cleared imported machinery to client\'s factory in Pune with E-Way Bill #39201920.', 'RBC E-Way बिल #39201920 के साथ पुणे में ग्राहक की फैक्ट्री में क्लियर की गई आयातित मशीनरी पहुंचाने वाले 2 ट्रकों को रवाना करता है।')
      .replaceAll('Dispatching trucks without generating mandatory GST E-Way bills for inter-state transit.', 'अंतर-राज्यीय पारगमन के लिए अनिवार्य GST E-Way बिल उत्पन्न किए बिना ट्रकों को रवाना करना।')
      .replaceAll('Require truck drivers to obtain signed and stamped Delivery Proof (POD) upon client receipt.', 'ग्राहक रसीद पर ट्रक चालकों को हस्ताक्षरित और मुद्रित डिलीवरी सबूत (POD) प्राप्त करने की आवश्यकता होती है।')
      .replaceAll('Customer Delivery Process manages final-mile truck transport, E-Way bills, and client delivery proof.', 'कस्टमर डिलीवरी प्रोसेस अंतिम-माइल ट्रक परिवहन, E-Way बिल और ग्राहक डिलीवरी सबूत का प्रबंधन करता है।')
      .replaceAll('Warehouse Process is RBC\'s inbound logistics workflow for container de-stuffing, carton physical count tallying, quality damage inspection, and inventory SKU stocking.', 'वेयरहाउस प्रोसेस (Warehouse Process) कंटेनर खाली करने, कार्टन भौतिक गिनती तुलना, गुणवत्ता क्षति निरीक्षण, और इन्वेंट्री SKU स्टॉकिंग के लिए RBC का इनबाउंड लॉजिस्टिक्स वर्कफ़्लो है।')
      .replaceAll('Ensures accurate inventory barcode scanning, verifies box counts, and identifies transit damage before goods enter available sellable stock.', 'सटीक इन्वेंट्री बारकोड स्कैनिंग सुनिश्चित करता है, बॉक्स काउंट की पुष्टि करता है, और सामान के उपलब्ध बिक्री योग्य स्टॉक में प्रवेश करने से पहले पारगमन क्षति की पहचान करता है।')
      .replaceAll('RBC warehouse team de-stuffs 20FT container, scans 500 master cartons into ERP inventory, and reports zero box shortages.', 'RBC गोदाम टीम 20FT कंटेनर को खाली करती है, ERP इन्वेंट्री में 500 मास्टर कार्टन स्कैन करती है, और शून्य बॉक्स की कमी की रिपोर्ट करती है।')
      .replaceAll('Mixing uninspected inbound cargo directly into active sellable warehouse shelves.', 'अनिरीक्षित इनबाउंड कार्गो को सीधे सक्रिय बिक्री योग्य गोदाम अलमारियों में मिलाना।')
      .replaceAll('Use barcode handheld scanners during container unloading for automated inventory logging.', 'स्वचालित इन्वेंट्री लॉगिंग के लिए कंटेनर अनलोडिंग के दौरान बारकोड हैंडहेल्ड स्कैनर का उपयोग करें।')
      .replaceAll('Warehouse Process manages container de-stuffing, box count tallying, and ERP inventory stocking.', 'वेयरहाउस प्रोसेस कंटेनर खाली करने, बॉक्स काउंट तुलना और ERP इन्वेंट्री स्टॉकिंग का प्रबंधन करता है।')
      .replaceAll('Customs Process is RBC\'s clearance workflow coordinating with CHA brokers to file Bill of Entry, pay customs duties (BCD/IGST), and obtain Out-of-Charge release.', 'कस्टम्स प्रोसेस (Customs Process) RBC का क्लीयरेंस वर्कफ़्लो है जो बिल ऑफ एंट्री दाखिल करने, सीमा शुल्क (BCD/IGST) का भुगतान करने और आउट-ऑफ-चार्ज रिलीज प्राप्त करने के लिए CHA दलालों के साथ समन्वय करता है।')
      .replaceAll('Ensures zero customs penalties, fast ICEGATE duty clearance, and immediate container gate-out from port terminals.', 'शून्य सीमा शुल्क जुर्माना, त्वरित ICEGATE ड्यूटी निकासी, और पोर्ट टर्मिनलों से तत्काल कंटेनर गेट-आउट सुनिश्चित करता है।')
      .replaceAll('RBC CHA files Bill of Entry #8849201, pays ₹1,24,000 IGST via ICEGATE, and secures Customs Out-of-Charge order within 24 hours of vessel discharge.', 'RBC CHA बिल ऑफ एंट्री #8849201 दाखिल करता है, ICEGATE के माध्यम से ₹1,24,000 IGST का भुगतान करता है, और पोत डिस्चार्ज के 24 घंटों के भीतर कस्टम्स आउट-ऑफ-चार्ज ऑर्डर सुरक्षित करता है।')
      .replaceAll('Delaying duty payment after customs assessment, accumulating daily port demurrage fees.', 'सीमा शुल्क मूल्यांकन के बाद ड्यूटी भुगतान में देरी करना, जिससे दैनिक पोर्ट डेमरेज शुल्क जमा होता है।')
      .replaceAll('Maintain sufficient balance in ICEGATE e-cash ledger for instant one-click duty payments.', 'तत्काल एक-क्लिक ड्यूटी भुगतान के लिए ICEGATE ई-कैश लेजर में पर्याप्त शेष राशि बनाए रखें।')
      .replaceAll('Customs Process coordinates CHA filing, duty payments, and ICEGATE clearance release.', 'कस्टम्स प्रोसेस CHA फाइलिंग, ड्यूटी भुगतान और ICEGATE क्लीयरेंस रिलीज का समन्वय करता है।')
      .replaceAll('Shipment Tracking is RBC\'s logistics monitoring process following vessel location, container transshipment ports, and updated ETD/ETA milestones in real time.', 'शिपमेंट ट्रैकिंग (Shipment Tracking) RBC की लॉजिस्टिक्स निगरानी प्रक्रिया है जो वास्तविक समय में पोत स्थान, कंटेनर ट्रांसशिपमेंट पोर्ट और अद्यतन ETD/ETA मील के पत्थरों का पालन करती है।')
      .replaceAll('Enables CHA brokers to file advance customs Bill of Entry 2 days before vessel arrival, eliminating port demurrage.', 'CHA दलालों को पोत आगमन से 2 दिन पहले एडवांस कस्टम्स बिल ऑफ एंट्री दाखिल करने में सक्षम बनाता है, जिससे पोर्ट डेमरेज खत्म होता है।')
      .replaceAll('RBC tracks Container #MSCU8849201 via satellite API, detecting vessel arrival at Mundra Port on July 24 at 14:00 hrs.', 'RBC उपग्रह API के माध्यम से कंटेनर #MSCU8849201 को ट्रैक करता है, जो 24 जुलाई को 14:00 बजे मुंद्रा पोर्ट पर पोत आगमन का पता लगाता है।')
      .replaceAll('Ignoring transshipment port delay notices from ocean freight forwarders.', 'समुद्री माल फॉरवर्डर्स से ट्रांसशिपमेंट पोर्ट देरी नोटिस की अनदेखी करना।')
      .replaceAll('Integrate automated container tracking APIs inside RBC ERP for real-time vessel alerts.', 'वास्तविक समय पोत अलर्ट के लिए RBC ERP के अंदर स्वचालित कंटेनर ट्रैकिंग APIs को एकीकृत करें।')
      .replaceAll('Shipment Tracking monitors real-time vessel location and container ETA milestones.', 'शिपमेंट ट्रैकिंग वास्तविक समय के पोत स्थान और कंटेनर ETA मील के पत्थरों की निगरानी करती है।')
      .replaceAll('Production Tracking is RBC\'s operational monitoring protocol tracking factory raw material dyeing, assembly milestones, and completion percentages weekly.', 'प्रोडक्शन ट्रैकिंग (Production Tracking) RBC का परिचालन निगरानी प्रोटोकॉल है जो फैक्ट्री कच्चे माल की रंगाई, असेंबली मील के पत्थरों और पूर्णता प्रतिशत को साप्ताहिक रूप से ट्रैक करता है।')
      .replaceAll('Prevents unexpected factory production delays, enabling early carrier vessel booking.', 'अप्रत्याशित फैक्ट्री उत्पादन में देरी को रोकता है, जिससे प्रारंभिक वाहक पोत बुकिंग सक्षम होती है।')
      .replaceAll('RBC sourcing logs 50% assembly completion on Day 15, confirming the factory is on track for PSI inspection on Day 25.', 'RBC सोर्सिंग दिन 15 पर 50% असेंबली पूर्णता लॉग करता है, यह पुष्टि करते हुए कि फैक्ट्री दिन 25 पर PSI निरीक्षण के लिए सही रास्ते पर है।')
      .replaceAll('Failing to request weekly photo/video proof during active production cycles.', 'सक्रिय उत्पादन चक्रों के दौरान साप्ताहिक फोटो/वीडियो सबूत का अनुरोध करने में विफल रहना।')
      .replaceAll('Use digital production tracking dashboards updated directly by factory quality managers.', 'फैक्ट्री गुणवत्ता प्रबंधकों द्वारा सीधे अपडेट किए गए डिजिटल उत्पादन ट्रैकिंग डैशबोर्ड का उपयोग करें।')
      .replaceAll('Production Tracking monitors factory assembly milestones to guarantee on-time completion.', 'प्रोडक्शन ट्रैकिंग समय पर पूरा होने की गारंटी देने के लिए फैक्ट्री असेंबली मील के पत्थरों की निगरानी करती है।')
      .replaceAll('Payment Process is RBC\'s finance workflow auditing shipping documents (B/L, Commercial Invoice, Packing List, PSI Report) before releasing balance 70% payments.', 'पेमेंट प्रोसेस (Payment Process) शेष 70% भुगतान जारी करने से पहले शिपिंग दस्तावेजों (B/L, कमर्शियल इनवॉइस, पैकिंग लिस्ट, PSI रिपोर्ट) का ऑडिट करने वाला RBC का वित्त वर्कफ़्लो है।')
      .replaceAll('Protects RBC capital by ensuring full balance payments are wired only after verified passing PSI reports and ocean B/L surrender.', 'सत्यापित पासिंग PSI रिपोर्ट और ओशन B/L सरेंडर के बाद ही पूर्ण शेष भुगतान ट्रांसफर करके RBC पूंजी की रक्षा करता है।')
      .replaceAll('RBC finance audits the passed SGS inspection report and Telex Release B/L before releasing the final $10,500 balance wire to the vendor.', 'RBC फाइनेंस विक्रेता को अंतिम $10,500 शेष वायर जारी करने से पहले पास की गई SGS निरीक्षण रिपोर्ट और टेलेक्स रिलीज B/L का ऑडिट करता है।')
      .replaceAll('Releasing balance payment before verifying clean B/L issuance or inspection reports.', 'साफ B/L जारी होने या निरीक्षण रिपोर्ट सत्यापित करने से पहले शेष भुगतान जारी करना।')
      .replaceAll('Implement dual-authorization sign-off inside finance software for international TT wire transfers.', 'अंतरराष्ट्रीय TT वायर ट्रांसफर के लिए फाइनेंस सॉफ्टवेयर के अंदर दोहरी-प्राधिकरण साइन-ऑफ लागू करें।')
      .replaceAll('Payment Process audits shipping documents before releasing final vendor balance payments.', 'पेमेंट प्रोसेस अंतिम विक्रेता शेष भुगतान जारी करने से पहले शिपिंग दस्तावेजों का ऑडिट करता है।')
      .replaceAll('Purchase Process covers RBC\'s operational workflow for drafting binding Purchase Orders, negotiating payment terms, and remitting 30% advance deposits to factories.', 'परचेज प्रोसेस (Purchase Process) बाध्यकारी परचेज ऑर्डर तैयार करने, भुगतान शर्तों पर बातचीत करने और फैक्ट्रियों को 30% एडवांस डिपॉजिट ट्रांसफर करने के लिए RBC के परिचालन वर्कफ़्लो को कवर करता है।')
      .replaceAll('Establishes contractual clarity and triggers official factory raw material procurement.', 'अनुबंधीय स्पष्टता स्थापित करता है और आधिकारिक फैक्ट्री कच्चे माल की खरीद को ट्रिगर करता है।')
      .replaceAll('RBC procurement team issues PO #PO-40291 and wires $4,500 advance deposit to start production of 1,000 smart watch units.', 'RBC खरीद टीम PO #PO-40291 जारी करती है और 1,000 स्मार्ट वॉच इकाइयों का उत्पादन शुरू करने के लिए $4,500 एडवांस डिपॉजिट ट्रांसफर करती है।')
      .replaceAll('Omitting quality penalty clauses from Purchase Orders during the purchasing process.', 'खरीद प्रक्रिया के दौरान परचेज ऑर्डर से गुणवत्ता जुर्माना खंडों को हटाना।')
      .replaceAll('Require factory sign-off on Purchase Order terms before executing bank wire transfers.', 'बैंक वायर ट्रांसफर निष्पादित करने से पहले परचेज ऑर्डर शर्तों पर फैक्ट्री साइन-ऑफ की आवश्यकता होती है।')
      .replaceAll('Purchase Process executes legally binding PO drafting and advance deposit transfers.', 'परचेज प्रोसेस कानूनी रूप से बाध्यकारी PO प्रारूपण और एडवांस डिपॉजिट ट्रांसफर निष्पादित करता है।')
      .replaceAll('Quotation Approval is RBC\'s internal financial review process where management evaluates supplier landed cost quotes and validates target profit margins.', 'कोटेशन अप्रूवल (Quotation Approval) RBC की आंतरिक वित्तीय समीक्षा प्रक्रिया है जहाँ प्रबंधन सप्लायर की लैंडेड लागत उद्धरणों का मूल्यांकन करता है और लक्षित लाभ मार्जिन को सत्यापित करता है।')
      .replaceAll('Ensures every import deal meets corporate gross margin requirements before sending formal quotes to clients.', 'ग्राहकों को औपचारिक कोटेशन भेजने से पहले यह सुनिश्चित करता है कि हर आयात सौदा कॉर्पोरेट ग्रॉस मार्जिन आवश्यकताओं को पूरा करता है।')
      .replaceAll('RBC management approves Quotation #Q-9918 after verifying that the landed cost ($7.20) yields a healthy 25% profit margin at selling price ($9.60).', 'RBC प्रबंधन कोटेशन #Q-9918 को यह सत्यापित करने के बाद मंजूरी देता है कि लैंडेड लागत ($7.20) बिक्री मूल्य ($9.60) पर स्वस्थ 25% लाभ मार्जिन देती है।')
      .replaceAll('Failing to include destination port handling fees in landed cost calculations prior to approval.', 'मंजूरी से पहले लैंडेड लागत गणना में गंतव्य पोर्ट हैंडलिंग शुल्क शामिल न करना।')
      .replaceAll('Use automated landed cost calculators accounting for customs duties, freight, and local logistics.', 'सीमा शुल्क, भाड़ा और स्थानीय लॉजिस्टिक्स का हिसाब रखने वाले स्वचालित लैंडेड लागत कैलकुलेटर का उपयोग करें।')
      .replaceAll('Quotation Approval is internal management sign-off validating landed costs and profit margins.', 'कोटेशन अप्रूवल लैंडेड लागत और लाभ मार्जिन को सत्यापित करने वाला आंतरिक प्रबंधन साइन-ऑफ है।')
      .replaceAll('Supplier Verification is RBC\'s rigorous risk assessment protocol checking factory legal business licenses, ISO certifications, bank accounts, and manufacturing capacity.', 'सप्लायर वेरिफिकेशन (Supplier Verification) RBC का कठोर जोखिम मूल्यांकन प्रोटोकॉल है जो फैक्ट्री के कानूनी व्यवसाय लाइसेंस, ISO प्रमाण पत्र, बैंक खातों और निर्माण क्षमता की जांच करता है।')
      .replaceAll('Eliminates fake trading middlemen and fraud scammers, ensuring RBC deals only with audited genuine factories.', 'नकली ट्रेडिंग बिचौलियों और धोखाधड़ी करने वाले स्कैमर्स को खत्म करता है, यह सुनिश्चित करते हुए कि RBC केवल ऑडिट की गई वास्तविक फैक्ट्रियों से सौदा करता है।')
      .replaceAll('RBC conducts a third-party factory background check in Shenzhen, verifying business license #91440300 and confirming 50 assembly line workers.', 'RBC शेनझेन में तीसरे पक्ष की फैक्ट्री पृष्ठभूमि जांच करता है, जिसमें व्यवसाय लाइसेंस #91440300 की पुष्टि की जाती है और 50 असेंबली लाइन कर्मचारियों की पुष्टि की जाती है।')
      .replaceAll('Wiring advance deposits to unverified personal bank accounts instead of corporate factory accounts.', 'कॉर्पोरेट फैक्ट्री खातों के बजाय असत्यापित व्यक्तिगत बैंक खातों में एडवांस डिपॉजिट ट्रांसफर करना।')
      .replaceAll('Verify supplier bank SWIFT codes match the exact corporate name registered on business licenses.', 'सत्यापित करें कि सप्लायर बैंक SWIFT कोड व्यवसाय लाइसेंस पर पंजीकृत सटीक कॉर्पोरेट नाम से मेल खाते हैं।')
      .replaceAll('Supplier Verification audits factory legal licenses, bank accounts, and manufacturing capacity.', 'सप्लायर वेरिफिकेशन फैक्ट्री के कानूनी लाइसेंस, बैंक खातों और निर्माण क्षमता का ऑडिट करता है।')
      .replaceAll('Product Approval is RBC\'s internal technical verification phase where engineering teams evaluate pre-production factory samples for design, durability, and compliance.', 'प्रोडक्ट अप्रूवल (Product Approval) RBC का आंतरिक तकनीकी सत्यापन चरण है जहाँ इंजीनियरिंग टीमें डिजाइन, स्थायित्व और अनुपालन के लिए प्री-प्रोडक्शन फैक्ट्री नमूनों का मूल्यांकन करती हैं।')
      .replaceAll('Formal Product Approval prevents mass production of flawed goods, protecting client investment and brand reputation.', 'औपचारिक प्रोडक्ट अप्रूवल दोषपूर्ण सामानों के बड़े पैमाने पर उत्पादन को रोकता है, जिससे ग्राहक निवेश और ब्रांड प्रतिष्ठा की रक्षा होती है।')
      .replaceAll('RBC\'s quality lab conducts drop tests and battery cycle audits on 2 factory sample units before issuing formal Product Approval.', 'RBC की गुणवत्ता प्रयोगशाला औपचारिक प्रोडक्ट अप्रूवल जारी करने से पहले 2 फैक्ट्री सैंपल इकाइयों पर ड्रॉप टेस्ट और बैटरी साइकिल ऑडिट करती है।')
      .replaceAll('Approving mass production based on digital photos instead of physical sample testing.', 'भौतिक नमूना परीक्षण के बजाय डिजिटल तस्वीरों के आधार पर बड़े पैमाने पर उत्पादन को मंजूरी देना।')
      .replaceAll('Store signed Golden Samples in RBC warehouse to serve as reference benchmarks for PSI inspections.', 'PSI निरीक्षणों के लिए संदर्भ बेंचमार्क के रूप में काम करने के लिए RBC गोदाम में हस्ताक्षरित गोल्डन नमूने स्टोर करें।')
      .replaceAll('Product Approval is internal technical sample evaluation validating specs before mass production.', 'प्रोडक्ट अप्रूवल बड़े पैमाने पर उत्पादन से पहले विनिर्देशों को सत्यापित करने वाला आंतरिक तकनीकी नमूना मूल्यांकन है।')
      .replaceAll('Inquiry Form is the internal RBC workflow document used by account managers to record customer product requirements, target landed costs, and quantity specifications.', 'इंक्वायरी फॉर्म (Inquiry Form) आंतरिक RBC वर्कफ़्लो दस्तावेज है जिसका उपयोग खाता प्रबंधकों द्वारा ग्राहक उत्पाद आवश्यकताओं, लक्षित लैंडेड लागतों और मात्रा विनिर्देशों को रिकॉर्ड करने के लिए किया जाता है।')
      .replaceAll('Capturing clear client requirements in the Inquiry Form ensures sourcing teams find exact factory matches without specs confusion.', 'इंक्वायरी फॉर्म में स्पष्ट ग्राहक आवश्यकताओं को कैप्चर करने से यह सुनिश्चित होता है कि सोर्सिंग टीमें बिना किसी विनिर्देश भ्रम के सटीक फैक्ट्री मैचों को ढूंढती हैं।')
      .replaceAll('RBC\'s sales team fills the Inquiry Form for 5,000 sets of wireless earbuds, logging target price ($6.50/unit) and Bluetooth 5.3 specs.', 'RBC की बिक्री टीम लक्षित मूल्य ($6.50/यूनिट) और ब्लूटूथ 5.3 विनिर्देशों को लॉग करते हुए 5,000 वायरलेस ईयरबड्स सेट के लिए इंक्वायरी फॉर्म भरती है।')
      .replaceAll('Accepting client inquiries without specifying target delivery deadlines or quality standards.', 'लक्षित वितरण समय सीमा या गुणवत्ता मानकों को निर्दिष्ट किए बिना ग्राहक पूछताछ स्वीकार करना।')
      .replaceAll('Require clients to sign off on the Inquiry Form before initiating supplier sourcing.', 'सप्लायर सोर्सिंग शुरू करने से पहले ग्राहकों को इंक्वायरी फॉर्म पर साइन ऑफ करने की आवश्यकता होती है।')
      .replaceAll('Inquiry Form is the internal document recording client product requirements and target pricing.', 'इंक्वायरी फॉर्म ग्राहक उत्पाद आवश्यकताओं और लक्षित मूल्य निर्धारण को रिकॉर्ड करने वाला आंतरिक दस्तावेज है।')
      .replaceAll('Dispute Resolution is the formal contractual arbitration or court litigation procedure used by buyer and seller to settle commercial disagreements over quality defects, delayed shipments, or unpaid invoices.', 'विवाद समाधान (Dispute Resolution) गुणवत्ता दोषों, विलंबित शिपमेंट या अवैतनिक चालानों पर वाणिज्यिक असहमति को सुलझाने के लिए खरीदार और विक्रेता द्वारा उपयोग की जाने वाली औपचारिक अनुबंधीय मध्यस्थता या अदालत मुकदमेबाजी प्रक्रिया है।')
      .replaceAll('Specifying international arbitration venues (such as SIAC Singapore or Indian Council of Arbitration) in purchase contracts avoids endless foreign court litigation.', 'खरीद अनुबंधों में अंतरराष्ट्रीय मध्यस्थता स्थलों (जैसे SIAC सिंगापुर या इंडियन काउंसिल ऑफ आर्बिट्रेशन) को निर्दिष्ट करने से अंतहीन विदेशी अदालत की मुकदमेबाजी से बचा जा सकता है।')
      .replaceAll('RBC and a Ningbo supplier resolve a quality specification disagreement through expedited SIAC arbitration, resulting in a mutually agreed 15% price credit refund.', 'RBC और एक निंगबो सप्लायर त्वरित SIAC मध्यस्थता के माध्यम से गुणवत्ता विनिर्देश असहमति को सुलझाते हैं, जिसके परिणामस्वरूप 15% मूल्य क्रेडिट रिफंड पर सहमति बनती है।')
      .replaceAll('Omitting governing law and arbitration jurisdiction clauses from international purchase contracts.', 'अंतरराष्ट्रीय खरीद अनुबंधों से शासी कानून और मध्यस्थता क्षेत्राधिकार खंडों को हटाना।')
      .replaceAll('Include SIAC or ICA arbitration clauses in all overseas Purchase Orders for fast resolution.', 'तेजी से समाधान के लिए सभी विदेशी परचेज ऑर्डर में SIAC या ICA मध्यस्थता खंड शामिल करें।')
      .replaceAll('Dispute Resolution is contractual arbitration or litigation settling commercial buyer-seller conflicts.', 'विवाद समाधान खरीदार-विक्रेता के वाणिज्यिक संघर्षों को सुलझाने वाली अनुबंधीय मध्यस्थता या मुकदमेबाजी है।')
      .replaceAll('Misdeclaration is the illegal or erroneous declaration of incorrect product values, HSN tariff codes, cargo weights, or country of origin on customs import documents.', 'मिसडिक्लेरेशन (Misdeclaration) सीमा शुल्क आयात दस्तावेजों पर गलत उत्पाद मूल्यों, HSN टैरिफ कोड, कार्गो वजन या मूल देश की अवैध या त्रुटिपूर्ण घोषणा है।')
      .replaceAll('Misdeclaration leads to heavy customs fines, ICEGATE Blacklisting, cargo seizure under Customs Act Section 111, and criminal prosecution.', 'मिसडिक्लेरेशन से भारी सीमा शुल्क जुर्माना, ICEGATE ब्लैकलिस्टिंग, कस्टम्स एक्ट धारा 111 के तहत कार्गो जब्ती और आपराधिक मुकदमा होता है।')
      .replaceAll('An importer misdeclares high-duty lithium batteries as plastic casings to evade duty. Customs detects the fraud via scanner audit, seizing the container and imposing a 300% penalty.', 'एक आयातक ड्यूटी से बचने के लिए उच्च-ड्यूटी लिथियम बैटरियों को प्लास्टिक केसिंग के रूप में घोषित करता है। कस्टम्स स्कैनर ऑडिट के माध्यम से धोखाधड़ी का पता लगाता है, कंटेनर को जब्त करता है और 300% जुर्माना लगाता है।')
      .replaceAll('Under-declaring Commercial Invoice value to evade customs duties.', 'सीमा शुल्क से बचने के लिए कमर्शियल इनवॉइस मूल्य को कम घोषित करना।')
      .replaceAll('Verify HSN codes and assessable values with licensed CHA brokers prior to ICEGATE filing.', 'ICEGATE फाइलिंग से पहले लाइसेंस प्राप्त CHA दलालों के साथ HSN कोड और मूल्यांकन योग्य मूल्यों की पुष्टि करें।')
      .replaceAll('Misdeclaration is filing false values or HSN codes on customs entries leading to seizure and fines.', 'मिसडिक्लेरेशन सीमा शुल्क प्रविष्टियों पर गलत मूल्य या HSN कोड दाखिल करना है जिससे जब्ती और जुर्माना होता है।')
      .replaceAll('Shortage is a physical discrepancy where the actual number of delivered master cartons or units received at the warehouse is less than declared on the Commercial Invoice and Packing List.', 'शार्टेज (Shortage) एक भौतिक विसंगति है जहाँ गोदाम में प्राप्त वितरित मास्टर कार्टन या इकाइयों की वास्तविक संख्या कमर्शियल इनवॉइस और पैकिंग सूची में घोषित संख्या से कम होती है।')
      .replaceAll('Promptly identifying shortages protects importers from paying customs duty or supplier invoices for missing un-received inventory.', 'शार्टेज को तुरंत पहचानने से आयातक गायब न मिले इन्वेंट्री के लिए सीमा शुल्क या सप्लायर चालान का भुगतान करने से बचते हैं।')
      .replaceAll('RBC receives 480 cartons instead of the 500 declared on the Packing List. RBC immediately obtains a Joint Inspection Survey Report at the CFS to claim reimbursement for the missing 20 boxes.', 'RBC को पैकिंग सूची में घोषित 500 के बजाय 480 कार्टन प्राप्त होते हैं। RBC गायब 20 बक्सों के लिए प्रतिपूर्ति का दावा करने के लिए CFS में तुरंत एक संयुक्त निरीक्षण सर्वेक्षण रिपोर्ट प्राप्त करता है।')
      .replaceAll('Signing clean trucker delivery notes before tallying total master carton counts.', 'कुल मास्टर कार्टन गिनती की तुलना करने से पहले साफ ट्रकर डिलीवरी नोटों पर हस्ताक्षर करना।')
      .replaceAll('Conduct box tallying immediately upon container unloading at port CFS or warehouse.', 'पोर्ट CFS या गोदाम पर कंटेनर अनलोडिंग पर तुरंत बॉक्स टैली का संचालन करें।')
      .replaceAll('Shortage is a physical carton count discrepancy between delivered cargo and packing documents.', 'शार्टेज वितरित कार्गो और पैकिंग दस्तावेजों के बीच एक भौतिक कार्टन गिनती विसंगति है।')
      .replaceAll('Damage Claim is a formal legal compensation claim filed by an importer against a shipping line, port authority, or insurance underwriter for physical cargo damage occurring during transit.', 'डैमेज क्लेम (Damage Claim) पारगमन के दौरान होने वाले भौतिक कार्गो नुकसान के लिए शिपिंग लाइन, पोर्ट अथॉरिटी या इंश्योरेंस अंडरराइटर के खिलाफ आयातक द्वारा दायर किया गया एक औपचारिक कानूनी मुआवजा दावा है।')
      .replaceAll('Filing a claim within statutory time limits (typically within 3 to 7 days of container discharge) ensures 100% financial reimbursement for broken or wet goods.', 'वैधानिक समय सीमा के भीतर (आमतौर पर कंटेनर डिस्चार्ज के 3 से 7 दिनों के भीतर) दावा दाखिल करना टूटे या गीले सामान की 100% वित्तीय प्रतिपूर्ति सुनिश्चित करता है।')
      .replaceAll('Upon discovering 15 crushed master cartons during container de-stuffing, RBC takes timestamped photos, endorses the trucker delivery note, and files a $3,200 Damage Claim with the marine insurer.', 'कंटेनर खाली करने के दौरान 15 कुचले हुए मास्टर कार्टन खोजने पर, RBC टाइमस्टैम्प्ड तस्वीरें लेता है, ट्रकर डिलीवरी नोट की पुष्टि करता है, और मरीन इंश्योरर के पास $3,200 का डैमेज क्लेम दाखिल करता है।')
      .replaceAll('Failing to notify carriers of damage within statutory time limits, invalidating insurance claims.', 'वैधानिक समय सीमा के भीतर वाहकों को नुकसान की सूचना न देना, जिससे बीमा दावे अमान्य हो जाते हैं।')
      .replaceAll('Document cargo damage immediately with photos and written notice upon container opening.', 'कंटेनर खोलते ही तस्वीरों और लिखित नोटिस के साथ कार्गो क्षति का तुरंत दस्तावेजीकरण करें।')
      .replaceAll('Damage Claim is a formal compensation claim filed for transit-damaged cargo.', 'डैमेज क्लेम पारगमन-क्षतिग्रस्त कार्गो के लिए दायर एक औपचारिक मुआवजा दावा है।')
      .replaceAll('Delay refers to unscheduled disruptions in raw material sourcing, factory assembly, or carrier shipping routes that push cargo arrival past agreed delivery dates.', 'डिले (Delay) कच्चे माल की सोर्सिंग, फैक्ट्री असेंबली या कैरियर शिपिंग मार्गों में अनियोजित व्यवधानों को संदर्भित करता है जो कार्गो आगमन को सहमत वितरण तिथियों से आगे बढ़ाते हैं।')
      .replaceAll('Unmanaged shipping delays cause warehouse stockouts, missed retail seasons, and severe financial cash flow bottlenecks.', 'अनियंत्रित शिपिंग देरी से गोदाम में स्टॉक खत्म हो जाता है, खुदरा सीजन छूट जाता है और गंभीर वित्तीय नकदी प्रवाह में बाधा उत्पन्न होती है।')
      .replaceAll('RBC tracks vessel transshipment logs at Colombo Port, detecting a 4-day port congestion delay and notifying downstream customers immediately.', 'RBC कोलंबो पोर्ट पर पोत ट्रांसशिपमेंट लॉग को ट्रैक करता है, 4-दिवसीय पोर्ट भीड़ में देरी का पता लगाता है और डाउनस्ट्रीम ग्राहकों को तुरंत सूचित करता है।')
      .replaceAll('Failing to include liquidated damages clauses for unexcused supplier production delays.', 'बिना शर्त सप्लायर उत्पादन देरी के लिए परिसमाप्त नुकसान खंड शामिल न करना।')
      .replaceAll('Maintain a 10-day buffer stock in local warehouses to absorb international transit delays.', 'अंतरराष्ट्रीय पारगमन देरी को अवशोषित करने के लिए स्थानीय गोदामों में 10-दिवसीय बफर स्टॉक बनाए रखें।')
      .replaceAll('Delay represents transit or production schedule slowdowns extending delivery deadlines.', 'डिले पारगमन या उत्पादन समय सारिणी में मंदी का प्रतिनिधित्व करता है जो वितरण समय सीमा को बढ़ाता है।')
      .replaceAll('Force Majeure is a standard legal contract clause exempting both buyer and seller from contractual liability during unavoidable natural disasters, wars, port strikes, or government lockdowns.', 'फोर्स मेज्योर (Force Majeure) एक मानक कानूनी अनुबंध खंड है जो अपरिहार्य प्राकृतिक आपदाओं, युद्धों, पोर्ट हड़तालों या सरकारी लॉकडाउन के दौरान खरीदार और विक्रेता दोनों को अनुबंधीय दायित्व से छूट देता है।')
      .replaceAll('Prevents financial breach penalties when extraordinary events beyond human control delay factory production or vessel transit.', 'जब मानव नियंत्रण से परे असाधारण घटनाएं फैक्ट्री उत्पादन या पोत पारगमन में देरी करती हैं तो वित्तीय उल्लंघन जुर्माने से बचाता है।')
      .replaceAll('During a major typhoon shutting down Shanghai Port for 7 days, the supplier invokes the Force Majeure clause to extend the shipping deadline without incurring late delivery fines.', 'शंघाई पोर्ट को 7 दिनों के लिए बंद करने वाले एक बड़े तूफान के दौरान, सप्लायर देर से डिलीवरी का जुर्माना लगाए बिना शिपिंग समय सीमा को बढ़ाने के लिए फोर्स मेज्योर क्लॉज का हवाला देता है।')
      .replaceAll('Assuming routine raw material shortages count as valid Force Majeure events.', 'यह मान लेना कि नियमित कच्चे माल की कमी वैध फोर्स मेज्योर घटनाओं के रूप में गिना जाता है।')
      .replaceAll('Specify explicit notice timelines (e.g. 7 days written notice) inside Force Majeure contract clauses.', 'फोर्स मेज्योर अनुबंध खंडों के भीतर स्पष्ट सूचना समय सीमा (जैसे 7 दिनों का लिखित नोटिस) निर्दिष्ट करें।')
      .replaceAll('Force Majeure exempts contractual liability during extraordinary acts of God or uncontrollable events.', 'फोर्स मेज्योर ईश्वर के असाधारण कृत्यों या अनियंत्रित घटनाओं के दौरान अनुबंधीय दायित्व से छूट देता है।')
      .replaceAll('Cargo Insurance is a commercial marine policy protecting buyers and sellers against financial loss if goods are lost, damaged, stolen, or destroyed during sea, air, or road transit.', 'कार्गो इंश्योरेंस (Cargo Insurance) एक व्यावसायिक समुद्री नीति है जो खरीदारों और विक्रेताओं को वित्तीय नुकसान से बचाती है यदि समुद्र, वायु या सड़क पारगमन के दौरान सामान खो जाता है, क्षतिग्रस्त हो जाता है, चोरी हो जाता है या नष्ट हो जाता है।')
      .replaceAll('Buying Institute Cargo Clauses (A) all-risk insurance guarantees full financial recovery even if a container falls overboard or catches fire at sea.', 'इंस्टीट्यूट कार्गो क्लॉज (A) ऑल-रिस्क बीमा खरीदना समुद्र में कंटेनर के गिरने या आग लगने पर भी पूर्ण वित्तीय वसूली की गारंटी देता है।')
      .replaceAll('RBC purchases Marine Cargo Insurance covering 110% of CIF shipment value ($66,000) for a container of medical equipment traveling from Ningbo to Mundra Port.', 'RBC निंगबो से मुंद्रा पोर्ट तक जाने वाले मेडिकल उपकरणों के कंटेनर के लिए CIF शिपमेंट मूल्य ($66,000) का 110% कवर करने वाला मरीन कार्गो इंश्योरेंस खरीदता है।')
      .replaceAll('Shipping cargo under basic carrier liability instead of comprehensive all-risk marine insurance.', 'व्यापक ऑल-रिस्क मरीन इंश्योरेंस के बजाय बुनियादी कैरियर दायित्व के तहत कार्गो शिप करना।')
      .replaceAll('Insure cargo for 110% of CIF value to cover expected profit margins in case of loss.', 'नुकसान के मामले में अपेक्षित लाभ मार्जिन को कवर करने के लिए CIF मूल्य के 110% पर कार्गो का बीमा करें।')
      .replaceAll('Cargo Insurance is marine policy protection covering financial loss against transit damage or theft.', 'कार्गो इंश्योरेंस पारगमन क्षति या चोरी के खिलाफ वित्तीय नुकसान को कवर करने वाली समुद्री नीति सुरक्षा है।')
      .replaceAll('Delivery Confirmation is the final signed receipt issued by the buyer upon physically receiving, inspecting, and unloading the container at their warehouse.', 'डिलीवरी कन्फर्मेशन (Delivery Confirmation) अपने गोदाम में कंटेनर को भौतिक रूप से प्राप्त करने, निरीक्षण करने और अनलोड करने के बाद खरीदार द्वारा जारी की गई अंतिम हस्ताक्षरित रसीद है।')
      .replaceAll('Completes the commercial transaction cycle and confirms that goods arrived in acceptable condition.', 'वाणिज्यिक लेनदेन चक्र को पूरा करता है और पुष्टि करता है कि सामान स्वीकार्य स्थिति में पहुंचा है।')
      .replaceAll('RBC signs the Delivery Confirmation after receiving and unloading the 20FT container at their Ahmedabad warehouse with zero damage.', 'RBC अपने अहमदाबाद गोदाम में 20FT कंटेनर को शून्य क्षति के साथ प्राप्त और अनलोड करने के बाद डिलीवरी कन्फर्मेशन पर हस्ताक्षर करता है।')
      .replaceAll('Signing clean delivery receipts without inspecting master carton condition for water damage or crushed boxes.', 'पानी की क्षति या कुचले हुए बक्सों के लिए मास्टर कार्टन स्थिति का निरीक्षण किए बिना साफ डिलीवरी रसीदों पर हस्ताक्षर करना।')
      .replaceAll('Note any outer box damages or broken seals directly on the trucker delivery proof before signing.', 'हस्ताक्षर करने से पहले सीधे ट्रकर डिलीवरी सबूत पर बाहरी बॉक्स क्षति या टूटी हुई सील को नोट करें।')
      .replaceAll('Delivery Confirmation is the final buyer sign-off confirming successful cargo receipt at warehouse.', 'डिलीवरी कन्फर्मेशन गोदाम में सफल कार्गो प्राप्ति की पुष्टि करने वाला अंतिम खरीदार का साइन-ऑफ है।')
      .replaceAll('Dispatch is the official handover of packed export cartons from the factory warehouse to the logistics transporter for carriage to the port.', 'प्रस्थान (Dispatch) बंदरगाह पर ले जाने के लिए लॉजिस्टिक्स ट्रांसपोर्टर को फैक्ट्री गोदाम से पैक किए गए निर्यात कार्टन का आधिकारिक हस्तांतरण है।')
      .replaceAll('Triggers container stuffing, origin customs clearance, and issuance of the Bill of Lading.', 'कंटेनर स्टफिंग, ओरिजिन कस्टम्स क्लीयरेंस और बिल ऑफ लेडिंग के जारी होने को ट्रिगर करता है।')
      .replaceAll('The factory dispatches 500 master cartons loaded onto a container truck bound for Shanghai Port terminal on August 28.', 'फैक्ट्री 28 अगस्त को शंघाई पोर्ट टर्मिनल के लिए बाध्य कंटेनर ट्रक पर लोड किए गए 500 मास्टर कार्टन को डिस्पैच करती है।')
      .replaceAll('Dispatching goods without verifying container seal numbers and truck weight bridge tickets.', 'कंटेनर सील नंबर और ट्रक वेट ब्रिज टिकटों की पुष्टि किए बिना सामान डिस्पैच करना।')
      .replaceAll('Require factory to send photos of container seal lock and loaded truck before gate-out.', 'गेट-आउट से पहले फैक्ट्री को कंटेनर सील लॉक और लोड किए गए ट्रक की तस्वीरें भेजने की आवश्यकता होती है।')
      .replaceAll('Dispatch is the physical handover of finished goods from factory to port transport.', 'डिस्पैच फैक्ट्री से पोर्ट ट्रांसपोर्ट के लिए तैयार माल का भौतिक हस्तांतरण है।')
      .replaceAll('Production Timeline is a detailed schedule mapping out every manufacturing phase — raw material procurement, component assembly, testing, quality inspection, and export packing.', 'प्रोडक्शन टाइमलाइन (Production Timeline) हर निर्माण चरण — कच्चे माल की खरीद, घटक असेंबली, परीक्षण, गुणवत्ता निरीक्षण और निर्यात पैकिंग का विवरण देने वाला एक विस्तृत शेड्यूल है।')
      .replaceAll('Helps importers coordinate vessel bookings and customer delivery dates with precision.', 'आयातक को सटीकता के साथ पोत बुकिंग और ग्राहक वितरण तिथियों को समन्वयित करने में मदद करता है।')
      .replaceAll('The factory provides a 30-day Production Timeline: Days 1-7 (Material Sourcing), Days 8-20 (Assembly), Days 21-25 (Testing), Days 26-30 (PSI Inspection & Packing).', 'फैक्ट्री 30-दिन की प्रोडक्शन टाइमलाइन प्रदान करती है: दिन 1-7 (सामग्री सोर्सिंग), दिन 8-20 (असेंबली), दिन 21-25 (परीक्षण), दिन 26-30 (PSI निरीक्षण और पैकिंग)।')
      .replaceAll('Not accounting for Chinese New Year or national holiday shutdowns when planning production timelines.', 'उत्पादन टाइमलाइन की योजना बनाते समय चीनी नव वर्ष या राष्ट्रीय छुट्टी के शटडाउन का हिसाब न रखना।')
      .replaceAll('Add a 7-day buffer time to the production timeline for unforeseen material shortages.', 'अप्रत्याशित सामग्री की कमी के लिए उत्पादन टाइमलाइन में 7-दिन का बफर समय जोड़ें।')
      .replaceAll('Production Timeline maps out manufacturing milestones from raw material sourcing to packing.', 'प्रोडक्शन टाइमलाइन कच्चे माल की सोर्सिंग से पैकिंग तक निर्माण मील के पत्थरों का नक्शा बनाती है।')
      .replaceAll('Order Confirmation is the final signed bilateral agreement between buyer and seller locking product specs, final pricing, deposit payment receipt, and estimated shipping date.', 'ऑर्डर कन्फर्मेशन (Order Confirmation) खरीदार और विक्रेता के बीच अंतिम हस्ताक्षरित द्विपक्षीय समझौता है जो उत्पाद विनिर्देशों, अंतिम मूल्य निर्धारण, जमा भुगतान रसीद और अनुमानित शिपिंग तिथि को लॉक करता है।')
      .replaceAll('Signals the formal transition from negotiation to active manufacturing execution.', 'बातचीत से सक्रिय निर्माण निष्पादन में औपचारिक परिवर्तन का संकेत देता है।')
      .replaceAll('Supplier signs the Order Confirmation acknowledging receipt of RBC\'s 30% advance deposit ($3,600) and confirming ETD of September 10.', 'सप्लायर RBC के 30% एडवांस डिपॉजिट ($3,600) की रसीद स्वीकार करते हुए और 10 सितंबर की ETD की पुष्टि करते हुए ऑर्डर कन्फर्मेशन पर हस्ताक्षर करता है।')
      .replaceAll('Wiring advance deposit before both parties have signed the Order Confirmation.', 'दोनों पक्षों द्वारा ऑर्डर कन्फर्मेशन पर हस्ताक्षर करने से पहले एडवांस डिपॉजिट ट्रांसफर करना।')
      .replaceAll('Ensure Order Confirmation states exact bank SWIFT details and deposit currency.', 'सुनिश्चित करें कि ऑर्डर कन्फर्मेशन में सटीक बैंक SWIFT विवरण और जमा मुद्रा का उल्लेख हो।')
      .replaceAll('Order Confirmation is the final signed bilateral agreement triggering active manufacturing.', 'ऑर्डर कन्फर्मेशन अंतिम हस्ताक्षरित द्विपक्षीय समझौता है जो सक्रिय निर्माण को ट्रिगर करता है।')
      .replaceAll('Follow-up is the continuous operational tracking of factory production progress, raw material sourcing, and quality checkpoints to ensure on-time delivery.', 'फॉलो-अप (Follow-up) समय पर डिलीवरी सुनिश्चित करने के लिए फैक्ट्री उत्पादन प्रगति, कच्चे माल की सोर्सिंग और गुणवत्ता चेकपॉइंट की निरंतर परिचालन ट्रैकिंग है।')
      .replaceAll('Regular weekly follow-ups prevent factory delays, identify production bottlenecks early, and keep shipping schedules on track.', 'नियमित साप्ताहिक फॉलो-अप से फैक्ट्री की देरी से बचाव होता है, उत्पादन बाधाओं की जल्द पहचान होती है, और शिपिंग शेड्यूल पटरी पर रहता है।')
      .replaceAll('RBC\'s sourcing manager conducts weekly follow-up video calls with the factory manager to inspect raw material dyeing and assembly progress.', 'RBC का सोर्सिंग मैनेजर कच्चे माल की रंगाई और असेंबली प्रगति का निरीक्षण करने के लिए फैक्ट्री मैनेजर के साथ साप्ताहिक फॉलो-अप वीडियो कॉल करता है।')
      .replaceAll('Waiting until the scheduled completion date to contact the factory without weekly follow-ups.', 'साप्ताहिक फॉलो-अप के बिना फैक्ट्री से संपर्क करने के लिए निर्धारित पूर्णता तिथि तक इंतजार करना।')
      .replaceAll('Request weekly photo and video updates showing raw material inventory and assembly progress.', 'कच्चे माल की सूची और असेंबली प्रगति दिखाने वाले साप्ताहिक फोटो और वीडियो अपडेट का अनुरोध करें।')
      .replaceAll('Follow-up is continuous production tracking ensuring manufacturing milestones stay on schedule.', 'फॉलो-अप निरंतर उत्पादन ट्रैकिंग है जो यह सुनिश्चित करती है कि निर्माण मील के पत्थर शेड्यूल पर रहें।')
      .replaceAll('Sales Order (SO) is an internal sales confirmation document issued by the seller to acknowledge receipt of the buyer\'s Purchase Order and schedule factory production.', 'सेल्स ऑर्डर (Sales Order - SO) विक्रेता द्वारा खरीदार के परचेज ऑर्डर की प्राप्ति स्वीकार करने और फैक्ट्री उत्पादन निर्धारित करने के लिए जारी किया गया एक आंतरिक बिक्री पुष्टि दस्तावेज है।')
      .replaceAll('Confirms that the seller has accepted the PO terms and allocated factory raw materials for manufacturing.', 'यह पुष्टि करता है कि विक्रेता ने PO शर्तों को स्वीकार कर लिया है और निर्माण के लिए फैक्ट्री के कच्चे माल को आवंटित कर दिया है।')
      .replaceAll('Upon receiving RBC\'s signed PO, the factory issues Sales Order #SO-39201 and locks the production schedule in their ERP system.', 'RBC के हस्ताक्षरित PO प्राप्त होने पर, फैक्ट्री सेल्स ऑर्डर #SO-39201 जारी करती है और अपने ERP सिस्टम में उत्पादन शेड्यूल को लॉक करती है।')
      .replaceAll('Assuming production has started before receiving a signed Sales Order confirmation from factory.', 'फैक्ट्री से हस्ताक्षरित सेल्स ऑर्डर पुष्टि प्राप्त करने से पहले यह मान लेना कि उत्पादन शुरू हो गया है।')
      .replaceAll('Cross-check the Sales Order line items against your original PO to verify zero price or spec discrepancies.', 'शून्य मूल्य या विनिर्देश विसंगतियों की पुष्टि करने के लिए अपने मूल PO के साथ सेल्स ऑर्डर लाइन आइटम का मिलान करें।')
      .replaceAll('Sales Order is a seller confirmation acknowledging PO receipt and locking production scheduling.', 'सेल्स ऑर्डर PO रसीद स्वीकार करने और उत्पादन शेड्यूलिंग को लॉक करने वाली विक्रेता की पुष्टि है।')
      .replaceAll('Purchase Order (PO) is a legally binding contract issued by a buyer to a supplier confirming product specs, exact order quantity, agreed unit price, payment terms, and delivery deadline.', 'परचेज ऑर्डर (Purchase Order - PO) खरीदार द्वारा सप्लायर को जारी एक कानूनी रूप से बाध्यकारी अनुबंध है जो उत्पाद विनिर्देशों, सटीक ऑर्डर मात्रा, सहमत यूनिट मूल्य, भुगतान की शर्तों और वितरण की समय सीमा की पुष्टि करता है।')
      .replaceAll('Protects the importer legally — if the supplier manufactures wrong goods or delays shipment, the PO serves as the primary legal evidence.', 'आयातक की कानूनी रूप से रक्षा करता है — यदि सप्लायर गलत सामान बनाता है या शिपमेंट में देरी करता है, तो PO प्राथमिक कानूनी साक्ष्य के रूप में कार्य करता है।')
      .replaceAll('RBC issues PO #PO-8849 for 2,000 Bluetooth speakers at $8.00/unit FOB Ningbo, specifying a mandatory delivery deadline of August 25.', 'RBC $8.00/यूनिट FOB निंगबो पर 2,000 ब्लूटूथ स्पीकर के लिए PO #PO-8849 जारी करता है, जिसमें 25 अगस्त की अनिवार्य डिलीवरी समय सीमा निर्दिष्ट की गई है।')
      .replaceAll('Placing orders via chat messages without issuing a formal signed Purchase Order.', 'एक औपचारिक हस्ताक्षरित परचेज ऑर्डर जारी किए बिना चैट संदेशों के माध्यम से ऑर्डर देना।')
      .replaceAll('Include quality inspection pass requirements and penalty clauses for late delivery inside the PO.', 'PO के अंदर गुणवत्ता निरीक्षण पास आवश्यकताओं और देर से डिलीवरी के लिए जुर्माना खंड शामिल करें।')
      .replaceAll('Purchase Order is a legally binding order contract issued by buyer to supplier.', 'परचेज ऑर्डर खरीदार द्वारा सप्लायर को जारी किया गया एक कानूनी रूप से बाध्यकारी ऑर्डर अनुबंध है।')
      .replaceAll('Quotation (Proforma Offer) is a formal commercial document issued by a supplier detailing unit prices, bulk discounts, MOQ, payment terms, Incoterms, and price validity period.', 'कोटेशन (Quotation) सप्लायर द्वारा जारी एक औपचारिक वाणिज्यिक दस्तावेज है जिसमें यूनिट मूल्य, थोक छूट, MOQ, भुगतान की शर्तें, इंकोटर्म्स और मूल्य की वैधता अवधि का विवरण होता है।')
      .replaceAll('Comparing quotations from multiple suppliers helps importers negotiate competitive prices and favorable payment terms.', 'कई सप्लायरों से कोटेशन की तुलना करने से आयातकों को प्रतिस्पर्धी कीमतों और अनुकूल भुगतान शर्तों पर बातचीत करने में मदद मिलती है।')
      .replaceAll('Factory A submits a quotation of $4.50/pc FOB Shanghai with 30% advance deposit and 20 days production time for RBC\'s order.', 'फैक्ट्री A RBC के ऑर्डर के लिए 30% एडवांस डिपॉजिट और 20 दिनों के उत्पादन समय के साथ $4.50/पीसी FOB शंघाई का कोटेशन जमा करती है।')
      .replaceAll('Accepting quotations without checking validity dates or hidden packaging fees.', 'वैधता तिथियों या छिपे हुए पैकेजिंग शुल्क की जांच किए बिना कोटेशन स्वीकार करना।')
      .replaceAll('Request quotation break-ups showing raw material cost, packaging cost, and export inland freight.', 'कच्चे माल की लागत, पैकेजिंग लागत और निर्यात अंतर्देशीय भाड़ा दिखाने वाले कोटेशन ब्रेक-अप का अनुरोध करें।')
      .replaceAll('Quotation is a formal price and terms proposal submitted by a supplier.', 'कोटेशन सप्लायर द्वारा प्रस्तुत एक औपचारिक मूल्य और शर्तों का प्रस्ताव है।')
      .replaceAll('Inquiry is a formal written request sent by a buyer to a supplier detailing required product specifications, target quantity, packaging preferences, and delivery terms.', 'इंक्वायरी (Inquiry) खरीदार द्वारा सप्लायर को भेजा गया एक औपचारिक लिखित अनुरोध है जिसमें आवश्यक उत्पाद विनिर्देशों, लक्ष्य मात्रा, पैकेजिंग प्राथमिकताओं और वितरण शर्तों का विवरण होता है।')
      .replaceAll('Sending a clear, detailed inquiry enables suppliers to provide accurate price quotations without back-and-forth email delays.', 'एक स्पष्ट, विस्तृत इंक्वायरी भेजने से सप्लायरों को बार-बार ईमेल में देरी किए बिना सटीक मूल्य कोटेशन प्रदान करने में सक्षम बनाया जाता है।')
      .replaceAll('RBC sends a technical inquiry to 3 factories in Ningbo asking for unit prices, MOQ, and lead times for 10,000mAh magnetic power banks.', 'RBC निंगबो में 3 फैक्ट्रियों को 10,000mAh मैग्नेटिक पावर बैंकों के लिए यूनिट मूल्य, MOQ और लीड समय की मांग करते हुए एक तकनीकी इंक्वायरी भेजता है।')
      .replaceAll('Sending vague inquiries without exact specifications, material requirements, or target quantities.', 'सटीक विनिर्देशों, सामग्री आवश्यकताओं या लक्ष्य मात्रा के बिना अस्पष्ट पूछताछ भेजना।')
      .replaceAll('Attach a detailed Product Specification Sheet to your inquiry email to receive precise quotes.', 'सटीक कोटेशन प्राप्त करने के लिए अपने इंक्वायरी ईमेल में एक विस्तृत उत्पाद विनिर्देश शीट संलग्न करें।')
      .replaceAll('Inquiry is a formal written request sent to suppliers detailing product requirements and quantities.', 'इंक्वायरी सप्लायरों को भेजा गया एक औपचारिक लिखित अनुरोध है जिसमें उत्पाद आवश्यकताओं और मात्रा का विवरण होता है।')
      .replaceAll('Lead is a potential business contact or customer inquiry indicating interest in purchasing or importing specific products.', 'लीड (Lead) एक संभावित व्यावसायिक संपर्क या ग्राहक पूछताछ है जो विशिष्ट उत्पादों को खरीदने या आयात करने में रुचि दर्शाती है।')
      .replaceAll('Capturing and qualifying leads effectively builds the sales pipeline and drives new import/export business opportunities.', 'लीड्स को प्रभावी ढंग से कैप्चर और योग्य बनाने से सेल्स पाइपलाइन का निर्माण होता है और नए आयात/निर्यात व्यवसाय के अवसर मिलते हैं।')
      .replaceAll('RBC receives an inquiry lead from a builder in Mumbai requesting a quote for 5,000 square meters of imported ceramic tiles.', 'RBC को मुंबई के एक बिल्डर से 5,000 वर्ग मीटर आयातित सिरेमिक टाइलों के लिए कोटेशन का अनुरोध करने वाला एक इंक्वायरी लीड प्राप्त होता है।')
      .replaceAll('Failing to qualify leads based on budget, quantity, and import readiness before investing time.', 'समय निवेश करने से पहले बजट, मात्रा और आयात तत्परता के आधार पर लीड्स को योग्य बनाने में विफल रहना।')
      .replaceAll('Use a CRM tool to log lead source, contact details, and initial product specifications.', 'लीड स्रोत, संपर्क विवरण और प्रारंभिक उत्पाद विनिर्देशों को लॉग करने के लिए CRM टूल का उपयोग करें।')
      .replaceAll('Lead is an initial potential sales opportunity representing prospective buyer interest.', 'लीड एक प्रारंभिक संभावित बिक्री अवसर है जो संभावित खरीदार की रुचि का प्रतिनिधित्व करता है।')
      .replaceAll('Compliance is the strict adherence of imported goods to all mandatory health, safety, environmental, labeling, and legal standards established by the destination government.', 'कंप्लायंस (Compliance - अनुपालन) गंतव्य सरकार द्वारा स्थापित सभी अनिवार्य स्वास्थ्य, सुरक्षा, पर्यावरण, लेबलिंग और कानूनी मानकों का आयातित सामानों द्वारा सख्त पालन है।')
      .replaceAll('Non-compliant goods are seized, destroyed, or re-exported by customs authorities at the importer\'s severe financial loss.', 'आयातक के भारी वित्तीय नुकसान पर सीमा शुल्क अधिकारियों द्वारा गैर-अनुपालन वाले सामान को जब्त, नष्ट या पुनः निर्यात किया जाता है।')
      .replaceAll('RBC verifies that imported toy shipments have non-toxic paint test reports and mandatory BIS registration marks printed on packaging for Indian market entry.', 'RBC सत्यापित करता है कि आयातित खिलौना शिपमेंट में भारतीय बाजार में प्रवेश के लिए गैर-विषाक्त पेंट टेस्ट रिपोर्ट और पैकेजिंग पर मुद्रित अनिवार्य BIS पंजीकरण चिह्न हैं।')
      .replaceAll('Importing goods without mandatory regional compliance marks (e.g. BIS in India, CE in EU).', 'अनिवार्य क्षेत्रीय अनुपालन चिह्नों (जैसे भारत में BIS, EU में CE) के बिना सामान आयात करना।')
      .replaceAll('Check current customs tariff regulations and mandatory certification rules before placing purchase orders.', 'खरीद आदेश देने से पहले वर्तमान सीमा शुल्क टैरिफ नियमों और अनिवार्य प्रमाणन नियमों की जांच करें।')
      .replaceAll('Compliance is full legal, environmental, and safety adherence to destination country import laws.', 'कंप्लायंस गंतव्य देश के आयात कानूनों का पूर्ण कानूनी, पर्यावरणीय और सुरक्षा अनुपालन है।')
      .replaceAll('Product Testing involves sending product samples to accredited laboratories (such as UL, TÜV, or Intertek) to run rigorous electrical safety, chemical toxicity, waterproof, or drop tests.', 'प्रोडक्ट टेस्टिंग (Product Testing) में कठोर विद्युत सुरक्षा, रासायनिक विषाक्तता, वाटरप्रूफ या ड्रॉप परीक्षण चलाने के लिए मान्यता प्राप्त प्रयोगशालाओं (जैसे UL, TÜV, या Intertek) में उत्पाद के नमूने भेजना शामिल है।')
      .replaceAll('Mandatory for obtaining mandatory import compliance marks like CE, RoHS, FCC, or BIS certificates required by destination port customs.', 'गंतव्य पोर्ट कस्टम्स द्वारा आवश्यक CE, RoHS, FCC, या BIS प्रमाणपत्र जैसे अनिवार्य आयात अनुपालन चिह्नों को प्राप्त करने के लिए अनिवार्य।')
      .replaceAll('RBC sends 3 sample power banks to a TÜV lab for battery thermal testing and short-circuit protection certification before importing.', 'RBC आयात करने से पहले बैटरी थर्मल परीक्षण और शॉर्ट-सर्किट सुरक्षा प्रमाणन के लिए TÜV लैब में 3 सैंपल पावर बैंक भेजता है।')
      .replaceAll('Relying on expired or fake lab test certificates provided by unverified suppliers.', 'सत्यापित न किए गए सप्लायरों द्वारा प्रदान किए गए समाप्त हो चुके या नकली लैब टेस्ट प्रमाणपत्रों पर भरोसा करना।')
      .replaceAll('Verify lab test certificate authenticity directly on testing agency verification portals.', 'परीक्षण एजेंसी सत्यापन पोर्टलों पर सीधे लैब टेस्ट प्रमाणपत्र की प्रामाणिकता की पुष्टि करें।')
      .replaceAll('Product Testing certifies safety, toxicity, and electrical standards in accredited laboratories.', 'प्रोडक्ट टेस्टिंग मान्यता प्राप्त प्रयोगशालाओं में सुरक्षा, विषाक्तता और विद्युत मानकों को प्रमाणित करता है।')
      .replaceAll('Defect Rate is the percentage of failed or non-conforming items identified within an inspected sample lot during quality control testing.', 'डिफेक्ट रेट (Defect Rate) गुणवत्ता नियंत्रण परीक्षण के दौरान निरीक्षण किए गए नमूना लॉट के भीतर पहचाने गए विफल या गैर-अनुरूप वस्तुओं का प्रतिशत है।')
      .replaceAll('A high defect rate signals poor factory workmanship. If defect rate exceeds AQL limit (e.g. 2.5%), the supplier must re-manufacture the batch at their own cost.', 'उच्च डिफेक्ट रेट खराब फैक्ट्री कारीगरी का संकेत देता है। यदि डिफेक्ट रेट AQL सीमा (जैसे 2.5%) से अधिक है, तो सप्लायर को अपनी लागत पर बैच का पुनर्निर्माण करना होगा।')
      .replaceAll('During PSI of 500 LED panels, 15 panels had flickering issues, resulting in a 3.0% Defect Rate. Since 3.0% exceeded the 1.5% contract limit, the supplier replaced all 15 units.', '500 LED पैनलों के PSI के दौरान, 15 पैनलों में टिमटिमाने की समस्या थी, जिसके परिणामस्वरूप 3.0% डिफेक्ट रेट रहा। चूंकि 3.0% अनुबंध सीमा 1.5% से अधिक था, सप्लायर ने सभी 15 इकाइयों को बदल दिया।')
      .replaceAll('Accepting batches with defect rates above agreed contractual AQL limits.', 'सहमत अनुबंधीय AQL सीमाओं से ऊपर डिफेक्ट रेट वाले बैचों को स्वीकार करना।')
      .replaceAll('Include clear penalty clauses requiring factory re-inspection fees if defect rate fails AQL limits.', 'यदि डिफेक्ट रेट AQL सीमाओं में विफल रहता है तो फैक्ट्री पुनः निरीक्षण शुल्क की आवश्यकता वाले स्पष्ट जुर्माना खंड शामिल करें।')
      .replaceAll('Defect Rate measures the percentage of non-conforming units in a batch.', 'डिफेक्ट रेट एक बैच में गैर-अनुरूप इकाइयों के प्रतिशत को मापता है।')
      .replaceAll('Random Inspection is an auditing technique where an inspector randomly selects sample cartons from different pallets in the warehouse using statistical AQL (Acceptable Quality Limit) tables to evaluate overall batch quality.', 'रैंडम इंस्पेक्शन (Random Inspection) एक ऑडिटिंग तकनीक है जहाँ एक निरीक्षक सांख्यिकी AQL (स्वीकार्य गुणवत्ता सीमा) तालिकाओं का उपयोग करके कुल बैच गुणवत्ता का मूल्यांकन करने के लिए गोदाम में विभिन्न पैलेटों से यादृच्छिक रूप से नमूना कार्टन चुनता है।')
      .replaceAll('Prevents suppliers from hiding defective units in middle or bottom boxes, giving a statistically reliable assessment without opening 100% of boxes.', 'सप्लायरों को बीच में या नीचे के बक्सों में दोषपूर्ण इकाइयों को छिपाने से रोकता है, 100% बक्से खोले बिना सांख्यिकीय रूप से विश्वसनीय मूल्यांकन देता है।')
      .replaceAll('From a lot of 10,000 toys, the inspector randomly pulls 200 units from 20 different master cartons according to AQL Level II tables for drop-testing and seam checks.', '10,000 खिलौनों के लॉट में से, निरीक्षक ड्रॉप-टेस्टिंग और सीम जांच के लिए AQL लेवल II तालिकाओं के अनुसार 20 अलग-अलग मास्टर कार्टन से यादृच्छिक रूप से 200 इकाइयाँ निकालता है।')
      .replaceAll('Allowing the factory manager to pick the sample cartons instead of the independent inspector.', 'स्वतंत्र निरीक्षक के बजाय फैक्ट्री प्रबंधक को नमूना कार्टन चुनने की अनुमति देना।')
      .replaceAll('Ensure sampling covers boxes from front, middle, and back of the warehouse pallet stacks.', 'सुनिश्चित करें कि नमूनाकरण गोदाम पैलेट स्टैक के आगे, मध्य और पीछे के बक्सों को कवर करता है।')
      .replaceAll('Random Inspection evaluates batch quality by sampling random boxes using AQL statistical tables.', 'रैंडम इंस्पेक्शन AQL सांख्यिकीय तालिकाओं का उपयोग करके यादृच्छिक बक्सों का नमूना लेकर बैच गुणवत्ता का मूल्यांकन करता है।')
      .replaceAll('Pre-Shipment Inspection (PSI) is a comprehensive physical audit performed by an independent third-party agency (like SGS or Intertek) when production is 100% completed and at least 80% packed into master cartons.', 'प्री-शिपमेंट इंस्पेक्शन (Pre-Shipment Inspection - PSI) एक स्वतंत्र तीसरे पक्ष की एजेंसी (जैसे SGS या Intertek) द्वारा किया जाने वाला एक व्यापक भौतिक ऑडिट है जब उत्पादन 100% पूरा हो जाता है और कम से कम 80% मास्टर कार्टन में पैक हो जाता है।')
      .replaceAll('PSI is the importer\'s final defense line before releasing the 70% balance payment. It verifies box count, carton packaging, labeling, dimensions, and functional performance.', '70% शेष भुगतान जारी करने से पहले PSI आयातक की अंतिम सुरक्षा रेखा है। यह बॉक्स संख्या, कार्टन पैकेजिंग, लेबलिंग, आयामों और कार्यात्मक प्रदर्शन की पुष्टि करता है।')
      .replaceAll('RBC hires SGS to conduct PSI on 2,000 smartwatches packed in Shenzhen. SGS opens 80 random cartons, runs battery tests, and issues a PSI Pass Certificate before RBC wires balance payment.', 'RBC शेनझेन में पैक की गई 2,000 स्मार्टवॉच पर PSI करने के लिए SGS को नियुक्त करता है। SGS 80 यादृच्छिक कार्टन खोलता है, बैटरी परीक्षण चलाता है, और RBC द्वारा शेष भुगतान भेजने से पहले PSI पास प्रमाण पत्र जारी करता है।')
      .replaceAll('Releasing full payment to supplier before receiving official Pre-Shipment Inspection reports.', 'आधिकारिक प्री-शिपमेंट इंस्पेक्शन रिपोर्ट प्राप्त करने से पहले सप्लायर को पूरा भुगतान जारी करना।')
      .replaceAll('Define AQL Level II inspection standards in writing inside your Purchase Order.', 'अपने खरीद आदेश के भीतर लिखित रूप में AQL स्तर II निरीक्षण मानकों को परिभाषित करें।')
      .replaceAll('Pre-Shipment Inspection is a final third-party factory audit verifying goods prior to balance payment and dispatch.', 'प्री-शिपमेंट इंस्पेक्शन शेष भुगतान और प्रस्थान से पहले माल की पुष्टि करने वाला एक अंतिम तीसरे पक्ष का फैक्ट्री ऑडिट है।')
      .replaceAll('Quality Assurance (QA) is the systematic organizational framework of quality management protocols, ISO standards, and factory operating procedures that prevents product defects from occurring in the first place.', 'क्वालिटी एश्योरेंस (Quality Assurance - QA) गुणवत्ता प्रबंधन प्रोटोकॉल, ISO मानकों और फैक्ट्री संचालन प्रक्रियाओं का व्यवस्थित ढांचा है जो उत्पाद दोषों को होने से रोकता है।')
      .replaceAll('QA focuses on process prevention rather than end-product inspection, ensuring consistent high quality across thousands of manufactured units.', 'QA अंतिम-उत्पाद निरीक्षण के बजाय प्रक्रिया रोकथाम पर ध्यान केंद्रित करता है, जिससे हजारों निर्मित इकाइयों में लगातार उच्च गुणवत्ता सुनिश्चित होती है।')
      .replaceAll('The factory implements ISO 9001 QA protocols, auditing raw material suppliers and calibrating machinery weekly before mass production begins.', 'फैक्ट्री बड़े पैमाने पर उत्पादन शुरू होने से पहले कच्चे माल के सप्लायरों का ऑडिट करके और साप्ताहिक रूप से मशीनरी को कैलिब्रेट करके ISO 9001 QA प्रोटोकॉल लागू करती है।')
      .replaceAll('Confusing QA with QC — QA is process prevention, whereas QC is product inspection.', 'QA को QC के साथ भ्रमित करना — QA प्रक्रिया रोकथाम है, जबकि QC उत्पाद निरीक्षण है।')
      .replaceAll('Audit factory ISO certifications and standard operating procedures (SOPs) before placing orders.', 'ऑर्डर देने से पहले फैक्ट्री ISO प्रमाणपत्रों और मानक संचालन प्रक्रियाओं (SOPs) का ऑडिट करें।')
      .replaceAll('Quality Assurance is systematic process management preventing defects prior to manufacturing.', 'क्वालिटी एश्योरेंस निर्माण से पहले दोषों को रोकने वाला व्यवस्थित प्रक्रिया प्रबंधन है।')
      .replaceAll('Quality Control (QC) refers to the operational inspection checks performed on raw materials, components, and assembly lines during production to identify and fix defects.', 'क्वालिटी कंट्रोल (Quality Control - QC) का तात्पर्य उत्पादन के दौरान कच्चे माल, घटकों और असेंबली लाइनों पर किए गए परिचालन निरीक्षण जांच से है ताकि दोषों की पहचान की जा सके।')
      .replaceAll('Catching defects early on the factory floor prevents wasted manufacturing time, costly rework, and shipping defective goods to customers.', 'फैक्ट्री फ्लोर पर ही दोषों को शुरू में पकड़ने से निर्माण समय की बर्बादी, महंगी दोबारा काम करने की लागत और ग्राहकों को खराब सामान भेजने से बचा जा सकता है।')
      .replaceAll('RBC inspectors test electrical circuit boards on the factory assembly line every 2 hours to ensure zero wiring defects.', 'RBC निरीक्षक शून्य वायरिंग दोष सुनिश्चित करने के लिए हर 2 घंटे में फैक्ट्री असेंबली लाइन पर इलेक्ट्रिकल सर्किट बोर्डों का परीक्षण करते हैं।')
      .replaceAll('Skipping line inspections and relying only on final packaging checks.', 'लाइन निरीक्षणों को छोड़ना और केवल अंतिम पैकेजिंग जांच पर भरोसा करना।')
      .replaceAll('Define inline inspection checkpoints at 20%, 50%, and 80% production stages.', '20%, 50% और 80% उत्पादन चरणों पर इनलाइन निरीक्षण चेकपॉइंट परिभाषित करें।')
      .replaceAll('Quality Control is operational inspection during production to detect and correct manufacturing defects.', 'क्वालिटी कंट्रोल निर्माण दोषों का पता लगाने और उन्हें ठीक करने के लिए उत्पादन के दौरान परिचालन निरीक्षण है।')
      .replaceAll('Mundra CFS bills RBC ₹4,200 in CFS Charges for de-stuffing their 4 CBM shared LCL pallet and storing it for 3 days.', 'मुंद्रा CFS RBC को उनके 4 CBM साझा LCL पैलेट को खाली करने और 3 दिनों के लिए स्टोर करने के लिए CFS शुल्कों में ₹4,200 बिल करता है।')
      .replaceAll('Essential for LCL importers to calculate before shipping, as CFS charges include fixed handling minimums regardless of package volume.', 'LCL आयातकों के लिए शिपिंग से पहले गणना करना आवश्यक है, क्योंकि CFS शुल्कों में पैकेज वॉल्यूम की परवाह किए बिना फिक्स्ड न्यूनतम हैंडलिंग शामिल है।')
      .replaceAll('Maersk charges ₹3,500 DO Fee to issue the digital release order for RBC\'s imported machinery container.', 'मर्सक RBC की आयातित मशीनरी कंटेनर के लिए डिजिटल रिलीज ऑर्डर जारी करने के लिए ₹3,500 DO फीस लेता है।')
      .replaceAll('Maersk charges ₹3,500 DO Fee to issue the digital release order for RBC\'s imported machinery container.', 'मर्सक RBC की आयातित मशीनरी कंटेनर के लिए डिजिटल रिलीज ऑर्डर जारी करने के लिए ₹3,500 DO फीस लेता है।')
      .replaceAll('Paid by the importer at destination before port authorities release the container for truck dispatch.', 'पोर्ट अधिकारियों द्वारा ट्रक डिस्पैच के लिए कंटेनर जारी करने से पहले गंतव्य पर आयातक द्वारा भुगतान किया जाता है।')
      .replaceAll('Adani Mundra Port charges ₹9,500 Destination THC to offload RBC\'s 20FT container from ship deck onto port container yard.', 'अडानी मुंद्रा पोर्ट RBC के 20FT कंटेनर को जहाज की डेक से पोर्ट कंटेनर यार्ड में उतारने के लिए ₹9,500 डेस्टिनेशन THC वसूलता है।')
      .replaceAll('Adani Mundra Port charges ₹9,500 Destination THC to offload RBC\'s 20FT container from ship deck onto port container yard.', 'अडानी मुंद्रा पोर्ट RBC के 20FT कंटेनर को जहाज की डेक से पोर्ट कंटेनर यार्ड में उतारने के लिए ₹9,500 डेस्टिनेशन THC वसूलता है।')
      .replaceAll('Payable at both origin port (Origin THC) and destination port (Destination THC). Rates vary by port authority and container size.', 'ओरिजिन पोर्ट (Origin THC) और गंतव्य पोर्ट (Destination THC) दोनों पर देय। बंदरगाह प्राधिकरण और कंटेनर आकार के अनुसार दरें भिन्न होती हैं।')
      .replaceAll('At Mundra Port, RBC pays $280 in Local Charges (THC + DO fee + port gate fee) to clear the incoming 20FT container.', 'मुंद्रा पोर्ट पर, RBC आने वाले 20FT कंटेनर को क्लियर करने के लिए लोकल चार्जेस (THC + DO फीस + पोर्ट गेट फीस) में $280 का भुगतान करता है।')
      .replaceAll('Importers must audit local charges to prevent unexpected destination invoice surcharges and landed cost inflation.', 'आयातकों को अप्रत्याशित गंतव्य इनवॉइस अधिभार और लैंडेड लागत वृद्धि को रोकने के लिए स्थानीय शुल्कों का ऑडिट करना चाहिए।')
      .replaceAll('RBC pays $1,900 base Ocean Freight to COSCO shipping line for carrying a 20FT container from Shanghai to Mundra Port.', 'RBC शंघाई से मुंद्रा पोर्ट तक 20FT कंटेनर ले जाने के लिए COSCO शिपिंग लाइन को $1,900 बेस ओशन फ्रेट का भुगतान करता है।')
      .replaceAll('Forms the largest portion of total shipping costs. Rates fluctuate based on global vessel capacity, fuel prices, and container availability.', 'यह कुल शिपिंग लागत का सबसे बड़ा हिस्सा बनाता है। वैश्विक पोत क्षमता, ईंधन की कीमतों और कंटेनर उपलब्धता के आधार पर दरों में उतार-चढ़ाव होता है।')
      .replaceAll('RBC unloads a container at their warehouse in 2 days and returns the empty box to Mundra yard within 5 days, incurring zero detention fees.', 'RBC 2 दिनों में अपने गोदाम में एक कंटेनर खाली करता है और 5 दिनों के भीतर खाली बॉक्स मुंद्रा यार्ड में लौटाता है, जिससे शून्य डिटेंशन शुल्क लगता है।')
      .replaceAll('Avoidable by returning empty containers back to the carrier container yard promptly after factory unloading.', 'फैक्ट्री अनलोडिंग के तुरंत बाद खाली कंटेनरों को वापस कैरियर कंटेनर यार्ड में लौटाकर इससे बचा जा सकता है।')
      .replaceAll('RBC files advance BOE 2 days prior to vessel arrival, clearing customs in 24 hours and gating out the container on Day 2, avoiding $200/day demurrage.', 'RBC पोत आगमन से 2 दिन पहले एडवांस BOE दाखिल करता है, 24 घंटे में कस्टम्स क्लियर करता है और दिन 2 पर कंटेनर बाहर निकालता है, जिससे $200/दिन डेमरेज बचता है।')
      .replaceAll('Demurrage accumulates rapidly ($100-$250/day). Immediate customs clearance prevents expensive demurrage accumulation.', 'डेमरेज तेजी से जमा होता है ($100-$250/दिन)। तत्काल सीमा शुल्क निकासी महंगे डेमरेज संचय को रोकती है।')
      .replaceAll('Jawaharlal Nehru Port Trust (JNPT) collects port infrastructure charges from shipping lines for vessel docking and container crane operations.', 'जवाहरलाल नेहरू पोर्ट ट्रस्ट (JNPT) पोत डॉकिंग और कंटेनर क्रेन संचालन के लिए शिपिंग लाइनों से पोर्ट इंफ्रास्ट्रक्चर शुल्क एकत्र करता है।')
      .replaceAll('Factored into overall terminal handling tariffs paid by vessel operators and logistics forwarders.', 'पोत ऑपरेटरों और लॉजिस्टिक्स फॉरवर्डर्स द्वारा भुगतान किए गए समग्र टर्मिनल हैंडलिंग टैरिफ में शामिल।')
      .replaceAll('Forwarder bills ₹2,500 Documentation Charge for issuing House Bill of Lading (HBL) and filing import manifest with Indian Customs.', 'फॉरवर्डर हाउस बिल ऑफ लेडिंग (HBL) जारी करने और भारतीय सीमा शुल्क के साथ आयात मैनिफेस्ट दाखिल करने के लिए ₹2,500 डॉक्यूमेंटेशन चार्ज बिल करता है।')
      .replaceAll('Importers should verify documentation charges on freight quotes to ensure transparency and avoid duplicate invoicing.', 'पारदर्शिता सुनिश्चित करने और डुप्लिकेट इनवॉइसिंग से बचने के लिए आयातकों को फ्रेट कोटेशन पर डॉक्यूमेंटेशन शुल्कों की पुष्टि करनी चाहिए।')
      .replaceAll('RBC imports 20 tons of tiles on wooden pallets from China. RBC requires the supplier to furnish an ISPM-15 Fumigation Certificate issued by a licensed quarantine authority before shipping.', 'RBC चीन से लकड़ी के पैलेट पर 20 टन टाइलों का आयात करता है। RBC सप्लायर से शिपिंग से पहले लाइसेंस प्राप्त क्वारंटाइन अथॉरिटी द्वारा जारी ISPM-15 फ्यूमिगेशन सर्टिफिकेट प्रदान करने की मांग करता है।')
      .replaceAll('Required by quarantine authorities in India, USA, Australia, and EU. Unfumigated wood leads to immediate container rejection at destination port or expensive forced quarantine treatment.', 'भारत, अमेरिका और यूरोपीय संघ में संगरोध (Quarantine) अधिकारियों द्वारा आवश्यक। बिना उपचारित लकड़ी के कारण गंतव्य बंदरगाह पर कंटेनर तुरंत अस्वीकार कर दिया जाता है।')
      .replaceAll('RBC hires SGS to perform a pre-shipment inspection of 1,000 laptops at the Shenzhen factory. SGS issues an Inspection Certificate confirming zero defects before RBC wires the 70% balance payment.', 'RBC शेनझेन फैक्ट्री में 1,000 लैपटॉप का प्री-शिपमेंट निरीक्षण करने के लिए SGS को नियुक्त करता है। SGS 70% शेष भुगतान भेजने से पहले शून्य दोषों की पुष्टि करने वाला इंस्पेक्शन सर्टिफिकेट जारी करता है।')
      .replaceAll('Protects buyers from receiving defective goods, short quantities, or wrong specifications before releasing the final balance payment to overseas suppliers.', 'विदेशी सप्लायर को अंतिम भुगतान जारी करने से पहले खरीदारों को खराब माल या गलत विनिर्देश प्राप्त करने से बचाता है।')
      .replaceAll('Emirates SkyCargo issues AWB #176-48201934 for RBC\'s 200kg express electronic shipment from Shanghai Airport to Mumbai Airport.', 'एमिरेट्स स्काईकार्गो शंघाई एयरपोर्ट से मुंबई एयरपोर्ट तक RBC के 200 किग्रा एक्सप्रेस इलेक्ट्रॉनिक शिपमेंट के लिए AWB #176-48201934 जारी करता है।')
      .replaceAll('Emirates SkyCargo issues AWB #176-48201934 for RBC\'s 200kg express electronic shipment from Shanghai Airport to Mumbai Airport.', 'एमिरेट्स स्काईकार्गो शंघाई एयरपोर्ट से मुंबई एयरपोर्ट तक RBC के 200 किग्रा एक्सप्रेस इलेक्ट्रॉनिक शिपमेंट के लिए AWB #176-48201934 जारी करता है।')
      .replaceAll('Contains 11-digit tracking number allowing real-time tracking of air shipments on airline cargo portals and enables fast airport customs clearance.', 'इसमें 11 अंकों का ट्रैकिंग नंबर होता है जो एयरलाइन पोर्टल पर हवाई शिपमेंट की वास्तविक समय में ट्रैकिंग की अनुमति देता है और त्वरित सीमा शुल्क निकासी में सक्षम बनाता है।')
      .replaceAll('RBC pays local terminal handling charges ($250) to Maersk Line India. Maersk issues a digital Delivery Order (DO) enabling RBC\'s transporter to gate-out the container from Mundra Port.', 'RBC मर्सक लाइन इंडिया को स्थानीय टर्मिनल हैंडलिंग शुल्क ($250) का भुगतान करता है। मर्सक एक डिजिटल डिलीवरी ऑर्डर (DO) जारी करता है जिससे RBC का ट्रांसपोर्टर मुंद्रा पोर्ट से कंटेनर निकाल सकता है।')
      .replaceAll('RBC pays local terminal handling charges ($250) to Maersk Line India. Maersk issues a digital Delivery Order (DO) enabling RBC\'s transporter to gate-out the container from Mundra Port.', 'RBC मर्सक लाइन इंडिया को स्थानीय टर्मिनल हैंडलिंग शुल्क ($250) का भुगतान करता है। मर्सक एक डिजिटल डिलीवरी ऑर्डर (DO) जारी करता है जिससे RBC का ट्रांसपोर्टर मुंद्रा पोर्ट से कंटेनर निकाल सकता है।')
      .replaceAll('Without a valid DO, port authorities will NOT allow trucks to pick up the container from the port or ICD yard.', 'वैध DO के बिना, बंदरगाह अधिकारी ट्रकों को बंदरगाह या ICD यार्ड से कंटेनर लेने की अनुमति नहीं देंगे।')
      .replaceAll('Failing to audit charges before approving payments.', 'भुगतान स्वीकृत करने से पहले शुल्कों का ऑडिट न करना।')
      .replaceAll('Request itemized rate cards from forwarders.', 'फॉरवर्डर्स से आइटम-वार दर कार्ड का अनुरोध करें।')
      .replaceAll('Failing to verify documentation details before vessel dispatch.', 'पोत प्रस्थान से पहले दस्तावेजों के विवरण की पुष्टि न करना।')
      .replaceAll('Consult your customs broker (CHA) before finalizing purchase contracts.', 'खरीद अनुबंधों को अंतिम रूप देने से पहले अपने कस्टम्स ब्रोकर (CHA) से सलाह लें।')
      .replaceAll('Failing to audit charges before approving payments.', 'भुगतान स्वीकृत करने से पहले शुल्कों का ऑडिट करने में विफल रहना।')
      .replaceAll('Audit all charges for CFS Charges.', 'CFS शुल्कों के लिए सभी शुल्कों का ऑडिट करें।')
      .replaceAll('Audit all charges for DO Charges.', 'DO शुल्कों के लिए सभी शुल्कों का ऑडिट करें।')
      .replaceAll('Audit all charges for THC.', 'THC के लिए सभी शुल्कों का ऑडिट करें।')
      .replaceAll('Audit all charges for Local Charges.', 'लोकल चार्जेस के लिए सभी शुल्कों का ऑडिट करें।')
      .replaceAll('Audit all charges for Ocean Freight.', 'ओशन फ्रेट के लिए सभी शुल्कों का ऑडिट करें।')
      .replaceAll('Documentation Charges are administrative processing fees billed by freight forwarders or shipping lines for creating B/L, HBL, manifest filings, and EDI entries.', 'डॉक्यूमेंटेशन चार्जेस (Documentation Charges) B/L, HBL, मैनिफेस्ट फाइलिंग और EDI प्रविष्टियां बनाने के लिए फ्रेट फॉरवर्डर्स या शिपिंग लाइनों द्वारा बिल किए गए प्रशासनिक प्रसंस्करण शुल्क हैं।')
      .replaceAll('Port Charges are statutory pilotage, berth hire, anchorage, and port entry fees levied by port trusts on vessels and cargo handling.', 'पोर्ट चार्जेस (Port Charges) जहाजों और कार्गो हैंडलिंग पर पोर्ट ट्रस्टों द्वारा लगाए गए वैधानिक पाइलोटेज, बर्थ किराया, लंगर और पोर्ट प्रवेश शुल्क हैं।')
      .replaceAll('Demurrage is a daily penalty fee charged by ports or shipping lines when a loaded container stays inside the port terminal beyond free storage days (usually 3-5 days).', 'डेमरेज (Demurrage) बंदरगाहों या शिपिंग लाइनों द्वारा लिया जाने वाला एक दैनिक जुर्माना शुल्क है जब एक भरा हुआ कंटेनर मुफ़्त भंडारण दिनों (आमतौर पर 3-5 दिन) से अधिक समय तक पोर्ट टर्मिनल के अंदर रहता है।')
      .replaceAll('Detention is a penalty fee charged by shipping lines when an importer holds an empty container outside the port beyond agreed free days (usually 7-14 days).', 'डिटेंशन (Detention) शिपिंग लाइनों द्वारा लिया जाने वाला जुर्माना शुल्क है जब कोई आयातक सहमत मुफ़्त दिनों (आमतौर पर 7-14 दिन) से अधिक समय तक पोर्ट के बाहर खाली कंटेनर रखता है।')
      .replaceAll('DO Charges are administrative fees billed by shipping lines or forwarders for issuing the electronic Delivery Order (DO) authorizing cargo release.', 'DO चार्जेस (Delivery Order Charges) कार्गो रिलीज को अधिकृत करने वाले इलेक्ट्रॉनिक डिलीवरी ऑर्डर (DO) को जारी करने के लिए शिपिंग लाइनों या फॉरवर्डर्स द्वारा बिल किए गए प्रशासनिक शुल्क हैं।')
      .replaceAll('CFS Charges are handling, de-stuffing, sorting, and ground storage fees billed by Container Freight Stations for processing LCL cargo shipments.', 'CFS चार्जेस (CFS Charges) LCL कार्गो शिपमेंट को प्रोसेस करने के लिए कंटेनर फ्रेट स्टेशनों द्वारा बिल किए जाने वाले हैंडलिंग, डी-स्टफिंग, सॉर्टिंग और ग्राउंड स्टोरेज शुल्क हैं।')
      .replaceAll('Terminal Handling Charge (THC) is the port fee charged by terminal operators for using port cranes and equipment to load or unload containers between vessel and port yard.', 'टर्मिनल हैंडलिंग चार्ज (THC) जहाज और पोर्ट यार्ड के बीच कंटेनरों को लोड या अनलोड करने के लिए पोर्ट क्रेन और उपकरणों का उपयोग करने के लिए टर्मिनल ऑपरेटरों द्वारा लिया जाने वाला पोर्ट शुल्क है।')
      .replaceAll('Local Charges are origin and destination port handling fees charged by forwarders and port terminals (such as THC, documentation, and gate fees) outside of main ocean freight.', 'लोकल चार्जेस (Local Charges) मुख्य समुद्री फ्रेट के बाहर फॉरवर्डर्स और पोर्ट टर्मिनलों द्वारा लिए जाने वाले ओरिजिन और गंतव्य पोर्ट हैंडलिंग शुल्क (जैसे THC, डॉक्यूमेंटेशन) हैं।')
      .replaceAll('Ocean Freight is the main ocean transport fee charged by shipping lines to transport containerized or bulk cargo across international sea routes.', 'ओशन फ्रेट (Ocean Freight) अंतरराष्ट्रीय समुद्री मार्गों पर कंटेनरीकृत या थोक कार्गो ले जाने के लिए शिपिंग लाइनों द्वारा लिया जाने वाला मुख्य समुद्री परिवहन शुल्क है।')
      .replaceAll('HSN Code (Harmonized System of Nomenclature) is an international 6-to-8 digit standardized numerical code used worldwide to classify traded commodities for customs duty calculation.', 'HSN कोड (Harmonized System of Nomenclature) सीमा शुल्क ड्यूटी गणना के लिए कारोबार की जाने वाली वस्तुओं को वर्गीकृत करने के लिए दुनिया भर में उपयोग किया जाने वाला एक अंतरराष्ट्रीय 6-से-8 अंकीय मानकीकृत संख्यात्मक कोड है।')
      .replaceAll('CHA (Customs House Agent) or Customs Broker is a licensed professional authorized by Customs to handle import/export documentation, tariff classification, and cargo clearance for trade clients.', 'CHA (Customs House Agent - कस्टम हाउस एजेंट) सीमा शुल्क द्वारा अधिकृत एक लाइसेंस प्राप्त पेशेवर है जो व्यापारिक ग्राहकों के लिए आयात/निर्यात दस्तावेज़ीकरण, शुल्क वर्गीकरण और कार्गो निकासी को संभालता है।')
      .replaceAll('Customs Clearance is the official administrative procedure of obtaining permission from customs authorities to import or export cargo across international borders.', 'कस्टम्स क्लीयरेंस (Customs Clearance) अंतरराष्ट्रीय सीमाओं के पार कार्गो आयात या निर्यात करने के लिए सीमा शुल्क अधिकारियों से अनुमति प्राप्त करने की आधिकारिक प्रशासनिक प्रक्रिया है।')
      .replaceAll('Customs is the government border authority enforcing import/export trade laws, inspecting international shipments, and collecting customs duties and taxes.', 'कस्टम्स (Customs - सीमा शुल्क) सरकारी सीमा प्राधिकरण है जो आयात/निर्यात व्यापार कानूनों को लागू करता है, अंतरराष्ट्रीय शिपमेंट का निरीक्षण करता है, और सीमा शुल्क और कर एकत्र करता है।')
      .replaceAll('Insurance Certificate is an official policy document issued by a marine insurance underwriter confirming that cargo is insured against loss, damage, theft, or vessel sinking during transit.', 'इंश्योरेंस सर्टिफिकेट (Insurance Certificate) एक समुद्री बीमा अंडरराइटर द्वारा जारी किया गया नीति दस्तावेज है जो यह पुष्टि करता है कि पारगमन के दौरान कार्गो नुकसान, क्षति, चोरी या जहाज डूबने के खिलाफ बीमित है।')
      .replaceAll('Certificate of Origin (COO) is an official document issued by a Chamber of Commerce or government authority certifying the country where the imported product was manufactured.', 'सर्टिफिकेट ऑफ ओरिजिन (Certificate of Origin - COO) चैंबर ऑफ कॉमर्स या सरकारी प्राधिकरण द्वारा जारी एक आधिकारिक दस्तावेज है जो उस देश को प्रमाणित करता है जहां आयातित उत्पाद का निर्माण किया गया था।')
      .replaceAll('Bill of Entry (BOE) is a statutory import declaration document filed by an importer/CHA with Customs (via ICEGATE) detailing imported cargo value, HSN codes, and duty calculations for clearance.', 'बिल ऑफ एंट्री (Bill of Entry - BOE) आयातक/CHA द्वारा सीमा शुल्क के साथ दायर किया गया एक वैधानिक आयात घोषणा दस्तावेज है जिसमें आयातित कार्गो मूल्य, HSN कोड और निकासी के लिए शुल्क गणना का विवरण होता है।')
      .replaceAll('Shipping Bill is an official export declaration document filed electronically by the exporter with Customs (via ICEGATE) to obtain "Let Export Order" (LEO) permission to ship goods out of India.', 'शिपिंग बिल (Shipping Bill) निर्यातक द्वारा सीमा शुल्क (ICEGATE के माध्यम से) के साथ इलेक्ट्रॉनिक रूप से दायर किया गया एक आधिकारिक निर्यात घोषणा दस्तावेज है ताकि भारत से बाहर माल भेजने के लिए "लेट एक्सपोर्ट ऑर्डर" (LEO) अनुमति प्राप्त की जा सके।')
      .replaceAll('Delivery Order (DO) is a release document issued by the shipping line or freight forwarder to the port terminal/CFS authorizing the surrender of cargo to the importer after freight and local charges are settled.', 'डिलीवरी ऑर्डर (Delivery Order - DO) शिपिंग लाइन द्वारा पोर्ट टर्मिनल/CFS को जारी किया गया रिलीज दस्तावेज है जो भाड़ा और स्थानीय शुल्क तय होने के बाद आयातक को कार्गो सौंपने का अधिकार देता है।')
      .replaceAll('Air Way Bill (AWB) is the official non-negotiable transport document issued by an airline for cargo transported by air, serving as a carriage contract and receipt of goods.', 'एयर वे बिल (Air Way Bill - AWB) हवाई मार्ग से ले जाए जाने वाले कार्गो के लिए एयरलाइन द्वारा जारी गैर-परक्राम्य परिवहन दस्तावेज है, जो परिवहन अनुबंध और सामान की रसीद के रूप में कार्य करता है।')
      .replaceAll('Inspection Certificate is a quality, quantity, and technical compliance audit report issued by an independent inspection agency (such as SGS, Intertek, or TÜV) after physically auditing finished goods at the factory.', 'इंस्पेक्शन सर्टिफिकेट (Inspection Certificate) एक स्वतंत्र निरीक्षण एजेंसी (जैसे SGS, Intertek, या TÜV) द्वारा फैक्ट्री में तैयार माल का ऑडिट करने के बाद जारी की गई गुणवत्ता और मात्रा ऑडिट रिपोर्ट है।')
      .replaceAll('Fumigation Certificate is an official pest control document certifying that wooden packaging materials (pallets, crates) have been chemically treated (ISPM-15) to kill timber pests before shipment.', 'फ्यूमिगेशन सर्टिफिकेट (Fumigation Certificate) एक आधिकारिक कीट नियंत्रण दस्तावेज है जो यह प्रमाणित करता है कि लकड़ी की पैकेजिंग सामग्री (पैलेट, क्रेट) को शिपमेंट से पहले लकड़ी के कीटों को मारने के लिए रासायनिक रूप से उपचारित (ISPM-15) किया गया है।')
      .replaceAll('POL stands for Port of Loading — the designated seaport in the exporting country where container cargo is loaded onto the vessel.', 'POL का मतलब Port of Loading (लोडिंग पोर्ट) है — निर्यातक देश का वह निर्दिष्ट समुद्री बंदरगाह जहां कंटेनर कार्गो को जहाज पर लादा जाता है।')
      .replaceAll('POD stands for Port of Discharge — the destination seaport in the importing country where the container is unloaded from the vessel.', 'POD का मतलब Port of Discharge (डिस्चार्ज पोर्ट) है — आयातक देश का वह गंतव्य समुद्री बंदरगाह जहां जहाज से कंटेनर को उतारा जाता है।')
      .replaceAll('ICD stands for Inland Container Depot (Dry Port) — an inland customs-bonded container handling facility located away from ocean ports.', 'ICD का मतलब Inland Container Depot (ड्राई पोर्ट / इनलैंड डिपो) है — समुद्र तट से दूर स्थित एक अंतर्देशीय सीमा शुल्क कंटेनर सुविधा।')
      .replaceAll('CFS stands for Container Freight Station — a customs-bonded warehouse at port or ICD where LCL cargo is consolidated or de-consolidated.', 'CFS का मतलब Container Freight Station है — बंदरगाह या ICD पर एक सीमा शुल्क-बंधुआ गोदाम जहां LCL कार्गो को समेकित या अलग (sort) किया जाता है।')
      .replaceAll('Proforma Invoice (PI) is a preliminary billing document sent by the seller before order confirmation, detailing product specs, prices, terms, and bank details.', 'प्रोफॉर्मर्मा इनवॉइस (Proforma Invoice - PI) ऑर्डर की पुष्टि से पहले विक्रेता द्वारा भेजा गया एक प्रारंभिक बिलिंग दस्तावेज है, जिसमें उत्पाद विनिर्देश, मूल्य और बैंक विवरण शामिल होते हैं।')
      .replaceAll('Commercial Invoice (CI) is the legal billing document issued by seller upon dispatch, serving as the official record of sale and primary basis for customs valuation.', 'कमर्शियल इनवॉइस (Commercial Invoice - CI) प्रस्थान पर विक्रेता द्वारा जारी किया गया कानूनी बिलिंग दस्तावेज है, जो सीमा शुल्क मूल्यांकन के लिए प्राथमिक आधार के रूप में कार्य करता है।')
      .replaceAll('Packing List (PL) is a detailed transport document created by the exporter specifying box count, dimensions, gross weight, net weight, and exact contents of every master carton.', 'पैकिंग लिस्ट (Packing List - PL) निर्यातक द्वारा बनाया गया एक विस्तृत परिवहन दस्तावेज है जो बॉक्स की संख्या, आयाम, ग्रॉस वेट, नेट वेट और प्रत्येक मास्टर कार्टन की सामग्री निर्दिष्ट करता है।')
      .replaceAll('Bill of Lading (B/L) is the official ocean transport document issued by shipping line serving as a cargo receipt, contract of carriage, and legal document of title (ownership).', 'बिल ऑफ लेडिंग (Bill of Lading - B/L) शिपिंग लाइन द्वारा जारी आधिकारिक समुद्री परिवहन दस्तावेज है जो कार्गो रसीद, परिवहन के अनुबंध और स्वामित्व के कानूनी दस्तावेज के रूप में कार्य करता है।')
      .replaceAll('Freight is the transportation charge paid to a shipping line, airline, or logistics carrier for moving cargo from origin to destination.', 'फ्रेट (Freight) origin से destination तक कार्गो ले जाने के लिए शिपिंग लाइन, एयरलाइन या लॉजिस्टिक्स कैरियर को दिया जाने वाला माल ढुलाई शुल्क (भाड़ा) है।')
      .replaceAll('Sea Freight is the transportation of goods in shipping containers or bulk vessels across ocean routes between international seaports.', 'सी फ्रेट (Sea Freight) अंतरराष्ट्रीय समुद्री बंदरगाहों के बीच समुद्री मार्गों पर शिपिंग कंटेनरों या बल्क जहाजों में माल का परिवहन है।')
      .replaceAll('Air Freight is the rapid transport of cargo via dedicated freighter aircraft or passenger plane belly holds.', 'एयर फ्रेट (Air Freight) समर्पित मालवाहक विमानों या यात्री विमानों के कार्गो होल्ड के माध्यम से माल का तीव्र परिवहन है।')
      .replaceAll('Courier Shipment is rapid door-to-door express parcel delivery managed by global integrators like DHL, FedEx, and UPS.', 'कूरियर शिपमेंट (Courier Shipment) DHL, FedEx, UPS जैसे एक्सप्रेस इंटीग्रेटर्स द्वारा प्रबंधित त्वरित डोर-टू-डोर छोटी पार्सल डिलीवरी है।')
      .replaceAll('Transit Time is the total elapsed time in days required for cargo to travel from port of origin (POL) to port of destination (POD).', 'ट्रांजिट टाइम (Transit Time) ओरिजिन पोर्ट (POL) से गंतव्य पोर्ट (POD) तक कार्गो की यात्रा में लगने वाला कुल दिनों का समय है।')
      .replaceAll('ETD (Estimated Time of Departure) is the scheduled date and time when a shipping vessel or cargo plane departs from origin port.', 'ETD (Estimated Time of Departure) निर्धारित तिथि और समय है जब शिपिंग पोत या कार्गो विमान मूल बंदरगाह से प्रस्थान करता है।')
      .replaceAll('ETA (Estimated Time of Arrival) is the anticipated date and time when vessel or aircraft arrives at destination port.', 'ETA (Estimated Time of Arrival) वह सम्भावित तिथि और समय है जब पोत या विमान गंतव्य बंदरगाह पर पहुंचता है।')
      .replaceAll('Vessel is a commercial ocean-going cargo ship (container carrier, bulk vessel, tanker) used to transport goods internationally.', 'वेसल (Vessel) एक व्यावसायिक समुद्री मालवाहक जहाज (कंटेनर कैरियर, बल्क पोत) है जिसका उपयोग अंतरराष्ट्रीय स्तर पर माल परिवहन के लिए किया जाता है।')
      .replaceAll('Voyage is the unique alphanumeric identification code assigned to a specific ocean journey of a cargo vessel.', 'वॉयेज (Voyage) कार्गो पोत की एक विशिष्ट समुद्री यात्रा को सौंपा गया अद्वितीय कोड है।')
      .replaceAll('Mother Vessel is a large mainline ocean container ship operating on major intercontinental routes between global hub ports.', 'मदर वेसल (Mother Vessel) एक बड़ा मुख्य समुद्री कंटेनर जहाज है जो वैश्विक हब बंदरगाहों के बीच प्रमुख अंतरमहाद्वीपीय मार्गों पर चलता है।')
      .replaceAll('Feeder Vessel is a smaller regional cargo ship carrying containers between regional ports and major ocean hub ports.', 'फीडर वेसल (Feeder Vessel) एक छोटा क्षेत्रीय कार्गो जहाज है जो छोटे क्षेत्रीय बंदरगाहों और प्रमुख समुद्री हब बंदरगाहों के बीच कंटेनर ले जाता है।')
      .replaceAll('EXW (Ex Works) means seller makes goods available at factory floor. Buyer assumes 100% transport cost, risk, and customs clearance.', 'EXW (Ex Works) का मतलब है कि सप्लायर केवल अपनी फैक्ट्री में माल तैयार रखता है। खरीदार 100% परिवहन लागत, जोखिम और कस्टम्स क्लीयरेंस वहन करता है।')
      .replaceAll('FOB (Free On Board) means seller delivers goods onto ship at origin port and pays export customs. Buyer pays ocean freight and import costs.', 'FOB (Free On Board) का मतलब है कि सप्लायर मूल बंदरगाह पर जहाज पर माल लोड करता है और निर्यात कस्टम्स का भुगतान करता है। खरीदार ओशन फ्रेट और आयात लागत का भुगतान करता है।')
      .replaceAll('FCA (Free Carrier) means seller delivers goods to buyer\'s named carrier warehouse at origin port or inland depot.', 'FCA (Free Carrier) का मतलब है कि विक्रेता मूल बंदरगाह या अंतर्देशीय डिपो में खरीदार के नामित वाहक गोदाम में माल पहुँचाता है।')
      .replaceAll('CIF (Cost, Insurance, Freight) means seller pays ocean freight and marine insurance to destination port. Buyer pays import customs duty & port unloading.', 'CIF (Cost, Insurance, Freight) का मतलब है कि सप्लायर गंतव्य बंदरगाह तक समुद्री भाड़ा और समुद्री बीमा का भुगतान करता है। खरीदार आयात शुल्क और पोर्ट अनलोडिंग का भुगतान करता है।')
      .replaceAll('CFR (Cost and Freight) means seller pays ocean freight to destination port, but buyer purchases marine cargo insurance.', 'CFR (Cost and Freight) का मतलब है कि सप्लायर गंतव्य बंदरगाह तक समुद्री भाड़ा देता है, लेकिन खरीदार समुद्री कार्गो बीमा खरीदता है।')
      .replaceAll('DDP (Delivered Duty Paid) means seller handles entire logistics including ocean freight, customs duty, taxes, and final door delivery. Maximum seller risk.', 'DDP (Delivered Duty Paid) का मतलब है कि सप्लायर ओशन फ्रेट, कस्टम्स ड्यूटी, टैक्स और अंतिम डोर डिलीवरी सहित पूरे लॉजिस्टिक्स को संभालता है। सप्लायर पर अधिकतम जोखिम होता है।')
      .replaceAll('DAP (Delivered At Place) means seller delivers cargo to buyer door, but buyer pays import customs duties and taxes.', 'DAP (Delivered At Place) का मतलब है कि सप्लायर खरीदार के दरवाजे तक कार्गो पहुँचाता है, लेकिन खरीदार आयात कस्टम्स ड्यूटी और टैक्स का भुगतान करता है।')
      .replaceAll('CIP (Carriage and Insurance Paid to) is multimodal Incoterm where seller pays carriage + all-risk insurance to destination place.', 'CIP (Carriage and Insurance Paid to) मल्टीमॉडल इंकोटर्म है जहाँ सप्लायर गंतव्य स्थान तक भाड़ा + ऑल-रिस्क बीमा का भुगतान करता है।')
      .replaceAll('CPT (Carriage Paid To) is multimodal Incoterm where seller pays main freight carriage to named destination place.', 'CPT (Carriage Paid To) मल्टीमॉडल इंकोटर्म है जहाँ सप्लायर नामित गंतव्य स्थान तक मुख्य भाड़ा का भुगतान करता है।')
      .replaceAll('Warehouse is a commercial facility designed for storage of raw materials, inventory management, order picking, and distribution.', 'वेयरहाउस (Warehouse - गोदाम) कच्चे माल के भंडारण, इन्वेंट्री प्रबंधन, ऑर्डर पिकिंग और वितरण के लिए डिज़ाइन की गई एक व्यावसायिक सुविधा है।')
      .replaceAll('Bonded Warehouse is a customs-controlled storage building where imported goods can be stored duty-free until cleared for domestic sale.', 'बॉन्डेड वेयरहाउस (Bonded Warehouse) सीमा शुल्क-नियंत्रित भंडारण भवन है जहाँ आयातित सामान को घरेलू बिक्री के लिए मंजूरी मिलने तक बिना ड्यूटी दिए संग्रहित किया जा सकता है।')
      .replaceAll('Last Mile Delivery is the final transportation leg moving cleared cargo from regional warehouse to final customer door.', 'लास्ट माइल डिलीवरी (Last Mile Delivery) क्षेत्रीय गोदाम से अंतिम ग्राहक के दरवाजे तक स्वीकृत कार्गो को ले जाने वाला अंतिम परिवहन चरण है।')
      .replaceAll('Door Delivery is an end-to-end shipping service where logistics provider handles pickup at factory door and delivery to importer door.', 'डोर डिलीवरी (Door Delivery) एक एंड-टू-एंड शिपिंग सेवा है जहाँ लॉजिस्टिक्स प्रदाता सप्लायर फैक्ट्री के दरवाजे से पिकअप और आयातक के दरवाजे तक डिलीवरी संभालता है।')
      // POL vs POD specific replacements
      .replaceAll('POL refers to Port of Loading — the designated seaport in the exporting country where container cargo is loaded onto the vessel.',
        'POL का मतलब Port of Loading (लोडिंग पोर्ट) है — निर्यातक देश का वह निर्दिष्ट समुद्री बंदरगाह जहां कंटेनर कार्गो को जहाज पर लादा जाता है।')
      .replaceAll('POD refers to Port of Discharge — the destination seaport in the importing country where the container is unloaded from the vessel.',
        'POD का मतलब Port of Discharge (डिस्चार्ज पोर्ट) है — आयातक देश का वह गंतव्य समुद्री बंदरगाह जहां जहाज से कंटेनर को उतारा जाता है।')
      .replaceAll('ICD refers to Inland Container Depot (Dry Port) — an inland customs-bonded container handling facility located away from ocean ports.',
        'ICD का मतलब Inland Container Depot (ड्राई पोर्ट / इनलैंड डिपो) है — समुद्र तट से दूर स्थित एक अंतर्देशीय सीमा शुल्क कंटेनर सुविधा।')
      .replaceAll('CFS refers to Container Freight Station — a customs-bonded warehouse at port or ICD where LCL cargo is consolidated or de-consolidated.',
        'CFS का मतलब Container Freight Station है — बंदरगाह या ICD पर एक सीमा शुल्क-बंधुआ गोदाम जहां LCL कार्गो को समेकित या अलग (sort) किया जाता है।')
      .replaceAll('Proforma Invoice refers to a preliminary billing document sent by the seller before order confirmation, detailing product specs, prices, terms, and bank details.',
        'प्रोफॉर्मर्मा इनवॉइस (Proforma Invoice - PI) ऑर्डर की पुष्टि से पहले विक्रेता द्वारा भेजा गया एक प्रारंभिक बिलिंग दस्तावेज है, जिसमें उत्पाद विनिर्देश, मूल्य और बैंक विवरण शामिल होते हैं।')
      .replaceAll('Commercial Invoice refers to the legal billing document issued by seller upon dispatch, serving as the official record of sale and primary basis for customs valuation.',
        'कमर्शियल इनवॉइस (Commercial Invoice - CI) प्रस्थान पर विक्रेता द्वारा जारी किया गया कानूनी बिलिंग दस्तावेज है, जो सीमा शुल्क मूल्यांकन के लिए प्राथमिक आधार के रूप में कार्य करता है।')
      .replaceAll('Packing List refers to a detailed transport document created by the exporter specifying box count, dimensions, gross weight, net weight, and exact contents of every master carton.',
        'पैकिंग लिस्ट (Packing List - PL) निर्यातक द्वारा बनाया गया एक विस्तृत परिवहन दस्तावेज है जो बॉक्स की संख्या, आयाम, ग्रॉस वेट, नेट वेट और प्रत्येक मास्टर कार्टन की सामग्री निर्दिष्ट करता है।')
      .replaceAll('Bill of Lading refers to the official ocean transport document issued by shipping line serving as a cargo receipt, contract of carriage, and legal document of title (ownership).',
        'बिल ऑफ लेडिंग (Bill of Lading - B/L) शिपिंग लाइन द्वारा जारी आधिकारिक समुद्री परिवहन दस्तावेज है जो कार्गो रसीद, परिवहन के अनुबंध और स्वामित्व के कानूनी दस्तावेज के रूप में कार्य करता है।')

      .replaceAll('For RBC\'s import from China to India, Ningbo Port is POL (Port of Loading). Supplier delivers packed container to Ningbo POL terminal.',
        'चीन से भारत में RBC के आयात के लिए, निंगबो पोर्ट POL (लोडिंग पोर्ट) है। सप्लायर निंगबो POL टर्मिनल पर पैक किया गया कंटेनर पहुंचाता है।')
      .replaceAll('For RBC\'s shipment from Ningbo to Mundra, Mundra Port is POD (Port of Discharge). RBC files customs Bill of Entry at Mundra POD.',
        'निंगबो से मुंद्रा तक RBC के शिपमेंट के लिए, मुंद्रा पोर्ट POD (डिस्चार्ज पोर्ट) है। RBC मुंद्रा POD पर कस्टम्स बिल ऑफ एंट्री दाखिल करता है।')
      .replaceAll('RBC ships container by rail from Mundra seaport directly to ICD Ahmedabad (Dry Port) to clear customs 15 minutes away from their warehouse.',
        'RBC मुंद्रा पोर्ट से सीधे रेल द्वारा अपने गोदाम से 15 मिनट दूर ICD अहमदाबाद (ड्राई पोर्ट) में कंटेनर भेजता है और स्थानीय स्तर पर कस्टम्स क्लियर करता है।')
      .replaceAll('RBC\'s shared LCL container arrives at Mundra CFS. Workers de-stuff container and separate RBC\'s 10 master cartons for customs audit.',
        'RBC का साझा LCL कंटेनर मुंद्रा CFS पर आता है। श्रमिक कंटेनर को खाली करते हैं और कस्टम्स ऑडिट के लिए RBC के 10 मास्टर कार्टन को अलग करते हैं।')

      .replaceAll('Verify origin POL terminal cutoff dates (CY Cutoff) to ensure container is gated in before ship departs.',
        'यह सुनिश्चित करने के लिए कि जहाज प्रस्थान से पहले कंटेनर गेट-इन हो जाए, ओरिजिन POL टर्मिनल कटऑफ तिथियों (CY Cutoff) की पुष्टि करें।')
      .replaceAll('File advance Bill of Entry 2 days before vessel ETA at POD to clear customs immediately upon discharge.',
        'डिस्चार्ज के तुरंत बाद कस्टम्स क्लियर करने के लिए POD पर जहाज आने से 2 दिन पहले एडवांस बिल ऑफ एंट्री फाइल करें।')
      .replaceAll('Specify your local ICD code as final destination on Bill of Lading (e.g., Destination: ICD Ahmedabad - SBIAD).',
        'बिल ऑफ लैडिंग पर अंतिम गंतव्य के रूप में अपने स्थानीय ICD कोड (जैसे ICD अहमदाबाद) को निर्दिष्ट करें।')
      .replaceAll('Verify CFS handling charges and free storage days (usually 5 days) before container arrival at CFS.',
        'CFS पर कंटेनर आने से पहले CFS हैंडलिंग चार्ज और फ्री स्टोरेज दिनों (आमतौर पर 5 दिन) की पुष्टि करें।')

      .replaceAll('Confusing Port of Loading (POL) with Port of Discharge (POD) on transport documentation.',
        'परिवहन दस्तावेजों पर लोडिंग पोर्ट (POL) को डिस्चार्ज पोर्ट (POD) के साथ भ्रमित करना।')
      .replaceAll('Failing to track vessel ETA at POD, causing container to sit at port and incur expensive demurrage charges.',
        'POD पर जहाज के आने के समय (ETA) को ट्रैक न करना, जिससे कंटेनर बंदरगाह पर रुकता है और महंगा डेमरेज चार्ज लगता है।')
      .replaceAll('Clearing customs at seaport when an inland ICD is available near your city, increasing double handling truck costs.',
        'अपने शहर के पास ICD उपलब्ध होने पर समुद्री बंदरगाह पर कस्टम्स क्लियर करना, जिससे ट्रकिंग लागत बढ़ जाती है।')
      .replaceAll('Leaving LCL goods at CFS beyond free storage period, incurring heavy daily storage rent.',
        'मुफ्त भंडारण अवधि के बाद CFS में LCL सामान छोड़ना, जिससे भारी दैनिक भंडारण किराया लगता है।')
      // Specific Gross Weight / Net Weight / Volume Weight definitions
      .replaceAll('Gross Weight is the total weight of a shipment including the actual product, inner packaging, protective foam, export master cartons, and pallets. Formula: Gross Weight = Net Weight + Packaging Weight + Pallet Weight.',
        'ग्रॉस वेट (Gross Weight) शिपमेंट का कुल वजन है जिसमें वास्तविक उत्पाद, आंतरिक पैकेजिंग, सुरक्षात्मक फोम, निर्यात मास्टर कार्टन और पैलेट शामिल हैं। फॉर्मूला: Gross Weight = Net Weight + Packaging Weight + Pallet Weight।')
      .replaceAll('Gross Weight determines ocean freight charges, air cargo billing, container payload safety limits, and road weight laws. Falsifying Gross Weight leads to port detention, vessel instability risks, and heavy customs fines.',
        'Gross Weight समुद्री भाड़ा शुल्क, हवाई कार्गो बिलिंग, कंटेनर पेलोड सुरक्षा सीमाओं और सड़क वजन कानूनों को निर्धारित करता है। गलत Gross Weight घोषित करने से बंदरगाह पर जब्ती और भारी जुर्माना लगता है।')
      .replaceAll('Gross Weight is the complete weight of cargo including all protective packaging materials and pallets. It is used by shipping lines for weight verification (VGM - Verified Gross Mass) under SOLAS regulations.',
        'Gross Weight सभी सुरक्षात्मक पैकेजिंग सामग्री और पैलेट सहित कार्गो का पूर्ण वजन है। SOLAS नियमों के तहत वजन सत्यापन (VGM - Verified Gross Mass) के लिए शिपिंग लाइनों द्वारा इसका उपयोग किया जाता है।')
      
      .replaceAll('Net Weight is the actual weight of the product/goods alone, excluding all inner boxes, protective bubble wrap, master cartons, and pallets. Formula: Net Weight = Gross Weight - Packaging Weight.',
        'नेट वेट (Net Weight) सभी आंतरिक बक्सों, सुरक्षात्मक बबल रैप, मास्टर कार्टन और पैलेट को छोड़कर केवल उत्पाद/माल का वास्तविक शुद्ध वजन है। फॉर्मूला: Net Weight = Gross Weight - Packaging Weight।')
      .replaceAll('Net Weight is used by customs authorities to calculate weight-based import duties for commodities (e.g., metals, food, chemicals) and by buyers to verify exact product yield received.',
        'Net Weight का उपयोग सीमा शुल्क अधिकारियों द्वारा वस्तुओं (जैसे धातु, भोजन, रसायन) के लिए वजन आधारित आयात शुल्क की गणना करने के लिए और खरीदारों द्वारा प्राप्त उत्पाद की सटीक मात्रा की पुष्टि करने के लिए किया जाता है।')
      .replaceAll('Net Weight is the net mass of the product without any packaging. It represents the actual product quantity purchased and is declared on Commercial Invoices and Bills of Entry.',
        'Net Weight बिना किसी पैकेजिंग के उत्पाद का शुद्ध द्रव्यमान है। यह खरीदी गई वास्तविक उत्पाद मात्रा का प्रतिनिधित्व करता है और व्यावसायिक चालान (Commercial Invoices) और बिल ऑफ एंट्री (Bills of Entry) पर घोषित किया जाता है।')

      .replaceAll('Volume Weight (Dimensional Weight / Volumetric Weight) is a pricing formula used by airlines and courier companies (DHL, FedEx) to charge freight for bulky but lightweight cargo. Formula: Volume Weight (kg) = (Length × Width × Height in cm) ÷ 6,000 (or ÷ 5,000 for express courier).',
        'वॉल्यूम वेट (Volume Weight / Volumetric Weight) एयरलाइंस और कूरियर कंपनियों (DHL, FedEx) द्वारा भारी लेकिन कम वजन वाले कार्गो के लिए भाड़ा वसूलने का फॉर्मूला है। फॉर्मूला: Volume Weight (kg) = (लंबाई × चौड़ाई × ऊंचाई सेमी में) ÷ 6,000 (या कूरियर के लिए ÷ 5,000)।')
      .replaceAll('Freight carriers charge based on Chargeable Weight = Max(Actual Gross Weight, Volume Weight). If you ship lightweight large items (like pillows or plastic toys), you pay based on Volume Weight.',
        'फ्रेट कैरियर Chargeable Weight = Max(Actual Gross Weight, Volume Weight) के आधार पर शुल्क लेते हैं। यदि आप हल्के लेकिन बड़े उत्पाद (जैसे तकिये या खिलौने) भेजते हैं, तो आप Volume Weight के आधार पर भुगतान करते हैं।')

      // Dynamic Module fallbacks for Mod-3 to Mod-15
      .replaceAll(`${title} is a critical weight and measurement standard in cargo logistics. It dictates cargo density, space allocation, container loading capacity, and freight cost billing for sea and air transport.`,
        `${title} कार्गो लॉजिस्टिक्स में एक महत्वपूर्ण वजन और माप मानक है। यह समुद्री और हवाई परिवहन के लिए कार्गो घनत्व, स्थान आवंटन, कंटेनर लोडिंग क्षमता और माल ढुलाई लागत तय करता है।`)
      .replaceAll(`Accurately computing ${title} prevents freight overcharges, container overloading penalties, vessel stability risks, and customs clearance delays at origin and destination ports.`,
        `${title} की सटीक गणना माल ढुलाई के अधिक शुल्क, कंटेनर ओवरलोडिंग जुर्माने, जहाज की स्थिरता के जोखिमों और बंदरगाहों पर सीमा शुल्क निकासी में देरी को रोकती है।`)
      
      .replaceAll(`${title} is an essential container transport concept defining container utilization, loading method, and cargo security protocols during ocean freight.`,
        `${title} महासागर माल ढुलाई के दौरान कंटेनर उपयोग, लोडिंग विधि और कार्गो सुरक्षा प्रोटोकॉल को परिभाषित करने वाली एक आवश्यक कंटेनर परिवहन अवधारणा है।`)
      .replaceAll(`Choosing the right container strategy (${title}) optimizes ocean freight rates, protects goods against transit damage, and ensures smooth port operations.`,
        `सही कंटेनर रणनीति (${title}) चुनने से समुद्री माल भाड़ा दरें अनुकूलित होती हैं, माल की पारगमन क्षति से रक्षा होती है और सुचारू पोर्ट संचालन सुनिश्चित होता है।`)
      
      .replaceAll(`${title} represents a core maritime and air freight shipping term governing vessel schedules, transit times, carrier bookings, and freight movement.`,
        `${title} पोत अनुसूचियों (vessel schedules), यात्रा समय (transit times), वाहक बुकिंग और माल ढुलाई की आवाजाही को नियंत्रित करने वाला एक मुख्य समुद्री और हवाई माल ढुलाई शब्द है।`)
      .replaceAll(`Understanding ${title} enables importers to track cargo milestones, plan inventory arrival schedules, and avoid unexpected port demurrage or transit delays.`,
        `${title} को समझने से आयातकों को कार्गो माइलस्टोन को ट्रैक करने, इन्वेंट्री आगमन शेड्यूल की योजना बनाने और अप्रत्याशित बंदरगाह डेमरेज या पारगमन देरी से बचने में मदद मिलती है।`)
      
      .replaceAll(`${title} is an official Incoterm (International Commercial Term) published by the ICC defining the exact point of risk transfer, cost allocation, and division of responsibilities between seller and buyer.`,
        `${title} ICC द्वारा प्रकाशित एक आधिकारिक इंकोटर्म (Incoterm) है जो विक्रेता और खरीदार के बीच जोखिम हस्तांतरण, लागत आवंटन और जिम्मेदारियों के विभाजन के सटीक बिंदु को परिभाषित करता है।`)
      .replaceAll(`${title} clearly establishes who pays ocean freight, who purchases marine insurance, and who handles export/import customs clearance, preventing costly legal disputes.`,
        `${title} स्पष्ट रूप से स्थापित करता है कि कौन समुद्री भाड़ा देता है, कौन समुद्री बीमा खरीदता है, और कौन निर्यात/आयात सीमा शुल्क निकासी संभालता है, जिससे महंगे कानूनी विवाद बचते हैं।`)
      
      .replaceAll(`${title} is a key port and infrastructure concept in international trade, facilitating cargo handling, inland transit, warehousing, and customs clearance.`,
        `${title} अंतरराष्ट्रीय व्यापार में एक प्रमुख बंदरगाह और बुनियादी ढांचा अवधारणा है, जो कार्गो हैंडलिंग, अंतर्देशीय पारगमन, भंडारण और सीमा शुल्क निकासी की सुविधा प्रदान करती है।`)
      .replaceAll(`Proper utilization of ${title} infrastructure speeds up cargo movement, reduces port dwell time, and avoids costly demurrage and detention charges.`,
        `${title} बुनियादी ढांचे का उचित उपयोग कार्गो की आवाजाही को गति देता है, बंदरगाह में ठहरने के समय को कम करता है और महंगे डेमरेज और डिटेंशन शुल्क से बचाता है।`)
      
      .replaceAll(`${title} is a critical trade document required for legal compliance, customs clearance, foreign exchange settlement, and title of ownership in international trade.`,
        `${title} अंतरराष्ट्रीय व्यापार में कानूनी अनुपालन, सीमा शुल्क निकासी (customs clearance), विदेशी मुद्रा निपटान और स्वामित्व के अधिकार के लिए आवश्यक एक महत्वपूर्ण व्यापारिक दस्तावेज (document) है।`)
      .replaceAll(`Without an accurate ${title}, customs authorities cannot assess duty or clear shipments, leading to container holds, port fines, and payment delays.`,
        `सटीक ${title} के बिना, सीमा शुल्क (Customs) अधिकारी शुल्क का आकलन नहीं कर सकते या शिपमेंट को क्लियर नहीं कर सकते, जिससे कंटेनर होल्ड, पोर्ट जुर्माना और भुगतान में देरी होती है।`)
      
      .replaceAll(`${title} is a statutory customs regulation, tariff classification, or compliance requirement governing import duties, taxes, and entry clearance.`,
        `${title} आयात शुल्क, करों और प्रवेश निकासी को नियंत्रित करने वाला एक वैधानिक सीमा शुल्क विनियमन, शुल्क वर्गीकरण या अनुपालन आवश्यकता है।`)
      .replaceAll(`Strict compliance with ${title} ensures smooth customs release, prevents heavy penalty duties, avoids cargo confiscation, and ensures legal import entry.`,
        `${title} का सख्त अनुपालन सुचारू सीमा शुल्क जारी करना सुनिश्चित करता है, भारी जुर्माना शुल्क रोकता है, माल जब्ती से बचाता है और कानूनी आयात प्रवेश सुनिश्चित करता है।`)
      
      .replaceAll(`${title} is a standard international financial payment mechanism governing trade settlement, credit risk management, and banking transfers.`,
        `${title} व्यापार निपटान, ऋण जोखिम प्रबंधन और बैंकिंग हस्तांतरण को नियंत्रित करने वाला एक मानक अंतरराष्ट्रीय वित्तीय भुगतान तंत्र है।`)
      .replaceAll(`Using appropriate ${title} protects buyer and seller against payment default, currency fluctuations, and non-delivery of goods.`,
        `उचित ${title} का उपयोग करने से खरीदार और विक्रेता भुगतान चूक, मुद्रा के उतार-चढ़ाव और माल की गैर-डिलीवरी से सुरक्षित रहते हैं।`)
      
      .replaceAll(`${title} refers to specific freight, terminal, or port handling fee charged by shipping lines, port authorities, and forwarders during cargo movement.`,
        `${title} कार्गो आवाजाही के दौरान शिपिंग लाइनों, बंदरगाह अधिकारियों और फॉरवर्डर्स द्वारा लिए जाने वाले विशिष्ट भाड़ा, टर्मिनल या पोर्ट हैंडलिंग शुल्क को संदर्भित करता है।`)
      .replaceAll(`Tracking ${title} prevents unexpected landed cost inflation and helps importers negotiate competitive all-inclusive freight quotes.`,
        `${title} को ट्रैक करने से अप्रत्याशित लैंडेड लागत वृद्धि से बचा जा सकता है और आयातकों को प्रतिस्पर्धी माल भाड़ा दरों पर बातचीत करने में मदद मिलती है।`)
      
      .replaceAll(`${title} is a formal quality control procedure, defect inspection method, or compliance standard ensuring manufactured goods meet required specifications.`,
        `${title} एक औपचारिक गुणवत्ता नियंत्रण प्रक्रिया, दोष निरीक्षण विधि या अनुपालन मानक है जो यह सुनिश्चित करता है कि निर्मित उत्पाद आवश्यक विनिर्देशों को पूरा करते हैं।`)
      .replaceAll(`Implementing ${title} prevents receiving defective or non-compliant goods, protecting brand reputation and avoiding costly product recalls.`,
        `${title} को लागू करने से दोषपूर्ण या गैर-अनुपालन वाले सामान प्राप्त करने से बचा जा सकता है, जिससे ब्रांड की प्रतिष्ठा सुरक्षित रहती है।`)
      
      .replaceAll(`${title} is a core operational process in international business workflows, governing order processing, quotation, production tracking, and order fulfillment.`,
        `${title} अंतरराष्ट्रीय व्यावसायिक वर्कफ़्लो में एक मुख्य परिचालन प्रक्रिया है, जो ऑर्डर प्रोसेसिंग, कोटेशन, उत्पादन ट्रैकिंग और ऑर्डर पूर्ति को नियंत्रित करती है।`)
      .replaceAll(`Streamlining ${title} ensures timely production execution, clear supplier communication, and reliable product delivery schedules.`,
        `${title} को सुव्यवस्थित करने से समय पर उत्पादन निष्पादन, स्पष्ट सप्लायर संचार और विश्वसनीय उत्पाद वितरण कार्यक्रम सुनिश्चित होते हैं।`)
      
      .replaceAll(`${title} is a key risk management protocol, insurance provision, or legal remedy designed to mitigate trade losses, transit damage, and contract breaches.`,
        `${title} व्यापार के नुकसान, पारगमन क्षति और अनुबंध के उल्लंघनों को कम करने के लिए डिज़ाइन किया गया एक प्रमुख जोखिम प्रबंधन प्रोटोकॉल, बीमा प्रावधान या कानूनी उपाय है।`)
      .replaceAll(`Effective ${title} management protects business capital against unexpected maritime losses, shipment delays, and supplier default.`,
        `प्रभावी ${title} प्रबंधन अप्रत्याशित समुद्री नुकसान, शिपमेंट में देरी और सप्लायर डिफ़ॉल्ट के खिलाफ व्यावसायिक पूंजी की रक्षा करता है।`)
      
      .replaceAll(`${title} is a specialized internal operational workflow at RBC designed to ensure quality control, supplier verification, and seamless import execution.`,
        `${title} गुणवत्ता नियंत्रण, सप्लायर सत्यापन और निर्बाध आयात निष्पादन सुनिश्चित करने के लिए RBC में एक विशेष आंतरिक परिचालन कार्यप्रवाह (workflow) है।`)
      .replaceAll(`Following the ${title} procedure guarantees operational consistency, risk mitigation, and high customer satisfaction across all trade transactions.`,
        `${title} प्रक्रिया का पालन करना सभी व्यापारिक लेनदेन में परिचालन स्थिरता, जोखिम में कमी और उच्च ग्राहक संतुष्टि की गारंटी देता है।`)
      
      .replaceAll(`RBC verifies every detail on the ${title} (buyer name, invoice number, HSN codes, weights) before submitting it to customs brokers and banking channels.`,
        `RBC कस्टम ब्रोकर और बैंकिंग चैनलों को जमा करने से पहले ${title} पर प्रत्येक विवरण (खरीदार का नाम, चालान संख्या, HSN कोड, वजन) को सत्यापित करता है।`)
      .replaceAll(`RBC imports cargo under precise ${title} parameters, coordinating with freight forwarders to verify gross mass certificates (VGM) and optimize container space utilization.`,
        `RBC सटीक ${title} मापदंडों के तहत माल आयात करता है, सकल द्रव्यमान प्रमाणपत्र (VGM) सत्यापित करने और कंटेनर स्थान उपयोग को अनुकूलित करने के लिए फ्रेट फारवर्डर के साथ समन्वय करता है।`)
      .replaceAll(`RBC plans container logistics using ${title} standards, selecting the appropriate container size and seal specifications to safely transport goods from overseas suppliers.`,
        `RBC ${title} मानकों का उपयोग करके कंटेनर लॉजिस्टिक्स की योजना बनाता है, विदेशी सप्लायरों से माल को सुरक्षित रूप से ले जाने के लिए उपयुक्त कंटेनर आकार और सील विनिर्देशों का चयन करता है।`)
      .replaceAll(`RBC monitors ${title} status on international tracking portals to coordinate destination customs clearance and warehouse receiving schedules.`,
        `RBC गंतव्य सीमा शुल्क निकासी और गोदाम प्राप्ति शेड्यूल का समन्वय करने के लिए अंतरराष्ट्रीय ट्रैकिंग पोर्टलों पर ${title} स्थिति की निगरानी करता है।`)
      .replaceAll(`RBC negotiates contracts under ${title} terms, ensuring clear agreement on shipping costs, freight insurance coverage, and customs duty responsibilities.`,
        `RBC ${title} शर्तों के तहत अनुबंधों पर बातचीत करता है, जिससे शिपिंग लागत, भाड़ा बीमा कवरेज और सीमा शुल्क जिम्मेदारियों पर स्पष्ट सहमति सुनिश्चित होती है।`)
      .replaceAll(`RBC routes imported containers through designated ${title} facilities for efficient customs inspection, container de-stuffing, and final door delivery.`,
        `RBC कुशल सीमा शुल्क निरीक्षण, कंटेनर डी-स्टफिंग और अंतिम डोर डिलीवरी के लिए निर्दिष्ट ${title} सुविधाओं के माध्यम से आयातित कंटेनरों को भेजता है।`)
      .replaceAll(`RBC consults licensed CHA brokers to verify ${title} duty rates, applicable cesses (BCD, SWS, IGST), and mandatory regulatory approvals before importing.`,
        `RBC आयात करने से पहले ${title} शुल्क दरों, लागू उपकरों (BCD, SWS, IGST) और अनिवार्य नियामक अनुमोदनों की पुष्टि करने के लिए लाइसेंस प्राप्त CHA दलालों से परामर्श करता है।`)
      .replaceAll(`RBC executes financial transactions using ${title} protocols, ensuring secure fund transfers through SWIFT banking channels upon document verification.`,
        `RBC दस्तावेज सत्यापन पर SWIFT बैंकिंग चैनलों के माध्यम से सुरक्षित फंड ट्रांसफर सुनिश्चित करते हुए ${title} प्रोटोकॉल का उपयोग करके वित्तीय लेनदेन निष्पादित करता है।`)
      .replaceAll(`RBC audits all freight invoices against agreed rate cards to verify ${title} items before approving payment to logistics providers.`,
        `RBC लॉजिस्टिक्स प्रदाताओं को भुगतान स्वीकृत करने से पहले ${title} वस्तुओं की पुष्टि करने के लिए सहमत दर कार्ड के खिलाफ सभी फ्रेट चालानों का ऑडिट करता है।`)
      .replaceAll(`RBC hires certified third-party inspection agencies to perform ${title} at the supplier factory before approving final balance payment.`,
        `RBC अंतिम शेष भुगतान को मंजूरी देने से पहले सप्लायर फैक्ट्री में ${title} करने के लिए प्रमाणित तीसरे पक्ष की निरीक्षण एजेंसियों को नियुक्त करता है।`)
      .replaceAll(`RBC tracks ${title} milestones in its ERP software to maintain real-time visibility over supplier order status and customer delivery commitments.`,
        `RBC सप्लायर ऑर्डर स्थिति और ग्राहक वितरण प्रतिबद्धताओं पर वास्तविक समय की दृश्यता बनाए रखने के लिए अपने ERP सॉफ्टवेयर में ${title} मील के पत्थरों को ट्रैक करता है।`)
      .replaceAll(`RBC manages trade risks by implementing ${title} measures, purchasing comprehensive cargo insurance, and enforcing clear contract terms.`,
        `RBC ${title} उपायों को लागू करके, व्यापक कार्गो बीमा खरीदकर और स्पष्ट अनुबंध शर्तों को लागू करके व्यापार जोखिमों का प्रबंधन करता है।`)
      .replaceAll(`RBC team members execute ${title} according to standard operating procedures, ensuring every step from supplier check to delivery is audited.`,
        `RBC टीम के सदस्य मानक संचालन प्रक्रियाओं के अनुसार ${title} निष्पादित करते हैं, यह सुनिश्चित करते हुए कि सप्लायर चेक से लेकर डिलीवरी तक के हर कदम का ऑडिट किया जाता है।`)

      // Common phrase fallbacks
      .replaceAll('Always check local compliance guides for', 'हमेशा लोकल कंप्लायंस गाइड देखें -')
      .replaceAll('Always double-check outer carton dimensions and total scale weight before signing the final Packing List and VGM declaration.',
        'अंतिम पैकिंग सूची (Packing List) और VGM घोषणा पर हस्ताक्षर करने से पहले हमेशा बाहरी कार्टन आयामों और कुल वजन की दोबारा जांच करें।')
      .replaceAll('Inspect container floor integrity, door seal gaskets, and bolt seal numbers before signing container loading reports.',
        'कंटेनर लोडिंग रिपोर्ट पर हस्ताक्षर करने से पहले कंटेनर के फर्श, दरवाजे की सील और बोल्ट सील नंबर का निरीक्षण करें।')
      .replaceAll('Request regular milestone updates (ETD, ETA, transshipment logs) from your freight forwarder to manage supply chain expectations.',
        'आपूर्ति श्रृंखला अपेक्षाओं को प्रबंधित करने के लिए अपने फ्रेट फारवर्डर से नियमित मील के पत्थर अपडेट (ETD, ETA) का अनुरोध करें।')
      .replaceAll('Always specify the exact named port or place alongside', 'हमेशा निर्दिष्ट पोर्ट या स्थान का नाम स्पष्ट रूप से लिखें -')
      .replaceAll('Ensure descriptions, values, HSN codes, and party names match identically across all trade documents',
        'सुनिश्चित करें कि विवरण, मूल्य, HSN कोड और पार्टियों के नाम सभी व्यापारिक दस्तावेजों पर समान रूप से मेल खाते हैं -')
      .replaceAll('Verify HSN code classification and duty structure under current customs tariff schedules before placing import orders.',
        'आयात ऑर्डर देने से पहले वर्तमान सीमा शुल्क टैरिफ अनुसूचियों के तहत HSN कोड वर्गीकरण और शुल्क संरचना की पुष्टि करें।')
      .replaceAll('Always use audited corporate bank accounts and verified bank SWIFT codes for',
        'हमेशा बैंक SWIFT कोड और पंजीकृत कॉर्पोरेट खातों का उपयोग करें -')
      .replaceAll('Request an itemized break-up of all origin and destination', 'हमेशा सभी मूल और गंतव्य प्रभारों का विवरण मांगें -')
      .replaceAll('Define acceptable quality limits (AQL) and defect criteria in writing within your Purchase Order before production starts.',
        'उत्पादन शुरू होने से पहले अपने खरीद आदेश (PO) में लिखित रूप में स्वीकार्य गुणवत्ता सीमाओं (AQL) को परिभाषित करें।')
      .replaceAll('Confirm all terms (pricing, lead time, specs, terms) in writing during', 'लिखित रूप में सभी शर्तों की पुष्टि करें -')
      .replaceAll('Document cargo damage or shortages immediately with photos and written notices to carriers upon container opening.',
        'कंटेनर खोलते ही तस्वीरों और लिखित नोटिस के साथ कार्गो क्षति या कमी का तुरंत दस्तावेजीकरण करें।')
      .replaceAll('Complete all required checklist items in', 'हमेशा चेकलिस्ट पूरा करें -');
  }

  // 2. Replacements for Gujarati (gu)
  else if (lang === 'gu') {
    translated = translated
      // Dynamic fallback translations for Gujarati (gu)
      .replaceAll('Failing to verify documentation details before vessel dispatch.', 'જહાજ રવાના થાય તે પહેલાં દસ્તાવેજોની વિગતોની ચકાસણી ન કરવી.')
      .replaceAll('Consult your customs broker (CHA) before finalizing purchase contracts.', 'ખરીદી કરારને આખરી ઓપ આપતા પહેલાં તમારા કસ્ટમ્સ બ્રોકર (CHA) ની સલાહ લો.')
      .replaceAll(`This lesson covers the fundamental definition, business examples, FAQs, and risk assessments related to ${title}.`,
        `આ પાઠમાં ${title} થી સંબંધિત મૂળભૂત વ્યાખ્યા, વ્યવસાયિક ઉદાહરણો, FAQs અને જોખમ મૂલ્યાંકન આવરી લેવામાં આવ્યા છે.`)
      .replaceAll(`Always check local compliance guides for ${title}.`, `હંમેશા ${title} માટે સ્થાનિક કાયદાકીય માર્ગદર્શિકા તપાસો.`)
      .replaceAll(`Ignoring standard regulations for ${title}, leading to port delays or unexpected costs.`,
        `${title} માટેના સામાન્ય નિયમોની અવગણના કરવી, જેનાથી પોર્ટ વિલંબ અથવા અણધાર્યા ખર્ચ થઈ શકે છે.`)
      .replaceAll(`Always verify documentation details and compliance rules for ${title} with your logistics agent before shipping.`,
        `શિપિંગ કરતા પહેલા હંમેશા તમારા લોજિસ્ટિક્સ એજન્ટ સાથે ${title} માટેના દસ્તાવેજો અને નિયમોની ચકાસણી કરો.`)
      .replaceAll(`What is the role of ${title} in global transit?`, `વૈશ્વિક પરિવહનમાં ${title} ની ભૂમિકા શું છે?`)
      .replaceAll('It clarifies handling protocols, standard documentation clearances, and freight quotes for cargo logistics.',
        'તે કાર્ગો લોજિસ્ટિક્સ માટે હેન્ડલિંગ પ્રોટોકોલ, દસ્તાવેજ મંજૂરી અને નૂર દર સ્પષ્ટ કરે છે.')

      // Model Number specific translations for Gujarati (gu)
      .replaceAll('Include model number on PO, invoice, and packing list.', 'PO, ઇનવોઇસ અને પેકિંગ લિસ્ટ પર મોડેલ નંબરનો સમાવેશ કરો.')
      .replaceAll('Verify model number on received goods against documents.', 'મળેલા માલ પરના મોડેલ નંબરને દસ્તાવેજો સાથે ચકાસો.')
      .replaceAll('Not including model numbers on purchase orders, leading to factories shipping the wrong product version.', 'પરચેઝ ઓર્ડર પર મોડેલ નંબર ન લખવો, જેના કારણે ફેક્ટરીઓ ખોટું વર્ઝન શિપ કરી શકે છે.')
      .replaceAll('Using product names instead of model numbers — names can be ambiguous, model numbers are precise.', 'મોડેલ નંબરને બદલે પ્રોડક્ટના નામોનો ઉપયોગ કરવો — નામો અસ્પષ્ટ હોઈ શકે છે, મોડેલ નંબર ચોક્કસ હોય છે.')
      .replaceAll('Not verifying that the model number on the packing list matches the purchase order and invoice.', 'પેકિંગ લિસ્ટ પરનો મોડેલ નંબર પરચેઝ ઓર્ડર અને ઇનવોઇસ સાથે મેળ ખાય છે કે નહીં તેની ખાતરી ન કરવી.')
      .replaceAll('Always include the exact factory model number on your Purchase Order and Commercial Invoice.', 'તમારા પરચેઝ ઓર્ડર અને કોમર્શિયલ ઇનવોઇસ પર હંમેશા ફેક્ટરીનો ચોક્કસ મોડેલ નંબર લખો.')
      .replaceAll('Verify model numbers in the physical product against the shipping documents before warehouse acceptance.', 'વેરહાઉસમાં સ્વીકારતા પહેલા શિપિંગ દસ્તાવેજો સામે ભૌતિક પ્રોડક્ટમાં મોડેલ નંબરની ચકાસણી કરો.')
      .replaceAll('If a factory discontinues a model, request the technical spec sheet of the replacement model before accepting it.', 'જો ફેક્ટરી કોઈ મોડેલ બંધ કરે, તો તેને સ્વીકારતા પહેલા વૈકલ્પિક મોડેલની ટેકનિકલ સ્પેક શીટ મંગાવો.')

      // MOQ & SKU & Module 2 Common phrases for Gujarati (gu)
      .replaceAll('Every product variant must have its own unique SKU.', 'દરેક પ્રોડક્ટ વેરિઅન્ટનો પોતાનો યુનિક SKU કોડ હોવો જ જોઈએ.')
      .replaceAll('Keep SKU consistent across invoice, packing list, and warehouse label.', 'ઇનવોઇસ, પેકિંગ લિસ્ટ અને વેરહાઉસ લેબલ પર SKU સમાન રાખો.')
      .replaceAll('Using supplier model numbers as your SKU — create your own internal codes for better control.', 'સપ્લાયરના મોડેલ નંબરને જ SKU તરીકે વાપરવાને બદલે — બહેતર નિયંત્રણ માટે તમારા પોતાના આંતરિક કોડ બનાવો.')
      .replaceAll('Not assigning unique SKUs to each variant (color, size, pack quantity) leading to wrong items being shipped.', 'દરેક વેરિઅન્ટ (રંગ, સાઇઝ) ને યુનિક SKU ન આપવાથી ખોટો માલ શિપ થવાનું જોખમ રહે છે.')
      .replaceAll('Using special characters like / or spaces in SKU codes that break inventory software.', 'SKU કોડમાં / અથવા સ્પેસ જેવા ખાસ અક્ષરોનો ઉપયોગ કરવાથી ઇન્વેન્ટરી સોફ્ટવેરમાં ભૂલ આવી શકે છે.')
      .replaceAll('Build your SKU with a logical structure: CATEGORY-COLOR-SIZE (e.g., BAG-BLK-LRG).', 'તમારા SKU ને લોજિકલ માળખામાં બનાવો: CATEGORY-COLOR-SIZE (દા.ત., BAG-BLK-LRG).')
      .replaceAll('Never change a SKU once it is in use — it breaks inventory history records.', 'એકવાર ઉપયોગમાં આવ્યા પછી ક્યારેય SKU બદલશો નહીં - તે ઈન્વેન્ટરી રેકોર્ડ્સ બગાડે છે.')
      .replaceAll('Use the same SKU on your packing list, invoice, and warehouse label for error-free operations.', 'ભૂલ-મુક્ત કામગીરી માટે તમારા પેકિંગ લિસ્ટ, ઇનવોઇસ અને વેરહાઉસ લેબલ પર સમાન SKU નો ઉપયોગ કરો.')
      
      .replaceAll('Accepting the first MOQ the supplier quotes without negotiating — always negotiate, factories expect it.', 'વાટાઘાટો કર્યા વિના સપ્લાયરના પ્રથમ MOQ ને સ્વીકારવો - હંમેશા વાટાઘાટો કરો, ફેક્ટરીઓ તેની અપેક્ષા રાખે છે.')
      .replaceAll('Ordering huge quantities to meet MOQ without testing product quality or market demand first.', 'પ્રોડક્ટની ગુણવત્તા અથવા માર્કેટ ડિમાન્ડ ચકાસ્યા વિના જ MOQ પૂરો કરવા મોટી માત્રામાં ઓર્ડર આપવો.')
      .replaceAll('Confusing MOQ (units) with minimum order value (dollar amount) — always clarify which one applies.', 'MOQ (નંગ) ને લઘુત્તમ ઓર્ડર મૂલ્ય (ડોલર રકમ) સાથે સરખાવીને મૂંઝવણ થવી - હંમેશા સ્પષ્ટતા કરો.')
      .replaceAll('Ask the supplier: "What is your MOQ for a sample order?" — many factories have a separate lower MOQ for first-time buyers.', 'સપ્લાયરને પૂછો: "સેમ્પલ ઓર્ડર માટે તમારો MOQ શું છે?" - ઘણી ફેક્ટરીઓ પાસે પ્રથમ વખતના ખરીદદારો માટે અલગ ઓછો MOQ હોય છે.')
      .replaceAll('If MOQ is too high, find a trading company that buys from the same factory and resells in smaller batches.', 'જો MOQ ખૂબ ઊંચો હોય, તો એવી ટ્રેડિંગ કંપની શોધો જે તે જ ફેક્ટરીમાંથી ખરીદીને નાના જથ્થામાં વેચતી હોય.')
      .replaceAll('Co-load cargo with another buyer if the supplier agrees to ship under a single invoice.', 'જો સપ્લાયર સિંગલ ઇનવોઇસ હેઠળ શિપ કરવા સંમત થાય, તો અન્ય ખરીદદાર સાથે કાર્ગો કો-લોડ કરો.')
      
      .replaceAll('Supplier model numbers are printed on outer cartons and commercial invoices.', 'સપ્લાયરના મોડેલ નંબર આઉટર કાર્ટન અને કોમર્શિયલ ઇનવોઇસ પર પ્રિન્ટ થાય છે.')
      .replaceAll('Confusing supplier model numbers with your internal SKU codes.', 'સપ્લાયરના મોડેલ નંબરને તમારા આંતરિક SKU કોડ સાથે સરખાવી ભૂલ કરવી.')
      .replaceAll('Assuming two suppliers use the same model number for identical products.', 'એવું ધારી લેવું કે બે અલગ સપ્લાયર્સ સમાન પ્રોડક્ટ્સ માટે એક જ મોડેલ નંબરનો ઉપયોગ કરે છે.')
      .replaceAll('Always cross-reference the model number in your purchase order and the proforma invoice before paying.', 'ચૂકવણી કરતા પહેલા હંમેશા તમારા પરચેઝ ઓર્ડર અને પ્રોફોર્મા ઇનવોઇસમાં મોડેલ નંબર ક્રોસ-રેફરન્સ કરો.')
      
      .replaceAll('Product specifications must be attached to the Purchase Contract.', 'પ્રોડક્ટ સ્પેસિફિકેશન હંમેશા ખરીદી કરાર (Purchase Contract) સાથે જોડાયેલા હોવા જોઈએ.')
      .replaceAll('Failing to specify material density, thickness, or weight, allowing factory to use cheaper materials.', 'મટીરિયલની ઘનતા, જાડાઈ અથવા વજન સ્પષ્ટ ન કરવું, જેનાથી ફેક્ટरी સસ્તું મટીરિયલ વાપરી શકે છે.')
      .replaceAll('Relying on generic verbal descriptions rather than precise measurements.', 'ચોક્કસ માપોને બદલે સામાન્ય મૌખિક વર્ણનો પર આધાર રાખવો.')
      .replaceAll('Create a detailed Spec Sheet with drawings, tolerances, and certifications, signed by both parties.', 'બંને પક્ષો દ્વારા હસ્તાક્ષરિત ડ્રોઇંગ્સ, ટોલરન્સ અને સર્ટિફિકેટ્સ સાથે વિગતવાર સ્પેક શીટ બનાવો.')
      
      .replaceAll('Keep a sealed duplicate sample at your office for final shipment comparison.', 'આખરી શિપમેન્ટની સરખામણી માટે તમારી ઓફિસમાં સીલબંધ ડુપ્લિકેટ સેમ્પલ રાખો.')
      .replaceAll('Approving bulk production without receiving and physically testing a pre-production sample.', 'પ્રી-પ્રોડક્શન સેમ્પલ મેળવ્યા અને શારીરિક રીતે પરીક્ષણ કર્યા વિના બલ્ક પ્રોડક્શન મંજૂર કરવું.')
      .replaceAll('Assuming the production batch will perfectly match a sample without quality control checks.', 'ક્વોલિટી કંટ્રોલ ચેક વિના એવું ધારી લેવું કે પ્રોડક્શન બેચ સેમ્પલ સાથે બરાબર મેચ થશે.')
      .replaceAll('Always write notes, sign, and date the approved sample. Send a signed copy back to the factory.', 'હંમેશા મંજૂર સેમ્પલ પર નોંધ લખો, સહી કરો અને તારીખ લખો. સહી કરેલી નકલ ફેક્ટરીમાં પાછી મોકલો.')
      
      .replaceAll('OEM stands for Original Equipment Manufacturer.', 'OEM નો અર્થ છે Original Equipment Manufacturer (ઓરિજિનલ ઇક્વિપમેન્ટ મૅન્યુફૅક્ચરર).')
      .replaceAll('Requires registered Trademark authorization before custom logo printing.', 'કસ્ટમ લોગો પ્રિન્ટિંગ કરતા પહેલા રજિસ્ટર્ડ ટ્રેડમાર્ક ઓથોરાઇઝેશનની જરૂર પડે છે.')
      .replaceAll('Failing to register your brand trademark in the manufacturing country, leading to brand hijacking.', 'ઉત્પાદક દેશમાં તમારા બ્રાન્ડ ટ્રેડમાર્કની નોંધણી ન કરાવવી, જેનાથી બ્રાન્ડ હાઇજેકિંગ થઈ શકે છે.')
      .replaceAll('Not signing a non-disclosure agreement (NDA) before sending custom designs.', 'કસ્ટમ ડિઝાઈન મોકલતા પહેલા નોન-ડિસ્ક્લોઝર એગ્રીમેન્ટ (NDA) પર સહી ન કરવી.')
      .replaceAll('Ask the factory for an OEM contract to define mold ownership and design confidentiality.', 'મોલ્ડની માલિકી અને ડિઝાઇનની ગુપ્તતા નક્કી કરવા ફેક્ટરી પાસેથી OEM કરારની માંગણી કરો.')
      
      .replaceAll('ODM stands for Original Design Manufacturer.', 'ODM નો અર્થ છે Original Design Manufacturer (ઓરિજિનલ ડિઝાઈન મૅન્યુફૅક્ચરર).')
      .replaceAll('Assuming you own the design rights of an ODM product.', 'એવું ધારી લેવું કે તમે ODM પ્રોડક્ટના ડિઝાઇન અધિકારોના માલિક છો.')
      .replaceAll('Failing to customize packaging, making your brand look identical to competitors.', 'પેકેજિંગ કસ્ટમાઇઝ ન કરવું, જેનાથી તમારી બ્રાન્ડ તમારા સ્પર્ધકો જેવી જ દેખાશે.')
      .replaceAll('Request minor changes (like color combinations or logo placement) to differentiate from other buyers.', 'અન્ય ખરીદદારોથી અલગ પાડવા માટે નાના ફેરફારો (જેમ કે કલર કોમ્બિનેશન અથવા લોગો પ્લેસમેન્ટ) ની વિનંતી કરો.')
      
      .replaceAll('Private label allows high profit margins without factory investment.', 'પ્રાઇવેટ લેબલ ફેક્ટરી રોકાણ વિના ઉચ્ચ નફાના માર્જિનની મંજૂરી આપે છે.')
      .replaceAll('Failing to inspect the generic factory product quality before branding it.', 'બ્રાન્ડિંગ કરતા પહેલા સામાન્ય ફેક્ટરી પ્રોડક્ટની ગુણવત્તાની તપાસ ન કરવી.')
      .replaceAll('Not verifying trademark availability in your target market before launch.', 'લોન્ચ કરતા પહેલા તમારા ટાર્ગેટ માર્કેટમાં ટ્રેડમાર્કની ઉપલબ્ધતા ન ચકાસવી.')
      .replaceAll('Invest in high-quality custom packaging (boxes, labels, tags) to create a premium brand image.', 'પ્રીમિયમ બ્રાન્ડ ઇમેજ બનાવવા માટે ઉચ્ચ ગુણવત્તાવાળા કસ્ટમ પેકેજિંગમાં રોકાણ કરો.')
      
      .replaceAll('A registered trademark protects your brand from local copycats.', 'રજિસ્ટર્ડ ટ્રેડમાર્ક તમારી બ્રાન્ડને સ્થાનિક નકલખોરોથી સુરક્ષિત કરે છે.')
      .replaceAll('Selling goods under an unregistered brand name in foreign markets.', 'વિદેશી બજારોમાં બિન-નોંધાયેલ બ્રાન્ડ નામ હેઠળ માલ વેચવો.')
      .replaceAll('Apply for trademark registration early in your business cycle to secure legal rights.', 'કાનૂની અધિકારો સુરક્ષિત કરવા માટે તમારા બિઝનેસ સાયકલની શરૂઆતમાં જ ટ્રેડમાર્ક નોંધણી માટે અરજી કરો.')
      
      .replaceAll('Export cartons must have clear shipping marks, weight, and country of origin.', 'નિકાસ કાર્ટન પર સ્પષ્ટ શિપિંગ માર્ક્સ, વજન અને કન્ટ્રી ઓફ ઓરિજિન હોવું જ જોઈએ.')
      .replaceAll('Using thin, single-wall cardboard boxes for heavy sea shipments, leading to crushed cartons.', 'ભારે સી શિપમેન્ટ માટે પાતળા, સિંગલ-વોલ કાર્ડબોર્ડ બોક્સનો ઉપયોગ કરવો, જેનાથી કાર્ટન કચડાઈ જાય છે.')
      .replaceAll('Failing to specify waterproof liners or moisture-absorbing silica gel bags inside cartons.', 'કાર્ટનની અંદર વોટરપ્રૂફ લાઇનર્સ અથવા ભેજ શોષી લેતી સિલિકા જેલ બેગનો ઉલ્લેખ ન કરવો.')
      .replaceAll('Always specify double-wall corrugated cartons (5-ply or 7-ply) and plastic strapping bands.', 'હંમેશા ડબલ-વોલ કોરુગેટેડ કાર્ટન (5-પ્લાય અથવા 7-પ્લાય) અને પ્લાસ્ટિક સ્ટ્રેપિંગ બેન્ડનો ઉલ્લેખ કરો.')

      // Specific Weight / Container / Doc definitions
      .replaceAll('Gross Weight is the total weight of a shipment including the actual product, inner packaging, protective foam, export master cartons, and pallets. Formula: Gross Weight = Net Weight + Packaging Weight + Pallet Weight.',
        'ગ્રોસ વેટ (Gross Weight) એ શિપમેન્ટનું કુલ વજન છે જેમાં પ્રોડક્ટ, અંદરનું પેકિંગ, ફોમ, બહારના બોક્સ અને પેલેટનું વજન સામેલ છે. સૂત્ર: Gross Weight = Net Weight + Packaging Weight + Pallet Weight.')
      .replaceAll('Gross Weight determines ocean freight charges, air cargo billing, container payload safety limits, and road weight laws. Falsifying Gross Weight leads to port detention, vessel instability risks, and heavy customs fines.',
        'ગ્રોસ વેટ સી ફ્રેટ ચાર્જ, એર કાર્ગો બિલિંગ, કન્ટેનર વજન મર્યાદા અને રોડ લોજિસ્ટિક્સ કાયદા નક્કી કરે છે. ખોટો ગ્રોસ વેટ જાહેર કરવાથી દંડ અને માલ જપ્ત થઈ શકે છે.')
      .replaceAll('Gross Weight is the complete weight of cargo including all protective packaging materials and pallets. It is used by shipping lines for weight verification (VGM - Verified Gross Mass) under SOLAS regulations.',
        'ગ્રોસ વેટ એ તમામ પેકિંગ સામગ્રી અને પેલેટ સાથેનું કુલ વજન છે. તેનો ઉપયોગ શિપિંગ લાઇન દ્વારા વજન ચકાસણી (VGM) માટે થાય છે.')
      
      .replaceAll('Net Weight is the actual weight of the product/goods alone, excluding all inner boxes, protective bubble wrap, master cartons, and pallets. Formula: Net Weight = Gross Weight - Packaging Weight.',
        'નેટ વેટ (Net Weight) એ પેકિંગ, બોક્સ અને પેલેટ વગરનું માત્ર પ્રોડક્ટનું શુદ્ધ વજન છે. સૂત્ર: Net Weight = Gross Weight - Packaging Weight.')
      .replaceAll('Net Weight is used by customs authorities to calculate weight-based import duties for commodities (e.g., metals, food, chemicals) and by buyers to verify exact product yield received.',
        'નેટ વેટનો ઉપયોગ કસ્ટમ્સ ડ્યુટીની ગણતરી માટે અને ખરીદદારો દ્વારા ઉત્પાદનની ચોક્કસ માત્રા ચકાસવા માટે થાય છે.')
      .replaceAll('Net Weight is the net mass of the product without any packaging. It represents the actual product quantity purchased and is declared on Commercial Invoices and Bills of Entry.',
        'નેટ વેટ એટલે કોઈપણ પેકિંગ વગરનું માલનું વાસ્તવिक વજન, જે કોમર્શિયલ ઇનવોઇસ અને બિલ ઓફ એન્ટ્રી પર જાહેર કરાય છે.')

      .replaceAll('Volume Weight (Dimensional Weight / Volumetric Weight) is a pricing formula used by airlines and courier companies (DHL, FedEx) to charge freight for bulky but lightweight cargo. Formula: Volume Weight (kg) = (Length × Width × Height in cm) ÷ 6,000 (or ÷ 5,000 for express courier).',
        'વોલ્યુમ વેટ એ એરલાઇન્સ અને કુરિયર કંપનીઓ દ્વારા હલકા પણ મોટા માલ માટે ભાડું વસૂલવાનું સૂત્ર છે. સૂત્ર: Volume Weight (kg) = (લંબાઈ × પહોળાઈ × ઊંચાઈ cm માં) ÷ 6,000.')
      .replaceAll('Freight carriers charge based on Chargeable Weight = Max(Actual Gross Weight, Volume Weight). If you ship lightweight large items (like pillows or plastic toys), you pay based on Volume Weight.',
        'શિપિંગ કંપનીઓ ચાર્જેબલ વેટ = Max(ગ્રોસ વેટ, વોલ્યુમ વેટ) ના આધારે ભાડું લે છે. જો તમારો માલ હલકો અને મોટો હોય, તો ભાડું વોલ્યુમ વેટ પર ગણાય છે.')

      // Dynamic Module fallbacks for Mod-3 to Mod-15
      .replaceAll(`${title} is a critical weight and measurement standard in cargo logistics. It dictates cargo density, space allocation, container loading capacity, and freight cost billing for sea and air transport.`,
        `${title} એ કાર્ગો લોજિસ્ટિક્સમાં વજન आणि માપનનું મહત્વનું ધોરણ છે. તે દરિયાઈ અને હવાઈ પરિવહન માટે કાર્ગો ઘનતા, જગ્યા ફાળવણી અને ભાડાની ગણતરી નક્કી કરે છે.`)
      .replaceAll(`Accurately computing ${title} prevents freight overcharges, container overloading penalties, vessel stability risks, and customs clearance delays at origin and destination ports.`,
        `${title} ની સચોટ ગણતરી ભાડાના વધારાના ખર્ચ, ઓવરલોડિંગ દંડ, જહાજના જોખમો અને કસ્ટમ્સ ક્લિયરન્સમાં વિલંબને અટકાવે છે.`)
      
      .replaceAll(`${title} is an essential container transport concept defining container utilization, loading method, and cargo security protocols during ocean freight.`,
        `${title} એ સી ફ્રેટ દરમિયાન કન્ટેનરનો વપરાશ, લોડિંગ પદ્ધતિ અને માલની સુરક્ષા નિયમો નક્કી કરતો કન્ટેનર પરિવહન ખ્યાલ છે.`)
      .replaceAll(`Choosing the right container strategy (${title}) optimizes ocean freight rates, protects goods against transit damage, and ensures smooth port operations.`,
        `યોગ્ય કન્ટેનર વ્યૂહરચના (${title}) પસંદ કરવાથી નૂર દર સસ્તો થાય છે, માલ સુરક્ષિત રહે છે અને પોર્ટ કામગીરી સરળ બને છે.`)
      
      .replaceAll(`${title} represents a core maritime and air freight shipping term governing vessel schedules, transit times, carrier bookings, and freight movement.`,
        `${title} એ જહાજના समयપત્રક, પરિવહન સમય, કેરિયર બુકિંગ અને માલસામાનની હિલચાલને નિયંત્રિત કરતી એક મુખ્ય શિપિંગ શરત છે.`)
      .replaceAll(`Understanding ${title} enables importers to track cargo milestones, plan inventory arrival schedules, and avoid unexpected port demurrage or transit delays.`,
        `${title} ને સમજવાથી આયાતકારો કાર્ગોના લોકેશનને ટ્રેક કરી શકે છે, ઇન્વેન્ટરી આયોજન કરી શકે છે અને પોર્ટ ડેમરેજ કે વિલંબથી બચી શકે છે.`)
      
      .replaceAll(`${title} is an official Incoterm (International Commercial Term) published by the ICC defining the exact point of risk transfer, cost allocation, and division of responsibilities between seller and buyer.`,
        `${title} એ આઈસીસી (ICC) દ્વારા પ્રકાશિત સત્તાવાર ઇનકોટર્મ છે જે વિક્રેતા અને ખરીદદાર વચ્ચે જોખમ ટ્રાન્સફર અને ખર્ચ વહેંચણીની મર્યાદા નક્કી કરે છે.`)
      .replaceAll(`${title} clearly establishes who pays ocean freight, who purchases marine insurance, and who handles export/import customs clearance, preventing costly legal disputes.`,
        `${title} સ્પષ્ટ કરે છે કે દરિયાઈ ભાડું કોણ ચૂકવશે, વીમો કોણ લેશે અને કસ્ટમ્સ ક્લિયરન્સ કોણ કરશે, જેથી કાનૂની વિવાદો ટાળી શકાય.`)
      
      .replaceAll(`${title} is a key port and infrastructure concept in international trade, facilitating cargo handling, inland transit, warehousing, and customs clearance.`,
        `${title} એ આંતરરાષ્ટ્રીય વેપારમાં પોર્ટ અને ઇન્ફ્રાસ્ટ્રક્ચરનો ખ્યાલ છે, જે કાર્ગો હેન્ડલિંગ, વેરહાઉસિંગ અને કસ્ટમ્સ ક્લિયરન્સને સરળ બનાવે છે.`)
      .replaceAll(`Proper utilization of ${title} infrastructure speeds up cargo movement, reduces port dwell time, and avoids costly demurrage and detention charges.`,
        `${title} ઇન્ફ્રાસ્ટ્રક્ચરનો યોગ્ય ઉપયોગ કાર્ગો હિલચાલ ઝડપી બનાવે છે, પોર્ટ પર રોકાણનો સમય ઘટાડે છે અને પોર્ટ ડેમરેજ ટાળે છે.`)
      
      .replaceAll(`${title} is a critical trade document required for legal compliance, customs clearance, foreign exchange settlement, and title of ownership in international trade.`,
        `${title} એ કાયદાકીય પાલન, કસ્ટમ્સ ક્લિયરન્સ અને માલિકી હક્ક ટ્રાન્સફર માટે જરૂરી એક મહત્વપૂર્ણ વ્યાપારી દસ્તાવેજ છે.`)
      .replaceAll(`Without an accurate ${title}, customs authorities cannot assess duty or clear shipments, leading to container holds, port fines, and payment delays.`,
        `સચોટ ${title} વિના કસ્ટમ્સ અધિકારીઓ માલ ક્લિયર કરી શકતા નથી, જેનાથી કન્ટેનર હોલ્ડ, પોર્ટ દંડ અને ચૂકવણીમાં વિલંબ થાય છે.`)
      
      .replaceAll(`${title} is a statutory customs regulation, tariff classification, or compliance requirement governing import duties, taxes, and entry clearance.`,
        `${title} એ આયાત ડ્યુટી, વેરા અને એન્ટ્રી ક્લિયરન્સને નિયંત્રિત કરતો સરકારી કસ્ટમ્સ નિયમ કે ટેરિફ વર્ગીકરણ છે.`)
      .replaceAll(`Strict compliance with ${title} ensures smooth customs release, prevents heavy penalty duties, avoids cargo confiscation, and ensures legal import entry.`,
        `${title} નું ચુસ્ત પાલન સરળ કસ્ટમ્સ રિલીઝની ખાતરી આપે છે, ભારે દંડ અને માલ જપ્ત થવાનું ટાળे છે અને કાયદેસર આયાત સુનિશ્ચિત કરે છે.`)
      
      .replaceAll(`${title} is a standard international financial payment mechanism governing trade settlement, credit risk management, and banking transfers.`,
        `${title} એ વેપાર પતાવટ, ક્રેડિટ જોખમ વ્યવસ્થાપન અને બેંકિંગ ટ્રાન્સફરને નિયંત્રિત કરતું સ્ટાન્ડર્ડ આંતરરાષ્ટ્રીય નાણાકીય ચૂકવણીનું માધ્યમ છે.`)
      .replaceAll(`Using appropriate ${title} protects buyer and seller against payment default, currency fluctuations, and non-delivery of goods.`,
        `યોગ્ય ${title} નો ઉપયોગ ખરીદદાર અને વેપારીને પેમેન્ટ ડિફોલ્ટ, ચલણના ઉતાર-ચઢાવ અને માલ ન મળવાના જોખમોથી બચાવે છે.`)
      
      .replaceAll(`${title} refers to specific freight, terminal, or port handling fee charged by shipping lines, port authorities, and forwarders during cargo movement.`,
        `${title} એ માલસામાનની હિલચાલ દરમિયાન શિપિંગ લાઇન, પોર્ટ સત્તાવાળાઓ અને ફોરવર્ડર્સ દ્વારા લેવામાં આવતા ચોક્કસ ભાડા કે ટર્મિનલ હેન્ડલિંગ ચાર્જ દર્શાવे છે.`)
      .replaceAll(`Tracking ${title} prevents unexpected landed cost inflation and helps importers negotiate competitive all-inclusive freight quotes.`,
        `${title} ને ટ્રેક કરવાથી અણધાર્યા લૅન્ડેડ ખર્ચમાં વધારો થતો અटકે છે અને આયાતકારોને સ્પર્ધાત્મક નૂર દરો નક્કી કરવામાં મદદ મળે છે.`)
      
      .replaceAll(`${title} is a formal quality control procedure, defect inspection method, or compliance standard ensuring manufactured goods meet required specifications.`,
        `${title} એ એક સત્તાવાર ગુણવત્તા નિયંત્રણ પ્રક્રિયા અથવા નિરીક્ષણ પદ્ધતિ છે જે ખાતરી કરે છે કે ઉત્પાદિત માલ નિર્ધારિત વિશિષ્ટતાઓને પૂર્ણ કરે છે.`)
      .replaceAll(`Implementing ${title} prevents receiving defective or non-compliant goods, protecting brand reputation and avoiding costly product recalls.`,
        `${title} નો અમલ કરવાથી ખામીયુક્ત કે નિયમ વિરુદ્ધનો માલ મળતો અટકે છે, જેનાથી બ્રાન્ડની પ્રતિષ્ઠા સચવાય છે.`)
      
      .replaceAll(`${title} is a core operational process in international business workflows, governing order processing, quotation, production tracking, and order fulfillment.`,
        `${title} એ આંતરરાષ્ટ્રીય વ્યવસાયમાં એક મુખ્ય ઓપરેશનલ પ્રક્રિયા છે, જે ઓર્ડર પ્રોસેસિંગ, ક્વોટેશન, ઉત્પાદન ટ્રેકિંગ અને ઓર્ડરની પૂર્તિનું સંચાલન કરે છે.`)
      .replaceAll(`Streamlining ${title} ensures timely production execution, clear supplier communication, and reliable product delivery schedules.`,
        `${title} ને વ્યવસ્થિત કરવાથી સમયસર ઉત્પાદન, सપ્લાયર સાથે સ્પષ્ટ સંચાર અને સમયસર માલની ડિલિવરી સુનિશ્ચિત થાય છે.`)
      
      .replaceAll(`${title} is a key risk management protocol, insurance provision, or legal remedy designed to mitigate trade losses, transit damage, and contract breaches.`,
        `${title} એ વેપારમાં નુકસાન, ટ્રાન્ઝિટ નુકસાની અને કરારના ભંગને ઘટાડવા માટે રચાયેલ જોખમ વ્યવસ્થાપન પ્રોટોકોલ અથવા કાનૂની વીમા જોગવાઈ છે.`)
      .replaceAll(`Effective ${title} management protects business capital against unexpected maritime losses, shipment delays, and supplier default.`,
        `${title} નું અસરકારક સંચાલન અણધાર્યા દરિયાઈ નુકસાન, ડિલિવરીમાં વિલંબ અને સપ્લાયર ડિફોલ્ટ સામે વ્યવસાયિક મૂડીનું રક્ષણ કરે છે.`)
      
      .replaceAll(`${title} is a specialized internal operational workflow at RBC designed to ensure quality control, supplier verification, and seamless import execution.`,
        `${title} એ ગુણવત્તા નિયંત્રણ, સપ્લાયર વેરિફિકેશન અને સીમલેસ આયાત સુનિશ્ચિત કરવા માટે RBC ની અંદર એક વિશિષ્ટ આંતરિક ઓપરેશનલ પ્રક્રિયા છે.`)
      .replaceAll(`Following the ${title} procedure guarantees operational consistency, risk mitigation, and high customer satisfaction across all trade transactions.`,
        `${title} પ્રક્રિયાને અનુસરવાથી તમામ વેપાર વ્યવહારોમાં ઓપરેશનલ સુસંગતતા, જોખમમાં ઘટાડો અને ઉચ્ચ ગ્રાહક સંતોષની ખાતરી મળે છે.`)

      .replaceAll(`RBC verifies every detail on the ${title} (buyer name, invoice number, HSN codes, weights) before submitting it to customs brokers and banking channels.`,
        `RBC કસ્ટમ્સ બ્રોકર્સ અને બેંકિંગમાં જમા કરાવતા પહેલાં ${title} પરની દરેક વિગત (ખરીદનારનું નામ, ઇનવોઇસ નંબર, HSN કોડ, વજન) ની ચકાસણી કરે છે.`)
      .replaceAll(`RBC imports cargo under precise ${title} parameters, coordinating with freight forwarders to verify gross mass certificates (VGM) and optimize container space utilization.`,
        `RBC સચોટ ${title} પરિમાણો હેઠળ કાર્ગો આયાત કરે છે, ગ્રોસ વજન પ્રમાણપત્રો ચકાસવા અને કન્ટેનર જગ્યાનો શ્રેષ્ઠ ઉપયોગ કરવા ફોરવર્ડર્સ સાથે સંકલન કરે છે.`)
      .replaceAll(`RBC plans container logistics using ${title} standards, selecting the appropriate container size and seal specifications to safely transport goods from overseas suppliers.`,
        `RBC ${title} માપદંડોનો ઉપયોગ કરીને કન્ટેનર લોજિસ્ટિક્સનું આયોજન કરે છે, યોગ્ય કન્ટેનરનું કદ અને સીલ વિશિષ્ટતાઓ પસંદ કરે છે.`)
      .replaceAll(`RBC monitors ${title} status on international tracking portals to coordinate destination customs clearance and warehouse receiving schedules.`,
        `RBC ડેસ્ટિનેશન કસ્ટમ્સ ક્લિયરન્સ અને वેરહાઉસ શેડ્યૂલ માટે આંતરરાષ્ટ્રીય ટ્રેકિંગ પોર્ટલ પર ${title} સ્ટેટસનું નિરીક્ષણ કરે છે.`)
      .replaceAll(`RBC negotiates contracts under ${title} terms, ensuring clear agreement on shipping costs, freight insurance coverage, and customs duty responsibilities.`,
        `RBC ${title} શરતો હેઠળ કરારની વાટાઘાટો કરે છે, જેથી ભાડું, વીમો અને કસ્ટમ્સ ફરજો અંગે કરાર સ્પષ્ટ થાય.`)
      .replaceAll(`RBC routes imported containers through designated ${title} facilities for efficient customs inspection, container de-stuffing, and final door delivery.`,
        `RBC routes આયાતી કન્ટેનરને યોગ્ય ${title} સુવિધાઓ દ્વારા મોકલે છે જેથી કાર્યક્ષમ નિરીક્ષણ અને ઝડપી નિકાલ થઈ શકે.`)
      .replaceAll(`RBC consults licensed CHA brokers to verify ${title} duty rates, applicable cesses (BCD, SWS, IGST), and mandatory regulatory approvals before importing.`,
        `RBC આયાત કરતા પહેલા ડ્યુટી દર, સેસ (BCD, SWS, IGST) અને જરૂરી મંજૂરીઓ ચકાસવા માટે લાયસન્સ ધરાવતા CHA બ્રોકર્સની સલાહ લે છે.`)
      .replaceAll(`RBC executes financial transactions using ${title} protocols, ensuring secure fund transfers through SWIFT banking channels upon document verification.`,
        `RBC દસ્તાવેજ ચકાસણી પર સ્વિફ્ટ (SWIFT) બેંકિંગ ચેનલો દ્વારા સુરક્ષित ભંડોળ ટ્રાન્સફર સુનિશ્ચિત કરવા ${title} પ્રોટોકોલનો उपयोग કરે છે.`)
      .replaceAll(`RBC audits all freight invoices against agreed rate cards to verify ${title} items before approving payment to logistics providers.`,
        `RBC લોજિસ્ટિક્સ પ્રદાતાઓને ચૂકવણી મંજૂર કરતા પહેલા ${title} આઇટમ્સની ચકાસણી કરવા માટે તમામ નૂર ઇનવોઇસનું ઓડિટ કરે છે.`)
      .replaceAll(`RBC hires certified third-party inspection agencies to perform ${title} at the supplier factory before approving final balance payment.`,
        `RBC બાકીની ચૂકવણી મંજૂર કરતા પહેલા સપ્લાયર ફેક્ટરીમાં ${title} કરવા માટે પ્રમાણિત તૃતીય-પક્ષ નિરીક્ષણ એજન્સીઓ રાખે છે.`)
      .replaceAll(`RBC tracks ${title} milestones in its ERP software to maintain real-time visibility over supplier order status and customer delivery commitments.`,
        `RBC સપ્લાયર ઓર્ડર સ્ટેટસ અને ડિલિવરી વચનો પર દેખરેખ રાખવા માટે તેના ERP સોફ્ટવેરમાં ${title} માઇલસ્ટોન્સને ટ્રેક કરે છે.`)
      .replaceAll(`RBC manages trade risks by implementing ${title} measures, purchasing comprehensive cargo insurance, and enforcing clear contract terms.`,
        `RBC ${title} પગલાં અમલમાં મૂકીને, વ્યાપક વીમો ખરીદીને અને સ્પષ્ટ કરાર શરતો લાગુ કરીને વેપારના જોખમોનું સંચાલન કરે છે.`)
      .replaceAll(`RBC team members execute ${title} according to standard operating procedures, ensuring every step from supplier check to delivery is audited.`,
        `RBC ટીમના સભ્યો સ્ટાન્ડર્ડ ઓપરેટિંગ પ્રોસિજર મુજબ ${title} કરે છે, જેથી સપ્લાયર વેરિફિકેશનથી લઈને ડિલિવરી સુધીના દરેક પગલાનું ઓડิต થાય.`)

      // Common phrase fallbacks
      .replaceAll('Always check local compliance guides for', 'હંમેશા સ્થાનિક કાયદાકીય માર્ગદર્શિકા તપાસો -')
      .replaceAll('Always double-check outer carton dimensions and total scale weight before signing the final Packing List and VGM declaration.',
        'અંતિમ પેકિંગ લિસ્ટ (Packing List) અને VGM ઘોષણા પર હસ્તાક્ષર કરતા પહેલા હંમેશા કાર્ટનના માપ અને કુલ વજનની ખાતરી કરો.')
      .replaceAll('Inspect container floor integrity, door seal gaskets, and bolt seal numbers before signing container loading reports.',
        'કન્ટેનર લોડિંગ રિપોર્ટ્સ પર હસ્તાક્ષર કરતા પહેલા કન્ટેનરના ફ્લોર, દરવાજાની સીલ અને બોલ્ટ સીલ નંબરની તપાસ કરો.')
      .replaceAll('Request regular milestone updates (ETD, ETA, transshipment logs) from your freight forwarder to manage supply chain expectations.',
        'સપ્લાય ચેન આયોજન વ્યવસ્થિત કરવા તમારા ફોરવર્ડર પાસેથી નિયમિત માઇલસ્ટોન અપડેટ્સ (ETD, ETA) ની માંગણી કરો.')
      .replaceAll('Always specify the exact named port or place alongside', 'હંમેશા ચોક્કસ નામવાળા પોર્ટ અથવા સ્થળનો ઉલ્લેખ કરો -')
      .replaceAll('Ensure descriptions, values, HSN codes, and party names match identically across all trade documents',
        'તમામ વ્યાપારી દસ્તાવેજો પર માલની વિગત, કિંમત, HSN કોડ અને પક્ષોના નામ બરાબર મેચ થવા જોઈએ -')
      .replaceAll('Verify HSN code classification and duty structure under current customs tariff schedules before placing import orders.',
        'આયાત ઓર્ડર આપતા પહેલા વર્તમાન કસ્ટમ્સ ટેરિફ શિડ્યુલ હેઠળ HSN કોડ અને ડ્યુટી દરો તપાસો.')
      .replaceAll('Always use audited corporate bank accounts and verified bank SWIFT codes for',
        'હંમેશા બેંક સ્વિફ્ટ (SWIFT) કોડ અને ઓડિટેડ કોર્પોરેટ બેંક ખાતાનો ઉપયોગ કરો -')
      .replaceAll('Request an itemized break-up of all origin and destination', 'હંમેશા તમામ ઓરિજિન અને ડેસ્ટિનેશન ચાર્જીસનું વિગતવાર લિસ્ટ માંગો -')
      .replaceAll('Define acceptable quality limits (AQL) and defect criteria in writing within your Purchase Order before production starts.',
        'ઉત્પાદન શરૂ થાય તે પહેલાં ખરીદી ઓર્ડર (PO) માં સ્વીકાર્ય ગુણવત્તા મર્યાદા (AQL) અને ખામીના માપદંડો લેખિતમાં નક્કી કરો.')
      .replaceAll('Confirm all terms (pricing, lead time, specs, terms) in writing during', 'લખિતમાં બધી શરતોની ખાતરી કરો -')
      .replaceAll('Document cargo damage or shortages immediately with photos and written notices to carriers upon container opening.',
        'કન્ટેનર ખોલતી વખતે જ કાર્ગો નુકસાની અથવા અછતને ફોટા અને કુરિયર નોટિસ સાથે તાત્કાલિક રેકોર્ડ કરો.')
      .replaceAll('Complete all required checklist items in', 'હંમેશા ચેકલિસ્ટ પૂર્ણ કરો -');
  }

  // 3. Replacements for Marathi (mr)
  else if (lang === 'mr') {
    translated = translated
      // Dynamic fallback translations for Marathi (mr)
      .replaceAll('Failing to verify documentation details before vessel dispatch.', 'जहाज निघण्यापूर्वी कागदपत्रांच्या तपशीलांची पडताळणी न करणे.')
      .replaceAll('Consult your customs broker (CHA) before finalizing purchase contracts.', 'खरेदी कराराला अंतिम रूप देण्यापूर्वी तुमच्या कस्टम्स ब्रोकर (CHA) चा सल्ला घ्या.')
      .replaceAll(`This lesson covers the fundamental definition, business examples, FAQs, and risk assessments related to ${title}.`,
        `या पाठामध्ये ${title} शी संबंधित मूलभूत व्याख्या, व्यावसायिक उदाहरणे, FAQs आणि जोखीम मूल्यांकन समाविष्ट केले गेले आहे.`)
      .replaceAll(`Always check local compliance guides for ${title}.`, `नेहमी ${title} साठी स्थानिक नियमांची मार्गदर्शिका तपासा.`)
      .replaceAll(`Ignoring standard regulations for ${title}, leading to port delays or unexpected costs.`,
        `${title} साठीच्या सामान्य नियमांकडे दुर्लक्ष करणे, ज्यामुळे बंदरात विलंब किंवा अनपेक्षित खर्च होऊ शकतो.`)
      .replaceAll(`Always verify documentation details and compliance rules for ${title} with your logistics agent before shipping.`,
        `शिपिंग करण्यापूर्वी नेहमी तुमच्या लॉजिस्टिक्स एजंटसोबत ${title} साठी कागदपत्रे आणि नियमांची पडताळणी करा.`)
      .replaceAll(`What is the role of ${title} in global transit?`, `जागतिक वाहतुकीमध्ये ${title} ची भूमिका काय आहे?`)
      .replaceAll('It clarifies handling protocols, standard documentation clearances, and freight quotes for cargo logistics.',
        'हे कार्गो लॉजिस्टिक्ससाठी हाताळणीचे नियम, कागदपत्रे आणि मालवाहतूक दर स्पष्ट करते.')

      // Model Number specific translations for Marathi (mr)
      .replaceAll('Include model number on PO, invoice, and packing list.', 'PO, इनव्हॉइस आणि पॅकिंग लिस्टवर मॉडेल नंबरचा समावेश करा.')
      .replaceAll('Verify model number on received goods against documents.', 'प्राप्त झालेल्या मालावरील मॉडेल नंबर कागदपत्रांशी तपासून घ्या.')
      .replaceAll('Not including model numbers on purchase orders, leading to factories shipping the wrong product version.', 'खरेदी ऑर्डरवर मॉडेल नंबर न टाकणे, ज्यामुळे फॅक्टरी चुकीचे व्हर्जन पाठवू शकते.')
      .replaceAll('Using product names instead of model numbers — names can be ambiguous, model numbers are precise.', 'मॉडेल नंबरऐवजी उत्पादनाच्या नावांचा वापर करणे — नावे संदिग्ध असू शकतात, मॉडेल नंबर अचूक असतात.')
      .replaceAll('Not verifying that the model number on the packing list matches the purchase order and invoice.', 'पॅकिंग लिस्टवरील मॉडेल नंबर खरेदी ऑर्डर आणि इनव्हॉइसशी जुळतो की नाही याची खात्री न करणे.')
      .replaceAll('Always include the exact factory model number on your Purchase Order and Commercial Invoice.', 'तुमच्या खरेदी ऑर्डर (PO) आणि व्यावसायिक इनव्हॉइसवर नेहमी फॅक्टरीचा अचूक मॉडेल नंबर लिहा.')
      .replaceAll('Verify model numbers in the physical product against the shipping documents before warehouse acceptance.', 'गोदामात स्वीकारण्यापूर्वी भौतिक उत्पादनावरील मॉडेल नंबर कागदपत्रांशी तपासून घ्या.')
      .replaceAll('If a factory discontinues a model, request the technical spec sheet of the replacement model before accepting it.', 'फॅक्टरीने मॉडेल बंद केल्यास, ते स्वीकारण्यापूर्वी नवीन मॉडेलची तांत्रिक स्पेसिफिकेशन शीट मागा.')

      // MOQ & SKU & Module 2 Common phrases for Marathi (mr)
      .replaceAll('Every product variant must have its own unique SKU.', 'प्रत्येक उत्पादन प्रकारासाठी (Variant) स्वतःचा स्वतंत्र SKU कोड असावा.')
      .replaceAll('Keep SKU consistent across invoice, packing list, and warehouse label.', 'इनव्हॉइस, पॅकिंग लिस्ट आणि वेअरहाऊस लेबलवर SKU नेहमी एकसारखा ठेवा.')
      .replaceAll('Using supplier model numbers as your SKU — create your own internal codes for better control.', 'सप्लायरचा मॉडेल नंबर SKU म्हणून वापरण्याऐवजी स्वतःचे अंतर्गत कोड तयार करा.')
      .replaceAll('Not assigning unique SKUs to each variant (color, size, pack quantity) leading to wrong items being shipped.', 'प्रत्येक प्रकाराला स्वतंत्र SKU न दिल्यास ग्राहकाला चुकीचा माल जाण्याचा धोका असतो.')
      .replaceAll('Using special characters like / or spaces in SKU codes that break inventory software.', 'SKU कोडमध्ये / किंवा रिकामी जागा (Space) वापरल्यास इन्व्हेंटरी सॉफ्टवेअरमध्ये अडचण येऊ शकते.')
      .replaceAll('Build your SKU with a logical structure: CATEGORY-COLOR-SIZE (e.g., BAG-BLK-LRG).', 'तुमचा SKU एका विशिष्ट रचनेत तयार करा: CATEGORY-COLOR-SIZE (उदा. BAG-BLK-LRG).')
      .replaceAll('Never change a SKU once it is in use — it breaks inventory history records.', 'एकदा वापरलेला SKU कधीही बदलू नका — यामुळे इन्व्हेंटरी हिस्ट्री रेकॉर्ड्स खराब होतात.')
      .replaceAll('Use the same SKU on your packing list, invoice, and warehouse label for error-free operations.', 'चूकमुक्त कामासाठी पॅकिंग लिस्ट, इनव्हॉइस आणि वेअरहाऊस लेबलवर समान SKU वापरा.')
      
      .replaceAll('Accepting the first MOQ the supplier quotes without negotiating — always negotiate, factories expect it.', 'सप्लायरने दिलेल्या पहिल्या MOQ चा थेट स्वीकार न करता नेहमी घासाघीस करा; फॅक्टरी मालक याची अपेक्षा धरून असतात.')
      .replaceAll('Ordering huge quantities to meet MOQ without testing product quality or market demand first.', 'उत्पादनाची गुणवत्ता किंवा बाजारातील मागणी न तपासता केवळ MOQ पूर्ण करण्यासाठी मोठी ऑर्डर देणे.')
      .replaceAll('Confusing MOQ (units) with minimum order value (dollar amount) — always clarify which one applies.', 'MOQ (नग) आणि किमान ऑर्डर किंमत (डॉलर मूल्य) यामध्ये गल्लत करणे - नेहमी स्पष्टता मिळवा.')
      .replaceAll('Ask the supplier: "What is your MOQ for a sample order?" — many factories have a separate lower MOQ for first-time buyers.', 'सप्लायरला विचारा: "सॅम्पल ऑर्डरसाठी किमान MOQ काय आहे?" - पहिल्या खरेदीदारासाठी फॅक्टरी कमी MOQ देतात.')
      .replaceAll('If MOQ is too high, find a trading company that buys from the same factory and resells in smaller batches.', 'जर MOQ जास्त असेल, तर त्याच फॅक्टरीमधून लहान प्रमाणात घेऊन विकणारी ट्रेडिंग कंपनी शोधा.')
      .replaceAll('Co-load cargo with another buyer if the supplier agrees to ship under a single invoice.', 'सप्लायर एकाच बिलावर पाठवण्यास तयार असल्यास इतर खरेदीदारासोबत माल एकत्र पाठवा.')
      
      .replaceAll('Supplier model numbers are printed on outer cartons and commercial invoices.', 'सप्लायरचा मॉडेल नंबर मुख्य बॉक्स आणि व्यावसायिक इनव्हॉइसवर छापलेला असतो.')
      .replaceAll('Confusing supplier model numbers with your internal SKU codes.', 'सप्लायरचा मॉडेल नंबर आणि तुमचा अंतर्गत SKU कोड यामध्ये गल्लत करणे.')
      .replaceAll('Assuming two suppliers use the same model number for identical products.', 'दोन भिन्न सप्लायर्स एकाच उत्पादनासाठी समान मॉडेल नंबर वापरतात असे गृहीत धरणे.')
      .replaceAll('Always cross-reference the model number in your purchase order and the proforma invoice before paying.', 'पैसे भरण्यापूर्वी खरेदी ऑर्डर (PO) आणि प्रोफॉर्मा इनव्हॉइसमधील मॉडेल नंबर नेहमी तपासून घ्या.')
      
      .replaceAll('Product specifications must be attached to the Purchase Contract.', 'उत्पादन वैशिष्ट्ये (Specifications) खरेदी करारासोबत जोडलेली असावीत.')
      .replaceAll('Failing to specify material density, thickness, or weight, allowing factory to use cheaper materials.', 'मटेरियलची घनता, जाडी किंवा वजन स्पष्ट न करणे, ज्यामुळे फॅक्टरी हलके मटेरियल वापरू शकते.')
      .replaceAll('Relying on generic verbal descriptions rather than precise measurements.', 'अचूक मापांऐवजी केवळ तोंडी वर्णनावर विश्वास ठेवणे.')
      .replaceAll('Create a detailed Spec Sheet with drawings, tolerances, and certifications, signed by both parties.', 'दोन्ही बाजूंच्या स्वाक्षरीसह तपशीलवार रेखाचित्रे, टॉलरन्स आणि प्रमाणपत्रांची स्पेसिफिकेशन शीट तयार करा.')
      
      .replaceAll('Keep a sealed duplicate sample at your office for final shipment comparison.', 'अंतिम मालाची तुलना करण्यासाठी तुमच्या ऑफिसमध्ये एक सीलबंद नमुना (Duplicate Sample) ठेवा.')
      .replaceAll('Approving bulk production without receiving and physically testing a pre-production sample.', 'प्री-प्रोडक्शन सॅम्पल न मिळवता किंवा त्याचे प्रत्यक्ष परीक्षण न करता मोठ्या उत्पादनास मंजुरी देणे.')
      .replaceAll('Assuming the production batch will perfectly match a sample without quality control checks.', 'क्वालिटी ऑडिट न करता उत्पादनाचा घाऊक बॅच सॅम्पलशी तंतोतंत जुळेल असे मानणे.')
      .replaceAll('Always write notes, sign, and date the approved sample. Send a signed copy back to the factory.', 'मंजूर सॅम्पलवर नेहमी नोंदी लिहा, सही करा आणि तारीख टाका. स्वाक्षरी केलेली एक प्रत फॅक्टरीला पाठवा.')
      
      .replaceAll('OEM stands for Original Equipment Manufacturer.', 'OEM चा अर्थ Original Equipment Manufacturer (ओरिजिनल इक्विपमेंट मॅन्युफॅक्चरर) असा आहे.')
      .replaceAll('Requires registered Trademark authorization before custom logo printing.', 'स्वतःचा लोगो छापण्यापूर्वी नोंदणीकृत ट्रेडमार्कचे अधिकार पत्र आवश्यक आहे.')
      .replaceAll('Failing to register your brand trademark in the manufacturing country, leading to brand hijacking.', 'ज्या देशात उत्पादन होत आहे तिथे ब्रँडची नोंदणी न करणे, ज्यामुळे ब्रँडचे नाव चोरले जाऊ शकते.')
      .replaceAll('Not signing a non-disclosure agreement (NDA) before sending custom designs.', 'स्वतःची डिझाईन पाठवण्यापूर्वी एनडीए (NDA - नॉन डिस्क्लोजर करार) वर स्वाक्षरी न करणे.')
      .replaceAll('Ask the factory for an OEM contract to define mold ownership and design confidentiality.', 'मोल्डची मालकी आणि डिझाईनची गोपनीयता स्पष्ट करण्यासाठी फॅक्टरीकडून OEM करार करून घ्या.')
      
      .replaceAll('ODM stands for Original Design Manufacturer.', 'ODM चा अर्थ Original Design Manufacturer (ओरिजिनल डिझाईन मॅन्युफॅक्चरर) असा आहे.')
      .replaceAll('Assuming you own the design rights of an ODM product.', 'ODM प्रॉडक्टच्या डिझाईन हक्कांचे मालक आपणच आहोत असे गृहीत धरणे.')
      .replaceAll('Failing to customize packaging, making your brand look identical to competitors.', 'पॅकेजिंग सानुकूल (Customize) न करणे, ज्यामुळे तुमचा ब्रँड प्रतिस्पर्ध्यांसारखाच दिसेल.')
      .replaceAll('Request minor changes (like color combinations or logo placement) to differentiate from other buyers.', 'इतर खरेदीदारांपेक्षा वेगळे दिसण्यासाठी लहान बदल (उदा. रंगांचे संयोजन किंवा लोगोची जागा) करण्याची विनंती करा.')
      
      .replaceAll('Private label allows high profit margins without factory investment.', 'प्रायव्हेट लेबल फॅक्टरीमध्ये गुंतवणूक न करता चांगल्या नफ्याची खात्री देते.')
      .replaceAll('Failing to inspect the generic factory product quality before branding it.', 'ब्रँडिंग करण्यापूर्वी मूळ उत्पादनाच्या गुणवत्तेची खात्री न करणे.')
      .replaceAll('Not verifying trademark availability in your target market before launch.', 'लाँच करण्यापूर्वी तुमच्या लक्ष्य बाजारात ट्रेडमार्क उपलब्धतेची खात्री न करणे.')
      .replaceAll('Invest in high-quality custom packaging (boxes, labels, tags) to create a premium brand image.', 'उत्कृष्ट ब्रँड इमेज तयार करण्यासाठी चांगल्या दर्जाच्या कस्टमाईझ पॅकेजिंगवर भर द्या.')
      
      .replaceAll('A registered trademark protects your brand from local copycats.', 'नोंदणीकृत ट्रेडमार्क तुमच्या ब्रँडला नक्कल करणाऱ्या स्थानिक लोकांपासून वाचवतो.')
      .replaceAll('Selling goods under an unregistered brand name in foreign markets.', 'परदेशी बाजारपेठेत ब्रँड नोंदणी न करता मालाची विक्री करणे.')
      .replaceAll('Apply for trademark registration early in your business cycle to secure legal rights.', 'कायदेशीर हक्क सुरक्षित करण्यासाठी व्यवसायाच्या सुरुवातीलाच ट्रेडमार्क नोंदणीसाठी अर्ज करा.')
      
      .replaceAll('Export cartons must have clear shipping marks, weight, and country of origin.', 'निर्यात कार्टनवर स्पष्ट शिपिंग मार्क्स, वजन आणि मूळ देशाचे नाव असणे बंधनकारक आहे.')
      .replaceAll('Using thin, single-wall cardboard boxes for heavy sea shipments, leading to crushed cartons.', 'सागरी वाहतुकीसाठी पातळ, एकेरी थर असणारे बॉक्स वापरल्याने कार्टन चेपले जाऊ शकतात.')
      .replaceAll('Failing to specify waterproof liners or moisture-absorbing silica gel bags inside cartons.', 'बॉक्सच्या आत वॉटरप्रूफ लायनर किंवा ओलावा शोषून घेणाऱ्या सिलिका जेल पिशव्यांचे निर्देश न देणे.')
      .replaceAll('Always specify double-wall corrugated cartons (5-ply or 7-ply) and plastic strapping bands.', 'नेहमी दुहेरी थर असणारे पुठ्ठ्याचे बॉक्स (५-प्लाय किंवा ७-प्लाय) आणि प्लास्टिक पट्ट्यांचे निर्देश द्या.')

      // Specific Weight / Container / Doc definitions
      .replaceAll('Gross Weight is the total weight of a shipment including the actual product, inner packaging, protective foam, export master cartons, and pallets. Formula: Gross Weight = Net Weight + Packaging Weight + Pallet Weight.',
        'ग्रॉस वेट (Gross Weight) म्हणजे संपूर्ण मालाचे (उत्पादन, पॅकेजिंग, कार्टन आणि पॅलेटसह) एकूण वजन होय. सूत्र: Gross Weight = Net Weight + Packaging Weight + Pallet Weight.')
      .replaceAll('Gross Weight determines ocean freight charges, air cargo billing, container payload safety limits, and road weight laws. Falsifying Gross Weight leads to port detention, vessel instability risks, and heavy customs fines.',
        'ग्रॉस वेट सागरी मालवाहतूक दर, हवाई कार्गो बिलिंग, कंटेनर क्षमता आणि वाहतूक नियम ठरवते. ग्रॉस वेट चुकीचे लिहिल्यास मोठा दंड किंवा जप्ती होऊ शकते.')
      .replaceAll('Gross Weight is the complete weight of cargo including all protective packaging materials and pallets. It is used by shipping lines for weight verification (VGM - Verified Gross Mass) under SOLAS regulations.',
        'ग्रॉस वेट म्हणजे सर्व पॅकेजिंग आणि पॅलेटसह एकूण वजन. याचा उपयोग शिपिंग लाईन्सद्वारे वजन पडताळणी (VGM) साठी केला जातो.')
      
      .replaceAll('Net Weight is the actual weight of the product/goods alone, excluding all inner boxes, protective bubble wrap, master cartons, and pallets. Formula: Net Weight = Gross Weight - Packaging Weight.',
        'नेट वेट (Net Weight) म्हणजे पॅकेजिंग आणि कार्टन वगळता केवळ उत्पादनाचे निव्वळ व वजन होय. सूत्र: Net Weight = Gross Weight - Packaging Weight.')
      .replaceAll('Net Weight is used by customs authorities to calculate weight-based import duties for commodities (e.g., metals, food, chemicals) and by buyers to verify exact product yield received.',
        'नेट वेटचा उपयोग कस्टम्स ड्युटी मोजण्यासाठी आणि खरेदीदारांद्वारे उत्पादनाची अचूक मात्रा तपासण्यासाठी केला जातो.')
      .replaceAll('Net Weight is the net mass of the product without any packaging. It represents the actual product quantity purchased and is declared on Commercial Invoices and Bills of Entry.',
        'नेट वेट म्हणजे पॅकिंग नसलेले निव्वळ वजन, जे व्यावसायिक इनव्हॉइस आणि बिल ऑफ एंट्रीवर घोषित केले जाते.')

      .replaceAll('Volume Weight (Dimensional Weight / Volumetric Weight) is a pricing formula used by airlines and courier companies (DHL, FedEx) to charge freight for bulky but lightweight cargo. Formula: Volume Weight (kg) = (Length × Width × Height in cm) ÷ 6,000 (or ÷ 5,000 for express courier).',
        'वॉल्यूम वेट हे विमान आणि कुरिअर कंपन्यांद्वारे वजनाने हलक्या पण आकाराने मोठ्या मालासाठी भाडे ठरवण्याचे सूत्र आहे. सूत्र: Volume Weight (kg) = (लांबी × रुंदी × उंची सेमीमध्ये) ÷ ६,०००.')
      .replaceAll('Freight carriers charge based on Chargeable Weight = Max(Actual Gross Weight, Volume Weight). If you ship lightweight large items (like pillows or plastic toys), you pay based on Volume Weight.',
        'वाहतूक कंपन्या चार्ज करण्यायोग्य वजन = Max(ग्रॉस वेट, वॉल्यूम वेट) यावर भाडे आकारतात. माल हलका आणि मोठा असल्यास भाडे वॉल्यूम वेटवर ठरते.')

      // Dynamic Module fallbacks for Mod-3 to Mod-15
      .replaceAll(`${title} is a critical weight and measurement standard in cargo logistics. It dictates cargo density, space allocation, container loading capacity, and freight cost billing for sea and air transport.`,
        `${title} हे कार्गो लॉजिस्टिक्समधील वजन आणि मोजमापाचे महत्त्वाचे प्रमाण आहे. हे समुद्री आणि हवाई वाहतुकीसाठी कार्गोची घनता, जागा आणि मालवाहतूक भाडे ठरवते.`)
      .replaceAll(`Accurately computing ${title} prevents freight overcharges, container overloading penalties, vessel stability risks, and customs clearance delays at origin and destination ports.`,
        `${title} ची अचूक गणना केल्यास जादा भाडे, ओव्हरलोडिंग दंड, जहाजाची अस्थिरता आणि कस्टम्स क्लिअरन्स मधील विलंब टाळता येतो.`)
      
      .replaceAll(`${title} is an essential container transport concept defining container utilization, loading method, and cargo security protocols during ocean freight.`,
        `${title} ही समुद्री मालवाहतुकी दरम्यान कंटेनरचा वापर, लोडिंग पद्धत आणि कार्गो सुरक्षा नियम निश्चित करणारी संकल्पना आहे.`)
      .replaceAll(`Choosing the right container strategy (${title}) optimizes ocean freight rates, protects goods against transit damage, and ensures smooth port operations.`,
        `योग्य कंटेनर नियोजन (${title}) निवडल्याने मालवाहतूक खर्च कमी होतो, मालाचे नुकसान टळते आणि बंदरातील कामे वेगाने होतात.`)
      
      .replaceAll(`${title} represents a core maritime and air freight shipping term governing vessel schedules, transit times, carrier bookings, and freight movement.`,
        `${title} ही जहाजाचे वेळापत्रक, वाहतुकीचा वेळ, बुकिंग आणि मालाची हालचाल नियंत्रित करणारी महत्त्वाची शिफिंग संज्ञा आहे.`)
      .replaceAll(`Understanding ${title} enables importers to track cargo milestones, plan inventory arrival schedules, and avoid unexpected port demurrage or transit delays.`,
        `${title} समजून घेतल्याने आयातदारांना कार्गोचे लोकेशन ट्रॅक करणे, मालाच्या आगमनाचे नियोजन करणे आणि विलंब शुल्क टाळणे सोपे जाते.`)
      
      .replaceAll(`${title} is an official Incoterm (International Commercial Term) published by the ICC defining the exact point of risk transfer, cost allocation, and division of responsibilities between seller and buyer.`,
        `${title} हा आयसीसी (ICC) द्वारे प्रकाशित अधिकृत इन्कोटर्म आहे जो विक्रेता आणि खरेदीदार यांच्यातील जोखीम आणि खर्चाची विभागणी स्पष्ट करतो.`)
      .replaceAll(`${title} clearly establishes who pays ocean freight, who purchases marine insurance, and who handles export/import customs clearance, preventing costly legal disputes.`,
        `${title} स्पष्ट करतो की समुद्री भाडे कोण भरणार, विमा कोण घेणार आणि कस्टम्स क्लिअरन्स कोण करणार, ज्यामुळे कायदेशीर वाद टळतात.`)
      
      .replaceAll(`${title} is a key port and infrastructure concept in international trade, facilitating cargo handling, inland transit, warehousing, and customs clearance.`,
        `${title} ही आंतरराष्ट्रीय व्यापारातील पोर्ट आणि पायाभूत सुविधांची संकल्पना आहे, जी कार्गो हाताळणी, साठवणूक आणि कस्टम्स क्लिअरन्स सुलभ करते.`)
      .replaceAll(`Proper utilization of ${title} infrastructure speeds up cargo movement, reduces port dwell time, and avoids costly demurrage and detention charges.`,
        `${title} सुविधांचा योग्य वापर मालाची वाहतूक जलद करतो, बंदरातील वेळ वाचवतो आणि विलंब शुल्क टाळण्यास मदत करतो.`)
      
      .replaceAll(`${title} is a critical trade document required for legal compliance, customs clearance, foreign exchange settlement, and title of ownership in international trade.`,
        `${title} हे कायदेशीर अनुपालन, कस्टम्स क्लिअरन्स आणि मालकी हक्कासाठी आंतरराष्ट्रीय व्यापारात आवश्यक असणारे महत्त्वाचे दस्तऐवज आहे.`)
      .replaceAll(`Without an accurate ${title}, customs authorities cannot assess duty or clear shipments, leading to container holds, port fines, and payment delays.`,
        `अचूक ${title} नसल्यास कस्टम्स अधिकारी माल सोडत नाहीत, ज्यामुळे कंटेनर रोखला जाऊ शकतो, दंड होऊ शकतो आणि पेमेंटला विलंब होतो.`)
      
      .replaceAll(`${title} is a statutory customs regulation, tariff classification, or compliance requirement governing import duties, taxes, and entry clearance.`,
        `${title} हा आयात शुल्क, कर आणि मंजुरी नियंत्रित करणारा सीमाशुल्क नियम किंवा दर वर्गीकरण आहे.`)
      .replaceAll(`Strict compliance with ${title} ensures smooth customs release, prevents heavy penalty duties, avoids cargo confiscation, and ensures legal import entry.`,
        `${title} चे काटेकोर पालन केल्यास कस्टम्स क्लिअरन्स सुरळीत होते, मोठा दंड टळतो, माल जप्तीची जोखीम वाचते आणि कायदेशीर आयात होते.`)
      
      .replaceAll(`${title} is a standard international financial payment mechanism governing trade settlement, credit risk management, and banking transfers.`,
        `${title} ही व्यापार सेटलमेंट, पत जोखीम व्यवस्थापन आणि बँकिंग व्यवहारांचे नियंत्रण करणारी प्रमाणित आंतरराष्ट्रीय पेमेंट पद्धती आहे.`)
      .replaceAll(`Using appropriate ${title} protects buyer and seller against payment default, currency fluctuations, and non-delivery of goods.`,
        `योग्य ${title} चा वापर केल्याने खरेदीदार आणि विक्रेता पेमेंट चुकवणे, चलनातील चढ-उतार आणि माल न मिळणे यापासून सुरक्षित राहतात.`)
      
      .replaceAll(`${title} refers to specific freight, terminal, or port handling fee charged by shipping lines, port authorities, and forwarders during cargo movement.`,
        `${title} म्हणजे मालवाहतुकी दरम्यान शिपिंग लाईन्स, पोर्ट ऑथोरिटी आणि फॉरवर्डर्सद्वारे आकारले जाणारे विशिष्ट टर्मिनल हाताळणी किंवा पोर्ट शुल्क होय.`)
      .replaceAll(`Tracking ${title} prevents unexpected landed cost inflation and helps importers negotiate competitive all-inclusive freight quotes.`,
        `${title} चा मागोवा घेतल्यास अचानक लँडेड कॉस्ट वाढणे टळते आणि आयातदारांना वाजवी वाहतूक दरांसाठी बोलणी करणे सोपे जाते.`)
      
      .replaceAll(`${title} is a formal quality control procedure, defect inspection method, or compliance standard ensuring manufactured goods meet required specifications.`,
        `${title} ही उत्पादित मालाची गुणवत्ता आणि मानके तपासण्याची अधिकृत गुणवत्ता नियंत्रण किंवा दोष तपासणी पद्धत आहे.`)
      .replaceAll(`Implementing ${title} prevents receiving defective or non-compliant goods, protecting brand reputation and avoiding costly product recalls.`,
        `${title} लागू केल्याने दोषपूर्ण किंवा निकृष्ट दर्जाचा माल येणे टळते, ज्यामुळे ब्रँडची पत सुरक्षित राहते.`)
      
      .replaceAll(`${title} is a core operational process in international business workflows, governing order processing, quotation, production tracking, and order fulfillment.`,
        `${title} ही आंतरराष्ट्रीय व्यापारातील एक मुख्य परिचालन प्रक्रिया आहे, जी ऑर्डर प्रक्रिया, कोटेशन, उत्पादन ट्रॅकिंग आणि ऑर्डर पूर्ण करणे नियंत्रित करते.`)
      .replaceAll(`Streamlining ${title} ensures timely production execution, clear supplier communication, and reliable product delivery schedules.`,
        `${title} सुव्यवस्थित केल्याने वेळेवर उत्पादन, सप्लायरशी स्पष्ट संवाद आणि उत्पादनाची खात्रीशीर डिलिव्हरी शक्य होते.`)
      
      .replaceAll(`${title} is a key risk management protocol, insurance provision, or legal remedy designed to mitigate trade losses, transit damage, and contract breaches.`,
        `${title} हा व्यापारातील नुकसान, संक्रमण काळातील हानी आणि कराराचा भंग कमी करण्यासाठी डिझाइन केलेला प्रमुख जोखीम व्यवस्थापन प्रोटोकॉल किंवा विमा आहे.`)
      .replaceAll(`Effective ${title} management protects business capital against unexpected maritime losses, shipment delays, and supplier default.`,
        `${title} चे प्रभावी व्यवस्थापन अचानक होणारे नुकसान, विलंबाचा धोका आणि सप्लायरने पेमेंट बुडवणे यापासून व्यावसायिक भांडवलाचे संरक्षण करते.`)
      
      .replaceAll(`${title} is a specialized internal operational workflow at RBC designed to ensure quality control, supplier verification, and seamless import execution.`,
        `${title} हा गुणवत्ता नियंत्रण, सप्लायर पडताळणी आणि सुरळीत आयात प्रक्रिया सुनिश्चित करण्यासाठी आरबीसी मधील अंतर्गत परिचालन कार्यप्रवाह आहे.`)
      .replaceAll(`Following the ${title} procedure guarantees operational consistency, risk mitigation, and high customer satisfaction across all trade transactions.`,
        `${title} प्रक्रियेचे पालन केल्याने सर्व व्यवहारांमध्ये सुसंगतता, जोखीम नियंत्रण आणि ग्राहकांचे पूर्ण समाधान सुनिश्चित होते.`)

      .replaceAll(`RBC verifies every detail on the ${title} (buyer name, invoice number, HSN codes, weights) before submitting it to customs brokers and banking channels.`,
        `आरबीसी कस्टम्स ब्रोकर्स आणि बँकिंग चॅनेलकडे सुपूर्द करण्यापूर्वी ${title} वरील प्रत्येक तपशील (खरेदीदाराचे नाव, इनव्हॉइस नंबर, HSN कोड, वजन) सत्यापित करते.`)
      .replaceAll(`RBC imports cargo under precise ${title} parameters, coordinating with freight forwarders to verify gross mass certificates (VGM) and optimize container space utilization.`,
        `आरबीसी अचूक ${title} निकषांनुसार माल आयात करते, ग्रॉस वजन प्रमाणपत्रे सत्यापित करण्यासाठी आणि जागा वाचवण्यासाठी फ्रेट फॉरवर्डरशी समन्वय साधते.`)
      .replaceAll(`RBC plans container logistics using ${title} standards, selecting the appropriate container size and seal specifications to safely transport goods from overseas suppliers.`,
        `आरबीसी ${title} मानकांचा वापर करून कंटेनर लॉजिस्टिक्सचे नियोजन करते, योग्य कंटेनर आकार आणि सीलचे तपशील निवडते.`)
      .replaceAll(`RBC monitors ${title} status on international tracking portals to coordinate destination customs clearance and warehouse receiving schedules.`,
        `आरबीसी कस्टम्स क्लिअरन्स आणि वेअरहाऊस प्राप्त करण्याच्या वेळापत्रकाचा समन्वय साधण्यासाठी आंतरराष्ट्रीय ट्रॅकिंग पोर्टलवर ${title} स्थितीवर लक्ष ठेवते.`)
      .replaceAll(`RBC negotiates contracts under ${title} terms, ensuring clear agreement on shipping costs, freight insurance coverage, and customs duty responsibilities.`,
        `आरबीसी ${title} अटींनुसार कराराची बोलणी करते, जेणेकरून वाहतूक खर्च, विमा आणि कस्टम्स जबाबदाऱ्यांवर स्पष्ट करार सुनिश्चित होईल.`)
      .replaceAll(`RBC routes imported containers through designated ${title} facilities for efficient customs inspection, container de-stuffing, and final door delivery.`,
        `आरबीसी कार्यक्षम कस्टम्स तपासणी, कंटेनर अनलोडिंग आणि अंतिम डिलिव्हरीसाठी नियुक्त केलेल्या ${title} सुविधेचा वापर करते.`)
      .replaceAll(`RBC consults licensed CHA brokers to verify ${title} duty rates, applicable cesses (BCD, SWS, IGST), and mandatory regulatory approvals before importing.`,
        `आरबीसी आयात करण्यापूर्वी ड्युटी दर, इतर कर (BCD, SWS, IGST) आणि सरकारी मंजुरीची पडताळणी करण्यासाठी परवानाधारक CHA ब्रोकरचा सल्ला घेते.`)
      .replaceAll(`RBC executes financial transactions using ${title} protocols, ensuring secure fund transfers through SWIFT banking channels upon document verification.`,
        `आरबीसी दस्तऐवज पडताळणीवर बँक स्विफ्ट (SWIFT) चॅनेलद्वारे सुरक्षित पैसे पाठवण्यासाठी ${title} नियमांचा वापर करते.`)
      .replaceAll(`RBC audits all freight invoices against agreed rate cards to verify ${title} items before approving payment to logistics providers.`,
        `आरबीसी पेमेंट मंजूर करण्यापूर्वी ${title} खर्चाची खात्री करण्यासाठी सर्व ट्रान्सपोर्ट बिलांचे ऑडिट करते.`)
      .replaceAll(`RBC hires certified third-party inspection agencies to perform ${title} at the supplier factory before approving final balance payment.`,
        `आरबीसी अंतिम पेमेंट मंजूर करण्यापूर्वी सप्लायर फॅक्टरीमध्ये ${title} तपासणी करण्यासाठी प्रमाणित थर्ड-पार्टी एजन्सीची मदत घेते.`)
      .replaceAll(`RBC tracks ${title} milestones in its ERP software to maintain real-time visibility over supplier order status and customer delivery commitments.`,
        `आरबीसी सप्लायर ऑर्डर्स आणि डिलिव्हरी वेळेवर होण्यासाठी तिच्या ERP सॉफ्टवेअरमध्ये ${title} प्रगतीचा मागोवा घेते.`)
      .replaceAll(`RBC manages trade risks by implementing ${title} measures, purchasing comprehensive cargo insurance, and enforcing clear contract terms.`,
        `आरबीसी ${title} उपाय लागू करून, विमा खरेदी करून आणि स्पष्ट कराराच्या अटींद्वारे व्यापारी जोखमींचे व्यवस्थापन करते.`)
      .replaceAll(`RBC team members execute ${title} according to standard operating procedures, ensuring every step from supplier check to delivery is audited.`,
        `आरबीसी टीमचे सदस्य मानक ऑपरेटिंग पद्धतीनुसार ${title} ऑपरेशन्स पूर्ण करतात, जेणेकरून सप्लायर तपासणीपासून डिलिव्हरीपर्यंतच्या प्रत्येक टप्प्याचे ऑडिट केले जाईल.`)

      // Common phrase fallbacks
      .replaceAll('Always check local compliance guides for', 'नेहीम स्थानिक कायदे आणि नियमांची मार्गदर्शिका तपासा -')
      .replaceAll('Always double-check outer carton dimensions and total scale weight before signing the final Packing List and VGM declaration.',
        'अंतिम पॅकिंग लिस्ट आणि VGM वजन स्वाक्षरी करण्यापूर्वी नेहमी कार्टनचे आकारमान आणि एकूण वजनाची दोबारा तपासणी करा.')
      .replaceAll('Inspect container floor integrity, door seal gaskets, and bolt seal numbers before signing container loading reports.',
        'कंटेनर लोडिंग अहवालावर सही करण्यापूर्वी नेहमी कंटेनरचा मजला, दरवाजाची रबर सील आणि बोल्ट सील क्रमांकाची तपासणी करा.')
      .replaceAll('Request regular milestone updates (ETD, ETA, transshipment logs) from your freight forwarder to manage supply chain expectations.',
        'वाहतूक नियोजनासाठी आपल्या फ्रेट फॉरवर्डरकडून नियमित ट्रॅकिंग माहिती (ETD, ETA) मागवून घ्या.')
      .replaceAll('Always specify the exact named port or place alongside', 'नेहमी अचूक बंदराचे नाव किंवा ठिकाणाचा उल्लेख करा -')
      .replaceAll('Ensure descriptions, values, HSN codes, and party names match identically across all trade documents',
        'सर्व व्यावसायिक कागदपत्रांवर वर्णन, किंमत, HSN कोड आणि पक्षांची नावे अचूक जुळली पाहिजेत -')
      .replaceAll('Verify HSN code classification and duty structure under current customs tariff schedules before placing import orders.',
        'आयात ऑर्डर देण्यापूर्वी चालू सीमा शुल्क वेळापत्रकानुसार HSN कोड आणि आयात शुल्क दराची खात्री करा.')
      .replaceAll('Always use audited corporate bank accounts and verified bank SWIFT codes for',
        'नेहमी बँकेचा स्विफ्ट (SWIFT) कोड आणि ऑडिट केलेल्या व्यावसायिक खात्याचाच वापर करा -')
      .replaceAll('Request an itemized break-up of all origin and destination', 'नेहमी मूळ आणि अंतिम बंदरावरील शुल्काचे सविस्तर वर्गीकरण मागा -')
      .replaceAll('Define acceptable quality limits (AQL) and defect criteria in writing within your Purchase Order before production starts.',
        'उत्पादन सुरू होण्यापूर्वी खरेदी ऑर्डरमध्ये (PO) स्वीकार्य गुणवत्ता मर्यादा (AQL) आणि त्रुटींचे निकष लेखी स्वरूपात ठरवा.')
      .replaceAll('Confirm all terms (pricing, lead time, specs, terms) in writing during', 'सर्व अटी व शर्ती लेखी स्वरूपात निश्चित करा -')
      .replaceAll('Document cargo damage or shortages immediately with photos and written notices to carriers upon container opening.',
        'कंटेनर उघडताच मालाच्या नुकसानीची किंवा कमतरतेची त्वरित छायाचित्रे काढून शिपिंग कंपनीला लेखी कळवा.')
      .replaceAll('Complete all required checklist items in', 'नेहमी आवश्यक चेकलिस्ट पूर्ण करा -');
  }

  return translated;
};

// Translate Module Title dynamic helper
export const translateModuleTitle = (
  title: string,
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  if (lang === 'en') return title;
  return moduleTitleTranslations[lang]?.[title] || title;
};

// Translate Module Description dynamic helper
export const translateModuleDescription = (
  desc: string,
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  if (lang === 'en') return desc;
  return moduleDescriptionTranslations[lang]?.[desc] || desc;
};

// Master translator utility for lesson objects

// Helper to translate Lesson Titles across languages
export const translateLessonTitle = (
  title: string,
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  if (lang === 'en') return title;
  const dict: Record<string, Record<string, string>> = {"hi":{"What is Import?":"आयात (Import) क्या है?","What is Export?":"निर्यात (Export) क्या है?","What is International Trade?":"अंतरराष्ट्रीय व्यापार (International Trade) क्या है?","What is Supplier?":"सप्लायर (Supplier) कौन है?","What is Buyer?":"बायर (Buyer) कौन है?","What is Manufacturer?":"मैन्युफैक्चरर (Manufacturer) कौन है?","What is Trading Company?":"ट्रेडिंग कंपनी (Trading Company) क्या है?","What is Factory?":"फैक्ट्री (Factory) क्या है?","What is Wholesaler?":"होलसेलर (Wholesaler) कौन है?","What is Retailer?":"रिटेलर (Retailer) कौन है?","MOQ":"MOQ (न्यूनतम ऑर्डर मात्रा)","SKU":"SKU (स्टॉक कीपिंग यूनिट)","Model Number":"मॉडल नंबर (Model Number)","Product Specification":"प्रोडक्ट स्पेसिफिकेशन (Product Spec)","Product Sample":"प्रोडक्ट सैंपल (Product Sample)","OEM":"OEM (ओरिजिनल इक्विपमेंट मैन्युफैक्चरर)","ODM":"ODM (ओरिजिनल डिजाइन मैन्युफैक्चरर)","Private Label":"प्राइवेट लेबल (Private Label)","Brand":"ब्रांड (Brand)","Packaging":"पैकिंग (Packaging)","CBM":"CBM (क्यूबिक मीटर - वॉल्यूम)","Gross Weight":"ग्रॉस वेट (Gross Weight - कुल वजन)","Net Weight":"नेट वेट (Net Weight - शुद्ध वजन)","Volume Weight":"वॉल्यूम वेट (Volume Weight - आयतन वजन)","Carton Size":"कार्टन साइज (Carton Size - डिब्बे का माप)","Master Carton":"मास्टर कार्टन (Master Carton - मुख्य डिब्बा)","Pallet":"पैलेट (Pallet - लकड़ी/प्लास्टिक बेस)","Loading Capacity":"लोडिंग कैपेसिटी (Loading Capacity)","FCL":"FCL (फुल कंटेनर लोड)","LCL":"LCL (लेस दैन कंटेनर लोड)","20FT Container":"20FT कंटेनर (20 फीट मानक कंटेनर)","40FT Container":"40FT कंटेनर (40 फीट मानक कंटेनर)","40HQ Container":"40HQ कंटेनर (40 फीट हाई क्यूब)","Stuffing":"स्टफिंग (Stuffing - कंटेनर लोडिंग)","De-Stuffing":"डी-स्टफिंग (De-Stuffing - अनलोडिंग)","Container Planning":"कंटेनर प्लानिंग (Container Planning)","Container Loading":"कंटेनर लोडिंग (Container Loading)","Container Seal":"कंटेनर सील (Container Seal - सुरक्षा सील)","Freight":"फ्रेट (Freight - माल ढुलाई भाड़ा)","Sea Freight":"सी फ्रेट (Sea Freight - समुद्री भाड़ा)","Air Freight":"एयर फ्रेट (Air Freight - हवाई भाड़ा)","Courier Shipment":"कूरियर शिपमेंट (Courier Shipment)","Transit Time":"ट्रांजिट टाइम (Transit Time - यात्रा का समय)","ETD":"ETD (अनुमानित प्रस्थान समय)","ETA":"ETA (अनुमानित आगमन समय)","Vessel":"वेसल (Vessel - मालवाहक जहाज)","Voyage":"वॉयेज (Voyage - समुद्री यात्रा)","Mother Vessel":"मदर वेसल (Mother Vessel - मुख्य बड़ा जहाज)","Feeder Vessel":"फीडर वेसल (Feeder Vessel - छोटा जहाज)","EXW":"EXW (एक्स वर्क्स)","FOB":"FOB (फ्री ऑन बोर्ड)","FCA":"FCA (फ्री कैरियर)","CIF":"CIF (कॉस्ट, इंश्योरेंस एंड फ्रेट)","CFR":"CFR (कॉस्ट एंड फ्रेट)","DDP":"DDP (डिलीवर्ड ड्यूटी पेड)","DAP":"DAP (डिलीवर्ड एट प्लेस)","CIP":"CIP (कैरिज एंड इंश्योरेंस पेड)","CPT":"CPT (कैरिज पेड टू)","POL":"POL (लोडिंग पोर्ट)","POD":"POD (डिस्चार्ज पोर्ट)","ICD":"ICD (ड्राई पोर्ट / इनलैंड डिपो)","CFS":"CFS (कंटेनर फ्रेट स्टेशन)","Warehouse":"वेयरहाउस (Warehouse - गोदाम)","Bonded Warehouse":"बॉन्डेड वेयरहाउस (Customs Controlled)","Last Mile Delivery":"लास्ट माइल डिलीवरी (ग्राहक तक)","Door Delivery":"डोर डिलीवरी (डोरस्टेप)","Proforma Invoice":"प्रोफॉर्मर्मा इनवॉइस (Proforma Invoice)","Commercial Invoice":"कमर्शियल इनवॉइस (Commercial Invoice)","Packing List":"पैकिंग लिस्ट (Packing List)","Bill of Lading":"बिल ऑफ लेडिंग (Bill of Lading - B/L)","Air Way Bill":"एयर वे बिल (Air Way Bill - AWB)","Delivery Order":"डिलीवरी ऑर्डर (Delivery Order - DO)","Shipping Bill":"शिपिंग बिल (Shipping Bill)","Bill of Entry":"बिल ऑफ एंट्री (Bill of Entry - BOE)","Certificate of Origin":"सर्टिफिकेट ऑफ ओरिजिन (Origin Cert)","Insurance Certificate":"इंश्योरेंस सर्टिफिकेट (Insurance)","Fumigation Certificate":"फ्यूमिगेशन सर्टिफिकेट (Fumigation)","Inspection Certificate":"इंस्पेक्शन सर्टिफिकेट (Inspection)","Customs":"कस्टम्स (Customs - सीमा शुल्क)","Customs Clearance":"कस्टम्स क्लीयरेंस (Customs Clearance)","CHA":"CHA (कस्टम हाउस एजेंट)","HSN Code":"HSN कोड (HSN Code - प्रोडक्ट कोड)","Customs Duty":"कस्टम्स ड्यूटी (Customs Duty)","BCD":"BCD (बेसिक कस्टम्स ड्यूटी)","SWS":"SWS (सोशल वेलफेयर सरचार्ज)","IGST":"IGST (इंटीग्रेटेड जीएसटी)","Anti-Dumping Duty":"एंटी-डंपिंग ड्यूटी (Anti-Dumping)","BIS":"BIS (ब्यूरो ऑफ इंडियन स्टैंडर्ड्स)","CDSCO":"CDSCO (मेडिकल / कॉस्मेटिक रेगुलेटर)","FSSAI":"FSSAI (फूड सेफ्टी अथॉरिटी)","Advance Payment":"अग्रिम भुगतान (Advance Payment)","Balance Payment":"शेष भुगतान (Balance Payment)","Letter of Credit":"लेटर ऑफ क्रेडिट (Letter of Credit - LC)","TT Payment":"TT पेमेंट (Telegraphic Transfer)","Telegraphic Transfer":"टेलीग्राफिक ट्रांसफर (Bank Wire)","SWIFT":"SWIFT (बैंक स्विफ्ट नेटवर्क)","Bank Charges":"बैंक शुल्क (Bank Charges)","Currency Exchange":"मुद्रा विनिमय (Currency Exchange)"},"gu":{"What is Import?":"આયાત (Import) શું છે?","What is Export?":"નિકાસ (Export) શું છે?","What is International Trade?":"આંતરરાષ્ટ્રીય વેપાર (International Trade) શું છે?","What is Supplier?":"સપ્લાયર (Supplier) કોણ છે?","What is Buyer?":"બાયર (Buyer) કોણ છે?","What is Manufacturer?":"મેન્યુફેક્ચરર (Manufacturer) કોણ છે?","What is Trading Company?":"ટ્રેડિંગ કંપની (Trading Company) શું છે?","What is Factory?":"ફેક્ટરી (Factory) શું છે?","What is Wholesaler?":"જથ્થાબંધ વેપારી (Wholesaler) કોણ છે?","What is Retailer?":"છૂટક વેપારી (Retailer) કોણ છે?","MOQ":"MOQ (કિમાન ઓર્ડર જથ્થો)","SKU":"SKU (સ્ટોક કીપિંગ યુનિટ)","Model Number":"મોડેલ નંબર (Model Number)","Product Specification":"પ્રોડક્ટ સ્પેસિફિકેશન (Product Spec)","Product Sample":"પ્રોડક્ટ સેમ્પલ (Product Sample)","OEM":"OEM (ઓરિજિનલ ઇક્વિપમેન્ટ મેન્યુફેક્ચરર)","ODM":"ODM (ઓરિજિનલ ડિઝાઈન મેન્યુફેક્ચરર)","Private Label":"પ્રાઇવેટ લેબલ (Private Label)","Brand":"બ્રાન્ડ (Brand)","Packaging":"પેકિંગ (Packaging)","CBM":"CBM (ક્યુબિક મીટર - વોલ્યુમ)","Gross Weight":"ગ્રોસ વેટ (Gross Weight - કુલ વજન)","Net Weight":"નેટ વેટ (Net Weight - શુદ્ધ વજન)","Volume Weight":"વોલ્યુમ વેટ (Volume Weight - કદ વજન)","Carton Size":"કાર્ટન સાઈઝ (Carton Size - બોક્સ માપ)","Master Carton":"માસ્ટર કાર્ટન (Master Carton - બોક્સ)","Pallet":"પેલેટ (Pallet - બેઝ)","Loading Capacity":"લોડિંગ ક્ષમતા (Loading Capacity)","FCL":"FCL (ફુલ કન્ટેનર લોડ)","LCL":"LCL (લેસ ધેન કન્ટેનર લોડ)","20FT Container":"20FT કન્ટેનર (20 ફીટ સ્ટાન્ડર્ડ)","40FT Container":"40FT કન્ટેનર (40 ફીટ સ્ટાન્ડર્ડ)","40HQ Container":"40HQ કન્ટેનર (40 ફીટ હાઇ ક્યુબ)","Stuffing":"સ્ટફિંગ (Stuffing - કન્ટેનર લોડિંગ)","De-Stuffing":"ડી-સ્ટફિંગ (De-Stuffing - અનલોડિંગ)","Container Planning":"કન્ટેનર પ્લાનિંગ (Container Planning)","Container Loading":"કન્ટેનર લોડિંગ (Container Loading)","Container Seal":"કન્ટેનર સીલ (Container Seal - સીલ)"},"mr":{"What is Import?":"आयात (Import) म्हणजे काय?","What is Export?":"निर्यात (Export) म्हणजे काय?","What is International Trade?":"आंतरराष्ट्रीय व्यापार म्हणजे काय?","What is Supplier?":"सप्लायर (Supplier) कोण असतो?","What is Buyer?":"बायर (Buyer) कोण असतो?","What is Manufacturer?":"उत्पादक (Manufacturer) कोण असतो?","What is Trading Company?":"ट्रेडिंग कंपनी म्हणजे काय?","What is Factory?":"फॅक्टरी (Factory) म्हणजे काय?","What is Wholesaler?":"घाऊक व्यापारी (Wholesaler) कोण असतो?","What is Retailer?":"કિરકોળ વિક્રેતા (Retailer) कोण असतो?","MOQ":"MOQ (किमान ऑर्डर प्रमाण)","SKU":"SKU (સ્ટોક કીપિંગ યુનિટ)","CBM":"CBM (ક્યુબિક મીટર - आकारमान)","Gross Weight":"ગ્રોસ વેટ (Gross Weight - एकूण वजन)","Net Weight":"નેટ વેટ (Net Weight - निव्वळ वजन)","FCL":"FCL (ફુલ કન્ટેનર લોડ)","LCL":"LCL (લેસ ધેન કન્ટેનર લોડ)","20FT Container":"20FT કન્ટેનર (20 ફીટ માનક)","40FT Container":"40FT કન્ટેનર (40 ફીટ માનક)","40HQ Container":"40HQ કન્ટેનર (40 ફીટ હાઇ ક્યુબ)","Stuffing":"સ્ટફિંગ (Stuffing - कंटेनर भरणे)","De-Stuffing":"ડી-સ્ટફિંગ (De-Stuffing - रिकामे करणे)","Container Planning":"કન્ટેનર પ્લાનિંગ (Container Planning)","Container Loading":"કન્ટેનર લોડિંગ (Container Loading)","Container Seal":"કન્ટેનર સીલ (Container Seal - सुरक्षा सील)"}};
  return dict[lang]?.[title] || moduleTitleTranslations[lang]?.[title] || title;
};

export const getTranslatedLesson = (
  lesson: any,
  lang: 'en' | 'hi' | 'gu' | 'mr'
) => {
  if (lang === 'en') return lesson;

  const langMap = lessonTextTranslations[lang] || {};
  let override = langMap[lesson.id];

  if (!override && lesson.title) {
    const rawTitle = (lesson.title || '')
      .replace(/^whats+iss+/i, '')
      .replace(/^whats+ares+/i, '')
      .replace(/^understandings+/i, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();

    override = langMap[`les-mod-dynamic-${rawTitle}`] || langMap[rawTitle];

    if (!override) {
      const matchKey = Object.keys(langMap).find(k => {
        const cleanK = k.replace(/^les-mod-dynamic-/, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return cleanK === rawTitle || (rawTitle.length > 2 && cleanK.includes(rawTitle)) || (cleanK.length > 2 && rawTitle.includes(cleanK));
      });
      if (matchKey) {
        override = langMap[matchKey];
      }
    }
  }
  const translatedTitle = override?.title || translateLessonTitle(lesson.title, lang);

      // Translate the quiz array if present
      let translatedQuiz = undefined;
      if (lesson.content.quiz && lesson.content.quiz.length > 0) {
        translatedQuiz = lesson.content.quiz.map((q: any) => {
          let translatedQuestion = q.question;
          let translatedExplanation = q.explanation;
          let translatedOptions = q.options;

          const cleanTitle = translatedTitle
            .replace(/\s*क्या\s*है\s*\??/gi, '')
            .replace(/\s*कौन\s*है\s*\??/gi, '')
            .replace(/\s*શું\s*છે\s*\??/gi, '')
            .replace(/\s*કોણ\s*છે\s*\??/gi, '')
            .replace(/\s*म्हणजे\s*काय\s*\??/gi, '')
            .replace(/\s*कोण\s*असतो\s*\??/gi, '')
            .trim();

          // Handle the generic auto-generated question
          if (q.question.includes('Correctly understanding')) {
            if (lang === 'hi') {
              translatedQuestion = `${cleanTitle} को सही ढंग से समझने से लॉजिस्टिक्स एजेंसियों को देरी और सीमा शुल्क जुर्माना शुल्क से बचने में मदद मिलती है।`;
              translatedExplanation = `व्यापार और कार्गो शर्तों का सटीक अनुप्रयोग सीमा शुल्क विवादों, लोडिंग विसंगतियों और माल ढुलाई दर के जुर्माने को रोकता है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `${cleanTitle} ને યોગ્ય રીતે સમજવાથી લોજિસ્ટિક્સ એજન્સીઓને વિલંબ અને કસ્ટમ્સ દંડના શુલ્ક ટાળવામાં મદદ મળે છે.`;
              translatedExplanation = `વેપાર અને કાગો શરતોનો સચોટ ઉપયોગ કસ્ટમ્સ વિવાદો, લોડિંગની વિસંગતતાઓ અને નૂર દરના દંડને અટકાવે છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `${cleanTitle} अचूकपणे समजून घेतल्याने लॉजिस्टिक्स एजन्सींना उशीर आणि सीमा शुल्क दंड शुल्क टाळण्यास मदत होते.`;
              translatedExplanation = `व्यापार आणि मालवाहतूक अटींचा अचूक वापर सीमा शुल्क विवाद, लोडिंगमधील तफावत आणि मालवाहतूक दराचे दंड प्रतिबंधित करतो.`;
            }
          }
          else if (q.question.includes('critical role in determining logistics')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या यह सच है कि ${cleanTitle} लॉजिस्टिक्स समय-सीमा और लागत आवंटन तय करने में महत्वपूर्ण भूमिका निभाता है?`;
              translatedExplanation = `हाँ, ${cleanTitle} पारगमन चरणों, सीमा शुल्क और समग्र मूल्य निर्धारण की योजना बनाने में महत्वपूर्ण है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું એ સાચું છે કે ${cleanTitle} લોજિસ્ટિક્સ સમયરેખા અને ખર્ચ ફાળવણી નક્કી કરવામાં મહત્વપૂર્ણ ભૂમિકા ભજવે છે?`;
              translatedExplanation = `હા, ${cleanTitle} પરિવહન તબક્કાઓ, કસ્ટમ્સ ફરજો અને એકંદર ભાવોના આયોજન માટે મહત્વપૂર્ણ છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `हे खरे आहे का की ${cleanTitle} लॉजिस्टिक्स वेळ आणि खर्च वाटप निश्चित करण्यात महत्त्वाची भूमिका बजावते?`;
              translatedExplanation = `होय, ${cleanTitle} ट्रान्झिट टप्पे, सीमा शुल्क आणि एकंदर किंमत ठरवण्यासाठी महत्त्वाचे आहे.`;
            }
          }
          else if (q.question.includes('absolutely no impact on customs clearance')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या ${cleanTitle} का सीमा शुल्क निकासी या कार्गो जोखिम आवंटन पर कोई प्रभाव नहीं पड़ता है?`;
              translatedExplanation = `गलत। ${cleanTitle} सीधे सीमा शुल्क अनुपालन, बंदरगाह निकासी शुल्क और कार्गो जोखिम आवंटन को प्रभावित करता है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું ${cleanTitle} ની કસ્ટમ્સ ક્લિયરન્સ કે કાર્ગો જોખમ ફાળવણી પર કોઈ અસર નથી પડતી?`;
              translatedExplanation = `ખોટું. ${cleanTitle} સીધી કસ્ટમ્સ પાલન, પોર્ટ ક્લિયરન્સ ફી અને કાર્ગો જોખમ ફાળવણીને અસર કરે છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `${cleanTitle} चा सीमा शुल्क क्लिअरन्स किंवा कार्गो जोखीम वाटपावर काहीही परिणाम होत नाही का?`;
              translatedExplanation = `चुकीचे. ${cleanTitle} थेट सीमा शुल्क अनुपालन, पोर्ट क्लिअरन्स शुल्क आणि कार्गो जोखीम वाटपावर परिणाम करते.`;
            }
          }
          else if (q.question.includes('best describes the main purpose of')) {
            if (lang === 'hi') {
              translatedQuestion = `अंतरराष्ट्रीय व्यापार में, निम्नलिखित में से कौन ${cleanTitle} के मुख्य उद्देश्य का सबसे अच्छा वर्णन करता है?`;
              translatedOptions = [
                'सभी सीमा शुल्क घोषणा पत्रों, आयात शुल्क गणनाओं और सुरक्षा निरीक्षण प्रोटोकॉल को बायपास करना।',
                'संचालन को मानकीकृत करना, बंदरगाह की देरी को कम करना और माल ढुलाई जोखिम/लागत को सही ढंग से आवंटित करना।',
                'घरेलू बाजार की बिक्री दरों को कृत्रिम रूप से बढ़ाना और विदेशी वितरकों के लिए आयात कोटा सीमित करना।',
                'कार्गो बीमा पॉलिसियों को निरस्त करना और सभी सीमा शुल्क नियमों व दस्तावेज़ीकरण आवश्यकताओं को अनदेखा करना।'
              ];
              translatedExplanation = `${cleanTitle} लॉजिस्टिक्स संचालन को मानकीकृत करता है, कानूनी अनुपालन सुनिश्चित करता है, और लागत/जोखिम सीमाओं को स्पष्ट करता है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `આંતરરાષ્ટ્રીય વ્યાપારમાં, નીચેનામાંથી કયું ${cleanTitle} ના મુખ્ય હેતુનું શ્રેષ્ઠ વર્ણન કરે છે?`;
              translatedOptions = [
                'તમામ કસ્ટમ્સ ઘોષણા પત્રો, આયાત ડ્યુટી ગણતરીઓ અને સુરક્ષા નિરીક્ષણ પ્રોટોકોલને બાયપાસ કરવા.',
                'કામગીરીનું માનકીકરણ કરવું, પોર્ટના વિલંબને ઘટાડવું અને નૂર જોખમ/ખર્ચની યોગ્ય ફાળવણી કરવી.',
                'સ્થાનિક બજારના વેચાણ દરો કૃત્રિમ રીતે વધારવા અને વિદેશી વિતરકો માટે આયાત ક્વોટા સીમિત કરવા.',
                'કાર્ગો વીમા પોલિસીઓ રદ કરવી અને તમામ કસ્ટમ્સ નિયમો અને દસ્તાવેજીકરણ આવશ્યકતાઓને અવગણવી.'
              ];
              translatedExplanation = `${cleanTitle} લોજિસ્ટિક્સ કામગીરીને માનકીકૃત કરે છે, કાનૂની પાલન સુનિશ્ચિત કરે છે અને ખર્ચ/જોખમ સીમાઓ સ્પષ્ટ કરે છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `आंतरराष्ट्रीय व्यापारात, खालीलपैकी कोणते ${cleanTitle} च्या मुख्य उद्देशाचे सर्वोत्तम वर्णन करते?`;
              translatedOptions = [
                'सर्व सीमा शुल्क घोषणापत्रे, आयात शुल्क गणना आणि सुरक्षा तपासणी प्रोटोकॉल बायपास करणे.',
                'ऑपरेशन्सचे मानकीकरण करणे, बंदरातील विलंब कमी करणे आणि मालवाहतूक जोखीम/खर्च योग्यरित्या वाटप करणे.',
                'देशांतर्गत बाजारातील विक्री दर कृत्रिमरीत्या वाढवणे आणि परदेशी वितरकांसाठी आयात कोटा मर्यादित करणे.',
                'कार्गो विमा पॉलिसी रद्द करणे आणि सर्व सीमा शुल्क नियम व दस्तऐवजीकरण आवश्यकतांकडे दुर्लक्ष करणे.'
              ];
              translatedExplanation = `${cleanTitle} लॉजिस्टिक्स ऑपरेशन्सचे मानकीकरण करते, कायदेशीर अनुपालन सुनिश्चित करते आणि खर्च/जोखीम मर्यादा स्पष्ट करते.`;
            }
          }
          else if (q.question.includes('purely a local term')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या ${cleanTitle} विशुद्ध रूप से एक स्थानीय शब्द है जिसका वैश्विक शिपिंग समझौतों में कोई मानक अर्थ नहीं है?`;
              translatedExplanation = `${cleanTitle} अंतरराष्ट्रीय व्यापार नियमों, सीमा शुल्क प्रोटोकॉल या वैश्विक मानक प्रथाओं द्वारा शासित होता.`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું ${cleanTitle} સંપૂર્ણપણે સ્થાનિક શબ્દ છે જેનો વૈશ્વિક શિપિંગ કરારોમાં કોઈ પ્રમાણભૂત અર્થ નથી?`;
              translatedExplanation = `${cleanTitle} આંતરરાષ્ટ્રીય વ્યાપાર નિયમો, કસ્ટમ્સ પ્રોટોકોલ અથવા વૈશ્વિક પ્રમાણભૂત પ્રથાઓ દ્વારા સંચાલિત થાય છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `${cleanTitle} ही केवळ स्थानिक संज्ञा आहे का ज्याला जागतिक शिपिंग करारांमध्ये कोणतेही मानक मूल्य नाही?`;
              translatedExplanation = `${cleanTitle} आंतरराष्ट्रीय व्यापार नियम, सीमा शुल्क प्रोटोकॉल या जागतिक मानक पद्धतींद्वारे नियंत्रित केली जाते.`;
            }
          }
          else if (q.question.includes('common risk or mistake associated with')) {
            if (lang === 'hi') {
              translatedQuestion = `${cleanTitle} को गलत तरीके से संभालने से जुड़ा एक सामान्य जोखिम या गलती क्या है?`;
              translatedOptions = [
                'शिपिंग लाइन और माल ढुलाई एजेंटों से अतिरिक्त छूट और स्वचालित किराया कटौती प्राप्त करना।',
                'आयातकों को भारी विलंब शुल्क (डेमरेज), बंदरगाह रोक और सीमा शुल्क जुर्माना शुल्क देना पड़ता है।',
                'बिना किसी सुरक्षा निरीक्षण या कागजी कार्रवाई के सभी सीमा शुल्क घोषणा पत्रों की तत्काल स्वीकृति मिलना।',
                'समुद्री परिवहन यात्रा के समय को आधा करना और गंतव्य बंदरगाह तक सीधी डिलीवरी प्राप्त करना।'
              ];
              translatedExplanation = `${cleanTitle} को गलत तरीके से संभालने से अक्सर गंभीर सीमा शुल्क निरीक्षण में देरी और भारी बंदरगाह जुर्माना शुल्क लगता है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `${cleanTitle} ને ખોટી રીતે હેન્ડલ કરવા સાથે જોડાયેલ સામાન્ય જોખમ અથવા ભૂલ કઈ છે?`;
              translatedOptions = [
                'શિપિંગ લાઇન અને ફ્રેઇટ એજન્ટો તરફથી વધારાના ડિસ્કાઉન્ટ અને આપમેળે ભાડા કપાત મેળવવી.',
                'આયાતકારોને ભારે ડેમરેજ, પોર્ટ ડિટેન્શન અને કસ્ટમ્સ દંડનો સામનો કરવો પડે છે.',
                'કોઈપણ સુરક્ષા નિરીક્ષણ અથવા કાગળ વિના તમામ કસ્ટમ્સ ઘોષણાઓની ત્વરિત આપમેળે મંજૂરી મળવી.',
                'દરિયાઈ પરિવહન પ્રવાસના સમયને અડધો કરવો અને ગંતવ્ય પોર્ટ સુધી સીધી ફાસ્ટ-ટ્રેક ડિલિવરી મેળવવી.'
              ];
              translatedExplanation = `${cleanTitle} ને ખોટી રીતે હેન્ડલ કરવાથી અવારનવાર કસ્ટમ્સ નિરીક્ષણમાં વિલંબ અને પોર્ટ દંડના મોટા શુલ્ક લાગે છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `${cleanTitle} चुकीच्या पद्धतीने हाताळण्याशी संबंधित कोणती सामान्य चूक किंवा जोखीम आहे?`;
              translatedOptions = [
                'शिपिंग लाइन आणि फ्रेट एजंट्सकडून अतिरिक्त सवलत आणि स्वयंचलित भाडे कपात मिळणे.',
                'आयातदारांना मोठा विलंब शुल्क (डेमरेज), पोर्ट डिटेंशन आणि सीमा शुल्क दंड शुल्क भरावे लागणे.',
                'कोणत्याही सुरक्षा तपासणी किंवा कागदपत्रांशिवाय सर्व सीमा शुल्क घोषणापत्रांना त्वरित स्वयंचलित मान्यता मिळणे.',
                'सागरी प्रवास वेळ निम्म्याने कमी करणे आणि गंतव्य बंदरावर थेट डिलिव्हरी मिळवणे.'
              ];
              translatedExplanation = `${cleanTitle} चुकीच्या पद्धतीने हाताळल्यास अनेकदा सीमा शुल्क तपासणीत विलंब होतो आणि मोठा पोर्ट दंड आकारला जातो.`;
            }
          }
          else if (q.question.includes('mismatch in documents related to')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या ${cleanTitle} से संबंधित दस्तावेजों में विसंगति सीमा शुल्क विभाग द्वारा माल रोकने का एक प्राथमिक कारण है?`;
              translatedExplanation = `हाँ, ${cleanTitle} मापदंडों के संबंध में दस्तावेजों में असंगति होने पर मैन्युअल ऑडिट और सीमा शुल्क रोक शुरू हो जाएगी।`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું ${cleanTitle} સંબંધિત દસ્તાવેજોમાં વિસંગતતા એ કસ્ટમ્સ વિભાગ દ્વારા માલ રોકવાનું મુખ્ય કારણ છે?`;
              translatedExplanation = `હા, ${cleanTitle} પરિમાણો સંબંધિત દસ્તાવેજોમાં અસંગતતા હોવા પર મેન્યુઅલ ઓડિટ અને કસ્ટમ્સ હોલ્ડ શરૂ થશે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `काय ${cleanTitle} संबंधित कागदपत्रांमधील तफावत हे सीमा शुल्क विभागाने माल रोखून धरण्याचे प्रमुख कारण आहे?`;
              translatedExplanation = `होय, ${cleanTitle} निकषांशी संबंधित कागदपत्रांमध्ये विसंगती आढळल्यास मॅन्युअल ऑडिट आणि माल रोखला जाऊ शकतो.`;
            }
          }
          // Handle "What constitutes a 'Landed Cost' in importing?"
          else if (q.question.includes('Landed Cost')) {
        if (lang === 'hi') {
          translatedQuestion = `आयात में "लैंडेड कॉस्ट" (Landed Cost) में क्या शामिल होता है?`;
          translatedOptions = [
            'केवल विदेशी सप्लायर को भुगतान की गई कीमत।',
            'माल की कुल लागत + माल ढुलाई (Freight) + सीमा शुल्क (Customs) + कर (Duties) + स्थानीय परिवहन।',
            'केवल पोर्ट टर्मिनल शुल्क।',
            'उत्पाद का खुदरा बाजार मूल्य (Retail Price)।'
          ];
          translatedExplanation = `लैंडेड कॉस्ट में उत्पाद को फैक्ट्री से लेकर अंतिम गंतव्य गोदाम तक लाने से जुड़ी सभी लागतें शामिल होती हैं।`;
        } else if (lang === 'gu') {
          translatedQuestion = `આયાતમાં "લેન્ડેડ કોસ્ટ" (Landed Cost) માં શું શામેલ છે?`;
          translatedOptions = [
            'ફક્ત વિદેશી સપ્લાયરને ચૂકવેલ કિંમત.',
            'માલની કુલ કિંમત + નૂર (Freight) + કસ્ટમ્સ ક્લિયરન્સ + કરવેરા + સ્થાનિક પરિવહન.',
            'ફક્ત પોર્ટ ટર્મિનલ શુલ્ક.',
            'પ્રોડક્ટની બજાર છૂટક કિંમત.'
          ];
          translatedExplanation = `લેન્ડેડ કોસ્ટમાં ઉત્પાદનને ફેક્ટરીથી લઈને અંતિમ ગંતવ્ય વેરહાઉસ સુધી લાવવા સાથે સંકળાયેલા તમામ ખર્ચનો સમાવેશ થાય છે.`;
        } else if (lang === 'mr') {
          translatedQuestion = `आयातीमध्ये "लँडेड कॉप्ट" (Landed Cost) मध्ये कशाचा समावेश होतो?`;
          translatedOptions = [
            'केवळ परदेशी सप्लायरला दिलेली किंमत.',
            'मालाची एकूण किंमत + मालवाहतूक (Freight) + सीमा शुल्क क्लिअरन्स + कर + स्थानिक वाहतूक.',
            'केवळ पोर्ट टर्मिनल शुल्क.',
            'उत्पादनाची किरकोळ बाजारातील किंमत.'
          ];
          translatedExplanation = `लँडेड कॉस्टमध्ये उत्पादनाला फॅक्टरीमधून अंतिम गंतव्य गोदामापर्यंत आणण्यासाठी लागणाऱ्या सर्व खर्चांचा समावेश होतो.`;
        }
      }
      // Handle "Under FOB terms, at what exact point does risk transfer..."
      else if (q.question.includes('FOB terms')) {
        if (lang === 'hi') {
          translatedQuestion = `FOB शर्तों के तहत, किस सटीक बिंदु पर जोखिम विक्रेता से खरीदार को हस्तांतरित होता है?`;
          translatedOptions = [
            'जब माल विक्रेता के गोदाम से निकलता है।',
            'जब माल मूल बंदरगाह पर जहाज पर लाद दिया जाता है।',
            'जब माल गंतव्य बंदरगाह पर पहुंचता है।',
            'जब खरीदार के देश में माल का सीमा शुल्क क्लियर हो जाता है।'
          ];
          translatedExplanation = `FOB (Free On Board) यह निर्देश देता है कि शिपमेंट के निर्दिष्ट बंदरगाह पर जहाज पर माल लोड होते ही जोखिम विक्रेता से खरीदार के पास चला जाता है।`;
        } else if (lang === 'gu') {
          translatedQuestion = `FOB શરતો હેઠળ, કયા ચોક્કસ બિંદુએ જોખમ વિક્રેતાથી ખરીદારને સ્થાનાંતરિત થાય છે?`;
          translatedOptions = [
            'જ્યારે માલ વિક્રેતાના વેરહાઉસમાંથી બહાર નીકળે છે.',
            'જ્યારે માલ મૂળ બંદર પર જહાજ પર ચડાવવામાં આવે છે.',
            'જ્યારે માલ ગંતવ્ય બંદર પર પહોંચે છે.',
            'જ્યારે ખરીદારના દેશમાં માલની કસ્ટમ્સ ક્લિયરન્સ પૂર્ણ થાય છે.'
          ];
          translatedExplanation = `FOB (Free On Board) સૂચવે છે કે શિપમેન્ટના નિયત બંદર પર જહાજ પર માલ લોડ થતાં જ જોખમ વિક્રેતાથી ખરીદાર પાસે જાય છે.`;
        } else if (lang === 'mr') {
          translatedQuestion = `FOB अटींनुसार, कोणत्या अचूक टप्प्यावर जोखीम विक्रेत्याकडून खरेदीदाराकडे हस्तांतरित होते?`;
          translatedOptions = [
            'जेव्हा माल विक्रेत्याच्या गोदामातून बाहेर पडतो.',
            'जेव्हा माल मूळ बंदरावर जहाजावर चढविला जातो.',
            'जेव्हा माल अंतिम बंदरावर पोहोचतो.',
            'जेव्हा खरेदीदाराच्या देशात मालाचे सीमा शुल्क क्लिअरन्स पूर्ण होते.'
          ];
          translatedExplanation = `FOB (Free On Board) दर्शवते की शिपमेंटच्या निर्दिष्ट बंदरावर जहाजावर माल चढवताच जोखीम विक्रेत्याकडून खरेदीदाराकडे जाते.`;
        }
      }
      // Handle "pay your deposit to a supplier’s personal account"
      else if (q.question.includes('personal account')) {
        if (lang === 'hi') {
          translatedQuestion = `यदि कोई सप्लायर छूट का वादा करता है, तो उसके व्यक्तिगत (Personal) खाते में जमा राशि का भुगतान करना एक सुरक्षित व्यावसायिक अभ्यास है।`;
          translatedExplanation = `व्यक्तिगत बैंक खाते में भुगतान करने से कोई कानूनी सुरक्षा नहीं मिलती है। हमेशा निर्माता के ऑडिटेड, पंजीकृत कॉर्पोरेट बैंक खाते में ही भुगतान करें।`;
        } else if (lang === 'gu') {
          translatedQuestion = `જો કોઈ સપ્લાયર ડિસ્કાઉન્ટનું વચન આપે છે, તો તેના વ્યક્તિગત (Personal) ખાતામાં ડિપોઝિટ ચૂકવવી એ એક સુરક્ષિત વ્યવસાયિક પદ્ધતિ છે.`;
          translatedExplanation = `વ્યક્તિગત બેંક ખાતામાં ચૂકવણી કરવાથી કોઈ કાનૂની રક્ષણ મળતું નથી. હંમેશા ઉત્પાદકના ઓડિટેડ, રજિસ્ટર્ડ કોર્પોરેટ બેંક ખાતામાં જ ચૂકવણી કરો.`;
        } else if (lang === 'mr') {
          translatedQuestion = `जर एखाद्या सप्लायरने डिस्काउंटचे आश्वासन दिले तर त्याच्या वैयक्तिक (Personal) खात्यात अनामत रक्कम भरणे ही एक सुरक्षित व्यावसायिक पद्धत आहे.`;
          translatedExplanation = `वैयक्तिक बँक खात्यात पैसे भरल्यास कोणतेही कायदेशीर संरक्षण मिळत नाही. नेहमी उत्पादकाच्या ऑडिट केलेल्या, नोंदणीकृत कॉर्पोरेट बँक खात्यातच पैसे भरा.`;
        }
      }

          // ---- NEW CONCEPT-BASED TEMPLATES (mod-1, mod-2 roles) ----

          // Case 0: "Is it true that X is a key participant in international import-export trade operations?"
          else if (q.question.includes('key participant in international import-export')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या यह सच है कि ${cleanTitle} अंतरराष्ट्रीय आयात-निर्यात व्यापार में एक महत्वपूर्ण भागीदार है?`;
              translatedExplanation = `हाँ, ${cleanTitle} वैश्विक आपूर्ति श्रृंखला में एक महत्वपूर्ण भूमिका निभाता है, जो मूल से गंतव्य तक माल की आवाजाही सुनिश्चित करता है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું એ સાચું છે કે ${cleanTitle} આંતરરાષ્ટ્રીય આયાત-નિકાસ વ્યાપારમાં એક મહત્વપૂર્ણ ભાગીદાર છે?`;
              translatedExplanation = `હા, ${cleanTitle} વૈશ્વિક સપ્લાય ચેઇનમાં આવશ્યક ભૂમિકા ભજવે છે, મૂળ સ્થાનથી ગંતવ્ય સ્થાન સુધી માલ પહોંચાડે છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `हे खरे आहे का की ${cleanTitle} आंतरराष्ट्रीय आयात-निर्यात व्यापारात एक महत्त्वाचा सहभागी आहे?`;
              translatedExplanation = `होय, ${cleanTitle} जागतिक पुरवठा साखळीत महत्त्वाची भूमिका बजावते, उत्पत्ती स्थानापासून गंतव्यापर्यंत माल पोहोचविण्यात मदत करते.`;
            }
          }
          // Case 1: "Does X have no responsibility in ensuring legal documentation compliance?"
          else if (q.question.includes('no responsibility in ensuring legal documentation')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या ${cleanTitle} की अंतरराष्ट्रीय व्यापार में कानूनी दस्तावेज़ीकरण अनुपालन सुनिश्चित करने में कोई ज़िम्मेदारी नहीं है?`;
              translatedExplanation = `गलत। ${cleanTitle} सटीक दस्तावेज़ बनाए रखने, भुगतान करने और सीमा शुल्क अनुपालन आवश्यकताओं का पालन करने के लिए जिम्मेदार है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું ${cleanTitle} ને આંતરરાષ્ટ્રીય વ્યાપારમાં કાનૂની દસ્તાવેજ પાલન સુનિશ્ચિત કરવાની કોઈ જવાબદારી નથી?`;
              translatedExplanation = `ખોટું. ${cleanTitle} સચોટ દસ્તાવેજ જાળવવા, ચૂકવણી કરવા અને કસ્ટમ્સ પાલન આવશ્યકતાઓનું પાલન કરવા માટે જવાબદાર છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `${cleanTitle} ला आंतरराष्ट्रीय व्यापारात कायदेशीर दस्तऐवज पालन सुनिश्चित करण्याची कोणतीही जबाबदारी नाही का?`;
              translatedExplanation = `चुकीचे. ${cleanTitle} अचूक कागदपत्रे राखणे, देयके करणे आणि सीमाशुल्क पालन आवश्यकतांचे पालन करण्यासाठी जबाबदार आहे.`;
            }
          }
          // Case 2: "In international trade, what is the primary role of a X?"
          else if (q.question.includes('primary role of a')) {
            if (lang === 'hi') {
              translatedQuestion = `अंतरराष्ट्रीय व्यापार में, ${cleanTitle} की प्राथमिक भूमिका क्या है?`;
              translatedOptions = [
                `निर्माता के लिए स्थानीय बिक्री लक्ष्य तय करना और केवल घरेलू विपणन विज्ञापनों का प्रबंधन करना।`,
                `सप्लायर से माल खरीदना, भुगतान प्रबंधित करना और आयात प्रक्रियाओं को संभालना।`,
                `केवल शिपिंग लेबल मुद्रित करना, स्थानीय गोदाम का प्रबंधन करना और अंतर्देशीय ट्रकों का समन्वय करना।`,
                `आयातित कार्गो की प्रत्यक्ष सीमा शुल्क निकासी और बंदरगाह टर्मिनल निरीक्षण प्रक्रियाओं को बायपास करना।`
              ];
              translatedExplanation = `${cleanTitle} माल की सोर्सिंग, भुगतान प्रबंधन, अनुपालन और सुचारू आयात प्रक्रियाओं को सुनिश्चित करने के लिए जिम्मेदार है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `આંતરરાષ્ટ્રીય વ્યાપારમાં, ${cleanTitle} ની પ્રાથમિક ભૂમિકા શું છે?`;
              translatedOptions = [
                `ઉત્પાદક માટે સ્થાનિક વેચાણ લક્ષ્યો નક્કી કરવા અને માત્ર સ્થાનિક માર્કેટિંગ જાહેરાતોનું સંચાલન કરવું.`,
                `સપ્લાયર પાસેથી માલ ખરીદવો, ચૂકવણી સંચાલિત કરવી અને આયાત પ્રક્રિયાઓ સંભાળવી.`,
                `માત્ર શિપિંગ લેબલ પ્રિન્ટ કરવા, સ્થાનિક વેરહાઉસ સ્ટોક મેનેજ કરવો અને સ્થાનિક ટ્રકોનું સંકલન કરવું.`,
                `આયાતી કાર્ગોની પ્રત્યક્ષ કસ્ટમ્સ ક્લિયરન્સ અને પોર્ટ ટર્મિનલ નિરીક્ષણ પ્રક્રિયાઓને બાયપાસ કરવી.`
              ];
              translatedExplanation = `${cleanTitle} માલ સોર્સ કરવા, ચૂકવણી સંચાલિત કરવા, પાલન સુનિશ્ચિત કરવા અને આયાત પ્રક્રિયા સરળ બનાવવા જવાબદાર છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `आंतरराष्ट्रीय व्यापारात, ${cleanTitle} ची प्राथमिक भूमिका काय आहे?`;
              translatedOptions = [
                `उत्पादकासाठी स्थानिक विक्री उद्दिष्टे निश्चित करणे आणि केवळ देशांतर्गत विपणन जाहिरातींचे व्यवस्थापन करणे.`,
                `सप्लायरकडून माल खरेदी करणे, देयके व्यवस्थापित करणे आणि आयात प्रक्रिया हाताळणे.`,
                `કેવળ શિપિંગ લેબલ મુદ્રિત કરણે, દેશાંતર્ગત ગોદામાતીલ સાઠા વ્યવસ્થાપિત કરણે આણિ સ્થાનિક ટ્રક્સચે સમન્વય સાધણે.`,
                `આયાત કેલેલ્યા માલવાહતુકચી થેટ સીમા શુલ્ક ક્લિયરન્સ આણિ પોર્ટ ટર્મિનલ તપામણી પ્રક્રિયા બાયપાસ કરણે.`
              ];
              translatedExplanation = `${cleanTitle} माल सोर्सिंग, देयक व्यवस्थापन, पालन सुनिश्चित करणे आणि आयात प्रक्रिया सुलभ करण्यासाठी जबाबदार आहे.`;
            }
          }
          else if (q.question.includes('understanding the role of')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या यह सच है कि ${cleanTitle} की भूमिका को समझने से महंगे व्यापार विवादों और भुगतान विफलताओं को रोकने में मदद मिलती है?`;
              translatedExplanation = `हाँ, ${cleanTitle} की जिम्मेदारियों को स्पष्ट रूप से परिभाषित करने से गलत संचार, भुगतान विवाद और व्यापार में कानूनी समस्याएँ रोकी जा सकती हैं।`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું એ સાચું છે કે ${cleanTitle} ની ભૂમિકા સમજવાથી ખર્ચાળ વ્યાપાર વિવાદો અને ચૂકવણી નિષ્ફળતાઓ રોકવામાં મદદ મળે છે?`;
              translatedExplanation = `હા, ${cleanTitle} ની જવાબદારીઓ સ્પષ્ટ રીતે નક્કી કરવાથી ગેરસમજ, ચૂકવણી વિવાદ અને વ્યાપારમાં કાનૂની સમસ્યાઓ ટાળી શકાય છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `हे खरे आहे का की ${cleanTitle} ची भूमिका समजून घेतल्याने खर्चिक व्यापार वाद आणि देयक अपयश टाळण्यास मदत होते?`;
              translatedExplanation = `होय, ${cleanTitle} च्या जबाबदाऱ्या स्पष्टपणे परिभाषित केल्यास गैरसमज, देयक वाद आणि व्यापारातील कायदेशीर समस्या टाळता येतात.`;
            }
          }
          // Case 4: "What is the most common mistake when dealing with a X in international trade?"
          else if (q.question.includes('most common mistake when dealing with a')) {
            if (lang === 'hi') {
              translatedQuestion = `अंतरराष्ट्रीय व्यापार में ${cleanTitle} के साथ काम करते समय सबसे आम गलती क्या है?`;
              translatedOptions = [
                `बड़ा ऑर्डर देने से पहले आपूर्तिकर्ता से विस्तृत तकनीकी उत्पाद नमूने और लैब टेस्ट रिपोर्ट मांगना।`,
                `हस्ताक्षरित अनुबंध या सत्यापित दस्तावेज़ीकरण के बिना अपरिचित खाते में अग्रिम भुगतान करना।`,
                `कारखाने से माल रवाना करने से पहले लागू आयात सीमा शुल्क और उत्पाद वर्गीकरण दरों की पूर्व-जाँच करना।`,
                `अंतर्राष्ट्रीय बंदरगाहों पर आयात कार्गो की त्वरित और परेशानी मुक्त सीमा शुल्क निकासी के लिए एजेंट नियुक्त करना।`
              ];
              translatedExplanation = `${cleanTitle} के साथ काम करते समय उचित लिखित समझौते या दस्तावेज़ सत्यापन के बिना अग्रिम राशि का भुगतान करना सबसे आम और महंगी गलती है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `આંતરરાષ્ટ્રીય વ્યાપારમાં ${cleanTitle} સાથે કામ કરતી વખતે સૌથી સામાન્ય ભૂલ કઈ છે?`;
              translatedOptions = [
                `મોટો ઓર્ડર આપતા પહેલા સપ્લાયર પાસેથી વિગતવાર તકનીકી પ્રોડક્ટ સેમ્પલ અને લેબ ટેસ્ટ રિપોર્ટ માગવા.`,
                `સહી કરેલ કરાર અથવા ચકાસાયેલ દસ્તાવેજ વિના અજાણ્યા ખાતામાં અગ્રિમ ચૂકવણી કરવી.`,
                `ફેક્ટરીમાંથી માલ મોકલતા પહેલા લાગુ આયાત કસ્ટમ્સ ડ્યુટી અને HSN વર્ગીકરણ દરોની પૂર્વ-ચકાસણી કરવી.`,
                `આંતરરાષ્ટ્રીય બંદરો પર આયાત કાર્ગોની ઝડપી કસ્ટમ્સ ક્લિયરન્સ માટે એજન્ટની નિમણૂક કરવી.`
              ];
              translatedExplanation = `${cleanTitle} સાથે કામ કરતી વખતે યોગ્ય લેખિત કરાર અથવા દસ્તાવેજ ચકાસણી વિના અગ્રિમ ચૂકવણી કરવી સૌથી સામાન્ય અને ખર્ચાળ ભૂલ છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `आंतरराष्ट्रीय व्यापारात ${cleanTitle} शी व्यवहार करताना सर्वात सामान्य चूक कोणती आहे?`;
              translatedOptions = [
                `मोठी ऑर्डर देण्यापूर्वी सप्लायरकडून સવિસ્તર તાંત્રિક ઉત્પાદન નમુને અને લેબ ટેસ્ટ રિપોર્ટ માગણે.`,
                `स्वाक्षरी केलेल्या कराराशिवाय किंवा सत्यापित कागदपत्रांशिवाय अपरिचित खात्यात आगाऊ देयक करणे.`,
                `કારખાન્યાતૂન માલ પાઠવણ્યાપૂર્વી લાગૂ આયાત સીમા શુલ્ક આણિ વર્ગીકરણ દરાંચી પૂર્વ-તપાસણી કરણે.`,
                `આંતરરાષ્ટ્રીય બંદરાંવર આયાત માલાચ્યા જળદ સીમા શુલ્ક ક્લિયરન્સસાઠી એજંટચી નિયુક્તી કરણે.`
              ];
              translatedExplanation = `${cleanTitle} શી व्यवहार करताना योग्य लेखी करारावर किंवा कागदपत्र सत्यापनाशिवाय आगाऊ रक्कम भरणे ही सर्वात सामान्य आणि महाग चूक आहे.`;
            }
          }
          else if (q.question.includes('operate successfully in global trade without understanding')) {
            if (lang === 'hi') {
              translatedQuestion = `क्या कोई ${cleanTitle} सीमा शुल्क अनुपालन और दस्तावेज़ीकरण आवश्यकताओं को समझे बिना अंतरराष्ट्रीय व्यापार में सफलतापूर्वक काम कर सकता है?`;
              translatedExplanation = `नहीं। ${cleanTitle} को सफलतापूर्वक अंतरराष्ट्रीय व्यापार संचालित करने के लिए सीमा शुल्क अनुपालन, दस्तावेज़ीकरण आवश्यकताओं और भुगतान प्रक्रियाओं को समझना अनिवार्य है।`;
            } else if (lang === 'gu') {
              translatedQuestion = `શું ${cleanTitle} કસ્ટમ્સ પાલન અને દસ્તાવેজ આવશ્યકતાઓ સમજ્યા વિના આંતરરાષ્ટ્રીય વ્યાપારમાં સફળ રીતે કામ કરી શકે?`;
              translatedExplanation = `ના. ${cleanTitle} ને સફળ રીતે આંતરરાષ્ટ્રીય વ્યાપાર ચલાવવા માટે કસ્ટમ્સ પાલન, દસ્તાવેજ આવશ્યકતાઓ અને ચૂકવણી પ્રક્રિયાઓ સમજવી ફરજિયાત છે.`;
            } else if (lang === 'mr') {
              translatedQuestion = `सीमाशुल्क पालन आणि दस्तऐवज आवश्यकता न समजता ${cleanTitle} आंतरराष्ट्रीय व्यापारात यशस्वीपणे कार्य करू शकतो का?`;
              translatedExplanation = `नाही. ${cleanTitle} ला यशस्वीपणे आंतरराष्ट्रीय व्यापार करण्यासाठी सीमाशुल्क पालन, दस्तऐवज आवश्यकता आणि देयक प्रक्रिया समजणे आवश्यक आहे.`;
            }
          }


      return {
        ...q,
        question: translatedQuestion,
        options: translatedOptions,
        explanation: translatedExplanation
      };
    });
  }

  const translatedLesson = {
    ...lesson,
    title: translatedTitle,
    description: translateDynamicContent(lesson.description, lesson.title, lang),
    content: {
      ...lesson.content,
      definition: override?.definition || translateDynamicContent(lesson.content.definition, lesson.title, lang),
      whyImportant: override?.whyImportant || translateDynamicContent(lesson.content.whyImportant, lesson.title, lang),
      businessExample: override?.businessExample || translateDynamicContent(lesson.content.businessExample, lesson.title, lang),
      writtenExplanation: override?.writtenExplanation || translateDynamicContent(lesson.content.writtenExplanation, lesson.title, lang),
      summary: override?.summary || translateDynamicContent(lesson.content.summary, lesson.title, lang),
      importantNotes: override?.importantNotes || lesson.content.importantNotes?.map((n: string) => translateDynamicContent(n, lesson.title, lang)) || [],
      commonMistakes: override?.commonMistakes || lesson.content.commonMistakes?.map((m: string) => translateDynamicContent(m, lesson.title, lang)) || [],
      practicalTips: override?.practicalTips || lesson.content.practicalTips?.map((t: string) => translateDynamicContent(t, lesson.title, lang)) || [],
      quiz: translatedQuiz || lesson.content.quiz,
      relatedTopics: lesson.content.relatedTopics?.map((topic: string) => {
        if (lang === 'hi') {
          if (topic === 'What is Export?') return 'निर्यात (Export) क्या है?';
          if (topic === 'Customs Duty') return 'कस्टम ड्यूटी (Customs Duty)';
          if (topic === 'HSN Code') return 'एचएसएन कोड (HSN Code)';
          if (topic === 'Bill of Lading') return 'बिल ऑफ लेडिंग (Bill of Lading)';
        }
        return topic;
      })
    }
  };

  return translatedLesson;
};
