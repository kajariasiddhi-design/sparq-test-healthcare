/**
 * MOOD BOARD
 *
 * Generates the 3x3 mood board image for a storyboard concept through OpenRouter, using the team's
 * master storyboard prompt. Pictures and logos uploaded at the storyboard stage are sent with it as
 * references.
 */

import type { Story, UploadedImage } from '../types';
import { callOpenRouterImage } from './api';

// Same image model as the worlds stage (Gemini 3 Pro Image). The team's own tool uses GPT Image 2
// ('openai/gpt-5.4-image-2'), which was down on OpenRouter when this was set.
export const MOOD_BOARD_MODEL = 'google/gemini-3-pro-image-preview';
// Set to true for a model that only returns square images (e.g. 'openai/gpt-5-image-mini'): nine
// 16:9 panels do not fit a square 3x3 grid, so the prompt then asks for square panels instead.
const SQUARE_CANVAS = false;

/** Most reference images sent with one request. */
export const MAX_REFERENCE_IMAGES = 8;

/** Longest side of a reference image after resizing, to keep requests small. */
const REFERENCE_MAX_SIDE = 1536;


/** The team's master prompt, as used in their image tool. */
const MASTER_PROMPT = `MASTER PROMPT — PROFESSIONAL CINEMATIC 3×3 STORYBOARD
Analyse the uploaded advertisement script thoroughly and transform it into a high-end, photorealistic cinematic storyboard featuring exactly 9 key shots arranged in a 3×3 grid.
Select the most important visual moments that communicate the complete narrative, maintaining the exact story sequence, character actions, emotions, and scene transitions.
Visual Direction:

* Premium cinematic advertising photography with realistic lighting, natural skin textures, and professional colour grading.
* Carefully composed shots using appropriate wide, medium, close-up, and cinematic camera angles.
* Strict consistency in character identity, facial features, costumes, props, locations, and lighting across all frames.
* Authentic environments, natural performances, and visually compelling storytelling.
* Follow all uploaded character, product, and location references accurately.

Composition & Output:

* Exactly 9 distinct shots in a clean 3×3 grid, arranged chronologically from left to right, top to bottom.
* Each panel must maintain a cinematic 16:9 composition.
* Thin, subtle dividers separating the panels.
* No text, captions, shot numbers, watermarks, or unnecessary visual elements.
* Do not modify the original narrative or introduce additional characters or scenes.

Final Deliverable: One high-resolution, ultra-photorealistic 3×3 storyboard image with the visual quality, cinematic depth, and production standards of a premium theatrical advertisement.`;

export interface MoodBoardImage {
    dataUrl: string;
    width: number;
    height: number;
}

export interface MoodBoardRequest {
    brandName: string;
    category?: string;
    conceptTitle: string;
    story: Story;
    /** Pictures and logos uploaded at the storyboard stage */
    references?: UploadedImage[];
}

const toDataUrl = (img: UploadedImage): string =>
    img.data.startsWith('data:') ? img.data : `data:${img.mimeType || 'image/png'};base64,${img.data}`;

/** The advertisement script the master prompt asks the model to analyse. */
const buildScript = ({ brandName, category, conceptTitle, story }: MoodBoardRequest): string => {
    const lines = [
        `Brand: ${brandName}`,
        category ? `Category: ${category}` : '',
        `Concept: ${conceptTitle}`,
        story.genre ? `Genre: ${story.genre}` : '',
        story.overview ? `Overview: ${story.overview}` : '',
        `Story: ${story.story || story.storyline || story.logline || ''}`,
        story.ending_moment ? `Ending moment: ${story.ending_moment}` : '',
        story.tagline ? `Tagline (for context only, do not write it in the image): ${story.tagline}` : '',
    ];
    return lines.filter(Boolean).join('\n');
};

/** Tells the model how to use the attached pictures and logos. */
const buildReferenceNotes = (count: number): string => count === 0 ? '' : `

UPLOADED REFERENCES
${count} image${count === 1 ? ' is' : 's are'} attached: real pictures and logos of this brand, such as its logo, products, packaging, premises or people. Study each one and follow it accurately:
* Match products and packaging exactly in shape, colours, labels and branding.
* Show the brand logo only where it would really appear, such as signage or packaging, and copy it exactly. Do not invent other logos.
* Match any real locations and people shown.`;

/**
 * The checks Marcom otherwise does by hand before a mood board goes into the deck: product accuracy,
 * brand logo consistency, character continuity, locations and overall visual quality.
 */
