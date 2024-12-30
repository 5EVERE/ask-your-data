import React, { useState, useRef, useEffect } from 'react';
import styles from './AdaptationForm.module.css'; // Importing CSS module for component styling
import { useTranslation } from 'react-i18next'; // Importing translation hook

const AdaptationForm = () => {
  const blurRef = useRef<HTMLDivElement>(null); // Ref for blur overlay element
  const buttonsRef = useRef<HTMLDivElement>(null); // Ref for buttons container
  const [showBlur, setShowBlur] = useState(true); // State to control blur visibility
  const { t } = useTranslation('adaptationForm'); // Add translation hook to access the t function

  // Intersection Observer to handle blur visibility based on buttons visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowBlur(!entry.isIntersecting); // Toggle blur based on visibility
        });
      },
      {
        root: null, // Observing the viewport
        threshold: 0.1, // Trigger when 10% of the target is visible
      }
    );

    if (buttonsRef.current) {
      observer.observe(buttonsRef.current); // Start observing the buttons section
    }

    return () => {
      if (buttonsRef.current) {
        observer.unobserve(buttonsRef.current); // Cleanup observer on unmount
      }
    };
  }, []);

  return (
    <div className={styles.section}> {/* Main section wrapper */}
      <div className={styles.container}> {/* Container for form content */}
        <h2 className={styles.title}>{t('formTitle')}</h2> {/* Translated form title */}

        <div className={styles.optionContainer}> {/* Wrapper for form options */}
          <form className={styles.form}> {/* Form element */}
            {/* Landing Page Input */}
            <label className={styles.label}>
              <p>{t('landingPage')}</p> {/* Translated label for landing page */}
              <input
                type="text"
                placeholder={t('landingPagePlaceholder')}
                className={styles.input}
              />
            </label>

            {/* Job Title Input */}
            <label className={styles.label}>
              <p>{t('jobTitle')}</p> {/* Translated label for job title */}
              <input type="text" placeholder={t('jobTitlePlaceholder')} className={styles.input} />
            </label>

            {/* Business Goals and Priorities */}
            <label className={styles.label}>
              <p>{t('businessGoals')}</p> {/* Translated label for business goals */}
              <textarea className={styles.textarea} />
            </label>

            {/* Technology Adoption Level */}
            <label className={styles.label}>
              <p>{t('technologyAdoption')}</p> {/* Translated label for technology adoption */}
              <input type="text" placeholder={t('technologyAdoptionPlaceholder')} className={styles.input} />
            </label>

            {/* Key Barriers to AI Vision */}
            <label className={styles.label}>
              <p>{t('aiVisionBarriers')}</p> {/* Translated label for AI vision barriers */}
              <input type="text" placeholder={t('aiVisionBarriersPlaceholder')} className={styles.input} />
            </label>

            {/* Concerns Related to AI Vision */}
            <label className={styles.label}>
              <p>{t('aiVisionConcerns')}</p> {/* Translated label for AI vision concerns */}
              <input type="text" placeholder={t('aiVisionConcernsPlaceholder')} className={styles.input} />
            </label>

            {/* Email Input for AI Version Delivery */}
            <label className={`${styles.label} ${styles.additional}`}>
              <p>{t('aiVersionEmail')}</p> {/* Translated label for AI version email */}
              <input type="text" placeholder={t('aiVersionEmailPlaceholder')} className={styles.input} />
            </label>

            {/* Buttons Section */}
            <div className={styles.buttons} ref={buttonsRef}> {/* Buttons with IntersectionObserver */}
              <button className={styles.prev}>{t('previous')}</button> {/* Translated Previous button */}
              <button className={styles.send}>{t('send')}</button> {/* Translated Send button */}
            </div>
          </form>

          {/* Blur Overlay - Visible when buttons are not in view */}
          {showBlur && <div className={styles.blur} ref={blurRef} />}
        </div>
      </div>
    </div>
  );
};

export default AdaptationForm; // Exporting AdaptationForm component for use in the app
