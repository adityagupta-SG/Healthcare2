---
description: Push code, deploy GitHub Pages, refresh README/about, and run a security scan before publishing
---

Run the following steps in order for this repo. Do not skip a step; report what happened at each one. Stop and ask the user before any step that would require credentials or settings you don't have access to.

## 1. Security scan (do this FIRST, before anything is pushed)

- Run `git status` and `git diff` (staged + unstaged) to see everything that would be committed.
- Scan all new/changed files for secrets and sensitive data: API keys, tokens, passwords, private keys, `.env` files, connection strings, personal data, internal URLs/hostnames, credentials of any kind.
- Check that `.gitignore` excludes local-only files (e.g. `.claude/settings.local.json`, `.env*`, editor/OS cruft) — add entries if something sensitive is untracked-but-about-to-be-added.
- If anything sensitive is found, stop, do NOT commit/push it, and tell the user exactly what was found and where.
- Only proceed to step 2 once the working tree is clean of sensitive data.

## 2. Push/update code to GitHub

- Stage the relevant changed files (never blanket `git add -A` without reviewing `git status` first).
- Commit with a concise message describing the actual change (why, not just what).
- Push to `origin main`. If the repo isn't yet a git repo or has no remote, initialize it and ask the user for the target GitHub repo URL before adding a remote.
- If the push fails (e.g. transient network error), retry once before reporting failure.

## 3. Create/update GitHub Pages deployment via GitHub Actions

- Check for `.github/workflows/deploy.yml`. If missing, create a workflow that:
  - Triggers on `push` to `main` and supports `workflow_dispatch`.
  - Uses `actions/checkout`, `actions/configure-pages`, `actions/upload-pages-artifact` (path `.` for this no-build static site), and `actions/deploy-pages`.
  - Sets `permissions: contents: read, pages: write, id-token: write` and a `pages` concurrency group.
- Commit/push the workflow if it's new or changed.
- Check the latest workflow run status via `curl -s https://api.github.com/repos/<owner>/<repo>/actions/runs?per_page=1` (no auth needed for public repos).
- If the run failed because Pages isn't enabled with "GitHub Actions" as the source, tell the user to enable it at `https://github.com/<owner>/<repo>/settings/pages` (Build and deployment → Source → GitHub Actions) — this cannot be done via the API without a token scope check, so ask before attempting it programmatically. Once confirmed, push an empty commit (`git commit --allow-empty`) or re-run to trigger deployment.
- Verify the live site responds with `curl -s -o /dev/null -w "%{http_code}"` against the Pages URL (`https://<owner>.github.io/<repo>/`).

## 4. Create/update a professional README

- Read the current file structure and key source files to keep the README accurate (don't guess at features).
- Ensure `README.md` includes: project name/description, live site link, features, tech stack, project structure, how to run locally, deployment notes, and any relevant caveats (e.g. "no backend yet").
- Commit and push the README update.

## 5. Update GitHub repo "About" (description + website link)

- Use the GitHub API to PATCH the repo: set `description` to a concise one-liner matching the README, and `homepage` to the live GitHub Pages URL.
- To authenticate, try pulling a token from the local git credential manager:
  `printf "protocol=https\nhost=github.com\n\n" | git credential fill`
  Use the resulting token in an `Authorization: token <token>` header — never print or log the token itself.
- Write the JSON payload to a temp file before sending with `curl --data-binary @file` (avoids shell quoting/encoding issues with special characters like em dashes).
- Confirm the update by checking the response for the new `description` and `homepage` fields, then delete the temp payload/response files.
- If no credential/token is available, tell the user and give them the manual steps instead of failing silently.

## Final report

Summarize concisely: what was committed/pushed, the Pages deployment status and live URL, README changes, About section changes, and the outcome of the security scan (clean, or what was flagged and excluded).
