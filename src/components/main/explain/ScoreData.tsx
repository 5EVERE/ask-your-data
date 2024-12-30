import React, { useState } from 'react';
import styles from './ScoreData.module.css';
import { BiSolidDownArrow } from 'react-icons/bi'; // Import the down arrow icon
import { useTranslation } from 'react-i18next';

interface ScoreDataProps {
  explainData: any; // Data passed to the component
}

// Define tabs for switching content within each accordion
const tabs = ['Summary', 'Excerpt', 'Sources'];



const ScoreData: React.FC<ScoreDataProps> = ({ explainData }) => {
  const {t} = useTranslation('explainWindowData');
  // State to track which accordion is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // State to track active tabs for each accordion
  const [activeTabs, setActiveTabs] = useState<number[]>(
    Array(explainData?.uncertainties.length).fill(0) // Default to first tab for all accordions
  );

  // Toggles the open/close state of the accordion item
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, otherwise open it
  };

  // Sets the active tab for a specific accordion item
  const setTabForAccordion = (accordionIndex: number, tabIndex: number) => {
    setActiveTabs((prevTabs) => {
      const newTabs = [...prevTabs]; // Copy the previous tab states
      newTabs[accordionIndex] = tabIndex; // Update the specific accordion's active tab
      return newTabs;
    });
  };

  return (
    <div className={styles.mainScore}>
      {/* Title for the reliability score section */}
      <div className={styles.mainTitle}>{t('reliabilityScore')}</div>

      {/* Circular score display */}
      <div className={styles.circleScore}>
        <div
          style={
            {
              '--progress': `${explainData?.reliability_score}%`, // Pass reliability score dynamically
            } as React.CSSProperties
          }
          className={styles.chatCircle}
        >
          <div className={styles.centreCircle}></div>
        </div>
        {/* Numeric display of the reliability score */}
        <div
          className={styles.scoreNum}
        >{`${explainData?.reliability_score}%`}</div>
      </div>

      {/* Uncertainties section */}
      <div className={styles.accordionContainer}>
        {/* Section header */}
        <p className={styles.header}>
          {t('uncertainties')} ({explainData?.uncertainties.length})
        </p>

        {/* Mapping through uncertainties to create accordions */}
        {explainData?.uncertainties.map((item: any, index: number) => (
          <div
            key={index}
            className={`${styles.accordionItem} ${
              openIndex === index ? styles.active : '' // Add active class if this accordion is open
            }`}
          >
            {/* Accordion header with clickable toggle */}
            <div
              className={styles.accordionHeader}
              onClick={() => toggleAccordion(index)} // Toggle accordion on click
            >
              <span>{item.excerpt}</span> {/* Display excerpt as title */}
              <BiSolidDownArrow
                className={`${styles.icon} ${
                  openIndex === index ? styles.rotate : '' // Rotate icon when open
                }`}
              />
            </div>

            {/* Accordion content - only visible when open */}
            {openIndex === index && (
              <div className={styles.accordionContent}>
                {/* Tabs for switching between Summary, Excerpt, and Sources */}
                <div className={styles.summaryRow}>
                  {tabs.map((tab, tabIndex) => (
                    <button
                      key={tabIndex}
                      className={`${styles.tabButton} ${
                        activeTabs[index] === tabIndex ? styles.active : '' // Highlight active tab
                      }`}
                      onClick={() => setTabForAccordion(index, tabIndex)} // Set active tab
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Display content based on active tab */}
                <div className={styles.details}>
                  {activeTabs[index] === 0 && (
                    <p>{item.summary}</p> // Display Summary
                  )}
                  {activeTabs[index] === 1 && (
                    <p>{item.excerpt}</p> // Display Excerpt
                  )}
                  {activeTabs[index] === 2 && (
                    <p>{item.sources}</p> // Display Sources
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreData;
