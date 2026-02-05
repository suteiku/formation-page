'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import {
    ArrowLeft,
    ArrowRight,
    Loader2,
    Image as ImageIcon,
    Trash2,
    Plus,
} from 'lucide-react'

const formationSchema = z.object({
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
    price: z.number().min(0, 'Le prix doit être positif'),
    coverImage: z.string().url('URL de l\'image invalide').or(z.literal('')),
    pitch: z.string().min(10, 'Le pitch doit contenir au moins 10 caractères'),
    description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
    targetAudience: z.string().optional(),
    primaryColor: z.string().optional(),
    modules: z.array(z.object({
        title: z.string().min(1, 'Le titre du module est requis'),
        description: z.string().optional(),
    })).min(1, 'Ajoutez au moins un module'),
    testimonials: z.array(z.object({
        name: z.string(),
        content: z.string(),
    })).optional(),
})

type FormationInput = z.infer<typeof formationSchema>

const steps = [
    { id: 1, name: 'Les bases', description: 'Nom, prix et image' },
    { id: 2, name: 'Description', description: 'Pitch et détails' },
    { id: 3, name: 'Programme', description: 'Modules de la formation' },
    { id: 4, name: 'Témoignages', description: 'Avis clients (optionnel)' },
    { id: 5, name: 'Publication', description: 'Vérification finale' },
]

