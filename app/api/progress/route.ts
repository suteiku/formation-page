import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST - Marquer une leçon comme terminée
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const { lessonId, completed } = await req.json()

        // Vérifier que l'utilisateur a accès à cette leçon
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                module: {
                    include: {
                        formation: {
                            include: {
                                purchases: {
                                    where: {
                                        student: { email: session.user.email },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!lesson || lesson.module.formation.purchases.length === 0) {
            return NextResponse.json(
                { error: 'Accès non autorisé' },
                { status: 403 }
            )
        }

        // Récupérer l'élève
        const student = await prisma.student.findUnique({
            where: { email: session.user.email },
        })

        if (!student) {
            return NextResponse.json(
                { error: 'Élève non trouvé' },
                { status: 404 }
            )
        }

        // Mettre à jour ou créer la progression
        const progress = await prisma.progress.upsert({
            where: {
                studentId_lessonId: {
                    studentId: student.id,
                    lessonId,
                },
            },
            update: {
                completed,
                completedAt: completed ? new Date() : null,
            },
            create: {
                studentId: student.id,
                lessonId,
                completed,
                completedAt: completed ? new Date() : null,
            },
        })

        return NextResponse.json({ progress })
    } catch (error) {
        console.error('Error updating progress:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour de la progression' },
            { status: 500 }
        )
    }
}

// GET - Récupérer la progression pour une formation
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(req.url)
        const formationId = searchParams.get('formationId')

        if (!formationId) {
            return NextResponse.json(
                { error: 'Formation ID requis' },
                { status: 400 }
            )
        }

        const student = await prisma.student.findUnique({
            where: { email: session.user.email },
        })

        if (!student) {
            return NextResponse.json({ progress: [] })
        }

        const progress = await prisma.progress.findMany({
            where: {
                studentId: student.id,
                lesson: {
                    module: {
                        formationId,
                    },
                },
            },
        })

        return NextResponse.json({ progress })
    } catch (error) {
        console.error('Error fetching progress:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la récupération de la progression' },
            { status: 500 }
        )
    }
}
