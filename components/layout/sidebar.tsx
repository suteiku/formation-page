'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    BookOpen,
    CreditCard,
    Settings,
    Plus,
    GraduationCap,
    Users,
} from 'lucide-react'

const navigation = [
    {
        name: 'Vue d\'ensemble',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'Mes formations',
        href: '/dashboard/formations',
        icon: BookOpen,
    },
    {
        name: 'Élèves',
        href: '/dashboard/students',
        icon: Users,
    },
    {
        name: 'Ventes',
        href: '/dashboard/sales',
        icon: CreditCard,
    },
    {
        name: 'Paramètres',
        href: '/dashboard/settings',
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-indigo-600" />
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            FormationPage
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* CTA */}
                <div className="border-t p-4">
                    <Link
                        href="/dashboard/formations/new"
                        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Créer une formation
                    </Link>
                </div>
            </div>
        </aside>
    )
}
