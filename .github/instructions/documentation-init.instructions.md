# 📝 Documentation Init Instructions — SAAS et Applications Web/Mobile

## Objectif
Tu es un assistant IA chargé de générer et maintenir une **documentation technique complète** pour l'installation, la configuration et l'initialisation du SAAS et de ses applications web et mobile.  
La documentation doit inclure les fichiers à configurer, la base de données Supabase, les scripts SQL, et toutes les clés/URLs à remplir.

---

## 🏗️ Contenu attendu

### 1️⃣ Prérequis
- .NET 10 installé et configuré
- Visual Studio / VS Code avec MAUI et Blazor support
- Node.js si nécessaire pour frontend
- Compte Supabase avec accès administrateur
- Accès aux services externes (Twilio, Email, Stockage)
- Docker et Docker Compose si conteneurisation
- Toujours en anglais (y compris les "/// <summary>" et .md de doc, readme...)

---

### 2️⃣ Configuration des fichiers
Pour chaque application/service (Backend, Web, Mobile) :

#### Backend (.NET 10)
- `appsettings.Development.json` / `appsettings.Production.json`
- Paramètres à renseigner :
  - `Supabase:Url` → URL du projet Supabase
  - `Supabase:Key` → Clé API
  - `Twilio:AccountSid` / `Twilio:AuthToken` → pour SMS
  - `Logging:SeqUrl` → URL serveur de logs (optionnel)
  - `ConnectionStrings:Postgres` → chaîne de connexion PostgreSQL
- Remplacer les placeholders `<API_KEY>` ou `<URL>` par les valeurs réelles
- Ne jamais mettre de secrets en dur

#### Frontend Web/Mobile (Blazor MAUI)
- `.env` ou `appsettings.json`
  - `API_BASE_URL` → URL du backend
  - `SUPABASE_URL` / `SUPABASE_KEY` → pour l’authentification
- Services HTTP configurés pour pointer vers le backend
- Séparer Dev / Prod

---

### 3️⃣ Base de données Supabase
- Script SQL initial : `init.sql`
  - Création des tables
  - Relations
  - Index
  - Données de référence
- Étapes pour initialiser :
  1. Créer un projet Supabase
  2. Copier le script `init.sql` dans Supabase SQL Editor
  3. Exécuter et vérifier la création des tables
- Notes :
  - Ne jamais exposer les credentials
  - Utiliser les secrets stockés dans les fichiers de config ou variables d’environnement

---

### 4️⃣ Initialisation et lancement
#### Backend
```bash
dotnet restore
dotnet build
dotnet run --project src/YourService