// src/components/GroqChatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useGroqChat } from '../hooks/useGroqChat';

export function GroqChatbot() {
    const [input, setInput] = useState('');
    const { messages, sendMessage, isLoading } = useGroqChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        await sendMessage(userMessage);
    };

    // Suggested questions based on current data
    const suggestedQuestions = [
        "What's the current water level?",
        "Are there any alerts?",
        "Show me sensor status",
        "Generate a water quality report",
        "What's the trend for today?"
    ];

    return (
        <div className="flex flex-col h-[600px] bg-slate-900/50 backdrop-blur-sm rounded-xl border border-indigo-500/20">
            {/* Header */}
            <div className="p-4 border-b border-indigo-500/20">
                <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-indigo-400" />
                    {/* <img width={20} src="../../public/Ai-build.png" /> */}
                    <h3 className="font-semibold text-white">HydroGuard AI Assistant</h3>
                    <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">
                        author: NforLeonard
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-slate-400 mt-8">
                        {/* <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" /> */}
                        <center> <img src="../../public/Ai-build.png" width="250px" /></center>
                        <p>Ask me anything about your water system!</p>
                        <div className="mt-4 space-y-2">
                            {suggestedQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(q)}
                                    className="block w-full text-left text-sm bg-slate-800/50 hover:bg-indigo-500/10 p-2 rounded-lg transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user'
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-slate-800 text-slate-200'
                                    }`}
                            >
                                <div className="flex items-start space-x-2">
                                    {msg.role === 'assistant' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                                    {msg.role === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                                    <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-800 rounded-lg p-3">
                            <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-indigo-500/20">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your water system..."
                        className="flex-1 bg-slate-800 border border-indigo-500/20 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}