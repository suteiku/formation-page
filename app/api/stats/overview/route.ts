import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        // Get all formations for this creator
        const formations = await prisma.formation.findMany({
            where: { creatorId: session.user.id },
            include: {
                purchases: true,
                modules: true,
            },
        })

        // Calculate total revenue
        const totalRevenue = formations.reduce((sum, formation) => {
            const formationRevenue = formation.purchases.reduce(
                (total, purchase) => total + purchase.amount,
                0
            )
            return sum + formationRevenue
        }, 0)

        // Total sales count
        const totalSales = formations.reduce((sum, formation) => {
            return sum + formation.purchases.length
        }, 0)

        // Total students (unique students across all formations)
        const allPurchases = formations.flatMap((f) => f.purchases)
        const uniqueStudentIds = new Set(allPurchases.map((p) => p.studentId))
        const totalStudents = uniqueStudentIds.size

        // Revenue by month (last 12 months)
        const monthlyRevenue: { month: string; revenue: number }[] = []
        const now = new Date()

        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthName = date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })

            const monthRevenue = allPurchases
                .filter((purchase) => {
                    const purchaseDate = new Date(purchase.createdAt)
                    return (
                        purchaseDate.getMonth() === date.getMonth() &&
                        purchaseDate.getFullYear() === date.getFullYear()
                    )
                })
                .reduce((sum, purchase) => sum + purchase.amount, 0)

            monthlyRevenue.push({
                month: monthName,
                revenue: monthRevenue,
            })
        }

        // Top formations by revenue
        const topFormations = formations
            .map((formation) => ({
                id: formation.id,
                title: formation.title,
                revenue: formation.purchases.reduce((sum, p) => sum + p.amount, 0),
                sales: formation.purchases.length,
            }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5)

        return NextResponse.json({
            overview: {
                totalRevenue,
                totalSales,
                totalStudents,
                totalFormations: formations.length,
            },
            monthlyRevenue,
            topFormations,
        })
    } catch (error) {
        console.error('Stats API error:', error)
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
}
