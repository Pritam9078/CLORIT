import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log('Listing available models...');

        // Try different model names
        const modelNames = [
            'gemini-pro',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'models/gemini-pro',
            'models/gemini-1.5-pro',
            'models/gemini-1.5-flash'
        ];

        for (const modelName of modelNames) {
            try {
                console.log(`\nTrying model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Say 'working'");
                const response = await result.response;
                console.log(`✅ ${modelName} works! Response:`, response.text());
                break;
            } catch (error) {
                console.log(`❌ ${modelName} failed:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
