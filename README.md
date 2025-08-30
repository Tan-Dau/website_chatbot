# AI Chatbot

A modern, responsive web chatbot built with HTML, CSS, and JavaScript. This chatbot uses fixed responses to simulate an AI conversation experience.

## Features

- 🎨 **Modern UI Design**: Beautiful gradient design with smooth animations
- 📱 **Responsive Layout**: Works perfectly on desktop and mobile devices
- 💬 **Interactive Chat**: Real-time messaging with typing indicators
- 🔍 **Smart Responses**: Context-aware responses based on user input
- ⚡ **Fast Performance**: Lightweight and efficient JavaScript implementation
- 🎭 **Animations**: Smooth transitions and hover effects
- 📝 **Message History**: Scrollable chat history with timestamps
- 🎯 **Minimize/Maximize**: Collapsible chat interface
- 🚀 **Easy to Customize**: Simple structure for adding new responses

## How to Use

1. **Open the Chatbot**: Simply open `index.html` in your web browser
2. **Start Chatting**: Type your message in the input field and press Enter or click the send button
3. **Minimize**: Click the minus button to collapse the chat to just the header
4. **Toggle**: Use the floating chat button to show/hide the entire chatbot

## Supported Topics

The chatbot can respond to various topics including:

- **Greetings**: Hello, Hi, How are you
- **Help**: What can you do, Help, Assistance
- **Entertainment**: Jokes, Music, Movies, Books
- **Lifestyle**: Food, Sports, Travel, Work, Study
- **General**: Name, Age, Weather, Time
- **Gratitude**: Thanks, Thank you
- **Farewells**: Bye, Goodbye

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Adding New Responses

To add new responses, edit the `responses` object in `script.js`:

```javascript
this.responses = {
    'your_keyword': 'Your response here',
    // ... existing responses
};
```

### Changing Colors

Modify the CSS variables in `styles.css` to change the color scheme:

```css
.chat-header {
    background: linear-gradient(135deg, #your_color1 0%, #your_color2 100%);
}
```

### Adding New Features

The modular JavaScript structure makes it easy to add new features like:
- File uploads
- Voice messages
- User authentication
- Database integration
- API connections

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Dependencies

- **Font Awesome**: For icons (loaded via CDN)
- **No other external dependencies required**

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start chatting with the AI assistant!

## Future Enhancements

- [ ] Integration with real AI APIs
- [ ] User authentication system
- [ ] Chat history persistence
- [ ] File sharing capabilities
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Custom themes
- [ ] Analytics dashboard

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to contribute by:
- Adding new features
- Improving the UI/UX
- Fixing bugs
- Adding new response patterns
- Enhancing accessibility

---

**Enjoy chatting with your AI assistant! 🤖✨**
