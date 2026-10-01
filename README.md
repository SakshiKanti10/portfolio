# Sakshi Kanti — Developer Portfolio

Personal portfolio of Sakshi Kanti, a BCA graduate and full-stack developer working with React, Next.js, Node.js, Python, and AI/ML.

🔗 **Live site:** [portfolio-tau-tawny-tlhav9tvtp.vercel.app](https://portfolio-tau-tawny-tlhav9tvtp.vercel.app/)

<!-- Add a screenshot: save it as preview.png next to this README, then uncomment -->
<!-- ![Portfolio preview](preview.png) -->

## Features

- Responsive layout for mobile, tablet, and desktop
- Typewriter hero, animated counters, scroll-reveal sections
- Custom cursor and parallax background orbs (desktop only)
- 3D tilt effect on project cards
- Downloadable resume

## Sections

About · Skills · Projects · Education · Contact

## Featured Projects

| Project | Description | Stack |
|---|---|---|
| **Tripzy** | Travel comparison and booking platform with auth and payments | Next.js, FastAPI, TypeScript, Tailwind CSS |
| **Roomzy** | PG and room rental platform with location-based search | React, Vite, Node.js, Supabase |
| **Collegemate Web** | Campus navigation with graph-based shortest-path routing | React, TypeScript, Express, Axios |
| **Mind Ease** | AI mental wellness chatbot with mood tracking | Python, Streamlit, NLP, ML |
| **Chatbot Cloud** | Responsive AI chatbot using the Gemini API | HTML, CSS, JavaScript, Gemini API |

## Tech Stack

Plain HTML5, CSS3, and vanilla JavaScript. No framework or build step.
Fonts from Google Fonts, icons from Font Awesome, hosted on Vercel.

## Project Structure

```
.
├── index.html
├── style.css
├── script.js
├── Sakshi_Resume.pdf   # add your resume here
└── README.md
```

## Run Locally

```bash
git clone https://github.com/SakshiKanti10/<your-repo-name>.git
cd <your-repo-name>
python3 -m http.server 8000
# open http://localhost:8000
```

You can also just double-click `index.html`.

## Customize

- **Resume:** put your PDF in the project root as `Sakshi_Resume.pdf`. The "Download Resume" button in the hero section links to it.
- **Project links:** in `index.html`, update the `href="#"` on each project's Live Demo and Source Code buttons (each project has two sets: the icons at the top and the buttons at the bottom).
- **Counters:** the hero stats are set with `data-target` attributes in `index.html`.
- **Typewriter text:** edit the `phrases` array at the top of `script.js`.

## Deployment

Hosted on [Vercel](https://vercel.com). To deploy your own copy:

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Leave the framework as **Other** and the build command empty.
4. Deploy. Every push to `main` redeploys automatically.

Netlify and GitHub Pages also work, since the site is fully static.

## Contact

- 📧 sakshiikantii@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/sakshi-kanti10)
- 🐙 [GitHub](https://github.com/SakshiKanti10)

© 2026 Sakshi Kanti
