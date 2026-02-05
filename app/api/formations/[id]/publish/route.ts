import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
        const { published } = await req.json()

        // Verify ownership
        const formation = await prisma.formation.findUnique({
            where: { id },
            select: { creatorId: true },
        })

        if (!formation) {
            return NextResponse.json(
                { error: 'Formation non trouvée' },
                { status: 404 }
            )
        }

        if (formation.creatorId !== session.user.id) {
            return NextResponse.json(
                { error: 'Non autorisé' },
                { status: 403 }
            )
        }

        // Update publication status
        const updatedFormation = await prisma.formation.update({
            where: { id },
            data: {
                published: Boolean(published),
                publishedAt: published ? new Date() : null,
            },
        })

        return NextResponse.json(updatedFormation)
    } catch (error) {
        console.error('Error updating publication status:', error)
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        )
    }
}
