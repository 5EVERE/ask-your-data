import React, { useState, useEffect } from 'react';
import styles from './ChatHistoryData.module.css';
import { RiDeleteBin6Fill } from 'react-icons/ri'; // Trash icon
import { IChatDetail } from '../Main'; // Interface for chat details
import { useTranslation } from 'react-i18next';

// Define types for Chat and IChatHistoryProps
interface Chat {
  id: number;
  text: string;
}

interface IChatHistoryProps {
  setSelectedChat: React.Dispatch<
    React.SetStateAction<IChatDetail | null | undefined>
  >; // Function to set selected chat details
  selectedWorkspaceId: number | undefined;
  setChatId: (obj: number) => void;
}

// Type for active button label
type activeButtonLabel = 'My Chats' | 'Workspace Chats';

const ChatHistoryData: React.FC<IChatHistoryProps> = ({
  setSelectedChat,
  selectedWorkspaceId,
  setChatId,
}) => {
  const { t } = useTranslation('chatHistoryData');
  const [hoveredChatId, setHoveredChatId] = useState<number | null>(null); // State to track hovered chat ID
  const [data, setData] = useState<any | undefined>(); // State for chat history data
  const [activeButton, setActiveButton] =
    useState<activeButtonLabel>('My Chats'); // State to track active button

  // Fetch chat history on component mount
  useEffect(() => {
    (global as any).api
      .get(`/chat/history/${selectedWorkspaceId}`) // API call to get chat history
      .then((response: any) => {
        setData(response.data); // Set fetched data to state
      })
      .catch((err: string) => console.error('API error:', err));
  }, [selectedWorkspaceId]);

  // Fetch specific chat details
  const handleChatClick = (chat_id: number) => {
    (global as any).api
      .get(`/chat/${chat_id}`)
      .then((response: any) => {
        setSelectedChat(response.data as IChatDetail); // Pass selected chat details to parent
        setChatId(response?.data.chat_id);
      })
      .catch((err: string) =>
        console.error('Error fetching chat details:', err)
      );
  };

  // Delete a chat item
  const handleDeleteChat = (chat_id: number) => {
    (global as any).api
      .delete(`/chat/${chat_id}`)
      .then((response: any) => {
        console.log('Deleted chat:', response.data);
        setData((prevData: any) =>
          prevData.filter((chat: any) => chat.chat_id !== chat_id)
        ); // Update state to reflect deletion
      })
      .catch((err: string) =>
        console.error('Error deleting chat history:', err)
      );
  };

  // Set active button for "My Chats"
  const handleMyChats = () => {
    setActiveButton('My Chats');
  };

  // Set active button for "Workspace Chats"
  const handleWorkspaceChats = () => {
    setActiveButton('Workspace Chats');
  };

  // Handle hover events
  const handleMouseEnter = (id: number) => setHoveredChatId(id);
  const handleMouseLeave = () => setHoveredChatId(null);

  return (
    <div className={styles.chatHistory}>
      {/* Header with buttons */}
      <div className={styles.historyHeader}>
        <p className={styles.historyTitle}>{t('chatHistory')}</p>
        <div className={styles.chatButtons}>
          <button
            onClick={handleMyChats}
            className={`${styles.myChatBtn} ${
              activeButton === 'My Chats' ? styles.activeBtn : ''
            }`}
          >
            {t('myChats')}
          </button>
          <button
            onClick={handleWorkspaceChats}
            className={`${styles.workspaceBtn} ${
              activeButton === 'Workspace Chats' ? styles.activeBtn : ''
            }`}
          >
            {t('workspaceChats')}
          </button>
        </div>
      </div>

      {/* Chat list section */}
      <div className={styles.chatSection}>
        <p className={styles.sectionLabel}>
          {activeButton === 'My Chats'
            ? `${t('todayMyChats')}` // Example label for today
            : `${t('todayWorkspaceChats')}`}
        </p>

        {/* Render filtered chats */}
        <div className={styles.chatList}>
          {data
            ?.filter((chat: any) =>
              activeButton === 'My Chats'
                ? chat.chat_type === 'my_chat'
                : chat.chat_type === 'workspace_chat'
            )
            .map((chat: any) => (
              <div
                key={chat.chat_id}
                className={styles.chatItem}
                onMouseEnter={() => handleMouseEnter(chat.chat_id)} // Show delete on hover
                onMouseLeave={handleMouseLeave}
                onClick={() => handleChatClick(chat.chat_id)} // Fetch chat details
              >
                <p>{chat.title}</p>
                {/* Delete button visible on hover */}
                {hoveredChatId === chat.chat_id && (
                  <div
                    className={styles.deleteHistoryItem}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering chat click
                      handleDeleteChat(chat.chat_id); // Delete chat
                    }}
                  >
                    <RiDeleteBin6Fill
                      style={{ color: '#0A9DC1', fontSize: '20px' }}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryData;
