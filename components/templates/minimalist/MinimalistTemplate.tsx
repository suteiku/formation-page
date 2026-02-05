'use client'

import { TemplateProps } from '@/types/templates'
import { Button } from '@/components/ui/button'
import { CheckoutButton } from '@/components/shared/checkout-button'
import { Check, BookOpen, Star, Shield } from 'lucide-react'
import Image from 'next/image'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

export function MinimalistTemplate({ formation, config }: TemplateProps) {
    const colors = config?.colors || {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#ffffff',
        text: '#1f2937',
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    const benefits = formation.description
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: config?.fonts?.body || 'Inter' }}>
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Cover Image */}
                    {formation.coverImage && (
                        <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden">
                            <Image
                                src={formation.coverImage}
                                alt={formation.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <h1
                        className="text-5xl font-bold mb-6"
                        style={{
                            color: colors.text,
                            fontFamily: config?.fonts?.heading || 'Inter',
                        }}
                    >
                        {formation.title}
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        {formation.pitch}
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex items-center gap-2 text-gray-600">
                            <BookOpen className="h-5 w-5" />
                            <span>{formation.modules.length} modules</span>
                        </div>
                        {formation.totalStudents > 0 && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <Star className="h-5 w-5" />
                                <span>{formation.totalStudents} élèves</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="text-4xl font-bold" style={{ color: colors.primary }}>
                            {formatPrice(formation.price)}
                        </div>
                        <CheckoutButton
                            formationId={formation.id}
                            price={formation.price}
                            size="lg"
                            className="px-12 py-6 text-lg"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Acheter maintenant
                        </CheckoutButton>
                        <p className="text-sm text-gray-500">
                            ✓ Accès à vie · ✓ Support inclus · ✓ Garantie 30 jours
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            {benefits.length > 0 && (
                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className="text-3xl font-bold text-center mb-12"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Inter',
                            }}
                        >
                            Ce que vous allez apprendre
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                                    <Check className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: colors.primary }} />
                                    <span className="text-gray-700">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Curriculum Section */}
            {formation.modules.length > 0 && (
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className="text-3xl font-bold text-center mb-12"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Inter',
                            }}
                        >
                            Programme détaillé
                        </h2>
                        <Accordion type="single" collapsible className="space-y-4">
                            {formation.modules.map((module, index) => (
                                <AccordionItem
                                    key={module.id}
                                    value={module.id}
                                    className="border rounded-lg px-6 bg-white"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-4 text-left">
                                            <span
                                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
                                                style={{ backgroundColor: colors.primary }}
                                            >
                                                {index + 1}
                                            </span>
                                            <div className="flex-1">
                                                <h3 className="font-semibold" style={{ color: colors.text }}>
                                                    {module.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {module.lessons.length} {module.lessons.length > 1 ? 'leçons' : 'leçon'}
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {module.description && (
                                            <p className="text-gray-600 mb-4">{module.description}</p>
                                        )}
                                        <ul className="space-y-2">
                                            {module.lessons.map((lesson) => (
                                                <li key={lesson.id} className="flex items-center gap-2 text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                                                    <span>{lesson.title}</span>
                                                    {lesson.duration && (
                                                        <span className="text-gray-400 text-sm">
                                                            ({Math.floor(lesson.duration / 60)} min)
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {formation.testimonials.length > 0 && (
                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-3xl font-bold text-center mb-12"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Inter',
                            }}
                        >
                            Ce qu&apos;en disent nos élèves
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {formation.testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="p-6 bg-white rounded-lg">
                                    <div className="flex items-center gap-1 mb-4" style={{ color: colors.accent }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-4">&quot;{testimonial.content}&quot;</p>
                                    <p className="font-medium" style={{ color: colors.text }}>
                                        — {testimonial.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing Section */}
            <section className="py-20 px-4">
                <div className="max-w-md mx-auto text-center">
                    <div className="p-8 border-2 rounded-2xl bg-white" style={{ borderColor: colors.primary }}>
                        <div className="text-5xl font-bold mb-6" style={{ color: colors.primary }}>
                            {formatPrice(formation.price)}
                        </div>
                        <ul className="space-y-3 mb-8 text-left">
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5" style={{ color: colors.primary }} />
                                <span className="text-gray-700">Accès illimité à vie</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5" style={{ color: colors.primary }} />
                                <span className="text-gray-700">{formation.modules.length} modules complets</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5" style={{ color: colors.primary }} />
                                <span className="text-gray-700">Mises à jour gratuites</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-5 w-5" style={{ color: colors.primary }} />
                                <span className="text-gray-700">Support par email</span>
                            </li>
                        </ul>
                        <CheckoutButton
                            formationId={formation.id}
                            price={formation.price}
                            size="lg"
                            className="w-full py-6 text-lg mb-4"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Acheter maintenant
                        </CheckoutButton>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Shield className="h-4 w-4" />
                            Paiement 100% sécurisé · Garantie 30 jours
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm text-gray-500">
                        Propulsé par{' '}
                        <span className="font-semibold" style={{ color: colors.primary }}>
                            FormationPage
                        </span>
                    </p>
                </div>
            </footer>
        </div>
    )
}
