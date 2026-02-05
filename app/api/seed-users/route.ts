import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
    try {
        // Check if users already exist
        const existingUsers = await prisma.user.count()

        if (existingUsers > 0) {
            return NextResponse.json({
                message: 'Users already exist',
                count: existingUsers
            })
        }

        const hashedPassword = await bcrypt.hash('password123', 10)

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                email: 'admin@formation.com',
                password: hashedPassword,
                name: 'Admin User',
                username: 'admin',
            },
        })

        // Create student user
        const student = await prisma.user.create({
            data: {
                email: 'student@formation.com',
                password: hashedPassword,
                name: 'Student User',
                username: 'student',
            },
        })

        return NextResponse.json({
            success: true,
            users: {
                admin: admin.email,
                student: student.email,
            },
            password: 'password123',
        })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json(
            { error: 'Failed to seed database' },
            { status: 500 }
        )
    }
}
