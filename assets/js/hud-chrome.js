/**
 * Shared HUD theme switcher + UI click audio (Arwes sci-fi sounds).
 */
(function (global) {
  const CLICK_MP3_URL = "https://arwes.dev/assets/sounds/click.mp3";
  const ASSEMBLE_MP3_URL = "https://arwes.dev/assets/sounds/assemble.mp3";
  const TYPE_MP3_URL = "https://arwes.dev/assets/sounds/type.mp3";

  const HUD_THEMES = [
    "dark_cyan",
    "dark_magenta",
    "dark_violet",
    "dark_emerald",
    "dark_amber",
    "light_ice",
    "light_slate",
    "light_pearl",
    "light_lavender",
    "light_sand"
  ];

  const CLICK_POOL_SIZE = 6;
  const ASSEMBLE_POOL_SIZE = 3;
  const TYPE_POOL_SIZE = 4;

  let audioArmed = false;
  const clickPool = [];
  const assemblePool = [];
  const typePool = [];
  let poolIndex = 0;
  let assembleIndex = 0;
  let typeIndex = 0;

  function ensureClickPool() {
    if (clickPool.length) return;
    for (let i = 0; i < CLICK_POOL_SIZE; i += 1) {
      const a = new Audio(CLICK_MP3_URL);
      a.preload = "auto";
      clickPool.push(a);
    }
  }

  function ensureAssemblePool() {
    if (assemblePool.length) return;
    for (let i = 0; i < ASSEMBLE_POOL_SIZE; i += 1) {
      const a = new Audio(ASSEMBLE_MP3_URL);
      a.preload = "auto";
      assemblePool.push(a);
    }
  }

  function ensureTypePool() {
    if (typePool.length) return;
    for (let i = 0; i < TYPE_POOL_SIZE; i += 1) {
      const a = new Audio(TYPE_MP3_URL);
      a.preload = "auto";
      typePool.push(a);
    }
  }

  function playUiSound(volume = 1) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!audioArmed) return;
    ensureClickPool();
    const node = clickPool[poolIndex % clickPool.length];
    poolIndex += 1;
    const jitter = 0.88 + Math.random() * 0.12;
    const rate = 0.97 + Math.random() * 0.06;
    node.playbackRate = rate;
    node.volume = Math.min(1, Math.max(0, volume * jitter));
    node.currentTime = 0;
    node.play().catch(() => {});
  }

  function playAssembleSound(volume = 0.8) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!audioArmed) return;
    ensureAssemblePool();
    const node = assemblePool[assembleIndex % assemblePool.length];
    assembleIndex += 1;
    const jitter = 0.9 + Math.random() * 0.1;
    const rate = 0.95 + Math.random() * 0.08;
    node.playbackRate = rate;
    node.volume = Math.min(1, Math.max(0, volume * jitter));
    node.currentTime = 0;
    node.play().catch(() => {});
  }

  function playTypeSound(volume = 0.5) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!audioArmed) return;
    ensureTypePool();
    const node = typePool[typeIndex % typePool.length];
    typeIndex += 1;
    const jitter = 0.92 + Math.random() * 0.08;
    const rate = 0.98 + Math.random() * 0.04;
    node.playbackRate = rate;
    node.volume = Math.min(1, Math.max(0, volume * jitter));
    node.currentTime = 0;
    node.play().catch(() => {});
  }

  function volumeForClickTarget(target) {
    const interactive = target.closest("a, button, summary, [role='tab']");
    if (!interactive) return 1;
    if (interactive.matches("[role='tab']")) return 0.72;
    if (interactive.matches("a")) return 0.88;
    if (interactive.matches("summary")) return 0.8;
    return 0.92;
  }

  function initAudioArm() {
    const arm = () => {
      if (audioArmed) return;
      audioArmed = true;
      ensureClickPool();
      ensureAssemblePool();
      ensureTypePool();
    };
    document.addEventListener("pointerdown", arm, { once: true, passive: true });
  }

  function initUiClickSounds() {
    document.addEventListener(
      "click",
      (event) => {
        if (!audioArmed) return;
        const t = event.target;
        if (t.closest("select")) return;
        if (t.closest("a, button, summary, [role='tab']")) {
          playUiSound(volumeForClickTarget(t));
        }
      },
      true
    );
  }

  function initThemes() {
    const select = document.getElementById("themeSelect");
    if (!select) return;
    select.innerHTML = "";
    HUD_THEMES.forEach((theme) => {
      const opt = document.createElement("option");
      opt.value = theme;
      opt.textContent = theme.replace("_", " ");
      select.appendChild(opt);
    });
    const stored = localStorage.getItem("hud.theme");
    if (stored && HUD_THEMES.includes(stored)) {
      document.body.dataset.theme = stored;
    }
    if (!document.body.dataset.theme && HUD_THEMES[0]) {
      document.body.dataset.theme = HUD_THEMES[0];
    }
    select.value = document.body.dataset.theme;
    if (select.value !== document.body.dataset.theme) {
      document.body.dataset.theme = HUD_THEMES[0];
      select.value = HUD_THEMES[0];
    }
    select.addEventListener("change", () => {
      document.body.dataset.theme = select.value;
      localStorage.setItem("hud.theme", select.value);
      playUiSound(0.55);
    });
  }

  global.HudChrome = {
    CLICK_MP3_URL,
    ASSEMBLE_MP3_URL,
    TYPE_MP3_URL,
    HUD_THEMES,
    playUiSound,
    playAssembleSound,
    playTypeSound,
    initAudioArm,
    initUiClickSounds,
    initThemes
  };
})(typeof window !== "undefined" ? window : this);