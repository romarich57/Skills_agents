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

### Option 1 : Docker (app) + Nginx natif (host) pour `skills.romdev.cloud`

Le projet contient :

- `Apps/skills-catalog/Dockerfile`
- `Apps/skills-catalog/docker-compose.yml`
- `Apps/skills-catalog/deploy/nginx/skills.romdev.cloud.bootstrap.conf`
- `Apps/skills-catalog/deploy/nginx/skills.romdev.cloud.conf`

#### 1. Lancer l'app avec Docker

```bash
cd Apps/skills-catalog
docker compose up -d --build
```

Le conteneur expose l'app uniquement en local host sur `127.0.0.1:4173`.

#### 2. Bootstrap Nginx HTTP (pour generer le certificat)

```bash
sudo mkdir -p /var/www/certbot
sudo cp Apps/skills-catalog/deploy/nginx/skills.romdev.cloud.bootstrap.conf /etc/nginx/sites-available/skills.romdev.cloud.conf
sudo ln -sfn /etc/nginx/sites-available/skills.romdev.cloud.conf /etc/nginx/sites-enabled/skills.romdev.cloud.conf
sudo nginx -t
sudo systemctl reload nginx
```

#### 3. Generer le certificat SSL Let's Encrypt

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d skills.romdev.cloud
```

#### 4. Activer la conf Nginx finale HTTPS

```bash
sudo cp Apps/skills-catalog/deploy/nginx/skills.romdev.cloud.conf /etc/nginx/sites-available/skills.romdev.cloud.conf
sudo nginx -t
sudo systemctl reload nginx
```

Si besoin, adapte les chemins des certificats dans :

- `/etc/nginx/sites-available/skills.romdev.cloud.conf`

#### 5. Commandes utiles en prod

```bash
cd Apps/skills-catalog
docker compose ps
docker compose logs -f
docker compose pull
docker compose up -d --build
```

### Option 2 : hebergement statique classique

Construire puis deployer le dossier :

- `Apps/skills-catalog/dist/`

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
