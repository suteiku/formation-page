'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface CheckoutButtonProps {
    formationId: string
    price: number
    className?: string
    style?: React.CSSProperties
    size?: 'default' | 'sm' | 'lg' | 'icon'
    children?: React.ReactNode
}

export function CheckoutButton({
    formationId,
    price,
    className,
    style,
    size = 'lg',
    children,
}: CheckoutButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Veuillez entrer une adresse email valide')
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formationId,
                    email,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la création du paiement')
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Checkout error:', error)
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue')
            setIsLoading(false)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    return (
        <>
            <Button
                size={size}
                className={className}
                style={style}
                onClick={() => setIsOpen(true)}
            >
                {children || `Acheter maintenant - ${formatPrice(price)}`}
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Finaliser votre achat</DialogTitle>
                        <DialogDescription>
                            Entrez votre adresse email pour continuer vers le paiement sécurisé.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Adresse email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCheckout()
                                    }
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Total à payer</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatPrice(price)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Annuler
                        </Button>
                        <Button onClick={handleCheckout} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Chargement...
                                </>
                            ) : (
                                'Continuer vers le paiement'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
