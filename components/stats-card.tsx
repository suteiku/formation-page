import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: "default" | "revenue" | "students" | "sales" | "courses";
    className?: string;
}

const variantStyles = {
    default: {
        icon: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
        border: "border-neutral-200 dark:border-neutral-800",
    },
    revenue: {
        icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        border: "border-neutral-200 hover:border-emerald-200 dark:border-neutral-800 dark:hover:border-emerald-900",
    },
    students: {
        icon: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        border: "border-neutral-200 hover:border-blue-200 dark:border-neutral-800 dark:hover:border-blue-900",
    },
    sales: {
        icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
        border: "border-neutral-200 hover:border-violet-200 dark:border-neutral-800 dark:hover:border-violet-900",
    },
    courses: {
        icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
        border: "border-neutral-200 hover:border-amber-200 dark:border-neutral-800 dark:hover:border-amber-900",
    },
};

export function StatsCard({
    icon: Icon,
    label,
    value,
    trend,
    variant = "default",
    className,
}: StatsCardProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border bg-white p-6 transition-all duration-200 hover:shadow-sm dark:bg-neutral-950",
                styles.border,
                className
            )}
        >
            {/* Content */}
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    {/* Icon */}
                    <div
                        className={cn(
                            "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
                            styles.icon
                        )}
                    >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>

                    {/* Label */}
                    <p className="mb-1 text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
                        {label}
                    </p>

                    {/* Value */}
                    <p className="text-[28px] font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-50">
                        {value}
                    </p>
                </div>

                {/* Trend indicator */}
                {trend && (
                    <div
                        className={cn(
                            "flex items-center gap-1 rounded-full px-2 py-1 text-[12px] font-medium",
                            trend.isPositive
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                        )}
                    >
                        {trend.isPositive ? (
                            <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                        ) : (
                            <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
                        )}
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>

            {/* Subtle hover effect line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-transparent via-neutral-900 to-transparent transition-transform duration-300 group-hover:scale-x-100 dark:via-neutral-50" />
        </div>
    );
}
