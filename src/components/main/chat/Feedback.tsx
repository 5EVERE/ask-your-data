import React, { useState } from 'react';
import styles from './Feedback.module.css';
import { IoArrowForwardCircleOutline } from 'react-icons/io5'; // Import send icon
import { IoClose } from 'react-icons/io5'; // Import close icon
import { useTranslation } from 'react-i18next';

// Define interface for props
interface FeedbackProps {
  onClose: () => void | null; // Function to handle closing the feedback component
  emotion: any; // Emotion passed as a prop, e.g., 'like' or 'dislike'
}

const Feedback: React.FC<FeedbackProps> = ({ onClose, emotion }) => {
  const {t} = useTranslation('chatComponent');
  const [inputValue, setInputValue] = useState(''); // State for input text
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility of feedback details

  // Handle sending the feedback
  const handleSend = () => {
    if (inputValue.trim()) {
      console.log('Feedback submitted:', inputValue); // Log the feedback input
      setInputValue(''); // Clear the input field after submission
      onClose(); // Trigger the onClose callback
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      {/* Feedback Header */}
      <div className={styles.header}>
        <p>{t('feedback_thank_you')}</p>
        
        {/* Close button for hiding feedback details */}
        {isVisible && emotion === 'dislike' && (
          <IoClose
            className={styles.closeIcon}
            onClick={() => setIsVisible(false)} // Hide details on click
          />
        )}
      </div>

      {/* Show only if emotion is "dislike" */}
      {emotion === 'dislike' && (
        <>
          {/* Conditional rendering of description */}
          {isVisible && (
            <p className={styles.description}>
              {t('feedback_dislike_message')}
            </p>
          )}

          {/* Input container for user feedback */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Some improvements..." // Placeholder text for input
              value={inputValue} // Controlled input value
              onChange={(e) => setInputValue(e.target.value)} // Update state on change
              className={styles.feedbackInput}
            />

            {/* Send feedback button */}
            <IoArrowForwardCircleOutline
              onClick={handleSend} // Trigger handleSend function on click
              style={{
                position: 'absolute',
                right: '3%', // Positioning
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '25px', // Adjust size
                cursor: 'pointer', // Change cursor on hover
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
