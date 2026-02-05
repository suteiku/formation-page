import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, DollarSign, Users, ShoppingCart, BookOpen, ArrowRight, TrendingUp } from 'lucide-react'
import { ElegantStatsCard } from '@/components/dashboard/elegant-stats-card'
import { ModernFormationCard } from '@/components/formation/modern-formation-card'

async function getDashboardData(userId: string) {
    const [formations, purchases, totalStudents] = await Promise.all([
        prisma.formation.findMany({
            where: { creatorId: userId },
            include: {
                _count: { select: { purchases: true, modules: true } },
            },
            take: 4,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.purchase.findMany({
            where: { formation: { creatorId: userId } },
            include: { student: true, formation: true },
            take: 6,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.purchase.count({
            where: { formation: { creatorId: userId } },
        }),
    ])

    const totalRevenue = await prisma.purchase.aggregate({
        where: { formation: { creatorId: userId } },
        _sum: { amount: true },
    })

    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const thisMonthPurchases = await prisma.purchase.count({
        where: {
            formation: { creatorId: userId },
            createdAt: { gte: firstDayOfMonth },
        },
    })

    const thisMonthRevenue = await prisma.purchase.aggregate({
        where: {
            formation: { creatorId: userId },
            createdAt: { gte: firstDayOfMonth },
        },
        _sum: { amount: true }
    })

    return {
        formations,
        purchases,
        stats: {
            totalRevenue: totalRevenue._sum.amount || 0,
            totalStudents,
            thisMonthSales: thisMonthPurchases,
            thisMonthRevenue: thisMonthRevenue._sum.amount || 0,
            totalFormations: await prisma.formation.count({ where: { creatorId: userId } }),
        }
    }
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return null
    }

    const { formations, purchases, stats } = await getDashboardData(session.user.id)
    const firstName = session.user.name?.split(' ')[0] || 'Créateur'

    const formatPrice = (p: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(p)
    const formatDate = (d: Date) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d)

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto p-8 space-y-8">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight mb-1">
                            Bonjour, {firstName} 👋
                        </h1>
                        <p className="text-[15px] text-slate-600">
                            Voici un aperçu de votre activité aujourd'hui
                        </p>
                    </div>
                    <Link href="/dashboard/formations/new">
                        <Button className="h-11 px-5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-lg font-medium text-[15px]">
                            <Plus className="w-5 h-5 mr-2" />
                            Nouvelle formation
                        </Button>
                    </Link>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ElegantStatsCard
                        icon={DollarSign}
                        label="Revenus totaux"
                        value={formatPrice(stats.totalRevenue)}
                        trend={12}
                        intent="success"
                    />
                    <ElegantStatsCard
                        icon={Users}
                        label="Étudiants actifs"
                        value={stats.totalStudents}
                        trend={8}
                        intent="info"
                    />
                    <ElegantStatsCard
                        icon={ShoppingCart}
                        label="Ventes ce mois"
                        value={stats.thisMonthSales}
                        subValue={formatPrice(stats.thisMonthRevenue)}
                        trend={5}
                        intent="primary"
                    />
                    <ElegantStatsCard
                        icon={BookOpen}
                        label="Formations"
                        value={stats.totalFormations}
                        intent="warning"
                    />
                </div>

                {/* MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* FORMATIONS SECTION */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">Formations récentes</h2>
                            <Link href="/dashboard/formations" className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                                Voir tout
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formations.slice(0, 4).map(formation => (
                                <ModernFormationCard
                                    key={formation.id}
                                    id={formation.id}
                                    title={formation.title}
                                    description={formation.description}
                                    price={formation.price}
                                    coverImage={formation.coverImage}
                                    published={formation.published}
                                    studentCount={formation._count.purchases}
                                    revenue={formation.price * formation._count.purchases}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ACTIVITY SIDEBAR */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">Activité récente</h2>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            {purchases.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100">
                                        <ShoppingCart className="w-7 h-7 text-slate-300" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-900 mb-1">Aucune vente</p>
                                    <p className="text-xs text-slate-500">Les ventes apparaîtront ici</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {purchases.map(purchase => (
                                        <div key={purchase.id} className="p-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center text-sm font-semibold text-indigo-700">
                                                        {purchase.student.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium text-slate-900 truncate">{purchase.student.name}</p>
                                                        <p className="text-xs text-slate-500 truncate">{purchase.formation.title}</p>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 text-right">
                                                    <p className="text-sm font-semibold text-emerald-600">+{formatPrice(purchase.amount)}</p>
                                                    <p className="text-xs text-slate-400">{formatDate(purchase.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {purchases.length > 0 && (
                                <div className="p-3 bg-slate-50 border-t border-slate-100">
                                    <Link href="/dashboard/sales" className="block text-center text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-indigo-600 transition-colors">
                                        Historique complet
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
