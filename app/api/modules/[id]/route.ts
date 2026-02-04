import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateModuleSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    order: z.number().optional(),
})

interface Props {
    params: Promise<{ id: string }>
}

// PATCH - Update module
export async function PATCH(req: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params
        const body = await req.json()
        const validatedData = updateModuleSchema.parse(body)

        // Verify module ownership through formation
        const module = await prisma.module.findFirst({
            where: { id },
            include: { formation: true },
        })

        if (!module || module.formation.creatorId !== session.user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        const updatedModule = await prisma.module.update({
            where: { id },
            data: validatedData,
        })

        return NextResponse.json(updatedModule)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error('Error updating module:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}

// DELETE - Delete module
export async function DELETE(req: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params

        // Verify module ownership through formation
        const module = await prisma.module.findFirst({
            where: { id },
            include: { formation: true },
        })

        if (!module || module.formation.creatorId !== session.user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        await prisma.module.delete({ where: { id } })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting module:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
