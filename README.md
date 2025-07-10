# CESIZen Back-Office

Interface d'administration pour le projet CESIZen, construite avec React et Vite pour un développement rapide et moderne.

## Prérequis

- Node.js (version 16 ou plus récente)
- npm ou yarn

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/CESIZen/back-office.git
cd back-office
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```
Éditez le fichier `.env` avec l'URL de votre API backend et autres configurations nécessaires.

## Lancement du projet

### Mode développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`

### Build de production
```bash
npm run build
```

### Aperçu du build de production
```bash
npm run preview
```

## Linting et formatage

### Lancer ESLint
```bash
npm run lint
```

### Corriger automatiquement les erreurs ESLint
```bash
npm run lint:fix
```

## Structure du projet

```
src/
├── components/      # Composants réutilisables
├── pages/          # Pages de l'application
├── hooks/          # Hooks personnalisés
├── services/       # Services API
├── utils/          # Utilitaires
├── types/          # Types TypeScript
├── styles/         # Styles CSS/SCSS
└── App.tsx         # Composant principal
```

## Technologies utilisées

- **React** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **TypeScript** - Langage de programmation
- **ESLint** - Linter JavaScript/TypeScript

## Configuration

### Configuration TypeScript avancée

Pour une application en production, il est recommandé d'activer les règles de lint TypeScript strictes :

```javascript
// eslint.config.js
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // Ou pour des règles plus strictes :
    // ...tseslint.configs.strictTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### Plugins React recommandés

Vous pouvez installer des plugins ESLint supplémentaires pour React :

```bash
npm install --save-dev eslint-plugin-react-x eslint-plugin-react-dom
```

## Déploiement

1. Créez le build de production :
```bash
npm run build
```

2. Les fichiers optimisés seront dans le dossier `dist/`

3. Déployez le contenu du dossier `dist/` sur votre serveur web

## Connexion à l'API

Assurez-vous que l'API backend (repository `api`) est lancée et accessible. Configurez l'URL de l'API dans votre fichier `.env` :

```env
VITE_API_URL=http://localhost:3000
```

## Licence

Ce projet est sous licence MIT.
