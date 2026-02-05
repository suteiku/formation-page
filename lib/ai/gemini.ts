import { GoogleGenerativeAI } from '@google/generative-ai'

// Only initialize if API key is present (to avoid errors during build/dev)
let genAI: GoogleGenerativeAI | null = null
let model: any = null

if (process.env.GOOGLE_AI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
    model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
        generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            maxOutputTokens: 8192,
        },
    })
}

export { genAI, model }
