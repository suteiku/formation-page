import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft,
    ExternalLink,
    Settings,
    BookOpen,
    Eye,
    Users,
    Palette,
} from 'lucide-react'
import { PublishToggle } from '@/components/formations/PublishToggle'

interface Props {
    params: Promise<{ id: string }>
}

export default async function FormationDetailPage({ params }: Props) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect('/login')
    }

    const { id } = await params

    const formation = await prisma.formation.findUnique({
        where: { id },
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
            _count: {
                select: { purchases: true },
            },
        },
    })

    if (!formation || formation.creatorId !== session.user.id) {
        notFound()
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    const totalLessons = formation.modules.reduce(
        (acc: number, mod) => acc + mod.lessons.length,
        0
    )

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/formations">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {formation.title}
                            </h1>
                            <Badge variant={formation.published ? 'default' : 'secondary'}>
                                {formation.published ? 'Publié' : 'Brouillon'}
                            </Badge>
                        </div>
                        <p className="text-gray-600">{formation.pitch}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <PublishToggle
                        formationId={formation.id}
                        initialPublished={formation.published}
                    />
                    <Link href={`/dashboard/formations/${formation.id}/design`}>
                        <Button variant="outline">
                            <Palette className="h-4 w-4 mr-2" />
                            Design
                        </Button>
                    </Link>
                    <Link
                        href={`/${formation.creator.username}/${formation.slug}`}
                        target="_blank"
                    >
                        <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Voir la page
                            <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <Users className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Élèves</p>
                                <p className="text-2xl font-bold">{formation._count.purchases}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <BookOpen className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Modules</p>
                                <p className="text-2xl font-bold">{formation.modules.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Settings className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Leçons</p>
                                <p className="text-2xl font-bold">{totalLessons}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <span className="text-yellow-600 font-bold text-lg">€</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Prix</p>
                                <p className="text-2xl font-bold">{formatPrice(formation.price)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Content Management */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Contenu de la formation</CardTitle>
                    <Link href={`/dashboard/formations/${formation.id}/content`}>
                        <Button>
                            <Settings className="h-4 w-4 mr-2" />
                            Gérer le contenu
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    {formation.modules.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">
                                Aucun module dans cette formation
                            </p>
                            <Link href={`/dashboard/formations/${formation.id}/content`}>
                                <Button variant="outline">Ajouter du contenu</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {formation.modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className="p-4 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">
                                                Module {index + 1}: {module.title}
                                            </h3>
                                            {module.description && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {module.description}
                                                </p>
                                            )}
                                        </div>
                                        <Badge variant="secondary">
                                            {module.lessons.length} leçons
                                        </Badge>
                                    </div>

                                    {module.lessons.length > 0 && (
                                        <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-2">
                                            {module.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className="flex items-center gap-2 text-sm text-gray-600"
                                                >
                                                    <span>
                                                        {lesson.type === 'VIDEO' ? '📹' :
                                                            lesson.type === 'PDF' ? '📄' : '🔗'}
                                                    </span>
                                                    <span>{lesson.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
