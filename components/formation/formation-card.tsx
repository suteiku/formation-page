'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, Eye, Pencil } from 'lucide-react'

interface FormationCardProps {
    formation: {
        id: string
        title: string
        slug: string
        pitch: string
        price: number
        coverImage: string
        published: boolean
        _count?: {
            purchases: number
            modules: number
        }
        creator?: {
            username: string
            name: string
        }
    }
    isOwner?: boolean
}

export function FormationCard({ formation, isOwner = false }: FormationCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(price)
    }

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
                {formation.coverImage ? (
                    <Image
                        src={formation.coverImage}
                        alt={formation.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-white/80" />
                    </div>
                )}
                {!formation.published && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                        Brouillon
                    </Badge>
                )}
            </div>

            <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">{formation.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{formation.pitch}</p>

                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    {formation._count && (
                        <>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{formation._count.purchases} élèves</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{formation._count.modules} modules</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-4">
                    <span className="text-2xl font-bold text-indigo-600">
                        {formatPrice(formation.price)}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex gap-2">
                {isOwner ? (
                    <>
                        <Link href={`/dashboard/formations/${formation.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                                <Pencil className="h-4 w-4 mr-2" />
                                Modifier
                            </Button>
                        </Link>
                        <Link
                            href={`/${formation.creator?.username}/${formation.slug}`}
                            target="_blank"
                            className="flex-1"
                        >
                            <Button variant="secondary" className="w-full">
                                <Eye className="h-4 w-4 mr-2" />
                                Voir
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Link
                        href={`/${formation.creator?.username}/${formation.slug}`}
                        className="w-full"
                    >
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                            Voir la formation
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    )
}
