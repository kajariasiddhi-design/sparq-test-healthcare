/**
 * STORYBOARD DECK
 *
 * Builds the client storyboard deck (.pptx) for two picked stories, in the same format as the
 * team's concept decks: cover, brand description, then for each concept a story slide, an
 * ending / tagline slide and an empty mood board slide for the team to fill in.
 *
 * Runs in the browser. pptxgenjs is loaded only when a deck is downloaded.
 */

import type { Story } from '../types';
import type { MoodBoardImage } from './moodBoard';
import coverWavesUrl from '../assets/storyboard/cover-waves.png';
import sparqLogoUrl from '../assets/storyboard/sparq-logo.png';

export interface StoryboardConcept {
    title: string;
    pillarName?: string;
    story: Story;
    /** Generated mood board; the slide is left empty without one */
    moodBoard?: MoodBoardImage | null;
}

// Mood board image area, as in the concept decks
const MOOD_BOX = { y: 0.95, w: 10.26, h: 5.73 };

// Look of the team's concept decks
const BG = 'F3F6FC';
const NAVY = '021E47';
const FONT = 'Montserrat';
const SLIDE_W = 13.333;

// Body text: 14.67pt on 21.56pt lines in an 11.6" box fits about 100 characters per line
const BODY_PT = 14.67;
const BODY_LINE_PT = 21.56;
const BODY_CHARS_PER_LINE = 100;
// Ending moment and tagline: 19pt on 24pt lines in an 11.18" box fits about 77 characters per line
const CLOSING_PT = 19;
const CLOSING_LINE_PT = 24;
const CLOSING_CHARS_PER_LINE = 77;
// Lines that fit under a concept title, and on a slide without one
const LINES_UNDER_TITLE = 17;
const LINES_FULL_SLIDE = 20;

