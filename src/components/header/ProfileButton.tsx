import React from 'react';
import styles from './ProfileButton.module.css'; // Importing CSS module for button styling

// Props interface for button component
interface Props {
  onClick: () => void; // Function to handle button click events
}

// ProfileButton component definition
const Button: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}> {/* Button with onClick handler */}
      {/* Profile icon as SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.2}
        stroke="currentColor"
        width="30"
        height="30"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </button>
  );
};

export default Button; // Exporting Button component for use in other parts of the app
