import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { formationId, customerEmail } = await req.json()

        const formation = await prisma.formation.findUnique({
            where: { id: formationId },
            include: { creator: true },
        })

        if (!formation) {
            return NextResponse.json(
                { error: 'Formation non trouvée' },
                { status: 404 }
            )
        }

        // Vérifier que le formateur a configuré Stripe
        if (!formation.creator.stripeAccountId || !formation.creator.stripeOnboarded) {
            return NextResponse.json(
                { error: 'Le formateur n\'a pas encore configuré les paiements' },
                { status: 400 }
            )
        }

        // Créer session Checkout avec Stripe Connect
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: formation.title,
                            images: formation.coverImage ? [formation.coverImage] : [],
                            description: formation.pitch,
                        },
                        unit_amount: Math.round(formation.price * 100), // En centimes
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/learn/${formationId}?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/${formation.creator.username}/${formation.slug}`,
            customer_email: customerEmail,
            metadata: {
                formationId: formation.id,
                creatorId: formation.creatorId,
            },
            payment_intent_data: {
                application_fee_amount: Math.round(formation.price * 100 * 0.05), // 5% de frais
                transfer_data: {
                    destination: formation.creator.stripeAccountId,
                },
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error) {
        console.error('Stripe error:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la création du paiement' },
            { status: 500 }
        )
    }
}
