import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCard } from "@/components/stats-card";
import { FormationCard } from "@/components/formation-card";
import { Button } from "@/components/ui/button";
import {
    DollarSign,
    Users,
    ShoppingCart,
    GraduationCap,
    Plus,
    TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
    // Exemple de données - À remplacer par vos vraies données
    const stats = {
        revenue: { value: "12 450€", trend: { value: 12.5, isPositive: true } },
        students: { value: 234, trend: { value: 8, isPositive: true } },
        sales: { value: 89, trend: { value: 3.2, isPositive: false } },
        courses: { value: 12, trend: undefined },
    };

    const recentFormations = [
        {
            id: "1",
            title: "Maîtriser Next.js 15 en 30 jours",
            description:
                "Apprenez Next.js 15 de A à Z avec des projets concrets et des exercices pratiques pour devenir expert.",
            coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
            price: 199,
            studentsCount: 1245,
            modulesCount: 42,
            status: "published" as const,
        },
        {
            id: "2",
            title: "TypeScript Avancé",
            description:
                "Maîtrisez TypeScript avec des patterns avancés, generics, et bonnes pratiques pour des applications robustes.",
            coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop",
            price: 149,
            studentsCount: 876,
            modulesCount: 28,
            status: "published" as const,
        },
        {
            id: "3",
            title: "Design System avec Tailwind",
            description:
                "Créez un design system professionnel avec Tailwind CSS et des composants réutilisables.",
            coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
            price: 99,
            studentsCount: 432,
            modulesCount: 18,
            status: "draft" as const,
        },
    ];

    return (
        <DashboardLayout
            pageTitle="Dashboard"
            pageDescription="Vue d'ensemble de votre activité"
            headerActions={
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvelle formation
                </Button>
            }
            userName="Bruno Crespo"
            userEmail="bruno@example.com"
        >
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        icon={DollarSign}
                        label="Revenus ce mois"
                        value={stats.revenue.value}
                        trend={stats.revenue.trend}
                        variant="revenue"
                    />
                    <StatsCard
                        icon={Users}
                        label="Nouveaux élèves"
                        value={stats.students.value}
                        trend={stats.students.trend}
                        variant="students"
                    />
                    <StatsCard
                        icon={ShoppingCart}
                        label="Ventes"
                        value={stats.sales.value}
                        trend={stats.sales.trend}
                        variant="sales"
                    />
                    <StatsCard
                        icon={GraduationCap}
                        label="Formations actives"
                        value={stats.courses.value}
                        variant="courses"
                    />
                </div>

                {/* Recent Activity Section */}
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-[20px] font-semibold text-neutral-900 dark:text-neutral-50">
                                Meilleures performances
                            </h2>
                            <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">
                                Vos formations les plus populaires ce mois
                            </p>
                        </div>
                        <Button variant="ghost" size="sm">
                            Voir tout
                        </Button>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {recentFormations.map((formation) => (
                            <FormationCard key={formation.id} {...formation} />
                        ))}
                    </div>
                </div>

                {/* Quick Insights */}
                <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-6 dark:border-neutral-800 dark:from-indigo-950/30 dark:to-violet-950/30">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white dark:bg-indigo-500">
                            <TrendingUp className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-1 text-[16px] font-semibold text-neutral-900 dark:text-neutral-50">
                                🎉 Excellente performance ce mois !
                            </h3>
                            <p className="mb-4 text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                                Vos ventes ont augmenté de 12.5% par rapport au mois dernier.
                                Continuez comme ça !
                            </p>
                            <Button
                                size="sm"
                                className="h-9 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500"
                            >
                                Voir les détails
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
