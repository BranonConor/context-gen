# INCLUSION.md

> A repository-level context engineering document that gives AI coding
> assistants inclusion-oriented guidance during software generation workflows.

`INCLUSION.md` is the inclusion-oriented sibling of `A11Y.md`, `CONTRIBUTING.md`,
and `DESIGN.md`. Where `A11Y.md` operationalizes technical accessibility
compliance, `INCLUSION.md` operationalizes the contextual, representational, and
sociotechnical considerations that AI-assisted development tends to flatten.

This file is intended to be read by **both humans and AI coding assistants**
(Copilot, Cursor, Claude Code, Windsurf, Continue, etc.) as part of repository
context. It is a living document. Edit it. Argue with it. Localize it.

---

## 0. How To Use This File

1. Copy `INCLUSION.md` into the root of your repository alongside `README.md`,
   `CONTRIBUTING.md`, and `A11Y.md` (if you have one).
2. The **Project Context** section below has been pre-filled for your project —
   review it and edit as needed.
3. Reference it explicitly from your AI assistant configuration:
   - **GitHub Copilot:** `.github/copilot-instructions.md` → `Follow the inclusion guidance in /INCLUSION.md.`
   - **Cursor:** `.cursor/rules/inclusion.mdc`
   - **Claude Code:** reference from `CLAUDE.md`
   - **Continue / Windsurf:** include as a workspace context file
4. Review and update this file on a cadence — inclusion is not a one-time configuration.

> **Important limitation.** This file does not eliminate model bias. Bias
> mitigation is an unresolved sociotechnical problem. Inclusion still requires
> participatory research, disabled practitioners, accessibility expertise,
> diverse teams, human review, and structural accountability.
> `INCLUSION.md` is an operational layer, not a substitute.

---

## 1. Project Context

### 1.A Overview

- **Product:** {{product}}
- **Primary users:** {{primaryUsers}}
- **Known underserved users:** {{underservedUsers}}
- **Distribution context:** {{distribution}}
- **Stakes:** {{stakes}}

Generated code, copy, and interaction patterns should be evaluated against the
context above before being merged.

### 1.B Design Decisions

Conscious tradeoffs documented as part of this project's inclusion posture.
These are not aspirations — they're current realities, surfaced so reviewers
(human and AI) can flag when generated output assumes otherwise.

**Core assumptions**
- _Primary audience:_ {{primaryAudience}}
- _Implicit defaults:_ {{implicitDefaults}}

**Authentication & access**
- _Methods supported:_ {{authMethods}}
- _Known exclusion:_ {{authExcluded}}
- _Reason for choice:_ {{authReason}}

**Information collection**
- _Information collected:_ {{infoCollected}}
- _Why it's required:_ {{infoRationale}}

**Interaction model**
- _Interaction modes:_ {{interactionModes}}
- _Patterns not supported:_ {{unsupportedPatterns}}

**Communication & language**
- _Languages supported:_ {{languages}}
- _Communication style:_ {{communicationStyle}}

**Edge cases & intersections**
- _Known breakage scenarios:_ {{knownBreakage}}
- _Unexpected users:_ {{unexpectedUsers}}

---

## 2. Core Principle

> **Do not optimize for a single "default user."**

Inclusive systems support diverse:

- cognitive models and processing speeds
- communication styles and language patterns
- sensory experiences
- motor capabilities
- cultural contexts and lived experiences
- literacy levels and reading comprehension
- assistive technologies
- network, device, and battery conditions

When generated output assumes "the average user," it is almost always assuming a
non-disabled, English-fluent, neurotypical user with a fast connection, a modern
device, and full sensory and motor capability. That user is a statistical
artifact, not a person.

**Reference:** Kat Holmes, _Mismatch: How Inclusion Shapes Design_,
<https://mitpress.mit.edu/9780262539485/mismatch/>

---

## 3. Known Training Data Risks

Large language models are trained largely on public web data, open-source code,
and curated text corpora. Empirical research has documented systemic biases
inherited from this distribution. Generated output may reflect:

- **Inaccessible implementation patterns.** The public web fails WCAG at enormous scale; models trained on it inherit those failures. See WebAIM Million.
- **Western, English-centric assumptions.** Date formats, name structures, address formats, currency, units, reading direction, color symbolism.
- **Ableist language patterns.** "Sanity check," "crippled," "blind to," "tone-deaf," "lame," "dummy variable," "crazy," "insane."
- **Neurotypical communication defaults.** Implicit assumptions about conciseness, eye contact, linear narrative, "professional tone."
- **Underrepresentation of disability communities.** Disabled users framed as edge cases rather than first-class users.
- **Exclusionary UX conventions.** Hover-only interactions, tiny touch targets, color-only state, time-limited flows, motion without preference checks.
- **Deficit framing.** Disability described as something to overcome, inspirational, or tragic rather than as part of human variation.
- **Intersectional erasure.** Disabled people who are also Black, Indigenous, trans, women, non-Western, or non-English-speaking are particularly underrepresented in training data.

**Research references:**
- WebAIM Million Report — <https://webaim.org/projects/million/>
- _ABLEIST: Measuring Ableist Harms in LLMs_ — <https://arxiv.org/abs/2510.10998>
- _Centering the Margins_ — <https://dl.acm.org/doi/10.1145/3613904.3642233>
- Brookings, _How AI can better serve people with disabilities_ — <https://www.brookings.edu/articles/how-ai-can-better-serve-people-with-disabilities/>

---

## 4. Communication Diversity Guidance

When generating UI copy, error messages, onboarding flows, documentation, or
chat-style interactions, **do not assume**: linear thinking, concise communication,
neurotypical conversational structure, high reading comprehension, rapid processing
speed, English fluency.

Instead, **support**:

