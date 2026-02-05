'use client'

import { TemplateProps } from '@/types/templates'
import { CheckoutButton } from '@/components/shared/checkout-button'
import { Check, Crown, Award, Shield, Star, Gem } from 'lucide-react'
import Image from 'next/image'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

export function PremiumTemplate({ formation, config }: TemplateProps) {
    const colors = config?.colors || {
        primary: '#d4af37',
        secondary: '#1f2937',
        accent: '#d4af37',
        background: '#0a0a0a',
        text: '#f9fafb',
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
        <div className="min-h-screen" style={{ backgroundColor: colors.background, fontFamily: config?.fonts?.body || 'Inter' }}>
            {/* Hero Section - Video/Image Background */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

                {/* Background Image */}
                {formation.coverImage && (
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src={formation.coverImage}
                            alt={formation.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 border" style={{ borderColor: colors.primary, backgroundColor: `${colors.primary}10` }}>
                        <Crown className="h-5 w-5" style={{ color: colors.primary }} />
                        <span className="font-semibold tracking-wide" style={{ color: colors.primary }}>
                            FORMATION PREMIUM
                        </span>
                    </div>

                    <h1
                        className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
                        style={{
                            color: colors.text,
                            fontFamily: config?.fonts?.heading || 'Playfair Display',
                        }}
                    >
                        {formation.title}
                    </h1>

                    <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: `${colors.text}dd` }}>
                        {formation.pitch}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
                        <div className="flex items-center gap-3">
                            <Award className="h-6 w-6" style={{ color: colors.primary }} />
                            <span className="text-lg" style={{ color: colors.text }}>
                                {formation.modules.length} Modules d'excellence
                            </span>
                        </div>
                        {formation.totalStudents > 0 && (
                            <div className="flex items-center gap-3">
                                <Gem className="h-6 w-6" style={{ color: colors.primary }} />
                                <span className="text-lg" style={{ color: colors.text }}>
                                    {formation.totalStudents}+ Élèves d'élite
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <div>
                            <div className="text-sm tracking-widest mb-2" style={{ color: `${colors.primary}cc` }}>
                                INVESTISSEMENT
                            </div>
                            <div className="text-6xl font-bold" style={{ color: colors.primary }}>
                                {formatPrice(formation.price)}
                            </div>
                        </div>
                        <CheckoutButton
                            formationId={formation.id}
                            price={formation.price}
                            size="lg"
                            className="px-16 py-7 text-xl font-semibold tracking-wide border-2 hover:scale-105 transition-all"
                            style={{
                                backgroundColor: colors.primary,
                                borderColor: colors.primary,
                                color: colors.background,
                            }}
                        >
                            Rejoindre l'élite
                        </CheckoutButton>
                        <div className="flex items-center gap-6 text-sm tracking-wide" style={{ color: `${colors.text}99` }}>
                            <span>✓ Accès exclusif à vie</span>
                            <span>✓ Support VIP</span>
                            <span>✓ Garantie premium</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section - Minimal Icons */}
            {benefits.length > 0 && (
                <section className="py-32 px-4 border-t" style={{ borderColor: `${colors.text}10` }}>
                    <div className="max-w-5xl mx-auto">
                        <h2
                            className="text-5xl font-bold text-center mb-20"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Playfair Display',
                            }}
                        >
                            L'excellence à votre portée
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-6 p-6 border rounded-lg hover:border-opacity-50 transition-all" style={{ borderColor: `${colors.primary}30` }}>
                                    <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: colors.primary }} />
                                    <span className="text-lg leading-relaxed" style={{ color: `${colors.text}dd` }}>
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Curriculum Section - Elegant Accordion */}
            {formation.modules.length > 0 && (
                <section className="py-32 px-4 border-t" style={{ borderColor: `${colors.text}10` }}>
                    <div className="max-w-5xl mx-auto">
                        <h2
                            className="text-5xl font-bold text-center mb-20"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Playfair Display',
                            }}
                        >
                            Programme d'excellence
                        </h2>
                        <Accordion type="single" collapsible className="space-y-6">
                            {formation.modules.map((module, index) => (
                                <AccordionItem
                                    key={module.id}
                                    value={module.id}
                                    className="border rounded-lg px-8 py-2"
                                    style={{ borderColor: `${colors.primary}30` }}
                                >
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="flex items-center gap-6 text-left w-full">
                                            <div
                                                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold border"
                                                style={{ borderColor: colors.primary, color: colors.primary }}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                                                    {module.title}
                                                </h3>
                                                <p className="text-sm mt-1" style={{ color: `${colors.text}66` }}>
                                                    {module.lessons.length} leçons exclusives
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4 pb-6">
                                        {module.description && (
                                            <p className="mb-6 leading-relaxed" style={{ color: `${colors.text}cc` }}>
                                                {module.description}
                                            </p>
                                        )}
                                        <ul className="space-y-3">
                                            {module.lessons.map((lesson) => (
                                                <li key={lesson.id} className="flex items-center gap-3" style={{ color: `${colors.text}99` }}>
                                                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary }} />
                                                    <span>{lesson.title}</span>
                                                    {lesson.duration && (
                                                        <span className="text-sm" style={{ color: `${colors.text}66` }}>
                                                            · {Math.floor(lesson.duration / 60)} min
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

            {/* Testimonials Section - Refined */}
            {formation.testimonials.length > 0 && (
                <section className="py-32 px-4 border-t" style={{ borderColor: `${colors.text}10` }}>
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-5xl font-bold text-center mb-20"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Playfair Display',
                            }}
                        >
                            Témoignages d'excellence
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {formation.testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="p-8 border rounded-lg"
                                    style={{ borderColor: `${colors.primary}30` }}
                                >
                                    <div className="flex items-center gap-1 mb-6" style={{ color: colors.primary }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-lg leading-relaxed mb-6 italic" style={{ color: `${colors.text}dd` }}>
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                    <p className="font-semibold tracking-wide" style={{ color: colors.primary }}>
                                        {testimonial.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing Section - Premium Card */}
            <section className="py-32 px-4">
                <div className="max-w-2xl mx-auto">
                    <div
                        className="p-12 border-2 rounded-2xl"
                        style={{
                            borderColor: colors.primary,
                            background: `linear-gradient(135deg, ${colors.primary}05 0%, transparent 100%)`,
                        }}
                    >
                        <div className="text-center mb-12">
                            <div className="text-sm tracking-widest mb-4" style={{ color: colors.primary }}>
                                INVESTISSEMENT UNIQUE
                            </div>
                            <div className="text-6xl font-bold mb-6" style={{ color: colors.primary }}>
                                {formatPrice(formation.price)}
                            </div>
                            <p className="text-lg" style={{ color: `${colors.text}cc` }}>
                                Accès exclusif et illimité à vie
                            </p>
                        </div>

                        <ul className="space-y-5 mb-12">
                            {[
                                'Accès VIP à vie à tout le contenu',
                                `${formation.modules.length} modules d'excellence`,
                                'Mises à jour premium gratuites',
                                'Support prioritaire par email',
                                'Certificat premium de fin de formation',
                                'Accès à la communauté privée',
                            ].map((feature, index) => (
                                <li key={index} className="flex items-center gap-4 text-lg">
                                    <Check className="h-6 w-6" style={{ color: colors.primary }} />
                                    <span style={{ color: colors.text }}>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <CheckoutButton
                            formationId={formation.id}
                            price={formation.price}
                            size="lg"
                            className="w-full py-7 text-xl font-semibold tracking-wide border-2 mb-6 hover:scale-105 transition-all"
                            style={{
                                backgroundColor: colors.primary,
                                borderColor: colors.primary,
                                color: colors.background,
                            }}
                        >
                            Rejoindre l'élite maintenant
                        </CheckoutButton>

                        <div className="flex items-center justify-center gap-3 text-sm" style={{ color: `${colors.text}66` }}>
                            <Shield className="h-5 w-5" />
                            <span>Paiement sécurisé · Garantie satisfait ou remboursé 30 jours</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-4 border-t" style={{ borderColor: `${colors.text}10` }}>
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm tracking-wide" style={{ color: `${colors.text}66` }}>
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
