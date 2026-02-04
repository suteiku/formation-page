import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { FormationCard } from '@/components/formation/formation-card'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function FormationsPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return null
    }

    const formations = await prisma.formation.findMany({
        where: { creatorId: session.user.id },
        include: {
            creator: {
                select: { username: true, name: true },
            },
            _count: {
                select: { purchases: true, modules: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mes formations</h1>
                    <p className="text-gray-600 mt-1">
                        Gérez et créez vos formations en ligne
                    </p>
                </div>
                <Link href="/dashboard/formations/new">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle formation
                    </Button>
                </Link>
            </div>

            {formations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border">
                    <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Aucune formation
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Créez votre première formation en quelques minutes et commencez à
                        vendre vos connaissances.
                    </p>
                    <Link href="/dashboard/formations/new">
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            Créer ma première formation
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {formations.map((formation) => (
                        <FormationCard
                            key={formation.id}
                            formation={formation}
                            isOwner={true}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
