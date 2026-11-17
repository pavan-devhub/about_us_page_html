# FEED MSCS Ltd. — About Us (static HTML)

Plain HTML / CSS / JavaScript version of the React + Vite **About Us** page.
No build step, no framework, no dependencies: open `AboutUshtml.html` in a browser,
or upload the whole folder to any web host.

## Folder structure

```
ABoutUShtml/
├── AboutUshtml.html        # The page (semantic HTML5 + inline SVG icon sprite)
├── README.md
└── assets/
    ├── css/
    │   └── style.css       # All styles, mobile-first, with design tokens at the top
    ├── js/
    │   └── main.js         # "Read more" panels + "On This Page" active section
    ├── icons/
    │   └── favicon.svg
    └── images/             # Photos, logo, map, card, FEED WORLD card photos
```

> Hosting tip: most servers open `index.html` by default. If this page is the
> site's home page, rename `AboutUshtml.html` to `index.html` (nothing else
> needs to change; all paths are relative).

## Page structure

| Part | Markup |
| ---- | ------ |
| Skip link | `a.skip-link` → `#main` |
| Hero | `section.hero` — the company's full name (`p.hero__name`, the big title), `h1` "About Us" as a small label under it, FEED logo, quote, photo collage |
| On This Page | `nav.toc` with an ordered list of links to every section |
| Sections 01–08 | `section.section` (`section--media` = picture left / text right, `section--split` = text left / highlights right, `section--stacked` = text across the top, highlights full width under it, "Read more" centred — used by FEED WORLD) |
| FEED WORLD cards | `li.cover.cover--green` / `--orange` / `--purple` / `--blue` — masthead, two-tone `h3` title, description, three icon tiles, photo fading in on the right |
| Read more | `button.read-more` (`aria-expanded` / `aria-controls`) opening `div.section__more` |

Class names follow **BEM** (`block__element--modifier`).

## Responsive behaviour

| Width | Layout |
| ----- | ------ |
| < 520px | Phones: 2-up tiles, tiers and stats, one FEED WORLD card per row; number badge above each heading |
| ≥ 520px | Tiles and membership tiers go 4 across |
| < 680px | Impact table turns into stacked cards with labels |
| ≥ 760px | Section rows go two-column (picture/text or text/highlights) |
| ≥ 900px and ≥ 500px tall | Hero becomes the proportional design "artboard" that always fits in the window (capped at 1920px wide on very large monitors) |
| ≥ 1000px | FEED WORLD header splits in two: title and tagline left, description and chips right |
| ≥ 1100px | "On This Page" becomes a sticky side card (compact on short laptop screens, scrolls if the window is very short) |

Below 1100px "On This Page" is a sticky bar of chips that scrolls sideways.
Stats switch between 2 and 4 per row, and the FEED WORLD cards between 1 and
2 per row, based on the space they actually get (CSS container queries).
Inside each FEED WORLD card, type, icons and spacing scale with the card.

## Editing

- **Text**: edit it directly in `AboutUshtml.html` (each section is commented, e.g. `<!-- 03 · Our Impact -->`).
- **Colours / fonts**: the variables at the top of `assets/css/style.css`.
- **Images**: replace files in `assets/images/` (keep the same names, or update the `src`, `width` and `height` in the HTML).
- **Icons**: add a `<symbol id="i-name">` to the sprite at the top of `<body>`, then use `<svg class="icon"><use href="#i-name"></use></svg>`.
- **"Join FEED Today"**: set the `href` on `a.cta` to the sign-up page.
- **Add a "Read more" panel**: add a `button.read-more` with `aria-controls="<id>"` and a matching `div.section__more#<id>`; `main.js` wires it up automatically.

## Accessibility & performance

- Landmarks (`main`, `nav`), one `h1`, ordered `h2`/`h3`/`h4`, a skip link, visible focus styles.
- Alt text on every meaningful image; decorative images use `alt=""`.
- Closed panels are `inert` and hidden from screen readers; without JavaScript all panels stay open.
- Honours `prefers-reduced-motion`.
- The hero image is preloaded; all other images lazy-load and have `width`/`height` to prevent layout shift.
- FEED WORLD card photos are small WebP files (~45–50 KB each), cut from the cards design.
- Print styles print every "Read more" panel open.
