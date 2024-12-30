import React, { useState } from 'react';
import styles from './ChatHistory.module.css';
import { GoHistory } from 'react-icons/go'; // History icon
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'; // Forward and Backward arrow icons
import ChatHistoryData from './ChatHistoryData'; // Component to render chat history data
import { IChatDetail } from '../Main'; // Interface for chat details
import { BsChatLeftText } from 'react-icons/bs';

// Interface for the props
interface HistoryProps {
  setSelectedChat: React.Dispatch<
    React.SetStateAction<IChatDetail | null | undefined>
  >; // Function to update the selected chat
  selectedWorkspaceId: number | undefined;
  setIsChatting: (obj: boolean) => void;
  isChatting: boolean;
  setChatId: (obj: number)=> void
}

const ChatHistory: React.FC<HistoryProps> = ({
  setSelectedChat,
  selectedWorkspaceId,
  setIsChatting,
  isChatting,
  setChatId
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the panel is open or closed

  // Function to toggle the panel visibility
  const togglePanel = () => {
    setIsOpen((prev) => !prev); // Invert the previous state
  };
  const newChatHandler = () => {
    setIsChatting(false);
  };

  return (
    <section>
      <div className={styles.container}>
        {/* Panel container with conditional open class */}
        <div
          className={`${styles.panelContainer} ${isOpen ? styles.open : ''}`}
        >
          {/* Panel to display chat history data */}
          <div className={styles.panel}>
            <ChatHistoryData
            setChatId={setChatId}
              selectedWorkspaceId={selectedWorkspaceId}
              setSelectedChat={setSelectedChat} // Pass setSelectedChat function to child component
            />
          </div>

          {/* Toggle Button */}
          <div className={styles.toggButtons}>
            {isChatting && <BsChatLeftText
              onClick={newChatHandler}
              className={styles.newChat}
            ></BsChatLeftText>}
            <button onClick={togglePanel} className={styles.toggleButton}>
              {/* Conditional rendering: Show back arrow if open, forward arrow if closed */}
              {isOpen ? (
                <>
                  <GoHistory /> <IoIosArrowBack className={styles.arrowBack} />
                </>
              ) : (
                <>
                  <GoHistory />{' '}
                  <IoIosArrowForward className={styles.arrowForw} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatHistory;
