# Preview the HUD portfolio in the browser

## Cursor Simple Browser

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run **Simple Browser: Show**.
3. Enter a URL:
   - **HTTP (recommended):** start a local server (see below), then open `http://localhost:3000` (or the port shown).
   - **File URL:** `file:///C:/Users/.../sci-fi/index.html` — works for static checks; CDN assets may still load.

## Local HTTP server (recommended)

From the project root (`sci-fi/`):

```bash
npx --yes serve .
```

Open the URL printed in the terminal (often `http://localhost:3000`). Resize the window or use DevTools device mode to test responsive layouts.

## What to check

- Narrow widths (320px, 375px): use the header **Menu** button for navigation, then timeline, pricing cards, and footer.
- Theme switcher on dark and light presets (index, admin, and blog).
- Keyboard: `Escape` closes the mobile menu; focus returns to the Menu button.
