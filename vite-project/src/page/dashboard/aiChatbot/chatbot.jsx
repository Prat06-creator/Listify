import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import axios from 'axios';
const quickActions = [
  { id: 1, text: 'Add a task', emoji: '✓' },
  { id: 2, text: 'Track expenses', emoji: '💰' },
  { id: 3, text: 'Plan my day', emoji: '📅' },
  { id: 4, text: 'Write a note', emoji: '📝' },
];
export function ChatbotPanel() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

 const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
  if (messages.length === 0) {
    setMessages([
      {
        id: "welcome",
        text: "Hey! 😊 I’m here to help you plan, organize, or just think things through. What’s on your mind today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }
}, []);


  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);
   try {
        const res = await axios.post(
      "http://localhost:5000/api/ai/chat",
      {
        messages: [
          {
            role: "system",
            content:
              `You are a warm, friendly, and encouraging AI assistant inside a productivity app called Listify.
              Personality:
              - Speak like a supportive friend, not a robot
              - Be concise but caring
- Use simple language
- Light emojis are allowed 🙂✨ (not too many)
- Encourage progress, not perfection
Behavior:
- If the user sounds confused → reassure them
- If the user is productive → praise them
- If the user is overwhelmed → break things into small steps
Never say you are an AI model.`,
          },
          ...updatedMessages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          {
            role: "user",
            content: text,
          },
        ],
      }
    );
   setMessages((prev) => [...prev, {
      id: Date.now().toString(),
      text: res.data.reply,
      sender: 'ai',
      timestamp: new Date(),
   }]);
   } catch (error) {
     console.error("AI error:", error);
   }finally {
    setIsThinking(false);
  }
    
  }
  const handleQuickAction = (text) => {
  handleSendMessage(text);
};


  return (
    <div className="h-133 w-90 flex-shrink-0 ml-1">
      <div className="h-full bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-white/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">AI Assistant</h3>
              <p className="text-xs text-gray-500">Always here to help</p>
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="text-center space-y-2 pt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Hey, Friend!</h2>
              <p className="text-sm text-gray-500">Start by asking anything or tap below to begin</p>
            </div>

            <div className="space-y-3 pt-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.text)}
                  className="w-full p-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50 hover:from-purple-200/50 hover:to-pink-200/50 rounded-2xl text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-white/50"
                >
                  <span className="text-2xl mr-3">{action.emoji}</span>
                  <span className="text-gray-700 font-medium">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-2xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-br-sm'
                      : 'bg-white/80 backdrop-blur-sm text-gray-800 rounded-bl-sm border border-white/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 p-4 rounded-2xl rounded-bl-sm shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="p-6 border-t border-white/30">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/50">
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Tap on the AI to start speaking..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 px-2"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
