# 🎨 FormationPage - Design System

Design system ultra-moderne inspiré de **Linear**, **Vercel** et **Stripe**.

## 🚀 Installation rapide

### 1. Installer les dépendances

```bash
# Avec npm
npm install lucide-react @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-collapsible clsx tailwind-merge

# Avec pnpm
pnpm add lucide-react @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-collapsible clsx tailwind-merge
```

### 2. Installer les composants shadcn/ui

```bash
npx shadcn-ui@latest add button card input label badge avatar progress
```

Si vous n'avez pas encore initialisé shadcn/ui :

```bash
npx shadcn-ui@latest init
```

Répondez aux questions :
- Style: **Default**
- Color: **Neutral** ou **Slate**
- CSS variables: **Yes**

### 3. Vérifier `lib/utils.ts`

Assurez-vous que ce fichier existe avec :

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 4. Configurer Tailwind (optionnel)

Ajoutez ces couleurs personnalisées dans `tailwind.config.ts` si besoin :

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Vos couleurs custom
      },
    },
  },
}
```

## 📦 Composants créés

### ✅ 7 composants principaux

1. **Sidebar** - Navigation dashboard avec collapse
2. **StatsCard** - Cards de statistiques avec 4 variantes
3. **FormationCard** - Card de formation avec preview
4. **DashboardLayout** - Layout principal avec sidebar
5. **SettingsPage** - Page paramètres complète
6. **SalesPageHero** - Hero optimisé pour la conversion
7. **StudentSpace** - Espace élève avec progression

## 🎯 Pages d'exemple créées

Visitez ces URLs pour voir les composants en action :

- `/dashboard-example` - Dashboard complet avec stats
- `/sales-example` - Page de vente d'une formation
- `/student-example` - Espace membre élève
- `/settings-example` - Page de paramètres

## 📖 Documentation

Lisez le fichier `components/COMPONENTS_GUIDE.md` pour :
- Props de chaque composant
- Exemples d'utilisation détaillés
- Palette de couleurs
- Principes de design

## 🎨 Palette de couleurs

- **Primary** : Indigo (confiance, professionnalisme)
- **Success** : Emerald (revenus, validations)
- **Info** : Blue (élèves, informations)
- **Warning** : Amber (alertes)
- **Accent** : Violet (premium, CTAs)

**Contraste AAA garanti** ✅

## 🏃 Démarrer le projet

```bash
npm run dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📂 Structure des fichiers

```
/components
  ├── sidebar.tsx
  ├── stats-card.tsx
  ├── formation-card.tsx
  ├── dashboard-layout.tsx
  ├── settings-page.tsx
  ├── sales-page-hero.tsx
  ├── student-space.tsx
  └── COMPONENTS_GUIDE.md
  
/app
  ├── dashboard-example/page.tsx
  ├── sales-example/page.tsx
  ├── student-example/page.tsx
  └── settings-example/page.tsx
```

## ✨ Fonctionnalités

✅ **Mobile-first responsive**  
✅ **Dark mode ready**  
✅ **Animations subtiles** (200ms transitions)  
✅ **Accessible** (ARIA labels, navigation clavier)  
✅ **TypeScript strict**  
✅ **Performance optimisée**  
✅ **Contraste AAA** (lisibilité parfaite)  

## 🛠️ Technologies

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Components
- **Lucide React** - Icons
- **Radix UI** - Primitives

## 🎯 Prochaines étapes

1. **Tester** les pages d'exemple
2. **Remplacer** les données mock par vos vraies données
3. **Connecter** à votre API/Database
4. **Personnaliser** les couleurs si besoin
5. **Déployer** sur Vercel

## 🚨 Notes importantes

### Images

Les exemples utilisent des URLs Unsplash. Remplacez-les par vos vraies images :

```tsx
// ❌ Exemple
coverImage: "https://images.unsplash.com/..."

// ✅ Production
coverImage: "/uploads/formations/mon-image.jpg"
```

### Composants manquants

Si shadcn/ui vous manque des composants, installez-les :

```bash
npx shadcn-ui@latest add collapsible
```

### Dark mode

Pour activer le dark mode, ajoutez `next-themes` :

```bash
npm install next-themes
```

Puis configurez le provider dans votre layout.

## 💡 Conseils

### 1. Utiliser les variants

Les `StatsCard` ont 4 variants pour différencier visuellement les métriques :

```tsx
variant="revenue"   // Emerald (€)
variant="students"  // Blue (👥)
variant="sales"     // Violet (🛒)
variant="courses"   // Amber (🎓)
```

### 2. Optimiser les images

Utilisez toujours `next/image` :

```tsx
import Image from "next/image";

<Image
  src="/mon-image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="..."
/>
```

### 3. Gérer les états de chargement

Ajoutez des skeletons pendant le chargement :

```tsx
{isLoading ? (
  <div className="animate-pulse bg-neutral-200 h-24 rounded-xl" />
) : (
  <StatsCard {...props} />
)}
```

## 🐛 Problèmes courants

### "Module not found: @/components/ui/..."

Solution :
```bash
npx shadcn-ui@latest add button card input label badge avatar progress
```

### "cn is not defined"

Solution : Vérifiez que `lib/utils.ts` existe et est bien importé.

### Dark mode ne fonctionne pas

Solution : Ajoutez `next-themes` et configurez le provider.

## 📞 Support

Si vous avez des questions ou des bugs, créez une issue sur GitHub.

---

**Design fait avec ❤️ pour créer le meilleur SaaS de formations 2025**
