/* ═══════════════════════════════════════════════
   QCOM FQ3 2026 PREVIEW — APP JS

   MODEL PHILOSOPHY
   ----------------
   Qualcomm carries the widest price-target dispersion
   of any mega-cap on the tape: $100 low against $314
   high, a range worth 131% of the share price, across
   36 analysts whose consensus rating is Hold.

   That dispersion is not noise. It is two incompatible
   views of the same company, and each resolves to a
   different pair of numbers:

       Implied price = FY2027 EPS × Forward P/E

   Set both. The interesting result is that the base
   case lands near today's price and the bear case
   lands near the published street low — which tells
   you what the market is actually discounting.
════════════════════════════════════════════════ */

'use strict';

// ── THEME TOGGLE ────────────────────────────────
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root   = document.documentElement;
  let theme = root.getAttribute('data-theme') || 'dark';

  function applyTheme(t) {
    theme = t;
    root.setAttribute('data-theme', t);
    if (toggle) {
      toggle.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} mode`);
      toggle.innerHTML = t === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  applyTheme(theme);
  toggle && toggle.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
})();

// ── NAV SCROLL SHADOW ───────────────────────────
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const obs = new IntersectionObserver(
    ([e]) => nav.classList.toggle('nav--scrolled', !e.isIntersecting),
    { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
  );
  const sentinel = document.getElementById('hero');
  if (sentinel) obs.observe(sentinel);
})();

/* ── ANCHOR FACTS (sourced; cited in body) ────── */
const CUR_PRICE   = 162.88;   // Close 2026-07-28, down 4.21% (StockAnalysis / Finviz)
const PT_LOW      = 100;      // Street low target
const PT_HIGH     = 314;      // Street high target
const PT_AVG      = 220.57;   // Average target, 36 analysts
const FY26_EPS    = 10.81;    // Street FY2026 EPS, down 10.18% YoY
const WK52_HIGH   = 259.92;
const WK52_LOW    = 121.99;

const SCENARIOS = {
  diversify: {
    label: 'The Bridge Gets Built',
    desc: 'The $40B FY2029 non-handset plan tracks: automotive holds ~50% growth toward its $10B target, the December hyperscaler shipment lands on time, and gross margin stabilises above 54% as the September price increase sticks. At 18× on $12.00 the stock re-rates toward the average street target. For orientation, Qualcomm\'s own FY2029 goal of more than $18 of non-GAAP EPS at a 17× multiple would be roughly $306 — which is essentially the $314 street high.',
    eps: 12.00, pe: 18.0, panelClass: 'scenario-bull',
  },
  managed: {
    label: 'The Managed Decline',
    desc: 'The street already models FY2026 revenue down 3.8% and EPS down 10.2%. This case says that is roughly right and the multiple holds. Notice where it lands: almost exactly at today\'s price. That is the useful finding — the market is pricing the consensus decline rather than a disaster, and the $220 average target is the outlier rather than the share price. China handsets bottom in FQ3 as management guided, automotive keeps compounding, and data centre stays a 2028 story.',
    eps: 10.81, pe: 15.0, panelClass: 'scenario-base',
  },
  cliff: {
    label: 'The Handset Cliff',
    desc: 'Apple goes to zero on schedule with nothing replacing it: FY2027 Apple revenue comes in under the ~$2B management endorsed, the China bottom slips past FQ3, gross margin extends its four-quarter slide, and data centre stays a loss-making $141M line. The multiple compresses to a cyclical-semis trough. At 12× on $8.50 this lands near $102 — essentially the published $100 street low. Someone on the tape is modelling exactly this.',
    eps: 8.50, pe: 12.0, panelClass: 'scenario-bear',
  },
};

// ── FORMAT HELPERS ──────────────────────────────
const fmt = {
  price:  (v) => `$${v.toFixed(2)}`,
  eps:    (v) => `$${v.toFixed(2)}`,
  mult:   (v) => `${v.toFixed(1)}×`,
  updown: (v) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`,
};

function animateValue(el, from, to, formatter, duration = 300) {
  if (!el) return;
  const start = performance.now();
  function step(ts) {
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = formatter(from + (to - from) * ease);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = formatter(to);
  }
  requestAnimationFrame(step);
}

// ── STATE ───────────────────────────────────────
let state = { eps: SCENARIOS.managed.eps, pe: SCENARIOS.managed.pe };
let prevPrice = SCENARIOS.managed.eps * SCENARIOS.managed.pe;

