# 🎨 FormationPage Design System - Guide Complet

Design inspiré de **Linear × Vercel × Stripe** avec une lisibilité AAA et une élégance sans compromis.

---

## 📋 Table des matières

1. [Sidebar](#1-sidebar)
2. [StatsCard](#2-statscard)
3. [FormationCard](#3-formationcard)
4. [DashboardLayout](#4-dashboardlayout)
5. [SettingsPage](#5-settingspage)
6. [SalesPageHero](#6-salespageher)
7. [StudentSpace](#7-studentspace)
8. [Palette de couleurs](#palette-de-couleurs)
9. [Installation](#installation)

---

## 1. Sidebar

**Fichier** : `components/sidebar.tsx`

### Props

```typescript
interface SidebarProps {
  className?: string;      // Classes Tailwind additionnelles
  userName?: string;       // Nom de l'utilisateur (défaut: "John Doe")
  userEmail?: string;      // Email de l'utilisateur
  userAvatar?: string;     // URL de l'avatar (optionnel)
}
```

### Exemple d'utilisation

```tsx
import { Sidebar } from "@/components/sidebar";

export default function Layout() {
  return (
    <Sidebar
      userName="Bruno Crespo"
      userEmail="bruno@example.com"
      userAvatar="/avatar.jpg"
    />
  );
}
```

### Choix de design

Navigation ultra-claire avec **indicateur visuel d'état actif** (barre indigo à gauche), espacement parfait (système de 4px), transitions fluides de 200ms, collapsible sur desktop, menu hamburger sur mobile.

---

## 2. StatsCard

**Fichier** : `components/stats-card.tsx`

### Props

```typescript
interface StatsCardProps {
  icon: LucideIcon;                                    // Icône Lucide
  label: string;                                       // Label de la métrique
  value: string | number;                              // Valeur à afficher
  trend?: {                                            // Tendance (optionnel)
    value: number;                                     // % de changement
    isPositive: boolean;                               // Positif ou négatif
  };
  variant?: "default" | "revenue" | "students" | "sales" | "courses";
  className?: string;
}
```

### Exemple d'utilisation

```tsx
import { StatsCard } from "@/components/stats-card";
import { DollarSign, Users, ShoppingCart, GraduationCap } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        icon={DollarSign}
        label="Revenus ce mois"
        value="12 450€"
        trend={{ value: 12.5, isPositive: true }}
        variant="revenue"
      />
      <StatsCard
        icon={Users}
        label="Nouveaux élèves"
        value={234}
        trend={{ value: 8, isPositive: true }}
        variant="students"
      />
      <StatsCard
        icon={ShoppingCart}
        label="Ventes"
        value={89}
        trend={{ value: 3.2, isPositive: false }}
        variant="sales"
      />
      <StatsCard
        icon={GraduationCap}
        label="Formations actives"
        value={12}
        variant="courses"
      />
    </div>
  );
}
```

### Choix de design

Card minimaliste avec **4 variantes de couleurs** (emerald, blue, violet, amber) pour différencier les métriques. Hover effect subtil avec animation de scale sur l'icône et ligne de gradient au survol.

---

## 3. FormationCard

**Fichier** : `components/formation-card.tsx`

### Props

```typescript
interface FormationCardProps {
  id: string;                  // ID de la formation
  title: string;               // Titre
  description: string;         // Description (max 2 lignes)
  coverImage: string;          // URL de la cover
  price: number;               // Prix en euros
  studentsCount: number;       // Nombre d'élèves
  modulesCount: number;        // Nombre de modules
  status: "published" | "draft";
  className?: string;
}
```

### Exemple d'utilisation

```tsx
import { FormationCard } from "@/components/formation-card";

export default function FormationsPage() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <FormationCard
        id="1"
        title="Maîtriser Next.js 15 en 30 jours"
        description="Apprenez Next.js 15 de A à Z avec des projets concrets et des exercices pratiques."
        coverImage="/formations/nextjs.jpg"
        price={199}
        studentsCount={1245}
        modulesCount={42}
        status="published"
      />
    </div>
  );
}
```

### Choix de design

Card avec **image en aspect-video**, zoom progressif au hover, overlay gradient pour améliorer la lisibilité du badge, stats claires en icônes, actions séparées (Voir / Modifier) avec boutons distincts.

---

## 4. DashboardLayout

**Fichier** : `components/dashboard-layout.tsx`

### Props

```typescript
interface DashboardLayoutProps {
  children: ReactNode;         // Contenu de la page
  pageTitle?: string;          // Titre de la page
  pageDescription?: string;    // Description
  headerActions?: ReactNode;   // Actions du header (boutons, etc.)
  showFooter?: boolean;        // Afficher le footer
  className?: string;
  userName?: string;           // Props pour la sidebar
  userEmail?: string;
  userAvatar?: string;
}
```

### Exemple d'utilisation

```tsx
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function FormationsPage() {
  return (
    <DashboardLayout
      pageTitle="Mes formations"
      pageDescription="Gérez vos formations et créez-en de nouvelles"
      headerActions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle formation
        </Button>
      }
      userName="Bruno Crespo"
      userEmail="bruno@example.com"
    >
      {/* Votre contenu ici */}
      <h2>Liste des formations</h2>
    </DashboardLayout>
  );
}
```

### Choix de design

Layout avec **sidebar intégrée**, header sticky avec backdrop blur pour un effet moderne, zone d'actions séparée pour les CTAs, footer optionnel avec liens légaux.

---

## 5. SettingsPage

**Fichier** : `components/settings-page.tsx`

### Props

```typescript
interface SettingsPageProps {
  onSave?: (data: SettingsData) => Promise<void>;
}

interface SettingsData {
  fullName: string;
  email: string;
  stripePublicKey: string;
  stripeSecretKey: string;
  customDomain: string;
}
```

### Exemple d'utilisation

```tsx
import { SettingsPage } from "@/components/settings-page";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function Settings() {
  const handleSave = async (data: SettingsData) => {
    // Sauvegarder dans votre DB
    await fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <DashboardLayout
      pageTitle="Paramètres"
      pageDescription="Configurez votre compte et vos intégrations"
    >
      <SettingsPage onSave={handleSave} />
    </DashboardLayout>
  );
}
```

### Choix de design

**3 sections distinctes** (Compte, Stripe, Domaine) avec icônes de couleurs différentes, guide collapsible pour les clés Stripe avec lien externe, indicateurs de sauvegarde (checkmarks verts), inputs avec validation visuelle.

---

## 6. SalesPageHero

**Fichier** : `components/sales-page-hero.tsx`

### Props

```typescript
interface SalesPageHeroProps {
  title: string;                        // Titre de la formation
  description?: string;                 // Description
  price: number;                        // Prix
  originalPrice?: number;               // Prix barré (optionnel)
  coverMedia: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;                 // Pour vidéos
  };
  creator: {
    name: string;
    avatar?: string;
    role?: string;
  };
  features?: string[];                  // Liste de features
  onPurchase?: () => void;              // Callback achat
  className?: string;
}
```

### Exemple d'utilisation

```tsx
import { SalesPageHero } from "@/components/sales-page-hero";

export default function FormationSalesPage() {
  return (
    <SalesPageHero
      title="Maîtriser Next.js 15 en 30 jours"
      description="Devenez expert Next.js avec cette formation complète et créez des applications web modernes."
      price={199}
      originalPrice={299}
      coverMedia={{
        type: "video",
        url: "/videos/preview.mp4",
        thumbnail: "/thumbs/preview.jpg",
      }}
      creator={{
        name: "Bruno Crespo",
        avatar: "/avatars/bruno.jpg",
        role: "Full-stack Developer",
      }}
      features={[
        "Accès à vie à la formation",
        "42 modules vidéo HD",
        "Certificat de réussite",
        "Support prioritaire 7j/7",
        "Mises à jour gratuites",
      ]}
      onPurchase={() => {
        // Rediriger vers Stripe Checkout
        window.location.href = "/checkout";
      }}
    />
  );
}
```

### Choix de design

Hero **ultra-optimisée pour la conversion** : CTA impossible à rater (gradient indigo→violet avec shadow), trust badges (accès vie, support, garantie), prix très visible, avatar créateur pour humaniser, media cover immersif avec play button overlay pour vidéos.

---

## 7. StudentSpace

**Fichier** : `components/student-space.tsx`

### Props

```typescript
interface StudentSpaceProps {
  courses: Course[];
  studentName?: string;
  className?: string;
}

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  progress: number;              // 0-100
  totalModules: number;
  completedModules: number;
  totalDuration: string;         // Ex: "8h 30min"
  lastAccessed?: Date;
  isCompleted: boolean;
}
```

### Exemple d'utilisation

```tsx
import { StudentSpace } from "@/components/student-space";

export default function MyLearningPage() {
  const myCourses = [
    {
      id: "1",
      title: "Maîtriser Next.js 15 en 30 jours",
      thumbnail: "/courses/nextjs.jpg",
      instructor: "Bruno Crespo",
      progress: 67,
      totalModules: 42,
      completedModules: 28,
      totalDuration: "12h 45min",
      isCompleted: false,
    },
    {
      id: "2",
      title: "TypeScript Avancé",
      thumbnail: "/courses/typescript.jpg",
      instructor: "Sophie Martin",
      progress: 100,
      totalModules: 24,
      completedModules: 24,
      totalDuration: "8h 20min",
      isCompleted: true,
    },
  ];

  return (
    <StudentSpace
      courses={myCourses}
      studentName="Bruno"
    />
  );
}
```

### Choix de design

Interface **motivante pour l'apprentissage** : accueil personnalisé, stats overview (total, en cours, terminées), cartes avec progress bar colorée (indigo pour en cours, emerald pour terminé), play button overlay au hover, CTAs adaptés au statut (Commencer / Continuer / Revoir).

---

## Palette de couleurs

### Couleurs principales

- **Primary** : Indigo 500-700 (moderne, professionnel, inspire confiance)
- **Success** : Emerald 500-600 (validations, revenus)
- **Info** : Blue 500-600 (informations, élèves)
- **Warning** : Amber 500-600 (alertes, domaines)
- **Accent** : Violet 500-600 (ventes, CTAs premium)

### Neutrals

- **Text** : Neutral 900 (dark), Neutral 50 (light)
- **Secondary text** : Neutral 600/400
- **Borders** : Neutral 200/800
- **Backgrounds** : White / Neutral 50 / Neutral 950

### Contraste AAA

Toutes les combinaisons de couleurs respectent le niveau **AAA** du WCAG pour une lisibilité parfaite même pour les personnes malvoyantes ou âgées.

---

## Installation

### 1. Dépendances requises

```bash
npm install lucide-react @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-collapsible
# ou
pnpm add lucide-react @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-collapsible
```

### 2. shadcn/ui components

```bash
npx shadcn-ui@latest add button card input label badge avatar progress
```

### 3. Utility function

Assurez-vous d'avoir `lib/utils.ts` avec la fonction `cn` :

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🎯 Principes de design

✅ **Mobile-first** : Tous les composants sont responsive  
✅ **Accessible** : ARIA labels, navigation clavier, contraste AAA  
✅ **Performance** : Images optimisées avec Next.js Image, transitions CSS  
✅ **Dark mode ready** : Classes `dark:` intégrées partout  
✅ **Animations subtiles** : 200ms transitions, micro-animations au hover  
✅ **Hiérarchie visuelle** : Typographie claire (12-48px), espacements cohérents  
✅ **Cohérence** : Même palette, mêmes espacements, mêmes interactions  

---

## 🚀 Prochaines étapes

1. **Tester** chaque composant dans votre app
2. **Personnaliser** les couleurs dans `tailwind.config.ts` si besoin
3. **Ajouter** vos vraies données (API calls, DB)
4. **Déployer** sur Vercel

---

**Design fait avec ❤️ pour être le meilleur SaaS de formations 2025**
