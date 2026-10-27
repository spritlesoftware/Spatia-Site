(function () {
  const A = window.CogAnim, C = A.C;
  const TY = ['block', 'cyl', 'bracket'], HH = { block: 8, cyl: 12, bracket: 10 }, PW = { block: 32, cyl: 18, bracket: 30 }, PH = { block: 16, cyl: 24, bracket: 20 };
  const COL = [C.teal, C.ink, C.tealL], BX = [290, 332, 374], PICK = 165, SP = 64, BELT = 204;
  const ty = m => TY[((m % 3) + 3) % 3], ti = m => ((m % 3) + 3) % 3;
  const gh = m => A.HW[ty(m)] + 0.5, yp = m => BELT - HH[ty(m)];
  A.scenes.sort = {
    dur: 6, still: 1.2,
    render(t, st) {
      const c = Math.floor(t / 2), u = t - c * 2, p = c - 1;
      const [x, y, g] = A.kfa(u, [
        [0, BX[ti(p)], 178, gh(p)], [0.15, BX[ti(p)], 178, 20], [0.75, PICK, 150, 20], [0.85, PICK, 150, 20],
        [1.15, PICK, yp(c), 20], [1.3, PICK, yp(c), gh(c)], [1.55, 178, 142, gh(c)], [2, BX[ti(c)], 178, gh(c)]
      ]);
      const belt = c + A.seg(u, 0, 0.7);
      let s = A.bg(250);
      BX.forEach(bx => { s += `<rect x="${bx - 12}" y="206" width="36" height="44" fill="${C.line}" stroke="${C.ink}" stroke-width="1.2"/>`; });
      // released part from previous cycle falls into its bin
      if (u >= 0.15 && u < 0.5) s += A.part(ty(p), BX[ti(p)], A.lerp(178, 240, Math.pow(A.clamp((u - 0.15) / 0.3), 2)), 0);
      BX.forEach((bx, i) => {
        s += `<rect x="${bx - 18}" y="214" width="36" height="36" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
        s += `<rect x="${bx - 9}" y="226" width="18" height="3" fill="${COL[i]}"/>`;
      });
      // conveyor
      s += `<path d="M30 214 V250 M190 214 V250" stroke="${C.ink}" stroke-width="2"/>`;
      s += `<rect x="6" y="${BELT}" width="200" height="10" rx="5" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`;
      const off = (belt * SP) % 16;
      let ticks = '';
      for (let k = -1; k < 14; k++) { const tx = 12 + k * 16 + off; if (tx > 10 && tx < 200) ticks += `M${A.f(tx)} ${BELT + 3} v4 `; }
      s += `<path d="${ticks}" stroke="${C.mute}" stroke-width="1.2"/>`;
      s += `<circle cx="11" cy="${BELT + 5}" r="2" fill="${C.ink}"/><circle cx="201" cy="${BELT + 5}" r="2" fill="${C.ink}"/>`;
      for (let m = c; m <= c + 3; m++) {
        if (m === c && u >= 1.3) continue;
        const px = PICK + (belt - (m + 1)) * SP;
        if (px > -30) s += A.part(ty(m), px, yp(m), 0);
      }
      const holdC = u >= 1.3, holdP = u < 0.15;
      if (holdC) s += A.part(ty(c), x, y, 0);
      if (holdP) s += A.part(ty(p), x, y, 0);
      s += A.arm({ bx: 235, by: 250, h: 88, x, y, g }, st);
      // perception
      if (holdP) s += A.pose(x, y, PW[ty(p)], PH[ty(p)], 0, 1 - A.seg(u, 0.02, 0.15), COL[ti(p)]);
      const pc = A.seg(u, 0.5, 0.8);
      const cx = holdC ? x : PICK + (belt - (c + 1)) * SP, cy = holdC ? y : yp(c);
      s += A.pose(cx, cy, PW[ty(c)], PH[ty(c)], 0, pc, COL[ti(c)]);
      return s;
    }
  };
})();
