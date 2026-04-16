# SPARQ Enhancement Plan - Phase 1

## Critical Fixes (Immediate - Blocking Issues)

### 1. Fix Load Response (#15) - CRITICAL
**Problem**: Form fields remain empty after loading a response
**Root Cause**: The webhook returns flat structure with different field names than expected
**Solution**: Update `mapRawDataToFormData` to handle the flat structure from webhook

### 2. Fix Pillar Names in PDF (#1)
**Status**: Already fixed in code (line 199 of pdfGenerator.ts)
**Verification needed**: Test with actual data

### 3. Fix Raw Markdown in PDF (#3)
**Problem**: Brand description shows markdown formatting
**Solution**: Strip markdown before adding to PDF

### 4. Fix Story Translation - Middle Box (#8)
**Problem**: Only overview/ending translate, not the story narrative
**Solution**: Update translation logic to include `story` field

## Important PDF Improvements

### 5. Highlight User Decisions (#2)
- Selected world
- Recommended pillars
- Add visual indicators (★ or highlighting)

### 6. Missing Fields in PDF (#4)
- Audit all form fields
- Ensure 7.3, 7.4 and custom inputs are captured

### 7. Pillar Recommendation Reasoning (#5)
- Add reasoning to pillar recommendation
- Include verbatim quotes from form
- Add to PDF

### 8. DateTime in PDF (#6)
- Add IST timestamp at generation

### 9. Fix PDF Alignment (#7)
- Align green boxes with life problem text

## New Features (Phase 2)

### 10. Mascot Generator (#9)
### 11. Bookmark Story (#10)
### 12. Stories Section (#11-13)
### 14. Brand Name in Load Modal (#14)

---

## Implementation Order

**NOW (Critical Path):**
1. Fix #15 - Load response mapping
2. Fix #3 - Strip markdown
3. Fix #8 - Story translation
4. Fix #6 - Add datetime
5. Fix #2 - Highlight decisions

**NEXT (Quality):**
6. Fix #4 - Missing fields audit
7. Fix #5 - Recommendation reasoning
8. Fix #7 - PDF alignment
9. Fix #14 - Brand name in modal

**LATER (Features):**
10-13. New features (mascot, bookmark, stories section)
