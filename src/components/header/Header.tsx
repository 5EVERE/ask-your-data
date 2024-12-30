import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css'; // Importing CSS module for styling
import ProfileButton from './ProfileButton'; // Importing profile button component
import { IoIosArrowDown } from 'react-icons/io'; // Importing dropdown arrow icon
import { Link } from 'react-router-dom'; // For navigation links
import ModalProfile from '../Modal/ModalProfile'; // Importing modal profile component
import { Workspace } from '../../App';

interface HeaderProps {
  workspaces: Workspace[];
  setWorkspaces: (onj: any) => void;
  selectedWorkspace: string;
  setSelectedWorkspace: (workspace: string) => void;
  selectedWorkspaceId: number | undefined;
  setSelectedWorkspaceId: (workspaceId: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  workspaces,
  setWorkspaces,
  selectedWorkspace,
  setSelectedWorkspace,
  selectedWorkspaceId,
  setSelectedWorkspaceId,
}) => {
  const [isModalOpen, setModalOpen] = useState(false); // State for controlling profile modal visibility

  const modalRef = useRef<HTMLDivElement | null>(null); // Ref for modal container

  // Load workspace data from localStorage on component mount
  useEffect(() => {
    const storedWorkspaces = localStorage.getItem('workspaces');
    if (storedWorkspaces) {
      const parsedWorkspaces: Workspace[] = JSON.parse(storedWorkspaces);
      setWorkspaces(parsedWorkspaces);
      setSelectedWorkspace(parsedWorkspaces[0]?.name || ''); // Select the first workspace by default
      setSelectedWorkspaceId(parsedWorkspaces[0]?.workspace_id || 1);
    }
  }, []);

  // Handle workspace selection changes
  const handleWorkspaceChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedName = event.target.value;
    setSelectedWorkspace(selectedName);

    const selectedWorkspaceObj = workspaces.find(
      (workspace) => workspace.name === selectedName
    );

    if (selectedWorkspaceObj) {
      setSelectedWorkspaceId(selectedWorkspaceObj.workspace_id);
    }
  };

  // Close the modal when clicking outside of it
  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
  };

  // Attach and clean up click event listener for modal behavior
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle profile modal visibility
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <header className={styles.header}>
      {' '}
      {/* Header section */}
      <div className={styles.container}>
        {' '}
        {/* Container for header content */}
        {/* Logo section */}
        <Link to={'/chat'} className={styles.logo}>
          <img src={'/img/AskYourDataLogo.png'} alt="Logo" /> {/* Logo image */}
        </Link>
        {/* Right section containing dropdown and profile button */}
        <div className={styles.rightSection}>
          {/* Workspace dropdown selection */}
          <div className={styles.dropdown}>
            <select value={selectedWorkspace} onChange={handleWorkspaceChange}>
              {workspaces.map((workspace) => (
                <option key={workspace.workspace_id} value={workspace.name}>
                  {workspace.name}
                </option>
              ))}
            </select>
            {/* Dropdown arrow icon */}
            <IoIosArrowDown
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '20px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Profile button to open modal */}
          <ProfileButton onClick={toggleModal} />
        </div>
      </div>
      {/* Profile modal */}
      <ModalProfile isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
};

export default Header; // Exporting Header component for use in the app
