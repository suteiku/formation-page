'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    trend?: {
        value: number
        isPositive: boolean
    }
    gradientFrom?: string
    gradientTo?: string
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    gradientFrom = 'from-purple-500',
    gradientTo = 'to-pink-500'
}: StatsCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative group"
        >
            {/* Gradient border effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300`} />

            {/* Card content */}
            <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
                        <p className="text-4xl font-bold text-white mb-1">{value}</p>

                        {trend && (
                            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                <span>{trend.isPositive ? '↑' : '↓'}</span>
                                <span className="font-medium">{Math.abs(trend.value)}%</span>
                                <span className="text-gray-500">vs dernier mois</span>
                            </div>
                        )}
                    </div>

                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
            </div>
        </motion.div>
    )
}
