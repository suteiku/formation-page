import { TemplateConfig } from '@/types/templates'

export const defaultMinimalistConfig: TemplateConfig = {
    template: 'minimalist',
    colors: {
        primary: '#6366f1', // Indigo
        secondary: '#8b5cf6', // Purple
        accent: '#ec4899', // Pink
        background: '#ffffff',
        text: '#1f2937',
    },
    fonts: {
        heading: 'Inter',
        body: 'Inter',
    },
    sections: {
        hero: { enabled: true, order: 1 },
        benefits: { enabled: true, order: 2 },
        curriculum: { enabled: true, order: 3 },
        testimonials: { enabled: true, order: 4 },
        faq: { enabled: true, order: 5 },
        pricing: { enabled: true, order: 6 },
    },
}

export const defaultBoldConfig: TemplateConfig = {
    template: 'bold',
    colors: {
        primary: '#f59e0b', // Amber
        secondary: '#ef4444', // Red
        accent: '#8b5cf6', // Purple
        background: '#0f172a', // Slate dark
        text: '#f8fafc',
    },
    fonts: {
        heading: 'Outfit',
        body: 'Inter',
    },
    sections: {
        hero: { enabled: true, order: 1 },
        benefits: { enabled: true, order: 2 },
        curriculum: { enabled: true, order: 3 },
        testimonials: { enabled: true, order: 4 },
        faq: { enabled: true, order: 5 },
        pricing: { enabled: true, order: 6 },
    },
}

export const defaultPremiumConfig: TemplateConfig = {
    template: 'premium',
    colors: {
        primary: '#d4af37', // Gold
        secondary: '#1f2937', // Dark gray
        accent: '#d4af37',
        background: '#0a0a0a',
        text: '#f9fafb',
    },
    fonts: {
        heading: 'Playfair Display',
        body: 'Inter',
    },
    sections: {
        hero: { enabled: true, order: 1 },
        benefits: { enabled: true, order: 2 },
        curriculum: { enabled: true, order: 3 },
        testimonials: { enabled: true, order: 4 },
        faq: { enabled: true, order: 5 },
        pricing: { enabled: true, order: 6 },
    },
}
