# AGENTS.md

## Project overview

This repository is a static Japanese-language website published with GitHub Pages.

- Repository: `keniti2026/otonari-tenshi-anime`
- Production URL: `https://keniti2026.github.io/otonari-tenshi-anime/`
- Deployment source: the repository root on the `main` branch
- Build step: none

## Repository map

- `index.html`: all page content and markup
- `style.css`: layout, responsive styles, colors, and typography
- `script.js`: navigation state and floating-button behavior
- `images/`: locally hosted gallery and key-visual assets
- `gallery_notes.txt`: notes about gallery assets

## Working rules

1. Keep changes small and directly related to the user's request.
2. Work on a `codex/<short-description>` branch. Do not push directly to `main` unless the user explicitly requests it.
3. Preserve the static HTML/CSS/JavaScript architecture. Do not introduce a framework, package manager, build step, or deployment workflow without explicit approval.
4. Preserve Japanese text as UTF-8. Do not bulk re-encode, normalize, or rewrite existing Japanese content unless the task specifically requires it.
5. Do not rename, replace, compress, or delete images unless requested. Keep image paths relative to the repository root.
6. Preserve external-link safety: links opened with `target="_blank"` must also use `rel="noopener noreferrer"` or an equally safe value.
7. Maintain desktop and mobile layouts. Avoid fixed dimensions that cause horizontal scrolling on narrow screens.
8. Never add credentials, Personal Access Tokens, API keys, cookies, or other secrets to files, commits, logs, or documentation.
9. Treat `main` as production. Explain user-visible changes and verification results before deployment.

## Verification

Run checks relevant to the files changed:

```powershell
git diff --check
node --check script.js
python -m http.server 8000
```

Then preview `http://localhost:8000/` and verify:

- the page loads without missing local images;
- navigation links scroll to the intended sections;
- external links open correctly;
- there are no JavaScript errors in the browser console;
- desktop and narrow/mobile layouts remain readable;
- Japanese text has not been unintentionally corrupted.

If Node.js or Python is unavailable, state which check could not be run and perform the remaining checks.

## Deployment

Merging or pushing an approved change to `main` publishes it through GitHub Pages. After deployment, verify the production URL. Never paste a PAT into a prompt or commit; use the authenticated GitHub CLI or the configured Git credential helper.
