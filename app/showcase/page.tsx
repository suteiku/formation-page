"use client";

import { Sidebar } from "@/components/sidebar";
import { StatsCard } from "@/components/stats-card";
import { FormationCard } from "@/components/formation-card";
import { Button } from "@/components/ui/button";
import {
    DollarSign,
    Users,
    ShoppingCart,
    GraduationCap,
    Plus,
} from "lucide-react";

export default function ShowcasePage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* Header */}
            <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-2 text-[48px] font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            FormationPage Design System
                        </h1>
                        <p className="text-[18px] text-neutral-600 dark:text-neutral-400">
                            Design inspiré de Linear × Vercel × Stripe
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[13px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                ✅ Contraste AAA
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[13px] font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                ✅ Mobile-first
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-[13px] font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                                ✅ Dark mode ready
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="space-y-16">
                    {/* Section 1: Stats Cards */}
                    <section>
                        <div className="mb-6">
                            <h2 className="mb-2 text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                1. Stats Cards
                            </h2>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400">
                                4 variantes de couleurs pour différencier visuellement les métriques
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                icon={DollarSign}
                                label="Revenus ce mois"
                                value="12 450€"
                                trend={{ value: 12.5, isPositive: true }}
                                variant="revenue"
                            />
                            <StatsCard
                                icon={Users}
                                label="Nouveaux élèves"
                                value={234}
                                trend={{ value: 8, isPositive: true }}
                                variant="students"
                            />
                            <StatsCard
                                icon={ShoppingCart}
                                label="Ventes"
                                value={89}
                                trend={{ value: 3.2, isPositive: false }}
                                variant="sales"
                            />
                            <StatsCard
                                icon={GraduationCap}
                                label="Formations actives"
                                value={12}
                                variant="courses"
                            />
                        </div>
                    </section>

                    {/* Section 2: Formation Cards */}
                    <section>
                        <div className="mb-6">
                            <h2 className="mb-2 text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                2. Formation Cards
                            </h2>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400">
                                Cards avec hover effects, badges de statut, et actions claires
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <FormationCard
                                id="1"
                                title="Maîtriser Next.js 15 en 30 jours"
                                description="Apprenez Next.js 15 de A à Z avec des projets concrets et des exercices pratiques."
                                coverImage="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
                                price={199}
                                studentsCount={1245}
                                modulesCount={42}
                                status="published"
                            />
                            <FormationCard
                                id="2"
                                title="TypeScript Avancé"
                                description="Maîtrisez TypeScript avec des patterns avancés et des bonnes pratiques."
                                coverImage="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop"
                                price={149}
                                studentsCount={876}
                                modulesCount={28}
                                status="published"
                            />
                            <FormationCard
                                id="3"
                                title="Design System avec Tailwind"
                                description="Créez un design system professionnel avec Tailwind CSS et composants réutilisables."
                                coverImage="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop"
                                price={99}
                                studentsCount={432}
                                modulesCount={18}
                                status="draft"
                            />
                        </div>
                    </section>

                    {/* Section 3: Buttons */}
                    <section>
                        <div className="mb-6">
                            <h2 className="mb-2 text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                3. Buttons (shadcn/ui)
                            </h2>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400">
                                Variantes de boutons avec états hover et focus
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Primary Button
                            </Button>
                            <Button
                                variant="outline"
                                className="border-neutral-300 bg-white hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900"
                            >
                                Outline Button
                            </Button>
                            <Button
                                variant="ghost"
                                className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                            >
                                Ghost Button
                            </Button>
                            <Button
                                variant="secondary"
                                className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                            >
                                Secondary Button
                            </Button>
                            <Button variant="destructive">Destructive Button</Button>
                            <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700">
                                Small Button
                            </Button>
                            <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">
                                Large Button
                            </Button>
                            <Button disabled>Disabled Button</Button>
                        </div>
                    </section>

                    {/* Section 4: Typography */}
                    <section>
                        <div className="mb-6">
                            <h2 className="mb-2 text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                4. Typography Scale
                            </h2>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400">
                                Hiérarchie typographique claire de 11px à 48px
                            </p>
                        </div>
                        <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                            <p className="text-[48px] font-bold text-neutral-900 dark:text-neutral-50">
                                Heading 1 - 48px
                            </p>
                            <p className="text-[32px] font-bold text-neutral-900 dark:text-neutral-50">
                                Heading 2 - 32px
                            </p>
                            <p className="text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                Heading 3 - 24px
                            </p>
                            <p className="text-[20px] font-semibold text-neutral-900 dark:text-neutral-50">
                                Heading 4 - 20px
                            </p>
                            <p className="text-[16px] font-semibold text-neutral-900 dark:text-neutral-50">
                                Heading 5 - 16px
                            </p>
                            <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                                Body Large - 16px
                            </p>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400">
                                Body Default - 14px
                            </p>
                            <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                                Body Small - 13px
                            </p>
                            <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                                Caption - 12px
                            </p>
                            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                Overline - 11px
                            </p>
                        </div>
                    </section>

                    {/* Section 5: Color Palette */}
                    <section>
                        <div className="mb-6">
                            <h2 className="mb-2 text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                5. Color Palette
                            </h2>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400">
                                Palette de couleurs avec contraste AAA garanti
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Indigo - Primary */}
                            <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                                <p className="mb-3 text-[13px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    Indigo (Primary)
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        50 / 500/10
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-500" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        500
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-600" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        600
                                    </span>
                                </div>
                            </div>

                            {/* Emerald - Success */}
                            <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                                <p className="mb-3 text-[13px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    Emerald (Success)
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        50 / 500/10
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-500" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        500
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-600" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        600
                                    </span>
                                </div>
                            </div>

                            {/* Blue - Info */}
                            <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                                <p className="mb-3 text-[13px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    Blue (Info)
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-500/10" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        50 / 500/10
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-blue-500" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        500
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-blue-600" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        600
                                    </span>
                                </div>
                            </div>

                            {/* Violet - Accent */}
                            <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                                <p className="mb-3 text-[13px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    Violet (Accent)
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-violet-50 dark:bg-violet-500/10" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        50 / 500/10
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-violet-500" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        500
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-violet-600" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        600
                                    </span>
                                </div>
                            </div>

                            {/* Amber - Warning */}
                            <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                                <p className="mb-3 text-[13px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    Amber (Warning)
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-500/10" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        50 / 500/10
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-amber-500" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        500
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-amber-600" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        600
                                    </span>
                                </div>
                            </div>

                            {/* Red - Danger */}
                            <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                                <p className="mb-3 text-[13px] font-semibold text-neutral-900 dark:text-neutral-50">
                                    Red (Danger)
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-500/10" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        50 / 500/10
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-red-500" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        500
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-red-600" />
                                    <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
                                        600
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Spacing System */}
                    <section>
                        <div className="mb-6">
                            <h2 className="mb-2 text-[24px] font-bold text-neutral-900 dark:text-neutral-50">
                                6. Spacing System (4px base)
                            </h2>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400">
                                Système d'espacement cohérent basé sur 4px
                            </p>
                        </div>
                        <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                            {[1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24].map((space) => (
                                <div key={space} className="flex items-center gap-4">
                                    <span className="w-16 text-[12px] font-mono text-neutral-600 dark:text-neutral-400">
                                        {space * 4}px
                                    </span>
                                    <div
                                        className="h-6 bg-indigo-500"
                                        style={{ width: `${space * 4}px` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-12 text-center dark:border-neutral-800 dark:from-indigo-950/30 dark:to-violet-950/30">
                        <h2 className="mb-3 text-[32px] font-bold text-neutral-900 dark:text-neutral-50">
                            Prêt à construire le meilleur SaaS de formations ?
                        </h2>
                        <p className="mb-6 text-[16px] text-neutral-600 dark:text-neutral-400">
                            Tous les composants sont prêts à l'emploi. Consultez le guide pour commencer.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <Button
                                size="lg"
                                className="h-12 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg"
                            >
                                Voir le guide complet
                            </Button>
                            <Button size="lg" variant="outline">
                                Voir les exemples
                            </Button>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
                <p className="text-center text-[13px] text-neutral-500 dark:text-neutral-400">
                    Design fait avec ❤️ pour créer le meilleur SaaS de formations 2025
                </p>
            </footer>
        </div>
    );
}
