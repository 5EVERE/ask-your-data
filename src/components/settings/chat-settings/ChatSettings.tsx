import React, { useEffect, useState } from 'react';
import styles from './ChatSettings.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

interface Settings {
  precision_threshold: string;
  language: string;
  system_role: string;
}

/**
 * ChatSettings Component
 * 
 * This component provides an interface to configure chat-related settings such as:
 * - Precision Threshold
 * - Language
 * - System Role
 * 
 * Changes to settings are saved automatically via API requests, and language changes are reflected instantly using `i18next`.
 */
function ChatSettings() {
  const { t, i18n } = useTranslation('chatSettings'); // Translation hook with 'chatSettings' namespace

  const [settings, setSettings] = useState<Settings>({
    precision_threshold: '',
    language: i18n.language,
    system_role: '',
  });

  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  /**
   * Fetches the current settings from the API when the component mounts.
   */
  useEffect(() => {
    (global as any).api
      .get('/settings')
      .then((response: any) => {
        setSettings((prev) => ({ ...prev, ...response.data }));
      })
      .catch((error: any) => console.error('Error fetching settings:', error));
  }, []);

  /**
   * Handles updates to settings and saves changes via an API call.
   * If the updated field is 'language', it also triggers a language change using i18next.
   * 
   * @param field The setting field to update (precision_threshold, language, or system_role)
   * @param value The new value for the field
   */
  const handleUpdateSettings = (field: keyof Settings, value: string) => {
    const updatedSettings = { ...settings, [field]: value };
    setSettings(updatedSettings);

    // Change application language if the 'language' field is updated
    if (field === 'language') {
      i18n.changeLanguage(value);
    }

    // Save the updated settings to the backend API
    (global as any).api
      .post('/settings', updatedSettings)
      .then(() => {
        console.log('Settings updated successfully');
        setSavedNotification(true); // Show success notification
        setTimeout(() => setSavedNotification(false), 2000);
      })
      .catch((error: any) => console.error('Error updating settings:', error));
  };

  return (
    <div className={styles.optionContainer}>
      {/* Title Section with Save Notification */}
      <div className={styles.titleContainer}>
        <p className={styles.optionTitle}>{t('title')}</p>
        {savedNotification && (
          <p className={styles.savedNotification}>{t('savedNotification')}</p>
        )}
      </div>

      {/* Precision Threshold Dropdown */}
      <div className={styles.optionInputs}>
        <div className={styles.optionSelect}>
          <label>{t('precisionThreshold')}</label>
          <div className={styles.dropdown}>
            <select
              className={styles.treshold}
              value={settings.precision_threshold}
              onChange={(e) =>
                handleUpdateSettings('precision_threshold', e.target.value)
              }
            >
              <option value="High">{t('options.precision.high')}</option>
              <option value="Medium">{t('options.precision.medium')}</option>
              <option value="Low">{t('options.precision.low')}</option>
            </select>
            <IoIosArrowDown
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '20px',
              }}
              className={styles.arrowIcon}
            />
          </div>
        </div>

        {/* Language Selection Dropdown */}
        <div className={styles.optionSelect}>
          <label>{t('language')}</label>
          <div className={styles.dropdown}>
            <select
              className={styles.language}
              value={settings.language}
              onChange={(e) => handleUpdateSettings('language', e.target.value)}
            >
              <option value="en">{t('options.languages.english')}</option>
              <option value="fr">{t('options.languages.french')}</option>
              <option value="de">{t('options.languages.german')}</option>
            </select>
            <IoIosArrowDown
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '20px',
              }}
              className={styles.arrowIcon}
            />
          </div>
        </div>

        {/* System Role Selection Dropdown */}
        <div className={styles.optionSelect}>
          <label>{t('systemRole')}</label>
          <div className={styles.dropdown}>
            <select
              className={styles.role}
              value={settings.system_role}
              onChange={(e) =>
                handleUpdateSettings('system_role', e.target.value)
              }
            >
              <option value="Legal affairs expert">
                {t('options.roles.legalExpert')}
              </option>
              <option value="Legal advisor">
                {t('options.roles.legalAdvisor')}
              </option>
              <option value="Compliance manager">
                {t('options.roles.complianceManager')}
              </option>
            </select>
            <IoIosArrowDown
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '20px',
              }}
              className={styles.arrowIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSettings;
