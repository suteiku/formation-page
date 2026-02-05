import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { model } from '@/lib/ai/gemini'
import {
    LANDING_PAGE_SYSTEM_PROMPT,
    buildLandingPagePrompt,
    GeneratedLandingContent
} from '@/lib/ai/prompts'

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        // Check if Gemini API is configured
        if (!model) {
            return NextResponse.json(
                { error: 'Le générateur IA n\'est pas configuré. Veuillez ajouter GOOGLE_AI_API_KEY dans .env.local' },
                { status: 503 }
            )
        }

        const { description, price, targetAudience } = await req.json()

        if (!description || description.trim().length < 20) {
            return NextResponse.json(
                { error: 'La description doit contenir au moins 20 caractères' },
                { status: 400 }
            )
        }

        // Build the prompt
        const userPrompt = buildLandingPagePrompt(description, price, targetAudience)

        // Call Gemini AI
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: LANDING_PAGE_SYSTEM_PROMPT }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Je comprends. Je vais générer des landing pages professionnelles en format JSON uniquement.' }],
                },
            ],
        })

        const result = await chat.sendMessage(userPrompt)
        const responseText = result.response.text()

        // Parse JSON response
        let generatedContent: GeneratedLandingContent
        try {
            // Extract JSON from response (in case there's markdown formatting)
            const jsonMatch = responseText.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error('No JSON found in response')
            }
            generatedContent = JSON.parse(jsonMatch[0])
        } catch (parseError) {
            console.error('Failed to parse AI response:', responseText)
            return NextResponse.json(
                { error: 'Erreur lors de la génération du contenu. Veuillez réessayer.' },
                { status: 500 }
            )
        }

        // Validate required fields
        if (!generatedContent.title || !generatedContent.pitch || !generatedContent.description) {
            return NextResponse.json(
                { error: 'Contenu généré incomplet' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            content: generatedContent,
        })
    } catch (error) {
        console.error('Error generating landing page:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la génération de la landing page' },
            { status: 500 }
        )
    }
}
