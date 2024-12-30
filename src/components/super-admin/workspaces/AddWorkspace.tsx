import React from 'react';
import styles from './AddWorkspace.module.css';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

const AddWorkspace: React.FC = () => {
  const { t } = useTranslation('addWorkspace');

  const workspacesAdd = [
    { name: t('workspacesList.leadGeneration') },
    { name: t('workspacesList.insuranceManagement') },
    { name: t('workspacesList.contractManagement') },
  ];

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          {t('breadcrumb')} &gt; <span>{t('addWorkspace')}</span>
        </nav>

        <h2 className={styles.title}>{t('addWorkspace')}</h2>

        <form className={styles.userForm}>
          {/* Workspace name */}
          <label className={styles.userLabel}>
            {t('workspaceName')}
            <input
              className={styles.userInput}
              type="text"
              name="workspace name"
              value={'Lorem ipsum'}
            />
          </label>

          {/* Workspace admins */}
          <label className={styles.userLabel}>
            {t('workspaceAdmins')}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('workspaceName')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workspacesAdd.map((workspace, index) => (
                  <tr key={index}>
                    <td className={styles.workspaceName}>{workspace.name}</td>
                    <td className={styles.editCell}>
                      <HiOutlinePencilSquare className={styles.editIcon} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </label>

          {/* Add workspace admin */}
          <label className={styles.userLabel}>
            {t('addWorkspaceAdmin')}
            <div className={styles.userLabelAdd}>
              <input
                className={styles.userInput}
                type="email"
                name="email"
                placeholder={t('adminEmailPlaceholder')}
              />
              <button type="button" className={styles.saveButton}>
                {t('addButton')}
              </button>
            </div>
          </label>

          {/* Knowledge graph */}
          <label className={styles.userLabel}>
            {t('knowledgeGraph')}
            <select className={styles.userSelect} name="graph">
              <option value="graph1">{t('knowledgeGraph1')}</option>
              <option value="graph2">{t('knowledgeGraph2')}</option>
            </select>
          </label>

          {/* Workspace type */}
          <label className={styles.userLabel}>
            {t('workspaceType')}
            <select className={styles.userSelect} name="type">
              <option value="Private">{t('private')}</option>
              <option value="Public">{t('public')}</option>
            </select>
          </label>

          {/* Buttons */}
          <div className={styles.buttons}>
            <button type="button" className={styles.backButton}>
              {t('backButton')}
            </button>
            <button type="button" className={styles.saveButton}>
              {t('addWorkspaceButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkspace;
