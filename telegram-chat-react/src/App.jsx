import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  User, 
  Users, 
  Settings, 
  Sun, 
  Search, 
  Plus, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  SendHorizonal, 
  Mic,
  Image,
  MapPin,
  Circle
} from 'lucide-react';

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How are you doing today?",
      sender: "other",
      time: "10:30 AM",
      avatar: "https://s3.tebi.io/besafe.backet/users/c826a447-b103-4ebd-a834-b029685e1abf/avatar.png"
    },
    {
      id: 2,
      text: "Hi! I'm doing great, thanks for asking. How about you?",
      sender: "me",
      time: "10:32 AM",
      avatar: null
    },
    {
      id: 3,
      text: "I'm good too! Just working on some new projects.",
      sender: "other",
      time: "10:33 AM",
      avatar: "https://s3.tebi.io/besafe.backet/users/c826a447-b103-4ebd-a834-b029685e1abf/avatar.png"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const contacts = [
    {
      id: 1,
      name: "Sergey Lubimov",
      avatar: "https://s3.tebi.io/besafe.backet/users/c826a447-b103-4ebd-a834-b029685e1abf/avatar.png",
      lastMessage: "No messages yet",
      time: "10:30 AM",
      online: true,
      unread: 0
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
      lastMessage: "See you tomorrow!",
      time: "9:45 AM",
      online: false,
      unread: 3
    },
    {
      id: 3,
      name: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff",
      lastMessage: "Thanks for the update",
      time: "Yesterday",
      online: true,
      unread: 0
    }
  ];

  const [activeContact, setActiveContact] = useState(contacts[0]);

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
      avatar: activeContact.avatar
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Column - Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 shrink-0"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">BeSafeChat</h2>
          <div className="w-10"></div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50 transform transition-transform duration-300 translate-x-0 md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
                    <div className="flex h-full w-full items-center justify-center rounded-full font-medium text-sm absolute inset-0 bg-primary text-primary-foreground">SL</div>
                    <img 
                      className="aspect-square h-full w-full object-cover relative z-10" 
                      src="https://s3.tebi.io/besafe.backet/users/89818c02-d096-4b88-b899-b1293a5ca6ea/avatar.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=hpIMKqPNLuibRLGd%2F20251210%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20251210T063035Z&X-Amz-Expires=3600&X-Amz-Signature=f55ae643f0ca4161cdf2d7fdb6120ad2dbcd5bfec665ae58023af0af4a3d4409&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject" 
                      alt="Profile"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">Sergey Lubimov</div>
                    <div className="text-sm text-muted-foreground truncate">eRYDMybUH5yzWtuL...</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 py-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent text-left">
                  <User className="h-5 w-5" />
                  <span>My Profile</span>
                </button>
                <div className="relative">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent text-left">
                    <Users className="h-5 w-5" />
                    <span>Contacts</span>
                  </button>
                </div>
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent text-left">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <div className="flex items-center justify-between px-4 py-3 hover:bg-accent cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Sun className="h-5 w-5" />
                    <span>Night Mode</span>
                  </div>
                  <button 
                    type="button" 
                    role="switch" 
                    aria-checked={isDarkMode}
                    data-state={isDarkMode ? "checked" : "unchecked"}
                    value="on" 
                    className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={toggleDarkMode}
                  >
                    <span 
                      data-state={isDarkMode ? "checked" : "unchecked"} 
                      className="bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and New Chat */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg outline-none focus:ring-2 focus:ring-primary/20" 
              type="text"
            />
          </div>
        </div>
        <div className="p-3 border-b border-border">
          <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </button>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className={`flex items-center p-3 cursor-pointer hover:bg-accent/50 ${activeContact.id === contact.id ? 'bg-accent' : ''}`}
              onClick={() => setActiveContact(contact)}
            >
              <div className="relative">
                <div className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
                  <div className="flex h-full w-full items-center justify-center rounded-full font-medium text-sm absolute inset-0 bg-primary text-primary-foreground">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <img 
                    className="aspect-square h-full w-full object-cover relative z-10" 
                    src={contact.avatar} 
                    alt={contact.name}
                  />
                </div>
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">{contact.name}</div>
                  {contact.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-sm text-muted-foreground truncate">{contact.lastMessage}</div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">{contact.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Column - Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10">
                <div className="flex h-full w-full items-center justify-center rounded-full font-medium text-sm absolute inset-0 bg-primary text-primary-foreground">
                  {activeContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <img 
                  className="aspect-square h-full w-full object-cover relative z-10" 
                  src={activeContact.avatar} 
                  alt={activeContact.name}
                />
              </div>
              <div className="ml-3">
                <div className="font-medium">{activeContact.name}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  {activeContact.online && <Circle className="w-2 h-2 bg-green-500 rounded-full mr-2" />}
                  {activeContact.online ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9">
                <Phone className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9">
                <Video className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9">
                <Info className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="relative flex-1">
          <div className="absolute inset-0 pointer-events-none"></div>
          <div className="relative z-10 h-full p-4 overflow-y-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-2 p-3 rounded-lg max-w-xs shadow ${message.sender === 'me' ? 'ml-auto message-own' : 'message-other'}`}
                style={message.sender === 'other' ? { background: 'linear-gradient(to right, rgb(199, 156, 150) 2%, white 2%)' } : {}}
              >
                {message.sender === 'other' && (
                  <div className="text-xs text-muted-foreground mb-1">{activeContact.name}</div>
                )}
                <div>{message.text}</div>
                <div className="text-xs text-muted-foreground mt-1 text-right">{message.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          {/* Attachment Options */}
          {showAttachments && (
            <div className="bg-gray-200 p-3 grid grid-cols-3 gap-2 mb-2 rounded-lg">
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
          
          <div className="flex items-center">
            <button 
              onClick={() => setShowAttachments(!showAttachments)}
              className="p-2 text-blue-500 hover:bg-gray-300 rounded-full mr-2"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  adjustTextareaHeight();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="
                  w-full
                  px-4
                  py-2
                  h-10
                  bg-muted
                  rounded-lg
                  border-0
                  outline-none
                  ring-0
                  focus:outline-none
                  focus:ring-0
                  placeholder:opacity-70
                  box-border
                  resize-none
                "
                rows="1"
              />
            </div>
            
            <button 
              onClick={newMessage.trim() ? handleSendMessage : null}
              disabled={!newMessage.trim()}
              className={`ml-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 has-[>svg]:px-3 px-4 py-2 h-10 rounded-lg border-0 outline-none ring-0 focus:outline-none focus:ring-0 box-border`}
            >
              {newMessage.trim() ? <SendHorizonal className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;