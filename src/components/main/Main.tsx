import React, { useState } from 'react';
import styles from './Main.module.css';
import ChatHistory from './history/ChatHistory'; // Component to display chat history
import ChatComponent from './chat/ChatComponent'; // Main chat interface
import ExplainWindow from './explain/ExplainWindow'; // Panel for explanations
import AdaptationForm from '../form/AdaptationForm'; // (Optional) Form for adaptation purposes

// Interface to represent the structure of a selected message
export interface SelectedMessage {
  reliabilityScore: number; // Reliability score of the selected message
}

// Interface to represent a detailed chat object
export interface IChatDetail {
  chat_id: number;
  messages: Array<{
    content: string; // Message content
    type: string; // Message type (e.g., 'user' or 'bot')
    timestamp: string; // Timestamp of the message
    reliability: string; // Reliability score or value
    pinned: boolean; // If the message is pinned
  }>;
  timestamp: string; // Chat creation timestamp
  title: string; // Chat title
}
// Interface defining the shape of a Workspace object

interface MainProps{
  selectedWorkspace: string;
  selectedWorkspaceId: number | undefined;
}
const Main: React.FC<MainProps> = ({selectedWorkspace, selectedWorkspaceId}) => {
  
  // State to check if there is a response available
  const [hasResponse, setHasResponse] = useState(false);

  // State to manage whether the explanation panel is open
  const [isOpenExplain, setIsOpenExplain] = useState(false);

  // State to manage the selected message's reliability score
  const [selectedMessage, setSelectedMessage] = useState<SelectedMessage>({
    reliabilityScore: 0,
  });

  // State to dynamically control the width of the explanation panel
  const [width, setWidth] = useState<number>(800);

  // State to store the currently selected chat from ChatHistory
  const [selectedChat, setSelectedChat] = useState<IChatDetail | null | undefined>(null);

  // State to store data for the ExplainWindow component
  const [explainData, setExplainData] = useState<any>(null);

  const [isChatting, setIsChatting] = useState(false);

  const [chatId, setChatId] = useState<number | null>(null)


  return (
    <main className={styles.main}>
      {/* ChatHistory - displays list of chats and allows user to select one */}
      {!isOpenExplain && <ChatHistory setChatId={setChatId} isChatting={isChatting} setSelectedChat={setSelectedChat} selectedWorkspaceId={selectedWorkspaceId} setIsChatting={setIsChatting} />}

      {/* ChatComponent - main chat interface */}
      <ChatComponent
        width={width} // Pass current panel width
        setHasResponse={setHasResponse} // Update hasResponse state when response is available
        setIsOpen={setIsOpenExplain}
        isOpenExplain={isOpenExplain} // Check if the explanation panel is open
        selectedChat={selectedChat} // Pass currently selected chat details
        setSelectedMessage={setSelectedMessage} // Set reliability score of the selected message
        setExplainData={setExplainData} // Set data for the explanation panel
        selectedWorkspace={selectedWorkspace}
        selectedWorkspaceId={selectedWorkspaceId}
        setIsChatting={setIsChatting}
        isChatting={isChatting}
        chatId={chatId}
      />

      {/* ExplainWindow - displays explanation details */}
      <ExplainWindow
        width={width} // Pass current panel width
        setWidth={setWidth} // Allows dynamic resizing of the panel
        hasResponse={hasResponse} // Check if there’s a response to explain
        isOpen={isOpenExplain} // State to manage whether the panel is open
        setIsOpen={setIsOpenExplain} // Function to toggle the panel open/close
        selectedMessage={selectedMessage} // Pass selected message details
        explainData={explainData} // Pass explanation data
      />
    </main>
  );
}

export default Main;
