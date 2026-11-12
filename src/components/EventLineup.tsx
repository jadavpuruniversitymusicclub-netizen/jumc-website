"use client";

import React, { useEffect } from 'react';
import * as THREE from 'three';
import './EventLineup.css';

interface CardGridRect {
  x: number;
  y: number;
  w: number;
  h: number;
  vw: number;
  vh: number;
  c: number;
  r: number;
}

interface CardItem {
  i: number;
  title: string;
  v: HTMLVideoElement;
  tex: THREE.VideoTexture;
  geo: THREE.PlaneGeometry;
  mat: THREE.ShaderMaterial;
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  rect: CardGridRect | null;
}

export default function EventLineup() {
  useEffect(() => {
    const R2 = 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/';
    const WORK = [
      ['Roadster 3D', 'designs/roadster-3d-car-landing.mp4'],
      ['Living Portrait', 'aaaf/living-portrait-hero.mp4'],
      ['Particle Self', 'aaaf/oraciteslArea.mp4'],
      ['Robot Jellyfish', 'aaaf/medusa-jellyfish-hero.mp4'],
      ['Ink Reveal', 'designs/ink-reveal-hover.mp4'],
      ['Space Voyage', 'designs/space-voyage-video.mp4'],
      ['Helion Dispatch', 'designs/helion-dispatch-landing.mp4'],
      ['Honey Bee', 'designs/honey-bee-melli-landing.mp4'],
    ];

    const $ = (id: string) => document.getElementById(id) as HTMLElement | null;
    const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const mix = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => t * t * (3 - 2 * t);
    const out = (t: number) => 1 - (1 - t) ** 3;
    const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

    /* ---------- renderer ---------- */
    const canvas = $('gl') as HTMLCanvasElement | null;
    if (!canvas) return;
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const scene = new THREE.Scene();
    const FOV = 35;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

    /* ---------- ribbon path ---------- */
    let path: THREE.CatmullRomCurve3, PATH_L = 1;
    const SAMPLES = 1200;
    const pathP: THREE.Vector3[] = [];
    const pathT: THREE.Vector3[] = [];
    const PH0 = -1.5;
    const PH1 = Math.PI * 2 + 1.35;

    function buildPath() {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);
        const cs = Math.cos(ph);
        const u = 2 * t - 1;
        const depth = cs > 0 ? 7.6 + 16.4 * cs ** 0.9 : 7.6 + 2.2 * cs;
        const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
        pts.push(new THREE.Vector3(edge * Math.sin(ph) * depth * 0.561, 0.5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * 0.63, -depth));
      }
      path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      path.arcLengthDivisions = 1500;
      PATH_L = path.getLength(); 
      pathP.length = pathT.length = 0;
      for (let i = 0; i <= SAMPLES; i++) { 
        const u = i / SAMPLES; 
        pathP.push(path.getPointAt(u)); 
        pathT.push(path.getTangentAt(u)); 
      }
    }

    const at = (s: number, op: THREE.Vector3, ot: THREE.Vector3) => {
      const f = clamp(s / PATH_L) * SAMPLES;
      const i = Math.min(SAMPLES - 1, Math.floor(f));
      const k = f - i;
      op.lerpVectors(pathP[i], pathP[i + 1], k); 
      ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
    };

    /* ---------- cards ---------- */
    const CARD_W = 2.1, CARD_H = 1.32, GAP = 0.03, STEP = CARD_W + GAP, NX = 28, NY = 3;
    const vs = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
    const fs = `uniform sampler2D map;uniform vec2 cover;uniform float aspect,ready,radius;varying vec2 vUv;
    void main(){
      vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
      float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
      float px=fwidth(d),a=1.-smoothstep(-px,px,d);
      if(a<.01)discard;
      vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
      vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
      float edge=smoothstep(-.012-px,-.012,d);
      gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
    }`;

    const cards: CardItem[] = WORK.map(([title, src], i) => {
      const v = document.createElement('video');
      Object.assign(v, { crossOrigin: 'anonymous', muted: true, loop: true, playsInline: true, preload: 'auto', src: R2 + src });
      v.setAttribute('playsinline', '');
      const tex = new THREE.VideoTexture(v);
      tex.colorSpace = THREE.NoColorSpace; 
      tex.minFilter = THREE.LinearFilter; 
      tex.magFilter = THREE.LinearFilter; 
      tex.generateMipmaps = false;
      const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
      const mat = new THREE.ShaderMaterial({ vertexShader: vs, fragmentShader: fs, transparent: true, side: THREE.DoubleSide,
        uniforms: { map: { value: tex }, cover: { value: new THREE.Vector2(1, 1) }, aspect: { value: CARD_W / CARD_H }, ready: { value: 0 }, radius: { value: 0.018 } } 
      });
      const mesh = new THREE.Mesh(geo, mat); 
      mesh.frustumCulled = false; 
      scene.add(mesh);
      const c: CardItem = { i, title, v, tex, geo, mat, mesh, rect: null };
      v.addEventListener('loadeddata', () => {
        const va = v.videoWidth / v.videoHeight;
        const ca = CARD_W / CARD_H;
        mat.uniforms.cover.value.set(va > ca ? ca / va : 1, va > ca ? 1 : va / ca);
        mat.uniforms.ready.value = 1;
      });
      return c;
    });

    /* ---------- layout ---------- */
    const GZ = 8;
    let W = 1, H = 1, asp = 1, cols = 3, rows = 2, tanH = 0.3153;
    
    function resize() {
      W = window.innerWidth; 
      H = window.innerHeight; 
      asp = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
      renderer.setSize(W, H, false);
      camera.aspect = asp; 
      camera.fov = asp < 16 / 9 ? Math.atan(0.561 / asp) * 360 / Math.PI : FOV; 
      camera.updateProjectionMatrix();
      tanH = Math.tan(camera.fov * Math.PI / 360);
      cols = asp < 0.9 ? 2 : 3; 
      rows = asp < 0.9 ? 3 : 2;
    }
    
    window.addEventListener('resize', resize); 
    resize(); 
    buildPath();
    
    function grid(i: number): CardGridRect {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const gw = vw * (cols === 3 ? 0.74 : 0.88);
      const gap = gw * 0.017;
      const cw = (gw - gap * (cols - 1)) / cols;
      const ch = cw / (CARD_W / CARD_H);
      const gh = ch * rows + gap * 1.6 * (rows - 1);
      const c = i % cols;
      const r = Math.floor(i / cols);
      return { x: -gw / 2 + cw / 2 + c * (cw + gap), y: gh / 2 - ch / 2 - r * (ch + gap * 1.6), w: cw, h: ch, vw, vh, c, r };
    }

    /* ---------- scroll ---------- */
    let target = 0, p = 0;
    const frozen = false;
    const readScroll = () => { 
      const t = $('track'); 
      if (t) {
        const rect = t.getBoundingClientRect();
        const total = t.offsetHeight - window.innerHeight;
        target = clamp(-rect.top / Math.max(1, total));
      }
    };
    window.addEventListener('scroll', readScroll, { passive: true }); 
    readScroll();

    /* ---------- pose ---------- */
    const op = new THREE.Vector3(), ot = new THREE.Vector3(), up = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0), vp = new THREE.Vector3();
    
    function poseRibbon(c: CardItem, head: number) {
      const pos = c.geo.attributes.position;
      const centre = head - c.i * STEP;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;
          at(centre + lu * CARD_W, op, ot);
          up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
          vp.copy(op).addScaledVector(up, lv * CARD_H);
          pos.setXYZ(k, vp.x, vp.y, vp.z);
        }
      }
      pos.needsUpdate = true;
    }
    
    function poseGrid(c: CardItem, q: number) {
      const g = grid(c.i);
      const pos = c.geo.attributes.position;
      const dx = (g.c - (cols - 1) / 2) * 1.2 + (cols === 3 && g.c === 1 ? 0 : 0);
      const dy = g.r < rows / 2 ? 1 : -1;
      const ox = dx * g.vw * 0.62 * (1 - q);
      const oy = dy * g.vh * (g.c === 1 ? 0.95 : 0.34) * (1 - q);
      const tilt = (1 - q) * 0.22 * (g.c - 1 || 0.5) * dy;
      const cs = Math.cos(tilt);
      const sn = Math.sin(tilt);
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const x = (ix / NX - 0.5) * g.w;
          const y = (0.5 - iy / NY) * g.h;
          pos.setXYZ(k, g.x + ox + x * cs - y * sn, g.y + oy + x * sn + y * cs, -GZ - (1 - q) * 0.6 * Math.sin(ix / NX * Math.PI));
        }
      }
      pos.needsUpdate = true;
      c.rect = g;
    }

    const RIB_A = 0.14, RIB_B = 0.63;
    
    function render() {
      const pp = p;
      const rise = 1 - out(span(pp, 0, 0.12));
      const run = mix(-50, 76, span(pp, 0, 0.58));
      
      const l1 = $('l1');
      if (l1) l1.style.transform = `translate3d(${run}vw,${rise * 34}vh,0)`;
      const l2 = $('l2');
      if (l2) l2.style.transform = `translate3d(${-run}vw,${rise * 34}vh,0)`;
      
      const cap = $('cap');
      const capA = 1 - span(pp, 0.52, 0.57);
      if (cap) {
        cap.style.opacity = capA.toString();
        cap.style.transform = `translate(-50%,calc(-50% + ${rise * 34}vh))`;
      }
      
      const intro = 1 - span(pp, 0, 0.05);
      for (const id of ['hint', 'pager', 'cross', 'glow']) {
        const el = $(id);
        if (el) el.style.opacity = intro.toString();
      }
      
      const rule = $('rule');
      if (rule) {
        rule.style.transform = `scaleX(${ease(span(pp, 0.72, 0.86))})`;
        rule.style.top = '50%';
      }

      const pr = span(pp, RIB_A, RIB_B);
      const head = mix(0, PATH_L + cards.length * STEP, pr);
      for (const c of cards) {
        const s = head - c.i * STEP;
        const end = PATH_L - CARD_W;
        if (s < end) {
          c.mesh.visible = s > CARD_W; 
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else if (c.i < cols * rows) {
          const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP));
          const q = out(span(pp, st, st + 0.13));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) poseGrid(c, q);
        } else { 
          c.mesh.visible = false; 
          c.rect = null; 
        }
      }
      renderer.render(scene, camera);
    }

    /* ---------- hover ---------- */
    const nameEl = $('name');
    const stageEl = $('stage');
    
    const handlePointerMove = (e: PointerEvent) => {
      let hit: CardItem | null = null;
      if (p > 0.86) {
        const nx = (e.clientX / W - 0.5);
        const ny = (0.5 - e.clientY / H);
        for (const c of cards) { 
          const g = c.rect; 
          if (!g) continue; 
          const x = nx * g.vw;
          const y = ny * g.vh; 
          if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) hit = c; 
        }
      }
      if (nameEl) {
        nameEl.style.opacity = hit ? '1' : '0';
        if (hit) { 
          nameEl.textContent = hit.title; 
          nameEl.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 16}px)`; 
        }
      }
    };
    
    if (stageEl) stageEl.addEventListener('pointermove', handlePointerMove as EventListener);

    /* ---------- loop ---------- */
    let reqId: number;
    function loop() {
      if (!frozen) {
        p += (target - p) * 0.09;
        if (Math.abs(target - p) < 0.00005) p = target;
        for (const c of cards) {
          if (c.mesh.visible && c.v.paused) c.v.play().catch(() => {});
          else if (!c.mesh.visible && !c.v.paused) c.v.pause();
        }
        render();
      }
      reqId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', resize);
      if (stageEl) stageEl.removeEventListener('pointermove', handlePointerMove as EventListener);
      renderer.dispose();
      cards.forEach(c => {
         try {
           c.v.pause();
           c.v.src = '';
           c.v.load();
         } catch {}
         c.geo.dispose();
         c.mat.dispose();
         c.tex.dispose();
      });
    };
  }, []);

  return (
    <div id="vante-event-hero">
      <div id="track">
        <main className="stage" id="stage">
          <h1 aria-label="Event Lineup">
            <div className="hl" id="l1" aria-hidden="true"><span>EVENT</span></div>
            <div className="hl" id="l2" aria-hidden="true"><span>LINEUP</span></div>
          </h1>
          <div id="cap">Exploring the ultimate musical and cultural events.</div>
          <div id="glow"></div>
          <div id="cross"><i>+</i></div>
          <div id="rule"></div>
          <canvas id="gl"></canvas>
          <div id="hint">REGISTER NOW &nbsp;→</div>
          <header className="top">
            <div className="logo">
              <svg viewBox="0 0 22 18"><path d="M11 0l11 18h-6.200L11 9.600 6.200 18H0z"/></svg>MILAAP
            </div>
            <div id="pager"><span>←</span><span>→</span></div>
            <nav className="acts">
              <a href="#events"><i></i>ALL EVENTS</a>
            </nav>
          </header>
          <footer className="bot">
            <p>A spectacular lineup of events curated for JUMC Edition I.</p>
            <div className="mid">MUSIC<s>/</s>DANCE<s>/</s>DRAMA<s>/</s>CULTURAL</div>
            <div className="r">VIEW SHOWREEL</div>
          </footer>
          <div id="name"></div>
        </main>
      </div>
    </div>
  );
}
