import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface Props {
    params: Promise<{ id: string }>
}

// POST - Mark lesson as complete
export async function POST(req: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id: lessonId } = await params

        // Find student by email
        const student = await prisma.student.findUnique({
            where: { email: session.user.email },
        })

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 })
        }

        // Verify lesson exists and student has access
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                module: {
                    include: { formation: true }
                }
            },
        })

        if (!lesson) {
            return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
        }

        // Check if student purchased this formation
        const purchase = await prisma.purchase.findFirst({
            where: {
                studentId: student.id,
                formationId: lesson.module.formationId,
            },
        })

        if (!purchase) {
            return NextResponse.json({ error: 'Access denied' }, { status: 403 })
        }

        // Create or update progress
        const progress = await prisma.progress.upsert({
            where: {
                studentId_lessonId: {
                    studentId: student.id,
                    lessonId,
                },
            },
            update: {
                completed: true,
                completedAt: new Date(),
            },
            create: {
                studentId: student.id,
                lessonId,
                completed: true,
                completedAt: new Date(),
            },
        })

        return NextResponse.json(progress)
    } catch (error) {
        console.error('Error marking lesson complete:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
