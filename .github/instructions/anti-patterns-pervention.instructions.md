---
applyTo: "**/*"
---

# Instructions Copilot – Anti-patterns Prevention

## Objectif
Éviter automatiquement toute dérive architecturale ou technique.

## Anti-patterns interdits
- Logique métier dans API/DTO
- Couplage Domain → Infrastructure
- SQL inline dans les endpoints
- Services génériques (Helper/Manager)
- God objects
- Classes > 200 lignes
- Méthodes > 30 lignes
- Namespaces mal structurés
- Mocks excessifs
- Conversions magiques / implicit behaviour
- Console.WriteLine

## Obligation
Si Copilot détecte un anti-pattern → proposer correction immédiate.