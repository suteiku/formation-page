import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
    interface User {
        id: string
        username: string
    }
    interface Session {
        user: {
            id: string
            email: string
            name: string
            username: string
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username: string
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                userType: { label: 'UserType', type: 'text' }, // 'creator' or 'student'
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email et mot de passe requis')
                }

                const userType = credentials.userType || 'creator'

                if (userType === 'student') {
                    // Authentification élève
                    const student = await prisma.student.findUnique({
                        where: { email: credentials.email },
                    })

                    if (!student || !student.password) {
                        throw new Error('Identifiants invalides')
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        student.password
                    )

                    if (!isValid) {
                        throw new Error('Identifiants invalides')
                    }

                    return {
                        id: student.id,
                        email: student.email,
                        name: student.name,
                        username: '', // Students don't have usernames
                    }
                } else {
                    // Authentification formateur
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    })

                    if (!user || !user.password) {
                        throw new Error('Identifiants invalides')
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if (!isValid) {
                        throw new Error('Identifiants invalides')
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        username: user.username,
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.username = token.username
            }
            return session
        },
    },
}
