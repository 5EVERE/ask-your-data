import React, { useRef, useState, useEffect } from 'react';
import styles from './ModalFilters.module.css';
import { useTranslation } from 'react-i18next';

// Define props for the Modal component
interface ModalProps {
  isOpen: boolean; // Determines if the modal is visible
  onClose: () => void; // Callback function to close the modal
  onSaveFilters: (filters: Filters) => void; // Function to pass the selected filters
  isChatting: boolean;
}

interface Filters {
  writingStyle: string[];
  dataSources: string[];
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSaveFilters, isChatting }) => {
  const {t} = useTranslation('modalFilters');
  const writingStyles = [
    { id: 'concise', label: `${t('styles.concise')}` },
    { id: 'explanatory', label: `${t('styles.explanatory')}` },
    { id: 'formal', label: `${t('styles.formal')}` },
    { id: 'creative', label: `${t('styles.creative')}` },
  ];
  
  const dataSources = [
    { id: 'workspace', label: `${t('sources.workspace')}` },
    { id: 'general-ai', label: `${t('sources.generalAI')}`},
  ];
  
  // Ref to track the modal container
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    writingStyle: [],
    dataSources: [],
  });

  // Handle writing style selection
  const handleWritingStyleChange = (source: string) => {
    const updatedSources = selectedFilters.writingStyle.includes(source)
      ? selectedFilters.writingStyle.filter((s) => s !== source)
      : [...selectedFilters.writingStyle, source];

    const updatedFilters = {
      ...selectedFilters,
      writingStyle: updatedSources,
    };
    setSelectedFilters(updatedFilters);
    onSaveFilters(updatedFilters); // Save automatically
  };

  // Handle data sources toggle
  const handleDataSourcesChange = (source: string) => {
    const updatedSources = selectedFilters.dataSources.includes(source)
      ? selectedFilters.dataSources.filter((s) => s !== source)
      : [...selectedFilters.dataSources, source];

    const updatedFilters = { ...selectedFilters, dataSources: updatedSources };
    setSelectedFilters(updatedFilters);
    onSaveFilters(updatedFilters); // Save automatically
  };

  /**
   * Handles clicks outside the modal container to close the modal.
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // Attach and detach the event listener for clicks outside the modal
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${isChatting && styles.modalChatting}`} ref={modalRef}>
        <p className={styles.modalTitle}>{t('promptSettings')}</p>

        <div className={styles.modalContent}>
          {/* Writing Style Section */}
          <div className={styles.modalSection}>
            <p className={styles.modalLabel}>{t('writingStyle')}</p>
            <div className={styles.modalLine}></div>
            <ul>
              {writingStyles.map((style) => (
                <li key={style.id} className={styles.customCheckbox}>
                  <input
                    type="checkbox"
                    id={style.id}
                    name="writingStyle"
                    checked={selectedFilters.writingStyle.includes(style.label)}
                    onChange={() => handleWritingStyleChange(style.label)}
                  />
                  <span className={styles.checkboxSquare}></span>
                  <label htmlFor={style.id}>{style.label}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources Section */}
          <div className={styles.modalSection}>
            <p className={styles.modalLabel}>{t('dataSources')}</p>
            <div className={styles.modalLine}></div>
            <ul>
              {dataSources.map((source) => (
                <li key={source.id} className={styles.customCheckbox}>
                  <input
                    type="checkbox"
                    id={source.id}
                    checked={selectedFilters.dataSources.includes(source.label)}
                    onChange={() => handleDataSourcesChange(source.label)}
                  />
                  <span className={styles.checkboxSquare}></span>
                  <label htmlFor={source.id}>{source.label}</label>
                </li>
              ))}
              <span className={styles.note}>(not preferred)</span>
            </ul>
          </div>

          <div className={styles.modalSection}>
            <p className={styles.modalLabel}>{t('relevancyOfData')}</p>
            <div className={styles.modalLine}></div>
            <ul>
              <li className={styles.disabledItem}>{t('newer')}</li>
              <li className={styles.disabledItem}>{t('heavilityReferenced')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
