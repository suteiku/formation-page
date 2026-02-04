import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import ContentEditor from '@/components/formation/content-editor'

interface Props {
    params: Promise<{ id: string }>
}

export default async function ContentPage({ params }: Props) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect('/login')
    }

    const { id } = await params

    const formation = await prisma.formation.findUnique({
        where: { id },
        include: {
            modules: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' },
                    },
                },
            },
        },
    })

    if (!formation || formation.creatorId !== session.user.id) {
        notFound()
    }

    return <ContentEditor formation={formation} />
}
