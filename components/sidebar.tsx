"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    GraduationCap,
    Users,
    BarChart3,
    Settings,
    ChevronLeft,
    Menu,
    LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
    className?: string;
    userName?: string;
    userEmail?: string;
    userAvatar?: string;
}

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Formations",
        href: "/dashboard/formations",
        icon: GraduationCap,
    },
    {
        label: "Élèves",
        href: "/dashboard/students",
        icon: Users,
    },
    {
        label: "Ventes",
        href: "/dashboard/sales",
        icon: BarChart3,
    },
    {
        label: "Paramètres",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function Sidebar({
    className,
    userName = "John Doe",
    userEmail = "john@example.com",
    userAvatar,
}: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6 dark:border-neutral-800">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                        <GraduationCap className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
                    </div>
                    {!isCollapsed && (
                        <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                            FormationPage
                        </span>
                    )}
                </Link>
                {!isCollapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(true)}
                        className="hidden h-8 w-8 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 lg:flex dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                        aria-label="Réduire la sidebar"
                    >
                        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all duration-200",
                                isActive
                                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
                                isCollapsed && "justify-center px-3"
                            )}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
                            )}

                            <Icon
                                className={cn(
                                    "h-[18px] w-[18px] shrink-0 transition-colors",
                                    isActive
                                        ? "text-indigo-700 dark:text-indigo-400"
                                        : "text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-500 dark:group-hover:text-neutral-300"
                                )}
                                strokeWidth={2}
                            />

                            {!isCollapsed && (
                                <span className="truncate">{item.label}</span>
                            )}

                            {!isCollapsed && (
                                <span
                                    className={cn(
                                        "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                                        isActive && "opacity-0"
                                    )}
                                >
                                    <ChevronLeft className="h-3.5 w-3.5 rotate-180" strokeWidth={2} />
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
                <button
                    className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        isCollapsed && "justify-center px-2"
                    )}
                    aria-label="Profil utilisateur"
                >
                    <Avatar className="h-8 w-8 border border-neutral-200 dark:border-neutral-700">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-[13px] font-semibold text-white">
                            {userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {!isCollapsed && (
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-[13px] font-medium text-neutral-900 dark:text-neutral-50">
                                {userName}
                            </p>
                            <p className="truncate text-[12px] text-neutral-500 dark:text-neutral-400">
                                {userEmail}
                            </p>
                        </div>
                    )}
                </button>
            </div>

            {/* Expand button (collapsed state) */}
            {isCollapsed && (
                <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(false)}
                        className="h-8 w-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                        aria-label="Agrandir la sidebar"
                    >
                        <Menu className="h-4 w-4" strokeWidth={2} />
                    </Button>
                </div>
            )}
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="fixed left-4 top-4 z-50 lg:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="h-10 w-10 border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="h-5 w-5" strokeWidth={2} />
                </Button>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-neutral-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex lg:flex-col",
                    "fixed left-0 top-0 z-30 h-screen border-r border-neutral-200 bg-white transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950",
                    isCollapsed ? "w-[72px]" : "w-64",
                    className
                )}
            >
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-300 lg:hidden dark:border-neutral-800 dark:bg-neutral-950",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarContent />
            </aside>
        </>
    );
}
