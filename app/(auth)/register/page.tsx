'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    const username = watch('username', '')

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                toast.error(result.error || 'Une erreur est survenue')
                return
            }

            // Auto login after registration
            const signInResult = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (signInResult?.error) {
                toast.error('Compte créé mais erreur de connexion')
                router.push('/login')
                return
            }

            toast.success('Bienvenue sur FormationPage ! 🎉')
            router.push('/dashboard')
            router.refresh()
        } catch (error) {
            toast.error('Une erreur est survenue')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Créer un compte</h2>
            <p className="mt-2 text-sm text-gray-600">
                Déjà inscrit ?{' '}
                <Link
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Se connecter
                </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        {...register('name')}
                        className="mt-1"
                        placeholder="Marie Dupont"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register('email')}
                        className="mt-1"
                        placeholder="vous@exemple.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                    <div className="mt-1 flex rounded-md">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            formationpage.com/
                        </span>
                        <Input
                            id="username"
                            type="text"
                            {...register('username')}
                            className="rounded-l-none"
                            placeholder="marie"
                        />
                    </div>
                    {username && (
                        <p className="mt-1 text-sm text-gray-500">
                            Votre URL sera : formationpage.com/{username}
                        </p>
                    )}
                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        {...register('password')}
                        className="mt-1"
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Création du compte...
                        </>
                    ) : (
                        'Créer mon compte'
                    )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    En créant un compte, vous acceptez nos{' '}
                    <Link href="/terms" className="text-indigo-600 hover:underline">
                        conditions d&apos;utilisation
                    </Link>{' '}
                    et notre{' '}
                    <Link href="/privacy" className="text-indigo-600 hover:underline">
                        politique de confidentialité
                    </Link>
                    .
                </p>
            </form>
        </div>
    )
}
