# Telegram-like Chat Interface

This project contains three implementations of a Telegram-like mobile-first responsive chat interface:

## 1. HTML5, SASS, JavaScript (Original)
A mobile-first responsive chat interface using vanilla web technologies.

### Features:
- Mobile-first responsive design
- Message bubbles with different styles for sent/received messages
- Avatar components
- Message input with auto-resizing textarea
- Attachment options (file, photo, video, location, contact)
- Online status indicator
- Timestamps for messages
- Smooth scrolling to latest message

## 2. HTML5, SASS, JavaScript (Expanded)
A complete application with three-column layout based on your design.

### Features:
- Complete three-column layout with sidebar
- Contact list with online status indicators
- Mobile-responsive menu with slide-out panel
- Dark mode toggle functionality
- Search functionality
- New chat button
- Message bubbles with different styles for sent/received messages
- Avatar components
- Message input with auto-resizing textarea
- Attachment options (photo, location, contact)
- Online status indicator
- Timestamps for messages
- Smooth scrolling to latest message

## 3. React, Tailwind CSS
A modern React implementation with Tailwind CSS styling.

### Features:
- Modern React component architecture
- Responsive design with Tailwind CSS
- Interactive message interface
- Auto-scrolling to latest message
- Message input with attachment options
- Simulated reply functionality
- Online status indicator

## How to Run

### For the HTML5 versions:
Simply open the HTML files in your browser:
- `telegram-chat-html5/index.html` (Original)
- `telegram-chat-html5/index-expanded.html` (Expanded)

Or serve them using a local HTTP server:
```bash
cd /workspace
python3 -m http.server 8000
```
Then visit `http://localhost:8000/test.html` in your browser.

### For the React version:
You need to run a development server to properly load the modules. You can set it up by navigating to the `telegram-chat-react` directory and running:
```bash
cd telegram-chat-react
npm install
npm run dev
```
Then visit `http://localhost:5173` in your browser.

## Project Structure
```
/workspace/
├── telegram-chat-html5/
│   ├── index.html (Original implementation)
│   ├── index-expanded.html (Expanded implementation)
│   ├── styles.css
│   ├── styles.scss
│   └── script.js
├── telegram-chat-react/
│   ├── src/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── test.html (Main demo page)
└── README.md (This file)
```

## Screenshots
The implementations include:
- Mobile-optimized chat interface
- Responsive design that works on different screen sizes
- Interactive message components
- Contact list with status indicators
- Modern UI with clean design