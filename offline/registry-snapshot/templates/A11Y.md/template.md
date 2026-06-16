# Accessibility Standards — {{project_name}}

<!-- AI agents: apply these accessibility standards when generating UI code -->

## Target Conformance

**WCAG {{wcag_level}}** — all new UI must meet this standard.

**Primary audience:** {{primary_audience}}

**UI framework:** {{ui_framework}}

## Required Practices

### Semantic HTML
- Use native HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`) before reaching for `<div>`
- Use heading levels (`h1`–`h6`) to communicate document structure, not for styling

### Keyboard Access
- All interactive elements must be reachable and operable by keyboard alone
- Focus order must be logical and follow visual layout
- Provide visible focus indicators — do not remove `outline` without a replacement

### Color & Contrast
- Text must meet minimum contrast ratio: 4.5:1 (normal text), 3:1 (large text) for Level AA
- Never use color as the sole means of conveying information

### Images & Media
- All meaningful images require descriptive `alt` text
- Decorative images use `alt=""`
- Video content requires captions

### Forms
- Every input requires a programmatically associated label (`<label for>` or `aria-label`)
- Error messages must be clear, specific, and associated with the relevant field
- Required fields must be marked and communicated to screen readers

### ARIA
- Prefer native HTML semantics over ARIA when possible
- Do not use ARIA roles that conflict with the element's native role
- All ARIA references (`aria-labelledby`, `aria-describedby`) must point to existing elements

## Testing

- Run automated checks with axe, Lighthouse, or equivalent before merging UI changes
- Manually test keyboard navigation on new interactive components
- Test with a screen reader (VoiceOver / NVDA) for complex interactions