- progressive disclosure (summary first, detail on demand)
- multimodal communication (text + visual + audio where appropriate)
- flexible interaction pacing (no forced timers without an opt-out)
- non-linear workflows (let users return, restart, branch, undo)
- redundant comprehension cues (icon + label + tooltip, not icon alone)
- plain language by default (General consumer copy: US grade 7–8. Critical flows: US grade 6.)

See <https://www.plainlanguage.gov/>.

---

## 5. Disability Representation Guidance

**Avoid:** inspiration-porn framing, deficit-based language ("suffers from,"
"wheelchair-bound"), infantilization, framing accessibility as charity,
tokenized representation, assuming disability is rare or visible.

**Prefer:** agency-centered language ("a wheelchair user," "a blind developer"),
disabled users as domain experts and engineers, representation across intersections.

**Language:** Default to identity-first language ("disabled person," "Autistic
person," "Deaf person") unless a community prefers otherwise. Avoid euphemisms
like "differently abled" or "special needs."

**References:**
- Disability Visibility Project — <https://disabilityvisibilityproject.com/>
- NCDJ Style Guide — <https://ncdj.org/style-guide/>

---

## 6. Cognitive Accessibility

Generated experiences should:

- minimize unnecessary memory load across screens
- chunk long workflows into clearly labeled steps
- preserve user state aggressively (autosave, recoverable errors)
- avoid time pressure, surprise modals, and unexpected context shifts
- avoid auto-playing media, motion, or sound by default
- respect `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-color-scheme`
- support undo wherever feasible

**Reference:** W3C Cognitive Accessibility — <https://www.w3.org/WAI/cognitive/>

---

## 7. Inclusive Language Heuristics

| Avoid | Prefer |
|---|---|
| sanity check | quick check, smoke test |
| dummy variable | placeholder, sample value |
| blacklist / whitelist | blocklist / allowlist |
| master / slave | primary / replica |
| crazy, insane | surprising, unexpected |
| blind to, tone-deaf | unaware of, missing context on |
| crippled, lame | broken, limited, degraded |
| guys (group) | folks, everyone, team |
| mankind / manpower | humanity / staffing |
| normal user | typical user, default user |
| suffers from | has, lives with |
| wheelchair-bound | wheelchair user |

**References:**
- Conscious Style Guide — <https://consciousstyleguide.com/>
- Inclusive Naming Initiative — <https://inclusivenaming.org/>

---

## 8. Engineering Guidance

Generated code should:

- preserve semantic HTML structure (`<button>`, `<nav>`, `<main>`, `<label>`, headings in order)
- support keyboard interaction for every interactive element
- support screen readers (correct roles, names, states, live regions)
- maintain visible focus indicators meeting WCAG 2.4.11 contrast
- meet WCAG 2.2 color contrast: 4.5:1 body text, 3:1 large text and UI
- support text resize up to 200% without loss of content or functionality
- support `prefers-reduced-motion`, `prefers-color-scheme`, `forced-colors`
- support touch targets of at least 44×44 CSS pixels
- avoid time-limited interactions without an extend/disable option
- never hardcode user-facing strings, dates, numbers, currencies, or units
- support RTL layouts, variable text length, non-Latin scripts, full Unicode
- handle slow networks, offline, and low-end devices

**References:**
- WCAG 2.2 — <https://www.w3.org/TR/WCAG22/>
- ARIA Authoring Practices — <https://www.w3.org/WAI/ARIA/apg/>
- Inclusive Components — <https://inclusive-components.design/>

---

## 9. AI Generation Review Prompts

Before merging AI-generated output, evaluate it against:

1. Does this output assume a single "default user"? Who is excluded?
2. Could this exclude users with cognitive, communication, or processing differences?
3. Does this require unnecessary precision, memory load, or speed?
4. Are disabled users represented with agency and autonomy?
5. Would this work across multiple sensory modalities?
6. Does generated language reinforce stereotypes or ableist metaphors?
7. Are alternative workflows available for users who can't complete the "happy path"?
8. Is complexity user-controlled, or system-imposed?
9. Does this work on a slow network, low-end device, in a non-English language, in RTL?
10. Does this respect user consent, privacy, and the right to opt out?
11. Whose lived experience would catch the failure mode I cannot see?

---

## 10. Domain-Specific Extensions

Extend this document with sections specific to your domain:

- **Healthcare:** PHI handling, plain-language consent, mental-health crisis pathways
- **Financial services:** plain-language fee disclosure, unbanked users, predatory dark patterns
- **Civic / government:** language access, identity documentation assumptions
- **Education:** age-appropriate language, neurodivergent learners, shared-device contexts
- **Hiring / HR:** name pronunciation, gender beyond binary, disability disclosure

---

## 11. What This File Does Not Do

`INCLUSION.md` is **not**:
- a substitute for participatory research with disabled users
- a substitute for hiring disabled designers, engineers, and researchers
- a substitute for accessibility audits and remediation
- a substitute for legal compliance (ADA, EAA, AODA, Section 508, EN 301 549)
- a one-time deliverable

It is an operational scaffold. The ceiling is raised by people — especially disabled people — with authority, budget, and time.

---

## 12. Maintenance

- **Owner:** {{owner}}
- **Review cadence:** {{cadence}}
- **Change log:** Track meaningful changes in [`CHANGELOG.md`](./CHANGELOG.md) or in repository releases.
- **Feedback:** {{feedback}}

---

## 13. Attribution & License

This `INCLUSION.md` template is published at
<https://github.com/BranonConor/inclusion.md> under the MIT License. It
originates from the essay _The need for INCLUSION.md_ by Brano Conor
(<https://branon.dev/blog/posts/the-need-for-inclusion-md>).

You are encouraged to adapt, fork, translate, and improve it.
