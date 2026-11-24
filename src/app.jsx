import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { maps, videos } from './projects';
import { education, experience, summary } from './profile';

const asset = (filename) => `assets/${filename}`;
const pages = {
  home: ['Home', 'index.html'],
  editing: ['Photo & Video', 'editing.html'],
  planning: ['GIS & Planning', 'planning.html'],
  about: ['About', 'about.html'],
};
const page = document.body.dataset.page;

function Icon({ name, size = 20 }) {
  const paths = {
    play: <path d="M8 5.5v13l10-6.5z" fill="currentColor" strokeLinejoin="round" />,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></>,
    grid: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></>,
    plus: <path d="M5 12h14M12 5v14"/>,
    minus: <path d="M5 12h14"/>,
    reset: <path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    external: <><path d="M14 4h6v6m0-6-9 9"/><path d="M19 13v6H5V5h6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Mark() {
  return <span className="mark" aria-hidden="true"><span/><span/><span/></span>;
}

function Header() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="header-inner wrap">
        <a className="brand" href="index.html"><span className="brand-portrait"><img src={asset('portrait.webp')} alt="" width="54" height="54"/></span><span>Nabil Makarim</span></a>
        <nav aria-label="Main navigation">
          {Object.entries(pages).map(([key, [label, href]]) => <a key={key} href={href} aria-current={key === page ? 'page' : undefined}>{label}</a>)}
        </nav>
      </div>
    </header>
  </>;
}

function Footer() {
  return <footer className="site-footer wrap"><a className="brand" href="index.html"><Mark/><span>Nabil Makarim</span></a><a className="footer-link" href="#main">Back to top</a></footer>;
}

function HeroStage() {
  const stage = useRef(null);
  const survey = useRef(null);
  useEffect(() => {
    const script = document.createElement('script');
    const canvas = survey.current;
    const panel = stage.current;
    let dispose;
    script.src = asset('survey.js');
    script.onload = () => { dispose = window.portfolioSurvey.drawSurvey(canvas, panel); };
    const load = () => document.head.append(script);
    const idle = typeof window.requestIdleCallback === 'function';
    const task = idle ? window.requestIdleCallback(load, { timeout: 800 }) : window.setTimeout(load, 120);
    return () => {
      if (idle) window.cancelIdleCallback(task);
      else window.clearTimeout(task);
      script.onload = null;
      script.remove();
      dispose?.();
    };
  }, []);
  return <div className="hero-stage" ref={stage}>
    <canvas className="survey" ref={survey} aria-hidden="true"/>
    <span className="stage-cross cross-one" aria-hidden="true"/>
    <span className="stage-cross cross-two" aria-hidden="true"/>
    <a className="hero-print hero-film" href="editing.html#jakarta" aria-label="Watch Jakarta">
      <img src={asset('jakarta.webp')} alt="Night traffic passing an illuminated billboard in Jakarta" fetchPriority="high"/>
      <span className="frame-caption">Jakarta</span>
      <span className="hero-play"><Icon name="play" size={23}/></span>
    </a>
    <a className="hero-print hero-map" href="planning.html#kdh" aria-label="Explore the KDH green space map">
      <img src={asset('kdh-cover.webp')} alt="Green space plan showing landscaped areas around a sports complex" fetchPriority="high"/>
      <span className="frame-caption"><span>Green space map</span><span>KDH</span></span>
    </a>
  </div>;
}

function Home() {
  return <main id="main">
    <section className="home-hero wrap" aria-labelledby="home-title">
      <div className="hero-copy">
        <h1 id="home-title" aria-label="Nabil Makarim">Nabil<br/>Makarim<span aria-hidden="true">.</span></h1>
        <p>{summary}</p>
        <a className="button primary" href="#work"><Icon name="grid" size={17}/> Explore my work</a>
      </div>
      <HeroStage/>
    </section>
    <section className="selected-work wrap" id="work" aria-labelledby="work-title">
      <h2 id="work-title">Selected work</h2>
      <div className="collection-grid">
        <a className="collection editing-collection" href="editing.html">
          <div className="collection-image"><img src={asset('surabaya.webp')} alt="A view down the aisle of a bus in Surabaya" loading="lazy"/><span className="collection-icon"><Icon name="play"/></span></div>
          <div className="collection-label"><div><h3>Photo &amp; Video Editing</h3><p>City footage and short-form edits</p></div><span>4 videos</span></div>
        </a>
        <a className="collection planning-collection" href="planning.html">
          <div className="collection-image"><img src={asset('kdb-cover.webp')} alt="Building coverage map with parcels shaded red and yellow" loading="lazy"/><span className="collection-icon"><Icon name="map"/></span></div>
          <div className="collection-label"><div><h3>GIS &amp; Urban Planning</h3><p>Site maps and spatial analysis</p></div><span>3 maps + lab</span></div>
        </a>
      </div>
    </section>
  </main>;
}

