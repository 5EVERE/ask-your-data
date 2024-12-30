import React, { useState, useEffect, useRef } from 'react';
import { IoSettingsOutline } from 'react-icons/io5'; // Settings icon
import { SlLogout } from 'react-icons/sl'; // Logout icon
import { Link, useNavigate } from 'react-router-dom';
import styles from './ModalProfile.module.css';

// Define props for the ModalProfile component
interface ProfileModalProps {
  isOpen: boolean; // Determines whether the modal is open
  onClose: () => void; // Callback to close the modal
}

const ModalProfile: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null); // Ref for modal container
  const [username, setUsername] = useState<string | null>(null); // State for username
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate(); // React Router navigation function

  // Fetch username from local storage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('user_role'); // Get stored token (replace with real username retrieval logic if needed)
    setUsername(storedUsername || 'lorem ipsum'); // Set default placeholder if no username
    setUserRole(storedUserRole || 'user');
  }, []);

  /**
   * Handles clicks outside the modal to close it.
   * @param event Mouse event
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Close modal if click is outside
    }
  };

  /**
   * Handles the logout process.
   * @param e Form event to prevent default behavior
   */
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated API call to handle logout
    (global as any).api
      .post('/auth/logout')
      .then((response: any) => {
        console.log('Logout Successful:', response.data);
        localStorage.removeItem('token'); // Clear the token from local storage
        localStorage.removeItem('workspaces');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        navigate('/auth'); // Redirect to authentication page
      })
      .catch((err: any) => {
        console.error('Logout Failed:', err);
      });
  };

  // Add event listener to detect clicks outside modal when it is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // If modal is closed, return null (do not render)
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      {/* Modal container */}
      <div className={styles.modal} ref={modalRef}>
        {/* Profile icon */}
        <div className={styles.modalLogo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            width="30"
            height="30"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>

        {/* Username */}
        <p className={styles.modalTitle}>{username}</p>

        {/* Divider line */}
        <div className={styles.modalLine}></div>

        {/* Settings and Logout buttons */}
        <div className={styles.modalButtons}>
          {/* Settings Button */}
          <Link
            onClick={onClose}
            to="/settings"
            className={styles.modalButtonSett}
          >
            <IoSettingsOutline
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
              }}
            />
            Settings
          </Link>
          {userRole === 'super_admin' && (
            <Link
              onClick={onClose}
              to="/super-admin"
              className={styles.modalButtonSett}
            >
              <IoSettingsOutline
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                }}
              />
              Super admin
            </Link>
          )}

          {/* Logout Button */}
          <button className={styles.modalButtonProf} onClick={handleLogout}>
            <SlLogout
              style={{
                position: 'absolute',
                left: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
              }}
            />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