const stripMarkdown = (text?: string): string =>
    (text || '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/^#+\s*/gm, '')
        .replace(/\[(.+?)\]\((.+?)\)/g, '$1')
        .trim();

const positioningText = (positioning: any): string =>
    stripMarkdown(typeof positioning === 'string'
        ? positioning
        : (positioning?.english_positioning || positioning?.hindi_positioning || ''));

/**
 * A starting title for a concept. Taglines often end with an English meaning in brackets,
 * e.g. "Asli swad, sachchi zimmedari. [Real taste, true responsibility.]", which makes a good title.
 */
export const suggestConceptTitle = (story: Story, pillarName?: string): string => {
    const tagline = stripMarkdown(story.tagline);
    const bracketed = tagline.match(/\[([^\]]+)\]\s*$/);
    const title = (bracketed ? bracketed[1] : tagline).replace(/^["'“‘’]+|["'”’]+$/g, '').replace(/[.!]+$/, '').trim();
    return title || pillarName || 'Untitled concept';
};

const estimateLines = (text: string, charsPerLine: number): number =>
    text.split('\n').reduce((sum, para) => sum + Math.max(1, Math.ceil(para.length / charsPerLine)), 0);

/** Splits text into sentences, keeping the closing punctuation and any [translation] that follows. */
const sentences = (text: string): string[] =>
    text.match(/[^.!?]+(?:[.!?]+['’"”]?(?:\s*\[[^\]]*\])?|$)\s*/g)?.map(s => s.trim()).filter(Boolean) || [text];

/** Takes as many whole sentences as fit in `lines`, returning them and whatever is left. */
const takeLines = (text: string, lines: number): { fits: string; rest: string } => {
    const parts = sentences(text);
    let fits = '';
    let i = 0;
    while (i < parts.length) {
        const next = fits ? `${fits} ${parts[i]}` : parts[i];
        if (fits && estimateLines(next, BODY_CHARS_PER_LINE) > lines) break;
        fits = next;
        i++;
    }
    return { fits, rest: parts.slice(i).join(' ') };
};

/** Brand name size for the cover: 54pt, smaller for long names so it stays within two lines. */
const coverFontSize = (name: string): number => (name.length > 40 ? 40 : name.length > 28 ? 46 : 54);

const safeFilePart = (text: string): string =>
    text.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'Brand';

export const downloadStoryboardDeck = async (
    brandName: string,
    positioning: any,
    concepts: StoryboardConcept[],
): Promise<void> => {
    const { default: PptxGenJS } = await import('pptxgenjs');
    const pres = new PptxGenJS();
    pres.layout = 'LAYOUT_WIDE'; // 13.333" x 7.5", same as the concept decks
    pres.title = `${brandName} - Storyboard`;
    pres.company = 'SparQ';
    pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

    const addLogo = (slide: any) =>
        slide.addImage({ path: sparqLogoUrl, x: 11.55, y: 6.82, w: 1.42, h: 0.33, altText: 'SparQ logo' });

    const contentSlide = () => {
        const slide = pres.addSlide();
        slide.background = { color: BG };
        addLogo(slide);
        return slide;
    };

    const addTitle = (slide: any, text: string) =>
        slide.addText(text, {
            x: 0.75, y: 0.45, w: 11.85, h: 0.5, margin: 0, isTextBox: true,
            fontFace: FONT, fontSize: 24, bold: true, color: NAVY, valign: 'top', fit: 'shrink',
        });

    const bodyRun = (text: string, extra: Record<string, any> = {}) =>
        ({ text, options: { fontFace: FONT, fontSize: BODY_PT, color: NAVY, ...extra } });

    // 1. Cover
    const cover = pres.addSlide();
    cover.background = { color: 'FFFFFF' };
    cover.addImage({ path: coverWavesUrl, x: 0, y: 0, w: SLIDE_W, h: 7.5, altText: 'Decorative waves' });
    cover.addImage({ path: sparqLogoUrl, x: 4.35, y: 2.36, w: 5.4, h: 1.26, altText: 'SparQ logo' });
    cover.addText('X', {
        x: 6.25, y: 3.56, w: 1.1, h: 0.55, margin: 0, isTextBox: true, align: 'center', valign: 'top',
        fontFace: FONT, fontSize: 37, bold: true, color: '000000',
    });
    const coverName = brandName.toUpperCase();
    // A narrow box so the name breaks over two lines like the concept decks.
    // Shadow blur is near zero for a crisp offset (pptxgenjs swaps a blur of 0 for 8pt).
    cover.addText(coverName, {
        x: 2.37, y: 4.11, w: 8.6, h: 2.4, margin: 0, isTextBox: true, align: 'center', valign: 'top',
        fontFace: FONT, fontSize: coverFontSize(coverName), bold: true, color: '262626',
        outline: { size: 1, color: 'FFFFFF' },
        shadow: { type: 'outer', angle: 45, blur: 0.01, offset: 3, color: 'A02B93', opacity: 1 },
    });

    // 2. Brand description
    const description = positioningText(positioning);
    if (description) {
        const slide = contentSlide();
        slide.addText('Brand Description', {
            x: 0.95, y: 1.6, w: 11.44, h: 0.75, margin: 0, isTextBox: true, valign: 'top',
            fontFace: FONT, fontSize: 37, bold: true, color: NAVY,
        });
        const lines = estimateLines(description, BODY_CHARS_PER_LINE);
        slide.addText(description, {
            x: 0.95, y: 2.75, w: 11.44, h: 3.9, margin: 0, isTextBox: true, valign: 'top', align: 'justify',
            fontFace: FONT, fontSize: lines > 13 ? 13 : BODY_PT, lineSpacing: lines > 13 ? 19 : BODY_LINE_PT, color: NAVY,
            fit: 'shrink',
        });
    }

    // 3. One section per concept
    concepts.forEach((concept, index) => {
        const { story } = concept;
        const overview = stripMarkdown(story.overview);
        const storyText = stripMarkdown(story.story || story.storyline || story.logline);
        const ending = stripMarkdown(story.ending_moment);
        const tagline = stripMarkdown(story.tagline);

        // Story slide: overview, then as much of the story as fits
        const overviewLines = overview ? estimateLines(`Overview: ${overview}`, BODY_CHARS_PER_LINE) + 1 : 0;
        const room = Math.max(4, LINES_UNDER_TITLE - overviewLines - 1);
        let { fits, rest } = takeLines(storyText, room);

        const first = contentSlide();
        addTitle(first, `Concept ${index + 1}: ${concept.title}`);
        const firstRuns: any[] = [];
        if (overview) {
            firstRuns.push(bodyRun('Overview: ', { bold: true }));
            firstRuns.push(bodyRun(overview, { breakLine: true }));
            firstRuns.push(bodyRun(' ', { breakLine: true })); // blank line, as in the concept decks
        }
        if (fits) {
            firstRuns.push(bodyRun('Story:', { bold: true, breakLine: true }));
            firstRuns.push(bodyRun(fits));
        }
        if (firstRuns.length) {
            first.addText(firstRuns, {
                x: 0.84, y: 1.05, w: 11.6, h: 5.6, margin: 0, isTextBox: true, valign: 'top', align: 'justify',
                lineSpacing: BODY_LINE_PT,
            });
        }

        // Story that did not fit continues on its own slides
        while (rest) {
            const page = takeLines(rest, LINES_FULL_SLIDE);
            rest = page.rest;
            const slide = contentSlide();
            addTitle(slide, `Concept ${index + 1}: ${concept.title} (contd.)`);
            slide.addText(page.fits, {
                x: 0.84, y: 1.05, w: 11.6, h: 5.6, margin: 0, isTextBox: true, valign: 'top', align: 'justify',
                fontFace: FONT, fontSize: BODY_PT, lineSpacing: BODY_LINE_PT, color: NAVY,
            });
        }

        // Ending moment and tagline
        if (ending || tagline) {
            const slide = contentSlide();
            const runs: any[] = [];
            const closingRun = (text: string, extra: Record<string, any> = {}) =>
                ({ text, options: { fontFace: FONT, fontSize: CLOSING_PT, color: NAVY, ...extra } });
            if (ending) {
                runs.push(closingRun('Ending Moment: ', { bold: true, paraSpaceAfter: 12 }));
                runs.push(closingRun(ending, { breakLine: !!tagline, paraSpaceAfter: 12 }));
            }
            if (tagline) {
                runs.push(closingRun('Tagline: ', { bold: true }));
                runs.push(closingRun(tagline));
            }
            const lines = estimateLines(`Ending Moment: ${ending}\nTagline: ${tagline}`, CLOSING_CHARS_PER_LINE);
            slide.addText(runs, {
                x: 1.08, y: lines > 8 ? 1.2 : 2.84, w: 11.18, h: lines > 8 ? 5.4 : 3.6, margin: 0, isTextBox: true,
                valign: 'top', align: 'left', lineSpacing: CLOSING_LINE_PT,
            });
        }

        // Mood board: the generated image if there is one, otherwise left empty for the team
        const moodBoard = contentSlide();
        addTitle(moodBoard, 'Mood board');
        const image = concept.moodBoard;
        if (image?.dataUrl && image.width > 0 && image.height > 0) {
            // Fit inside the mood board area without stretching, centred on the slide
            const ratio = image.width / image.height;
            const w = Math.min(MOOD_BOX.w, MOOD_BOX.h * ratio);
            const h = w / ratio;
            const source = image.dataUrl.startsWith('data:') ? { data: image.dataUrl.slice(5) } : { path: image.dataUrl };
            moodBoard.addImage({
                ...source, x: (SLIDE_W - w) / 2, y: MOOD_BOX.y + (MOOD_BOX.h - h) / 2, w, h,
                altText: `Mood board for concept ${index + 1}`,
            });
        }
        moodBoard.addText('For visual reference only', {
            x: 0.64, y: 6.73, w: 12.06, h: 0.42, margin: 0, isTextBox: true, align: 'center', valign: 'top',
            fontFace: FONT, fontSize: 24, color: NAVY,
        });
    });

    const date = new Date().toISOString().slice(0, 10);
    await pres.writeFile({ fileName: `SPARQ-Storyboard-${safeFilePart(brandName)}-${date}.pptx` });
};