function FilmCard({ film, onPlay }) {
  return <article className={`film-card ${film.format.toLowerCase()}`} id={film.id}>
    <button className="film-cover" type="button" aria-label={`Play ${film.title}`} onClick={() => onPlay(film)}>
      <img src={asset(`${film.id}.webp`)} alt="" loading="lazy"/>
      <span className="play-icon"><Icon name="play" size={26}/></span>
      <span className="duration">{film.duration}</span>
    </button>
    <div className="film-caption"><h2>{film.title}</h2><p>{film.description}</p></div>
  </article>;
}

function FilmPlayer({ film, onClose }) {
  const dialog = useRef(null);
  const video = useRef(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    dialog.current.showModal();
    video.current.play().catch(() => {});
  }, []);

  return <dialog className={`film-dialog ${film.format.toLowerCase()}`} ref={dialog} aria-labelledby="player-title" onClose={onClose} onClick={(event) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }}>
    <div className="player-panel">
      <div className="player-header"><h2 id="player-title">{film.title}</h2><button className="icon-button" aria-label="Close video" onClick={() => dialog.current.close()}><Icon name="close"/></button></div>
      <video ref={video} src={asset(`${film.id}.mp4`)} poster={asset(`${film.id}.webp`)} controls playsInline onError={() => setError(true)}/>
      {error && <p role="status">This browser couldn’t play the video. <a href={asset(`${film.id}.mp4`)} download>Download the MP4</a>.</p>}
    </div>
  </dialog>;
}

