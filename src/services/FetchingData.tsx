// Define the structure of a single chat message
export interface ChatMessage {
  id: number;                      // Unique ID for the message
  question: string;                // The user's question
  answer: string;                  // The chatbot's answer
  reliability: string;             // Reliability score or label (e.g., "High", "Medium", "Low")
  filter: string;                  // Optional filter category for message grouping
  pinned: boolean;                 // Indicates if the message is pinned
  type: string;                    // Type of message (e.g., "text", "image", etc.)
  emotion?: 'like' | 'dislike' | null; // Optional emotion feedback
  feedbackVisible: boolean;        // Controls feedback UI visibility
  isSubmitFeedback: boolean;       // Tracks if feedback is submitted
}

/**
 * Fetch chat data asynchronously from '/ChattingJSON.json'.
 * @returns {Promise<ChatMessage[]>} A promise that resolves to an array of ChatMessage objects.
 */
export const fetchChatData = async (): Promise<ChatMessage[]> => {
  try {
    // Fetch chat data from a JSON file
    const response = await fetch('/ChattingJSON.json');

    // Throw an error if the response is not OK (status >= 400)
    if (!response.ok) {
      throw new Error('Failed to fetch chat data');
    }

    // Parse the response JSON
    const data = await response.json();

    // Map over the chat data to add unique IDs and initialize `pinned` to false
    return data.chat.map(
      (item: Omit<ChatMessage, 'id' | 'pinned'>, index: number) => ({
        ...item,       // Spread existing properties from the JSON file
        id: index,     // Assign a unique ID based on the array index
        pinned: false, // Default value for pinned status
      })
    );
  } catch (error) {
    // Log the error and return an empty array as a fallback
    console.error('Error loading chat data:', error);
    return [];
  }
};

/**
 * Fetch graph or other generic data asynchronously from 'data.json'.
 * @returns {Promise<any>} A promise that resolves to the JSON data.
 */
export const fetchData = async (): Promise<any> => {
  try {
    // Fetch generic data from a JSON file
    const response = await fetch('data.json');

    // Throw an error if the response is not OK
    if (!response.ok) {
      throw new Error('Failed to fetch graph data');
    }

    // Parse and return the response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching data:', error);
    throw error;
  }
};
