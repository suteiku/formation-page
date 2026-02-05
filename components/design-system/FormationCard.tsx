'use client'

import { motion } from 'framer-motion'
import { Eye, Users, TrendingUp, Edit } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface FormationCardProps {
    id: string
    title: string
    description: string
    price: number
    coverImage?: string
    published: boolean
    stats: {
        students: number
        views: number
        revenue: number
    }
}

export function FormationCard({
    id,
    title,
    description,
    price,
    coverImage,
    published,
    stats
}: FormationCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative"
        >
            {/* Gradient glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />

            {/* Card */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 overflow-hidden">
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-6xl opacity-20">📚</div>
                        </div>
                    )}

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                        {published ? (
                            <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg">
                                ✓ Publié
                            </span>
                        ) : (
                            <span className="px-3 py-1 text-xs font-bold bg-gray-800/80 backdrop-blur text-gray-300 rounded-full">
                                Brouillon
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{stats.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{stats.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{stats.revenue}€</span>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                            <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                                {price}€
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Link href={`/dashboard/formations/${id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-300"
                                >
                                    Voir
                                </motion.button>
                            </Link>

                            <Link href={`/dashboard/formations/${id}/design`}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-lg text-white text-sm font-medium shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Éditer
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
            </div>
        </motion.div>
    )
}