const QUALITY_CHECKS = `

QUALITY CHECKS
Before you finish, check the storyboard against each point below and fix anything that fails. The image must be ready for the client deck without further editing.
0. Grid: count the panels. There must be exactly 9, in 3 rows of 3 (3 columns across, 3 rows down). Not 6, not 2 columns.
1. Product accuracy: every product and pack matches the attached pictures exactly (shape, colours, label, branding). If no product picture is attached, show products that fit the brand and the script, and draw them the same way in every panel. Never show competitor brands.
2. Brand logo consistency: wherever the logo or brand name appears, it is identical in every panel, with the same design and colours and the brand name spelled correctly. If no logo is attached, keep brand signage simple and consistent; do not invent a logo design.
3. Character continuity: each character keeps the same face, age, build, hairstyle and clothing in every panel they appear in. No extra or missing characters compared with the script.
4. Locations: each location stays the same across the panels set there, with the same layout, décor, colours and lighting, and fits the script and an authentic Indian setting. Match any attached location pictures.
5. Overall visual quality: natural faces, hands and bodies, with no extra or missing fingers or limbs; no garbled or misspelled text anywhere; no blur, artefacts or duplicated panels; consistent colour grading across all nine panels.
6. No added text: no captions, subtitles, dialogue, speech bubbles, scene headings (such as "Interior, Day") or labels on the panels. The only text allowed is what physically exists in the scene, such as signage and packaging.`;

// Image models can answer in text instead, so ask for the image itself
const OUTPUT_INSTRUCTION = SQUARE_CANVAS
    ? '\n\nCANVAS\nThe output image is square. Instead of 16:9 panels, divide it into 3 equal columns and 3 equal rows: 9 square panels, each framed cinematically. Never reduce the number of panels to fit wider shots.\n\nGenerate the storyboard image now. Reply with the image only, not a written analysis or shot list.'
    : '\n\nGenerate the storyboard image now: one landscape image divided into a 3 × 3 grid of 9 wide panels (3 columns, 3 rows). Reply with the image only, not a written analysis or shot list.';

export const buildMoodBoardPrompt = (req: MoodBoardRequest): string =>
    `${MASTER_PROMPT}\n\nADVERTISEMENT SCRIPT\n${buildScript(req)}\n(The dialogue and lines above tell you what happens. Show it through action and expression only; never write any of it in the image.)${buildReferenceNotes(Math.min((req.references || []).length, MAX_REFERENCE_IMAGES))}${QUALITY_CHECKS}${OUTPUT_INSTRUCTION}`;

/** PNGs up to this size stay PNG (logos, keeping transparency); bigger ones become JPEG. */
const KEEP_PNG_MAX_BYTES = 400_000;

/**
 * Reads an uploaded file and shrinks it so the longest side is at most 1536px. Small PNGs such as
 * logos stay PNG to keep transparency; photos and large PNGs become JPEG on a white background.
 */
export const prepareReferenceImage = (file: File): Promise<UploadedImage> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
        reader.onload = () => {
            const original = String(reader.result);
            const img = new Image();
            img.onerror = () => reject(new Error(`${file.name} is not an image the browser can open.`));
            img.onload = () => {
                const scale = Math.min(1, REFERENCE_MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
                const keepPng = (file.type === 'image/png' || file.type === 'image/webp') && file.size <= KEEP_PNG_MAX_BYTES;
                const alreadyFine = scale === 1 && ((keepPng && file.type === 'image/png') || file.type === 'image/jpeg');
                if (alreadyFine) {
                    resolve({ fileName: file.name, mimeType: file.type, data: original });
                    return;
                }
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.naturalWidth * scale);
                canvas.height = Math.round(img.naturalHeight * scale);
                const ctx = canvas.getContext('2d')!;
                if (!keepPng) {
                    // JPEG has no transparency, so give see-through areas a white background
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const mimeType = keepPng ? 'image/png' : 'image/jpeg';
                resolve({ fileName: file.name, mimeType, data: canvas.toDataURL(mimeType, 0.9) });
            };
            img.src = original;
        };
        reader.readAsDataURL(file);
    });

/** Reads the pixel size of a generated image so the deck can place it without stretching. */
const measureImage = (dataUrl: string): Promise<{ width: number; height: number }> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => reject(new Error('The generated mood board image could not be read.'));
        img.src = dataUrl;
    });

export const generateMoodBoard = async (req: MoodBoardRequest, apiKey: string): Promise<MoodBoardImage> => {
    if (!apiKey) throw new Error('OpenRouter API key is missing. Please check your .env.local file.');
    const references = (req.references || []).slice(0, MAX_REFERENCE_IMAGES);
    const prompt = buildMoodBoardPrompt({ ...req, references });
    const dataUrl = await callOpenRouterImage(prompt, apiKey, {
        model: MOOD_BOARD_MODEL,
        referenceImages: references.map(toDataUrl),
        // A 16:9 image holds a 3x3 grid of 16:9 panels exactly. Gemini follows this; square-only
        // models ignore it (see SQUARE_CANVAS).
        aspectRatio: '16:9',
    });
    const { width, height } = await measureImage(dataUrl);
    return { dataUrl, width, height };
};
