import React, { useState, useRef } from 'react';
import styles from './ExplainWindow.module.css';
import ExplainWindowData from './ExplainWindowData';
import { SelectedMessage } from '../Main';
import { useTranslation } from 'react-i18next';

// Interface for component props
interface ExplainWindowProps {
  hasResponse: boolean; // Indicates if there is a response to display
  setIsOpen: (value: any) => void; // Function to toggle open/close state
  isOpen: boolean; // Boolean for panel visibility state
  selectedMessage: SelectedMessage; // Selected message data
  width: number; // Width of the explain panel
  setWidth: (item: any) => void; // Function to update the panel width
  explainData: any; // Data to be displayed in the explanation panel
}

const ExplainWindow: React.FC<ExplainWindowProps> = ({
  hasResponse,
  setIsOpen,
  isOpen,
  selectedMessage,
  width,
  setWidth,
  explainData,
}) => {
  const { t } = useTranslation('chatComponent');
  // Refs for resizing behavior
  const isResizing = useRef<boolean>(false); // Tracks if resizing is active
  const lastMouseX = useRef<number>(0); // Tracks the last mouse X position

  // Logs the explanation data for debugging
  console.log(explainData);

  // Handles the start of resizing (mousedown event)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true; // Set resizing state to true
    lastMouseX.current = e.clientX; // Record current mouse position
    // Add mousemove and mouseup listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handles mouse movement while resizing
  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      const dx = e.clientX - lastMouseX.current; // Calculate change in mouse position
      setWidth((prevWidth: number) => Math.max(300, prevWidth - dx)); // Update width but maintain a minimum width of 300px
      lastMouseX.current = e.clientX; // Update last mouse position
    }
  };

  // Handles the end of resizing (mouseup event)
  const handleMouseUp = () => {
    isResizing.current = false; // Set resizing state to false
    document.removeEventListener('mousemove', handleMouseMove); // Remove listeners
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Toggles the visibility of the panel
  const togglePanel = () => {
    setIsOpen((prev: any) => !prev); // Toggle the open/close state
  };

  return (
    <section className={styles.section} style={{ position: 'relative' }}>
      {/* Display button to open the panel if there is a response and the panel is closed */}
      {hasResponse && !isOpen && (
        <div
          onClick={togglePanel}
          className={`${styles.arrowBtnHolder} ${isOpen && styles.hide}`}
        >
          <button className={styles.arrowBtn}>i</button>
          <p>{t('letMeExplain')}</p>
        </div>
      )}

      {/* Main container for the explain panel */}
      <div className={styles.container}>
        <div
          className={`${styles.explainContainer} ${isOpen ? styles.open : ''}`}
          style={{ width: `${width}px` }} // Dynamic width for resizing
        >
          {/* Resizing handle */}
          <div
            className={styles.resizeHandle}
            onMouseDown={handleMouseDown} // Trigger resizing
          ></div>

          {/* Content of the explanation panel */}
          <div className={styles.explainPanel}>
            {/* Render the explanation data */}
            <ExplainWindowData
              explainData={explainData}
              onClick={togglePanel} // Pass toggle function
              selectedMessage={selectedMessage}
            />
          </div>

          {/* Placeholder for additional toggle buttons */}
        </div>
      </div>
    </section>
  );
};

export default ExplainWindow;
