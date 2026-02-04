import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    DollarSign,
    Users,
    ShoppingCart,
    Eye,
    Plus,
    ArrowRight,
} from 'lucide-react'

async function getDashboardData(userId: string) {
    const [formations, purchases, totalStudents] = await Promise.all([
        prisma.formation.findMany({
            where: { creatorId: userId },
            include: {
                _count: {
                    select: { purchases: true, modules: true },
                },
            },
            take: 5,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.purchase.findMany({
            where: {
                formation: { creatorId: userId },
            },
            include: {
                student: true,
                formation: true,
            },
            take: 5,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.purchase.count({
            where: {
                formation: { creatorId: userId },
            },
        }),
    ])

    const totalRevenue = await prisma.purchase.aggregate({
        where: {
            formation: { creatorId: userId },
        },
        _sum: { amount: true },
    })

    const thisMonthPurchases = await prisma.purchase.count({
        where: {
            formation: { creatorId: userId },
            createdAt: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
        },
    })

    return {
        formations,
        purchases,
        stats: {
            totalRevenue: totalRevenue._sum.amount || 0,
            totalStudents,
            thisMonthSales: thisMonthPurchases,
            totalFormations: formations.length,
        },
    }
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return null
    }

    const { formations, purchases, stats } = await getDashboardData(session.user.id)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date))
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Bonjour, {session.user.name?.split(' ')[0]} 👋
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Voici un aperçu de votre activité
                    </p>
                </div>
                <Link href="/dashboard/formations/new">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle formation
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Revenus totaux
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatPrice(stats.totalRevenue)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Élèves actifs
                        </CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {stats.totalStudents}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Ventes ce mois
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {stats.thisMonthSales}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Formations
                        </CardTitle>
                        <Eye className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {stats.totalFormations}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Recent Sales */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Ventes récentes</CardTitle>
                        <Link href="/dashboard/sales">
                            <Button variant="ghost" size="sm">
                                Voir tout
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {purchases.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                Aucune vente pour le moment
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {purchases.map((purchase) => (
                                    <div
                                        key={purchase.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-600 font-medium">
                                                    {purchase.student.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {purchase.student.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {purchase.formation.title}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">
                                                {formatPrice(purchase.amount)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(purchase.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Formations */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Mes formations</CardTitle>
                        <Link href="/dashboard/formations">
                            <Button variant="ghost" size="sm">
                                Voir tout
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {formations.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">
                                    Vous n&apos;avez pas encore de formation
                                </p>
                                <Link href="/dashboard/formations/new">
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Créer ma première formation
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {formations.map((formation) => (
                                    <div
                                        key={formation.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900">
                                                    {formation.title}
                                                </p>
                                                {!formation.published && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Brouillon
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {formation._count.purchases} élèves · {formatPrice(formation.price)}
                                            </p>
                                        </div>
                                        <Link href={`/dashboard/formations/${formation.id}`}>
                                            <Button variant="outline" size="sm">
                                                Modifier
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
