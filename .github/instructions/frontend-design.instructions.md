---
applyTo: "**/*"
---

# Instructions Copilot – FrontEnd Design

## Purpose
Define how frontend design code should structured and implemented.

## Principles
- Separation of concerns : .razor files should not contains any logic
- Separation of concerns : .razor files should not contains any style
- Use of CSS variables for theming and design consistency
- nested components for better organization and reusability
- nested css files should be used for layout/positioning
- Use of CSS classes for styling and design consistency
- A themed css file is used for colors, fonts, backgrounds, etc.

## forbidden anti-patterns
- Logic in .razor files
- Styles in .razor files
- Inline styles in .razor files

## Mandatory
- If Copilot detects an anti-pattern → propose immediate correction.
- If a modele/image file is provided → use it for design and layout inspiration.
- Strict respect of provided design and layout, if any.