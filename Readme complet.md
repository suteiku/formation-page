# 🎓 FormationPage - SaaS de Formations en Ligne

Plateforme **tout-en-un** pour créer et vendre des formations en ligne en moins de 10 minutes, sans compétences techniques.

> **"Créez votre page de vente, recevez les paiements, et livrez votre formation - tout au même endroit, automatiquement."**

---

## ✨ Fonctionnalités Principales

### Pour les Formateurs
- 📝 **Création de formation en 5 minutes** - Formulaire guidé simple
- 🎨 **Page de vente générée automatiquement** - Design moderne, responsive
- 💳 **Paiements directs** - Stripe Connect, vous recevez l'argent directement
- 📹 **Hébergement vidéo illimité** - Upload et streaming sécurisé
- 📊 **Dashboard complet** - Ventes, élèves, statistiques
- 📧 **Emails automatiques** - Notifications de vente, bienvenue élèves

### Pour les Élèves
- 🎓 **Espace membre dédié** - Accès à vie après achat
- 📈 **Suivi de progression** - Marquez les leçons terminées
- 🎬 **Lecteur vidéo intégré** - Streaming HD, pas de téléchargement
- 📱 **100% responsive** - Fonctionne sur mobile, tablette, desktop
- 🔐 **Accès sécurisé** - Compte créé automatiquement après achat

---

## 🛠️ Stack Technique

```
Frontend:        Next.js 15 (App Router) + React 19 + TypeScript
Styling:         Tailwind CSS + Shadcn/ui
Backend:         Next.js API Routes
Database:        PostgreSQL + Prisma ORM
Auth:            NextAuth.js v5
Paiements:       Stripe Checkout + Stripe Connect
Vidéo:           Cloudflare Stream (ou Mux)
Emails:          Resend + React Email
Upload:          UploadThing
Déploiement:     Vercel + Vercel Postgres
```

---

## 🚀 Installation et Configuration

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Stripe (gratuit)
- Compte Vercel (gratuit)
- Compte Cloudflare (pour vidéos)
- Compte Resend (pour emails)

### 1️⃣ Cloner et Installer

```bash
git clone https://github.com/votre-repo/formation-page.git
cd formation-page
npm install
```

### 2️⃣ Configuration Base de Données

**Option A : Vercel Postgres (Recommandé)**

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Lier le projet
vercel link

# Créer une base Postgres dans le dashboard Vercel
# Puis récupérer DATABASE_URL et l'ajouter dans .env.local
```

**Option B : PostgreSQL Local**

```bash
# Installer PostgreSQL localement
# Créer une base de données
createdb formation_page_dev

# Ajouter dans .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/formation_page_dev"
```

### 3️⃣ Variables d'Environnement

Créer `.env.local` à la racine :

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="génère-avec-openssl-rand-base64-32"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Obtenu après config webhook
STRIPE_CONNECT_CLIENT_ID="ca_..." # Dashboard Stripe > Connect > Settings

# Cloudflare Stream (pour vidéos)
CLOUDFLARE_ACCOUNT_ID="votre-account-id"
CLOUDFLARE_API_TOKEN="votre-token"
CLOUDFLARE_CUSTOMER_CODE="votre-customer-code"

# Resend (pour emails)
RESEND_API_KEY="re_..."

# UploadThing (pour images)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="votre-app-id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4️⃣ Initialiser la Base de Données

```bash
# Générer les migrations
npx prisma migrate dev --name init

# Générer le client Prisma
npx prisma generate

# (Optionnel) Seed avec données de test
npx prisma db seed
```

### 5️⃣ Lancer le Projet

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) 🎉

---

## 📋 Configuration des Services Externes

### 🔵 Stripe Configuration

#### Étape 1 : Créer un compte Stripe
1. Aller sur [stripe.com](https://stripe.com)
2. Créer un compte
3. Activer le mode Test

#### Étape 2 : Récupérer les clés API
1. Dashboard > Developers > API Keys
2. Copier `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copier `Secret key` → `STRIPE_SECRET_KEY`

#### Étape 3 : Activer Stripe Connect
1. Dashboard > Connect > Settings
2. Copier `Client ID` → `STRIPE_CONNECT_CLIENT_ID`
3. Ajouter URL de redirection : `http://localhost:3000/dashboard/settings`

#### Étape 4 : Configurer le Webhook (pour dev local)

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forwarder les webhooks vers localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copier le webhook secret affiché → STRIPE_WEBHOOK_SECRET
```

**Pour production** : Dashboard > Webhooks > Add endpoint
- URL: `https://votre-domaine.com/api/stripe/webhook`
- Events: `checkout.session.completed`, `account.updated`

