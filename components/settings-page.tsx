"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Check,
    ChevronDown,
    User,
    CreditCard,
    Globe,
    ExternalLink,
    Loader2,
} from "lucide-react";

interface SettingsPageProps {
    onSave?: (data: SettingsData) => Promise<void>;
}

interface SettingsData {
    // Account
    fullName: string;
    email: string;
    // Stripe
    stripePublicKey: string;
    stripeSecretKey: string;
    // Domain
    customDomain: string;
}

export function SettingsPage({ onSave }: SettingsPageProps) {
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [savedSections, setSavedSections] = useState<Set<string>>(new Set());

    const [formData, setFormData] = useState<SettingsData>({
        fullName: "",
        email: "",
        stripePublicKey: "",
        stripeSecretKey: "",
        customDomain: "",
    });

    const handleInputChange = (field: keyof SettingsData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Remove saved checkmark when user edits
        setSavedSections((prev) => {
            const newSet = new Set(prev);
            const sectionMap: Record<string, string> = {
                fullName: "account",
                email: "account",
                stripePublicKey: "stripe",
                stripeSecretKey: "stripe",
                customDomain: "domain",
            };
            newSet.delete(sectionMap[field]);
            return newSet;
        });
    };

    const handleSaveSection = async (section: string) => {
        setIsSaving(true);
        try {
            await onSave?.(formData);
            setSavedSections((prev) => new Set(prev).add(section));
        } catch (error) {
            console.error("Error saving:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            {/* Account Section */}
            <Card className="border-neutral-200 dark:border-neutral-800">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <User className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <CardTitle className="text-[16px]">Compte</CardTitle>
                            <CardDescription className="mt-0.5 text-[13px]">
                                Gérez vos informations personnelles
                            </CardDescription>
                        </div>
                    </div>
                    {savedSections.has("account") && (
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                            Sauvegardé
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="fullName" className="text-[13px] font-medium">
                            Nom complet
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="h-10 border-neutral-200 dark:border-neutral-800"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[13px] font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="h-10 border-neutral-200 dark:border-neutral-800"
                        />
                    </div>
                    <Button
                        onClick={() => handleSaveSection("account")}
                        disabled={isSaving}
                        className="h-9 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                Sauvegarde...
                            </>
                        ) : (
                            "Sauvegarder"
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Stripe Section */}
            <Card className="border-neutral-200 dark:border-neutral-800">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                            <CreditCard className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <CardTitle className="text-[16px]">Stripe</CardTitle>
                            <CardDescription className="mt-0.5 text-[13px]">
                                Configurez vos clés API Stripe pour les paiements
                            </CardDescription>
                        </div>
                    </div>
                    {savedSections.has("stripe") && (
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                            Sauvegardé
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Guide Collapsible */}
                    <Collapsible open={isGuideOpen} onOpenChange={setIsGuideOpen}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-left transition-colors hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20">
                            <div className="flex items-center gap-2">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white dark:bg-indigo-500">
                                    ?
                                </div>
                                <span className="text-[13px] font-medium text-indigo-900 dark:text-indigo-300">
                                    Comment obtenir mes clés Stripe ?
                                </span>
                            </div>
                            <ChevronDown
                                className={cn(
                                    "h-4 w-4 text-indigo-700 transition-transform dark:text-indigo-400",
                                    isGuideOpen && "rotate-180"
                                )}
                                strokeWidth={2}
                            />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                            <ol className="space-y-2 text-[13px] text-neutral-700 dark:text-neutral-300">
                                <li className="flex gap-2">
                                    <span className="font-semibold">1.</span>
                                    <span>
                                        Connectez-vous à{" "}
                                        <a
                                            href="https://dashboard.stripe.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-indigo-600 hover:underline dark:text-indigo-400"
                                        >
                                            Stripe Dashboard
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-semibold">2.</span>
                                    <span>
                                        Accédez à <strong>Développeurs → Clés API</strong>
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-semibold">3.</span>
                                    <span>
                                        Copiez la <strong>Clé publique</strong> (commence par pk_)
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-semibold">4.</span>
                                    <span>
                                        Copiez la <strong>Clé secrète</strong> (commence par sk_)
                                    </span>
                                </li>
                            </ol>
                        </CollapsibleContent>
                    </Collapsible>

                    <div className="grid gap-2">
                        <Label htmlFor="stripePublic" className="text-[13px] font-medium">
                            Clé publique
                        </Label>
                        <Input
                            id="stripePublic"
                            type="text"
                            placeholder="pk_test_..."
                            value={formData.stripePublicKey}
                            onChange={(e) =>
                                handleInputChange("stripePublicKey", e.target.value)
                            }
                            className="h-10 border-neutral-200 font-mono text-[12px] dark:border-neutral-800"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="stripeSecret" className="text-[13px] font-medium">
                            Clé secrète
                        </Label>
                        <Input
                            id="stripeSecret"
                            type="password"
                            placeholder="sk_test_..."
                            value={formData.stripeSecretKey}
                            onChange={(e) =>
                                handleInputChange("stripeSecretKey", e.target.value)
                            }
                            className="h-10 border-neutral-200 font-mono text-[12px] dark:border-neutral-800"
                        />
                    </div>
                    <Button
                        onClick={() => handleSaveSection("stripe")}
                        disabled={isSaving}
                        className="h-9 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                Sauvegarde...
                            </>
                        ) : (
                            "Sauvegarder"
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Domain Section */}
            <Card className="border-neutral-200 dark:border-neutral-800">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                            <Globe className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <CardTitle className="text-[16px]">Domaine personnalisé</CardTitle>
                            <CardDescription className="mt-0.5 text-[13px]">
                                Utilisez votre propre nom de domaine
                            </CardDescription>
                        </div>
                    </div>
                    {savedSections.has("domain") && (
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                            Sauvegardé
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="domain" className="text-[13px] font-medium">
                            Domaine
                        </Label>
                        <Input
                            id="domain"
                            type="text"
                            placeholder="formations.votresite.com"
                            value={formData.customDomain}
                            onChange={(e) =>
                                handleInputChange("customDomain", e.target.value)
                            }
                            className="h-10 border-neutral-200 dark:border-neutral-800"
                        />
                        <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                            Configurez un enregistrement CNAME pointant vers notre serveur
                        </p>
                    </div>
                    <Button
                        onClick={() => handleSaveSection("domain")}
                        disabled={isSaving}
                        className="h-9 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                Sauvegarde...
                            </>
                        ) : (
                            "Sauvegarder"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
