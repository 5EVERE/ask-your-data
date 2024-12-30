import React, { useState } from 'react';
import styles from './Workspaces.module.css';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import EditWorkspace from './EditWorkspace';
import { useTranslation } from 'react-i18next';

interface Workspace {
  id: number;
  name: string;
}

const Workspaces: React.FC = () => {
  const { t } = useTranslation('workspaces'); // Підключаємо простір перекладу 'workspaces'

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: 1, name: t('workspacesList.leadGeneration') },
    { id: 2, name: t('workspacesList.insuranceManagement') },
    { id: 3, name: t('workspacesList.contractManagement') },
    { id: 4, name: t('workspacesList.policyGuidance') },
    { id: 5, name: t('workspacesList.billingPayments') },
  ]);

  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null
  );

  const handleEdit = (workspaceId: number) => {
    const workspaceToEdit = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    setEditingWorkspace(workspaceToEdit || null);
  };

  const handleSave = (updatedWorkspace: Workspace) => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) =>
        workspace.id === updatedWorkspace.id ? updatedWorkspace : workspace
      )
    );
    setEditingWorkspace(null);
  };

  const handleCancel = () => {
    setEditingWorkspace(null);
  };

  if (editingWorkspace) {
    return (
      <EditWorkspace
        onSave={handleSave}
        onCancel={handleCancel}
        workspace={editingWorkspace}
      />
    );
  }

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        {/* Заголовок */}
        <h2 className={styles.title}>{t('title')}</h2>

        {/* Таблиця з робочими просторами */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.workspaceHeader}>
                {t('tableHeader.workspaceName')}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workspaces.map((workspace) => (
              <tr key={workspace.id}>
                <td className={styles.workspaceName}>{workspace.name}</td>
                <td className={styles.editCell}>
                  <HiOutlinePencilSquare
                    onClick={() => handleEdit(workspace.id)}
                    className={styles.editIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Кнопка додавання робочого простору */}
        <button className={styles.addWorkspaceButton}>
          {t('addWorkspaceButton')}
        </button>
      </div>
    </div>
  );
};

export default Workspaces;
