import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    CheckCircle2,
    Star,
    Lock,
    BookOpen,
    Users,
    Clock,
    Shield,
} from 'lucide-react'

interface Props {
    params: Promise<{ username: string; slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const { username, slug } = await params

    const formation = await prisma.formation.findFirst({
        where: {
            slug,
            creator: { username },
            published: true,
        },
        include: { creator: true },
    })

    if (!formation) {
        return { title: 'Formation non trouvée' }
    }

    return {
        title: `${formation.title} | ${formation.creator.name}`,
        description: formation.pitch,
        openGraph: {
            title: formation.title,
            description: formation.pitch,
            images: [formation.coverImage],
        },
    }
}

export default async function SalesPage({ params }: Props) {
    const { username, slug } = await params

    const formation = await prisma.formation.findFirst({
        where: {
            slug,
            creator: { username },
        },
        include: {
            creator: true,
            modules: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' },
                    },
                },
            },
            testimonials: true,
            _count: {
                select: { purchases: true },
            },
        },
    })

    if (!formation) {
        notFound()
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const totalLessons = formation.modules.reduce(
        (acc, mod) => acc + mod.lessons.length,
        0
    )

    const primaryColor = formation.primaryColor || '#6366f1'

    // Parse description into bullet points
    const benefits = formation.description
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundColor: primaryColor }}
                />
                <div className="container relative">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <Badge
                                className="mb-4"
                                style={{ backgroundColor: primaryColor, color: 'white' }}
                            >
                                Formation en ligne
                            </Badge>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                {formation.title}
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">{formation.pitch}</p>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        <span className="font-semibold text-gray-700">
                                            {formation.creator.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {formation.creator.name}
                                        </p>
                                        <p className="text-sm text-gray-500">Formateur</p>
                                    </div>
                                </div>
                                {formation._count.purchases > 0 && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users className="h-5 w-5" />
                                        <span>{formation._count.purchases} élèves</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="text-lg px-8 py-6"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Acheter maintenant - {formatPrice(formation.price)}
                                </Button>
                                <p className="text-sm text-gray-500 self-center">
                                    Accès immédiat et à vie
                                </p>
                            </div>
                        </div>

                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                            {formation.coverImage ? (
                                <Image
                                    src={formation.coverImage}
                                    alt={formation.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <BookOpen className="h-16 w-16 text-white/80" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Ce que vous allez apprendre
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                                <CheckCircle2
                                    className="h-6 w-6 flex-shrink-0 mt-0.5"
                                    style={{ color: primaryColor }}
                                />
                                <span className="text-gray-700">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Audience */}
            {formation.targetAudience && (
                <section className="py-16">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            À qui s&apos;adresse cette formation ?
                        </h2>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <p className="text-gray-700 text-lg">{formation.targetAudience}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Program Section */}
            <section className="py-16 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Programme détaillé
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {formation.modules.map((module, index) => (
                            <div
                                key={module.id}
                                className="p-6 bg-white rounded-xl shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${primaryColor}20` }}
                                    >
                                        <BookOpen className="h-5 w-5" style={{ color: primaryColor }} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Module {index + 1} : {module.title}
                                        </h3>
                                        {module.description && (
                                            <p className="text-gray-600 mt-1">{module.description}</p>
                                        )}
                                        {module.lessons.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {module.lessons.map((lesson) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center gap-2 text-sm text-gray-500"
                                                    >
                                                        <Lock className="h-4 w-4" />
                                                        <span>{lesson.title}</span>
                                                        {lesson.duration && (
                                                            <span className="text-gray-400">
                                                                ({Math.floor(lesson.duration / 60)} min)
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {formation.testimonials.length > 0 && (
                <section className="py-16">
                    <div className="container">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Ce qu&apos;en disent nos élèves
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                            {formation.testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="p-6 bg-gray-50 rounded-xl"
                                >
                                    <div className="flex items-center gap-1 mb-4" style={{ color: '#fbbf24' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-4">&quot;{testimonial.content}&quot;</p>
                                    <p className="font-medium text-gray-900">- {testimonial.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="py-20" style={{ backgroundColor: primaryColor }}>
                <div className="container text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à commencer ?
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        Rejoignez les {formation._count.purchases || ''} élèves qui ont déjà
                        transformé leur vie avec cette formation.
                    </p>

                    <div className="inline-block bg-white rounded-2xl p-8 text-gray-900">
                        <div className="text-4xl font-bold mb-4">
                            {formatPrice(formation.price)}
                        </div>
                        <ul className="text-left space-y-2 mb-6">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" style={{ color: primaryColor }} />
                                Accès à vie
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" style={{ color: primaryColor }} />
                                {formation.modules.length} modules complets
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" style={{ color: primaryColor }} />
                                Mises à jour gratuites
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" style={{ color: primaryColor }} />
                                Support inclus
                            </li>
                        </ul>
                        <Button
                            size="lg"
                            className="w-full text-lg py-6"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Acheter maintenant
                        </Button>
                        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                            <Shield className="h-4 w-4" />
                            Paiement 100% sécurisé · Garantie 30 jours
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t">
                <div className="container text-center">
                    <p className="text-sm text-gray-500">
                        Propulsé par{' '}
                        <a href="/" className="text-indigo-600 hover:underline">
                            FormationPage
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    )
}
