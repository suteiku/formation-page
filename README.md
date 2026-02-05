    # FormationPage MVP

    Plateforme tout-en-un pour créer et vendre des formations en ligne en moins de 10 minutes.

    ## 🚀 Fonctionnalités

    - **Page de vente automatique** - Générée automatiquement avec votre contenu
    - **Paiements sécurisés** - Stripe + Stripe Connect pour les paiements directs
    - **Espace membre** - Accès dédié pour vos élèves
    - **Suivi de progression** - Vos élèves voient leur avancement
    - **Emails automatiques** - Bienvenue + notifications de vente

    ## 📦 Stack Technique

    - **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
    - **UI**: Shadcn/ui
    - **Backend**: Next.js API Routes
    - **Database**: PostgreSQL + Prisma 7
    - **Auth**: NextAuth.js
    - **Paiements**: Stripe + Stripe Connect
    - **Emails**: Resend

    ## 🔧 Installation

    ### 1. Cloner le projet

    ```bash
    cd formation-page
    npm install
    ```

    ### 2. Configurer les variables d'environnement

    Copier `.env.example` vers `.env.local` et remplir les valeurs:

    ```bash
    cp .env.example .env.local
    ```

    Variables requises:
    - `DATABASE_URL` - URL PostgreSQL
    - `NEXTAUTH_SECRET` - Secret pour NextAuth (générer avec `openssl rand -base64 32`)
    - `STRIPE_SECRET_KEY` - Clé secrète Stripe
    - `STRIPE_WEBHOOK_SECRET` - Secret webhook Stripe
    - `RESEND_API_KEY` - Clé API Resend

    ### 3. Configurer la base de données

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

    ### 4. Lancer le serveur de développement

    ```bash
    npm run dev
    ```

    Ouvrir [http://localhost:3000](http://localhost:3000)

    ## 🏗️ Structure du Projet

    ```
    formation-page/
    ├── app/                    # Pages Next.js (App Router)
    │   ├── (auth)/            # Pages auth (login, register)
    │   ├── (dashboard)/       # Dashboard formateur
    │   ├── [username]/[slug]/ # Pages de vente publiques
    │   ├── learn/             # Espace membre élèves
    │   └── api/               # API Routes
    ├── components/
    │   ├── ui/                # Composants Shadcn
    │   ├── layout/            # Header, Footer, Sidebar
    │   ├── formation/         # Composants formations
    │   └── shared/            # Composants partagés
    ├── lib/
    │   ├── auth.ts            # Config NextAuth
    │   ├── prisma.ts          # Client Prisma
    │   ├── stripe.ts          # Config Stripe
    │   ├── email.ts           # Service email
    │   └── validations/       # Schémas Zod
    └── prisma/
        └── schema.prisma      # Schéma de la base
    ```

    ## 📝 Modèle de Données

    - **User** - Formateurs/créateurs
    - **Formation** - Formations avec pricing
    - **Module** - Chapitres de formations
    - **Lesson** - Vidéos, PDFs, liens
    - **Student** - Élèves/acheteurs
    - **Purchase** - Achats
    - **Progress** - Suivi de progression

    ## 💰 Monétisation

    - Commission de 5% sur chaque vente
    - Stripe Connect pour paiements directs aux formateurs
    - Frais de transaction Stripe standards en plus

    ## 🔐 Sécurité

    - Authentification JWT via NextAuth
    - Routes protégées par middleware
    - Vérification propriété des formations
    - Webhooks Stripe sécurisés
    - Videos protégées contre téléchargement

    ## 🚀 Déploiement

    ### Vercel (recommandé)

    1. Pousser sur GitHub
    2. Importer sur Vercel
    3. Configurer les variables d'environnement
    4. Déployer

    ### Variables de production

    Ajouter dans Vercel:
    - Toutes les variables de `.env.example`
    - `NEXTAUTH_URL` vers votre domaine

    ## 📧 Webhooks Stripe

    Pour le développement local:

    ```bash
    stripe listen --forward-to localhost:3000/api/stripe/webhook
    ```

    Pour production, configurer dans le Dashboard Stripe:
    - Endpoint: `https://votre-domaine.com/api/stripe/webhook`
    - Events: `checkout.session.completed`, `account.updated`

    ## 📄 License

    MIT
