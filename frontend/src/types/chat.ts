export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string; // Changed from Date to string
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}