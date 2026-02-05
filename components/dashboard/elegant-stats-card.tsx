import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ElegantStatsCardProps {
    icon: LucideIcon
    label: string
    value: string | number
    subValue?: string
    trend?: number
    intent?: 'primary' | 'success' | 'warning' | 'info'
}

export function ElegantStatsCard({
    icon: Icon,
    label,
    value,
    subValue,
    trend,
    intent = 'primary',
}: ElegantStatsCardProps) {

    const colors = {
        primary: "bg-indigo-50 text-indigo-600",
        success: "bg-emerald-50 text-emerald-600",
        warning: "bg-amber-50 text-amber-600",
        info: "bg-blue-50 text-blue-600",
    }

    return (
        <div className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-xl transition-all duration-200 group-hover:scale-105", colors[intent])}>
                    <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                {trend !== undefined && (
                    <div className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full",
                        trend > 0 ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                    )}>
                        {trend > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>

            <div>
                <p className="text-[13px] font-medium text-slate-600 uppercase tracking-wide mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-[28px] font-semibold text-slate-900 tracking-tight leading-none">{value}</h3>
                    {subValue && (
                        <span className="text-sm text-slate-500 font-normal">
                            {subValue}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