function render() {
  const { eps, pe } = state;
  const implied = eps * pe;
  const upside  = (implied / CUR_PRICE - 1) * 100;

  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

  setTxt('sc-eps-readout', fmt.eps(eps));
  setTxt('sc-pe-readout',  fmt.mult(pe));
  setTxt('f-eps',          fmt.eps(eps));
  setTxt('f-pe',           fmt.mult(pe));

  animateValue(document.getElementById('sc-implied'), prevPrice, implied, fmt.price);
  prevPrice = implied;

  const upEl = document.getElementById('sc-upside');
  if (upEl) {
    upEl.textContent = `${fmt.updown(upside)} vs. $${CUR_PRICE.toFixed(2)}`;
    upEl.classList.toggle('positive', upside >= 0);
    upEl.classList.toggle('negative', upside < 0);
  }

  // Where does this land inside the published street range?
  const pctile = ((implied - PT_LOW) / (PT_HIGH - PT_LOW)) * 100;
  setTxt('sc-percentile', `${Math.max(0, Math.min(100, pctile)).toFixed(0)}%`);
  setTxt('sc-percentile-note',
    implied < PT_LOW ? 'Below the published street low'
    : implied > PT_HIGH ? 'Above the published street high'
    : `Between the $100 low and the $314 high`);

  setTxt('sc-vs-avg', `${fmt.updown((implied / PT_AVG - 1) * 100)} vs. $${PT_AVG.toFixed(0)} average`);

  // Price bar — scale $90 to $330 to span the full target range
  const MIN = 90, MAX = 330;
  const pct = (v) => `${Math.max(0, Math.min(100, ((v - MIN) / (MAX - MIN)) * 100)).toFixed(1)}%`;

  const fill = document.getElementById('price-bar-fill');
  const cur  = document.getElementById('price-bar-current');
  const imp  = document.getElementById('price-bar-target');
  const avg  = document.getElementById('price-bar-intrinsic');

  if (fill) fill.style.width = pct(implied);
  if (cur)  cur.style.left   = pct(CUR_PRICE);
  if (imp) {
    imp.style.left = pct(implied);
    const t = imp.querySelector('.price-bar-tag');
    if (t) t.innerHTML = `${fmt.price(implied)}<br/>Scenario`;
  }
  if (avg) {
    avg.style.left = pct(PT_AVG);
    const t = avg.querySelector('.price-bar-tag');
    if (t) t.innerHTML = `$${PT_AVG.toFixed(0)}<br/>Street avg`;
  }
}

function applyScenario(key) {
  const sc = SCENARIOS[key];
  if (!sc) return;
  state = { eps: sc.eps, pe: sc.pe };

  const panel = document.getElementById('scenario-panel');
  if (panel) panel.className = `scenario-panel ${sc.panelClass}`;
  const n = document.getElementById('sc-name');
  const d = document.getElementById('sc-desc');
  if (n) n.textContent = sc.label;
  if (d) d.textContent = sc.desc;

  const e = document.getElementById('slider-eps');
  const p = document.getElementById('slider-pe');
  if (e) e.value = String(Math.round(sc.eps * 100));
  if (p) p.value = String(Math.round(sc.pe * 10));

  render();
}

// ── WIRING ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.scenario-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyScenario(btn.dataset.scenario);
    });
  });

  function markCustom() {
    const n = document.getElementById('sc-name');
    const d = document.getElementById('sc-desc');
    if (n) n.textContent = 'Your Assumptions';
    if (d) d.textContent = 'You have moved the model off the preset. Implied price is your FY2027 EPS times your forward multiple, plotted against the published street target range of $100 to $314 so you can see which camp your assumptions put you in.';
    const panel = document.getElementById('scenario-panel');
    if (panel) panel.className = 'scenario-panel';
    document.querySelectorAll('.scenario-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
  }

  const e = document.getElementById('slider-eps');
  const p = document.getElementById('slider-pe');
  if (e) e.addEventListener('input', () => { state.eps = Number(e.value) / 100; markCustom(); render(); });
  if (p) p.addEventListener('input', () => { state.pe  = Number(p.value) / 10;  markCustom(); render(); });

  applyScenario('managed');

  // ── GROSS MARGIN BARS ─────────────────────────
  // Scaled 52%–56% so the erosion is legible rather than flattened.
  document.querySelectorAll('.gm-bar').forEach(bar => {
    const v = parseFloat(bar.dataset.value);
    if (Number.isNaN(v)) return;
    bar.style.width = `${Math.max(0, Math.min(100, ((v - 52) / 4) * 100))}%`;
  });

  // ── DISPERSION MARKERS ────────────────────────
  document.querySelectorAll('.disp-marker').forEach(m => {
    const v = parseFloat(m.dataset.value);
    if (Number.isNaN(v)) return;
    m.style.left = `${Math.max(0, Math.min(100, ((v - 90) / 240) * 100))}%`;
  });

  // ── ENTRANCE ANIMATIONS ───────────────────────
  const items = document.querySelectorAll(
    '.kpi-card, .exec-bullet, .risk-card, .timeline-item, .versus-card, .event-item, .fed-card'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.animation = 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.animationDelay = `${(i % 6) * 60}ms`;
      io.observe(el);
    });
  }

  // ── ACTIVE NAV LINK ───────────────────────────
  const sections = ['hero','setup','dispersion','margin','guide','scenarios','watch','risks','sources'];
  const navLinks = document.querySelectorAll('.nav-links a');
  const so = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${en.target.id}` ? 'var(--color-text)' : '';
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) so.observe(el);
  });
});
