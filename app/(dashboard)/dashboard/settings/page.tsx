'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, CheckCircle2, ExternalLink } from 'lucide-react'

export default function SettingsPage() {
    const { data: session } = useSession()
    const [stripeStatus, setStripeStatus] = useState<{
        connected: boolean
        onboarded: boolean
    } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchStripeStatus()
    }, [])

    const fetchStripeStatus = async () => {
        try {
            const response = await fetch('/api/stripe/connect')
            const data = await response.json()
            setStripeStatus(data)
        } catch (error) {
            console.error('Error fetching Stripe status:', error)
        }
    }

    const handleConnectStripe = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/stripe/connect', {
                method: 'POST',
            })
            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                toast.error('Erreur lors de la connexion à Stripe')
            }
        } catch (error) {
            toast.error('Erreur lors de la connexion à Stripe')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
                <p className="text-gray-600 mt-1">
                    Gérez votre compte et vos préférences
                </p>
            </div>

            {/* Profile */}
            <Card>
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                    <CardDescription>
                        Informations de votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-2xl font-bold text-indigo-600">
                                {session?.user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{session?.user?.name}</p>
                            <p className="text-sm text-gray-500">{session?.user?.email}</p>
                            <p className="text-sm text-gray-400">
                                formationpage.com/{session?.user?.username}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stripe Connect */}
            <Card>
                <CardHeader>
                    <CardTitle>Paiements</CardTitle>
                    <CardDescription>
                        Connectez votre compte Stripe pour recevoir les paiements de vos
                        élèves
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {stripeStatus === null ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                    ) : stripeStatus.onboarded ? (
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                            <div>
                                <p className="font-medium text-green-800">
                                    Compte Stripe connecté
                                </p>
                                <p className="text-sm text-green-600">
                                    Vous pouvez recevoir des paiements
                                </p>
                            </div>
                            <Badge className="ml-auto bg-green-600">Actif</Badge>
                        </div>
                    ) : stripeStatus.connected ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <p className="font-medium text-yellow-800">
                                    Configuration incomplète
                                </p>
                                <p className="text-sm text-yellow-600">
                                    Terminez la configuration de votre compte Stripe pour recevoir
                                    des paiements
                                </p>
                            </div>
                            <Button onClick={handleConnectStripe} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Chargement...
                                    </>
                                ) : (
                                    <>
                                        Terminer la configuration
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Pour recevoir les paiements de vos élèves, vous devez connecter
                                votre compte Stripe. C&apos;est gratuit et sécurisé.
                            </p>
                            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                <p className="text-sm text-gray-600">
                                    <strong>Pourquoi Stripe ?</strong>
                                </p>
                                <ul className="text-sm text-gray-500 space-y-1">
                                    <li>✓ Sécurisé et utilisé par des millions d&apos;entreprises</li>
                                    <li>✓ Vous recevez l&apos;argent directement sur votre compte</li>
                                    <li>✓ Aucun frais de notre part (seulement les frais Stripe)</li>
                                </ul>
                            </div>
                            <Button
                                onClick={handleConnectStripe}
                                className="bg-indigo-600 hover:bg-indigo-700"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Connexion...
                                    </>
                                ) : (
                                    <>
                                        Connecter avec Stripe
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
