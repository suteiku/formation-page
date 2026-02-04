import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { moduleSchema, lessonSchema } from '@/lib/validations/formation'

// POST - Créer un module ou une leçon
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const { type, formationId, moduleId, ...data } = body

        if (type === 'module') {
            // Vérifier que l'utilisateur est propriétaire de la formation
            const formation = await prisma.formation.findUnique({
                where: { id: formationId },
            })

            if (!formation || formation.creatorId !== session.user.id) {
                return NextResponse.json(
                    { error: 'Non autorisé' },
                    { status: 403 }
                )
            }

            const validatedData = moduleSchema.parse(data)

            const module = await prisma.module.create({
                data: {
                    ...validatedData,
                    formationId,
                },
            })

            return NextResponse.json({ module }, { status: 201 })
        } else if (type === 'lesson') {
            // Vérifier que l'utilisateur est propriétaire du module
            const module = await prisma.module.findUnique({
                where: { id: moduleId },
                include: { formation: true },
            })

            if (!module || module.formation.creatorId !== session.user.id) {
                return NextResponse.json(
                    { error: 'Non autorisé' },
                    { status: 403 }
                )
            }

            const validatedData = lessonSchema.parse(data)

            const lesson = await prisma.lesson.create({
                data: {
                    ...validatedData,
                    moduleId,
                },
            })

            return NextResponse.json({ lesson }, { status: 201 })
        }

        return NextResponse.json(
            { error: 'Type invalide' },
            { status: 400 }
        )
    } catch (error) {
        console.error('Error creating lesson/module:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la création' },
            { status: 500 }
        )
    }
}

// PATCH - Modifier un module ou une leçon
export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const { type, id, ...data } = body

        if (type === 'module') {
            const module = await prisma.module.findUnique({
                where: { id },
                include: { formation: true },
            })

            if (!module || module.formation.creatorId !== session.user.id) {
                return NextResponse.json(
                    { error: 'Non autorisé' },
                    { status: 403 }
                )
            }

            const validatedData = moduleSchema.partial().parse(data)

            const updatedModule = await prisma.module.update({
                where: { id },
                data: validatedData,
            })

            return NextResponse.json({ module: updatedModule })
        } else if (type === 'lesson') {
            const lesson = await prisma.lesson.findUnique({
                where: { id },
                include: { module: { include: { formation: true } } },
            })

            if (!lesson || lesson.module.formation.creatorId !== session.user.id) {
                return NextResponse.json(
                    { error: 'Non autorisé' },
                    { status: 403 }
                )
            }

            const validatedData = lessonSchema.partial().parse(data)

            const updatedLesson = await prisma.lesson.update({
                where: { id },
                data: validatedData,
            })

            return NextResponse.json({ lesson: updatedLesson })
        }

        return NextResponse.json(
            { error: 'Type invalide' },
            { status: 400 }
        )
    } catch (error) {
        console.error('Error updating lesson/module:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un module ou une leçon
export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(req.url)
        const type = searchParams.get('type')
        const id = searchParams.get('id')

        if (!type || !id) {
            return NextResponse.json(
                { error: 'Type et ID requis' },
                { status: 400 }
            )
        }

        if (type === 'module') {
            const module = await prisma.module.findUnique({
                where: { id },
                include: { formation: true },
            })

            if (!module || module.formation.creatorId !== session.user.id) {
                return NextResponse.json(
                    { error: 'Non autorisé' },
                    { status: 403 }
                )
            }

            await prisma.module.delete({ where: { id } })
        } else if (type === 'lesson') {
            const lesson = await prisma.lesson.findUnique({
                where: { id },
                include: { module: { include: { formation: true } } },
            })

            if (!lesson || lesson.module.formation.creatorId !== session.user.id) {
                return NextResponse.json(
                    { error: 'Non autorisé' },
                    { status: 403 }
                )
            }

            await prisma.lesson.delete({ where: { id } })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting lesson/module:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la suppression' },
            { status: 500 }
        )
    }
}
