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
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const { id } = await params
        const { templateConfig } = await req.json()

        // Verify ownership
        const formation = await prisma.formation.findUnique({
            where: { id },
            select: { creatorId: true },
        })

        if (!formation || formation.creatorId !== session.user.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
        }

        // Update template config
        const updated = await prisma.formation.update({
            where: { id },
            data: { templateConfig },
        })

        return NextResponse.json({ formation: updated })
    } catch (error) {
        console.error('Error updating design:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
