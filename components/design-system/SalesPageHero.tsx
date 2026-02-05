'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Star } from 'lucide-react'

interface SalesPageHeroProps {
    title: string
    subtitle: string
    price: number
    rating?: number
    studentsCount?: number
    ctaText?: string
    onCtaClick?: () => void
}

export function SalesPageHero({
    title,
    subtitle,
    price,
    rating = 4.9,
    studentsCount = 1234,
    ctaText = "Commencer maintenant",
    onCtaClick
}: SalesPageHeroProps) {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950">
            {/* Animated gradient background */}
            <motion.div
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20"
                style={{ backgroundSize: '400% 400%' }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }} />

            {/* Floating orbs */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-8"
                    >
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-300">
                            {rating} ⭐ • {studentsCount.toLocaleString()} étudiants
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>

                    {/* Glass card with CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative inline-block"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-3xl blur-xl opacity-50" />

                        {/* Card */}
                        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Price */}
                                <div className="text-center md:text-left">
                                    <p className="text-sm text-gray-400 mb-1">Prix de lancement</p>
                                    <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        {price}€
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">Accès à vie</p>
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px h-20 bg-white/20" />

                                {/* CTAs */}
                                <div className="flex flex-col gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onCtaClick}
                                        className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-xl text-white font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 flex items-center gap-2"
                                    >
                                        {ctaText}
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300 flex items-center gap-2 justify-center"
                                    >
                                        <Play className="w-5 h-5" />
                                        Voir la démo
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Garantie 30 jours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <span>Support premium</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                            <span>Mises à jour gratuites</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
        </div>
    )
}