export default function NewFormationPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [modules, setModules] = useState([{ title: '', description: '' }])
    const [testimonials, setTestimonials] = useState<{ name: string; content: string }[]>([])

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm<FormationInput>({
        resolver: zodResolver(formationSchema),
        defaultValues: {
            title: '',
            price: 97,
            coverImage: '',
            pitch: '',
            description: '',
            targetAudience: '',
            primaryColor: '#6366f1',
            modules: [{ title: '', description: '' }],
            testimonials: [],
        },
    })

    const watchedValues = watch()

    const nextStep = async () => {
        let fieldsToValidate: (keyof FormationInput)[] = []

        switch (currentStep) {
            case 1:
                fieldsToValidate = ['title', 'price']
                break
            case 2:
                fieldsToValidate = ['pitch', 'description']
                break
            case 3:
                // Validate modules
                if (modules.every(m => m.title.trim() === '')) {
                    toast.error('Ajoutez au moins un module avec un titre')
                    return
                }
                break
        }

        if (fieldsToValidate.length > 0) {
            const isValid = await trigger(fieldsToValidate)
            if (!isValid) return
        }

        setCurrentStep((prev) => Math.min(prev + 1, 5))
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const addModule = () => {
        setModules([...modules, { title: '', description: '' }])
    }

    const removeModule = (index: number) => {
        if (modules.length > 1) {
            setModules(modules.filter((_, i) => i !== index))
        }
    }

    const updateModule = (index: number, field: 'title' | 'description', value: string) => {
        const newModules = [...modules]
        newModules[index][field] = value
        setModules(newModules)
    }

    const addTestimonial = () => {
        setTestimonials([...testimonials, { name: '', content: '' }])
    }

    const removeTestimonial = (index: number) => {
        setTestimonials(testimonials.filter((_, i) => i !== index))
    }

    const updateTestimonial = (index: number, field: 'name' | 'content', value: string) => {
        const newTestimonials = [...testimonials]
        newTestimonials[index][field] = value
        setTestimonials(newTestimonials)
    }

    const onSubmit = async (data: FormationInput) => {
        setIsLoading(true)

        try {
            // Create formation
            const response = await fetch('/api/formations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.title,
                    pitch: data.pitch,
                    description: data.description,
                    targetAudience: data.targetAudience,
                    price: data.price,
                    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
                    primaryColor: data.primaryColor,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create formation')
            }

            const { formation } = await response.json()

            // Create modules
            for (let i = 0; i < modules.length; i++) {
                const mod = modules[i]
                if (mod.title.trim()) {
                    await fetch('/api/lessons', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'module',
                            formationId: formation.id,
                            title: mod.title,
                            description: mod.description,
                            order: i,
                        }),
                    })
                }
            }

            toast.success('Formation créée avec succès ! 🎉')
            router.push(`/dashboard/formations/${formation.id}`)
        } catch (error) {
            toast.error('Erreur lors de la création')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Créer une formation</h1>
                <p className="text-gray-600 mt-1">
                    Remplissez les informations ci-dessous pour créer votre formation
                </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`text-sm ${currentStep >= step.id ? 'text-indigo-600' : 'text-gray-400'
                                }`}
                        >
                            {step.name}
                        </div>
                    ))}
                </div>
                <Progress value={(currentStep / 5) * 100} className="h-2" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>{steps[currentStep - 1].name}</CardTitle>
                        <p className="text-sm text-gray-500">
                            {steps[currentStep - 1].description}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Step 1: Les bases */}
                        {currentStep === 1 && (
                            <>
                                <div>
                                    <Label htmlFor="title">Nom de la formation *</Label>
                                    <Input
                                        id="title"
                                        {...register('title')}
                                        className="mt-1"
                                        placeholder="Ex: Yoga pour Débutants - 30 jours"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="price">Prix (en €) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        {...register('price', { valueAsNumber: true })}
                                        className="mt-1"
                                        placeholder="97"
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="coverImage">URL de l&apos;image de couverture</Label>
                                    <Input
                                        id="coverImage"
                                        {...register('coverImage')}
                                        className="mt-1"
                                        placeholder="https://..."
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Format recommandé : 1200x630px
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="primaryColor">Couleur principale</Label>
                                    <div className="mt-1 flex items-center gap-3">
                                        <input
                                            type="color"
                                            id="primaryColor"
                                            {...register('primaryColor')}
                                            className="h-10 w-10 rounded cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-500">
                                            {watchedValues.primaryColor}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 2: Description */}
                        {currentStep === 2 && (
                            <>
                                <div>
                                    <Label htmlFor="pitch">Pitch de la formation (1-2 phrases) *</Label>
                                    <Textarea
                                        id="pitch"
                                        {...register('pitch')}
                                        className="mt-1"
                                        placeholder="Décrivez votre formation en quelques mots accrocheurs..."
                                        rows={2}
                                    />
                                    {errors.pitch && (
                                        <p className="mt-1 text-sm text-red-500">{errors.pitch.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">
                                        Ce que vos élèves vont apprendre *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        {...register('description')}
                                        className="mt-1"
                                        placeholder="• Apprenez les bases du yoga&#10;• Développez votre flexibilité&#10;• Trouvez votre équilibre intérieur"
                                        rows={6}
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="targetAudience">À qui s&apos;adresse cette formation ?</Label>
                                    <Textarea
                                        id="targetAudience"
                                        {...register('targetAudience')}
                                        className="mt-1"
                                        placeholder="Cette formation est parfaite pour les débutants qui souhaitent..."
                                        rows={3}
                                    />
                                </div>
                            </>
                        )}

                        {/* Step 3: Modules */}
                        {currentStep === 3 && (
                            <>
                                <p className="text-sm text-gray-600">
                                    Définissez les modules de votre formation. Vous pourrez ajouter le
                                    contenu (vidéos, PDFs) après la création.
                                </p>

                                <div className="space-y-4">
                                    {modules.map((module, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border rounded-lg bg-gray-50 space-y-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Label>Module {index + 1}</Label>
                                                {modules.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeModule(index)}
                                                        className="text-red-500 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            <Input
                                                placeholder="Titre du module"
                                                value={module.title}
                                                onChange={(e) => updateModule(index, 'title', e.target.value)}
                                            />
                                            <Textarea
                                                placeholder="Description (optionnel)"
                                                value={module.description}
                                                onChange={(e) => updateModule(index, 'description', e.target.value)}
                                                rows={2}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addModule}
                                    className="w-full"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Ajouter un module
                                </Button>
                            </>
                        )}

                        {/* Step 4: Témoignages */}
                        {currentStep === 4 && (
                            <>
                                <p className="text-sm text-gray-600">
                                    Ajoutez des témoignages de clients pour renforcer la crédibilité de
                                    votre formation. Cette étape est optionnelle.
                                </p>

                                {testimonials.length === 0 ? (
                                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                                        <p className="text-gray-500 mb-4">Aucun témoignage ajouté</p>
                                        <Button type="button" variant="outline" onClick={addTestimonial}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Ajouter un témoignage
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {testimonials.map((testimonial, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border rounded-lg bg-gray-50 space-y-3"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <Label>Témoignage {index + 1}</Label>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeTestimonial(index)}
                                                        className="text-red-500 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <Input
                                                    placeholder="Nom"
                                                    value={testimonial.name}
                                                    onChange={(e) =>
                                                        updateTestimonial(index, 'name', e.target.value)
                                                    }
                                                />
                                                <Textarea
                                                    placeholder="Témoignage"
                                                    value={testimonial.content}
                                                    onChange={(e) =>
                                                        updateTestimonial(index, 'content', e.target.value)
                                                    }
                                                    rows={3}
                                                />
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addTestimonial}
                                            className="w-full"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Ajouter un témoignage
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Step 5: Récapitulatif */}
                        {currentStep === 5 && (
                            <>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-3">Récapitulatif</h3>
                                        <dl className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Titre</dt>
                                                <dd className="font-medium">{watchedValues.title}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Prix</dt>
                                                <dd className="font-medium">{watchedValues.price}€</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Modules</dt>
                                                <dd className="font-medium">
                                                    {modules.filter((m) => m.title.trim()).length}
                                                </dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-gray-500">Témoignages</dt>
                                                <dd className="font-medium">{testimonials.length}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <p className="text-sm text-gray-600">
                                        Votre formation sera créée en mode brouillon. Vous pourrez ajouter
                                        du contenu (vidéos, PDFs) et la publier ensuite.
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Précédent
                    </Button>

                    {currentStep < 5 ? (
                        <Button type="button" onClick={nextStep}>
                            Suivant
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Création...
                                </>
                            ) : (
                                'Créer la formation'
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
