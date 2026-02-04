import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t bg-gray-50">
            <div className="container py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <GraduationCap className="h-6 w-6 text-indigo-600" />
                            <span className="font-bold text-lg">FormationPage</span>
                        </Link>
                        <p className="text-sm text-gray-600">
                            Créez et vendez vos formations en ligne en moins de 10 minutes.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Produit</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link href="/#features" className="hover:text-indigo-600">
                                    Fonctionnalités
                                </Link>
                            </li>
                            <li>
                                <Link href="/#pricing" className="hover:text-indigo-600">
                                    Tarifs
                                </Link>
                            </li>
                            <li>
                                <Link href="/#testimonials" className="hover:text-indigo-600">
                                    Témoignages
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Ressources</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link href="/help" className="hover:text-indigo-600">
                                    Centre d&apos;aide
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-indigo-600">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-indigo-600">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Légal</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link href="/privacy" className="hover:text-indigo-600">
                                    Confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-indigo-600">
                                    CGU
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal" className="hover:text-indigo-600">
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} FormationPage. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
