(function () {
  const A = window.CogAnim, C = A.C;
  const TP = { x: 95, y: 188 }, CH = { x: 312, y: 192 };
  const keys = [
    [0, 205, 118, 20, 0], [0.35, 205, 118, 20, 0], [0.95, TP.x, 150, 20, 0], [1.25, TP.x, TP.y, 20, 0], [1.4, TP.x, TP.y, 9.5, 0],
    [1.75, TP.x, 140, 9.5, 0], [2.35, CH.x, 160, 9.5, 0], [2.6, CH.x, CH.y, 9.5, 0], [2.8, CH.x, CH.y, 20, 0],
    [3.1, CH.x, 150, 20, 0], [3.5, 205, 118, 20, 0], [5, 205, 118, 20, 0]
  ];
  A.scenes.load = {
    dur: 5, still: 2.6,
    render(t, st) {
      const [x, y, g] = A.kfa(t, keys);
      const door = A.seg(t, 3.5, 3.9) * (1 - A.seg(t, 4.4, 4.8));
      const jaw = A.seg(t, 2.6, 2.75) * (1 - A.seg(t, 4.0, 4.2));
      let s = A.bg(250);
      // machine
      s += `<rect x="235" y="92" width="170" height="158" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      s += `<path d="M235 110 H405" stroke="${C.ink}" stroke-width="1.2"/>`;
      s += `<rect x="255" y="125" width="115" height="90" fill="${C.line}" stroke="${C.ink}" stroke-width="1.5"/>`;
      s += `<rect x="378" y="125" width="14" height="40" fill="none" stroke="${C.ink}" stroke-width="1.2"/>`;
      s += `<circle cx="385" cy="101" r="3.5" fill="${door > 0.95 ? C.teal : C.white}" stroke="${C.ink}" stroke-width="1.2"/>`;
      s += `<path d="M255 215 H370" stroke="${C.ink}" stroke-width="1.5"/><rect x="250" y="230" width="125" height="6" fill="${C.line}" stroke="${C.ink}" stroke-width="1"/>`;
      // chuck
      s += `<rect x="290" y="204" width="44" height="11" fill="${C.white}" stroke="${C.ink}" stroke-width="1.4"/>`;
      const jo = A.lerp(15, 9, jaw);
      if (t >= 2.8 && t < 3.95) s += A.part('cyl', CH.x, CH.y, 0);
      s += `<rect x="${A.f(CH.x - jo - 6)}" y="194" width="6" height="10" fill="${C.ink}"/><rect x="${A.f(CH.x + jo)}" y="194" width="6" height="10" fill="${C.ink}"/>`;
      // door
      if (door > 0) {
        const dy = A.lerp(-90, 0, door);
        s += `<clipPath id="ldw"><rect x="255" y="125" width="115" height="90"/></clipPath>`;
        s += `<g clip-path="url(#ldw)"><rect x="255" y="${A.f(125 + dy)}" width="115" height="90" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>` +
          `<rect x="275" y="${A.f(140 + dy)}" width="75" height="30" fill="${C.bg}" stroke="${C.ink}" stroke-width="1.2"/></g>`;
      }
      // tray stand
      s += `<path d="M38 210 V250 M112 210 V250" stroke="${C.ink}" stroke-width="2"/>`;
      s += `<rect x="25" y="200" width="100" height="10" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      s += A.part('cyl', 55, 188, 0);
      if (t < 1.4) s += A.part('cyl', TP.x, TP.y, 0);
      else if (t > 4.4) s += A.part('cyl', TP.x, TP.y, 0, A.seg(t, 4.4, 4.9));
      s += `<rect x="25" y="196" width="100" height="4" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/>`;
      const held = t >= 1.4 && t < 2.8;
      if (held) s += A.part('cyl', x, y, 0);
      s += A.arm({ bx: 165, by: 250, h: 88, x, y, g }, st);
      // perception: part pose, then target frame on the chuck
      const pp = A.seg(t, 0.4, 0.8) * (1 - A.seg(t, 2.75, 3.0));
      const q = held ? { x, y } : t >= 2.8 ? CH : TP;
      s += A.pose(q.x, q.y, 18, 24, 0, pp);
      const tg = A.seg(t, 1.8, 2.15) * (1 - A.seg(t, 2.5, 2.7));
      if (tg > 0) s += `<g opacity="${A.f(tg)}" stroke="${C.teal}" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M${CH.x} 204 h22 M${CH.x} 204 v-26 M${CH.x} 204 l-9 9"/><circle cx="${CH.x}" cy="204" r="3"/></g>`;
      return s;
    }
  };
})();
