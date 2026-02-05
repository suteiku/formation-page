'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { FormationPromptForm } from '@/components/ai/FormationPromptForm'
import { LandingPreview } from '@/components/ai/LandingPreview'
import { GeneratedLandingContent } from '@/lib/ai/prompts'
import { toast } from 'sonner'

export default function NewAIFormationPage() {
    const router = useRouter()
    const [generatedContent, setGeneratedContent] = useState<GeneratedLandingContent | null>(null)
    const [price, setPrice] = useState(97)
    const [isSaving, setIsSaving] = useState(false)

    const handleCreateFormation = async () => {
        if (!generatedContent) return

        setIsSaving(true)
        try {
            // Create the formation with AI-generated content
            const slug = generatedContent.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')

            const response = await fetch('/api/formations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: generatedContent.title,
                    slug,
                    pitch: generatedContent.pitch,
                    description: generatedContent.description,
                    targetAudience: generatedContent.targetAudience,
                    price,
                    coverImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800', // Default
                    templateConfig: {
                        template: generatedContent.recommendedTemplate,
                        colors: {
                            primary: generatedContent.colorPalette.primary,
                            secondary: generatedContent.colorPalette.secondary,
                            accent: generatedContent.colorPalette.accent,
                            background: '#ffffff',
                            text: '#1f2937',
                        },
                        fonts: {
                            heading: 'Inter',
                            body: 'Inter',
                        },
                        sections: {
                            hero: { enabled: true, order: 1 },
                            benefits: { enabled: true, order: 2 },
                            curriculum: { enabled: true, order: 3 },
                            testimonials: { enabled: true, order: 4 },
                            faq: { enabled: true, order: 5 },
                            pricing: { enabled: true, order: 6 },
                        },
                    },
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create formation')
            }

            const { formation } = await response.json()

            // TODO: Create modules, testimonials, and FAQ based on generated content
            // This would require additional API calls to create related data

            toast.success('🎉 Formation créée avec succès !')
            router.push(`/dashboard/formations/${formation.id}`)
        } catch (error) {
            console.error(error)
            toast.error('Erreur lors de la création de la formation')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard/formations/new">
                        <Button variant="ghost" size="sm" className="mb-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour au choix
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Créer une formation avec l&apos;IA
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Décrivez votre formation, notre IA génère automatiquement tout le contenu marketing.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left: Form */}
                    <div className="space-y-6">
                        <FormationPromptForm
                            onGenerated={(content) => {
                                setGeneratedContent(content)
                                toast.info('✨ Faites défiler pour voir la prévisualisation !')
                            }}
                        />

                        {generatedContent && (
                            <div className="bg-white border rounded-lg p-6">
                                <h3 className="font-semibold mb-4">Prêt à créer votre formation ?</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Le contenu a été généré. Vous pourrez personnaliser tous les détails après la création.
                                </p>
                                <Button
                                    onClick={handleCreateFormation}
                                    disabled={isSaving}
                                    size="lg"
                                    className="w-full"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                            Création en cours...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Créer la formation
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right: Preview */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        {generatedContent ? (
                            <LandingPreview content={generatedContent} price={price} />
                        ) : (
                            <div className="bg-white border-2 border-dashed rounded-lg p-12 text-center">
                                <div className="text-gray-400 mb-4">
                                    <svg
                                        className="mx-auto h-12 w-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Aperçu du contenu
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Décrivez votre formation à gauche pour voir la prévisualisation ici
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
