import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendEmail, getWelcomeEmailHtml, getSaleNotificationHtml } from '@/lib/email'
import bcrypt from 'bcryptjs'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
        console.error('Webhook signature verification failed:', err)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Traiter l'événement
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const { formationId, creatorId } = session.metadata!

        try {
            // 1. Créer ou récupérer le compte élève
            const tempPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(tempPassword, 10)

            const student = await prisma.student.upsert({
                where: { email: session.customer_email! },
                update: {},
                create: {
                    email: session.customer_email!,
                    name: session.customer_details?.name || 'Élève',
                    password: hashedPassword,
                },
            })

            // 2. Enregistrer l'achat
            await prisma.purchase.create({
                data: {
                    studentId: student.id,
                    formationId: formationId,
                    amount: session.amount_total! / 100,
                    stripePaymentId: session.payment_intent as string,
                },
            })

            // 3. Récupérer les informations de la formation et du formateur
            const formation = await prisma.formation.findUnique({
                where: { id: formationId },
                include: { creator: true },
            })

            if (!formation) {
                console.error('Formation not found:', formationId)
                return NextResponse.json({ error: 'Formation not found' }, { status: 404 })
            }

            // 4. Envoyer l'email de bienvenue à l'élève
            try {
                await sendEmail({
                    to: student.email,
                    subject: `Bienvenue dans ${formation.title}`,
                    html: getWelcomeEmailHtml({
                        name: student.name,
                        formationTitle: formation.title,
                        email: student.email,
                        tempPassword,
                        loginUrl: `${process.env.NEXT_PUBLIC_URL}/learn/${formationId}`,
                    }),
                })
            } catch (emailError) {
                console.error('Error sending welcome email:', emailError)
            }

            // 5. Envoyer l'email de notification au formateur
            try {
                await sendEmail({
                    to: formation.creator.email,
                    subject: `💰 Nouvelle vente : ${formation.title}`,
                    html: getSaleNotificationHtml({
                        creatorName: formation.creator.name,
                        formationTitle: formation.title,
                        studentName: student.name,
                        studentEmail: student.email,
                        amount: session.amount_total! / 100,
                        date: new Date().toLocaleDateString('fr-FR'),
                        dashboardUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
                    }),
                })
            } catch (emailError) {
                console.error('Error sending sale notification:', emailError)
            }

            console.log('✅ Achat traité avec succès')
        } catch (error) {
            console.error('Error processing purchase:', error)
            return NextResponse.json({ error: 'Error processing purchase' }, { status: 500 })
        }
    }

    // Gérer la mise à jour du compte Connect
    if (event.type === 'account.updated') {
        const account = event.data.object as Stripe.Account

        if (account.details_submitted && account.charges_enabled) {
            await prisma.user.updateMany({
                where: { stripeAccountId: account.id },
                data: { stripeOnboarded: true },
            })
            console.log('✅ Compte Stripe Connect activé:', account.id)
        }
    }

    return NextResponse.json({ received: true })
}
