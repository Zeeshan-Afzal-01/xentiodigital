# Deployment Guide — Next.js to Firebase or Vercel

Your app can be deployed in several ways. Choose based on what you have installed:

| Method | Docker? | gcloud? | Firebase CLI? | Best for |
|--------|---------|---------|---------------|----------|
| **Vercel** | No | No | No | Easiest — full Next.js, API, SSR |
| **Firebase Hosting + Cloud Run** | No* | **Yes** | Yes | Custom domain on Firebase, same ecosystem as Firestore |
| **Firebase static only** | No | No | Yes | Static sites only (not this app) |

\* Docker runs in Google’s cloud when you use `gcloud run deploy --source .`. You do **not** need Docker on your PC. You **do** need the **gcloud** CLI.

---

## Option A — Deploy with Vercel (no Docker, no gcloud)

Use this if you want to avoid installing Docker and gcloud. Only Node.js and the Vercel CLI (or a Git push) are needed.

### 1. Install Vercel CLI (optional)

```bash
npm i -g vercel
```

Or use the website: [vercel.com](https://vercel.com) → Import your Git repo.

### 2. Deploy from your project

```bash
cd C:\Users\Zeeshan Afzal\Desktop\xentiodigital
vercel
```

Follow the prompts (link to existing project or create new). Vercel will run `next build` in the cloud.

### 3. Set environment variables in Vercel

In Vercel: **Project → Settings → Environment Variables**, add:

**Client (NEXT_PUBLIC_*):**

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Server (FIREBASE_*):**

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (one line, with `\n` for newlines in the key)

Add any others your app needs (e.g. `NEXTAUTH_SECRET`, `NEXTAUTH_URL` = your Vercel URL).

### 4. Redeploy

After changing env vars:

```bash
vercel --prod
```

Or push to Git if the project is connected.

### 5. Custom domain

Vercel: **Project → Settings → Domains** → Add your domain. DNS is usually automatic.

---

## Option B — Firebase Hosting + Cloud Run (need gcloud, no Docker on your PC)

You do **not** need Docker on your computer. Google Cloud Build builds the image in the cloud. You **do** need **gcloud** (Google Cloud SDK).

### Install only gcloud (no Docker)

1. Download: [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (Windows: run the installer).
2. Restart the terminal, then:

```bash
gcloud init
gcloud auth login
gcloud config set project xentiodigital
```

### Then follow the Firebase + Cloud Run steps below

(Original steps: enable APIs, env vars, `gcloud run deploy --source .`, then `firebase deploy --only hosting`.)

---

## Option C — Firebase Hosting only (static, Firebase CLI only)

Firebase Hosting can serve **static** files only. Your app uses **API routes**, **SSR**, and **Firebase Admin** on the server, so a **full static export is not possible** without removing those features.

If you ever build a static-only version:

1. In `next.config.js`: `output: 'export'` (and remove `output: 'standalone'`).
2. Remove or replace API routes, server-side Firestore, and SSR.
3. Build: `npm run build` → `out` folder.
4. In `firebase.json`, set `"public": "out"` and **remove** the `rewrites` that point to Cloud Run.
5. Deploy: `firebase deploy --only hosting`.

For your **current** app, **Option A (Vercel) or Option B (Firebase + gcloud)** are the only ways to keep everything working.

---

# Firebase Hosting + Cloud Run — Full Steps

Use this if you have **gcloud** installed (or are willing to install it). You do **not** need Docker on your machine.

---

## Prerequisites

- **Firebase project** (same as for Firestore/Auth)
- **Node.js 20+**
- **Firebase CLI**: `npm install -g firebase-tools`
- **gcloud (Google Cloud SDK)**: [Install](https://cloud.google.com/sdk/docs/install) — for Cloud Run deploy only; Docker is built in the cloud

---

## Step 1: Log in and set project

```bash
firebase login
gcloud auth login
```

Set the active project (use your Firebase project ID):

```bash
gcloud config set project YOUR_PROJECT_ID
```

---

## Step 2: Set `.firebaserc` project

Edit `.firebaserc` and set your Firebase project ID:

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

Get the ID from: Firebase Console → Project settings → General, or `firebase projects:list`.

---

## Step 3: Enable APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

---

## Step 4: Environment variables

They must be set on the **Cloud Run** service. `NEXT_PUBLIC_*` are embedded at **build** time; `FIREBASE_*` are only needed at **runtime**.

### 4a) Build-time (NEXT_PUBLIC_*)

Next.js bakes `NEXT_PUBLIC_*` into the client bundle during `npm run build` in the Docker image. Two ways:

**Option A — `cloudbuild.yaml` and build args (recommended)**

Create `cloudbuild.yaml` in the project root:

```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '--build-arg'
      - 'NEXT_PUBLIC_FIREBASE_API_KEY=${_NEXT_PUBLIC_FIREBASE_API_KEY}'
      - '--build-arg'
      - 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}'
      - '--build-arg'
      - 'NEXT_PUBLIC_FIREBASE_PROJECT_ID=${_NEXT_PUBLIC_FIREBASE_PROJECT_ID}'
      - '--build-arg'
      - 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}'
      - '--build-arg'
      - 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${_NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}'
      - '--build-arg'
      - 'NEXT_PUBLIC_FIREBASE_APP_ID=${_NEXT_PUBLIC_FIREBASE_APP_ID}'
      - '-t'
      - 'gcr.io/${PROJECT_ID}/nextjs-server'
      - '.'
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'nextjs-server'
      - '--image'
      - 'gcr.io/${PROJECT_ID}/nextjs-server'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--port'
      - '3000'
images:
  - 'gcr.io/${PROJECT_ID}/nextjs-server'
substitutions:
  _NEXT_PUBLIC_FIREBASE_API_KEY: ''
  _NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ''
  _NEXT_PUBLIC_FIREBASE_PROJECT_ID: ''
  _NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ''
  _NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ''
  _NEXT_PUBLIC_FIREBASE_APP_ID: ''
```

Then build and deploy, passing subs (or set them in a trigger):

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_NEXT_PUBLIC_FIREBASE_API_KEY="your-key",_NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-domain",...
```

**Option B — `ENV` in Dockerfile for public vars only**

If the client config is not sensitive, you can put it in the image. In `Dockerfile`, before `RUN npm run build`:

```dockerfile
ENV NEXT_PUBLIC_FIREBASE_API_KEY=your_key
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
# ... rest of NEXT_PUBLIC_*
```

Prefer Option A for anything you don’t want in the image.

### 4b) Runtime (FIREBASE_* and optional NEXT_PUBLIC_*)

Set these on the Cloud Run service **after** the first deploy, or at first deploy via `--set-env-vars` / `--set-secrets`.

**Google Cloud Console**

1. [Cloud Run](https://console.cloud.google.com/run) → select service `nextjs-server` → **Edit & deploy new revision**
2. **Variables & Secrets** → Add:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (one line; use `\n` for newlines where the key has line breaks)

**CLI**

```bash
gcloud run services update nextjs-server \
  --region us-central1 \
  --set-env-vars "FIREBASE_PROJECT_ID=xxx,FIREBASE_CLIENT_EMAIL=xxx"
```

For `FIREBASE_PRIVATE_KEY`, use [Secret Manager](https://cloud.google.com/run/docs/configuring/secrets) and `--set-secrets`:

```bash
gcloud run services update nextjs-server \
  --region us-central1 \
  --set-secrets "FIREBASE_PRIVATE_KEY=firebase-private-key:latest"
```

---

## Step 5: Deploy Cloud Run (first time)

From the project root, using the repo as source (Dockerfile will be used):

```bash
gcloud run deploy nextjs-server \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```

If you use `cloudbuild.yaml` with build-args instead, run the `gcloud builds submit --config=cloudbuild.yaml` command from Step 4a and skip this `gcloud run deploy --source` step.

---

## Step 6: Deploy Firebase Hosting

`firebase.json` is already set to rewrite `**` to the Cloud Run service `nextjs-server` in `us-central1`. Deploy Hosting:

```bash
firebase deploy --only hosting
```

---

## Step 7: Verify

- Hosting URL: `https://YOUR_PROJECT_ID.web.app`
- Check: home, blog, admin login, and `/api` routes.

---

## NPM scripts

- `npm run deploy:run` — deploy only Cloud Run (`gcloud run deploy nextjs-server --source . ...`)
- `npm run deploy:hosting` — deploy only Hosting (`firebase deploy --only hosting`)
- `npm run deploy` — run both (Run first, then Hosting)

---

## Custom domain

1. Firebase Console → **Hosting** → **Add custom domain**
2. Follow DNS and verification steps. Firebase will provision SSL.

---

## Env vars reference

| Variable | Build-time | Runtime | Notes |
|----------|------------|---------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ | optional | Client config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ | optional | |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ | optional | |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ | optional | |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ | optional | |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ | optional | |
| `FIREBASE_PROJECT_ID` | ❌ | ✅ | Server/Admin |
| `FIREBASE_CLIENT_EMAIL` | ❌ | ✅ | |
| `FIREBASE_PRIVATE_KEY` | ❌ | ✅ | `\n` for newlines |

---

## Troubleshooting

| Issue | Action |
|-------|--------|
| `Cannot find module` | `npm run clean && npm run build` locally to confirm build |
| `Missing Firebase Admin env vars` | Set `FIREBASE_*` on the Cloud Run service |
| `FIREBASE_PRIVATE_KEY` invalid | Use `\n` for newlines; or store in Secret Manager and use `--set-secrets` |
| `Service nextjs-server not found` | Deploy Cloud Run first (`npm run deploy:run` or `gcloud run deploy ...`) |
| `Permission denied` | `firebase login` and `gcloud auth login` |
| 502 from Hosting | Check Cloud Run logs: `gcloud run services logs read nextjs-server --region us-central1` |

---

## Costs (typical)

- **Firebase Hosting**: free tier (10 GB, 360 MB/day)
- **Cloud Run**: free tier ~2M requests/month
- **Firestore**: per your existing usage

---

## Optional: `cloudbuild.yaml` and build-args

To support `NEXT_PUBLIC_*` via build-args, the Dockerfile must declare `ARG`s and `ENV`s before `npm run build`. Example addition in `Dockerfile` (before `RUN npm run build`):

```dockerfile
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
```

Then use a `cloudbuild.yaml` (as in Step 4a) to pass `--build-arg` and to deploy the image to Cloud Run.
