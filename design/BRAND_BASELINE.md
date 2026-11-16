# Le Garde-Manger — Approved Brand Baseline

**Status:** User-approved site-specific design reference, November 15, 2026.
**Applies to:** [The-Panoply/The-Pantry](https://github.com/The-Panoply/The-Pantry) website only.
**Source of truth:** This file and [approved-wordmark.html](approved-wordmark.html). Future web redesigns must compare to the approved reference; any material alteration requires the owner's explicit approval. Do not treat unrelated Panoply website styles as stronger than this approved design.

## The exact original mockup approved enthusiastically by the owner

This is the original mockup **as first presented**, before the explicitly approved Panoply adjustment and subsequent small-screen correction. Preserve this verbatim as the visual/typographic anchor.

```html
<div style="background:#f8f6ef;border:1px solid #e7e0d3;border-radius:13px;padding:32px 16px;text-align:center;color:#253d35">
  <div style="font:600 9px/1.5 -apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:4px;color:#ab8957;margin-bottom:21px">THE PANOPLY</div>
  <div style="font:italic 40px/1 'Bodoni 72','Didot','Baskerville',Georgia,serif;color:#b18a55;margin-bottom:-4px">Le</div>
  <div style="font:400 clamp(37px,7.4vw,68px)/1.12 'Didot','Bodoni 72','Baskerville',Georgia,serif;letter-spacing:-1.5px">Garde-Manger</div>
  <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:18px;color:#ae8c5a"><span style="width:64px;height:1px;background:#c9ae82"></span><span style="font:25px Georgia,serif">❧</span><span style="width:64px;height:1px;background:#c9ae82"></span></div>
</div>
```

## Approved changes to the initial mockup

1. **The Panoply** must be **smaller and fainter** so it does not compete with the name. Implemented as 6.5 px / translucent champagne-gold on desktop, 6 px on small mobile displays. This is an explicit approved change from the original 9 px label.
2. **Mobile title must be smaller** and visually proportionate; the original large website rendition was explicitly rejected. Current mobile title scales 28–35 px; the italic `Le` is 32 px. Preserve the original Didot/Bodoni style and relative hierarchy.
3. **Remove the oversized "Dinner Ideas" heading.** Do not add a second hero/intro heading beneath the primary wordmark. A quiet week/date label and cards suffice.
4. **Favicon and bookmark icon:** the gold `❧` flourish beneath the original wordmark, isolated as a single elegant ornament in gold on deep green. Use `favicon.svg` (vector, path-based; no runtime font needed) and `apple-touch-icon.png` (iOS Home Screen).
5. Keep cream panel `#f8f6ef`, border `#e7e0d3`, body text `#253d35`, gold italic `Le` `#b18a55`, flourish `#ae8c5a`; keep the paired thin gold rules and ample breathing room. The cream panel remains the same in dark mode.
6. Typography should prefer `'Didot','Bodoni 72','Baskerville',Georgia,serif` for the title and `'Bodoni 72','Didot','Baskerville',Georgia,serif` italic for `Le`. Do **not** replace with a generic modern sans-serif, bold block display, large decorative hero, or an unrelated logo.

## Review checklist — prevent visual drift

- Compare new renders to [approved-wordmark.html](approved-wordmark.html) at phone and desktop widths before publishing.
- Primary visual focus: `Le` above `Garde-Manger`; fine italic gold above dark-green fine-serif lettering.
- Panoply label is smaller and quieter than the initial mockup.
- Gold `❧` with a fine rule on either side under the wordmark.
- No oversized “Dinner Ideas” or redundant explanatory banner above meal cards.
- Preserve the compact three-across desktop recipe cards and authentic publisher photography.
- Do not alter the user's selected meals or localStorage key during a purely visual update.
- The GitHub repository may remain named `The-Pantry` while the public website is titled `Le Garde-Manger`.

## Revisions

- 2026-11-15: Original mockup approved; owner additionally approved smaller/fainter Panoply label.
- 2026-11-15: Owner rejected oversized mobile title and added “Dinner Ideas” heading; requested correction.
- 2026-11-15: Owner approved gold flourish as favicon and requested this durable no-drift baseline.

