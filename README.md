<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d862fb83-56d7-476b-9e20-fbc5d1effabc

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. In GitHub repository settings, open Pages and choose **GitHub Actions** as the deployment source.
2. Push to the `main` branch.
3. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will build and publish the site automatically.

If you prefer manual publishing, run:
`npm run deploy`
