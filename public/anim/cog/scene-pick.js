(function () {
  const A = window.CogAnim, C = A.C;
  const pile = [['cyl', 246, 207, -30], ['block', 262, 215, 40], ['bracket', 328, 207, -15], ['nut', 348, 214, 25], ['block', 318, 221, -8], ['cyl', 300, 224, 70], ['nut', 248, 224, -10]];
  const T = { type: 'block', x: 292, y: 206, r: 22 };
  const keys = [
    [0, 200, 118, 22, 0], [0.5, 200, 118, 22, 0], [1.35, 292, 170, 22, 22], [1.8, 292, 206, 22, 22],
    [2.05, 292, 206, 16.5, 22], [2.75, 290, 140, 16.5, 0], [3.5, 66, 192, 16.5, 0], [3.85, 66, 226, 16.5, 0],
    [4.05, 66, 226, 22, 0], [4.6, 200, 118, 22, 0], [5, 200, 118, 22, 0]
  ];
  A.scenes.pick = {
    dur: 5, still: 1.8,
    render(t, st) {
      const [x, y, g, r] = A.kfa(t, keys);
      const held = t >= 2.05 && t < 4.05;
      let s = A.bg(250);
      // bin back + pile
      s += `<path d="M232 188 H372 V240 H232 Z" fill="${C.line}" stroke="${C.ink}" stroke-width="1.3" stroke-linejoin="round"/>`;
      s += `<path d="M220 220 L232 188 M360 220 L372 188" stroke="${C.ink}" stroke-width="1.3"/>`;
      pile.forEach(p => { s += A.part(p[0], p[1], p[2], p[3]); });
      if (t < 2.05) s += A.part(T.type, T.x, T.y, T.r);
      else if (t > 4.4) s += A.part(T.type, T.x, T.y, T.r, A.seg(t, 4.4, 4.95));
      s += `<rect x="220" y="220" width="140" height="30" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      s += `<path d="M232 230 H348" stroke="${C.line}" stroke-width="1.5"/>`;
      // out tray
      s += `<rect x="38" y="244" width="56" height="6" fill="${C.ink}"/>`;
      if (t >= 4.05) s += A.part(T.type, 66, 226, 0, 1 - A.seg(t, 4.4, 4.9));
      s += `<rect x="28" y="232" width="76" height="12" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      if (held) s += A.part(T.type, x, y, r);
      s += A.arm({ bx: 150, by: 250, h: 88, x, y, g, r }, st);
      // perception
      let px = T.x, py = T.y, pr = T.r;
      if (held) { px = x; py = y; pr = r; } else if (t >= 4.05) { px = 66; py = 226; pr = 0; }
      const p = A.seg(t, 0.55, 0.95) * (1 - A.seg(t, 4.0, 4.3));
      s += A.pose(px, py, 32, 16, pr, p);
      return s;
    }
  };
})();
