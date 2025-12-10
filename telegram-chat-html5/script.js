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
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3Cpath d='M12 2a8 8 0 0 0-8 8c0 2.4.9 4.6 2.3 6.2a7.93 7.93 0 0 0 3.1 1.9A8 8 0 0 0 12 22a8 8 0 0 0 3.6-1.7 7.93 7.93 0 0 0 3.1-1.9c1.4-1.6 2.3-3.8 2.3-6.2a8 8 0 0 0-8-8z'%3E%3C/path%3E%3C/svg%3E" alt="Contact">
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
    
    // Handle attachment options
    const attachOptions = document.querySelectorAll('.attach-option');
    attachOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionText = this.textContent.trim();
            console.log(`Selected attachment option: ${optionText}`);
            
            // Hide attachment options
            attachmentOptions.style.display = 'none';
            
            // You can add specific functionality for each attachment type here
            if(optionText.includes('Photo')) {
                // Handle photo attachment
                console.log('Photo attachment selected');
            } else if(optionText.includes('Video')) {
                // Handle video attachment
                console.log('Video attachment selected');
            } else if(optionText.includes('File')) {
                // Handle file attachment
                console.log('File attachment selected');
            } else if(optionText.includes('Location')) {
                // Handle location attachment
                console.log('Location attachment selected');
            } else if(optionText.includes('Contact')) {
                // Handle contact attachment
                console.log('Contact attachment selected');
            }
        });
    });
    
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