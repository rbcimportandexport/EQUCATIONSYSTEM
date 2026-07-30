import { getTranslatedLesson as originalGetTranslatedLesson } from './translator';

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

  // Clean embedded 'What is X?' in definition, explanation, summary
  let cleanDef = translated?.content?.definition || '';
  let cleanWhy = translated?.content?.whyImportant || '';
  let cleanEx = translated?.content?.businessExample || '';

  if (cleanTitle && lesson?.title && lesson.title !== cleanTitle) {
    const rawTitlePattern = new RegExp(lesson.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    cleanDef = cleanDef.replace(rawTitlePattern, cleanTitle);
    cleanWhy = cleanWhy.replace(rawTitlePattern, cleanTitle);
    cleanEx = cleanEx.replace(rawTitlePattern, cleanTitle);
  }

  return {
    ...translated,
    content: {
      ...translated?.content,
      definition: cleanDef,
      whyImportant: cleanWhy,
      businessExample: cleanEx,
      quiz: (lang !== 'en' && lesson?.translations?.[lang]?.quiz) ? lesson.translations[lang].quiz : cleanQuiz
    }
  };
};
