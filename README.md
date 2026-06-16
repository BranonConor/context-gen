# context-gen

> Generate AI agent and developer context files from community-maintained conventions.

```bash
npx context-gen
```

---

## What it does

Context files like `AGENTS.md`, `CLAUDE.md`, `INCLUSION.md`, and `DESIGN.md` are emerging conventions in AI-assisted development. `context-gen` gives you an interactive CLI to generate any or all of them — properly tailored to your project via a questionnaire.

## Usage

### Interactive (recommended)

```bash
npx context-gen
```

Select which files to generate, answer a short questionnaire per file, and get ready-to-commit context files in your working directory.

### Flags

```bash
npx context-gen --all                          # generate all available templates
npx context-gen --files AGENTS.md,INCLUSION.md # generate specific files
npx context-gen --category agent               # generate by category
npx context-gen --yes                          # skip prompts, use all defaults
npx context-gen --offline                      # use bundled templates (no network)
npx context-gen --list                         # list available templates
npx context-gen --update INCLUSION.md          # regenerate an existing file
npx context-gen --registry <url>               # use a custom/private registry
```

## Available Templates

| File | Category | Description |
|---|---|---|
| `AGENTS.md` | agent | General instructions for any AI coding agent |
| `CLAUDE.md` | agent | Anthropic Claude-specific context |
| `INCLUSION.md` | culture | Inclusion & equity guidelines |
| `A11Y.md` | quality | WCAG accessibility standards |
| `DESIGN.md` | design | Design system conventions |

Templates are fetched from [context-registry](https://github.com/BranonConor/context-registry) at runtime, so they're always up to date. A bundled snapshot is included for offline use.

## How it stays fresh

- Templates live in a separate [context-registry](https://github.com/BranonConor/context-registry) repo
- The CLI fetches the latest templates at runtime (cached for 24 hours)
- No CLI update needed when conventions change — just the registry
- Community can submit new templates via PR to the registry

## Requirements

- Node.js 18+

## License

MIT
