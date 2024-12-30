import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import resources from './locales';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: [
      'chatSettings',
      'settings',
      'auth',
      'adaptationForm',
      'chatComponent',
      'explainWindowData',
      'chatHistoryData',
      'modalFilters',
      'usersSettings',
      'workspaceSettings',
      'superAdmin',
      'globalSettings',
      'accounts',
      'users',
      'userEdit',
      'workspaces',
      'editWorkspace',
      'addWorkspace',
    ],
    defaultNS: 'chatSettings',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
