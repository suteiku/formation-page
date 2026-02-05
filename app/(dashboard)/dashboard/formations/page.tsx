import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Package } from 'lucide-react'
import { ModernFormationCard } from '@/components/formation/modern-formation-card'

async function getFormations(userId: string) {
    const formations = await prisma.formation.findMany({
        where: { creatorId: userId },
        include: {
            _count: {
                select: {
                    purchases: true,
                    modules: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    })

    const formationsWithRevenue = await Promise.all(
        formations.map(async (formation) => {
            const revenue = await prisma.purchase.aggregate({
                where: { formationId: formation.id },
                _sum: { amount: true },
            })

            return {
                ...formation,
                revenue: revenue._sum.amount || 0,
            }
        })
    )

    return formationsWithRevenue
}

export default async function FormationsPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return null
    }

    const formations = await getFormations(session.user.id)

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto p-8 space-y-8">
                {/* HEADER */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight mb-1">Vos formations</h1>
                        <p className="text-[15px] text-slate-600">Gérez votre catalogue de produits</p>
                    </div>
                    <Link href="/dashboard/formations/new">
                        <Button className="h-11 px-5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-lg font-medium text-[15px]">
                            <Plus className="mr-2 h-5 w-5" />
                            Créer une formation
                        </Button>
                    </Link>
                </div>

                {/* FORMATIONS GRID */}
                {formations.length === 0 ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="text-center max-w-md">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-200">
                                <Package className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucune formation</h3>
                            <p className="text-[15px] text-slate-600 mb-6 leading-relaxed">
                                Vous n'avez pas encore créé de formation. Commencez dès maintenant à partager votre expertise.
                            </p>
                            <Link href="/dashboard/formations/new">
                                <Button className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-lg font-medium">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Créer ma première formation
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {formations.map((formation) => (
                            <ModernFormationCard
                                key={formation.id}
                                id={formation.id}
                                title={formation.title}
                                description={formation.description}
                                price={formation.price}
                                coverImage={formation.coverImage}
                                published={formation.published}
                                studentCount={formation._count.purchases}
                                revenue={formation.revenue}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
