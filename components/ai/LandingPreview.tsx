'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GeneratedLandingContent } from '@/lib/ai/prompts'
import { Eye, CheckCircle2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LandingPreviewProps {
    content: GeneratedLandingContent
    price: number
}

export function LandingPreview({ content, price }: LandingPreviewProps) {
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(value)
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Prévisualisation
                    </CardTitle>
                    <Badge variant="outline" className="font-mono">
                        Template: {content.recommendedTemplate}
                    </Badge>
                </div>
                <p className="text-sm text-gray-600">
                    Voici un aperçu du contenu généré par l&apos;IA
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Header Info */}
                <div className="space-y-4 pb-6 border-b">
                    <div>
                        <Label className="text-xs text-gray-500 uppercase">Titre</Label>
                        <h2 className="text-2xl font-bold mt-1">{content.title}</h2>
                    </div>
                    <div>
                        <Label className="text-xs text-gray-500 uppercase">Pitch</Label>
                        <p className="text-lg text-gray-700 mt-1">{content.pitch}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge className="text-lg px-4 py-2">{formatPrice(price)}</Badge>
                        <Badge variant="secondary">{content.targetAudience}</Badge>
                    </div>
                </div>

                {/* Tabs for detailed content */}
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="benefits">Bénéfices</TabsTrigger>
                        <TabsTrigger value="modules">Modules</TabsTrigger>
                        <TabsTrigger value="social">Social</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="space-y-4 pt-4">
                        <div className="prose prose-sm max-w-none">
                            {content.description.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="text-gray-700">{paragraph}</p>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="benefits" className="pt-4">
                        <div className="grid gap-3">
                            {content.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="text-2xl">{benefit.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="modules" className="pt-4">
                        <div className="space-y-3">
                            {content.modules.map((module, idx) => (
                                <div key={idx} className="p-4 border rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Badge variant="secondary" className="mt-1">Module {idx + 1}</Badge>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">{module.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="social" className="pt-4 space-y-6">
                        {/* Testimonials */}
                        <div>
                            <h4 className="font-semibold mb-3">Témoignages</h4>
                            <div className="space-y-3">
                                {content.testimonials.map((testimonial, idx) => (
                                    <div key={idx} className="p-3 bg-indigo-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="font-medium">{testimonial.name}</div>
                                            <div className="text-yellow-500">
                                                {'⭐'.repeat(testimonial.rating)}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700">{testimonial.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h4 className="font-semibold mb-3">FAQ ({content.faq.length} questions)</h4>
                            <div className="space-y-2">
                                {content.faq.slice(0, 3).map((item, idx) => (
                                    <div key={idx} className="p-3 border rounded-lg">
                                        <div className="font-medium text-sm">{item.question}</div>
                                        <div className="text-xs text-gray-600 mt-1">{item.answer.substring(0, 100)}...</div>
                                    </div>
                                ))}
                                {content.faq.length > 3 && (
                                    <p className="text-xs text-gray-500 text-center">
                                        + {content.faq.length - 3} autres questions
                                    </p>
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Color Palette */}
                <div className="pt-4 border-t">
                    <Label className="text-xs text-gray-500 uppercase mb-2 block">Palette de couleurs suggérée</Label>
                    <div className="flex gap-2">
                        <div className="flex-1 text-center">
                            <div
                                className="h-12 rounded border"
                                style={{ backgroundColor: content.colorPalette.primary }}
                            />
                            <p className="text-xs mt-1 font-mono">{content.colorPalette.primary}</p>
                            <p className="text-xs text-gray-500">Primary</p>
                        </div>
                        <div className="flex-1 text-center">
                            <div
                                className="h-12 rounded border"
                                style={{ backgroundColor: content.colorPalette.secondary }}
                            />
                            <p className="text-xs mt-1 font-mono">{content.colorPalette.secondary}</p>
                            <p className="text-xs text-gray-500">Secondary</p>
                        </div>
                        <div className="flex-1 text-center">
                            <div
                                className="h-12 rounded border"
                                style={{ backgroundColor: content.colorPalette.accent }}
                            />
                            <p className="text-xs mt-1 font-mono">{content.colorPalette.accent}</p>
                            <p className="text-xs text-gray-500">Accent</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>
}
