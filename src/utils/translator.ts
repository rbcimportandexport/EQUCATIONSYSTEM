import { enTranslations } from '../translations/en';
import { hiTranslations } from '../translations/hi';
import { guTranslations } from '../translations/gu';
import { mrTranslations } from '../translations/mr';

const langMap: Record<string, any> = {
  en: enTranslations,
  hi: hiTranslations,
  gu: guTranslations,
  mr: mrTranslations
};

export const uiTranslations = {
  en: enTranslations.ui,
  hi: hiTranslations.ui,
  gu: guTranslations.ui,
  mr: mrTranslations.ui
};

export const moduleTitleTranslations = {
  hi: hiTranslations.moduleTitles,
  gu: guTranslations.moduleTitles,
  mr: mrTranslations.moduleTitles
};

export const moduleDescriptionTranslations = {
  hi: hiTranslations.moduleDescriptions,
  gu: guTranslations.moduleDescriptions,
  mr: mrTranslations.moduleDescriptions
};

export const lessonTextTranslations = {
  hi: hiTranslations.lessonTextOverrides,
  gu: guTranslations.lessonTextOverrides,
  mr: mrTranslations.lessonTextOverrides
};

export const translateModuleTitle = (
  title: string,
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  if (lang === 'en') return title;
  return langMap[lang]?.moduleTitles?.[title] || title;
};

export const translateModuleDescription = (
  desc: string,
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  if (lang === 'en') return desc;
  return langMap[lang]?.moduleDescriptions?.[desc] || desc;
};

export const translateLessonTitle = (
  title: string,
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  return langMap[lang]?.translateLessonTitle(title) || title;
};

export const translateDynamicContent = (
  text: string,
  title: string = '',
  lang: 'en' | 'hi' | 'gu' | 'mr'
): string => {
  return langMap[lang]?.translateDynamicContent(text, title) || text;
};

export const getTranslatedLesson = (
  lesson: any,
  lang: 'en' | 'hi' | 'gu' | 'mr'
) => {
  return langMap[lang]?.getTranslatedLesson(lesson) || lesson;
};
