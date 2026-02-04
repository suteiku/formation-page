import 'dotenv/config'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
    try {
        const hashedPassword = await bcrypt.hash('password123', 10)

        // Create Creator
        console.log('Creating Creator...')
        const creator = await prisma.user.upsert({
            where: { email: 'admin@formation.com' },
            update: {},
            create: {
                email: 'admin@formation.com',
                name: 'Admin Formateur',
                username: 'admin',
                password: hashedPassword,
            },
        })
        console.log('Creator created:', creator.email)

        // Create Student
        console.log('Creating Student...')
        const student = await prisma.student.upsert({
            where: { email: 'student@formation.com' },
            update: {},
            create: {
                email: 'student@formation.com',
                name: 'Test Student',
                password: hashedPassword,
            },
        })
        console.log('Student created:', student.email)
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
