import { z } from 'zod'

export const formationSchema = z.object({
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
    pitch: z.string().min(10, 'Le pitch doit contenir au moins 10 caractères'),
    description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
    targetAudience: z.string().optional(),
    price: z.number().min(0, 'Le prix doit être positif'),
    coverImage: z.string().url('URL de l\'image invalide'),
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide').optional(),
})

export const moduleSchema = z.object({
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
    description: z.string().optional(),
    order: z.number().int().min(0),
})

export const lessonSchema = z.object({
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
    description: z.string().optional(),
    type: z.enum(['VIDEO', 'PDF', 'LINK']),
    content: z.string().min(1, 'Le contenu est requis'),
    duration: z.number().int().min(0).optional(),
    order: z.number().int().min(0),
})

export const testimonialSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    content: z.string().min(10, 'Le témoignage doit contenir au moins 10 caractères'),
    avatar: z.string().url().optional(),
})

export type FormationInput = z.infer<typeof formationSchema>
export type ModuleInput = z.infer<typeof moduleSchema>
export type LessonInput = z.infer<typeof lessonSchema>
export type TestimonialInput = z.infer<typeof testimonialSchema>
