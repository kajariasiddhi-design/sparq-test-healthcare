# CLAUDE.md — SparQ Project Context

## What This App Does
SparQ is a market research & ad creation tool built for **Qube Cinema Technologies** (by MXV Consulting). Salespersons fill out brand questionnaires across 4 categories (FMCG, Industrial, Lifestyle, Organised Retail), then generate brand descriptions, ad worlds, ad pillars, and stories via AI. The app supports 5 languages: English, Hindi, Tamil, Telugu, Gujarati.

## Tech Stack
- **Framework**: React 19.1 with TypeScript 5.8
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS (utility classes used inline in components)
- **AI Integration**: `@google/genai` (Gemini API), plus OpenRouter API
- **PDF/Image**: jsPDF, html2canvas, JSZip
- **No backend** — this is a client-side SPA. Data is sent to external n8n webhooks for processing.
- **Dev server**: `npm run dev` (runs on port 3000)

## Folder Structure
```
sparq-current-version/
├── App.tsx                    # Main app component (99KB) — routing, state, webhook submission
├── index.tsx                  # React entry point
├── index.html                # HTML shell
├── index.css                 # Global CSS
├── types.ts                  # All TypeScript interfaces (FormData types, Story, World, etc.)
├── utils.ts                  # Data transforms, webhook payloads, form initializers (57KB)
├── constants.ts              # App-wide constants
│
├── components/
│   ├── LifestyleForm.tsx      # Lifestyle category form (59KB)
│   ├── RetailForm.tsx         # Retail category form (55KB)
│   ├── BrandForm.tsx          # FMCG + Industrial category form (shared, 39KB)
│   ├── AdCreative.tsx         # Ad worlds, pillars, stories UI
│   ├── QuestionRenderer.tsx   # Shared question rendering logic
│   ├── FormElements.tsx       # Reusable form UI components (Label, TextInput, Chips, etc.)
│   ├── PsychographicGrid.tsx  # Psychographic selection grid
│   ├── ImageUploader.tsx      # Image upload component
│   ├── PositioningStatement.tsx # Brand description display/edit
│   ├── LanguageSelector.tsx   # Language switcher
│   ├── SampleDataSelector.tsx # Sample profile loader
│   ├── LoadResponsesModal.tsx # Past responses loader
│   └── Settings.tsx           # App settings
│
├── data/
│   ├── translation-utils.ts   # addTranslations(en, hi, ta, te, gu) helper
│   ├── translations.ts        # Global UI translations (buttons, labels, modals)
│   ├── fmcgTranslations.ts    # FMCG form translations (imports sections)
│   ├── industrialTranslations.ts # Industrial form translations
│   ├── lifestyleTranslations.ts  # Lifestyle form translations
│   ├── retailTranslations.ts    # Retail form translations
│   ├── sampleProfiles.ts     # Pre-filled test data for 4 sample brands (151KB)
│   ├── psychographics.ts     # FMCG psychographic options
│   ├── lifestyleRetailPsychographics.ts # Lifestyle/Retail psychographic options
│   ├── industrialPsychographics.ts
│   ├── fmcg/section1-7.ts    # FMCG form questions by section
│   ├── industrial/section1-8.ts # Industrial form questions by section
│   ├── lifestyle/section1-8.ts  # Lifestyle form questions by section
│   └── retail/section1-8.ts     # Retail form questions by section
│
├── utils/
│   ├── api.ts                 # API call utilities
│   └── pdfGenerator.ts       # PDF export logic
│
├── hooks/                     # Custom React hooks
├── assets/                    # Static assets
└── public/                    # Public static files (images for form options)
```

## Translation System
All user-facing text uses a multilingual system:
```ts
// data/translation-utils.ts
export const addTranslations = (en, hi, ta, te, gu) => ({ en, hi, ta, te, gu });
```
Components receive a `lang` prop and access the correct language via `text[lang]`.

**Section files** (`data/*/section*.ts`) contain all question text, options, and placeholders with translations. These are clean.

**Top-level translation files** (`data/*Translations.ts`) aggregate sections and add shared strings.

## Key Data Flow
1. **Form data types** → `types.ts`: `NewFormData` (FMCG), `IndustrialFormData`, `LifestyleFormData`, `RetailFormData`
2. **Form components** → `BrandForm.tsx` (FMCG + Industrial, shared), `LifestyleForm.tsx`, `RetailForm.tsx`
3. **Webhook transforms** → `utils.ts` has one per category:
   - `transformDataForWebhook()` (FMCG)
   - `transformIndustrialDataForWebhook()`
   - `transformLifestyleDataForWebhook()`
   - `transformRetailDataForWebhook()`
4. **Response loading** → reverse mappers in `utils.ts`: `mapRawDataToFormData()` (FMCG), `mapRawDataToIndustrialFormData()`, `mapRawDataToLifestyleFormData()`, `mapRawDataToRetailFormData()`
5. **Sample profiles** → `data/sampleProfiles.ts` has 4 entries: Mom's Traditional Pickles (FMCG), Prakom Doors (Industrial), Zudio (Lifestyle), Vishal Mega Mart (Retail)

## Code Style & Conventions
- **Component pattern**: Each form is a single large functional component receiving `form`, `update`, `lang`, `suggestions` props
- **State management**: Lifted state in `App.tsx`, passed down via props (no Redux/Context)
- **Form field updates**: `update('fieldName', value)` callback pattern
- **"Others" fields**: Many questions have an "Others" option that reveals a text input. The text is stored in a separate field (e.g., `subCategory` + `subCategoryOther`, `whoDecides` + `whoDecidesOther`)
- **Naming**: camelCase for variables/functions, PascalCase for components, kebab-case for CSS
- **No semicolons required** — the codebase uses them inconsistently
- **Files use `.tsx` for components, `.ts` for utilities/data**
- **Line endings**: Mixed CRLF/LF (Windows project)

## Important Gotchas

### "Other" vs "Others" inconsistency
Some fields use `'Other'` (singular) and some use `'Others'` (plural) as the option value. Always check the actual option string in the section data file AND the form component before writing webhook logic.

### Large files
- `App.tsx` (99KB), `utils.ts` (57KB), `LifestyleForm.tsx` (59KB), `RetailForm.tsx` (55KB) — these are very large. Make targeted edits, not full rewrites.
- `sampleProfiles.ts` (151KB) — sample test data, has encoding corruption in non-English translations.

### Webhook payloads
The `transform*DataForWebhook` functions in `utils.ts` are the source of truth for what gets sent to n8n. When an option has an "Others" + text input, the webhook should send both (e.g., `"Apparel, Others: custom text"`), not just one or the other.

## Known Issues (As of May 2026)
1. **Q5.3 lifestyle**: Still has "Others" option that should be removed (`data/lifestyle/section5.ts` line 20)
2. **sampleProfiles.ts**: Non-English translations (Hindi, Tamil, Telugu, Gujarati) are corrupted with mojibake. English text is fine.
3. **Retail webhook**: Missing `storesListLink` field
4. **Other/Others consistency**: Not fully audited across all fields in both forms
