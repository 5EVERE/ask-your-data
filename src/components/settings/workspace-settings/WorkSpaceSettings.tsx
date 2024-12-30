import React from 'react';
import styles from './WorkspaceSettings.module.css';
import { useTranslation } from 'react-i18next'; // Import translation hook

const WorkspaceSettings = () => {
  const { t } = useTranslation('workspaceSettings'); // Use translation namespace

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb}>
          {t('breadcrumb')} (
          <span className={styles.highlight}>{t('highlight')}</span>) &gt; {t('workspaceSettingsTitle')}
        </nav>

        {/* Title for Workspace Settings */}
        <p className={styles.optionTitle}>{t('workspaceSettingsTitle')}</p>

        {/* Settings Options */}
        <div className={styles.settings}>
          {/* Checkbox: Users allowed to add data */}
          <label className={styles.checkboxContainer}>
            <input type="checkbox" />
            <span className={styles.customCheckbox}></span>
            {t('addDataPermission')}
          </label>

          {/* Checkbox: Users can see each other's chats */}
          <label className={styles.checkboxContainer}>
            <input type="checkbox" />
            <span className={styles.customCheckbox}></span>
            {t('viewChatsPermission')}
          </label>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSettings;
