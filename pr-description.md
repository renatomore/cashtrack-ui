# Feature: Design Tokens & Grid System Standardization 🎨

## Description
This PR introduces a comprehensive Design Tokens architecture to the CashTrack UI Design System, aimed at drastically improving consistency and developer experience.

## Changes Made
- **Spacing Scale:** Added a Tailwind-like spacing scale (`--ct-spacing-1` to `--ct-spacing-16` / 4px to 64px) with utility classes (`.m-4`, `.p-2`, `.gap-6`, etc.).
- **Typography Scale:** Refactored `<ct-typography>` to utilize a T-Shirt based sizing scale (`xs` to `4xl`), replacing the old semantic variants (`h1`, `body1`). Added global `.text-xs`, `.font-bold` utility classes.
- **Grid System:** Replaced the legacy Flexbox-based grid (`.ct-row`, `.ct-col`) with a modern 12-column `display: grid` architecture (`.grid`, `.grid-cols-12`, `.col-span-8`), which eliminates negative margin hacks.
- **Showcase & i18n:** Added a new "Design Tokens" section to the repository's showcase with interactive documentations for Spacing, Typography, and Grid. Provided translations for both PT and EN locales.
- **Version Bump:** Bumped version to `0.6.0` and updated changelogs.

## Breaking Changes
- 🚨 **`ct-typography` variant types have changed!** Instead of using `variant="h1"` or `variant="body1"`, you must now use `variant="4xl"` and `variant="base"` respectively.
- 🚨 The legacy grid classes `.ct-row` and `.ct-col-X` are officially deprecated. Please migrate to `.grid` and `.col-span-X`.

## Verification
- [x] Tested with `npm run test` (all 14 specs pass).
- [x] Verified showcase rendering.
- [x] Formatted and checked changelogs in both languages.
