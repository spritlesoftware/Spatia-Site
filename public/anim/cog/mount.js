(function () {
  const A = window.CogAnim;
  if (!A) return;
  document.querySelectorAll('[data-cog-scene]').forEach(el => {
    const scene = A.scenes[el.dataset.cogScene];
    if (scene && !el.dataset.cogMounted) { el.dataset.cogMounted = '1'; A.mount(el, scene); }
  });
})();
