# 🎨 FormationPage Design System - Galerie Visuelle

Une présentation visuelle de tous les composants du design system.

---

## 🏠 Page d'accueil

**URL** : `/`

### Sections
- Hero avec titre gradient
- Badge "Design System v1.0"
- CTAs : Showcase + Dashboard Example
- 6 feature badges (Contraste AAA, Mobile-first, etc.)
- Grid de 5 cartes d'exemples
- Section documentation
- Footer

### Couleurs utilisées
- Gradient Indigo → Violet pour le titre
- Background neutral-50 → white
- Cards blanches avec hover effects

---

## 🎨 Showcase

**URL** : `/showcase`

### Sections affichées

#### 1. Stats Cards (4 variantes)
- **Revenue** (Emerald) : DollarSign icon, "12 450€", +12.5%
- **Students** (Blue) : Users icon, "234", +8%
- **Sales** (Violet) : ShoppingCart icon, "89", -3.2%
- **Courses** (Amber) : GraduationCap icon, "12", pas de tendance

#### 2. Formation Cards (3 exemples)
- Next.js 15 (published, 1245 élèves, 42 modules, 199€)
- TypeScript Avancé (published, 876 élèves, 28 modules, 149€)
- Design System Tailwind (draft, 432 élèves, 18 modules, 99€)

#### 3. Buttons
- 8 variantes de boutons shadcn/ui
- Sizes : sm, default, lg
- States : default, disabled

#### 4. Typography Scale
- Heading 1-5 (48px → 16px)
- Body Large, Default, Small
- Caption, Overline

#### 5. Color Palette
- 6 grilles de couleurs : Indigo, Emerald, Blue, Violet, Amber, Red
- Chaque grille : 50, 500, 600

#### 6. Spacing System
- 11 lignes montrant 4px → 96px
- Barres visuelles indigo

### Visuel type
```
┌─────────────────────────────────────────────┐
│  FormationPage Design System               │
│  Design inspiré de Linear × Vercel × Stripe│
│  ✅ Contraste AAA  ✅ Mobile-first  ✅ Dark │
├─────────────────────────────────────────────┤
│  1. Stats Cards                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │  💰  │ │  👥  │ │  🛒  │ │  🎓  │      │
│  │12450€│ │ 234  │ │  89  │ │  12  │      │
│  │+12.5%│ │ +8%  │ │ -3.2%│ │      │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
├─────────────────────────────────────────────┤
│  2. Formation Cards                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │ [IMAGE] │ │ [IMAGE] │ │ [IMAGE] │      │
│  │ Next.js │ │TypeScri.│ │ Design  │      │
│  │ 199€    │ │ 149€    │ │  99€    │      │
│  │[Publié] │ │[Publié] │ │[Brouill]│      │
│  └─────────┘ └─────────┘ └─────────┘      │
└─────────────────────────────────────────────┘
```

---

## 📊 Dashboard Example

**URL** : `/dashboard-example`

### Layout
- Sidebar à gauche (collapsible)
- Header sticky avec "Dashboard" + bouton "Nouvelle formation"
- Main content avec :
  - 4 Stats Cards
  - Section "Meilleures performances" (3 Formation Cards)
  - Insight card avec gradient indigo→violet

### Visuel type
```
┌──────┬──────────────────────────────────────┐
│      │  Dashboard              [+Nouvelle]  │
│ SIDE ├──────────────────────────────────────┤
│ BAR  │ ┌──────┐┌──────┐┌──────┐┌──────┐    │
│      │ │💰12k││👥234 ││🛒89  ││🎓12  │    │
│ 📊   │ └──────┘└──────┘└──────┘└──────┘    │
│ 🎓   │                                      │
│ 👥   │ Meilleures performances              │
│ 💰   │ ┌──────┐ ┌──────┐ ┌──────┐          │
│ ⚙️   │ │ Card │ │ Card │ │ Card │          │
│      │ └──────┘ └──────┘ └──────┘          │
│ 👤   │                                      │
└──────┴──────────────────────────────────────┘
```

