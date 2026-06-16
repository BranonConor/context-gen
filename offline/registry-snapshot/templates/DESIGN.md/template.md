# Design System — {{project_name}}

<!-- AI agents: follow these design conventions when generating UI code -->

## Design System

**Base system:** {{design_system}}
**Token format:** {{token_format}}

## Principles

1. **Consistency** — use existing tokens and components before creating new ones
2. **Accessibility first** — every UI decision must consider keyboard, screen reader, and contrast requirements
3. **Composability** — prefer small, composable components over large monolithic ones
4. **No magic numbers** — use design tokens for spacing, color, and typography

## Tokens

<!-- Update with your actual token values -->

### Colors
```
--color-primary: #...
--color-secondary: #...
--color-surface: #...
--color-on-surface: #...
--color-error: #...
```

### Spacing
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
```

### Typography
```
--font-sans: ...
--font-mono: ...
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
```

## Component Conventions

- Components are co-located with their styles and tests
- Props use descriptive names — avoid single-letter or abbreviated names
- Boolean props use `is` / `has` prefix (`isDisabled`, `hasError`)
- Event handlers use `on` prefix (`onClick`, `onSubmit`)
- Do not hardcode colors or spacing — always reference tokens

## AI Agent Instructions

When generating UI components for this project:
- Use {{design_system}} conventions and utilities
- Reference design tokens (`{{token_format}}` format) for all visual values
- Never hardcode hex colors or pixel values
- Include appropriate ARIA attributes for interactive elements
