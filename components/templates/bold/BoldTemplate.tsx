'use client'

import { TemplateProps } from '@/types/templates'
import { CheckoutButton } from '@/components/shared/checkout-button'
import { Check, Zap, Trophy, Users, Star, Shield, Sparkles } from 'lucide-react'
import Image from 'next/image'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

export function BoldTemplate({ formation, config }: TemplateProps) {
    const colors = config?.colors || {
        primary: '#f59e0b',
        secondary: '#ef4444',
        accent: '#8b5cf6',
        background: '#0f172a',
        text: '#f8fafc',
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
            {/* Hero Section - Full Screen Gradient */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Gradient Background */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
                    }}
                />
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }} />

                <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                        <Sparkles className="h-4 w-4" />
                        <span className="font-semibold">Formation Premium</span>
                    </div>

                    <h1
                        className="text-6xl md:text-7xl font-black mb-6 leading-tight"
                        style={{
                            color: colors.text,
                            fontFamily: config?.fonts?.heading || 'Outfit',
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        {formation.title}
                    </h1>

                    <p className="text-2xl mb-12 max-w-3xl mx-auto" style={{ color: `${colors.text}cc` }}>
                        {formation.pitch}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: `${colors.primary}20` }}>
                            <Trophy className="h-5 w-5" style={{ color: colors.primary }} />
                            <span style={{ color: colors.text }}>{formation.modules.length} modules</span>
                        </div>
                        {formation.totalStudents > 0 && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: `${colors.secondary}20` }}>
                                <Users className="h-5 w-5" style={{ color: colors.secondary }} />
                                <span style={{ color: colors.text }}>{formation.totalStudents}+ élèves</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="text-6xl font-black" style={{ color: colors.primary }}>
                            {formatPrice(formation.price)}
                        </div>
                        <CheckoutButton
                            formationId={formation.id}
                            price={formation.price}
                            size="lg"
                            className="px-16 py-8 text-2xl font-bold shadow-2xl hover:scale-105 transition-transform"
                            style={{
                                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                            }}
                        >
                            Commencer maintenant →
                        </CheckoutButton>
                        <div className="flex items-center gap-4 text-sm" style={{ color: `${colors.text}99` }}>
                            <span>✓ Accès immédiat</span>
                            <span>✓ Garantie 30 jours</span>
                            <span>✓ Support premium</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section - Colorful Cards */}
            {benefits.length > 0 && (
                <section className="py-24 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-5xl font-black text-center mb-16"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Outfit',
                            }}
                        >
                            🚀 Ce que vous allez maîtriser
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl border-2 hover:scale-105 transition-transform"
                                    style={{
                                        backgroundColor: `${colors.primary}10`,
                                        borderColor: index % 2 === 0 ? colors.primary : colors.secondary,
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <Zap className="h-8 w-8 flex-shrink-0" style={{ color: index % 2 === 0 ? colors.primary : colors.secondary }} />
                                        <span className="text-lg font-medium" style={{ color: colors.text }}>
                                            {benefit}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Curriculum Section - Colorful Cards */}
            {formation.modules.length > 0 && (
                <section className="py-24 px-4" style={{ backgroundColor: `${colors.primary}05` }}>
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-5xl font-black text-center mb-16"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Outfit',
                            }}
                        >
                            📚 Programme complet
                        </h2>
                        <div className="space-y-6">
                            {formation.modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className="p-8 rounded-2xl border-2"
                                    style={{
                                        backgroundColor: colors.background,
                                        borderColor: [colors.primary, colors.secondary, colors.accent][index % 3],
                                    }}
                                >
                                    <div className="flex items-start gap-6">
                                        <div
                                            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
                                            style={{
                                                background: `linear-gradient(135deg, ${[colors.primary, colors.secondary, colors.accent][index % 3]} 0%, ${[colors.secondary, colors.accent, colors.primary][index % 3]} 100%)`,
                                                color: colors.background,
                                            }}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                                                {module.title}
                                            </h3>
                                            {module.description && (
                                                <p className="mb-4" style={{ color: `${colors.text}cc` }}>
                                                    {module.description}
                                                </p>
                                            )}
                                            <div className="text-sm font-semibold" style={{ color: [colors.primary, colors.secondary, colors.accent][index % 3] }}>
                                                {module.lessons.length} leçons
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section - Large Quotes */}
            {formation.testimonials.length > 0 && (
                <section className="py-24 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-5xl font-black text-center mb-16"
                            style={{
                                color: colors.text,
                                fontFamily: config?.fonts?.heading || 'Outfit',
                            }}
                        >
                            💬 Ils ont adoré
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {formation.testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="p-8 rounded-2xl"
                                    style={{
                                        backgroundColor: `${[colors.primary, colors.secondary, colors.accent][index % 3]}15`,
                                    }}
                                >
                                    <div className="flex items-center gap-1 mb-6" style={{ color: colors.accent }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-6 w-6 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-xl font-medium mb-6" style={{ color: colors.text }}>
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                    <p className="font-bold text-lg" style={{ color: [colors.primary, colors.secondary, colors.accent][index % 3] }}>
                                        — {testimonial.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing Section - Standout Box */}
            <section className="py-24 px-4">
                <div className="max-w-2xl mx-auto">
                    <div
                        className="p-12 rounded-3xl border-4 shadow-2xl"
                        style={{
                            background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%)`,
                            borderColor: colors.primary,
                        }}
                    >
                        <div className="text-center mb-8">
                            <div className="text-7xl font-black mb-4" style={{ color: colors.primary }}>
                                {formatPrice(formation.price)}
                            </div>
                            <p className="text-xl" style={{ color: colors.text }}>
                                Investissement unique · Accès à vie
                            </p>
                        </div>

                        <ul className="space-y-4 mb-10">
                            {[
                                'Accès illimité à vie',
                                `${formation.modules.length} modules complets`,
                                'Mises à jour gratuites',
                                'Support premium par email',
                                'Certificat de fin de formation',
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
                            className="w-full py-8 text-2xl font-black mb-6 shadow-xl hover:scale-105 transition-transform"
                            style={{
                                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                            }}
                        >
                            Je veux cette formation ! 🚀
                        </CheckoutButton>

                        <div className="flex items-center justify-center gap-2 text-sm" style={{ color: `${colors.text}99` }}>
                            <Shield className="h-5 w-5" />
                            Paiement 100% sécurisé · Garantie satisfait ou remboursé 30 jours
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t" style={{ borderColor: `${colors.text}20` }}>
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-sm" style={{ color: `${colors.text}66` }}>
                        Propulsé par{' '}
                        <span className="font-bold" style={{ color: colors.primary }}>
                            FormationPage
                        </span>
                    </p>
                </div>
            </footer>
        </div>
    )
}
