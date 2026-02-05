'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    BookOpen,
    Settings,
    CreditCard,
    Users,
    BarChart3,
    LogOut,
    ChevronDown,
    Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
    name: string
    href: string
    icon: any
}

const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Formations', href: '/dashboard/formations', icon: BookOpen },
    { name: 'Étudiants', href: '/dashboard/students', icon: Users },
    { name: 'Statistiques', href: '/dashboard/stats', icon: BarChart3 },
    { name: 'Paiements', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
            {/* Animated background mesh */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }} />

            <div className="relative flex">
                {/* SIDEBAR */}
                <motion.aside
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 border-r border-white/10 backdrop-blur-xl"
                >
                    <div className="flex flex-col h-full p-6">
                        {/* Logo */}
                        <Link href="/dashboard" className="mb-8">
                            <div className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                                        FormationPage
                                    </h1>
                                    <p className="text-xs text-gray-400">Creator Studio</p>
                                </div>
                            </div>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex-1 space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                                const Icon = item.icon

                                return (
                                    <Link key={item.href} href={item.href}>
                                        <motion.div
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`
                        relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                        ${isActive
                                                    ? 'bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }
                      `}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-xl"
                                                    style={{ zIndex: -1 }}
                                                />
                                            )}
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{item.name}</span>
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* User Section */}
                        <div className="relative mt-auto pt-6 border-t border-white/10">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                    BC
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-white">Bruno Crespo</p>
                                    <p className="text-xs text-gray-400">bruno@formation.com</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {userMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-gray-800 border border-white/10 rounded-xl backdrop-blur-xl"
                                >
                                    <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm">Déconnexion</span>
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}
