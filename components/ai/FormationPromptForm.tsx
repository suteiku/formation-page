'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Loader2, Sparkles, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { GeneratedLandingContent } from '@/lib/ai/prompts'

interface FormationPromptFormProps {
    onGenerated: (content: GeneratedLandingContent) => void
}

export function FormationPromptForm({ onGenerated }: FormationPromptFormProps) {
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('97')
    const [targetAudience, setTargetAudience] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = async () => {
        if (description.trim().length < 20) {
            toast.error('Veuillez décrire votre formation en au moins 20 caractères')
            return
        }

        setIsGenerating(true)
        try {
            const response = await fetch('/api/ai/generate-landing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description: description.trim(),
                    price: price ? parseFloat(price) : undefined,
                    targetAudience: targetAudience.trim() || undefined,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate content')
            }

            const data = await response.json()
            onGenerated(data.content)
            toast.success('🎉 Landing page générée avec succès !')
        } catch (error) {
            console.error(error)
            toast.error('Erreur lors de la génération. Réessayez.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                    Créez votre formation avec l&apos;IA
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                    Décrivez simplement votre formation, notre IA génère tout le contenu de la landing page.
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="description">
                        Description de votre formation <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Exemple : Une formation complète sur le développement web avec Next.js pour débutants. Couvre React, TypeScript, les bases de données, et le déploiement sur Vercel. Parfait pour ceux qui veulent créer des applications modernes..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="resize-none"
                    />
                    <p className="text-xs text-gray-500">
                        {description.length} caractères (min. 20) - Plus vous donnez de détails, meilleur sera le résultat !
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Prix suggéré (€)</Label>
                        <Input
                            id="price"
                            type="number"
                            placeholder="97"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            step="1"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="audience">Public cible (optionnel)</Label>
                        <Input
                            id="audience"
                            placeholder="Débutants, entrepreneurs..."
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                        />
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || description.trim().length < 20}
                    size="lg"
                    className="w-full"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Génération en cours...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-5 w-5 mr-2" />
                            Générer ma landing page
                        </>
                    )}
                </Button>

                {isGenerating && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                        <p className="text-sm text-indigo-900 flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            L&apos;IA analyse votre description et génère un contenu professionnel...
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