### 📹 Cloudflare Stream Configuration

#### Étape 1 : Créer un compte
1. Aller sur [cloudflare.com](https://cloudflare.com)
2. Créer un compte gratuit
3. Aller dans Stream

#### Étape 2 : Récupérer les identifiants
1. Stream > API Tokens
2. Créer un token avec permissions : Stream:Edit
3. Copier :
   - Account ID → `CLOUDFLARE_ACCOUNT_ID`
   - API Token → `CLOUDFLARE_API_TOKEN`
4. Stream > Settings > Copier Customer Code → `CLOUDFLARE_CUSTOMER_CODE`

#### Tarification Cloudflare Stream
- 5$ par 1000 minutes de vidéo stockées
- 1$ par 1000 minutes de vidéo visionnées
- Pas de limite de bande passante

### 📧 Resend Configuration

#### Étape 1 : Créer un compte
1. Aller sur [resend.com](https://resend.com)
2. Créer un compte (gratuit : 100 emails/jour)

#### Étape 2 : Obtenir la clé API
1. Dashboard > API Keys
2. Create API Key
3. Copier → `RESEND_API_KEY`

#### Étape 3 : Vérifier un domaine (optionnel, pour production)
1. Dashboard > Domains
2. Add Domain
3. Ajouter les DNS records fournis

### 📤 UploadThing Configuration

#### Étape 1 : Créer un compte
1. Aller sur [uploadthing.com](https://uploadthing.com)
2. Se connecter avec GitHub

#### Étape 2 : Créer une app
1. Create New App
2. Copier :
   - Secret → `UPLOADTHING_SECRET`
   - App ID → `UPLOADTHING_APP_ID`

---

## 📁 Structure du Projet Détaillée

```
formation-page/
│
├── app/                                    # Next.js App Router
│   ├── (auth)/                            # Routes authentification
│   │   ├── login/
│   │   │   └── page.tsx                   # Page de connexion
│   │   ├── register/
│   │   │   └── page.tsx                   # Page d'inscription
│   │   └── layout.tsx                     # Layout auth (centré, simple)
│   │
│   ├── (dashboard)/                       # Routes dashboard formateur
│   │   ├── dashboard/
│   │   │   ├── page.tsx                   # Vue d'ensemble
│   │   │   ├── formations/
│   │   │   │   ├── page.tsx               # Liste formations
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx           # Formulaire création
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx           # Édition formation
│   │   │   │       ├── content/
│   │   │   │       │   └── page.tsx       # Gestion contenu (modules, leçons)
│   │   │   │       └── settings/
│   │   │   │           └── page.tsx       # Paramètres formation
│   │   │   ├── sales/
│   │   │   │   └── page.tsx               # Historique ventes
│   │   │   ├── students/
│   │   │   │   └── page.tsx               # Liste élèves
│   │   │   └── settings/
│   │   │       └── page.tsx               # Paramètres compte + Stripe
│   │   └── layout.tsx                     # Layout dashboard (sidebar, header)
│   │
│   ├── [username]/                        # Pages publiques formateur
│   │   └── [slug]/
│   │       └── page.tsx                   # Page de vente formation
│   │
│   ├── learn/                             # Espace membre élèves
│   │   ├── page.tsx                       # Mes formations
│   │   └── [formationId]/
│   │       └── page.tsx                   # Contenu formation
│   │
│   ├── api/                               # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts               # NextAuth handler
│   │   ├── formations/
│   │   │   ├── route.ts                   # GET all, POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts               # GET, PATCH, DELETE
│   │   │       └── publish/
│   │   │           └── route.ts           # POST publish formation
│   │   ├── modules/
│   │   │   ├── route.ts                   # POST create module
│   │   │   └── [id]/
│   │   │       └── route.ts               # PATCH, DELETE module
│   │   ├── lessons/
│   │   │   ├── route.ts                   # POST create lesson
│   │   │   └── [id]/
│   │   │       ├── route.ts               # PATCH, DELETE lesson
│   │   │       └── complete/
│   │   │           └── route.ts           # POST mark as complete
│   │   ├── stripe/
│   │   │   ├── checkout/
│   │   │   │   └── route.ts               # POST create checkout session
│   │   │   ├── webhook/
│   │   │   │   └── route.ts               # POST webhook handler
│   │   │   ├── connect/
│   │   │   │   ├── account/
│   │   │   │   │   └── route.ts           # POST create connect account
│   │   │   │   └── onboard/
│   │   │   │       └── route.ts           # GET generate onboard link
│   │   │   └── dashboard/
│   │   │       └── route.ts               # GET generate dashboard link
│   │   ├── upload/
│   │   │   └── route.ts                   # POST upload handler
│   │   └── video/
│   │       ├── upload/
│   │       │   └── route.ts               # POST upload to Cloudflare
│   │       └── [id]/
│   │           └── route.ts               # GET video details
│   │
│   ├── layout.tsx                         # Root layout
│   ├── page.tsx                           # Landing page
│   └── globals.css                        # Styles globaux
│
├── components/
│   ├── ui/                                # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   │
│   ├── layout/                            # Composants layout
│   │   ├── header.tsx                     # Header principal
│   │   ├── footer.tsx                     # Footer
│   │   ├── sidebar.tsx                    # Sidebar dashboard
│   │   └── mobile-nav.tsx                 # Navigation mobile
│   │
│   ├── formation/                         # Composants formations
│   │   ├── formation-card.tsx             # Card formation (grid)
│   │   ├── formation-form.tsx             # Formulaire création (5 steps)
│   │   ├── formation-stats.tsx            # Stats formation (ventes, vues)
│   │   ├── module-list.tsx                # Liste modules avec drag & drop
│   │   ├── lesson-item.tsx                # Item leçon (vidéo, PDF, lien)
│   │   └── sales-page-preview.tsx         # Preview page de vente
│   │
│   ├── student/                           # Composants élèves
│   │   ├── course-progress.tsx            # Barre progression
│   │   ├── lesson-list.tsx                # Liste leçons avec état
│   │   └── student-card.tsx               # Card élève (dashboard)
│   │
│   ├── shared/                            # Composants partagés
│   │   ├── video-player.tsx               # Lecteur vidéo Cloudflare
│   │   ├── file-upload.tsx                # Upload fichiers
│   │   ├── image-upload.tsx               # Upload images (cover)
│   │   ├── rich-text-editor.tsx           # Éditeur texte enrichi
│   │   ├── loading-spinner.tsx            # Spinner
│   │   ├── empty-state.tsx                # État vide
│   │   └── confirmation-dialog.tsx        # Dialog confirmation
│   │
│   └── marketing/                         # Composants landing page
│       ├── hero.tsx                       # Section hero
│       ├── features.tsx                   # Section features
│       ├── how-it-works.tsx               # Section fonctionnement
│       ├── testimonials.tsx               # Section témoignages
│       └── cta.tsx                        # Call to action
│
├── lib/
│   ├── auth.ts                            # NextAuth configuration
│   ├── prisma.ts                          # Prisma client singleton
│   ├── stripe.ts                          # Stripe client + helpers
│   ├── cloudflare.ts                      # Cloudflare Stream API
│   ├── email.ts                           # Resend client + templates
│   ├── utils.ts                           # Utilitaires généraux
│   │
│   ├── validations/                       # Schémas Zod
│   │   ├── formation.ts                   # Validation formation
│   │   ├── user.ts                        # Validation user
│   │   ├── lesson.ts                      # Validation lesson
│   │   └── auth.ts                        # Validation auth
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── use-formations.ts              # Hook formations
│   │   ├── use-students.ts                # Hook students
│   │   └── use-progress.ts                # Hook progression
│   │
│   └── actions/                           # Server actions
│       ├── formation-actions.ts           # Actions formations
│       ├── lesson-actions.ts              # Actions lessons
│       └── stripe-actions.ts              # Actions Stripe
│
├── prisma/
│   ├── schema.prisma                      # Schéma base de données
│   ├── seed.ts                            # Seed données de test
│   └── migrations/                        # Migrations SQL
│
├── public/
│   ├── images/                            # Images statiques
│   └── icons/                             # Icons/logos
│
├── emails/                                # Templates React Email
│   ├── welcome-student.tsx                # Email bienvenue élève
│   ├── purchase-confirmation.tsx          # Email confirmation achat (formateur)
│   └── formation-published.tsx            # Email formation publiée
│
├── .env.example                           # Exemple variables d'env
├── .env.local                             # Variables locales (git ignored)
├── next.config.js                         # Config Next.js
├── tailwind.config.ts                     # Config Tailwind
├── tsconfig.json                          # Config TypeScript
├── components.json                        # Config Shadcn
├── package.json
└── README.md
```

---

## 🗄️ Schéma de Base de Données

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== FORMATEURS ====================

model User {
  id                String      @id @default(cuid())
  email             String      @unique
  name              String
  username          String      @unique
  password          String
  
  // Stripe Connect
  stripeAccountId   String?     @unique
  stripeOnboarded   Boolean     @default(false)
  
  // Relations
  formations        Formation[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@index([email])
  @@index([username])
}

// ==================== FORMATIONS ====================

model Formation {
  id                String      @id @default(cuid())
  slug              String      @unique
  
  // Infos basiques
  title             String
  pitch             String      @db.Text
  description       String      @db.Text
  targetAudience    String?     @db.Text
  
  // Prix
  price             Float
  currency          String      @default("EUR")
  
  // Media
  coverImage        String
  coverImageKey     String?
  
  // Statut
  published         Boolean     @default(false)
  
  // Relations
  creatorId         String
  creator           User        @relation(fields: [creatorId], references: [id], onDelete: Cascade)
  
  modules           Module[]
  purchases         Purchase[]
  testimonials      Testimonial[]
  
  // Stats (dénormalisées pour performance)
  totalStudents     Int         @default(0)
  totalRevenue      Float       @default(0)
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  publishedAt       DateTime?
  
  @@index([creatorId])
  @@index([slug])
  @@index([published])
}

// ==================== MODULES ====================

model Module {
  id                String      @id @default(cuid())
  title             String
  description       String?     @db.Text
  order             Int
  
  formationId       String
  formation         Formation   @relation(fields: [formationId], references: [id], onDelete: Cascade)
  
  lessons           Lesson[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@index([formationId])
  @@unique([formationId, order])
}

// ==================== LEÇONS ====================

model Lesson {
  id                String      @id @default(cuid())
  title             String
  description       String?     @db.Text
  type              LessonType
  order             Int
  
  // Contenu
  videoId           String?     // Cloudflare Stream video ID
  videoUrl          String?     // URL de la vidéo
  videoThumbnail    String?
  duration          Int?        // En secondes
  
  pdfUrl            String?
  pdfKey            String?
  
  linkUrl           String?
  
  // Relations
  moduleId          String
  module            Module      @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  
  progress          Progress[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@index([moduleId])
  @@unique([moduleId, order])
}

enum LessonType {
  VIDEO
  PDF
  LINK
  TEXT
}

// ==================== TÉMOIGNAGES ====================

model Testimonial {
  id                String      @id @default(cuid())
  name              String
  content           String      @db.Text
  avatar            String?
  rating            Int?        @default(5)
  
  formationId       String
  formation         Formation   @relation(fields: [formationId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime    @default(now())
  
  @@index([formationId])
}

// ==================== ÉLÈVES ====================

model Student {
  id                String      @id @default(cuid())
  email             String      @unique
  name              String
  password          String
  
  // Relations
  purchases         Purchase[]
  progress          Progress[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@index([email])
}

// ==================== ACHATS ====================

model Purchase {
  id                String      @id @default(cuid())
  
  studentId         String
  student           Student     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  formationId       String
  formation         Formation   @relation(fields: [formationId], references: [id], onDelete: Cascade)
  
  // Paiement
  amount            Float
  currency          String      @default("EUR")
  stripePaymentId   String      @unique
  stripeSessionId   String?     @unique
  
  createdAt         DateTime    @default(now())
  
  @@unique([studentId, formationId])
  @@index([studentId])
  @@index([formationId])
  @@index([stripePaymentId])
}

// ==================== PROGRESSION ====================

model Progress {
  id                String      @id @default(cuid())
  completed         Boolean     @default(false)
  watchedDuration   Int         @default(0) // En secondes
  
  studentId         String
  student           Student     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  lessonId          String
  lesson            Lesson      @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  completedAt       DateTime?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@unique([studentId, lessonId])
  @@index([studentId])
  @@index([lessonId])
}
```

---

## 🔌 Intégrations Clés

### 1. Stripe Checkout

```typescript
// app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { formationId, email } = await req.json()

    const formation = await prisma.formation.findUnique({
      where: { id: formationId },
      include: { creator: true },
    })

    if (!formation || !formation.published) {
      return NextResponse.json({ error: 'Formation not found' }, { status: 404 })
    }

    if (!formation.creator.stripeAccountId) {
      return NextResponse.json({ error: 'Seller not configured' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: formation.currency.toLowerCase(),
            product_data: {
              name: formation.title,
              description: formation.pitch,
              images: [formation.coverImage],
            },
            unit_amount: Math.round(formation.price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/learn/${formationId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${formation.creator.username}/${formation.slug}`,
      metadata: {
        formationId: formation.id,
        creatorId: formation.creatorId,
      },
      payment_intent_data: {
        application_fee_amount: Math.round(formation.price * 100 * 0.05), // 5%
        transfer_data: {
          destination: formation.creator.stripeAccountId,
        },
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

### 2. Webhook Stripe

```typescript
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail, sendPurchaseConfirmation } from '@/lib/email'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { formationId, creatorId } = session.metadata!

    // 1. Créer ou récupérer l'élève
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    const student = await prisma.student.upsert({
      where: { email: session.customer_email! },
      update: {},
      create: {
        email: session.customer_email!,
        name: session.customer_details?.name || 'Étudiant',
        password: hashedPassword,
      },
    })

    // 2. Enregistrer l'achat
    await prisma.purchase.create({
      data: {
        studentId: student.id,
        formationId,
        amount: session.amount_total! / 100,
        currency: session.currency!.toUpperCase(),
        stripePaymentId: session.payment_intent as string,
        stripeSessionId: session.id,
      },
    })

    // 3. Mettre à jour les stats de la formation
    await prisma.formation.update({
      where: { id: formationId },
      data: {
        totalStudents: { increment: 1 },
        totalRevenue: { increment: session.amount_total! / 100 },
      },
    })

    // 4. Récupérer la formation et le créateur
    const formation = await prisma.formation.findUnique({
      where: { id: formationId },
      include: { creator: true },
    })

    // 5. Envoyer les emails
    await sendWelcomeEmail({
      to: student.email,
      studentName: student.name,
      formationTitle: formation!.title,
      formationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/learn/${formationId}`,
      tempPassword,
    })

    await sendPurchaseConfirmation({
      to: formation!.creator.email,
      creatorName: formation!.creator.name,
      formationTitle: formation!.title,
      studentName: student.name,
      studentEmail: student.email,
      amount: session.amount_total! / 100,
      currency: session.currency!.toUpperCase(),
    })

    console.log('✅ Purchase processed successfully')
  }

  return NextResponse.json({ received: true })
}

export const config = {
  api: {
    bodyParser: false, // Important pour Stripe webhooks
  },
}
```

### 3. Upload Vidéo Cloudflare

```typescript
// lib/cloudflare.ts
const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4'

export async function uploadVideoToCloudflare(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(
    `${CLOUDFLARE_API_URL}/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error('Failed to upload video')
  }

  const data = await response.json()
  return data.result.uid // ID de la vidéo
}

export function getVideoStreamUrl(videoId: string): string {
  return `https://customer-${process.env.CLOUDFLARE_CUSTOMER_CODE}.cloudflarestream.com/${videoId}/manifest/video.m3u8`
}

export function getVideoThumbnail(videoId: string): string {
  return `https://customer-${process.env.CLOUDFLARE_CUSTOMER_CODE}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`
}

export async function deleteVideo(videoId: string): Promise<void> {
  await fetch(
    `${CLOUDFLARE_API_URL}/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/${videoId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  )
}
```

---

## 📧 Templates Email

```typescript
// emails/welcome-student.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  studentName: string
  formationTitle: string
  formationUrl: string
  tempPassword: string
}

export default function WelcomeEmail({
  studentName,
  formationTitle,
  formationUrl,
  tempPassword,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenue dans {formationTitle} 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎉 Félicitations {studentName}!</Heading>
          
          <Text style={text}>
            Vous avez maintenant accès à <strong>{formationTitle}</strong>
          </Text>

          <Section style={credentialsBox}>
            <Heading as="h2" style={h2}>Vos identifiants de connexion</Heading>
            <Text style={text}>
              <strong>Email :</strong> {studentName}
            </Text>
            <Text style={text}>
              <strong>Mot de passe temporaire :</strong> {tempPassword}
            </Text>
            <Text style={warningText}>
              ⚠️ Changez votre mot de passe après votre première connexion
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={formationUrl}>
              Accéder à ma formation →
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Si vous avez des questions, n'hésitez pas à contacter le formateur.
            <br />
            Bonne formation !<br />
            L'équipe FormationPage
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

const credentialsBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 0',
}

const warningText = {
  color: '#f59e0b',
  fontSize: '14px',
  fontStyle: 'italic',
  marginTop: '16px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#6366f1',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
}
```

---

## 🚀 Déploiement sur Vercel

### Étape 1 : Préparer le Projet

```bash
# S'assurer que tout fonctionne localement
npm run build

# Commit sur Git
git add .
git commit -m "Ready for production"
git push origin main
```

### Étape 2 : Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer "Import Project"
3. Sélectionner le repo GitHub
4. Configurer :
   - Framework Preset: Next.js
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
   - Install Command: `npm install` (auto)

### Étape 3 : Ajouter Variables d'Environnement

Dans Vercel Dashboard > Settings > Environment Variables, ajouter **TOUTES** les variables de `.env.local` :

```bash
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://votre-domaine.vercel.app
NEXTAUTH_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=... (différent en prod!)
STRIPE_CONNECT_CLIENT_ID=...
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_CUSTOMER_CODE=...
RESEND_API_KEY=...
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
NEXT_PUBLIC_APP_URL=https://votre-domaine.vercel.app
```

### Étape 4 : Créer Base de Données Production

1. Vercel Dashboard > Storage > Create Database
2. Choisir Postgres
3. Copier `DATABASE_URL` dans les variables d'environnement

### Étape 5 : Migrer la Base de Données

```bash
# Localement, avec DATABASE_URL de production
npx prisma migrate deploy
```

### Étape 6 : Configurer Webhook Stripe Production

1. Stripe Dashboard > Developers > Webhooks
2. Add endpoint
3. URL: `https://votre-domaine.vercel.app/api/stripe/webhook`
4. Events: `checkout.session.completed`, `account.updated`
5. Copier le Webhook Secret dans Vercel

### Étape 7 : Configurer Domaine Custom (Optionnel)

1. Vercel Dashboard > Settings > Domains
2. Add Domain: `formationpage.com`
3. Configurer les DNS selon instructions Vercel

---

## 🧪 Tests

### Tester les Paiements (Mode Test Stripe)

```bash
# Carte de test qui fonctionne
Numéro: 4242 4242 4242 4242
Date: n'importe quelle date future
CVC: n'importe quel 3 chiffres
```

### Tester le Webhook Localement

```bash
# Terminal 1 : Lancer l'app
npm run dev

# Terminal 2 : Forwarder les webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Terminal 3 : Trigger un événement test
stripe trigger checkout.session.completed
```

---

## 📊 Monitoring & Analytics

### Logs Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Voir les logs en temps réel
vercel logs --follow
```

### Stripe Dashboard

- Paiements : Dashboard > Payments
- Connect : Dashboard > Connect > Accounts
- Webhooks : Dashboard > Developers > Webhooks > Logs

### Cloudflare Stream Analytics

- Dashboard > Stream > Analytics
- Voir minutes regardées, coûts

---

## 🐛 Debugging

### Problèmes Courants

**1. Erreur "Database connection failed"**
```bash
# Vérifier que DATABASE_URL est correct
echo $DATABASE_URL

# Tester la connexion
npx prisma db pull
```

**2. Webhook Stripe ne fonctionne pas**
```bash
# Vérifier le secret
# Logs Vercel pour voir les erreurs
# Vérifier la signature dans le code
```

**3. Upload vidéo échoue**
```bash
# Vérifier les tokens Cloudflare
# Taille max 5GB par upload
# Vérifier les CORS si browser upload
```

**4. Emails ne sont pas envoyés**
```bash
# Vérifier RESEND_API_KEY
# Vérifier que le domaine est vérifié (en prod)
# Voir logs Resend Dashboard
```

---

## 📝 Licence

MIT

---

## 🤝 Contribution

Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📞 Support

- **Documentation** : Voir `/docs` dans le repo
- **Issues** : [GitHub Issues](https://github.com/votre-repo/issues)
- **Email** : support@formationpage.com

---

## 🎯 Roadmap

### v1.0 - MVP (Actuel)
- ✅ Création de formations
- ✅ Pages de vente
- ✅ Paiements Stripe
- ✅ Espace membre
- ✅ Upload vidéos

### v1.1 - Améliorations
- [ ] Coupons de réduction
- [ ] Analytics avancées
- [ ] Exports de données
- [ ] API publique

### v1.2 - Features Avancées
- [ ] Programme d'affiliation
- [ ] Certificats
- [ ] Live sessions
- [ ] Forum communautaire

### v2.0 - Scaling
- [ ] App mobile (React Native)
- [ ] Support multilingue
- [ ] Intégrations Zapier/Make
- [ ] White-label

---

**Fait avec ❤️ pour simplifier la création de formations en ligne**