import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Mic, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { addMessage, setTyping } from '../store/chatSlice';
import { generateResponse } from '../utils/chatbot';
import { startSpeechRecognition } from '../utils/speechRecognition';

const ChatBot: React.FC = () => {
  const dispatch = useDispatch();
  const { ageGroup } = useSelector((state: RootState) => state.auth);
  const { messages, isTyping } = useSelector((state: RootState) => state.chat);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSpeechSupported('webkitSpeechRecognition' in window);
  }, []);

  const getBotName = () => {
    switch (ageGroup) {
      case 'kids':
        return 'Thozhi Kids 🌈';
      case 'teen':
        return 'Thozhi Teen 🌟';
      case 'young':
        return 'Thozhi Young 💫';
      case 'adult':
        return 'Thozhi Pro 🌱';
      default:
        return 'Thozhi';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date().toISOString(), // Convert to ISO string
    };

    dispatch(addMessage(userMessage));
    setInput('');
    dispatch(setTyping(true));

    try {
      const response = await generateResponse(input, ageGroup!);
      
      dispatch(addMessage({
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot' as const,
        timestamp: new Date().toISOString(), // Convert to ISO string
      }));

      if (response.followUp) {
        setTimeout(() => {
          response.followUp!.forEach((text, index) => {
            setTimeout(() => {
              dispatch(addMessage({
                id: (Date.now() + 2 + index).toString(),
                text,
                sender: 'bot' as const,
                timestamp: new Date().toISOString(), // Convert to ISO string
              }));
            }, index * 1000);
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      dispatch(setTyping(false));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (!isSpeechSupported) {
      dispatch(addMessage({
        id: Date.now().toString(),
        text: "I'm sorry, but voice input is not supported in your browser. Please type your message instead.",
        sender: 'bot' as const,
        timestamp: new Date().toISOString(), // Convert to ISO string
      }));
      return;
    }

    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
      return;
    }

    const newRecognition = startSpeechRecognition(
      (transcript) => {
        setInput(transcript);
        setIsRecording(false);
      },
      (error) => {
        console.error(error);
        setIsRecording(false);
        dispatch(addMessage({
          id: Date.now().toString(),
          text: "I couldn't understand that. Could you please try again or type your message?",
          sender: 'bot' as const,
          timestamp: new Date().toISOString(), // Convert to ISO string
        }));
      }
    );

    if (newRecognition) {
      setRecognition(newRecognition);
      setIsRecording(true);
      newRecognition.start();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 h-[calc(100vh-12rem)]"
    >
      <div className="flex items-center mb-6">
        <MessageCircle className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold ml-3">Chat with {getBotName()}</h2>
      </div>

      <div className="h-[calc(100%-8rem)] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-xl">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {format(new Date(message.timestamp), 'HH:mm')} {/* Parse ISO string back to Date */}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="bg-gray-100 rounded-lg p-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleRecording}
          disabled={!isSpeechSupported}
          title={!isSpeechSupported ? "Voice input is not supported in your browser" : "Click to start voice input"}
          className={`p-3 rounded-lg transition-colors ${
            isRecording
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } ${!isSpeechSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Mic className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};

const sendMessageToThozhi = async (message: string) => {
  const res = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.reply;
};


export default ChatBot;