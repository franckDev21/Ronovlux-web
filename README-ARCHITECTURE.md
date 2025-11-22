# Architecture de l'Application Renovlux Groupe

## Vue d'ensemble

Cette architecture moderne utilise Next.js 14 avec TypeScript, implémentant les meilleures pratiques pour une application scalable et maintenable.

## Structure du Projet

```
project/
├── app/                          # App Router Next.js 14
│   ├── layout.tsx               # Layout principal avec AppProvider
│   ├── page.tsx                 # Page d'accueil
│   └── globals.css              # Styles globaux
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI de base (shadcn/ui)
│   ├── sections/                # Sections de page
│   │   ├── ServicesSection.tsx  # Section services avec API
│   │   └── PortfolioSection.tsx # Section portfolio avec API
│   ├── forms/                   # Formulaires
│   │   └── ContactForm.tsx      # Formulaire de contact
│   ├── loading/                 # États de chargement
│   │   ├── Spinner.tsx          # Spinner de base
│   │   └── LoadingState.tsx     # États de chargement
│   └── error/                   # Gestion d'erreurs
│       └── ErrorState.tsx       # Composant d'erreur
├── context/                     # Contexte React
│   └── AppContext.tsx           # Contexte global de l'application
├── hooks/                       # Hooks personnalisés
│   ├── useServices.ts           # Hook pour les services
│   ├── usePortfolio.ts          # Hook pour le portfolio
│   ├── useProducts.ts           # Hook pour les produits
│   └── useContact.ts            # Hook pour les contacts
├── lib/                         # Utilitaires et services
│   ├── api/                     # Services API
│   │   ├── client.ts            # Client API générique
│   │   └── services.ts          # Services spécialisés
│   └── utils.ts                 # Utilitaires généraux
├── types/                       # Types TypeScript
│   └── index.ts                 # Définitions de types
└── env.example                  # Variables d'environnement
```

## Architecture des Données

### Types Principaux

- **Service** : Services proposés par l'entreprise
- **PortfolioItem** : Réalisations et projets
- **Product** : Produits disponibles
- **ContactFormData** : Données de contact

### Gestion d'État

1. **Contexte Global** (`AppContext`) : État partagé de l'application
2. **Hooks Spécialisés** : Logique métier par domaine
3. **État Local** : État spécifique aux composants

## Services API

### Client API Générique (`lib/api/client.ts`)

- Gestion des requêtes HTTP
- Gestion des erreurs centralisée
- Configuration des timeouts
- Support des uploads de fichiers

### Services Spécialisés (`lib/api/services.ts`)

- **ServicesApi** : Gestion des services
- **PortfolioApi** : Gestion du portfolio
- **ProductsApi** : Gestion des produits
- **ContactApi** : Gestion des contacts

## Hooks Personnalisés

### useServices
- `useServices()` : Tous les services
- `useActiveServices()` : Services actifs
- `useService(id)` : Service par ID
- `useServiceBySlug(slug)` : Service par slug

### usePortfolio
- `usePortfolio(options)` : Portfolio avec filtres
- `useFeaturedPortfolio(limit)` : Projets mis en avant
- `usePortfolioItem(id)` : Projet par ID
- `usePortfolioByCategory(category)` : Projets par catégorie

### useProducts
- `useProducts(options)` : Produits avec filtres
- `useProduct(id)` : Produit par ID
- `useAvailableProducts()` : Produits disponibles
- `useProductsByCategory(category)` : Produits par catégorie
- `useProductSearch(query)` : Recherche de produits

### useContact
- `sendMessage(formData)` : Envoi de message
- `subscribeNewsletter(email)` : Inscription newsletter

## Composants

### Sections
- **ServicesSection** : Affiche les services avec chargement et gestion d'erreurs
- **PortfolioSection** : Affiche le portfolio avec filtres

### Formulaires
- **ContactForm** : Formulaire de contact avec validation et intégration API

### États
- **LoadingState** : États de chargement configurables
- **ErrorState** : Gestion d'erreurs avec retry
- **Spinner** : Spinner de base

## Configuration

### Variables d'Environnement

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
```

### Métadonnées SEO

- Configuration dans `app/layout.tsx`
- Support Open Graph
- Optimisation pour le référencement

## Bonnes Pratiques Implémentées

1. **Séparation des Responsabilités** : Chaque couche a un rôle défini
2. **Type Safety** : TypeScript strict pour tous les composants
3. **Gestion d'Erreurs** : Gestion centralisée et user-friendly
4. **États de Chargement** : UX améliorée avec des indicateurs visuels
5. **Réutilisabilité** : Composants modulaires et configurables
6. **Performance** : Lazy loading et optimisation des requêtes
7. **Accessibilité** : Support des standards d'accessibilité
8. **SEO** : Métadonnées optimisées

## Utilisation

### Ajouter un Nouveau Service

```typescript
// 1. Ajouter le type dans types/index.ts
// 2. Étendre l'API dans lib/api/services.ts
// 3. Créer le hook dans hooks/
// 4. Utiliser dans les composants
```

### Ajouter un Nouveau Composant

```typescript
// 1. Créer le composant dans components/
// 2. Utiliser les hooks appropriés
// 3. Gérer les états de chargement et d'erreur
// 4. Exporter et utiliser
```

## Déploiement

1. Configurer les variables d'environnement
2. Déployer l'API backend
3. Déployer l'application Next.js
4. Configurer le domaine et SSL

Cette architecture garantit une application scalable, maintenable et performante.
