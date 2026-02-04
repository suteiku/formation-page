'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft,
    Plus,
    GripVertical,
    Trash2,
    Edit,
    PlayCircle,
    FileText,
    ExternalLink,
    Save,
} from 'lucide-react'
import { toast } from 'sonner'

interface Lesson {
    id: string
    title: string
    type: 'VIDEO' | 'PDF' | 'LINK' | 'TEXT'
    order: number
    videoUrl?: string | null
    pdfUrl?: string | null
    linkUrl?: string | null
    content?: string | null
}

interface Module {
    id: string
    title: string
    description?: string | null
    order: number
    lessons: Lesson[]
}

interface Formation {
    id: string
    title: string
    modules: Module[]
}

interface Props {
    formation: Formation
}

export default function ContentEditor({ formation }: Props) {
    const router = useRouter()
    const [modules, setModules] = useState<Module[]>(formation.modules)
    const [isLoading, setIsLoading] = useState(false)
    const [newModuleTitle, setNewModuleTitle] = useState('')

    const addModule = async () => {
        if (!newModuleTitle.trim()) return

        setIsLoading(true)
        try {
            const res = await fetch('/api/modules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formationId: formation.id,
                    title: newModuleTitle,
                }),
            })

            if (!res.ok) throw new Error('Failed to create module')

            const newModule = await res.json()
            setModules([...modules, { ...newModule, lessons: [] }])
            setNewModuleTitle('')
            toast.success('Module ajouté')
        } catch (error) {
            toast.error('Erreur lors de l\'ajout du module')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteModule = async (moduleId: string) => {
        if (!confirm('Supprimer ce module et toutes ses leçons ?')) return

        setIsLoading(true)
        try {
            const res = await fetch(`/api/modules/${moduleId}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete module')

            setModules(modules.filter((m) => m.id !== moduleId))
            toast.success('Module supprimé')
        } catch (error) {
            toast.error('Erreur lors de la suppression')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const addLesson = async (moduleId: string, type: Lesson['type']) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/lessons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    moduleId,
                    title: `Nouvelle ${type === 'VIDEO' ? 'vidéo' : type === 'PDF' ? 'PDF' : 'leçon'}`,
                    type,
                }),
            })

            if (!res.ok) throw new Error('Failed to create lesson')

            const newLesson = await res.json()
            setModules(
                modules.map((m) =>
                    m.id === moduleId
                        ? { ...m, lessons: [...m.lessons, newLesson] }
                        : m
                )
            )
            toast.success('Leçon ajoutée')
        } catch (error) {
            toast.error('Erreur lors de l\'ajout')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteLesson = async (moduleId: string, lessonId: string) => {
        if (!confirm('Supprimer cette leçon ?')) return

        setIsLoading(true)
        try {
            const res = await fetch(`/api/lessons/${lessonId}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete lesson')

            setModules(
                modules.map((m) =>
                    m.id === moduleId
                        ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
                        : m
                )
            )
            toast.success('Leçon supprimée')
        } catch (error) {
            toast.error('Erreur lors de la suppression')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getLessonIcon = (type: Lesson['type']) => {
        switch (type) {
            case 'VIDEO':
                return <PlayCircle className="h-4 w-4" />
            case 'PDF':
                return <FileText className="h-4 w-4" />
            case 'LINK':
                return <ExternalLink className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/dashboard/formations/${formation.id}`}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gérer le Contenu
                        </h1>
                        <p className="text-gray-600">{formation.title}</p>
                    </div>
                </div>
                <Button onClick={() => router.refresh()}>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                </Button>
            </div>

            {/* Add Module */}
            <Card>
                <CardHeader>
                    <CardTitle>Ajouter un Module</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Titre du module (ex: Introduction)"
                            value={newModuleTitle}
                            onChange={(e) => setNewModuleTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addModule()}
                        />
                        <Button onClick={addModule} disabled={isLoading || !newModuleTitle.trim()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Modules List */}
            <div className="space-y-4">
                {modules.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <p className="text-gray-500">Aucun module</p>
                            <p className="text-sm text-gray-400">
                                Ajoutez votre premier module ci-dessus
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    modules.map((module, index) => (
                        <Card key={module.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                                        <div>
                                            <CardTitle className="text-lg">
                                                Module {index + 1}: {module.title}
                                            </CardTitle>
                                            {module.description && (
                                                <p className="text-sm text-gray-500">{module.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteModule(module.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Lessons */}
                                <div className="space-y-2 mb-4">
                                    {module.lessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                                        >
                                            <div className="flex items-center gap-3">
                                                <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                                                {getLessonIcon(lesson.type)}
                                                <span>{lesson.title}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {lesson.type}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => deleteLesson(module.id, lesson.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Lesson Buttons */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addLesson(module.id, 'VIDEO')}
                                        disabled={isLoading}
                                    >
                                        <PlayCircle className="h-4 w-4 mr-2" />
                                        Vidéo
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addLesson(module.id, 'PDF')}
                                        disabled={isLoading}
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        PDF
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addLesson(module.id, 'LINK')}
                                        disabled={isLoading}
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Lien
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
