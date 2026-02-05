'use client'

import { useState } from 'react'
import { SettingsSection, SettingsInput, SettingsButton, SettingsCollapsible } from '@/components/design-system'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useSession } from 'next-auth/react'
import { ChevronDown, Check, CreditCard, User, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [showGuide, setShowGuide] = useState(false)

    const [stripeKeys, setStripeKeys] = useState({
        publishable: '',
        secret: '',
        connectClientId: '',
    })

    const handleSave = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/settings/stripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stripeKeys),
            })

            if (res.ok) {
                toast.success("✅ Sauvegardé", {
                    description: "Vos clés Stripe sont configurées",
                })
            }
        } catch (error) {
            toast.error("❌ Erreur", {
                description: "Impossible de sauvegarder",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="border-b border-slate-200 pb-6">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Paramètres
                </h1>
                <p className="text-slate-500 mt-1">
                    Gérez vos informations et vos intégrations
                </p>
            </div>

            {/* COMPTE */}
            <SettingsSection
                title="Informations du compte"
                description="Vos informations personnelles visible sur votre profil"
                icon={<User className="w-5 h-5" />}
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <SettingsInput label="Nom">
                        <Input
                            value={session?.user?.name || ''}
                            disabled
                            className="bg-slate-50 border-slate-200 text-slate-500"
                        />
                    </SettingsInput>
                    <SettingsInput label="Email">
                        <Input
                            value={session?.user?.email || ''}
                            disabled
                            className="bg-slate-50 border-slate-200 text-slate-500"
                        />
                    </SettingsInput>
                </div>
                <SettingsInput
                    label="Username"
                    helperText={`Votre URL : formationpage.com/${session?.user?.username}`}
                >
                    <Input
                        value={session?.user?.username || ''}
                        disabled
                        className="bg-slate-50 border-slate-200 text-slate-500"
                    />
                </SettingsInput>
            </SettingsSection>

            {/* STRIPE */}
            <SettingsSection
                title="Configuration Stripe"
                description="Connectez votre compte Stripe pour recevoir les paiements"
                icon={<CreditCard className="w-5 h-5" />}
            >
                <div className="grid gap-4">
                    <SettingsInput
                        label="Clé Publishable"
                        helperText="Commence par pk_test_ en mode test"
                    >
                        <Input
                            placeholder="pk_test_51..."
                            value={stripeKeys.publishable}
                            onChange={(e) => setStripeKeys({ ...stripeKeys, publishable: e.target.value })}
                            className="font-mono text-sm"
                        />
                    </SettingsInput>

                    <SettingsInput
                        label="Clé Secrète"
                        helperText="Commence par sk_test_ en mode test"
                    >
                        <Input
                            type="password"
                            placeholder="sk_test_51..."
                            value={stripeKeys.secret}
                            onChange={(e) => setStripeKeys({ ...stripeKeys, secret: e.target.value })}
                            className="font-mono text-sm"
                        />
                    </SettingsInput>

                    <SettingsInput
                        label="Client ID Connect"
                        helperText="Commence par ca_"
                    >
                        <Input
                            placeholder="ca_..."
                            value={stripeKeys.connectClientId}
                            onChange={(e) => setStripeKeys({ ...stripeKeys, connectClientId: e.target.value })}
                            className="font-mono text-sm"
                        />
                    </SettingsInput>
                </div>

                <Collapsible open={showGuide} onOpenChange={setShowGuide}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full justify-between text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 mt-2">
                            <span>Comment trouver ces clés ?</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showGuide ? 'rotate-180' : ''}`} />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-4 animate-in slide-in-from-top-2">
                        <SettingsCollapsible title="1. Obtenir les clés API">
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Allez sur <a href="https://dashboard.stripe.com/test/apikeys" target="_blank" className="text-indigo-600 hover:underline">dashboard.stripe.com</a></li>
                                <li>Activez le <strong>mode Test</strong> en haut à droite</li>
                                <li>Allez dans <strong>Developers → API Keys</strong></li>
                                <li>Copiez la clé Publishable et la clé Secrète</li>
                            </ol>
                        </SettingsCollapsible>

                        <SettingsCollapsible title="2. Obtenir le Client ID Connect">
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Allez dans <strong>Connect → Settings</strong></li>
                                <li>Activez Connect si nécessaire</li>
                                <li>Copiez le <strong>Client ID</strong> en bas de page</li>
                            </ol>
                        </SettingsCollapsible>
                    </CollapsibleContent>
                </Collapsible>

                <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
                    <SettingsButton
                        onClick={handleSave}
                        disabled={loading || !stripeKeys.publishable || !stripeKeys.secret}
                        variant="primary"
                    >
                        {loading ? 'Sauvegarde...' : <div className="flex items-center"><Check className="mr-2 w-4 h-4" /> Sauvegarder</div>}
                    </SettingsButton>
                </div>
            </SettingsSection>

            {/* DOMAINE */}
            <SettingsSection
                title="Domaine personnalisé"
                description="Connectez votre propre nom de domaine (Ex: formation.mon-site.com)"
                icon={<Globe className="w-5 h-5" />}
            >
                <SettingsInput
                    label="Nom de domaine"
                    helperText="Cette fonctionnalité sera bientôt disponible"
                >
                    <Input
                        placeholder="maformation.com"
                        disabled
                        className="bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                    />
                </SettingsInput>
            </SettingsSection>
        </div>
    )
}
