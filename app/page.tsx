import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  CreditCard,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white py-20 lg:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 inline-flex items-center rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm text-indigo-600 shadow-sm">
                <Zap className="mr-2 h-4 w-4" />
                Lancez-vous en moins de 10 minutes
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Créez et vendez votre{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  formation en ligne
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 lg:text-xl">
                Page de vente automatique, paiements sécurisés, espace membre inclus.
                Tout ce dont vous avez besoin pour réussir, au même endroit.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6"
                  >
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/#how-it-works">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    Comment ça marche ?
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                ✓ Gratuit pour démarrer · ✓ Aucune carte requise
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tout ce dont vous avez besoin,
                <br />
                au même endroit
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Plus besoin de jongler entre 10 outils différents
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-indigo-100 p-3">
                  <GraduationCap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Page de vente automatique
                </h3>
                <p className="mt-2 text-gray-600">
                  Votre page de vente est générée automatiquement. Belle, professionnelle,
                  et optimisée pour la conversion.
                </p>
              </div>

              <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-green-100 p-3">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Paiements sécurisés
                </h3>
                <p className="mt-2 text-gray-600">
                  Recevez vos paiements directement sur votre compte. Stripe gère
                  tout pour vous en toute sécurité.
                </p>
              </div>

              <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-purple-100 p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Espace membre inclus
                </h3>
                <p className="mt-2 text-gray-600">
                  Vos élèves accèdent à leur formation dans un espace dédié. Vidéos,
                  PDFs, progression - tout est géré.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 lg:py-32 bg-gray-50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Comment ça marche ?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                3 étapes simples pour vendre votre première formation
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Créez votre formation
                </h3>
                <p className="mt-2 text-gray-600">
                  Remplissez un formulaire simple : titre, description, prix.
                  Votre page de vente est prête !
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Partagez votre lien
                </h3>
                <p className="mt-2 text-gray-600">
                  Diffusez votre lien sur les réseaux sociaux, par email,
                  ou où vous voulez.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Recevez vos paiements
                </h3>
                <p className="mt-2 text-gray-600">
                  Les paiements arrivent directement sur votre compte.
                  Vos élèves accèdent automatiquement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Ils l&apos;utilisent déjà
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Des centaines de formateurs nous font confiance
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-8">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">
                  &quot;J&apos;ai créé ma première formation en 8 minutes ! Plus besoin de
                  gérer 10 outils différents. Tout est simple et efficace.&quot;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold">S</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Sophie Martin</p>
                    <p className="text-sm text-gray-500">Coach Yoga</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">
                  &quot;Les paiements sont automatiques, les élèves reçoivent leurs
                  accès immédiatement. Je peux me concentrer sur mon contenu.&quot;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Marc Dupont</p>
                    <p className="text-sm text-gray-500">Formateur Marketing</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">
                  &quot;Enfin une solution tout-en-un qui marche vraiment. Interface
                  propre, pas de bugs, et un support réactif.&quot;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">J</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Julie Rousseau</p>
                    <p className="text-sm text-gray-500">Experte Finance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 lg:py-32 bg-gray-50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Un tarif simple et transparent
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Gratuit pour démarrer, payez seulement quand vous vendez
              </p>
            </div>

            <div className="mt-16 mx-auto max-w-md">
              <div className="rounded-2xl border-2 border-indigo-600 bg-white p-8 shadow-xl">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Gratuit pour commencer
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Seulement 5% de commission sur vos ventes
                  </p>
                </div>

                <ul className="mt-8 space-y-4">
                  {[
                    'Formations illimitées',
                    'Pages de vente générées',
                    'Paiements Stripe intégrés',
                    'Espace membre inclus',
                    'Emails automatiques',
                    'Tableau de bord complet',
                    'Support par email',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href="/register">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg">
                      Commencer gratuitement
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="mt-3 text-center text-sm text-gray-500">
                    Aucune carte bancaire requise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32 bg-indigo-600">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Prêt à lancer votre formation ?
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Rejoignez des centaines de formateurs qui nous font confiance
              </p>
              <div className="mt-10">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-indigo-50 text-lg px-8 py-6"
                  >
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