---

## 🛒 Sales Example

**URL** : `/sales-example`

### Layout
- Hero section (grid 2 colonnes)
  - **Gauche** :
    - Avatar + nom créateur
    - Titre formation (48px)
    - Description
    - Prix (48px) + prix barré + badge -30%
    - CTA "Acheter maintenant" (gradient indigo→violet)
    - 3 trust badges (Accès vie, Support, Garantie)
    - Liste de features avec checkmarks
  - **Droite** :
    - Image/vidéo cover sticky
    - Play button overlay pour vidéos

### Section 2
- "Ce que vous allez apprendre"
- Grid de 6 items

### Visuel type
```
┌────────────────────────────────────────────┐
│ 👤 Bruno Crespo                           │
│    Senior Full-stack Developer            │
│                                            │
│ Maîtriser Next.js 15 en 30 jours          │
│ Devenez expert Next.js avec cette         │
│ formation complète...                      │
│                                            │
│ ┌──────────────────────┐                  │
│ │  199€  299€  -30%   │                  │
│ │                      │                  │
│ │ [ACHETER MAINTENANT] │  ┌──────────┐   │
│ │                      │  │          │   │
│ │ 🕐 Accès 🎧 Support  │  │  IMAGE   │   │
│ │    à vie   7j/7      │  │          │   │
│ │         🛡️ Garantie  │  │          │   │
│ │            30j       │  └──────────┘   │
│ └──────────────────────┘                  │
│ ✅ 42 modules vidéo                       │
│ ✅ Accès à vie                            │
│ ✅ Support 7j/7                           │
└────────────────────────────────────────────┘
```

---

## 🎓 Student Example

**URL** : `/student-example`

### Layout
- Header : "Bonjour Bruno 👋"
- 3 stats cards (Total, En cours, Terminées)
- Grid de 6 formations :
  - 2 terminées (progress 100%, badge vert, bouton "Revoir")
  - 3 en cours (progress bars colorées, bouton "Continuer")
  - 1 pas commencée (progress 0%, bouton "Commencer")

### Visuel type
```
┌────────────────────────────────────────────┐
│ Bonjour Bruno 👋                          │
│ Continuez votre apprentissage...          │
│                                            │
│ ┌──────┐  ┌──────┐  ┌──────┐             │
│ │📚 6  │  │📈 3  │  │✅ 2  │             │
│ │Total │  │En co.│  │Termi.│             │
│ └──────┘  └──────┘  └──────┘             │
│                                            │
│ Mes formations                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │[IMAGE]  │ │[IMAGE]  │ │[IMAGE]  │      │
│ │Next.js  │ │TypeScr. │ │Design   │      │
│ │67% ████─│ │100% ████│ │34% ██───│      │
│ │[Continu]│ │[Revoir ]│ │[Continu]│      │
│ └─────────┘ └─────────┘ └─────────┘      │
└────────────────────────────────────────────┘
```

---

## ⚙️ Settings Example

**URL** : `/settings-example`

### Layout
- Header : "Paramètres"
- 3 cards :
  1. **Compte** (icône User, indigo)
     - Input : Nom complet
     - Input : Email
     - Bouton "Sauvegarder"
     - Badge "Sauvegardé" (si sauvegardé)
  
  2. **Stripe** (icône CreditCard, violet)
     - Guide collapsible "Comment obtenir mes clés ?"
     - Input : Clé publique (pk_test_...)
     - Input : Clé secrète (sk_test_...)
     - Bouton "Sauvegarder"
  
  3. **Domaine** (icône Globe, amber)
     - Input : Domaine personnalisé
     - Texte d'aide CNAME
     - Bouton "Sauvegarder"

