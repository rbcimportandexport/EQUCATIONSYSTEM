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
            qText = `${translatedTerm} ચા काय अर्थ/कार्य आहे?`;
          }
        } else {
          qText = translateDynamicContent(qText, lesson?.title || '', lang);
        }

        // 2. Translate Options Array if in English
        qOpts = qOpts.map((opt: string) => {
          if (!opt) return opt;
          if (opt === 'An illegal trade practice.') {
            return lang === 'hi' ? 'एक अवैध व्यापार प्रथा।' : lang === 'gu' ? 'એક ગેરકાયદેસર વેપાર પદ્ધતિ.' : 'एक बेकायदेशीर व्यापार पद्धत.';
          }
          if (opt === 'A tax penalty.') {
            return lang === 'hi' ? 'एक टैक्स जुर्माना।' : lang === 'gu' ? 'એક ટેક્સ દંડ.' : 'एक टॅक्स दंड.';
          }
          if (opt === 'A shipping carrier.') {
            return lang === 'hi' ? 'एक शिपिंग वाहक (Shipping Carrier)।' : lang === 'gu' ? 'એક શિપિંગ કેરિયર.' : 'एक शिपिंग वाहक.';
          }
          return translateDynamicContent(opt, lesson?.title || '', lang);
        });

        // 3. Translate Explanation if in English
        if (qExp) {
          qExp = translateDynamicContent(qExp, lesson?.title || '', lang);
        }
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
