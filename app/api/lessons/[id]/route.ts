import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateLessonSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    type: z.enum(['VIDEO', 'PDF', 'LINK', 'TEXT']).optional(),
    videoId: z.string().optional(),
    videoUrl: z.string().optional(),
    videoThumbnail: z.string().optional(),
    duration: z.number().optional(),
    pdfUrl: z.string().optional(),
    pdfKey: z.string().optional(),
    linkUrl: z.string().optional(),
    content: z.string().optional(),
    order: z.number().optional(),
})

interface Props {
    params: Promise<{ id: string }>
}

// GET - Get lesson details
export async function GET(req: NextRequest, { params }: Props) {
    try {
        const { id } = await params

        const lesson = await prisma.lesson.findUnique({
            where: { id },
            include: {
                module: {
                    include: { formation: true }
                }
            },
        })

        if (!lesson) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json(lesson)
    } catch (error) {
        console.error('Error getting lesson:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}

// PATCH - Update lesson
export async function PATCH(req: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params
        const body = await req.json()
        const validatedData = updateLessonSchema.parse(body)

        // Verify lesson ownership through module -> formation
        const lesson = await prisma.lesson.findFirst({
            where: { id },
            include: {
                module: {
                    include: { formation: true }
                }
            },
        })

        if (!lesson || lesson.module.formation.creatorId !== session.user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        const updatedLesson = await prisma.lesson.update({
            where: { id },
            data: validatedData,
        })

        return NextResponse.json(updatedLesson)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error('Error updating lesson:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}

// DELETE - Delete lesson
export async function DELETE(req: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params

        // Verify lesson ownership through module -> formation
        const lesson = await prisma.lesson.findFirst({
            where: { id },
            include: {
                module: {
                    include: { formation: true }
                }
            },
        })

        if (!lesson || lesson.module.formation.creatorId !== session.user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        await prisma.lesson.delete({ where: { id } })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting lesson:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
