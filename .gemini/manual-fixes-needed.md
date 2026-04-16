# Remaining Fixes - Manual Instructions

## Issue #2: Middle Box Translation Not Working

**Problem**: The `story` field (middle narrative box) is not being translated.

**Root Cause**: The translation prompt example JSON doesn't include the `"story"` field, so the AI doesn't return it.

**Fix Required**:
Edit `hooks/usePillarOperations.ts` at line 214 (after the `"overview"` line):

**Current (line 214):**
```typescript
        "overview": "Translated Overview",
        "frames": [ 
```

**Change to:**
```typescript
        "overview": "Translated Overview",
        "story": "Translated full narrative story text",
        "frames": [ 
```

This adds the `"story"` field to the JSON example so the AI knows to translate it.

---

## Issue #1: Recommendation Text with Verbatim Quotes

**Problem**: Recommendation reasons should include verbatim quotes from the form.

**Current Status**: The prompt in `hooks/usePillarOperations.ts` (line 48-61) requests recommendations but doesn't emphasize verbatim quotes strongly enough.

**Fix Required**:
Edit `hooks/usePillarOperations.ts` around line 59:

**Current:**
```typescript
    "reason": "One sentence why"
```

**Change to:**
```typescript
    "reason": "Quote: '[exact text from form]' - This aligns because [explanation]"
```

And update the instruction text to emphasize using EXACT QUOTES from the brand information.

---

## Summary of Completed Fixes

✅ **#3 - Psychographics**: Already using correct format from psychographicMap
✅ **#4 - PDF Pillar Formatting**: Fixed "&" symbol (changed to "and")
✅ **#5 - Translated Stories in PDF**: Added non-Latin character detection, shows placeholder message
✅ **#6 - Load Modal Brand Name**: Added more fallback field names

---

## Testing Checklist

After making the manual edits above:

1. **Test Translation**:
   - Generate a story
   - Click translate
   - Verify the middle box (narrative story) gets translated

2. **Test PDF Export**:
   - Export PDF
   - Check that "Ad Pillars and Stories" (not "&")
   - Check translated stories show "[Translated story - view in application]"
   - Check psychographics show "Women — Modern homemaker with family" format

3. **Test Load Response**:
   - Search for past responses
   - Verify brand names appear (not "Submission 1")
   - Check browser console for logged response data

4. **Test Recommendations**:
   - Click "Analyze Pillars"
   - Check if recommendations include quotes from form data
