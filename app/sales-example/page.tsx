"use client";

import { SalesPageHero } from "@/components/sales-page-hero";

export default function SalesExample() {
    return (
        <div className="min-h-screen">
            <SalesPageHero
                title="Maîtriser Next.js 15 en 30 jours"
                description="Devenez expert Next.js avec cette formation complète et créez des applications web modernes, performantes et scalables. Apprenez les meilleures pratiques et les techniques avancées utilisées par les meilleurs développeurs."
                price={199}
                originalPrice={299}
                coverMedia={{
                    type: "image",
                    url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=675&fit=crop",
                }}
                creator={{
                    name: "Bruno Crespo",
                    role: "Senior Full-stack Developer",
                    avatar: "https://ui-avatars.com/api/?name=Bruno+Crespo&background=4f46e5&color=fff&size=128",
                }}
                features={[
                    "42 modules vidéo en Full HD",
                    "Accès à vie à la formation",
                    "Projets pratiques inclus",
                    "Certificat de réussite",
                    "Support prioritaire 7j/7",
                    "Mises à jour gratuites à vie",
                    "Communauté privée Discord",
                    "Templates et ressources exclusives",
                ]}
                onPurchase={() => {
                    alert("Redirection vers Stripe Checkout...");
                    // window.location.href = "/checkout/formation-1";
                }}
            />

            {/* Additional sections (curriculum, testimonials, etc.) */}
            <section className="bg-white py-16 dark:bg-neutral-950">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="mb-8 text-center text-[32px] font-bold text-neutral-900 dark:text-neutral-50">
                        Ce que vous allez apprendre
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            "App Router et Server Components",
                            "Server Actions et Mutations",
                            "Streaming et Suspense",
                            "Optimisation des performances",
                            "Authentication avec NextAuth",
                            "Déploiement sur Vercel",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900"
                            >
                                <p className="text-[14px] font-medium text-neutral-900 dark:text-neutral-50">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