function Editing() {
  const [filter, setFilter] = useState('All videos');
  const [playing, setPlaying] = useState(() => videos.find((film) => `#${film.id}` === location.hash) || null);
  const visible = filter === 'All videos' ? videos : videos.filter((film) => film.format === filter);
  function closeFilm() {
    setPlaying(null);
    if (location.hash) history.replaceState(null, '', location.href.split('#')[0]);
  }

  return <main id="main" className="interior wrap">
    <section className="page-intro">
      <h1>Photo &amp; Video Editing</h1>
      <p>Street scenes from Surabaya and Jakarta, a short-form portrait, and a captioned editing test.</p>
    </section>
    <section aria-label="Video gallery">
      <div className="gallery-toolbar">
        <div className="segments" role="group" aria-label="Filter by video format">
          {['All videos', 'Landscape', 'Vertical'].map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <span className="gallery-count" role="status">{visible.length} videos</span>
      </div>
      <div className="film-grid">{visible.map((film) => <FilmCard key={film.id} film={film} onPlay={setPlaying}/>)}</div>
    </section>
    {playing && <FilmPlayer key={playing.id} film={playing} onClose={closeFilm}/>}
    <a className="next-collection" href="planning.html"><Icon name="map"/> Explore GIS &amp; Urban Planning</a>
  </main>;
}

function MapViewer({ map }) {
  const [zoom, setZoom] = useState(1);
  const pane = useRef(null);
  const drag = useRef(null);
  const center = useRef(false);
  useEffect(() => {
    if (!center.current) return;
    const view = pane.current;
    view.scrollTo((view.scrollWidth - view.clientWidth) / 2, (view.scrollHeight - view.clientHeight) / 2);
    center.current = false;
  }, [zoom]);

  function changeZoom(value) {
    const next = Math.min(3, Math.max(1, value));
    if (next === zoom) return;
    center.current = true;
    setZoom(next);
  }

  function startPan(event) {
    if (zoom === 1 || event.pointerType === 'touch' || event.button !== 0) return;
    const view = event.currentTarget;
    drag.current = { x: event.clientX, y: event.clientY, left: view.scrollLeft, top: view.scrollTop };
    view.setPointerCapture(event.pointerId);
  }

  function pan(event) {
    if (!drag.current) return;
    const { x, y, left, top } = drag.current;
    event.currentTarget.scrollTo(left + x - event.clientX, top + y - event.clientY);
  }

  return <div className="map-viewer">
    <div className="map-controls">
      <span>{map.label} map</span>
      <div role="group" aria-label="Map zoom" className="zoom-controls">
        <button className="icon-button" aria-label="Zoom out" disabled={zoom === 1} onClick={() => changeZoom(zoom - 0.5)}><Icon name="minus" size={17}/></button>
        <output aria-label="Zoom level">{zoom * 100}%</output>
        <button className="icon-button" aria-label="Zoom in" disabled={zoom === 3} onClick={() => changeZoom(zoom + 0.5)}><Icon name="plus" size={17}/></button>
        <button className="icon-button" aria-label="Reset zoom" disabled={zoom === 1} onClick={() => changeZoom(1)}><Icon name="reset" size={17}/></button>
      </div>
    </div>
    <div className={zoom > 1 ? 'map-window is-zoomed' : 'map-window'} role="region" aria-label={`${map.label} map image. Use the arrow keys, drag, or swipe to pan when zoomed.`} ref={pane} tabIndex={zoom > 1 ? 0 : undefined} onPointerDown={startPan} onPointerMove={pan} onLostPointerCapture={() => { drag.current = null; }}>
      <img src={asset(`${map.id}${zoom > 1 ? '-full' : ''}.webp`)} width="4959" height="3509" alt={`${map.localTitle} site plan with a color-coded legend`} draggable="false" style={{ width: `${zoom * 100}%` }}/>
    </div>
  </div>;
}

function Planning() {
  const readMap = () => maps.find((item) => `#${item.id}` === location.hash) ?? maps[0];
  const [map, setMap] = useState(readMap);
  useEffect(() => {
    const updateMap = () => setMap(readMap());
    window.addEventListener('hashchange', updateMap);
    return () => window.removeEventListener('hashchange', updateMap);
  }, []);

  function selectMap(item) {
    setMap(item);
    history.replaceState(null, '', `#${item.id}`);
  }

  return <main id="main" className="interior wrap">
    <section className="page-intro">
      <h1>GIS &amp; Urban Planning</h1>
      <p>Explore three zoning maps of the same site and model spatial connections in the <a href="#space-syntax">Space Syntax Lab</a>.</p>
    </section>
    <section className="atlas" aria-label="Zoning maps">
      <div className="atlas-details">
        <div className="segments" role="group" aria-label="Choose a map">
          {maps.map((item) => <button key={item.id} type="button" aria-pressed={map.id === item.id} onClick={() => selectMap(item)}>{item.label}</button>)}
        </div>
        <div className="map-description" aria-live="polite">
          <h2>{map.title}</h2>
          <p className="local-title" lang="id">{map.localTitle}</p>
          <p>{map.description}</p>
          <p>{map.reading}</p>
          <div className="map-key" role="group" aria-label={`${map.label} map legend`}>
            <p>Map legend</p>
            <ul>{map.bands.map(([label, color]) => <li key={label}><span className="map-swatch" style={{ backgroundColor: color }} aria-hidden="true"/>{label}</li>)}</ul>
            <p className="map-symbols">The red dotted line marks the study boundary. Gray marks building parcels.</p>
          </div>
        </div>
        <a className="text-link" href={asset(`${map.id}-full.webp`)} target="_blank" rel="noopener">Open full-resolution map <Icon name="external" size={15}/></a>
      </div>
      <MapViewer key={map.id} map={map}/>
    </section>
    <section className="lab" id="space-syntax" aria-labelledby="lab-title">
      <div className="lab-copy"><h2 id="lab-title">Space Syntax Lab</h2><p>Load the sample network or build your own. Compare how many direct connections a room has with how many steps it takes to reach the rest of the graph.</p><a className="button light" href={asset('space-syntax-lab.html')}>Open Space Syntax Lab <Icon name="external" size={17}/></a></div>
      <img className="lab-preview" src={asset('lab-preview.webp')} alt="A J-Graph of connected spaces with an integration results table" loading="lazy"/>
    </section>
    <a className="next-collection" href="editing.html"><Icon name="play"/> Explore Photo &amp; Video Editing</a>
  </main>;
}

function About() {
  return <main id="main" className="interior wrap">
    <div className="page-intro"><h1>About</h1></div>
    <div className="profile-layout">
      <section className="education" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <h3>{education.program}</h3>
        <p className="profile-organization">{education.institution}</p>
        <p className="profile-dates">{education.dates}</p>
        <p className="profile-gpa">GPA {education.gpa}</p>
        <p className="profile-description">{education.thesis}</p>
      </section>
      <section aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <ul className="experience-list">
          {experience.map(({ role, organization, dates, description }) => <li key={role}>
            <div className="experience-heading"><h3>{role}</h3><p className="profile-dates">{dates}</p></div>
            <p className="profile-organization">{organization}</p>
            <p className="profile-description">{description}</p>
          </li>)}
        </ul>
      </section>
    </div>
  </main>;
}

const CurrentPage = { home: Home, editing: Editing, planning: Planning, about: About }[page] ?? Home;
createRoot(document.querySelector('#app')).render(<><Header/><CurrentPage/><Footer/></>);
