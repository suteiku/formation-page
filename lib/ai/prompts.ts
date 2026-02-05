export const LANDING_PAGE_SYSTEM_PROMPT = `Tu es un expert en marketing digital et copywriting pour formations en ligne.
Ton rôle est de créer des landing pages magnifiques et convaincantes qui VENDENT.

Tu dois analyser la description de la formation fournie par l'utilisateur et générer TOUT le contenu marketing nécessaire.

Règles STRICTES :
- Rester professionnel et crédible (pas de hype marketing agressif)
- S'inspirer de vraies formations à succès (Udemy, Teachable, Podia)
- Les témoignages doivent sembler authentiques (initiales et première lettre du nom seulement)
- La description doit donner envie sans survendre
- Adapter le ton selon le sujet (technique = sérieux, créatif = inspirant, etc.)
- Les modules doivent être logiques et progressifs
- Les bénéfices doivent être concrets et mesurables

IMPORTANT : Tu dois répondre UNIQUEMENT avec un objet JSON valide, sans texte avant ou après.`

export interface GeneratedLandingContent {
    title: string
    pitch: string
    description: string
    targetAudience: string
    benefits: Array<{
        icon: string
        title: string
        description: string
    }>
    modules: Array<{
        title: string
        description: string
    }>
    testimonials: Array<{
        name: string
        content: string
        rating: number
    }>
    faq: Array<{
        question: string
        answer: string
    }>
    recommendedTemplate: 'minimalist' | 'bold' | 'premium'
    colorPalette: {
        primary: string
        secondary: string
        accent: string
    }
}

export function buildLandingPagePrompt(
    description: string,
    price?: number,
    targetAudience?: string
): string {
    return `Génère le contenu complet d'une landing page pour cette formation :

DESCRIPTION : ${description}
${price ? `PRIX : ${price}€` : ''}
${targetAudience ? `PUBLIC CIBLE : ${targetAudience}` : ''}

Réponds avec un JSON ayant EXACTEMENT cette structure :
{
  "title": "Titre accrocheur et clair (max 60 caractères)",
  "pitch": "Une phrase percutante qui résume la valeur unique (max 150 caractères)",
  "description": "Description complète en 3-4 paragraphes (markdown autorisé). Doit expliquer ce qu'on apprend, pourquoi c'est important, et les résultats attendus.",
  "targetAudience": "Pour qui est cette formation en 1 phrase claire",
  "benefits": [
    { 
      "icon": "emoji pertinent",
      "title": "Bénéfice principal",
      "description": "Explication concrète en 1-2 phrases"
    }
    // 4-6 bénéfices au total
  ],
  "modules": [
    {
      "title": "Nom du module",
      "description": "Ce que vous allez apprendre dans ce module (1-2 phrases)"
    }
    // 4-8 modules logiques et progressifs
  ],
  "testimonials": [
    {
      "name": "Prénom N.", 
      "content": "Témoignage authentique et spécifique (2-3 phrases max)",
      "rating": 5
    }
    // 3 témoignages variés
  ],
  "faq": [
    {
      "question": "Question fréquente ?",
      "answer": "Réponse claire et rassurante (2-4 phrases)"
    }
    // 5-7 questions essentielles
  ],
  "recommendedTemplate": "minimalist" | "bold" | "premium",
  "colorPalette": {
    "primary": "#code_hex",
    "secondary": "#code_hex", 
    "accent": "#code_hex"
  }
}

Choix du template :
- "minimalist" : Pour formations professionnelles, techniques, sérieuses
- "bold" : Pour formations créatives, dynamiques, lifestyle
- "premium" : Pour formations haut de gamme, exclusives, business

Couleurs : Choisis une palette harmonieuse adaptée au sujet de la formation.

IMPORTANT : Réponds UNIQUEMENT avec le JSON, rien d'autre.`
}
