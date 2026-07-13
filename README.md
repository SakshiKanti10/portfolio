# Portfolio (Sakshi Kanti)

Local preview:

1. Place your PDF resume at `assets/Sakshi_Resume.pdf` (rename or replace as needed).
2. Open `index.html` in a browser (double-click) or serve with a static server.

Quick static server (Python):

```bash
python -m http.server 8000
# open http://localhost:8000/portfolio/
```

Deploy options:

- GitHub Pages (recommended): push this folder to a repo and use the included GitHub Actions workflow to deploy the `portfolio/` folder to Pages automatically on push to `main`.
- Vercel / Netlify: connect the repo and select the `portfolio/` folder as the publish directory — no build required.

GitHub Actions (automated):

1. Ensure your repository's default branch is `main`.
2. Commit the `portfolio/` folder to the repo root.
3. The workflow `.github/workflows/deploy.yml` will publish the folder to GitHub Pages on each push.

Form submission:
- To enable the contact form to send messages directly, create a Formspree form and set the publish endpoint value in the file `assets/script.js` by setting `window.FORM_ENDPOINT = 'https://formspree.io/f/your-id'` in a small inline script in `index.html` or by editing the JS file.

Customizations:
- Replace placeholder images in `assets/projects/` with screenshots of your projects.
- Add your real project links into the `a` GitHub buttons or `data-link` attributes on the view buttons.


