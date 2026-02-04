import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formationSchema } from '@/lib/validations/formation'

// GET - Récupérer une formation spécifique
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const formation = await prisma.formation.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },
                },
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
                    select: {
                        purchases: true,
                    },
                },
            },
        })

        if (!formation) {
            return NextResponse.json(
                { error: 'Formation non trouvée' },
                { status: 404 }
            )
        }

        return NextResponse.json({ formation })
    } catch (error) {
        console.error('Error fetching formation:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la récupération de la formation' },
            { status: 500 }
        )
    }
}

// PATCH - Modifier une formation
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const { id } = await params
        const body = await req.json()

        // Vérifier que l'utilisateur est propriétaire
        const existingFormation = await prisma.formation.findUnique({
            where: { id },
        })

        if (!existingFormation) {
            return NextResponse.json(
                { error: 'Formation non trouvée' },
                { status: 404 }
            )
        }

        if (existingFormation.creatorId !== session.user.id) {
            return NextResponse.json(
                { error: 'Non autorisé' },
                { status: 403 }
            )
        }

        // Valider partiellement les données
        const validatedData = formationSchema.partial().parse(body)

        const formation = await prisma.formation.update({
            where: { id },
            data: validatedData,
        })

        return NextResponse.json({ formation })
    } catch (error) {
        console.error('Error updating formation:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour de la formation' },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer une formation
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const { id } = await params

        // Vérifier que l'utilisateur est propriétaire
        const existingFormation = await prisma.formation.findUnique({
            where: { id },
        })

        if (!existingFormation) {
            return NextResponse.json(
                { error: 'Formation non trouvée' },
                { status: 404 }
            )
        }

        if (existingFormation.creatorId !== session.user.id) {
            return NextResponse.json(
                { error: 'Non autorisé' },
                { status: 403 }
            )
        }

        await prisma.formation.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting formation:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la suppression de la formation' },
            { status: 500 }
        )
    }
}