### Visuel type
```
┌────────────────────────────────────────────┐
│ Paramètres                                │
│ Configurez votre compte et vos intégr.   │
├────────────────────────────────────────────┤
│ ┌────────────────────────────────────┐    │
│ │ 👤 Compte              [✅Sauvegardé]│   │
│ │ Nom complet: [___________]          │   │
│ │ Email:       [___________]          │   │
│ │              [Sauvegarder]          │   │
│ └────────────────────────────────────┘    │
│                                            │
│ ┌────────────────────────────────────┐    │
│ │ 💳 Stripe                           │   │
│ │ ❓ Comment obtenir mes clés ? [▼]   │   │
│ │ Clé publique: [pk_test_________]   │   │
│ │ Clé secrète:  [sk_test_________]   │   │
│ │              [Sauvegarder]          │   │
│ └────────────────────────────────────┘    │
│                                            │
│ ┌────────────────────────────────────┐    │
│ │ 🌐 Domaine personnalisé             │   │
│ │ Domaine: [formations.site.com]     │   │
│ │          [Sauvegarder]              │   │
│ └────────────────────────────────────┘    │
└────────────────────────────────────────────┘
```

---

## 🎨 Palette de couleurs complète

### Primary - Indigo
```
┌────┬────┬────┐
│ 50 │500 │600 │  Utilisé pour : Navigation, CTAs primaires
└────┴────┴────┘
```

### Success - Emerald
```
┌────┬────┬────┐
│ 50 │500 │600 │  Utilisé pour : Revenus, validations, badges
└────┴────┴────┘
```

### Info - Blue
```
┌────┬────┬────┐
│ 50 │500 │600 │  Utilisé pour : Élèves, informations
└────┴────┴────┘
```

### Accent - Violet
```
┌────┬────┬────┐
│ 50 │500 │600 │  Utilisé pour : Ventes, CTAs premium
└────┴────┴────┘
```

### Warning - Amber
```
┌────┬────┬────┐
│ 50 │500 │600 │  Utilisé pour : Domaines, alertes
└────┴────┴────┘
```

### Danger - Red
```
┌────┬────┬────┐
│ 50 │500 │600 │  Utilisé pour : Erreurs, suppressions
└────┴────┴────┘
```

---

## 📐 Spacing System (4px base)

```
4px   ▮
8px   ▮▮
12px  ▮▮▮
16px  ▮▮▮▮
20px  ▮▮▮▮▮
24px  ▮▮▮▮▮▮
32px  ▮▮▮▮▮▮▮▮
40px  ▮▮▮▮▮▮▮▮▮▮
48px  ▮▮▮▮▮▮▮▮▮▮▮▮
```

---

## 🔤 Typography Scale

```
Heading 1 (48px, bold)     - Page titles
Heading 2 (32px, bold)     - Section titles
Heading 3 (24px, bold)     - Subsection titles
Heading 4 (20px, semibold) - Card titles
Heading 5 (16px, semibold) - Small headings

Body Large (16px)          - Descriptions, long text
Body Default (14px)        - Default text
Body Small (13px)          - Secondary text

Caption (12px)             - Metadata, timestamps
Overline (11px, uppercase) - Labels
```

---

## 🎭 Animations & Transitions

### Hover Effects
- **Stats Cards** : Scale icon (105%), bottom gradient line
- **Formation Cards** : Zoom image (105%), overlay gradient
- **Buttons** : Shadow increase, slight color darkening
- **Sidebar items** : Background change, chevron appear

### Durations
- **Fast** (200ms) : Hover states, colors
- **Medium** (300ms) : Collapses, overlays
- **Slow** (500ms) : Image transforms, scales

---

## 📱 Responsive Breakpoints

```
Mobile    (< 640px)   - 1 colonne
Tablet    (640-1024px) - 2 colonnes
Desktop   (> 1024px)   - 3-4 colonnes
```

### Sidebar
- Desktop : Visible, collapsible
- Mobile : Hidden, hamburger menu

---

## ✅ Accessibilité

- ✅ Contraste AAA (WCAG)
- ✅ ARIA labels sur tous les boutons
- ✅ Navigation clavier (Tab, Enter)
- ✅ Focus states visibles
- ✅ Semantic HTML (header, nav, main, footer)

---

**Design fait avec ❤️ pour créer le meilleur SaaS de formations 2025**
