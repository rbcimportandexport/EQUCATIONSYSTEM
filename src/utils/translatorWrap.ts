import { getTranslatedLesson as originalGetTranslatedLesson } from './translator';

export const getTranslatedLesson = (lesson: any, lang: 'en' | 'hi' | 'gu' | 'mr') => {
  const translated = originalGetTranslatedLesson(lesson, lang);
  if (lang !== 'en' && lesson?.translations?.[lang]?.quiz) {
    return {
      ...translated,
      content: {
        ...translated.content,
        quiz: lesson.translations[lang].quiz
      }
    };
  }
  return translated;
};
