import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, SendHorizonal, Phone, MoreVertical, Image, MapPin, User } from 'lucide-react';

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How are you doing today?",
      sender: "other",
      time: "10:30 AM",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff"
    },
    {
      id: 2,
      text: "Hi Jane! I'm doing great, thanks for asking. How about you?",
      sender: "me",
      time: "10:32 AM",
      avatar: null
    },
    {
      id: 3,
      text: "I'm good too! Just working on some new projects.",
      sender: "other",
      time: "10:33 AM",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff"
    },
    {
      id: 4,
      text: "That sounds interesting! What kind of projects?",
      sender: "me",
      time: "10:34 AM",
      avatar: null
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: null
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Simulate reply after a delay
    setTimeout(simulateReply, 1000 + Math.random() * 2000);
  };

  const simulateReply = () => {
    const replies = [
      "Thanks for your message!",
      "That's interesting, tell me more.",
      "I agree with you on that point.",
      "How are you doing today?",
      "I was thinking about the same thing.",
      "Great to hear from you!"
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    const replyMsg = {
      id: messages.length + 1,
      text: randomReply,
      sender: "other",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff"
    };
    
    setMessages(prev => [...prev, replyMsg]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAttachOption = (option) => {
    console.log(`Selected attachment option: ${option}`);
    setShowAttachments(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-w-md mx-auto w-full shadow-lg">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="font-semibold">JS</span>
          </div>
          <div>
            <h2 className="font-bold">Jane Smith</h2>
            <p className="text-xs opacity-80">online</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Phone className="w-5 h-5 cursor-pointer hover:bg-blue-600 p-1 rounded-full" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:bg-blue-600 p-1 rounded-full" />
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'other' && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <img 
                  src={message.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'me' 
                  ? 'bg-blue-100 rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              }`}
            >
              <p className="text-gray-800">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-right text-gray-500' : 'text-gray-400'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment Options */}
      {showAttachments && (
        <div className="bg-gray-200 p-3 grid grid-cols-3 gap-2 mb-2">
          <button 
            onClick={() => handleAttachOption('photo')}
            className="bg-white p-3 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100"
          >
            <Image className="w-6 h-6 mb-1" />
            <span className="text-xs">Photo</span>
          </button>
          <button 
            onClick={() => handleAttachOption('location')}
            className="bg-white p-3 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100"
          >
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-xs">Location</span>
          </button>
          <button 
            onClick={() => handleAttachOption('contact')}
            className="bg-white p-3 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100"
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Contact</span>
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-gray-200 p-3 flex items-center">
        <button 
          onClick={() => setShowAttachments(!showAttachments)}
          className="p-2 text-blue-500 hover:bg-gray-300 rounded-full"
        >
          <Paperclip className="w-6 h-6" />
        </button>
        
        <div className="flex-1 mx-2 bg-white rounded-full">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-transparent border-none focus:outline-none resize-none py-2 px-4 max-h-40"
            rows="1"
          />
        </div>
        
        <button 
          onClick={newMessage.trim() ? handleSendMessage : null}
          disabled={!newMessage.trim()}
          className={`p-2 rounded-full ${
            newMessage.trim() 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'text-gray-400'
          }`}
        >
          {newMessage.trim() ? <SendHorizonal className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default App;