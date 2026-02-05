'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    BookOpen,
    Users,
    CreditCard,
    Settings,
    LogOut,
    User,
    Sparkles,
    ChevronDown
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'

const navigation = [
    { name: 'Vue d\'ensemble', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Formations', href: '/dashboard/formations', icon: BookOpen },
    { name: 'Étudiants', href: '/dashboard/students', icon: Users },
    { name: 'Revenus', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export function ModernSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()

    const userInitials = session?.user?.name
        ? session.user.name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
        : 'U'

    return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
            {/* HEADER - Apple Style */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
                    <Sparkles className="h-5 w-5 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-slate-900 tracking-tight">FormationPage</span>
                    <span className="text-xs text-slate-500 font-medium">Creator Studio</span>
                </div>
            </div>

            {/* NAVIGATION - Floating Active State */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200",
                                isActive
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-700 hover:bg-white/60 hover:text-slate-900"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                                )}
                            />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* USER PROFILE - Microsoft Fluent Style */}
            <div className="p-3 border-t border-slate-200">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2.5 hover:bg-slate-50 transition-all outline-none text-left group">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-200">
                            <AvatarImage src={session?.user?.image || ''} />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-semibold text-sm">
                                {userInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900">
                                {session?.user?.name || 'Mon Compte'}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                                {session?.user?.email || 'user@example.com'}
                            </p>
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[240px] bg-white border border-slate-200 shadow-xl rounded-xl p-2" sideOffset={8}>
                        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mon Compte</DropdownMenuLabel>
                        <DropdownMenuItem className="text-sm font-medium rounded-lg px-3 py-2 hover:bg-slate-50 cursor-pointer focus:bg-slate-50">
                            <User className="mr-3 h-4 w-4 text-slate-500" /> Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm font-medium rounded-lg px-3 py-2 hover:bg-slate-50 cursor-pointer focus:bg-slate-50">
                            <Settings className="mr-3 h-4 w-4 text-slate-500" /> Préférences
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 bg-slate-100" />
                        <DropdownMenuItem
                            className="text-sm font-medium rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 cursor-pointer focus:bg-red-50 focus:text-red-700"
                            onClick={() => signOut()}
                        >
                            <LogOut className="mr-3 h-4 w-4" /> Déconnexion
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
