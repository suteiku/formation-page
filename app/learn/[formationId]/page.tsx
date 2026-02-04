import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    GraduationCap,
    BookOpen,
    CheckCircle2,
    Circle,
    PlayCircle,
    FileText,
    ExternalLink,
} from 'lucide-react'

interface Props {
    params: Promise<{ formationId: string }>
}

export default async function LearnPage({ params }: Props) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        redirect('/login?redirect=/learn')
    }

    const { formationId } = await params

    // Find student by email
    const student = await prisma.student.findUnique({
        where: { email: session.user.email },
    })

    if (!student) {
        redirect('/')
    }

    // Check if student has purchased this formation
    const purchase = await prisma.purchase.findFirst({
        where: {
            studentId: student.id,
            formationId,
        },
    })

    if (!purchase) {
        redirect('/')
    }

    // Get formation with progress
    const formation = await prisma.formation.findUnique({
        where: { id: formationId },
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
        },
    })

    if (!formation) {
        notFound()
    }

    // Get student progress
    const progressRecords = await prisma.progress.findMany({
        where: {
            studentId: student.id,
            lesson: {
                module: { formationId },
            },
        },
        select: { lessonId: true },
    })

    const completedLessonIds = new Set(progressRecords.map((p) => p.lessonId))

    const totalLessons = formation.modules.reduce(
        (acc, mod) => acc + mod.lessons.length,
        0
    )
    const completedLessons = completedLessonIds.size
    const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    // Find the first uncompleted lesson
    let currentLesson = null
    for (const module of formation.modules) {
        for (const lesson of module.lessons) {
            if (!completedLessonIds.has(lesson.id)) {
                currentLesson = lesson
                break
            }
        }
        if (currentLesson) break
    }

    // If all lessons completed, show the last one
    if (!currentLesson && formation.modules.length > 0) {
        const lastModule = formation.modules[formation.modules.length - 1]
        if (lastModule.lessons.length > 0) {
            currentLesson = lastModule.lessons[lastModule.lessons.length - 1]
        }
    }

    const getLessonIcon = (type: string) => {
        switch (type) {
            case 'VIDEO':
                return <PlayCircle className="h-4 w-4" />
            case 'PDF':
                return <FileText className="h-4 w-4" />
            case 'LINK':
                return <ExternalLink className="h-4 w-4" />
            default:
                return <Circle className="h-4 w-4" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b">
                <div className="container flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <GraduationCap className="h-6 w-6 text-indigo-600" />
                            <span className="font-bold text-indigo-600">FormationPage</span>
                        </Link>
                        <span className="text-gray-300">/</span>
                        <h1 className="font-medium text-gray-900 truncate max-w-xs">
                            {formation.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm text-gray-500">Progression</p>
                            <p className="text-sm font-medium">
                                {completedLessons}/{totalLessons} leçons
                            </p>
                        </div>
                        <div className="w-24">
                            <Progress value={progressPercent} className="h-2" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden lg:block w-80 border-r bg-white h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
                    <div className="p-4">
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-1">Formateur</p>
                            <p className="font-medium">{formation.creator.name}</p>
                        </div>

                        <div className="space-y-4">
                            {formation.modules.map((module, moduleIndex) => (
                                <div key={module.id}>
                                    <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-indigo-600" />
                                        <span className="truncate">
                                            Module {moduleIndex + 1}: {module.title}
                                        </span>
                                    </h3>
                                    <div className="ml-6 space-y-1">
                                        {module.lessons.map((lesson) => {
                                            const isCompleted = completedLessonIds.has(lesson.id)
                                            const isCurrent = currentLesson?.id === lesson.id
                                            return (
                                                <Link
                                                    key={lesson.id}
                                                    href={`/learn/${formationId}/${lesson.id}`}
                                                    className={`
                            flex items-center gap-2 p-2 rounded-lg text-sm transition-colors
                            ${isCurrent
                                                            ? 'bg-indigo-50 text-indigo-600'
                                                            : isCompleted
                                                                ? 'text-gray-500 hover:bg-gray-50'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                        }
                          `}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    ) : (
                                                        getLessonIcon(lesson.type)
                                                    )}
                                                    <span className="truncate">{lesson.title}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {currentLesson ? (
                        <div className="max-w-4xl mx-auto">
                            <Badge variant="secondary" className="mb-4">
                                {currentLesson.type === 'VIDEO' ? 'Vidéo' :
                                    currentLesson.type === 'PDF' ? 'Document PDF' : 'Lien externe'}
                            </Badge>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {currentLesson.title}
                            </h2>

                            {currentLesson.type === 'VIDEO' && currentLesson.content && (
                                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                                    <video
                                        className="w-full h-full"
                                        controls
                                        controlsList="nodownload"
                                        onContextMenu={(e) => e.preventDefault()}
                                    >
                                        <source src={currentLesson.content} type="video/mp4" />
                                        Votre navigateur ne supporte pas la lecture vidéo.
                                    </video>
                                </div>
                            )}

                            {currentLesson.type === 'PDF' && currentLesson.content && (
                                <div className="mb-6">
                                    <Link href={currentLesson.content} target="_blank">
                                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Télécharger le PDF
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {currentLesson.type === 'LINK' && currentLesson.content && (
                                <div className="mb-6">
                                    <Link href={currentLesson.content} target="_blank">
                                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Accéder au lien
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {currentLesson.description && (
                                <div className="prose max-w-none">
                                    <p className="text-gray-700">{currentLesson.description}</p>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t">
                                <form action={`/api/progress`} method="POST">
                                    <input type="hidden" name="lessonId" value={currentLesson.id} />
                                    <input type="hidden" name="formationId" value={formation.id} />
                                    <Button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700"
                                        disabled={completedLessonIds.has(currentLesson.id)}
                                    >
                                        {completedLessonIds.has(currentLesson.id) ? (
                                            <>
                                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                                Leçon terminée
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                                Marquer comme terminée
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
                                <BookOpen className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Bienvenue dans votre formation !
                            </h2>
                            <p className="text-gray-600">
                                Sélectionnez une leçon dans le menu pour commencer
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
