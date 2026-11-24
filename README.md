# Nabil Makarim’s portfolio

Open `index.html` in a browser. Keep the `assets` folder beside the three HTML pages. The included build works offline and can also be served by a static web host.

- `index.html` is the landing page and links to both collections.
- `editing.html` contains the video gallery and format filters.
- `planning.html` contains the three map views and links to the Space Syntax Lab.

## Edit the portfolio

Project titles, descriptions, and filenames are in `src/projects.js`. The site layout is in `src/app.jsx`, and shared styles are in `style.css`. The browser loads `assets/app.js`, which is the compiled bundle. After editing a file in `src`, run:

```sh
npm install
npm run build
```

The video files are H.264 MP4 copies of the four supplied videos. Map previews and full-resolution WebP copies come from the three supplied PNGs. The bundled Space Syntax Lab uses the supplied simulator with portfolio navigation and touch support.
