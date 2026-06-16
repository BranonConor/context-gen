# Inclusion Guidelines — {{project_name}}

<!-- AI agents: follow these inclusion standards in all generated code and content -->

## Team Context

- **Team size:** {{team_size}}
- **Frameworks:** {{frameworks}}
- **WCAG target:** {{wcag_level}}

## Inclusive Language Policy

{{inclusive_language_policy}}

## Core Principles

1. **Use inclusive language** in all code, comments, documentation, and UI text
2. **Avoid assumptions** about users' gender, ability, culture, or background
3. **Prioritize accessibility** — all UI components should meet WCAG {{wcag_level}} standards
4. **Represent diverse perspectives** in examples, variable names, and user stories
5. **Review for bias** — consider how generated content may affect underrepresented groups

## Code Standards

- Use `allowlist`/`denylist` instead of `whitelist`/`blacklist`
- Use `primary`/`replica` instead of `master`/`slave`
- Use gender-neutral pronouns (`they/them`) in documentation
- Avoid ableist terms (`crazy`, `blind to`, `deaf to`) — use precise language instead
- Name example users diversely: not just `Alice` and `Bob`

## UI & Content Standards

- All images require descriptive `alt` text
- All form inputs require visible, associated labels
- Color must not be the only means of conveying information
- Interactive elements must be keyboard accessible
- Error messages must be clear, non-blaming, and constructive

## AI Agent Instructions

When generating code, documentation, or content for this project:
- Apply the inclusive language policy above
- Flag any generated content that may use non-inclusive language
- Suggest accessible alternatives when generating UI components
- Default to WCAG {{wcag_level}} compliance for all interactive elements
