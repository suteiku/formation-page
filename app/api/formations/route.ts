import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formationSchema } from '@/lib/validations/formation'

// GET - Liste des formations du formateur connecté
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const formations = await prisma.formation.findMany({
            where: { creatorId: session.user.id },
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

        return NextResponse.json({ formations })
    } catch (error) {
        console.error('Error fetching formations:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des formations' },
            { status: 500 }
        )
    }
}

// POST - Créer une nouvelle formation
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            )
        }

        const body = await req.json()
        const validatedData = formationSchema.parse(body)

        // Générer le slug à partir du titre
        const slug = validatedData.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        // Vérifier si le slug existe déjà
        const existingSlug = await prisma.formation.findUnique({
            where: { slug },
        })

        const finalSlug = existingSlug
            ? `${slug}-${Date.now()}`
            : slug

        const formation = await prisma.formation.create({
            data: {
                ...validatedData,
                slug: finalSlug,
                creatorId: session.user.id,
            },
        })

        return NextResponse.json({ formation }, { status: 201 })
    } catch (error) {
        console.error('Error creating formation:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la création de la formation' },
            { status: 500 }
        )
    }
}
