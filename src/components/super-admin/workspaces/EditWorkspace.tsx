import React, { useState } from 'react';
import styles from './EditWorkspace.module.css';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

interface Workspace {
  id: number;
  name: string;
}

interface EditWorkspaceProps {
  workspace: Workspace;
  onSave: (updatedWorkspace: Workspace) => void;
  onCancel: () => void;
}

const EditWorkspace: React.FC<EditWorkspaceProps> = ({
  workspace,
  onSave,
  onCancel,
}) => {
  const { t } = useTranslation('editWorkspace'); 
  const [updatedName, setUpdatedName] = useState(workspace.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const handleSave = () => {
    onSave({ ...workspace, name: updatedName });
  };

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
          {/* Workspace Name */}
          <label className={styles.userLabel}>
            {t('workspaceName')}
            <input
              className={styles.userInput}
              type="text"
              value={updatedName}
              onChange={handleChange}
            />
          </label>

          {/* Workspace Admins */}
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

          {/* Add Workspace Admin */}
          <label className={styles.userLabel}>
            {t('addWorkspaceAdmin')}
            <div className={styles.userLabelAdd}>
              <input
                className={styles.userInput}
                type="email"
                placeholder={t('adminEmailPlaceholder')}
              />
              <button className={styles.saveButton}>{t('addButton')}</button>
            </div>
          </label>

          {/* Knowledge Graph */}
          <label className={styles.userLabel}>
            {t('knowledgeGraph')}
            <select className={styles.userSelect}>
              <option value="graph1">{t('knowledgeGraph1')}</option>
              <option value="graph2">{t('knowledgeGraph2')}</option>
            </select>
          </label>

          {/* Workspace Type */}
          <label className={styles.userLabel}>
            {t('workspaceType')}
            <select className={styles.userSelect}>
              <option value="private">{t('private')}</option>
              <option value="public">{t('public')}</option>
            </select>
          </label>

          {/* Buttons */}
          <div className={styles.buttons}>
            <button onClick={onCancel} className={styles.backButton}>
              {t('backButton')}
            </button>
            <button onClick={handleSave} className={styles.saveButton}>
              {t('saveButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkspace;
