# Report Designer — jsDelivr CDN Setup Guide

## How this works

Kintone's `manifest.json` accepts **https URLs** in the `js`/`css` arrays, exactly like
local file paths. Kintone loads URL scripts in order, and `kintone.$PLUGIN_ID` works the
same way — your existing `})(kintone.$PLUGIN_ID);` pattern needs zero changes.

So the plugin zip becomes a thin shell:
- **Stays in the zip:** manifest.json, icon, config.html, config.css, js/lib/* (the big
  vendor libraries — they never change)
- **Served from jsDelivr (GitHub):** common.js, desktop.js, config.js — the files you
  actually iterate on

Customers install the zip **once**. After that, `git push` updates everyone.

---

## Part 1 — One-time setup

### 1. Create a GitHub account (if you don't have one)
https://github.com/signup — free plan is fine.

### 2. Create a PUBLIC repository
- Click "+" → "New repository"
- Name: `report-designer` (or anything — it becomes part of the URL)
- Visibility: **Public** (jsDelivr only serves public repos — see "Important caveats" below)
- Create repository

### 3. Push the JS files (the `github-repo/` folder in this package)

Install git if needed, then from inside the `github-repo` folder:

```bash
git init
git add .
git commit -m "Report Designer v1.25.0"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USER/report-designer.git
git push -u origin main
```

(GitHub Desktop app works too if you prefer GUI — drag the folder in, commit, publish.)

### 4. Verify jsDelivr serves your file
Open in a browser:

```
https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USER/report-designer@main/js/desktop.js
```

You should see your code. That's it — jsDelivr requires no signup; any public GitHub
repo is automatically available at `cdn.jsdelivr.net/gh/USER/REPO@BRANCH/PATH`.

### 5. Edit manifest.json
In `plugin-src/manifest.json`, replace `YOUR_GITHUB_USER` (4 places) with your actual
GitHub username / org name.

### 6. Re-pack the plugin **with your original .ppk key**

```bash
npx @kintone/plugin-packer --ppk YOUR_ORIGINAL_KEY.ppk plugin-src
```

⚠️ **Critical:** use the same `.ppk` private key you've always used for this plugin.
Same key = same plugin ID = customers get an in-place update and keep all their
template settings. A new key would create a "different" plugin and settings would
not carry over.

### 7. Distribute this zip to customers one last time
They upload it via kintone admin → Plugins as usual. This is the **last** zip they
ever need (unless the manifest itself changes — e.g., you add a new vendor library).

---

## Part 2 — Your new update workflow

1. Edit `js/desktop.js` / `common.js` / `config.js` in your repo folder
2. ```bash
   git add . && git commit -m "v1.25.1 fix per-cell padding" && git push
   ```
3. Purge the jsDelivr cache so the update is instant (otherwise `@main` URLs refresh
   on their own within ~12 hours):

   Open these URLs in a browser (or curl them):
   ```
   https://purge.jsdelivr.net/gh/YOUR_GITHUB_USER/report-designer@main/js/common.js
   https://purge.jsdelivr.net/gh/YOUR_GITHUB_USER/report-designer@main/js/desktop.js
   https://purge.jsdelivr.net/gh/YOUR_GITHUB_USER/report-designer@main/js/config.js
   ```
4. Done. Every customer gets the new code on their next page load (hard-refresh /
   Ctrl+F5 if their browser cached it).

Tip: add a `console.log('[ReportDesigner] v1.25.1')` at the top of desktop.js so you
can confirm which version a customer is running from their browser console.

---

## Part 3 — Optional: stable releases with version tags

Serving `@main` means every push goes live to everyone. If you want more control,
use git tags and point the manifest at a **major-version range**:

```
https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USER/report-designer@1/js/desktop.js
```

Then release with:

```bash
git tag v1.25.1 && git push --tags
```

`@1` auto-resolves to the newest `1.x.x` tag, so pushes to main don't affect
customers until you cut a tag — a nice safety net. (Cache/purge behavior is the same.)

---

## Important caveats — read before rolling out

1. **Your code becomes public.** jsDelivr only serves public GitHub repos. Anyone can
   read `common.js`/`desktop.js`/`config.js`. If that's a problem, minify the files
   before pushing (e.g., `npx terser desktop.js -o desktop.js -c -m`), or host on
   infrastructure you control (Cloudflare Pages/R2, S3+CloudFront, your own server) —
   the manifest just needs *any* https URL.

2. **New failure mode:** if GitHub/jsDelivr is unreachable from a customer network
   (rare, but some manufacturing companies have strict egress firewalls), the plugin
   won't load. Worth checking with your most locked-down customers first. jsDelivr
   uptime is excellent, but it's no longer "runs entirely inside cybozu.com".

3. **Instant global rollout cuts both ways.** A bad push breaks every customer at
   once. The `@1` tag strategy in Part 3, plus testing on your own kintone first,
   mitigates this. Rollback = `git revert` + push + purge.

4. **Cache means "up to 12h" without purge.** Always hit the purge URLs after
   pushing if the fix is urgent.

5. **Keep the vendor libs in the zip.** pdf-lib/html2canvas/etc. are ~1.1 MB and
   never change; keeping them local means faster loads and fewer external requests.
