# FatCat9 — Human Understanding Through Data

Interactive executive microsite. React + TypeScript + Tailwind CSS + Motion + Lucide.

## Run

```
npm install
npm run dev      # local preview
npm run build    # one self-contained file in dist/index.html
```

## Where to edit

| What | File |
| --- | --- |
| Colors, fonts, wordmark | `src/config/brand.ts` |
| Client name, footer, prior-work example | `src/config/client.ts` |
| All pillar copy | `src/content/pillars.ts` |
| Research agent prototype and its interface | `src/lib/agent.ts` |
| Pillar layouts | `src/pillars/*.tsx` |

## Reusing for another client

Edit `src/config/client.ts` (set `preparedFor` to show "Prepared for …" on the cover, and adjust `footerLabel` and `processExample`), then rebuild.

## Connecting a real research agent

`src/lib/agent.ts` defines `KnowledgeAgent`. Implement `ask(question)` against your retrieval service and pass it to `<KnowledgeViewA agent={yourAgent} />`. Keep evidence types labeled and do not merge studies with incompatible samples or methods.

## Navigation

- Shareable anchors: `#approach`, `#research`, `#data`, `#knowledge`, `#action`; deeper views with `-a` / `-b` (e.g. `#knowledge-a`); `#present` opens presentation mode.
- Keyboard: ← → move between chapters, P starts presenting. In presentation: ← → slides, E opens Explore More, Esc exits.
- Presentation mode: → next slide, ↓ goes into the chapter's A and B views, O shows all slides.
- "Copy link" buttons use `brand.shareUrl` in `src/config/brand.ts`; change it if the site is hosted elsewhere.

## Publishing (GitHub Pages)

Every push to `main` builds the site and publishes it with `.github/workflows/deploy.yml`.

1. Repository → Settings → Pages → Source: **GitHub Actions**.
2. Settings → Pages → Custom domain: `www.fatcat9.com`, then tick **Enforce HTTPS** once it appears.
3. DNS at your domain registrar (keep MX records and nameservers as they are, so email keeps working):
   - `@` → A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `www` → CNAME `fatcat9-ia.github.io`

## Contact

The Contact button and LinkedIn link are set in `brand.contact` (`src/config/brand.ts`). The email is assembled only when someone clicks, so it never appears as text on the page.
