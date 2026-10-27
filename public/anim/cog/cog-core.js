(function () {
  const C = { bg: '#F4F8F8', ink: '#111827', teal: '#1E686E', tealL: '#7FB2B6', mute: '#9CA3AF', line: '#E8ECEB', white: '#FFFFFF' };
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (t, a, b) => ease(clamp((t - a) / (b - a)));
  const f = n => Math.round(n * 100) / 100;

  // keys: [[time, v0, v1, ...], ...] -> eased interpolated array
  function kfa(t, keys) {
    if (t <= keys[0][0]) return keys[0].slice(1);
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i], b = keys[i + 1];
      if (t <= b[0]) {
        const e = ease(clamp((t - a[0]) / (b[0] - a[0] || 1)));
        return a.slice(1).map((v, j) => lerp(v, b[j + 1], e));
      }
    }
    return keys[keys.length - 1].slice(1);
  }

  function link(x1, y1, x2, y2, w) {
    return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.ink}" stroke-width="${w + 3}" stroke-linecap="round"/>` +
      `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.white}" stroke-width="${w}" stroke-linecap="round"/>`;
  }
  function joint(x, y, r) {
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${C.white}" stroke="${C.ink}" stroke-width="1.6"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${r * 0.32}" fill="${C.ink}"/>`;
  }

  const GL = 38; // wrist -> tool point
  // o: {bx, by (floor y), h, x, y (tool point), g (finger half-gap), r (deg), L1, L2}
  function arm(o, st) {
    const L1 = o.L1 || 96, L2 = o.L2 || 92;
    const sx = o.bx, sy = o.by - o.h;
    const rr = (o.r || 0) * Math.PI / 180;
    const wx = o.x + Math.sin(rr) * GL, wy = o.y - Math.cos(rr) * GL;
    // arm works in a vertical plane that yaws about the base; a small depth offset
    // keeps the swing continuous when the wrist crosses over the shoulder
    const dx = wx - sx, dy = wy - sy, rho = Math.hypot(dx, o.z == null ? 28 : o.z), cy = dx / rho;
    const d = clamp(Math.hypot(rho, dy), Math.abs(L1 - L2) + 1, L1 + L2 - 0.5);
    const a = Math.atan2(dy, rho), b = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const e = [sx + L1 * Math.cos(a - b) * cy, sy + L1 * Math.sin(a - b)];
    const g = o.g == null ? 16 : o.g;
    const bx = o.bx, by = o.by;
    let s = '';
    s += `<rect x="${bx - 30}" y="${by - 7}" width="60" height="7" fill="${C.ink}"/>`;
    s += `<path d="M${bx - 19} ${by - 7} L${bx - 13} ${sy + 6} L${bx + 13} ${sy + 6} L${bx + 19} ${by - 7} Z" fill="${C.white}" stroke="${C.ink}" stroke-width="1.6" stroke-linejoin="round"/>`;
    s += `<line x1="${bx - 16}" y1="${by - 16}" x2="${bx + 16}" y2="${by - 16}" stroke="${C.ink}" stroke-width="1" opacity=".35"/>`;
    s += link(sx, sy, e[0], e[1], 11);
    s += link(e[0], e[1], wx, wy, 8.5);
    s += joint(sx, sy, 11) + joint(e[0], e[1], 8);
    s += `<g transform="translate(${f(wx)},${f(wy)}) rotate(${f(o.r || 0)})" stroke="${C.ink}" stroke-width="1.5" stroke-linejoin="round">` +
      `<rect x="-6" y="-2" width="12" height="9" fill="${C.white}"/>` +
      `<rect x="-21" y="7" width="42" height="7" fill="${C.ink}"/>` +
      `<rect x="${f(-g - 5)}" y="14" width="5" height="30" fill="${C.white}"/>` +
      `<rect x="${f(g)}" y="14" width="5" height="30" fill="${C.white}"/>` +
      `</g>`;
    s += joint(wx, wy, 5.5);
    return s;
  }

  // perception cue: 3D wireframe box + XYZ gizmo, snapping in as p goes 0 -> 1
  function pose(x, y, w, h, r, p, col) {
    if (p <= 0.001) return '';
    col = col || C.teal;
    const e = ease(clamp(p)), s = lerp(1.7, 1, e), op = clamp(p * 1.6);
    w += 8; h += 8;
    const d = 7, X = -w / 2, Y = -h / 2;
    const ns = 'vector-effect="non-scaling-stroke"';
    const cr = (cx, cy, sx, sy) => `<path d="M${cx + sx * 5} ${cy} H${cx} V${cy + sy * 5}" stroke-width="2" ${ns}/>`;
    return `<g transform="translate(${f(x)},${f(y)}) rotate(${f(r)}) scale(${f(s)})" opacity="${f(op)}" fill="none" stroke="${col}" stroke-width="1" stroke-linecap="round">` +
      `<rect x="${X + d}" y="${Y - d}" width="${w}" height="${h}" opacity=".45" ${ns}/>` +
      `<path d="M${X} ${Y} l${d} ${-d} M${X + w} ${Y} l${d} ${-d} M${X + w} ${Y + h} l${d} ${-d} M${X} ${Y + h} l${d} ${-d}" opacity=".45" ${ns}/>` +
      `<rect x="${X}" y="${Y}" width="${w}" height="${h}" ${ns}/>` +
      cr(X, Y, 1, 1) + cr(X + w, Y, -1, 1) + cr(X, Y + h, 1, -1) + cr(X + w, Y + h, -1, -1) +
      `<g stroke-width="1.5"><path d="M0 0 H${w / 2 + 9}" ${ns}/><path d="M0 0 V${-h / 2 - 11}" ${ns}/><path d="M0 0 l-8 8" ${ns}/></g>` +
      `<circle r="2" fill="${col}" stroke="none"/>` +
      `<circle cx="${w / 2 + 9}" r="1.6" fill="${col}" stroke="none"/><circle cy="${-h / 2 - 11}" r="1.6" fill="${col}" stroke="none"/><circle cx="-8" cy="8" r="1.6" fill="${col}" stroke="none"/>` +
      `</g>`;
  }

  const HW = { block: 16, cyl: 9, bracket: 15, nut: 12 };
  function part(type, x, y, r, op) {
    op = op == null ? 1 : op;
    if (op <= 0.001) return '';
    const a = `fill="${C.mute}" stroke="${C.ink}" stroke-width="1.3" stroke-linejoin="round"`;
    let b;
    if (type === 'cyl') b = `<rect x="-9" y="-12" width="18" height="24" rx="1.5" ${a}/><path d="M-9 -7 H9" stroke="${C.ink}" stroke-width="1" opacity=".6"/><path d="M-4 -12 V12" stroke="${C.white}" stroke-width="2" opacity=".55"/>`;
    else if (type === 'bracket') b = `<path d="M-15 -10 H-7 V2 H15 V10 H-15 Z" ${a}/><circle cx="-11" cy="-4" r="1.8" fill="${C.ink}"/>`;
    else if (type === 'nut') b = `<rect x="-12" y="-8" width="24" height="16" rx="1" ${a}/><path d="M-4 -8 V8 M4 -8 V8" stroke="${C.ink}" stroke-width="1" opacity=".55"/>`;
    else b = `<rect x="-16" y="-8" width="32" height="16" rx="1.5" ${a}/><path d="M-16 -3 H16" stroke="${C.white}" stroke-width="1.6" opacity=".55"/><rect x="-3" y="-8" width="6" height="16" fill="none" stroke="${C.ink}" stroke-width="1" stroke-dasharray="2 2" opacity=".6"/>`;
    return `<g transform="translate(${f(x)},${f(y)}) rotate(${f(r)})" opacity="${f(op)}">${b}</g>`;
  }

  function bg(floorY) {
    return `<rect width="400" height="300" fill="${C.bg}"/>` +
      (floorY ? `<line x1="0" y1="${floorY}" x2="400" y2="${floorY}" stroke="${C.line}" stroke-width="2"/>` : '');
  }

  function mount(host, scene) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 300');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    host.appendChild(svg);
    const st = {};
    const draw = t => { svg.innerHTML = scene.render(t, st); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(scene.still || 0); return () => svg.remove(); }
    let vis = true, id;
    const io = new IntersectionObserver(es => { vis = es[0].isIntersecting; });
    io.observe(host);
    const t0 = performance.now();
    let last = -1;
    const loop = now => {
      const fz = window.CogAnim.freeze;
      const t = fz != null ? fz % scene.dur : ((now - t0) / 1000) % scene.dur;
      if (vis && t !== last) { draw(t); last = t; }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); io.disconnect(); svg.remove(); };
  }

  window.CogAnim = { C, clamp, ease, lerp, seg, kfa, arm, pose, part, HW, bg, mount, f, scenes: window.CogAnim ? window.CogAnim.scenes : {} };
})();
