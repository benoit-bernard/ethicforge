# Instructions Copilot – Architecture Governance

## Objectifs
Garantir la cohérence de l’architecture globale dans le temps :
- Microservices autonomes
- Clean Architecture stricte
- CQRS + Vertical Slice
- Observabilité au cœur de chaque service
- Domain model indépendant de tout provider

## Règles obligatoires
- Un microservice = une unité fonctionnelle isolée.
- API → Application → Domain → Infrastructure (jamais l’inverse).
- Jamais d’accès DB depuis API ou Application.
- Pas de références croisées entre microservices.
- Pas de logique métier dans les endpoints ou DTO.
- Mapping strict Domain <→ Infrastructure.
- Tout nouveau code doit s’intégrer à la solution sans rupture.

## Structure
- Chaque microservice suit : Domain / Application / Infrastructure / API.
- Tout endpoint doit être ajouté dans `Endpoints/<Feature>`.
- Pas de « God services ».
- Pas de classes utilitaires génériques (Helper/Utils/Manager).