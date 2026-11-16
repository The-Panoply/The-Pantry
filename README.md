# The-Pantry

The Pantry is the Panoply family's lightweight meal-selection website.

## Site

GitHub Pages: https://the-panoply.github.io/The-Pantry/

## Files

- `index.html`, `styles.css`, `app.js`: website layout and interactions.
- `recipes.json`: weekly design-preview recipes and saved recipe titles.
- `favicon.svg`, `manifest.webmanifest`: site identity and Home Screen metadata.

## Current behavior

- The sample weekly cards are **design previews**, not vetted meal recommendations. Source photographs, exact URLs, prep times, cooking times, and ratings are deliberately blank until verified. Do not substitute invented data or unrelated food images.
- The Saved Recipes section transcribes the user's Apple News bookmarks; saving does not establish that a meal was cooked or liked.
- Meal selections are stored using this device's browser localStorage only. No login, cross-device syncing, external data service, or grocery cart integration.
- Selections reset when a genuinely new `week.id` is published.
- Recipe content is separate from display code, so card design can change without rewriting the library.
- The public repository contains no credentials or personal health records.

## Publication

GitHub Pages serves the root of `main`. Publishing future recipes should change `recipes.json` while preserving stable recipe IDs. Verify the resulting commit and live website. Avoid changes to layout without explicit design review.
