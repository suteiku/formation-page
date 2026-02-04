import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    username: z
        .string()
        .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
        .max(20, 'Le nom d\'utilisateur doit contenir au maximum 20 caractères')
        .regex(
            /^[a-z0-9_-]+$/,
            'Le nom d\'utilisateur ne peut contenir que des lettres minuscules, chiffres, tirets et underscores'
        ),
    password: z
        .string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(1, 'Mot de passe requis'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
