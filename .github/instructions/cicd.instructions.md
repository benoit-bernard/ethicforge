CI/CD — Instructions pour ce repository

Ce fichier décrit les règles et bonnes pratiques CI/CD adaptées à ce projet : microservices .NET 10, .NET MAUI, Blazor (WebAssembly/MAUI Hybrid) et Docker.

But : garantir une intégration continue reproductible, sécurisée et rapide sans introduire de régressions.

Principes généraux
- Cible : `dotnet 10.x` partout (actions `actions/setup-dotnet@v4` with `dotnet-version: "10.0.x"`).
- Pin des actions : épingler à une version patch (ex. `@v3.5.1` ou `@v4`) — pas de `@v3` seul.
- Pas de secrets en dur. Toujours utiliser `${{ secrets.* }}`.

Structure recommandée
- `.github/workflows/ci.yml` — lint (non bloquant), tests + coverage, upload artefacts
- `.github/workflows/pr-gate.yml` — validations PR légères (lint non-bloquant, dependency review, SAST non-bloquant, summary comment)
- `.github/workflows/codeql-analysis.yml` — analyse planifiée (non bloquante)
- `.config/dotnet-tools.json` — manifest des dotnet tools (commité)

Jobs et responsabilités
- `prepare-workloads` (windows-latest)
  - Exécute `dotnet workload restore` pour MAUI (android/ios/maccatalyst) — centralise l'installation des workloads.
  - Produit artefacts/caches réutilisables (workloadpacks cache).

- `lint` (windows-latest)
  - Exécute `dotnet format` uniquement sur projets non-MAUI.
  - `--no-restore` et `--report` pour produire un `lint-report/`.
  - Ne doit pas faire échouer la CI : `continue-on-error: true` + annotation `::warning::` + upload artefact.

- `test-coverage` (ubuntu-latest)
  - Exécute `dotnet restore` et `dotnet test` sur projets non-MAUI (plus rapide et moins cher que Windows).
  - Utiliser `dotnet tool manifest` (`.config/dotnet-tools.json`) + `dotnet tool restore` pour outils (ex. `reportgenerator`).
  - Générer HTML + TextSummary et uploader artefacts `coverage` et `coverage-report-html`.
  - Seuil configurable via variable `env.COVERAGE_THRESHOLD` ; si < seuil, créer `::warning::` (ne pas exit 1).

- `sast` (ubuntu-latest)
  - CodeQL `init` → `autobuild` → `analyze` dans un job séparé.
  - `continue-on-error: true` pour ne pas bloquer, upload SARIF (`codeql-results/`) + artefact `codeql-sarif`.
  - Parser SARIF et poster `::warning::` si alertes > 0.

- `docker-build` (ubuntu-latest)
  - Normaliser le nom du repo en minuscules : écrire `IMAGE_REPO=$(echo $GITHUB_REPOSITORY | tr '[:upper:]' '[:lower:]')` dans `GITHUB_ENV`.
  - Utiliser `context` + `file` dans `docker/build-push-action` pointant sur le dossier service (ex. `context: BACKEND`, `file: src/Services/Users/Users.API/Dockerfile`).
  - Ne pusher que depuis `main` ou tags : `if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/')`.
  - Option : matrix pour builder tous les services qui ont un Dockerfile.

Outils & manifest
- Créer et committer `.config/dotnet-tools.json` pour `reportgenerator` et autres outils CLI utilisés en CI.
- CI : `dotnet tool restore` puis `dotnet tool run <tool>` (éviter installation globale `--global`).
- Cacher `~/.nuget/packages` et `~/.dotnet/tools` avec `actions/cache@v3` (utiliser `hashFiles` du manifest pour la clé).

Sécurité & scans (non bloquants)
- Trufflehog : épingler une version patch (ex. `trufflesecurity/trufflehog@v3.5.1`).
- Dependency review : `actions/dependency-review-action@v1.2.0` non bloquant + `dotnet list package --vulnerable` pour rapport.
- CodeQL : upload SARIF automatique (`upload: always`) et artefact téléchargeable.
- Tous les scans produisent des `::warning::` et artefacts, mais ne doivent pas faire échouer la CI.

PR feedback
- Poster un commentaire sticky (par ex. `peter-evans/create-or-update-comment@v4`) résumant : lint outcome, coverage %, SAST alerts, dependency-review conclusion et liens artefacts.

Bonnes pratiques & règles
- N'introduire aucune régression : éviter `continue-on-error` sans reporter / notifier.
- Tests TDD : chaque modification de code nécessitant changements doit avoir tests unitaires associés.
- Docker : images non-root, base images officielles .NET 10, multi-stage builds, réduire la taille des images.
- Pin toutes les actions à une version patch.

Exemples utiles (snippets)
- Coverage threshold (PowerShell) :
  ```powershell
  $threshold = ${env:COVERAGE_THRESHOLD:-80}
  if ($pct -lt $threshold) { Write-Host "::warning::Coverage $pct% < $threshold%" }
  ```

- Docker push conditionnel (YAML) :
  ```yaml
  - name: Build & push
    if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/')
    uses: docker/build-push-action@v5
  ```

Monitoring / observabilité
- Veiller à conserver Serilog JSON + OpenTelemetry traces dans toutes les releases.

Validation & QA
- Toujours relancer la CI après modification des workflows.
- Avant merge : exécuter `dotnet tool restore` localement et s'assurer que `reportgenerator` fonctionne.

