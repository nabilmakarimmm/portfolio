import { BufferGeometry, Line, LineBasicMaterial, LineSegments, OrthographicCamera, Scene, Vector3, WebGLRenderer } from 'three';

export function drawSurvey(canvas, stage) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    return;
  }

  const scene = new Scene();
  const camera = new OrthographicCamera(-5, 5, 4, -4, 0.1, 20);
  camera.position.z = 8;
  const grid = [];
  for (let coordinate = -8; coordinate <= 8; coordinate += 0.5) {
    grid.push(new Vector3(coordinate, -8, 0), new Vector3(coordinate, 8, 0));
    grid.push(new Vector3(-8, coordinate, 0), new Vector3(8, coordinate, 0));
  }
  const gridMaterial = new LineBasicMaterial({ color: '#9f8ac9', transparent: true, opacity: 0.32 });
  const contourMaterial = new LineBasicMaterial({ color: '#8262b9', transparent: true, opacity: 0.45 });
  scene.add(new LineSegments(new BufferGeometry().setFromPoints(grid), gridMaterial));
  for (let ring = 0; ring < 11; ring++) {
    const points = [];
    for (let step = 0; step <= 96; step++) {
      const angle = step * Math.PI / 48;
      const radius = 1.15 + ring * 0.28 + 0.24 * Math.sin(angle * 3) + 0.17 * Math.cos(angle * 5);
      points.push(new Vector3(3.4 + Math.cos(angle) * radius, 1.8 + Math.sin(angle) * radius * 0.82, 0.1));
    }
    scene.add(new Line(new BufferGeometry().setFromPoints(points), contourMaterial));
  }
  scene.rotation.z = -0.12;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const render = () => renderer.render(scene, camera);
  const resize = () => {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    const halfSpan = 4 * width / height;
    camera.left = -halfSpan;
    camera.right = halfSpan;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const move = (event) => {
    if (reduceMotion.matches || event.pointerType === 'touch') return;
    const box = stage.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    stage.style.setProperty('--shift-x', `${x * 16}px`);
    stage.style.setProperty('--shift-y', `${y * 14}px`);
    scene.rotation.x = y * 0.15;
    scene.rotation.y = x * 0.2;
    render();
  };
  const reset = () => {
    stage.style.removeProperty('--shift-x');
    stage.style.removeProperty('--shift-y');
    scene.rotation.x = 0;
    scene.rotation.y = 0;
    render();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  stage.addEventListener('pointermove', move);
  stage.addEventListener('pointerleave', reset);
  reduceMotion.addEventListener('change', reset);
  return () => {
    observer.disconnect();
    stage.removeEventListener('pointermove', move);
    stage.removeEventListener('pointerleave', reset);
    reduceMotion.removeEventListener('change', reset);
    scene.children.forEach((item) => item.geometry.dispose());
    gridMaterial.dispose();
    contourMaterial.dispose();
    renderer.dispose();
  };
}
