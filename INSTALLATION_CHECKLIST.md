# 📋 Installation Checklist - FormationPage Design System

Suivez ces étapes dans l'ordre pour installer et tester le design system.

## ✅ Étape 1 : Vérifier Next.js

```bash
# Vérifier que le projet Next.js fonctionne
npm run dev
# ou
pnpm dev
```

**Résultat attendu** : Le serveur démarre sur http://localhost:3000

---

## ✅ Étape 2 : Installer les dépendances npm

```bash
# Avec npm
npm install lucide-react @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-collapsible clsx tailwind-merge

# Avec pnpm (recommandé)
pnpm add lucide-react @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-collapsible clsx tailwind-merge
```

**Vérification** :
```bash
# Vérifier que les packages sont bien installés
cat package.json | grep lucide-react
```

---

## ✅ Étape 3 : Vérifier shadcn/ui

Vérifiez si shadcn/ui est déjà initialisé :

```bash
# Vérifier si components/ui existe
ls components/ui
```

**Si le dossier n'existe pas**, initialisez shadcn/ui :

```bash
npx shadcn-ui@latest init
```

Répondez aux questions :
- **Would you like to use TypeScript?** → Yes
- **Which style would you like to use?** → Default
- **Which color would you like to use as base color?** → Neutral (ou Slate)
- **Where is your global CSS file?** → app/globals.css
- **Would you like to use CSS variables for colors?** → Yes
- **Where is your tailwind.config.js located?** → tailwind.config.ts
- **Configure the import alias for components** → @/components
- **Configure the import alias for utils** → @/lib/utils

---

## ✅ Étape 4 : Installer les composants shadcn/ui

```bash
npx shadcn-ui@latest add button card input label badge avatar progress collapsible
```

**Vérification** :
```bash
ls components/ui/button.tsx components/ui/card.tsx components/ui/avatar.tsx
```

Tous ces fichiers doivent exister.

---

## ✅ Étape 5 : Vérifier lib/utils.ts

```bash
# Vérifier que le fichier existe
cat lib/utils.ts
```

**Contenu attendu** :
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Si le fichier n'existe pas**, créez-le :

```bash
mkdir -p lib
cat > lib/utils.ts << 'EOF'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF
```

---

## ✅ Étape 6 : Redémarrer le serveur

```bash
# Tuer le serveur (Ctrl+C)
# Relancer
npm run dev
# ou
pnpm dev
```

---

## ✅ Étape 7 : Tester les pages

Visitez ces URLs dans votre navigateur :

### 1. Page d'accueil
http://localhost:3000

**Résultat attendu** : Hero avec titre "FormationPage Design System" et liens vers exemples

### 2. Showcase
http://localhost:3000/showcase

**Résultat attendu** : Composants visibles (Stats, Formation cards, couleurs, typography)

### 3. Dashboard Example
http://localhost:3000/dashboard-example

**Résultat attendu** : Dashboard avec sidebar, 4 stats cards, 3 formation cards

### 4. Sales Example
http://localhost:3000/sales-example

**Résultat attendu** : Hero page de vente avec prix, CTA, trust badges

### 5. Student Example
http://localhost:3000/student-example

**Résultat attendu** : Espace élève avec 6 formations et progress bars

### 6. Settings Example
http://localhost:3000/settings-example

**Résultat attendu** : Page paramètres avec 3 sections (Compte, Stripe, Domaine)

---

## ✅ Étape 8 : Vérifier les composants individuels

### Test Sidebar

Créez une page de test :

```tsx
// app/test-sidebar/page.tsx
import { Sidebar } from "@/components/sidebar";

export default function TestPage() {
  return (
    <div className="flex h-screen">
      <Sidebar userName="Bruno" userEmail="bruno@test.com" />
      <main className="flex-1 p-8 lg:pl-64">
        <h1>Sidebar fonctionne !</h1>
      </main>
    </div>
  );
}
```

Visitez : http://localhost:3000/test-sidebar

### Test StatsCard

```tsx
// app/test-stats/page.tsx
import { StatsCard } from "@/components/stats-card";
import { DollarSign } from "lucide-react";

export default function TestPage() {
  return (
    <div className="p-8">
      <StatsCard
        icon={DollarSign}
        label="Test Revenus"
        value="12 450€"
        trend={{ value: 12.5, isPositive: true }}
        variant="revenue"
      />
    </div>
  );
}
```

Visitez : http://localhost:3000/test-stats

---

## 🐛 Troubleshooting

### Erreur : "Module not found: @/components/ui/..."

**Solution** :
```bash
npx shadcn-ui@latest add button card input label badge avatar progress collapsible
```

### Erreur : "cn is not defined"

**Solution** : Vérifiez que `lib/utils.ts` existe et contient la fonction `cn`

### Erreur : "Cannot find module 'lucide-react'"

**Solution** :
```bash
pnpm add lucide-react
```

### Les icônes ne s'affichent pas

**Solution** : Vérifiez l'import :
```tsx
import { DollarSign, Users, ... } from "lucide-react";
```

### Dark mode ne fonctionne pas

**Solution** : Ajoutez `next-themes` :
```bash
pnpm add next-themes
```

Puis configurez dans `app/layout.tsx` :
```tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Styles Tailwind ne s'appliquent pas

**Solution** : Vérifiez `tailwind.config.ts` :
```typescript
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
],
```

---

## ✅ Checklist finale

- [ ] `npm run dev` démarre sans erreur
- [ ] Page d'accueil (/) fonctionne
- [ ] `/showcase` affiche tous les composants
- [ ] `/dashboard-example` affiche le dashboard
- [ ] `/sales-example` affiche la page de vente
- [ ] `/student-example` affiche l'espace élève
- [ ] `/settings-example` affiche les paramètres
- [ ] Sidebar fonctionne (mobile + desktop)
- [ ] Stats cards affichent les bonnes couleurs
- [ ] Formation cards affichent les images
- [ ] Hover effects fonctionnent
- [ ] Responsive mobile fonctionne (testez avec DevTools)

---

## 🚀 Une fois tout validé

### 1. Nettoyer les pages de test

```bash
rm -rf app/test-sidebar app/test-stats
```

### 2. Lire la documentation

- `DESIGN_SYSTEM_README.md` - Installation & usage
- `components/COMPONENTS_GUIDE.md` - Guide complet des composants
- `RECAP.md` - Récapitulatif de tout ce qui a été créé

### 3. Commencer à intégrer vos données

Remplacez les données mock par vos vraies données de votre API/DB.

### 4. Déployer

```bash
git add .
git commit -m "Add FormationPage Design System"
git push
```

Puis déployez sur Vercel.

---

## 🎉 Félicitations !

Si toutes les cases sont cochées, votre design system est prêt à être utilisé en production ! 🚀

**Design fait avec ❤️ pour créer le meilleur SaaS de formations 2025**
