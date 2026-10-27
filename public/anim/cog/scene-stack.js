(function () {
  const A = window.CogAnim, C = A.C;
  const P = [{ x: 112, y: 220, r: -14 }, { x: 78, y: 222, r: 20 }, { x: 44, y: 219, r: -28 }];
  const SX = [275, 315, 355], L1 = 230, L2 = 214, SP = 1.75, T0 = 0.1;
  const keys = [[0, 232, 120, 22, 0]];
  P.forEach((p, i) => {
    const a = T0 + i * SP, s = SX[i];
    keys.push([a + 0.4, p.x, p.y - 34, 22, p.r], [a + 0.65, p.x, p.y, 22, p.r], [a + 0.8, p.x, p.y, 16.5, p.r],
      [a + 1.15, (p.x + s) / 2, 165, 16.5, 0], [a + 1.4, s, L2 - 20, 16.5, 0], [a + 1.55, s, L2, 16.5, 0], [a + 1.7, s, L2, 22, 0]);
  });
  keys.push([5.75, 232, 120, 22, 0], [6, 232, 120, 22, 0]);
  A.scenes.stack = {
    dur: 6, still: 3.2,
    render(t, st) {
      const [x, y, g, r] = A.kfa(t, keys);
      let s = A.bg(250);
      // tote
      s += `<rect x="28" y="208" width="110" height="36" fill="${C.line}" stroke="${C.ink}" stroke-width="1.2"/>`;
      const fadeIn = A.seg(t, 5.4, 5.95), fadeOut = 1 - A.seg(t, 5.4, 5.9);
      let held = '', pose = '';
      P.forEach((p, i) => {
        const a = T0 + i * SP;
        if (t < a + 0.8) s += A.part('block', p.x, p.y, p.r);
        else if (t >= 5.4) s += A.part('block', p.x, p.y, p.r, fadeIn);
        const pp = A.seg(t, a + 0.05, a + 0.4) * (1 - A.seg(t, a + 1.6, a + 1.8));
        if (pp > 0) {
          const h = t >= a + 0.8 && t < a + 1.7;
          const q = h ? { x, y, r } : t < a + 0.8 ? p : { x: SX[i], y: L2, r: 0 };
          pose += A.pose(q.x, q.y, 32, 16, q.r, pp);
        }
        if (t >= a + 0.8 && t < a + 1.7) held = A.part('block', x, y, r);
      });
      s += `<rect x="20" y="228" width="110" height="22" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      // pallet, grid, layers
      s += `<rect x="246" y="238" width="138" height="8" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      [252, 308, 364].forEach(fx => { s += `<rect x="${fx}" y="246" width="14" height="4" fill="${C.ink}"/>`; });
      SX.forEach((sx, i) => {
        const a = T0 + i * SP;
        const hi = A.seg(t, a + 0.8, a + 1.1) * (1 - A.seg(t, a + 1.55, a + 1.9));
        [L1, L2].forEach(ly => {
          const o = ly === L2 ? 0.3 + 0.6 * hi : 0.3;
          s += `<rect x="${sx - 18}" y="${ly - 8}" width="36" height="16" fill="none" stroke="${C.teal}" stroke-width="1" stroke-dasharray="2 3" opacity="${A.f(o)}"/>`;
        });
        s += A.part('block', sx, L1, 0);
        if (t >= a + 1.7) s += A.part('block', sx, L2, 0, fadeOut);
      });
      s += `<path d="M${SX[0] - 18} 196 V238 M${SX[2] + 18} 196 V238" stroke="${C.teal}" stroke-width="1" stroke-dasharray="2 3" opacity=".3"/>`;
      s += held;
      s += A.arm({ bx: 190, by: 250, h: 88, x, y, g, r }, st);
      return s + pose;
    }
  };
})();
