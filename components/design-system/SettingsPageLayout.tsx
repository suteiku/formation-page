'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SettingsSectionProps {
    title: string
    description: string
    children: ReactNode
    icon?: ReactNode
}

export function SettingsSection({ title, description, children, icon }: SettingsSectionProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
                {icon && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-900">
                        {icon}
                    </div>
                )}
                <div>
                    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>

            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}

interface SettingsInputProps {
    label: string
    helperText?: string
    error?: string
    children: ReactNode
}

export function SettingsInput({ label, helperText, error, children }: SettingsInputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
                {label}
            </label>
            {children}
            {helperText && !error && (
                <p className="text-xs text-slate-500">{helperText}</p>
            )}
            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

export function SettingsButton({
    children,
    variant = 'primary',
    className,
    ...props
}: {
    children: ReactNode
    variant?: 'primary' | 'secondary'
    className?: string
} & Omit<HTMLMotionProps<"button">, "children" | "className" | "style">) {

    const variants = {
        primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
        secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
    }

    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
                "px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export function SettingsCollapsible({
    title,
    children
}: {
    title: string
    children: ReactNode
}) {
    return (
        <div className="border-l-2 border-slate-200 pl-4 py-2">
            <p className="text-sm font-semibold text-slate-700 mb-2">{title}</p>
            <div className="text-sm text-slate-500 space-y-2">
                {children}
            </div>
        </div>
    )
}
