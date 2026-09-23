(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const KEY = 'tmh3_remember';

  function loadBrandIcons() {
    const social = $('.social');
    if (!social) return;
    social.innerHTML = `
      <a aria-label="Facebook" title="Facebook" href="https://www.facebook.com/" target="_blank" rel="noopener"><i class="fa-brands fa-facebook-f"></i></a>
      <a aria-label="Instagram" title="Instagram" href="https://www.instagram.com/" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i></a>
      <a aria-label="X / Twitter" title="X / Twitter" href="https://x.com/" target="_blank" rel="noopener"><i class="fa-brands fa-x-twitter"></i></a>
      <a aria-label="WhatsApp" title="WhatsApp" href="https://web.whatsapp.com/" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
      <a aria-label="YouTube" title="YouTube" href="https://www.youtube.com/" target="_blank" rel="noopener"><i class="fa-brands fa-youtube"></i></a>
      <a aria-label="LinkedIn" title="LinkedIn" href="https://www.linkedin.com/" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin-in"></i></a>`;
  }

  function makeFlag() {
    const old = $('.flagIndia');
    if (!old) return;
    old.innerHTML = `<svg viewBox="0 0 24 16" aria-label="India flag" role="img"><rect width="24" height="16" rx="1" fill="#fff"/><rect width="24" height="5.33" fill="#ff9933"/><rect y="10.67" width="24" height="5.33" fill="#138808"/><circle cx="12" cy="8" r="2.1" fill="none" stroke="#000080" stroke-width=".55"/><path d="M12 5.7v4.6M9.7 8h4.6M10.4 6.4l3.2 3.2M13.6 6.4l-3.2 3.2" stroke="#000080" stroke-width=".28"/></svg>`;
  }

  function installRememberMe() {
    const pass = $('#pass');
    if (!pass || $('#rememberMe')) return;
    const row = document.createElement('label');
    row.id = 'rememberRow';
    row.innerHTML = `<input id="rememberMe" type="checkbox"><span>Remember me on this device</span>`;
    pass.insertAdjacentElement('afterend', row);
    const saved = localStorage.getItem(KEY) === '1';
    $('#rememberMe').checked = saved;
    if (saved) {
      const last = localStorage.getItem('tmh3_last_member');
      if (last && $('#who').querySelector(`option[value="${last}"]`)) $('#who').value = last;
    }
  }

  function firstMemberFirst() {
    if (!window.members || !window.cur) return;
    const grid = $('#profilesGrid');
    if (!grid) return;
    const current = window.members.find(x => x.id === window.cur);
    if (!current) return;
    const card = [...grid.children].find(el => el.querySelector('h4')?.textContent === current.name);
    if (card && grid.firstElementChild !== card) grid.prepend(card);
  }

  function patchDeleteButtons(root = document) {
    root.querySelectorAll('button').forEach(b => {
      const t = b.textContent.trim().toLowerCase();
      if (t.includes('delete') && !b.querySelector('i')) {
        b.innerHTML = '<i class="fa-regular fa-trash-can" aria-hidden="true"></i><span class="deleteLabel"> Delete</span>';
        b.setAttribute('aria-label', 'Delete');
        b.title = 'Delete';
      }
    });
  }

  function improveLogin() {
    const card = $('.loginCard');
    if (!card) return;
    card.classList.add('premiumLogin');
    const title = card.querySelector('h1');
    if (title) title.innerHTML = `Welcome back<span class="titleDot">.</span>`;
    const small = card.querySelector('small');
    if (small) small.textContent = 'A private digital space for Subramaniam, Pradap and Kalaivani.';
  }

  function closeMenuOnNavigation() {
    $$('#menu a').forEach(a => a.addEventListener('click', () => $('#menu')?.classList.remove('open')));
  }

  function loginRememberHook() {
    const signin = $('#signin');
    if (!signin || signin.dataset.rememberHook) return;
    signin.dataset.rememberHook = '1';
    signin.addEventListener('click', () => {
      setTimeout(() => {
        const member = $('#who')?.value;
        if ($('#rememberMe')?.checked && member) {
          localStorage.setItem(KEY, '1');
          localStorage.setItem('tmh3_last_member', member);
        } else {
          localStorage.removeItem(KEY);
          localStorage.removeItem('tmh3_last_member');
        }
      }, 50);
    });
  }

  function watchRender() {
    const grid = $('#profilesGrid');
    if (grid) new MutationObserver(() => firstMemberFirst()).observe(grid, {childList:true});
    const obs = new MutationObserver(muts => muts.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType === 1) patchDeleteButtons(n);
    })));
    obs.observe(document.body, {childList:true,subtree:true});
  }

  function enhanceCampfire() {
    const hero = $('.heroLogo');
    if (!hero) return;
    hero.innerHTML = `<div class="premiumCampfire" aria-label="Three Minds digital campfire"><div class="skyGlow"></div><div class="stars">✦　·　✦　　 ·　✦<br>　·　　 ✦　　·<br>✦　　·　　　✦</div><div class="bigMoon"></div><div class="mountain m1"></div><div class="mountain m2"></div><div class="ground"></div><div class="fireGlow"></div><div class="logs"><span></span><span></span></div><div class="flame"><i></i><b></b></div><div class="campfireText"><strong>Our digital campfire</strong><span>Where memories glow and three minds grow.</span></div></div>`;
    const p = $('.hero>div:first-child>p:not(.eyebrow)');
    if (p) p.textContent = 'A private, beautifully crafted space where three friends keep memories, share moments and grow their skills together.';
  }

  function init() {
    installRememberMe();
    improveLogin();
    loadBrandIcons();
    makeFlag();
    enhanceCampfire();
    closeMenuOnNavigation();
    loginRememberHook();
    patchDeleteButtons();
    firstMemberFirst();
    watchRender();
    const app = $('#app');
    if (app) new MutationObserver(() => {
      loadBrandIcons(); makeFlag(); firstMemberFirst(); patchDeleteButtons(); loginRememberHook();
    }).observe(app, {childList:true,subtree:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
