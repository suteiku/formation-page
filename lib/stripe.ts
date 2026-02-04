import Stripe from 'stripe'
import { prisma } from './prisma'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_build', {
    apiVersion: '2026-01-28.clover',
})

// Créer un compte Connect
export async function createConnectAccount(userId: string, email: string) {
    const account = await stripe.accounts.create({
        type: 'express',
        country: 'FR',
        email: email,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
    })

    // Sauvegarder l'ID dans la DB
    await prisma.user.update({
        where: { id: userId },
        data: { stripeAccountId: account.id },
    })

    return account
}

// Générer lien d'onboarding
export async function createAccountLink(accountId: string) {
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/settings`,
        return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/settings`,
        type: 'account_onboarding',
    })

    return accountLink.url
}

// Vérifier si un compte Connect est complètement configuré
export async function checkAccountStatus(accountId: string) {
    const account = await stripe.accounts.retrieve(accountId)
    return account.details_submitted && account.charges_enabled
}
