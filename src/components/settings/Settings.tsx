import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2';
import { SlLogout } from 'react-icons/sl';
import { CgProfile } from 'react-icons/cg';
import { IoBagRemoveOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineUsers, HiOutlineDocumentArrowDown } from 'react-icons/hi2';
import WorkspaceSettings from './workspace-settings/WorkSpaceSettings';
import ChatSettings from './chat-settings/ChatSettings';
import ProfileSettings from './profile-settings/ProfileSettings';
import UsersSettings from './users-settings/UsersSettings';
import { useNavigate } from 'react-router-dom';
import { Workspace } from '../../App';
import { useTranslation } from 'react-i18next';

interface SettingsProps {
  workspaces: Workspace[];
  setWorkspaces: (onj: any) => void;
  selectedWorkspace: string;
  setSelectedWorkspace: (workspace: string) => void;
  selectedWorkspaceId: number | undefined;
  setSelectedWorkspaceId: (workspaceId: number) => void;
}

const Settings: React.FC<SettingsProps> = ({
  workspaces,
  setWorkspaces,
  selectedWorkspace,
  setSelectedWorkspace,
  setSelectedWorkspaceId,
  selectedWorkspaceId,
}) => {
  const [activeButton, setActiveButton] = useState<number | null>(2);
  const [userRole, setUserRole] = useState('');
  const [activeWindow, setActiveWindow] = useState<any>();

  const { t } = useTranslation('settings'); // Translation hook
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserRole = localStorage.getItem('user_role');
    setUserRole(storedUserRole || 'user');
    const storedWorkspaces = localStorage.getItem('workspaces');
    if (storedWorkspaces) {
      const parsedWorkspaces: Workspace[] = JSON.parse(storedWorkspaces);
      setWorkspaces(parsedWorkspaces);
      setSelectedWorkspace(parsedWorkspaces[0]?.name || '');
      setSelectedWorkspaceId(parsedWorkspaces[0]?.workspace_id || 1);
    }
  }, []);

  useEffect(() => {
    switch (activeButton) {
      case 1:
        setActiveWindow(<ProfileSettings />);
        break;
      case 2:
        setActiveWindow(<ChatSettings />);
        break;
      case 3:
        setActiveWindow(<UsersSettings />);
        break;
      case 4:
        setActiveWindow(<WorkspaceSettings />);
        break;
      default:
        setActiveWindow(<ChatSettings />);
        break;
    }
  }, [activeButton]);

  const handleComponentChange = (index: number) => {
    setActiveButton(index);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('workspaces');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role')
    navigate('/auth');
  };

  const handleWorkspaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setSelectedWorkspace(selectedName);

    const selectedWorkspaceObj = workspaces.find(
      (workspace) => workspace.name === selectedName
    );

    if (selectedWorkspaceObj) {
      setSelectedWorkspaceId(selectedWorkspaceObj.workspace_id);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.panelContainer}>
        <h2 className={styles.settingsTitle}>{t('title')}</h2>

        {/* Profile and Chat Settings Buttons */}
        <div className={styles.linkButtons}>
          <button
            onClick={() => handleComponentChange(1)}
            className={`${styles.profile} ${activeButton === 1 ? styles.active : ''}`}
          >
            {t('profileSettings')}
            <CgProfile className={styles.iconTitle} />
          </button>
          <button
            onClick={() => handleComponentChange(2)}
            className={`${styles.chat} ${activeButton === 2 ? styles.active : ''}`}
          >
            {t('chatSettings')}
            <HiOutlineChatBubbleBottomCenter className={styles.iconTitle} />
          </button>
          <button onClick={handleLogout} className={`${styles.logOut}`}>
            {t('logout')}
            <SlLogout className={styles.iconTitle} />
          </button>
        </div>

        {/* Workspace Admin Section */}
        {(userRole === 'workspace_admin' || userRole === 'super_admin') && (
          <>
            <h2 className={styles.settingsTitle}>{t('workspaceAdminSettings')}</h2>
            <div className={styles.dropdown}>
              <select value={selectedWorkspace} onChange={handleWorkspaceChange}>
                {workspaces.map((workspace) => (
                  <option key={workspace.workspace_id} value={workspace.name}>
                    {workspace.name}
                  </option>
                ))}
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

            <div className={styles.linkButtons}>
              <button
                onClick={() => handleComponentChange(3)}
                className={`${styles.users} ${activeButton === 3 ? styles.active : ''}`}
              >
                {t('users')}
                <HiOutlineUsers className={styles.iconTitle} />
              </button>
              <button
                onClick={() => handleComponentChange(4)}
                className={`${styles.workspace} ${activeButton === 4 ? styles.active : ''}`}
              >
                {t('workspaceSettings')}
                <IoBagRemoveOutline className={styles.iconTitle} />
              </button>
              <button
                className={`${styles.adddata} ${activeButton === 5 ? styles.active : ''}`}
                onClick={() => handleComponentChange(5)}
              >
                {t('addDataToWorkspace')}
                <HiOutlineDocumentArrowDown className={styles.iconTitle} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Dynamic Active Component */}
      {activeWindow}
    </div>
  );
};

export default Settings;
