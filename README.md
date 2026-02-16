# Skills Agents Catalog

Application web React (Vite + TypeScript) pour parcourir un catalogue de skills, avec recherche, filtres, page detail, exemples d'appel multi-plateformes, et interface bilingue EN/FR.

## Attribution open source

Ce projet s'inspire du repository open source suivant et reutilise son registre public de skills :

- Source : `https://github.com/sickn33/antigravity-awesome-skills`

Le contenu des skills (noms, descriptions, metadata) n'est pas une creation originale de ce repository.  
Il provient du projet source et de ses contributeurs.

## Fonctionnalites

- Catalogue complet des skills depuis `skills_index.json` (pas de liste hardcodee)
- Recherche sur `id`, `name`, `description`, `path`
- Filtres par categorie (inference top-level) et `risk`
- Tri alphabetique par `id`
- Detail d'un skill via route dediee
- Exemples d'appel multi-plateformes (Codex, Claude Code, Cursor, Gemini CLI, Antigravity, Generic)
- Prompt en anglais (defaut) ou francais dans le bloc d'invocation
- UI bilingue EN/FR avec switch de langue
- Page separee "Manuel d'installation" depuis la navbar

## Stack technique

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Donnees statiques dans `public/data/skills_index.json`

## Structure du projet

```text
.
├── Apps/
│   └── skills-catalog/
│       ├── public/data/skills_index.json
│       ├── scripts/sync-skills.mjs
│       ├── src/
│       └── package.json
└── Repo-antygravity/   (source locale optionnelle pour la data)
```

## Prerequis

- Node.js 18+ (20+ recommande)
- npm

## Installation locale

```bash
cd Apps/skills-catalog
npm install
```

## Synchroniser les donnees de skills

### Methode recommandee

```bash
cd Apps/skills-catalog
npm run sync:skills
```

Le script :
1. clone/pull `https://github.com/sickn33/antigravity-awesome-skills` dans `vendor/antigravity-awesome-skills`
2. copie `skills_index.json` vers `public/data/skills_index.json`
3. valide que le JSON est bien un tableau non vide

### Fallback sans reseau (depuis la copie locale)

```bash
cp Repo-antygravity/.agent/skills/skills_index.json Apps/skills-catalog/public/data/skills_index.json
```

## Lancer en local

```bash
cd Apps/skills-catalog
npm run dev
```

Puis ouvrir l'URL affichee par Vite (souvent `http://localhost:5173`).

## Build de production

```bash
cd Apps/skills-catalog
npm run build
```

Sortie statique :

- `Apps/skills-catalog/dist/`

## Deploy

### Option 1 (recommandee) : hebergement statique

Deployer directement le contenu de :

- `Apps/skills-catalog/dist/`

Compatible Netlify, Vercel (mode static), Nginx, S3+CloudFront, etc.

### Option 2 : build en CI/CD

Inclure le projet `Apps/skills-catalog`, executer :

```bash
npm install
npm run build
```

## Scripts npm

Depuis `Apps/skills-catalog` :

- `npm run dev` : serveur de dev
- `npm run build` : build production
- `npm run preview` : preview du build
- `npm run sync:skills` : sync des donnees skills depuis le repo source

## Routes de l'application

- `/` : catalogue des skills
- `/installation` : manuel d'installation
- `/skills/:id` : page detail skill

## Push GitHub

Depuis la racine du repo :

```bash
git add .
git commit -m "docs: add complete README"
git push origin main
```
