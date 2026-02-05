"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
    pageTitle?: string;
    pageDescription?: string;
    headerActions?: ReactNode;
    showFooter?: boolean;
    className?: string;
    userName?: string;
    userEmail?: string;
    userAvatar?: string;
}

export function DashboardLayout({
    children,
    pageTitle,
    pageDescription,
    headerActions,
    showFooter = false,
    className,
    userName,
    userEmail,
    userAvatar,
}: DashboardLayoutProps) {
    return (
        <div className="relative flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* Sidebar */}
            <Sidebar userName={userName} userEmail={userEmail} userAvatar={userAvatar} />

            {/* Main Content */}
            <main className="flex-1 lg:pl-64">
                <div className="flex min-h-screen flex-col">
                    {/* Header */}
                    {(pageTitle || headerActions) && (
                        <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
                            <div className="flex h-16 items-center justify-between px-6 lg:px-8">
                                <div className="flex-1">
                                    {pageTitle && (
                                        <div>
                                            <h1 className="text-[20px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                                                {pageTitle}
                                            </h1>
                                            {pageDescription && (
                                                <p className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
                                                    {pageDescription}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Header Actions */}
                                {headerActions && (
                                    <div className="flex items-center gap-2 pl-4">
                                        {headerActions}
                                    </div>
                                )}
                            </div>
                        </header>
                    )}

                    {/* Page Content */}
                    <div className={cn("flex-1 px-6 py-8 lg:px-8", className)}>
                        {children}
                    </div>

                    {/* Footer */}
                    {showFooter && (
                        <footer className="border-t border-neutral-200 bg-white py-6 dark:border-neutral-800 dark:bg-neutral-950">
                            <div className="px-6 lg:px-8">
                                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                    <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                                        © {new Date().getFullYear()} FormationPage. Tous droits réservés.
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <a
                                            href="/terms"
                                            className="text-[13px] text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                                        >
                                            Conditions
                                        </a>
                                        <a
                                            href="/privacy"
                                            className="text-[13px] text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                                        >
                                            Confidentialité
                                        </a>
                                        <a
                                            href="/support"
                                            className="text-[13px] text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                                        >
                                            Support
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    )}
                </div>
            </main>
        </div>
    );
}
