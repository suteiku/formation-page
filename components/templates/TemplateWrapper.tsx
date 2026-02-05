'use client'

import { TemplateProps, TemplateType } from '@/types/templates'
import { MinimalistTemplate } from './minimalist/MinimalistTemplate'
import { BoldTemplate } from './bold/BoldTemplate'
import { PremiumTemplate } from './premium/PremiumTemplate'

interface TemplateWrapperProps extends TemplateProps {
    templateType?: TemplateType
}

export function TemplateWrapper({ templateType = 'minimalist', ...props }: TemplateWrapperProps) {
    switch (templateType) {
        case 'bold':
            return <BoldTemplate {...props} />
        case 'premium':
            return <PremiumTemplate {...props} />
        case 'minimalist':
        default:
            return <MinimalistTemplate {...props} />
    }
}
