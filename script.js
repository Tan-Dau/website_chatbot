// Chatbot functionality
class Chatbot {
    constructor() {
        this.isMinimized = false;
        this.isTyping = false;
        this.responses = {
            'hello': 'Hello! How can I help you today?',
            'hi': 'Hi there! Nice to meet you!',
            'how are you': 'I\'m doing great, thank you for asking! How about you?',
            'what can you do': 'I can help you with various questions, provide information, and have conversations. I\'m here to assist you!',
            'help': 'I\'m here to help! You can ask me questions about general topics, or just chat with me. What would you like to know?',
            'bye': 'Goodbye! Have a great day!',
            'thanks': 'You\'re welcome! Is there anything else I can help you with?',
            'thank you': 'You\'re very welcome! Feel free to ask me anything else.',
            'weather': 'I\'m sorry, I don\'t have access to real-time weather data. You might want to check a weather app or website for current conditions.',
            'time': 'I can\'t tell you the exact time, but you can check your device\'s clock for the current time.',
            'joke': 'Why don\'t scientists trust atoms? Because they make up everything! 😄',
            'name': 'My name is AI Assistant, nice to meet you!',
            'age': 'I\'m an AI, so I don\'t have an age in the traditional sense. I\'m here to help you!',
            'music': 'I can\'t play music directly, but I can recommend some great artists or discuss music with you!',
            'food': 'I love talking about food! What\'s your favorite cuisine?',
            'movie': 'Movies are great! What genre do you enjoy? I can suggest some classics.',
            'book': 'Books are wonderful! What type of books do you like to read?',
            'sport': 'Sports are exciting! Do you have a favorite sport or team?',
            'travel': 'Traveling is amazing! Where would you like to go? I can share some interesting facts about different places.',
            'work': 'Work can be challenging but rewarding. How\'s your day going?',
            'study': 'Studying is important! What subject are you working on? I\'d be happy to help if I can.',
            'default': 'That\'s an interesting question! I\'m still learning and might not have all the answers, but I\'m here to chat and help where I can.'
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.removeWelcomeMessage();
    }

    bindEvents() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        const minimizeBtn = document.getElementById('minimizeBtn');
        const chatToggle = document.getElementById('chatToggle');

        sendBtn.addEventListener('click', () => this.sendMessage());
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        chatToggle.addEventListener('click', () => this.toggleChat());

        // Focus input on chat open
        userInput.addEventListener('focus', () => {
            if (this.isMinimized) {
                this.toggleChat();
            }
        });

        // Auto-focus input when chat opens
        userInput.focus();
    }

    removeWelcomeMessage() {
        setTimeout(() => {
            const welcomeMessage = document.querySelector('.welcome-message');
            if (welcomeMessage) {
                welcomeMessage.style.opacity = '0';
                setTimeout(() => {
                    welcomeMessage.remove();
                }, 300);
            }
        }, 3000);
    }

    sendMessage() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        
        if (message === '') return;

