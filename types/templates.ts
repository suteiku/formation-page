export type TemplateType = 'minimalist' | 'bold' | 'premium'

export interface TemplateColors {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
}

export interface TemplateFonts {
    heading: string
    body: string
}

export interface SectionConfig {
    enabled: boolean
    order: number
}

export interface TemplateConfig {
    template: TemplateType
    colors: TemplateColors
    fonts: TemplateFonts
    sections: {
        hero: SectionConfig
        benefits: SectionConfig
        curriculum: SectionConfig
        testimonials: SectionConfig
        faq: SectionConfig
        pricing: SectionConfig
    }
}

export interface Formation {
    id: string
    title: string
    pitch: string
    description: string
    targetAudience?: string
    price: number
    coverImage?: string
    primaryColor?: string
    creator: {
        name: string
        username: string
    }
    modules: Array<{
        id: string
        title: string
        description?: string
        order: number
        lessons: Array<{
            id: string
            title: string
            duration?: number
        }>
    }>
    testimonials: Array<{
        id: string
        name: string
        content: string
    }>
    totalStudents: number
}

export interface TemplateProps {
    formation: Formation
    config?: Partial<TemplateConfig>
}
