# Steplo

Config-driven multi-step forms for React. Define a form as a single JSON config,
get a fully validated, animated, themeable stepper form out of it. No
hand-written form markup per project.

Sibling project: [Tablo](https://github.com/AzzVipe/tablo) is the same
config-driven approach applied to data tables in Vue/Nuxt. Steplo is the React
counterpart, built for multi-step forms.

**[Live demo](#)** &nbsp;·&nbsp; **[GitHub](https://github.com/AzzVipe/steplo)**

---

## What this is

Most form libraries make you write a component tree by hand for every form you
build: one form, one file, one set of validation rules, one layout. Steplo
inverts that. You write a config object describing your steps and fields, and
the engine handles rendering, step navigation, conditional field visibility,
validation, and theming.

The three demo forms in this repo (Freelance Project Intake, Conference Speaker
Submission, Product Warranty Claim) are three completely different domains,
rendered by the exact same six files underneath. That's the actual point of the
project: the config drives the UI, not the other way around.

## Features

- **JSON-driven schema.** Steps and fields, described as data.
- **Conditional field visibility.** `showIf` shows or hides any field based on
  another field's current value. Hidden fields are automatically excluded from
  validation.
- **Step-level skip logic.** `skipStepIf` jumps straight past an entire step
  when a condition matches, no manual step-index math.
- **Dynamic Zod validation.** A validation schema is regenerated on every
  change, respecting current field visibility. Multi-level conditional chains
  (field B depends on field A, field C depends on field B) work correctly.
- **13 built-in field types.** Text, number, textarea, select, linked
  (dependent) select, choice card, choice chip, visual card select, chip
  multi-select, tag input, address autocomplete, date range picker, file upload.
- **6 themes.** Every color is a CSS custom property. Switching themes is one
  attribute change, no component touches its own colors directly.
- **5 stepper styles.** Classic circles, minimal line, segmented pills, chevron
  breadcrumb, vertical timeline. Swappable independently of theme.
- **Fully typed.** A discriminated `FieldType` union and `Record`-based
  registries mean a field type that's missed anywhere fails to compile, not at
  runtime.
- **Tested core logic.** The schema generator and step engine, the two hardest
  pieces, are covered by unit tests (Vitest), including the multi-level
  conditional chain.

## Quick example

```ts
{
  name: "hasBranding",
  type: "choiceCard",
  label: "Do you have existing branding?",
  options: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
}
{
  name: "brandAssets",
  type: "fileUpload",
  // only rendered, and only validated, when hasBranding = "yes"
  showIf: { field: "hasBranding", equals: "yes" },
  validation: { required: true },
}
```

That's the whole mechanism. No conditional JSX, no manual field toggling in a
component. The step engine reads `showIf` to decide what's visible, and the
schema generator reads it to decide what's required.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · React Hook Form · Zod · Framer
Motion · React Router · Vitest

## Getting started

```bash
git clone <this-repo>
cd steplo
npm install
npm run dev
```

Other scripts:

```bash
npm run build       # typecheck (tsc --noEmit) + production build
npm run test         # run the test suite once
npm run test:watch   # run tests in watch mode
npm run lint         # eslint
```

## Project structure

```
src/
  config/            form configs (one file per demo form)
  types/form.ts       central type definitions (FieldType, FormField, FormConfig, ...)
  engine/
    buildFormZodSchema.ts   generates a Zod schema from config, respecting showIf
    optionsResolver.ts      resolves static/reference option sources
    iconRegistry.tsx        maps icon name strings from config to actual components
  hooks/
    useFormEngine.ts        owns RHF, step navigation, skip logic, submit
  Fields/             one component per field type + the registry (index.tsx)
  components/
    DynamicForm.tsx    renders the current step's fields, wraps everything
    steppers/           one component per stepper style + the registry
  theme/               global theme state (React context, not per-route)
  stepper/             global stepper-style state, same pattern as theme
  pages/               the landing page and the per-form showcase page
  test/                unit tests for the engine and the hook
```

## How it works

**Schema generation.** `buildFormZodSchema.ts` walks the field list and builds a
Zod object schema. For each field, it checks `showIf` against the current form
values. If the field is hidden, its rule is relaxed to `z.any().optional()`
regardless of what its own `validation.required` says. This is what makes
conditional required-ness work without any manual coordination.

**Step engine.** `useFormEngine.ts` owns step index, direction (for the slide
animation), and the actual RHF instance. `goNext` validates only the fields
visible on the _current_ step, then checks whether any field on that step has a
`skipStepIf` whose condition matches the submitted values. If so, it jumps
straight to the target step id. Otherwise it advances by one.

**Field registry.** Every field type is a small component implementing the same
`FieldComponentProps` interface (`field`, `register`, `control`, `error`).
`Fields/index.tsx` maps `FieldType` to component via a `Record`, so adding a
14th field type never touches `DynamicForm`, the schema generator, or any other
field's code.

**Theme and stepper style.** Both are global React context, independent of route
and independent of each other. Switching either sets a `data-theme` attribute
(theme) or swaps a component out of a registry (stepper style). Neither one
requires a prop passed down through the field components.

## Adding a new field type

1. Add the type name to the `FieldType` union in `types/form.ts`.
2. Build the component in `Fields/`, implementing `FieldComponentProps`.
3. Register it in `Fields/index.tsx`.
4. Add a case to `buildFormZodSchema.ts`'s switch if it needs a distinct
   validation shape (TypeScript will fail to compile if you forget, thanks to
   the exhaustiveness check).

## Testing

```bash
npm run test
```

18 tests across two files:

- `buildFormZodSchema.test.ts`: all `showIf` operators, required/optional
  handling per field type, and the real two-level conditional chain from the
  Freelance Intake config (`needsOngoingSupport` &rarr; `supportTier` &rarr;
  `supportHoursPerMonth`).
- `useFormEngine.test.ts`: `goNext` blocked by an invalid required field,
  `goNext` succeeding and firing the step-change callback, `skipStepIf` actually
  jumping past a step, the non-skip path landing on the normal next step, and
  back-navigation skipping validation.

## Known limitations

Being upfront about what's a stand-in rather than production-complete:

- `addressAutocomplete` uses a hardcoded `<datalist>`, not a real geocoding API.
- `fileUpload` and `dateRangePicker` validate presence but not deeper
  constraints (file size/count, date ordering).
- The options resolver's `reference:` sources are local static data, standing in
  for what would be a real API call.
- Submit is simulated (a delay + a success screen), since this repo has no
  backend. The `onSubmit` callback is where a real integration would go.

## Author

Built by Azmat Ali.

Currently open to senior frontend / full-stack roles (Vue, Nuxt, React,
Node.js). If you're hiring or have a project in mind: **azmat.jobs@gmail.com**
