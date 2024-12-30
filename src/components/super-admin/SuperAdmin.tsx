import React, { useState, useEffect } from 'react';
import styles from './SuperAdmin.module.css';
import { SlLogout } from 'react-icons/sl';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { IoBagRemoveOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next'; // Import for translation
import { useNavigate } from 'react-router-dom';

// Import child components
import Accounts from './accounts/Accounts';
import Users from './users/Users';
import Workspaces from './workspaces/Workspaces';
import GlobalSettings from './global-settings/GlobalSettings';
import AddWorkspace from './workspaces/AddWorkspace';

interface SettingsProps {}

const SuperAdmin: React.FC<SettingsProps> = () => {
  const { t } = useTranslation('superAdmin'); // Translation namespace
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [activeWindow, setActiveWindow] = useState<any>();
  const navigate = useNavigate();

  // Change active window dynamically
  useEffect(() => {
    switch (activeButton) {
      case 1:
        setActiveWindow(<Accounts />);
        break;
      case 2:
        setActiveWindow(<GlobalSettings />);
        break;
      case 3:
        setActiveWindow(<Users />);
        break;
      case 4:
        setActiveWindow(<Workspaces />);
        break;
      case 5:
        setActiveWindow(<AddWorkspace />);
        break;
      default:
        setActiveWindow(<Accounts />);
        break;
    }
  }, [activeButton]);

  const handleComponentChange = (index: number) => setActiveButton(index);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('workspaces');
    localStorage.removeItem('user_id');
    navigate('/auth');
  };

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.panelContainer}>
        {/* Section Title */}
        <h2 className={styles.settingsTitle}>{t('superAdminTitle')}</h2>

        {/* Buttons */}
        <div className={styles.linkButtons}>
          <button
            onClick={() => handleComponentChange(1)}
            className={`${styles.accounts} ${
              activeButton === 1 ? styles.active : ''
            }`}
          >
            {t('accounts')}
            <HiOutlineBuildingOffice className={styles.iconTitle} />
          </button>

          <div className={styles.dropdown}>
            <select>
              <option>NeuraWave</option>
            </select>
            <IoIosArrowDown
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '40px',
              }}
            />
          </div>

          <button
            onClick={() => handleComponentChange(2)}
            className={`${styles.globalS} ${
              activeButton === 2 ? styles.active : ''
            }`}
          >
            {t('globalSettings')}
          </button>

          <button
            onClick={() => handleComponentChange(3)}
            className={`${styles.users} ${
              activeButton === 3 ? styles.active : ''
            }`}
          >
            {t('users')}
          </button>

          <button
            onClick={() => handleComponentChange(4)}
            className={`${styles.workspace} ${
              activeButton === 4 ? styles.active : ''
            }`}
          >
            {t('workspaces')}
            <IoBagRemoveOutline className={styles.iconTitle} />
          </button>

          <button
            onClick={() => handleComponentChange(5)}
            className={`${styles.addWorkspace} ${
              activeButton === 5 ? styles.active : ''
            }`}
          >
            {t('addWorkspace')}
          </button>

          {/* Logout */}
          <button onClick={handleLogout} className={`${styles.logOut}`}>
            {t('logout')}
            <SlLogout className={styles.iconTitle} />
          </button>
        </div>
      </div>

      {/* Render dynamic content */}
      {activeWindow}
    </div>
  );
};

export default SuperAdmin;
