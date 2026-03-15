// src/hooks/useGroqChat.ts
import { useState } from 'react';
import Groq from 'groq-sdk';
import { useWaterData } from './useWaterData';
import { formatWaterDataForAI } from '../utils/waterDataContext';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
// Initialize Groq
const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Only for development!
});

export const useGroqChat = () => {
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const waterData = useWaterData();

    const sendMessage = async (userMessage: string) => {
        setIsLoading(true);

        try {
            // Add user message to state
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

            // Format current water data as context
            const waterContext = formatWaterDataForAI(waterData);

            // Create the system prompt with context
            const systemPrompt = `You are HydroGuard AI, an expert water monitoring assistant. 
You have access to real-time water system data. Use this data to answer questions accurately.

${waterContext}

Instructions:
- Answer questions based ONLY on the provided data
- If asked about something not in the data, say you don't have that information
- Be concise but helpful
- For alerts, explain the severity and recommend actions
- For trends, use the historical data to provide context
- Always include specific numbers when available`;

            // Call Groq API
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage }
                ],
                model: 'mixtral-8x7b-32768', // or 'llama2-70b-4096'
                temperature: 0.7,
                max_tokens: 1024,
            });

            const botResponse = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

            // Add bot response to state
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);

            return botResponse;
        } catch (error) {
            console.error('Groq API error:', error);
            return 'Sorry, I encountered an error processing your request.';
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        sendMessage,
        isLoading
    };
};