        // Add user message
        this.addMessage(message, 'user');
        userInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate bot thinking time
        setTimeout(() => {
            this.hideTypingIndicator();
            const botResponse = this.getBotResponse(message);
            this.addMessage(botResponse, 'bot');
            
            // Add suggestions after bot response
            this.addSuggestions(message);
        }, 800 + Math.random() * 600);
    }

    addMessage(text, sender) {
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        const time = this.getCurrentTime();
        
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(text)}</p>
            </div>
            <div class="message-time">${time}</div>
        `;

        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    addSuggestions(userMessage) {
        const chatBody = document.getElementById('chatBody');
        const suggestionsDiv = document.createElement('div');
        const suggestions = this.getSuggestions(userMessage);
        
        if (suggestions.length > 0) {
            suggestionsDiv.className = 'message bot-message';
            suggestionsDiv.innerHTML = `
                <div class="suggestions" style="margin: 0; justify-content: flex-start;">
                    ${suggestions.map(suggestion => 
                        `<div class="suggestion-chip" onclick="sendSuggestion('${suggestion}')">${suggestion}</div>`
                    ).join('')}
                </div>
            `;
            
            chatBody.appendChild(suggestionsDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    getSuggestions(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        const suggestions = [];
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            suggestions.push('What can you do?', 'Tell me a joke', 'How are you?');
        } else if (lowerMessage.includes('joke')) {
            suggestions.push('Another joke', 'Tell me about yourself', 'What\'s the weather like?');
        } else if (lowerMessage.includes('help')) {
            suggestions.push('What can you do?', 'Tell me a joke', 'Hello');
        } else if (lowerMessage.includes('food')) {
            suggestions.push('Tell me about movies', 'What about books?', 'Sports?');
        } else if (lowerMessage.includes('movie')) {
            suggestions.push('What about books?', 'Tell me about food', 'Sports?');
        } else {
            suggestions.push('Tell me a joke', 'What can you do?', 'Hello');
        }
        
        return suggestions;
    }

    getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for exact matches first
        for (const [key, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        // Check for question patterns
        if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why')) {
            if (lowerMessage.includes('weather')) return this.responses.weather;
            if (lowerMessage.includes('time')) return this.responses.time;
            if (lowerMessage.includes('name')) return this.responses.name;
            if (lowerMessage.includes('age')) return this.responses.age;
        }

        // Check for greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.responses.hello;
        }

        // Check for farewells
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
            return this.responses.bye;
        }

        // Check for gratitude
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return this.responses.thanks;
        }

        // Check for help requests
        if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
            return this.responses.help;
        }

        // Check for specific topics
        if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
            return this.responses.joke;
        }

        if (lowerMessage.includes('music') || lowerMessage.includes('song')) {
            return this.responses.music;
        }

        if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('cuisine')) {
            return this.responses.food;
        }

        if (lowerMessage.includes('movie') || lowerMessage.includes('film')) {
            return this.responses.movie;
        }

        if (lowerMessage.includes('book') || lowerMessage.includes('read')) {
            return this.responses.book;
        }

        if (lowerMessage.includes('sport') || lowerMessage.includes('game')) {
            return this.responses.sport;
        }

        if (lowerMessage.includes('travel') || lowerMessage.includes('trip') || lowerMessage.includes('visit')) {
            return this.responses.travel;
        }

        if (lowerMessage.includes('work') || lowerMessage.includes('job')) {
            return this.responses.work;
        }

        if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
            return this.responses.study;
        }

        // Default response
        return this.responses.default;
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const chatBody = document.getElementById('chatBody');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    toggleMinimize() {
        const chatContainer = document.querySelector('.chatbot-container');
        const minimizeBtn = document.getElementById('minimizeBtn');
        const chatBody = document.querySelector('.chat-body');
        const chatInput = document.querySelector('.chat-input');

        if (this.isMinimized) {
            // Expand
            chatContainer.style.height = '600px';
            chatBody.style.display = 'flex';
            chatInput.style.display = 'flex';
            minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
            minimizeBtn.title = 'Minimize chat';
            this.isMinimized = false;
        } else {
            // Minimize
            chatContainer.style.height = '80px';
            chatBody.style.display = 'none';
            chatInput.style.display = 'none';
            minimizeBtn.innerHTML = '<i class="fas fa-plus"></i>';
            minimizeBtn.title = 'Expand chat';
            this.isMinimized = true;
        }
    }

    toggleChat() {
        const chatContainer = document.querySelector('.chatbot-container');
        const chatToggle = document.getElementById('chatToggle');
        
        if (chatContainer.style.display === 'none') {
            // Show chat
            chatContainer.style.display = 'flex';
            chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
            chatToggle.title = 'Open chat';
            document.getElementById('userInput').focus();
        } else {
            // Hide chat
            chatContainer.style.display = 'none';
            chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
            chatToggle.title = 'Open chat';
        }
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${displayHours}:${displayMinutes} ${ampm}`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global function for suggestion chips
function sendSuggestion(text) {
    const userInput = document.getElementById('userInput');
    userInput.value = text;
    window.chatbot.sendMessage();
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
});
