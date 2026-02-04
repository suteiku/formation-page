import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Mail,
    Calendar,
    BookOpen,
} from 'lucide-react'

export default async function StudentsPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect('/login')
    }

    // Get all students who purchased creator's formations
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

    // Group purchases by student
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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Élèves</h1>
                <p className="text-gray-600">
                    Gérez vos élèves et suivez leur progression
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <Users className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Élèves</p>
                                <p className="text-2xl font-bold">{students.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <BookOpen className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Inscriptions</p>
                                <p className="text-2xl font-bold">{purchases.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Calendar className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ce mois</p>
                                <p className="text-2xl font-bold">
                                    {purchases.filter((p) => {
                                        const now = new Date()
                                        const purchaseDate = new Date(p.createdAt)
                                        return (
                                            purchaseDate.getMonth() === now.getMonth() &&
                                            purchaseDate.getFullYear() === now.getFullYear()
                                        )
                                    }).length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Students List */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Élèves</CardTitle>
                </CardHeader>
                <CardContent>
                    {students.length === 0 ? (
                        <div className="text-center py-8">
                            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Aucun élève pour le moment</p>
                            <p className="text-sm text-gray-400">
                                Vos élèves apparaîtront ici après leurs achats
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">
                                            Élève
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">
                                            Email
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">
                                            Formations
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">
                                            Inscrit le
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(({ student, purchases: studentPurchases }) => (
                                        <tr key={student.id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                        <span className="font-medium text-indigo-600">
                                                            {student.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail className="h-4 w-4" />
                                                    <span>{student.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {studentPurchases.map((p) => (
                                                        <Badge key={p.id} variant="secondary">
                                                            {p.formation.title}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {new Date(student.createdAt).toLocaleDateString('fr-FR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
