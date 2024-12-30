import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatComponent.module.css';
import { IoOptionsOutline } from 'react-icons/io5';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { FiDownload } from 'react-icons/fi';
import { BsShare } from 'react-icons/bs';
import { BsPin } from 'react-icons/bs';
import { BsFillPinFill } from 'react-icons/bs';
import { ChatMessage } from '../../../services/FetchingData';
import Modal from '../../Modal/ModalFilters';
import Emotions from './Emotions';
import Feedback from './Feedback';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IResponseData {
  recommendations: string[];
}
interface ChatComponentProps {
  setHasResponse: (value: boolean) => void;
  setIsOpen: (value: any) => void;
  isOpenExplain: boolean;
  selectedChat: any;
  setSelectedMessage: (obj: any) => void;
  width: number;
  setExplainData: (obj: any) => any;
  selectedWorkspace: string;
  selectedWorkspaceId: number | undefined;
  setIsChatting: (obj: boolean) => void;
  isChatting: boolean;
  chatId: number | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  setHasResponse,
  isOpenExplain,
  setIsOpen,
  selectedChat,
  width,
  setExplainData,
  selectedWorkspace,
  selectedWorkspaceId,
  setIsChatting,
  isChatting,
  chatId,
}) => {
  const { t } = useTranslation('chatComponent');
  const [messages, setMessages] = useState<ChatMessage[]>([]); // State to store chat messages

  const [input, setInput] = useState<string>(''); // State for user input
  const [isModalOpen, setModalOpen] = useState(false); // State to toggle the filter modal
  const modalRef = useRef<HTMLDivElement | null>(null); // Reference for modal to detect outside clicks
  const chatScrollRef = useRef<HTMLDivElement | null>(null); // Reference for chat window scrolling

  const [shouldScroll, setShouldScroll] = useState(true); // State to determine if the chat should auto-scroll
  const [isPinning, setIsPinning] = useState(false); // State to prevent auto-scrolling while pinning a message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for messages being fetched
  const [hasScroll, setHasScroll] = useState<boolean>(false); // State to detect whether scroll exists

  const [data, setData] = useState<IResponseData | undefined>(); // Recommendations data fetched from the backend
  const [filters, setFilters] = useState<{
    writingStyle: string[];
    dataSources: string[];
  }>({ writingStyle: [], dataSources: [] }); // State for chat filters (writing style, data sources)

  const [filterHistory, setFilterHistory] = useState<{ [key: number]: any }>(
    {}
  ); // History of applied filters per message
  const [currentUresId, setCurrentUserId] = useState<number | null>(null); // State to store the current user ID

  /**
   * Fetch recommendations data and user ID from the backend on component mount
   */
  useEffect(() => {
    (global as any).api
      .get(`/chat/recommendations/${selectedWorkspaceId}`)
      .then((response: any) => {
        console.log(`API response ${selectedWorkspaceId}:`, response.data);
        setData(response.data);
      })
      .catch((err: string) => console.error('API error:', err));

    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setCurrentUserId(parseInt(storedUserId));
    } else {
      setCurrentUserId(null);
    }
  }, [selectedWorkspaceId]);

  /**
   * Check if the chat window requires scrolling
   */

  const checkScroll = () => {
    if (chatScrollRef.current) {
      const { scrollHeight, clientHeight } = chatScrollRef.current;
      setHasScroll(scrollHeight > clientHeight);
    }
  };

  /**
   * Adjust scroll detection on window resize
   */

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);
  /**
   * Map and load selected chat messages into state
   */
  useEffect(() => {
    if (selectedChat?.messages) {
      const chatMessages = selectedChat.messages.map(
        (msg: any, index: number) => ({
          id: index,
          question: msg.type === 'question' ? msg.content : null,
          answer: msg.type === 'answer' ? msg.content : null,
          type: msg.type === 'question' ? 'question' : 'answer',
          reliability: msg.type === 'answer' && msg.reliability,
          pinned: msg.type === 'question' && msg.pinned,
          feedbackVisible: false,
          isSubmitFeedback: false,
        })
      );
      setHasResponse(true);
      setMessages(chatMessages);
      setIsChatting(true);
    } else {
      setIsChatting(false);
      setMessages([]);
    }
  }, [selectedChat]);
  /**
   * Automatically send explanation data for the last message
   */

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'answer') {
        sendDataToExplain(lastMessage.id);
      }
    }
  }, [messages]);
  /**
   * Fetch explanation data for a given message ID
   */
  const sendDataToExplain = (id: number) => {
    (global as any).api
      .get(`/chat/explanation/${id}`)
      .then((response: any) => {
        setExplainData(response.data);
      })
      .catch((err: string) =>
        console.error('Error fetching chat details:', err)
      );
  };
  /**
   * Handle chat window scroll and determine scroll behavior
   */
  const handleScroll = () => {
    if (chatScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatScrollRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setShouldScroll(distanceFromBottom > 0);
      checkScroll();
    }
  };
  /**
   * Automatically scroll the chat to the bottom when new messages arrive
   */
  useEffect(() => {
    if (!isPinning && shouldScroll && chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    setIsPinning(false);
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  /**
   * Handle message pin/unpin actions
   */
  const handlePinIcon = (chatId: number, answerId: number) => {
    const currentMessage = messages.find((msg) => msg.id === answerId);
    const isPinned = currentMessage?.pinned;
    setIsPinning(true);
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === answerId
          ? { ...message, pinned: !message.pinned }
          : message
      )
    );
    (global as any).api
      .post(`/chat/${chatId}/pin/${answerId}`, { pinned: !isPinned })
      .then(() => {
        console.log(
          `Message with ID ${answerId} successfully pinned/unpinned in chat ${chatId}.`
        );
      })
      .catch((err: any) => {
        console.error('Error pinning message:', err);

        setMessages((prevMessages: any) =>
          prevMessages.map((message: any) =>
            message.id === answerId ? { ...message, pinned: isPinned } : message
          )
        );
      });
  };
  /**
   * Handle user feedback (like/dislike) for messages
   */
  const handleEmotion = (id: number, emotion: 'like' | 'dislike') => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id && !msg.emotion ? { ...msg, emotion } : msg
      )
    );
    (global as any).api
      .post(`/chat/feedback/${id}`, { feedback: emotion })
      .then(() => {
        console.log(
          `Feedback '${emotion}' sent successfully for response ID ${id}`
        );
      })
      .catch((err: any) => {
        console.error('Error sending feedback:', err);
      });
  };
  /**
   * Sends a new user question and appends it to the chat history.
   */
  const handleSend = (messageText: string) => {
    if (!messageText.trim()) return;

    if (!isChatting) {
      setIsChatting(true);
    }

    // Assign unique IDs for new messages

    const maxId = messages.reduce(
      (max, msg) => (msg.id > max ? msg.id : max),
      0
    );

    const currentFilterSnapshot = { ...filters };
    const newQuestion: ChatMessage = {
      id: maxId + 1,
      question: messageText,
      answer: '',
      reliability: '0',
      filter: JSON.stringify(currentFilterSnapshot),
      pinned: false,
      type: 'question',
      feedbackVisible: false,
      isSubmitFeedback: false,
    };
    // Placeholder "loading" message while waiting for API response
    const loadingMessage: ChatMessage = {
      id: maxId + 2,
      question: '',
      answer: 'Formulating answer...',
      reliability: '0',
      filter: JSON.stringify(currentFilterSnapshot),
      pinned: false,
      type: 'answer',
      feedbackVisible: false,
      isSubmitFeedback: false,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newQuestion,
      loadingMessage,
    ]);

    setFilterHistory((prev) => ({
      ...prev,
      [maxId + 1]: currentFilterSnapshot,
    }));

    setInput('');
    setIsLoading(true);
    setHasResponse(true);
    setIsChatting(true);

    // Send API request to fetch the answer

    (global as any).api
      .post('/query', {
        user_id: currentUresId,
        chat_id: chatId,
        question: messageText,
        workspace_id: selectedWorkspaceId,
        filters: filters,
      })
      .then((response: any) => {
        const newAnswer: ChatMessage = {
          id: maxId + 3,
          question: '',
          answer: response.data.answer || 'No answer received.',
          reliability: response.data.reliability || '0',
          filter: JSON.stringify(currentFilterSnapshot),
          pinned: false,
          type: 'answer',
          feedbackVisible: false,
          isSubmitFeedback: false,
        };

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, prevMessages.length - 1),
          newAnswer,
        ]);
        setFilterHistory((prev) => ({
          ...prev,
          [maxId + 3]: currentFilterSnapshot,
        }));
      })
      .catch((error: any) => {
        console.error('Error fetching answer:', error);
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, prevMessages.length - 1),
          {
            ...loadingMessage,
            answer: 'Error fetching the answer. Please try again.',
          },
        ]);
      })
      .finally(() => setIsLoading(false));
  };
  /**
   * Toggles feedback visibility for a specific message.
   */
  const toggleFeedback = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, feedbackVisible: !msg.feedbackVisible } : msg
      )
    );
  };
  /**
   * Submits feedback for a message and hides the feedback input.
   */
  const handleSubmitFeedback = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id
          ? { ...msg, isSubmitFeedback: true, feedbackVisible: false }
          : msg
      )
    );
  };
  /**
   * Handles pressing "Enter" in the input field to send a message.
   */
  const handleEnterSubmit = (event: any) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSend(input);
    }
  };
  /**
   * Closes the filter modal when clicking outside it.
   */
  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  /*
   * Clears chat state when `isChatting` becomes false.
   */
  useEffect(() => {
    if (!isChatting) {
      setMessages([]);
      setHasResponse(false);
      setExplainData(null);
    }
  }, [isChatting]);
  /**
   * Toggles the visibility of the filter modal.
   */
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  /**
   * Sends predefined quick questions to the API.
   */
  const handleQuickQuestionClick = (question: string) => {
    setInput(question);
    handleSend(question);
  };
  /**
   * Allows users to share the chat using the Web Share API.
   */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Example Share',
          text: 'See that content!',
          url: window.location.href,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API dont work on this website.');
    }
  };
  /**
   * Downloads the chat history as a text file.
   */
  const handleDownloadChat = () => {
    if (!messages || messages.length === 0) {
      alert('There is no chat to download.');
      return;
    }
    const chatContent = messages
      .map((message) => {
        if (message.type === 'question') {
          return `User: ${message.question}`;
        } else if (message.type === 'answer') {
          return `Bot: ${message.answer}`;
        }
        return '';
      })
      .filter((line) => line.trim() !== '')
      .join('\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat-log.txt';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  /**
   * Formats the reliability percentage for display.
   */
  const formatterCircleReliability = (percent: string): number => {
    const newValue = percent.slice(0, -1);
    return Number(newValue);
  };
  /**
   * Toggles the panel (e.g., explanation or filter view).
   */
  const togglePanel = () => {
    setIsOpen((prev: any) => !prev); // Toggle the open/close state
  };

  return (
    <section className={styles.section}>
      <div
        className={`${styles.container} ${isOpenExplain ? styles.explain : ''}`}
        style={{
          marginRight: isOpenExplain ? `${width}px` : undefined,
          paddingTop: hasScroll ? '1%' : '5%',
          transition: 'padding-top 0.3s ease-in-out',
        }}
      >
        {isChatting ? (
          <div className={styles.chattingContainer}>
            <div
              className={styles.chatWindow}
              ref={chatScrollRef}
              onScroll={handleScroll}
            >
              {messages.map((message, index) => {
                return (
                  <div key={index} className={styles.message}>
                    {message.type === 'question' ? (
                      <>
                        {' '}
                        <div className={styles.userMessage}>
                          {message.question}{' '}
                          {message.pinned ? (
                            <BsFillPinFill
                              onClick={() =>
                                handlePinIcon(selectedChat?.chat_id, message.id)
                              }
                              className={`${styles.pinIcon} ${styles.pinnedIcon}`}
                            />
                          ) : (
                            <BsPin
                              onClick={() =>
                                handlePinIcon(selectedChat?.chat_id, message.id)
                              }
                              className={styles.pinIcon}
                            />
                          )}
                        </div>
                        {message.answer === 'Formulating answer...' ? (
                          <></>
                        ) : (
                          <p className={styles.filtersDate}>
                            {t('filters.title')}:
                            {(() => {
                              let parsedFilter;

                              try {
                                parsedFilter = message.filter
                                  ? JSON.parse(message.filter)
                                  : {};
                              } catch (error) {
                                console.error(
                                  'Invalid JSON in message.filter:',
                                  error
                                );
                                parsedFilter = {};
                              }

                              const writingStyle =
                                parsedFilter?.writingStyle?.join(', ') ||
                                t('filters.default');
                              const dataSources =
                                parsedFilter?.dataSources?.join(', ') ||
                                t('filters.default');

                              return `${t(
                                'filters.writingStyle'
                              )}: ${writingStyle}, ${t(
                                'filters.dataSources'
                              )}: ${dataSources}`;
                            })()}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          className={`${styles.botMessage} ${
                            message.answer === 'Formulating answer...' &&
                            styles.skeleton
                          }`}
                          onClick={() => sendDataToExplain(message.id)}
                        >
                          {message.answer === 'Formulating answer...' ? (
                            <div className={styles.skeletonMessage}>
                              {message.answer}
                            </div>
                          ) : (
                            <div className={styles.botAnswer}>
                              {message.answer}

                              <button
                                onClick={togglePanel}
                                className={styles.arrowBtn}
                              >
                                i
                              </button>
                              <div
                                style={
                                  {
                                    '--progress': `${formatterCircleReliability(
                                      message.reliability
                                    )}%`,
                                  } as React.CSSProperties
                                }
                                className={styles.chatCircle}
                              >
                                <div className={styles.centreCircle}></div>
                              </div>
                            </div>
                          )}
                          {message.answer !== 'Formulating answer...' && (
                            <Emotions
                              emotion={message.emotion}
                              answerText={message.answer}
                              onSetEmotion={(emotion) => {
                                handleEmotion(message.id, emotion);
                                toggleFeedback(message.id);
                              }}
                            ></Emotions>
                          )}
                        </div>
                      </>
                    )}

                    {message.feedbackVisible && (
                      <Feedback
                        emotion={message.emotion}
                        onClose={() => {
                          toggleFeedback(message.id);
                          handleSubmitFeedback(message.id);
                        }}
                      />
                    )}
                    {message.isSubmitFeedback && (
                      <p style={{ fontWeight: '500' }}>
                        {t('thankYouFeedback')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h2 className={styles.heading}>{t('heading')}</h2>
            <p className={styles.subHeading}>{t('subHeading')}</p>
            <div className={styles.quickQuestions}>
              {data?.recommendations.map((item, index) => (
                <div
                  key={index}
                  className={styles.quickQuestion}
                  onClick={() => handleQuickQuestionClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={`${isChatting ? styles.activeChat : ''}`}>
          <div className={`${styles.chatOption}`}>
            <div className={styles.inputs}>
              <button onClick={toggleModal} className={styles.settings}>
                <IoOptionsOutline
                  style={{ fontSize: '30px' }}
                ></IoOptionsOutline>
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleEnterSubmit}
                className={styles.input}
                placeholder="Ask Your Data"
              />
              <IoArrowForwardCircleOutline
                onClick={() => handleSend(input)}
                style={{
                  position: 'absolute',
                  right: '12%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
              ></IoArrowForwardCircleOutline>
            </div>
          </div>
          {isChatting ? (
            <div className={styles.handleIcons}>
              <button className={styles.shareBtn}>
                <BsShare
                  style={{ fontSize: '24px' }}
                  onClick={handleShare}
                ></BsShare>
              </button>
              <button className={styles.downloadBtn}>
                <FiDownload
                  style={{ fontSize: '28px' }}
                  onClick={handleDownloadChat}
                ></FiDownload>
              </button>
            </div>
          ) : (
            <div className={styles.informations}>
              <button className={styles.information}>
                {t('answerQuestion')}
              </button>
              <button className={styles.information}>
                {t('summarizeDocument')}
              </button>
              <Link className={styles.information} to="/adaptation">
                {t('writePolicy')}
              </Link>
            </div>
          )}
        </div>
      </div>

      <Modal
        isChatting={isChatting}
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSaveFilters={(selectedFilters) => setFilters(selectedFilters)}
      />
    </section>
  );
};

export default ChatComponent;
