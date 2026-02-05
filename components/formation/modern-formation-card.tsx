'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eye, Users, TrendingUp, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ModernFormationCardProps {
    id: string
    title: string
    description: string
    price: number
    coverImage?: string | null
    published: boolean
    studentCount?: number
    revenue?: number
}

export function ModernFormationCard({
    id,
    title,
    description,
    price,
    coverImage,
    published,
    studentCount = 0,
    revenue = 0
}: ModernFormationCardProps) {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(price)
    }

    return (
        <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg hover:border-indigo-200">
            {/* IMAGE HEADER */}
            <div className="relative h-48 w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100" />
                        </div>
                    </div>
                )}

                {/* STATUS BADGE */}
                <div className="absolute top-4 right-4">
                    <span className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm backdrop-blur-md border",
                        published
                            ? "bg-white/95 text-emerald-700 border-emerald-200"
                            : "bg-slate-900/90 text-white border-transparent"
                    )}>
                        {published ? 'Publié' : 'Brouillon'}
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {description || "Aucune description disponible."}
                </p>

                {/* METRICS */}
                <div className="flex items-center gap-6 mb-5 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">{studentCount}</span>
                        <span className="text-xs text-slate-500">élèves</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-600">{formatPrice(revenue)}</span>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/formations/${id}/design`} className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full h-10 text-sm font-medium border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                        >
                            Gérer
                        </Button>
                    </Link>
                    <Link href={`/dashboard/formations/${id}`}>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
