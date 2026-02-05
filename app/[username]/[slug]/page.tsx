import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TemplateWrapper } from '@/components/templates/TemplateWrapper'
import { TemplateConfig } from '@/types/templates'
import { defaultMinimalistConfig } from '@/lib/template-configs'

interface Props {
    params: Promise<{ username: string; slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const { username, slug } = await params

    const formation = await prisma.formation.findFirst({
        where: {
            slug,
            creator: { username },
            published: true,
        },
        include: { creator: true },
    })

    if (!formation) {
        return { title: 'Formation non trouvée' }
    }

    return {
        title: `${formation.title} | ${formation.creator.name}`,
        description: formation.pitch,
        openGraph: {
            title: formation.title,
            description: formation.pitch,
            images: [formation.coverImage],
        },
    }
}

export default async function SalesPage({ params }: Props) {
    const { username, slug } = await params

    const formation = await prisma.formation.findFirst({
        where: {
            slug,
            creator: { username },
            published: true,
        },
        include: {
            creator: true,
            modules: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' },
                    },
                },
            },
            testimonials: true,
        },
    })

    if (!formation) {
        notFound()
    }

    // Get template config or use default
    const templateConfig = (formation.templateConfig as any as TemplateConfig) || defaultMinimalistConfig

    return (
        <TemplateWrapper
            templateType={templateConfig.template}
            formation={formation as any}
            config={templateConfig}
        />
    )
}
