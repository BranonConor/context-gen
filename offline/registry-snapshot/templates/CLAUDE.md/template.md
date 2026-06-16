# Claude Instructions — {{project_name}}

<!-- Anthropic Claude reads this file for project-specific context and instructions -->

## Project

{{project_description}}

**Stack:** {{tech_stack}}

## Response Style

{{preferred_response_style}}

## Behavior Guidelines

- Always read and understand existing code before suggesting changes
- Prefer minimal, targeted edits over broad rewrites
- Ask clarifying questions when requirements are ambiguous
- Do not hallucinate APIs or library methods — check what's actually available
- When showing code, show only what changed unless full context is requested

## What Claude Should NOT Do

- Do not modify files outside the scope of the current task
- Do not add new dependencies without explicit approval
- Do not remove error handling, tests, or comments without instruction
- Do not suggest architectural changes unless specifically asked
