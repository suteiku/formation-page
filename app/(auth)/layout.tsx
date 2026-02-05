import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

// AuthLayout - Responsive fixed using flex-col and native width classes

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white lg:bg-neutral-50">
            <div className="flex min-h-screen">
                {/* Left side - Form */}
                <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm">
                        <div className="mb-8">
                            <Link href="/" className="flex items-center space-x-2">
                                <GraduationCap className="h-8 w-8 text-indigo-600" />
                                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    FormationPage
                                </span>
                            </Link>
                        </div>
                        {children}
                    </div>
                </div>

                {/* Right side - Illustration (desktop only) */}
                <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
                    <div className="relative z-10 text-center text-white max-w-md px-8">
                        <h2 className="text-3xl font-bold mb-4">
                            Créez votre formation en 10 minutes
                        </h2>
                        <p className="text-lg text-white/90">
                            Page de vente, paiements, espace membre - tout est inclus.
                            Concentrez-vous sur votre contenu, on s'occupe du reste.
                        </p>
                    </div>
                    {/* Pattern decoration */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                            backgroundSize: '20px 20px'
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
