import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createModuleSchema = z.object({
    formationId: z.string(),
    title: z.string().min(1),
    description: z.string().optional(),
})

// POST - Create new module
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const validatedData = createModuleSchema.parse(body)

        // Verify formation ownership
        const formation = await prisma.formation.findFirst({
            where: {
                id: validatedData.formationId,
                creatorId: session.user.id,
            },
        })

        if (!formation) {
            return NextResponse.json({ error: 'Formation not found' }, { status: 404 })
        }

        // Get the next order
        const lastModule = await prisma.module.findFirst({
            where: { formationId: validatedData.formationId },
            orderBy: { order: 'desc' },
        })

        const module = await prisma.module.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                order: lastModule ? lastModule.order + 1 : 0,
                formationId: validatedData.formationId,
            },
        })

        return NextResponse.json(module, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error('Error creating module:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
