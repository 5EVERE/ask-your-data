import React, { useState } from 'react';
import styles from './GlobalSettings.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const GlobalSettings: React.FC = () => {
  const { t, i18n } = useTranslation('globalSettings');

  const [name] = useState<string>('PrimeTech');
  const [language, setLanguage] = useState(i18n.language);
  const [status, setStatus] = useState<string>('active');

  const handleUpdateSettings = (field: string, value: string) => {
    if (field === 'language') {
      i18n.changeLanguage(value); // Change i18n language
      setLanguage(value);
    } else if (field === 'status') {
      setStatus(value);
    }
  };

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb}>{t('breadcrumb')}</nav>

        {/* Title */}
        <h2 className={styles.title}>{t('title')}</h2>

        {/* Name Section */}
        <div className={styles.settingRow}>
          <label>{t('nameLabel')}</label>
          <div className={styles.inputBox}>{name}</div>
        </div>

        {/* Account Language Section */}
        <div className={styles.settingRow}>
          <label>{t('accountLanguage')}</label>
          <div className={styles.dropdownContainer}>
            <select
              className={styles.selectBox}
              value={language}
              onChange={(e) => handleUpdateSettings('language', e.target.value)}
            >
              <option value="en">{t('languageOptions.english')}</option>
              <option value="fr">{t('languageOptions.french')}</option>
              <option value="de">{t('languageOptions.german')}</option>
            </select>
            <IoIosArrowDown className={styles.arrowIcon} />
          </div>
        </div>

        {/* Status Section */}
        <div className={styles.settingRow}>
          <label>{t('status')}</label>
          <div className={styles.dropdownContainer}>
            <select
              className={styles.selectBox}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">{t('statusOptions.active')}</option>
              <option value="inactive">{t('statusOptions.inactive')}</option>
            </select>
            <IoIosArrowDown className={styles.arrowIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;
