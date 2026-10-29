# Rule of Thumb

Learn UI/UX rules by trying them. 16 short, interactive lessons on the laws of UX,
visual design, accessibility (WCAG) and feedback/forms. Each lesson has a live demo,
do/avoid guidance, a quick check, and sources.

Plus a Components section: 12 accessible components (accordion, tabs, modal dialog,
tooltip, dropdown menu, toast, buttons, text field, checkbox/radio, switch,
breadcrumbs, pagination) following the WAI-ARIA Authoring Practices. Each has a
working example, anatomy, keyboard and ARIA tables, common mistakes and copyable HTML.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Deploy (Netlify)

Build command `npm run build`, publish directory `dist`. Routing is hash-based
(`#/lesson/fitts-law`), so no redirect rules are needed.

## Project structure

- `src/data/lessons.js`: all lesson content (copy, do/avoid, quiz, sources). Add a lesson here.
- `src/demos/`: one interactive demo component per lesson
- `src/data/components.js`: all component content (anatomy, keyboard, ARIA, markup)
- `src/examples/`: one accessible, working example per component
- `src/components/FixIt.jsx`: the hero's "fix the next rule" sign-up card
- `src/lib/`: hash router, progress (localStorage), WCAG contrast maths
- `src/styles.css`: design tokens (light + dark) and all styles

## Adding a lesson

1. Create `src/demos/YourDemo.jsx`
2. Add an entry to `lessons` in `src/data/lessons.js` with a `category` id
