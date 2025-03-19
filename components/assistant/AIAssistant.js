function AIAssistant({ isOpen, onClose }) {
    try {
        const [messages, setMessages] = React.useState([
            {
                role: 'assistant',
                content: "Hi! I'm Nourish, your food sharing assistant. I can help you find food, suggest recipes for ingredients you have, provide food storage tips, or answer questions about ShareFoods. How can I help you today?"
            }
        ]);
        const [userInput, setUserInput] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(false);
        const messagesEndRef = React.useRef(null);

        React.useEffect(() => {
            scrollToBottom();
        }, [messages]);

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        const handleSendMessage = async (e) => {
            e.preventDefault();
            
            if (!userInput.trim()) return;
            
            // Add user message to chat
            const userMessage = {
                role: 'user',
                content: userInput
            };
            
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setUserInput('');
            setIsLoading(true);
            
            try {
                // Get chat history for context
                const chatHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
                
                // Call AI service
                const response = await chatWithNourish(userInput, chatHistory);
                
                // Add AI response to chat
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        role: 'assistant',
                        content: response
                    }
                ]);
            } catch (error) {
                console.error('AI assistant error:', error);
                
                // Add error message
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        role: 'assistant',
                        content: "I'm sorry, I'm having trouble connecting right now. Please try again later."
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        const handleQuickQuestion = (question) => {
            setUserInput(question);
            // Don't automatically send to allow user to edit if desired
        };

        const quickQuestions = [
            "How do I find food near me?",
            "What can I make with tomatoes and basil?",
            "How do I store leafy greens?",
            "How does ShareFoods work?"
        ];

        if (!isOpen) return null;

        return (
            <div data-name="ai-assistant" className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 flex flex-col" style={{ maxHeight: '90vh' }}>
                    {/* Header */}
                    <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between rounded-t-lg">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                                <i className="fas fa-robot text-green-600"></i>
                            </div>
                            <div>
                                <h3 className="font-bold">Nourish Assistant</h3>
                                <p className="text-xs text-green-100">Powered by AI</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-white hover:text-green-200"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    
                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ minHeight: '300px' }}>
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                                        message.role === 'user' 
                                            ? 'bg-green-600 text-white' 
                                            : 'bg-white border border-gray-200'
                                    }`}
                                >
                                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Quick questions */}
                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 overflow-x-auto whitespace-nowrap">
                        <div className="flex space-x-2">
                            {quickQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickQuestion(question)}
                                    className="px-3 py-1 bg-white text-green-600 border border-green-200 rounded-full text-sm whitespace-nowrap hover:bg-green-50"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Input area */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                        <div className="relative">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask me anything about food..."
                                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!userInput.trim() || isLoading}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full disabled:bg-gray-400"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AIAssistant component error:', error);
        reportError(error);
        return null;
    }
}
