import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <GraduationCap className="h-10 w-10 text-indigo-600" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                FormationPage
                            </span>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>

            {/* Right side - Illustration */}
            <div className="hidden lg:block relative w-0 flex-1">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center text-white max-w-md">
                            <h2 className="text-3xl font-bold mb-4">
                                Créez votre formation en 10 minutes
                            </h2>
                            <p className="text-lg text-white/80">
                                Page de vente, paiements, espace membre - tout est inclus.
                                Concentrez-vous sur votre contenu, on s&apos;occupe du reste.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
