'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, Type, Layout, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { TemplateType, TemplateConfig } from '@/types/templates'
import { defaultMinimalistConfig, defaultBoldConfig, defaultPremiumConfig } from '@/lib/template-configs'

interface DesignEditorProps {
    formationId: string
    initialConfig?: Partial<TemplateConfig>
}

export function DesignEditor({ formationId, initialConfig }: DesignEditorProps) {
    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)

    // Initialize with default minimalist or existing config
    const [config, setConfig] = useState<TemplateConfig>(() => {
        if (initialConfig?.template) {
            return {
                ...defaultMinimalistConfig,
                ...initialConfig,
            } as TemplateConfig
        }
        return defaultMinimalistConfig
    })

    const handleTemplateChange = (template: TemplateType) => {
        let newConfig: TemplateConfig
        switch (template) {
            case 'bold':
                newConfig = defaultBoldConfig
                break
            case 'premium':
                newConfig = defaultPremiumConfig
                break
            default:
                newConfig = defaultMinimalistConfig
        }
        setConfig(newConfig)
    }

    const handleColorChange = (key: keyof TemplateConfig['colors'], value: string) => {
        setConfig((prev) => ({
            ...prev,
            colors: {
                ...prev.colors,
                [key]: value,
            },
        }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const response = await fetch(`/api/formations/${formationId}/design`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ templateConfig: config }),
            })

            if (!response.ok) throw new Error('Failed to save')

            toast.success('Design sauvegardé avec succès !')
            router.refresh()
        } catch (error) {
            toast.error('Erreur lors de la sauvegarde')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Template Selector */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Layout className="h-5 w-5" />
                        Choisir un template
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={config.template} onValueChange={(value) => handleTemplateChange(value as TemplateType)}>
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Minimalist */}
                            <Label
                                htmlFor="minimalist"
                                className={`cursor-pointer rounded-lg border-2 p-4 hover:border-indigo-500 transition-colors ${config.template === 'minimalist' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="minimalist" id="minimalist" />
                                    <div className="flex-1">
                                        <div className="font-semibold">Minimalist</div>
                                        <div className="text-sm text-gray-500">Simple et épuré</div>
                                    </div>
                                </div>
                                <div className="mt-3 h-32 rounded bg-white border flex items-center justify-center text-xs text-gray-400">
                                    Aperçu Minimalist
                                </div>
                            </Label>

                            {/* Bold */}
                            <Label
                                htmlFor="bold"
                                className={`cursor-pointer rounded-lg border-2 p-4 hover:border-amber-500 transition-colors ${config.template === 'bold' ? 'border-amber-500 bg-amber-50' : 'border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="bold" id="bold" />
                                    <div className="flex-1">
                                        <div className="font-semibold">Bold</div>
                                        <div className="text-sm text-gray-500">Coloré et dynamique</div>
                                    </div>
                                </div>
                                <div className="mt-3 h-32 rounded bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center text-xs text-white">
                                    Aperçu Bold
                                </div>
                            </Label>

                            {/* Premium */}
                            <Label
                                htmlFor="premium"
                                className={`cursor-pointer rounded-lg border-2 p-4 hover:border-yellow-600 transition-colors ${config.template === 'premium' ? 'border-yellow-600 bg-yellow-50' : 'border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value="premium" id="premium" />
                                    <div className="flex-1">
                                        <div className="font-semibold">Premium</div>
                                        <div className="text-sm text-gray-500">Élégant et sombre</div>
                                    </div>
                                </div>
                                <div className="mt-3 h-32 rounded bg-black border-yellow-600 border flex items-center justify-center text-xs text-yellow-600">
                                    Aperçu Premium
                                </div>
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* Customization Tabs */}
            <Card>
                <CardHeader>
                    <CardTitle>Personnalisation</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="colors">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="colors">
                                <Palette className="h-4 w-4 mr-2" />
                                Couleurs
                            </TabsTrigger>
                            <TabsTrigger value="fonts">
                                <Type className="h-4 w-4 mr-2" />
                                Typographie
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="colors" className="space-y-4 pt-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary">Couleur primaire</Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            id="primary"
                                            value={config.colors.primary}
                                            onChange={(e) => handleColorChange('primary', e.target.value)}
                                            className="h-10 w-20 rounded border border-slate-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={config.colors.primary}
                                            onChange={(e) => handleColorChange('primary', e.target.value)}
                                            className="flex-1 h-10 px-3 rounded border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="secondary">Couleur secondaire</Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            id="secondary"
                                            value={config.colors.secondary}
                                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                                            className="h-10 w-20 rounded border border-slate-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={config.colors.secondary}
                                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                                            className="flex-1 h-10 px-3 rounded border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="accent">Couleur d&apos;accent</Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            id="accent"
                                            value={config.colors.accent}
                                            onChange={(e) => handleColorChange('accent', e.target.value)}
                                            className="h-10 w-20 rounded border border-slate-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={config.colors.accent}
                                            onChange={(e) => handleColorChange('accent', e.target.value)}
                                            className="flex-1 h-10 px-3 rounded border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="background">Fond</Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            id="background"
                                            value={config.colors.background}
                                            onChange={(e) => handleColorChange('background', e.target.value)}
                                            className="h-10 w-20 rounded border border-slate-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={config.colors.background}
                                            onChange={(e) => handleColorChange('background', e.target.value)}
                                            className="flex-1 h-10 px-3 rounded border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="fonts" className="space-y-4 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Police des titres</Label>
                                    <div className="text-sm text-gray-500">
                                        Actuellement : <span className="font-semibold">{config.fonts.heading}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Police du texte</Label>
                                    <div className="text-sm text-gray-500">
                                        Actuellement : <span className="font-semibold">{config.fonts.body}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">
                                    💡 Les polices sont automatiquement définies selon le template choisi
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} size="lg">
                    {isSaving ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sauvegarde...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Sauvegarder le design
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
