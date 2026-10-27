(function () {
  const A = window.CogAnim, C = A.C;
  const TG = { x: 300, y: 218 }, R0 = 14;
  const keys = [
    [0, 72, 136, 16.5, R0], [0.3, 72, 136, 16.5, R0], [1.4, 312, 188, 16.5, R0], [1.9, 312, 188, 16.5, R0],
    [2.6, TG.x, 188, 16.5, 0], [3.1, TG.x, TG.y, 16.5, 0], [3.3, TG.x, TG.y, 22, 0], [3.6, TG.x, 175, 22, 0],
    [4.3, 72, 136, 22, R0], [4.45, 72, 136, 22, R0], [4.85, 72, 136, 16.5, R0], [5, 72, 136, 16.5, R0]
  ];
  A.scenes.place = {
    dur: 5, still: 2.1,
    render(t, st) {
      const [x, y, g, r] = A.kfa(t, keys);
      let s = A.bg(250);
      // fixture plate
      s += `<path d="M246 238 V250 M354 238 V250" stroke="${C.ink}" stroke-width="2"/>`;
      s += `<rect x="232" y="226" width="136" height="12" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      s += `<rect x="278" y="220" width="5" height="6" fill="${C.ink}"/><rect x="317" y="220" width="5" height="6" fill="${C.ink}"/>`;
      const lit = A.seg(t, 1.3, 1.6) * (1 - A.seg(t, 3.4, 3.8));
      const seat = A.seg(t, 3.1, 3.3) * (1 - A.seg(t, 3.5, 3.9));
      s += `<rect x="${TG.x - 18}" y="${TG.y - 10}" width="36" height="20" fill="none" stroke="${C.teal}" stroke-width="${A.f(1 + seat)}" stroke-dasharray="${seat > 0.5 ? 'none' : '3 3'}" opacity="${A.f(0.35 + 0.65 * Math.max(lit, seat))}"/>`;
      const placed = t >= 3.3;
      if (placed) s += A.part('block', TG.x, TG.y, 0, 1 - A.seg(t, 4.2, 4.7));
      const held = t < 3.3 || t >= 4.4;
      if (held) s += A.part('block', x, y, r, t >= 4.4 ? A.seg(t, 4.4, 4.85) : 1);
      s += A.arm({ bx: 130, by: 250, h: 88, x, y, g, r, L1: 104, L2: 98 }, st);
      // pose + correction cue
      const pp = A.seg(t, 1.3, 1.65) * (1 - A.seg(t, 3.1, 3.4));
      s += A.pose(x, y, 32, 16, r, pp);
      const arc = A.seg(t, 1.6, 1.95) * (1 - A.seg(t, 2.6, 2.9));
      if (arc > 0) {
        const R = 30, a1 = -25 * Math.PI / 180, a2 = -115 * Math.PI / 180;
        const p1 = [x + R * Math.cos(a1), y + R * Math.sin(a1)], p2 = [x + R * Math.cos(a2), y + R * Math.sin(a2)];
        const L = R * (a1 - a2), dash = A.f(L * A.seg(t, 1.6, 1.95));
        const h = a2 - Math.PI / 2, hx = p2[0], hy = p2[1];
        const ah = `M${A.f(hx + 6 * Math.cos(h + 0.5))} ${A.f(hy + 6 * Math.sin(h + 0.5))} L${A.f(hx)} ${A.f(hy)} L${A.f(hx + 6 * Math.cos(h - 0.5))} ${A.f(hy + 6 * Math.sin(h - 0.5))}`;
        s += `<g stroke="${C.teal}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${A.f(arc)}">` +
          `<path d="M${A.f(p1[0])} ${A.f(p1[1])} A${R} ${R} 0 0 0 ${A.f(p2[0])} ${A.f(p2[1])}" stroke-dasharray="${dash} 999"/>` +
          (t > 1.9 ? `<path d="${ah}"/>` : '') +
          `<path d="M${A.f(x)} ${A.f(y + 14)} L${TG.x} ${TG.y - 10}" stroke-dasharray="1.5 3" stroke-width="1.2"/></g>`;
      }
      return s;
    }
  };
})();
