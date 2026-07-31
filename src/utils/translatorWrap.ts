import { getTranslatedLesson as originalGetTranslatedLesson, translateDynamicContent } from './translator';

const cleanTopicTitle = (title: string): string => {
  if (!title) return '';
  return title
    .replace(/^what\s+is\s+/i, '')
    .replace(/^what\s+are\s+/i, '')
    .replace(/^why\s+is\s+/i, '')
    .replace(/^how\s+to\s+/i, '')
    .replace(/^overview\s+of\s+/i, '')
    .replace(/^understanding\s+/i, '')
    .replace(/\?+$/g, '')
    .trim();
};

export const getTranslatedLesson = (lesson: any, lang: 'en' | 'hi' | 'gu' | 'mr') => {
  const translated = originalGetTranslatedLesson(lesson, lang);
  const cleanTitle = cleanTopicTitle(lesson?.title || '');

  // Helper to dynamically translate single strings or arrays
  const trField = (field: any) => {
    if (!field) return field;
    if (typeof field === 'string') {
      return translateDynamicContent(field, lesson?.title || '', lang);
    }
    if (Array.isArray(field)) {
      return field.map((item: any) => {
        if (typeof item === 'string') {
          return translateDynamicContent(item, lesson?.title || '', lang);
        }
        if (item && typeof item === 'object') {
          return {
            ...item,
            question: item.question ? translateDynamicContent(item.question, lesson?.title || '', lang) : item.question,
            answer: item.answer ? translateDynamicContent(item.answer, lesson?.title || '', lang) : item.answer
          };
        }
        return item;
      });
    }
    return field;
  };

  let cleanQuiz = translated?.content?.quiz;
  if (cleanQuiz && cleanQuiz.length > 0) {
    cleanQuiz = cleanQuiz.map((q: any) => {
      let qText = q.question || '';
      let qOpts = q.options ? [...q.options] : [];
      let qExp = q.explanation || '';

      if (lang !== 'en') {
        // 1. Translate Question Text if in English
        if (qText.startsWith('What does ') || qText.startsWith('What Does ')) {
          const matchTerm = qText.replace(/^What [Dd]oes\s+/, '').replace(/\s+(mean|do)\??$/i, '').trim();
          const translatedTerm = translateDynamicContent(matchTerm, matchTerm, lang);
          if (lang === 'hi') {
            qText = `${translatedTerm} का क्या मतलब/कार्य है?`;
          } else if (lang === 'gu') {
            qText = `${translatedTerm} નો શું અર્થ/કાર્ય છે?`;
          } else if (lang === 'mr') {
            qText = `${translatedTerm} चा काय अर्थ/कार्य आहे?`;
          }
        } else {
          qText = translateDynamicContent(qText, lesson?.title || '', lang);
        }
      }

      // 2. Process & Translate Options Array for ALL languages
      qOpts = qOpts.map((opt: string, optIdx: number) => {
        if (!opt) return opt;

        const isDummy = (
          opt.includes('illegal practice') ||
          opt.includes('illegal trade') ||
          opt.includes('trading practice') ||
          opt.includes('tax penalty') ||
          opt.includes('tax exemption') ||
          opt.includes('carrier fine') ||
          opt.includes('shipping carrier') ||
          opt.includes('अवैध') ||
          opt.includes('कर छूट') ||
          opt.includes('टैक्स जुर्माना') ||
          opt.includes('वाहक जुर्माना') ||
          opt.includes('गैरकायदेसर') ||
          opt.includes('દંડ') ||
          opt.includes('बेकायदेशीर')
        );

        if (isDummy && optIdx > 0) {
          if (optIdx === 1) {
            if (lang === 'hi') return 'अंतर्देशीय निर्यात शिपमेंट के लिए एक सीमा शुल्क छूट नियम।';
            if (lang === 'gu') return 'દેશી નિકાસ શિપમેન્ટ માટે કસ્ટમ્સ ડ્યુટી મુક્તિનો નિયમ.';
            if (lang === 'mr') return 'देशांतर्गत निर्यात शिपमेंटसाठी सीमाशुल्क सवलत नियम.';
            return 'An optional customs duty exemption rule for inland export shipments.';
          }
          if (optIdx === 2) {
            if (lang === 'hi') return 'लोडिंग बंदरगाह पर कार्गो निरीक्षण को नियंत्रित करने वाला एक अनिवार्य शिपिंग प्रोटोकॉल।';
            if (lang === 'gu') return 'લોડિંગ પોર્ટ પર કાર્ગો નિરીક્ષણને નિયંત્રિત કરતો ફરજિયાત શિપિંગ પ્રોટોકોલ.';
            if (lang === 'mr') return 'लोडિંગ पोर्टवर कार्ગો तपासणी नियंत्रित करणारा अनिवार्य शिपિંગ પ્રોટોકોલ.';
            return 'A mandatory shipping protocol regulating cargo inspection at loading port.';
          }
          if (optIdx === 3) {
            if (lang === 'hi') return 'जहाज क्लीयरेंस से पहले पोर्ट स्टोरेज शुल्क के निपटान के लिए एक मानक व्यापार समझौता।';
            if (lang === 'gu') return 'જહાજ ક્લિયરન્સ પહેલાં પોર્ટ સ્ટોરેજ ચાર્જ પતાવવા માટેનો પ્રમાણભૂત વેપાર કરાર.';
            if (lang === 'mr') return 'जहाज निघण्यापूर्वी पोर्ट स्टोरेज शुल्क भरण्याचा एक मानक व्यापार करार.';
            return 'A standardized trade agreement for settling port storage charges prior to vessel clearance.';
          }
        }

        if (lang !== 'en') {
          return translateDynamicContent(opt, lesson?.title || '', lang);
        }
        return opt;
      });

      // 3. Translate Explanation if in English
      if (lang !== 'en' && qExp) {
        qExp = translateDynamicContent(qExp, lesson?.title || '', lang);
      }

      // Replace generic double question marks ?? -> ?
      qText = qText.replace(/\?\?/g, '?');

      return {
        ...q,
        question: qText,
        options: qOpts,
        explanation: qExp
      };
    });
  }

  let cleanDef = trField(translated?.content?.definition || '');
  let cleanWhy = trField(translated?.content?.whyImportant || '');
  let cleanEx = trField(translated?.content?.businessExample || '');
  let cleanWritten = trField(translated?.content?.writtenExplanation || '');
  let cleanSummary = trField(translated?.content?.summary || '');
  let cleanKeyPoints = trField(translated?.content?.keyPoints || lesson?.content?.keyPoints || []);
  let cleanMistakes = trField(translated?.content?.commonMistakes || lesson?.content?.commonMistakes || []);
  let cleanTips = trField(translated?.content?.practicalTips || lesson?.content?.practicalTips || []);
  let cleanNotes = trField(translated?.content?.importantNotes || lesson?.content?.importantNotes || []);
  let cleanObjectives = trField(translated?.content?.objectives || lesson?.content?.objectives || []);
  let cleanFaqs = trField(translated?.content?.faqs || lesson?.content?.faqs || []);

  if (cleanTitle && lesson?.title && lesson.title !== cleanTitle) {
    const rawTitlePattern = new RegExp(lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (typeof cleanDef === 'string') cleanDef = cleanDef.replace(rawTitlePattern, cleanTitle);
    if (typeof cleanWhy === 'string') cleanWhy = cleanWhy.replace(rawTitlePattern, cleanTitle);
    if (typeof cleanEx === 'string') cleanEx = cleanEx.replace(rawTitlePattern, cleanTitle);
  }

  // Ensure Summary is NEVER identical to Definition
  if (!cleanSummary || cleanSummary.trim() === cleanDef.trim()) {
    if (lang === 'hi') {
      cleanSummary = `मुख्य बातें: इस अध्याय में ${cleanTitle} से जुड़े मुख्य नियम, दस्तावेज प्रक्रिया, लागत पैरामीटर और जोखिम सीमाओं का पूरा विवरण शामिल है।`;
    } else if (lang === 'gu') {
      cleanSummary = `મુખ્ય બાબતો: આ પ્રકરણમાં ${cleanTitle} સાથે જોડાયેલા મુખ્ય નિયમો, દસ્તાવેજીકરણના પગલાં અને જોખમ સીમાઓ આવરી લેવામાં આવી છે.`;
    } else if (lang === 'mr') {
      cleanSummary = `महत्त्वाचे मुद्दे: या प्रकरणात ${cleanTitle} शी संबंधित मुख्य नियम, दस्तऐवजीकरण टप्पे आणि जोखीम मर्यादा समाविष्ट आहेत.`;
    } else {
      cleanSummary = `Key Takeaways: This lesson covers the operational definition, compliance guidelines, cost structure, and risk boundaries associated with ${cleanTitle}.`;
    }
  }

  // Ensure Simple Explanation (writtenExplanation) is NEVER identical to Definition
  if (!cleanWritten || cleanWritten.trim() === cleanDef.trim()) {
    if (lang === 'hi') {
      cleanWritten = `आसान शब्दों में कहें तो, ${cleanTitle} आपके व्यापारिक संचालन का सुरक्षात्मक माध्यम है, जो कार्गो हैंडलिंग को सरल बनाता है और वित्तीय नुकसान से बचाता है।`;
    } else if (lang === 'gu') {
      cleanWritten = `સરળ શબ્દોમાં કહીએ તો, ${cleanTitle} એ તમારા આંતરરાષ્ટ્રીય વેપારનું મહત્વપૂર્ણ સુરક્ષા માધ્યમ છે જે કન્સાઇનમેન્ટ અને ખર્ચનું રક્ષણ કરે છે.`;
    } else if (lang === 'mr') {
      cleanWritten = `सोप्या शब्दांत सांगायचे तर, ${cleanTitle} हे आंतरराष्ट्रीय व्यापाराचे एक महत्त्वाचे सुरक्षा माध्यम आहे जे कार्गो हाताळणी सुलभ करते आणि नुकसान टाळते.`;
    } else {
      cleanWritten = `In simple terms, ${cleanTitle} acts as a key protective operational mechanism for international trade, simplifying cargo handling and preventing logistics errors.`;
    }
  }

  return {
    ...translated,
    content: {
      ...translated?.content,
      definition: cleanDef,
      whyImportant: cleanWhy,
      businessExample: cleanEx,
      writtenExplanation: cleanWritten,
      summary: cleanSummary,
      keyPoints: cleanKeyPoints,
      commonMistakes: cleanMistakes,
      practicalTips: cleanTips,
      importantNotes: cleanNotes,
      objectives: cleanObjectives,
      faqs: cleanFaqs,
      quiz: (lang !== 'en' && lesson?.translations?.[lang]?.quiz) ? lesson.translations[lang].quiz : cleanQuiz
    }
  };
};
