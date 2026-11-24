# Nabil Makarim’s portfolio

Open `index.html` in a browser. Keep the `assets` folder beside the four HTML pages. The included build works offline and can also be served by a static web host.

- `index.html` is the landing page and links to both collections.
- `editing.html` contains the video gallery and format filters.
- `planning.html` contains the three map views and links to the Space Syntax Lab.
- `about.html` contains education and experience from Nabil’s English CV.

## Edit the portfolio

Project titles, descriptions, and filenames are in `src/projects.js`. The landing summary and About entries are in `src/profile.js`. The site layout is in `src/app.jsx`, and shared styles are in `style.css`. The browser loads `assets/app.js`, which is the compiled bundle. After editing a file in `src`, run:

```sh
npm install
npm run build
```

The video files are H.264 MP4 copies of the four supplied videos. Map previews and full-resolution WebP copies come from the three supplied PNGs. The landing page loads its smaller map covers and requests the Three.js scene after the page has rendered.

The Space Syntax Lab supports pointer, touch, and keyboard graph editing. Integration calculations require a connected graph of at least three rooms, and graph edits clear the previous results.

Typography uses SF Pro through the system font on Apple devices. Windows and other platforms use their native sans-serif font. The font stack works offline.

The H1–H5 scale is defined in `assets/type-scale.css`. Each level is the previous level divided by 1.314. The landing page uses a larger starting size, and the Space Syntax Lab uses a compact starting size.
