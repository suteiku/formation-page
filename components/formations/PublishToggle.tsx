'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface PublishToggleProps {
    formationId: string
    initialPublished: boolean
}

export function PublishToggle({ formationId, initialPublished }: PublishToggleProps) {
    const router = useRouter()
    const [isPublished, setIsPublished] = useState(initialPublished)
    const [isLoading, setIsLoading] = useState(false)

    const handleToggle = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/formations/${formationId}/publish`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ published: !isPublished }),
            })

            if (!response.ok) {
                throw new Error('Failed to update publication status')
            }

            const data = await response.json()
            setIsPublished(data.published)

            toast.success(
                data.published
                    ? '✅ Formation publiée ! Elle est maintenant visible publiquement.'
                    : '📝 Formation mise en brouillon.'
            )

            router.refresh()
        } catch (error) {
            toast.error('Erreur lors de la mise à jour')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleToggle}
            disabled={isLoading}
            variant={isPublished ? 'outline' : 'default'}
            size="sm"
            className="gap-2"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Globe className="h-4 w-4" />
            )}
            {isLoading ? 'Mise à jour...' : isPublished ? 'Dépublier' : 'Publier'}
        </Button>
    )
}
