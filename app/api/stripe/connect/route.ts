import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createConnectAccount, createAccountLink } from '@/lib/stripe'

// POST - Créer ou obtenir le lien d'onboarding Stripe Connect
export async function POST() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: 404 }
            )
        }

        let accountId = user.stripeAccountId

        // Créer un nouveau compte Connect si nécessaire
        if (!accountId) {
            const account = await createConnectAccount(user.id, user.email)
            accountId = account.id
        }

        // Générer le lien d'onboarding
        const accountLinkUrl = await createAccountLink(accountId)

        return NextResponse.json({ url: accountLinkUrl })
    } catch (error) {
        console.error('Stripe Connect error:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la configuration Stripe' },
            { status: 500 }
        )
    }
}

// GET - Vérifier le statut du compte Connect
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                stripeAccountId: true,
                stripeOnboarded: true,
            },
        })

        return NextResponse.json({
            connected: !!user?.stripeAccountId,
            onboarded: user?.stripeOnboarded || false,
        })
    } catch (error) {
        console.error('Error checking Stripe status:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la vérification' },
            { status: 500 }
        )
    }
}
