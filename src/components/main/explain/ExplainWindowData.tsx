import React, { useState} from 'react';
import styles from './ExplainWindowData.module.css';
import { SlArrowRight } from 'react-icons/sl'; // Import right arrow icon
import SourcesData from './SourcesData'; // Component to display sources data
import ScoreData from './ScoreData'; // Component to display score data
import { SelectedMessage } from '../Main'; // Type for selected message
import KnowledgeGraph from './KnowledgeGraph'; // Component to display the knowledge graph
import { useTranslation } from 'react-i18next';

// Interface for props
interface Props {
  onClick: () => void; // Function to handle click (toggle close/open)
  selectedMessage: SelectedMessage; // Selected message data
  explainData: any; // Explanation data passed to the component
}

const ExplainWindowData: React.FC<Props> = ({ onClick, selectedMessage, explainData }) => {
  const {t} = useTranslation('explainWindowData');
  return (
    <div className={styles.explainContent}>
      {/* Button to close/hide the explanation panel */}
      <button onClick={onClick} className={styles.arrowBtn}>
        <SlArrowRight style={{ color: 'white' }} />
      </button>

      {/* Header section */}
      <div className={styles.explainHeader}>
        <div className={styles.explainTitle}>{t('letMeExplain')}</div> {/* Main title */}
        <div className={styles.explainLine}></div> {/* Decorative line */}
        <div className={styles.explainSubtitle}>
          {explainData?.explanation} {/* Subtitle or explanation text */}
        </div>
      </div>

      {/* Main content section */}
      <div className={styles.explainMain}>
        {/* Knowledge Graph Section */}
        <div className={styles.mainGraph}>
          <div className={styles.mainTitle}>{t('knowledgeGraph')}</div> {/* Section title */}
          <div className={styles.graphBox}>
            <KnowledgeGraph explainDataKG={explainData?.knowledge_graph} />
          </div>
        </div>

        {/* Score Data Section */}
        <ScoreData explainData={explainData} />

        {/* Sources Data Section */}
        <SourcesData explainData={explainData} />

        {/* Blur effect for overflow visuals */}
        <div className={styles.blur}></div>
  
      </div>
    </div>
  );
};

export default ExplainWindowData;
