import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations/user'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validatedData = registerSchema.parse(body)

        // Vérifier si l'email existe déjà
        const existingEmail = await prisma.user.findUnique({
            where: { email: validatedData.email },
        })

        if (existingEmail) {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé' },
                { status: 400 }
            )
        }

        // Vérifier si le username existe déjà
        const existingUsername = await prisma.user.findUnique({
            where: { username: validatedData.username },
        })

        if (existingUsername) {
            return NextResponse.json(
                { error: 'Ce nom d\'utilisateur est déjà pris' },
                { status: 400 }
            )
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(validatedData.password, 10)

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                username: validatedData.username,
                password: hashedPassword,
            },
        })

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
            },
        })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Erreur lors de l\'inscription' },
            { status: 500 }
        )
    }
}
