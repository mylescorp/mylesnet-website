# MylesNet Website Design System

The public website and portal share one semantic token set in `app/globals.css`. The light theme intentionally returns to the established MylesNet look in the previous site: warm pale backgrounds, orange emphasis, navy structure, restrained green connectivity/status cues, compact rounded cards, and generous section spacing.

## Brand colors

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--brand-primary` | `#1A395B` | `#F1F5F9` | Headings, navigation, structure |
| `--brand-action` | `#F57C00` | `#FF9D2E` | Main calls to action, links and active controls |
| `--brand-orange` | `#F57C00` | `#FF9D2E` | Brand highlights and icons |
| `--brand-accent` | `#0F766E` | `#59C7B7` | Connectivity and positive status |
| `--background` | `#FAFAFA` | `#0E2236` | Page canvas |
| `--surface` | `#FFFFFF` | `#142F4C` | Cards and panels |
| `--surface-raised` | `#FFF3E0` | `#1A395B` | Warm sections, inputs and raised surfaces |
| `--text-primary` | `#1C1917` | `#F1F5F9` | Main copy |
| `--text-secondary` | `#57534E` | `#CBD5E1` | Supporting copy |
| `--border` | `#FFD0A0` | `#34506B` | Card edges and dividers |

Orange buttons use `--on-action` so labels remain readable. In the light theme this is dark navy; in the dark theme it is deep blue. Orange is not used as small orange-on-pale body text. Links and focus states retain visible contrast. Statuses must use a text label/icon as well as color.

## Component rules

- Use the generated Tailwind semantic classes such as `bg-net-primary`, `text-net-accent`, `bg-net-surface`, `text-net-neutral-600`, and `border-net-border`.
- Do not add raw color values to page/component classes. Add or adjust shared CSS variables and semantic Tailwind mappings instead.
- The supplied logo image remains unchanged. The current logo has a light background, so place it on light surfaces unless a separately approved transparent or reversed asset is supplied.
- Primary buttons are at least 48px high, orange with theme-aware navy text. Secondary actions use a visible border or navy fill with the matching semantic foreground.
- Cards use a subtle warm border, light surface fill, consistent padding, and restrained shadows. Use orange borders as accents rather than coloring every surface.
- Use Inter for body/interface copy and Space Grotesk for headings. Keep body copy at least 16px on primary reading pages.
- All interactive elements need a visible keyboard focus ring, labels, accessible error feedback, and a touch target of at least 48px. Respect reduced-motion settings.
- The theme follows the system preference on first visit; an explicit light/dark selection is stored in local storage and applied before first paint.

## Dark theme

The dark theme carries the same orange/navy identity on deep blue backgrounds. Surfaces lift in navy steps, body copy remains light, and orange controls use deep navy labels. Avoid hard-coded white/black foreground classes on semantic surfaces; use semantic foreground tokens.

## Page experience

- Keep the homepage's two entry paths equal in size and prominence: internet for homes/communities, and network/security/managed services.
- Use short, descriptive section headings and direct calls to action.
- Prefer local, consented photos when available. Do not use scenic artwork as proof of local service coverage.
- Keep pages mobile-first and low-data. Do not publish unconfirmed prices, coverage, operating hours, client results, names, or technical capabilities.
