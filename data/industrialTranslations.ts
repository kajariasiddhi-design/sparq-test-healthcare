import { addTranslations } from "./translation-utils";
import { fmcgFormTranslations as formTranslations } from "./fmcgTranslations";
import { section1 } from "./industrial/section1";
import { section2 } from "./industrial/section2";
import { section3 } from "./industrial/section3";
import { section4 } from "./industrial/section4";
import { section5 } from "./industrial/section5";
import { section6 } from "./industrial/section6";
import { section7 } from "./industrial/section7";
import { section8 } from "./industrial/section8";

export const industrialFormTranslations = {
  specifyOther: addTranslations("Please specify...", "कृपया निर्दिष्ट करें...", "குறிப்பிடவும்...", "దయచేసి పేర్కొనండి...", "કૃપા કરીને જણાવો..."),
  audio: { ...formTranslations.audio },
  salespersonSection: { ...formTranslations.salespersonSection },
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  section8
};
