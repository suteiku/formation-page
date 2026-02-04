import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function SalesPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return null
    }

    const purchases = await prisma.purchase.findMany({
        where: {
            formation: { creatorId: session.user.id },
        },
        include: {
            student: true,
            formation: true,
        },
        orderBy: { createdAt: 'desc' },
    })

    const totalRevenue = purchases.reduce((acc, p) => acc + p.amount, 0)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date))
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Historique des ventes</h1>
                <p className="text-gray-600 mt-1">
                    Consultez toutes vos ventes et revenus
                </p>
            </div>

            {/* Summary */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Revenus totaux
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatPrice(totalRevenue)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Nombre de ventes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Panier moyen
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-900">
                            {purchases.length > 0
                                ? formatPrice(totalRevenue / purchases.length)
                                : '0 €'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Sales Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Toutes les ventes</CardTitle>
                </CardHeader>
                <CardContent>
                    {purchases.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            Aucune vente pour le moment
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="pb-3 font-medium text-gray-600">Client</th>
                                        <th className="pb-3 font-medium text-gray-600">Formation</th>
                                        <th className="pb-3 font-medium text-gray-600">Montant</th>
                                        <th className="pb-3 font-medium text-gray-600">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {purchases.map((purchase) => (
                                        <tr key={purchase.id}>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                        <span className="text-indigo-600 font-medium text-sm">
                                                            {purchase.student.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {purchase.student.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {purchase.student.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <p className="text-gray-900">{purchase.formation.title}</p>
                                            </td>
                                            <td className="py-4">
                                                <Badge variant="secondary" className="font-mono">
                                                    {formatPrice(purchase.amount)}
                                                </Badge>
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {formatDate(purchase.createdAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
