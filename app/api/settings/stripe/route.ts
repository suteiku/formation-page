import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const { publishable, secret, connectClientId } = await req.json()

        // Update user avec les clés Stripe
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                stripePublishableKey: publishable,
                stripeSecretKey: secret,
                stripeConnectClientId: connectClientId,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Settings error:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
