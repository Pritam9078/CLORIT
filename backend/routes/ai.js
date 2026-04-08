import express from 'express';
import geminiService from '../services/geminiService.js';

const router = express.Router();

/**
 * POST /api/ai/chat
 * Send a message to the AI assistant
 */
router.post('/chat', async (req, res) => {
    try {
        const { message, userId } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        const response = await geminiService.sendMessage(message, userId);

        res.json(response);
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV !== 'production' ? error.message : undefined
        });
    }
});

/**
 * POST /api/ai/reset
 * Reset chat session for a user
 */
router.post('/reset', async (req, res) => {
    try {
        const { userId } = req.body;
        const response = geminiService.resetChat(userId);
        res.json(response);
    } catch (error) {
        console.error('AI Reset Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reset chat session'
        });
    }
});

/**
 * POST /api/ai/quick-response
 * Get a quick response without maintaining chat history
 */
router.post('/quick-response', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }

        const response = await geminiService.getQuickResponse(prompt);
        res.json(response);
    } catch (error) {
        console.error('AI Quick Response Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

export default router;
