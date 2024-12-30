import React, { useState } from 'react';
import styles from './SourcesData.module.css';
import { BiSolidDownArrow } from 'react-icons/bi'; // Import down arrow icon

// Props interface for the SourcesData component
interface SourceItemProps {
  explainData: any; // The data containing sources for explanation
}

// Tabs for content switching
const tabs = ['Summary', 'Excerpt', 'Sources'];

// Main functional component for displaying sources
const SourcesData: React.FC<SourceItemProps> = ({ explainData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // State to track open accordion index
  const [activeTabs, setActiveTabs] = useState<number[]>(
    Array(explainData?.sources.length).fill(0) // Default tab is 'Summary' (index 0) for all sources
  );

  // Toggle function to open/close accordion items
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Close if open, otherwise open it
  };

  // Function to set the active tab for a specific source
  const setTabForSources = (sourceIndex: number, tabIndex: number) => {
    setActiveTabs((prevTabs) => {
      const newTabs = [...prevTabs]; // Create a copy of the previous active tabs
      newTabs[sourceIndex] = tabIndex; // Update the tab for the specific source
      return newTabs;
    });
  };

  return (
    <div className={styles.sourcesContainer}>
      {/* Main Title */}
      <h2 className={styles.mainTitle}>Sources</h2>

      {/* Map through sources to render individual accordions */}
      {explainData?.sources.map((item: any, index: number) => (
        <div
          key={item.id}
          className={`${styles.sourceItem} ${
            openIndex === index ? styles.active : '' // Add active class if the accordion is open
          }`}
        >
          {/* Accordion Header */}
          <div
            onClick={() => toggleAccordion(index)} // Toggle accordion open/close
            className={styles.sourceHeader}
          >
            <span>{item.excerpt}</span> {/* Display excerpt as title */}
            <BiSolidDownArrow
              className={`${styles.icon} ${
                openIndex === index ? styles.rotate : '' // Add rotate class if open
              }`}
            />
          </div>

          {/* Accordion Content */}
          {openIndex === index && (
            <div className={styles.sourceContent}>
              {/* Tabs for switching content */}
              <div className={styles.summaryRow}>
                {tabs.map((tab, tabIndex) => (
                  <button
                    key={tabIndex}
                    className={`${styles.tabButton} ${
                      activeTabs[index] === tabIndex ? styles.active : '' // Highlight active tab
                    }`}
                    onClick={() => setTabForSources(index, tabIndex)} // Set active tab
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className={styles.details}>
                {activeTabs[index] === 0 && <p>{item.citation}</p>} {/* Summary */}
                {activeTabs[index] === 1 && <p>{item.excerpt}</p>} {/* Excerpt */}
                {activeTabs[index] === 2 && <p>{item.source}</p>} {/* Sources */}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SourcesData;
