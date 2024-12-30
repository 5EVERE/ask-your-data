import React, { useState } from 'react';
import styles from './Users.module.css';
import { HiOutlinePencilSquare } from 'react-icons/hi2'; // Edit icon
import { RxCross2 } from 'react-icons/rx'; // Cross icon for deletion
import EditUser from './EditUser';
import { useTranslation } from 'react-i18next';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  workspaces: string;
}

const Users: React.FC = () => {
  const { t } = useTranslation('users'); // Ініціалізація i18next для простору 'users'

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: 'Rachel',
      lastName: 'Lee',
      status: 'active',
      workspaces: 'Lead Generation and Marketing',
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Jenkins',
      status: 'active',
      workspaces: 'Insurance Management',
    },
    {
      id: 3,
      firstName: 'David',
      lastName: 'Thompson',
      status: 'inactive',
      workspaces: 'Insurance Management, Policy...',
    },
    {
      id: 4,
      firstName: 'Daniel',
      lastName: 'Wright',
      status: 'active',
      workspaces: 'Contract Management',
    },
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (userId: number) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit || null);
  };

  const handleSave = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  if (editingUser) {
    return (
      <EditUser onSave={handleSave} onCancel={handleCancel} user={editingUser} />
    );
  }

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        {/* Заголовок */}
        <h2 className={styles.title}>{t('title')}</h2>

        {/* Таблиця користувачів */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('tableHeaders.firstName')}</th>
              <th>{t('tableHeaders.lastName')}</th>
              <th>{t('tableHeaders.status')}</th>
              <th>{t('tableHeaders.workspaces')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className={styles.boldText}>{user.firstName}</td>
                <td className={styles.boldText}>{user.lastName}</td>
                <td>{t(`status.${user.status.toLowerCase()}`)}</td>
                <td>{t(`workspaces.${user.workspaces.toLowerCase().replace(/ /g, '_')}`, user.workspaces)}</td>
                <td className={styles.icons}>
                  {/* Іконка редагування */}
                  <HiOutlinePencilSquare
                    title={t('edit')}
                    onClick={() => handleEdit(user.id)}
                    className={styles.editIcon}
                  />
                  {/* Іконка видалення */}
                  <RxCross2
                    title={t('delete')}
                    className={styles.deleteIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Кнопка додавання нового користувача */}
        <button className={styles.newUserButton}>{t('newUserButton')}</button>
      </div>
    </div>
  );
};

export default Users;
