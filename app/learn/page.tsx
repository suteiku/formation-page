import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { BookOpen, GraduationCap, PlayCircle } from 'lucide-react'
import Image from 'next/image'

export default async function MyLearningPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        redirect('/login?redirect=/learn')
    }

    // Find student by email
    const student = await prisma.student.findUnique({
        where: { email: session.user.email },
        include: {
            purchases: {
                include: {
                    formation: {
                        include: {
                            creator: true,
                            modules: {
                                include: {
                                    lessons: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    })

    if (!student) {
        redirect('/')
    }

    // Calculate progress for each formation
    const formationsWithProgress = await Promise.all(
        student.purchases.map(async (purchase) => {
            const totalLessons = purchase.formation.modules.reduce(
                (acc, mod) => acc + mod.lessons.length,
                0
            )

            const completedLessons = await prisma.progress.count({
                where: {
                    studentId: student.id,
                    lesson: {
                        module: {
                            formationId: purchase.formation.id,
                        },
                    },
                },
            })

            const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

            return {
                ...purchase,
                totalLessons,
                completedLessons,
                progressPercent,
            }
        })
    )

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <GraduationCap className="h-8 w-8 text-indigo-600" />
                                Mes formations
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {formationsWithProgress.length}{' '}
                                {formationsWithProgress.length > 1 ? 'formations' : 'formation'}
                            </p>
                        </div>
                        <Link href="/">
                            <Button variant="outline">Découvrir d'autres formations</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Formations List */}
            <div className="container mx-auto px-4 py-8">
                {formationsWithProgress.length === 0 ? (
                    <Card className="text-center py-16">
                        <CardContent>
                            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Aucune formation
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Vous n&apos;avez pas encore de formations. Explorez notre catalogue
                                pour commencer.
                            </p>
                            <Link href="/">
                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    Découvrir les formations
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {formationsWithProgress.map((item) => (
                            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative aspect-video">
                                    {item.formation.coverImage ? (
                                        <Image
                                            src={item.formation.coverImage}
                                            alt={item.formation.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                            <BookOpen className="h-12 w-12 text-white/80" />
                                        </div>
                                    )}
                                    {item.progressPercent === 100 && (
                                        <Badge className="absolute top-2 right-2 bg-green-600">
                                            Terminé
                                        </Badge>
                                    )}
                                </div>

                                <CardHeader>
                                    <h3 className="font-semibold text-lg line-clamp-2">
                                        {item.formation.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Par {item.formation.creator.name}
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-gray-600">Progression</span>
                                                <span className="font-medium text-indigo-600">
                                                    {Math.round(item.progressPercent)}%
                                                </span>
                                            </div>
                                            <Progress value={item.progressPercent} className="h-2" />
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>
                                                {item.completedLessons} / {item.totalLessons} leçons
                                            </span>
                                            <span>{item.formation.modules.length} modules</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Link href={`/learn/${item.formation.id}`} className="w-full">
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                            <PlayCircle className="h-4 w-4 mr-2" />
                                            {item.progressPercent > 0 ? 'Continuer' : 'Commencer'}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
