import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { DesignEditor } from '@/components/design/DesignEditor'

interface Props {
    params: Promise<{ id: string }>
}

export default async function FormationDesignPage({ params }: Props) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect('/login')
    }

    const { id } = await params

    const formation = await prisma.formation.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            creatorId: true,
            templateConfig: true,
        },
    })

    if (!formation || formation.creatorId !== session.user.id) {
        notFound()
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href={`/dashboard/formations/${formation.id}`}>
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Personnaliser le design
                    </h1>
                    <p className="text-gray-600">{formation.title}</p>
                </div>
            </div>

            {/* Design Editor */}
            <DesignEditor
                formationId={formation.id}
                initialConfig={formation.templateConfig as any}
            />
        </div>
    )
}
