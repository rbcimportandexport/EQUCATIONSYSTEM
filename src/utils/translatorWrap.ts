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
      
      // Clean embedded 'What is X?' or double ?? in question text
      if (lesson?.title) {
        qText = qText.replace(new RegExp(`purpose of ${lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\?\\?`, 'gi'), `purpose of ${cleanTitle}?`);
        qText = qText.replace(new RegExp(`purpose of ${lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), `purpose of ${cleanTitle}`);
        qText = qText.replace(new RegExp(`related to ${lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), `related to ${cleanTitle}`);
        qText = qText.replace(new RegExp(`mishandling ${lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), `mishandling ${cleanTitle}`);
        qText = qText.replace(new RegExp(`Is it true that ${lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), `Is it true that ${cleanTitle}`);
        qText = qText.replace(new RegExp(`Does ${lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), `Does ${cleanTitle}`);
      }

      // Replace generic double question marks ?? -> ?
      qText = qText.replace(/\?\?/g, '?');

      return {
        ...q,
        question: qText
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
