import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for CLORIT AI Assistant
const SYSTEM_PROMPT = `You are the CLORIT AI Eco-Assistant, an expert in blue carbon ecosystems, mangrove restoration, and carbon credit systems. 

CLORIT is a blockchain-based platform for Community-Led Organic Restoration and Impact Tracking that focuses on:
- Mangrove restoration and blue carbon sequestration
- CLB (CLORIT Blue Carbon) credits - blockchain-based carbon credits
- Community-driven environmental projects
- NDVI (Normalized Difference Vegetation Index) monitoring
- Carbon footprint calculation and offsetting

Your expertise includes:
1. **Mangrove Species**: Avicennia marina, Rhizophora mucronata, Bruguiera gymnorrhiza, and other coastal species
2. **Carbon Calculations**: CO2 sequestration rates, carbon credit calculations, offset strategies
3. **Site Optimization**: Soil salinity, tidal patterns, species selection for different zones
4. **Blockchain Integration**: CLB token mechanics, NFT certificates, transparent tracking
5. **Community Guidance**: Best practices for community-led restoration projects

Provide helpful, accurate, and actionable advice. Keep responses concise (2-3 paragraphs max) and friendly. Use emojis sparingly for emphasis.`;

class GeminiService {
    constructor() {
        this.model = genAI.getGenerativeModel({
            model: "gemini-pro"
        });
        this.chatSessions = new Map(); // Store chat sessions by user ID
    }

    /**
     * Get or create a chat session for a user
     */
    getChatSession(userId = 'default') {
        if (!this.chatSessions.has(userId)) {
            const chat = this.model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "You are the CLORIT AI Eco-Assistant. Please introduce yourself." }]
                    },
                    {
                        role: "model",
                        parts: [{ text: SYSTEM_PROMPT }]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                },
            });
            this.chatSessions.set(userId, chat);
        }
        return this.chatSessions.get(userId);
    }

    /**
     * Send a message and get AI response
     */
    async sendMessage(message, userId = 'default') {
        try {
            const chat = this.getChatSession(userId);
            const result = await chat.sendMessage(message);
            const response = await result.response;
            return {
                success: true,
                message: response.text()
            };
        } catch (error) {
            console.error('Gemini AI Error:', error);
            return {
                success: false,
                message: 'I apologize, but I encountered an error processing your request. Please try again.',
                error: error.message
            };
        }
    }

    /**
     * Reset chat session for a user
     */
    resetChat(userId = 'default') {
        this.chatSessions.delete(userId);
        return {
            success: true,
            message: 'Chat session reset successfully'
        };
    }

    /**
     * Get a quick response without maintaining chat history
     */
    async getQuickResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return {
                success: true,
                message: response.text()
            };
        } catch (error) {
            console.error('Gemini AI Error:', error);
            return {
                success: false,
                message: 'Unable to generate response at this time.',
                error: error.message
            };
        }
    }
}

// Export singleton instance
const geminiService = new GeminiService();
export default geminiService;
