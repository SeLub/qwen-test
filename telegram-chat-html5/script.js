document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const attachButton = document.getElementById('attachButton');
    const attachmentOptions = document.getElementById('attachmentOptions');
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Toggle attachment options
    attachButton.addEventListener('click', function(e) {
        e.stopPropagation();
        attachmentOptions.style.display = attachmentOptions.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close attachment options when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!attachmentOptions.contains(e.target) && e.target !== attachButton) {
            attachmentOptions.style.display = 'none';
        }
    });
    
    // Handle sending messages
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // Create message element
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            
            const now = new Date();
            const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                              now.getMinutes().toString().padStart(2, '0');
            
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${escapeHtml(messageText)}</div>
                    <div class="message-time">${timeString}</div>
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            messageInput.value = '';
            messageInput.style.height = 'auto';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate reply after a delay
            setTimeout(simulateReply, 1000 + Math.random() * 2000);
        }
    }
    
    // Simulate reply from contact
    function simulateReply() {
        const replies = [
            "Thanks for your message!",
            "That's interesting, tell me more.",
            "I agree with you on that point.",
            "How are you doing today?",
            "I was thinking about the same thing.",
            "Great to hear from you!"
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message received';
        
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
        
        messageElement.innerHTML = `
            <div class="avatar">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="Contact">
            </div>
            <div class="message-content">
                <div class="message-text">${escapeHtml(randomReply)}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Initialize scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
});