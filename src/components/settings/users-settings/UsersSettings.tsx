import React from 'react';
import styles from './UsersSettings.module.css';
import { HiOutlinePencilSquare } from "react-icons/hi2"; // Edit icon for user actions
import { useTranslation } from 'react-i18next'; // Import translation hook

// Define the User interface
interface User {
  firstName: string; // User's first name
  lastName: string;  // User's last name
  role: string;      // User's role (e.g., "Team member" or "Workspace admin")
}

const UsersSettings: React.FC = () => {
  const { t } = useTranslation('usersSettings'); // Use translation namespace

  // Static list of users (can be fetched from an API in a real-world app)
  const users: User[] = [
    { firstName: 'Rachel', lastName: 'Lee', role: t('teamMember') },
    { firstName: 'Sarah', lastName: 'Jenkins', role: t('teamMember') },
    { firstName: 'David', lastName: 'Thompson', role: t('workspaceAdmin') },
    { firstName: 'Daniel', lastName: 'Wright', role: t('teamMember') },
    { firstName: 'Sarah', lastName: 'Jenkins', role: t('teamMember') },
    { firstName: 'David', lastName: 'Thompson', role: t('workspaceAdmin') },
    { firstName: 'Daniel', lastName: 'Wright', role: t('teamMember') },
  ];

  return (
    <div className={styles.optionContainer}>
      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb}>
          {t('breadcrumb')} (
          <span className={styles.highlight}>{t('highlight')}</span>) &gt; {t('usersTitle')}
        </nav>

        {/* Page Title */}
        <h2 className={styles.title}>{t('usersTitle')}</h2>

        {/* User Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('firstName')}</th>
              <th>{t('lastName')}</th>
              <th>{t('role')}</th>
              <th></th> {/* Empty column for action icons */}
            </tr>
          </thead>
          <tbody>
            {/* Render each user as a table row */}
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
                <td>
                  {/* Edit Icon */}
                  <HiOutlinePencilSquare className={styles.editIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* New User Button */}
        <button className={styles.newUserButton}>{t('newUserButton')}</button>
      </div>
    </div>
  );
};

export default UsersSettings;
