import React, { useState, useEffect, useRef } from 'react';
import {
    MessageCircle,
    X,
    Send,
    Zap,
    Sparkles,
    TreePine,
    Wind,
    Droplets,
    ArrowRight,
    Maximize2,
    Minimize2,
    Bot,
    User,

    ChevronLeft,
    RefreshCcw,
    HandMetal
} from 'lucide-react';

interface Message {
    id: string;
    role: 'assistant' | 'user';
    content: string;
    timestamp: Date;
}

const AiEcoAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your CLORIT Eco-Assistant. I can help you with mangrove species selection, carbon calculations, and site optimization. How can I assist your community today?",
            timestamp: new Date()
        }

    ]);

    // Reset function
    const handleReset = () => {
        setMessages([{
            id: Date.now().toString(),
            role: 'assistant',
            content: "Hello! I'm your CLORIT Eco-Assistant. I can help you with mangrove species selection, carbon calculations, and site optimization. How can I assist your community today?",
            timestamp: new Date()
        }]);
    };
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Call the backend AI API
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
            const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    userId: 'default' // You can use actual user ID if available
                })
            });

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.success
                    ? data.message
                    : "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('AI Chat Error:', error);

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm experiencing connection issues. Please check your internet connection and try again.",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 right-10 w-16 h-16 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-emerald-500 hover:-translate-y-1 transition-all duration-300 z-[9999] group border-4 border-white"
            >
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    <Zap className="w-3 h-3 text-white fill-white" />
                </div>
                <Bot className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </button>
        );
    }

    return (
        <div
            className={`fixed ${isMinimized ? 'bottom-10 right-10 h-16 w-80' : 'bottom-10 right-10 h-[600px] w-[400px]'} bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col transition-all duration-500 overflow-hidden z-[9999] shadow-emerald-900/20`}
        >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white shrink-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-16 -mt-16" />

                {/* Left Controls (Back) */}
                <div className="flex items-center gap-2 relative z-10">
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group"
                        title="Minimize / Back"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                </div>

                {/* Center Info */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm tracking-wide">CLORIT AI</h4>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Online</span>
                        </div>
                    </div>
                </div>

                {/* Right Controls (Actions) */}
                <div className="flex items-center gap-1 relative z-10">
                    <button onClick={handleReset} className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors text-white/70 hover:text-emerald-400" title="Reset Chat">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors text-white/70" title="Close">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-slate-50/30">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                            >
                                <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-black text-xs ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        }`}>
                                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <div className={`p-5 rounded-[2rem] text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-slate-900 text-white rounded-tr-none'
                                        : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none font-medium'
                                        }`}>
                                        {msg.content}
                                        <div className={`text-[9px] mt-2 font-black uppercase tracking-tight opacity-40 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div className="bg-white border border-slate-100 p-4 rounded-[2rem] rounded-tl-none">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Actions */}
                    <div className="px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 bg-white border-t border-slate-50">
                        <button onClick={() => setInput("Calculate my credits")} className="whitespace-nowrap px-4 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100">
                            📊 CREDIT CALC
                        </button>
                        <button onClick={() => setInput("Species advice")} className="whitespace-nowrap px-4 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100">
                            🌱 SPECIES ADVICE
                        </button>
                        <button onClick={() => setInput("Site optimization")} className="whitespace-nowrap px-4 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100">
                            ⚡ OPTIMIZE SITE
                        </button>
                    </div>

                    {/* Input Area */}
                    <div className="p-8 pt-2 bg-white shrink-0">
                        <div className="relative flex items-center group">
                            <input
                                type="text"
                                placeholder="Ask anything about blue carbon..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                className="w-full h-16 pl-6 pr-20 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100"
                            >
                                <Send className="w-5 h-5 translate-x-0.5 -translate-y-0.5" />
                            </button>
                        </div>
                        <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
                            CLORIT AI ECO-ASSISTANT <Bolt className="w-3 h-3" /> CAN MAKE MISTAKES. VERIFY CRITICAL DATA.
                        </p>
                    </div>
                </>
            )}

            {isMinimized && (
                <button
                    onClick={() => setIsMinimized(false)}
                    className="flex-1 flex items-center justify-center font-black text-[10px] tracking-[0.2em] text-slate-400 uppercase hover:text-emerald-500 transition-colors"
                >
                    CLICK TO EXPAND CHAT <ArrowRight className="ml-2 w-3 h-3" />
                </button>
            )}
        </div>
    );
};

export default AiEcoAssistant;

const Bolt: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <circle cx="12" cy="12" r="4" />
    </svg>
);
