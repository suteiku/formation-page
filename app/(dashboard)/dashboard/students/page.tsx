import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Mail,
    Calendar,
    BookOpen,
    Search
} from 'lucide-react'
import { ElegantStatsCard } from '@/components/dashboard/elegant-stats-card'

export default async function StudentsPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect('/login')
    }

    const purchases = await prisma.purchase.findMany({
        where: {
            formation: {
                creatorId: session.user.id,
            },
        },
        include: {
            student: true,
            formation: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const studentMap = new Map<string, {
        student: typeof purchases[0]['student']
        purchases: (typeof purchases[0])[]
    }>()

    purchases.forEach((purchase) => {
        const existing = studentMap.get(purchase.studentId)
        if (existing) {
            existing.purchases.push(purchase)
        } else {
            studentMap.set(purchase.studentId, {
                student: purchase.student,
                purchases: [purchase],
            })
        }
    })

    const students = Array.from(studentMap.values())

    const totalStudents = students.length
    const totalEnrollments = purchases.length
    const now = new Date()
    const thisMonthEnrollments = purchases.filter(p => {
        const d = new Date(p.createdAt)
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto p-8 space-y-8">
                {/* HEADER */}
                <div className="pb-6 border-b border-slate-200">
                    <h1 className="text-3xl font-semibold text-slate-900 tracking-tight mb-1">Vos étudiants</h1>
                    <p className="text-[15px] text-slate-600">
                        Gérez votre communauté et suivez les inscriptions
                    </p>
                </div>

                {/* STATS */}
                <div className="grid gap-6 md:grid-cols-3">
                    <ElegantStatsCard
                        icon={Users}
                        label="Total étudiants"
                        value={totalStudents}
                        intent="info"
                    />
                    <ElegantStatsCard
                        icon={BookOpen}
                        label="Inscriptions"
                        value={totalEnrollments}
                        intent="success"
                    />
                    <ElegantStatsCard
                        icon={Calendar}
                        label="Ce mois"
                        value={thisMonthEnrollments}
                        intent="primary"
                    />
                </div>

                {/* STUDENTS TABLE */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
                        <h3 className="text-lg font-semibold text-slate-900">Liste des étudiants</h3>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Rechercher un étudiant..."
                                className="pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full bg-white"
                            />
                        </div>
                    </div>

                    {students.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                <Users className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun étudiant</h3>
                            <p className="text-[15px] text-slate-600 max-w-md mx-auto leading-relaxed">
                                Vos premiers étudiants apparaîtront ici dès qu'ils s'inscriront à vos formations.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Étudiant</th>
                                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                                        <th className="py-4 px-6 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Formations</th>
                                        <th className="py-4 px-6 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Inscrit le</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {students.map(({ student, purchases: studentPurchases }) => (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center text-sm font-semibold text-indigo-700">
                                                        {student.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-slate-900">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                    <Mail className="h-4 w-4 text-slate-400" />
                                                    <span>{student.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {studentPurchases.map((p) => (
                                                        <span key={p.id} className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-700 border border-slate-200">
                                                            {p.formation.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right text-sm text-slate-600 tabular-nums">
                                                {new Date(student.createdAt).toLocaleDateString('fr-FR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
