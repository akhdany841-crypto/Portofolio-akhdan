/* ============================================================
   AKHDAN MAHYA RAFIQ C.P — PORTFOLIO JS
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     LOADER — BREAKING 4TH WALL
  ============================================================ */
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPct = document.getElementById('loaderPct');
  const loaderSkip= document.getElementById('loaderSkip');
  const lines     = ['loaderLine1','loaderLine2','loaderLine3','loaderLine4'].map(id => document.getElementById(id));

  let pct = 0;
  let loaderDone = false;

  function finishLoader() {
    if (loaderDone) return;
    loaderDone = true;
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 700);
    // Kick off page after loader
    initPage();
  }

  // Show lines one by one
  setTimeout(() => lines[0] && lines[0].classList.add('visible'), 300);
  setTimeout(() => lines[1] && lines[1].classList.add('visible'), 900);
  setTimeout(() => lines[2] && lines[2].classList.add('visible'), 1500);

  // Progress bar
  const barInterval = setInterval(() => {
    pct += Math.random() * 4 + 1;
    if (pct >= 100) { pct = 100; clearInterval(barInterval); }
    loaderBar.style.width = pct + '%';
    loaderPct.textContent = Math.floor(pct) + '%';
    if (pct >= 100) {
      setTimeout(() => lines[3] && lines[3].classList.add('visible'), 200);
      setTimeout(finishLoader, 900);
    }
  }, 80);

  loaderSkip && loaderSkip.addEventListener('click', () => {
    pct = 100;
    loaderBar.style.width = '100%';
    loaderPct.textContent = '100%';
    clearInterval(barInterval);
    finishLoader();
  });

  /* ============================================================
     INIT PAGE (runs after loader)
  ============================================================ */
  function initPage() {
    initCursor();
    initNav();
    initMobileMenu();
    initReveal();
    initCounters();
    initSkillBars();
    initContactForm();
    initParallax();
    initGlitch();
    initDpPeek();
    initDpClimber();
    initDpDancer();
  }

  /* ============================================================
     CUSTOM CURSOR
  ============================================================ */
  function initCursor() {
    const cursor      = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursorTrail');
    if (!cursor) return;
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      setTimeout(() => {
        cursorTrail.style.left = mx + 'px';
        cursorTrail.style.top  = my + 'px';
      }, 80);
    });
    document.querySelectorAll('a, button, .skill-card, .project-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.6)';
        cursorTrail.style.borderColor = 'rgba(204,0,0,.9)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorTrail.style.borderColor = 'rgba(204,0,0,.5)';
      });
    });
  }

  /* ============================================================
     NAV
  ============================================================ */
  function initNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('id');
          navLinks.forEach(l => l.style.color = l.getAttribute('href') === '#' + id ? '#fff' : '');
        }
      });
    }, { threshold: 0.35 });
    sections.forEach(s => obs.observe(s));
  }

  /* ============================================================
     MOBILE MENU
  ============================================================ */
  function initMobileMenu() {
    const burger = document.getElementById('burger');
    const menu   = document.getElementById('mobileMenu');
    if (!burger) return;
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => menu.classList.remove('open')));
  }

  /* ============================================================
     REVEAL
  ============================================================ */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('in-view'), idx * 90);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ============================================================
     COUNTERS
  ============================================================ */
  function initCounters() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-num').forEach(el => obs.observe(el));
  }
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const start  = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    })(start);
  }

  /* ============================================================
     SKILL BARS
  ============================================================ */
  function initSkillBars() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => { e.target.style.width = e.target.dataset.width + '%'; }, 300);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.skill-fill').forEach(el => obs.observe(el));
  }

  /* ============================================================
     CONTACT FORM
  ============================================================ */
  function initContactForm() {
    const btn      = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');
    const name     = document.getElementById('nameInput');
    const email    = document.getElementById('emailInput');
    const msg      = document.getElementById('msgInput');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) { showFb('ISI SEMUA FIELD DULU BRO.', '#cc0000'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showFb('EMAIL NYA BENER GAK TUH?', '#cc0000'); return; }
      btn.disabled = true;
      btn.querySelector('.btn-text').textContent = 'SENDING...';
      setTimeout(() => {
        showFb('PESAN TERKIRIM! GUE BALES SECEPATNYA. ✓', '#00cc44');
        name.value = email.value = msg.value = '';
        btn.disabled = false;
        btn.querySelector('.btn-text').textContent = 'KIRIM PESAN';
      }, 1800);
    });
    function showFb(text, color) {
      feedback.textContent = text;
      feedback.style.color = color;
      feedback.style.opacity = 1;
      setTimeout(() => feedback.style.opacity = 0, 4000);
    }
  }

  /* ============================================================
     PARALLAX
  ============================================================ */
  function initParallax() {
    const bgText = document.querySelector('.hero-bg-text');
    if (!bgText) return;
    window.addEventListener('scroll', () => {
      bgText.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.3}px))`;
    }, { passive: true });
  }

  /* ============================================================
     GLITCH
  ============================================================ */
  function initGlitch() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glitch {
        0%  { transform:translate(0); filter:none; }
        20% { transform:translate(-3px,2px); filter:hue-rotate(90deg) brightness(1.4); }
        40% { transform:translate(3px,-2px); filter:hue-rotate(-90deg); }
        60% { transform:translate(-2px,3px); filter:invert(.1); }
        80% { transform:translate(2px,-1px); filter:none; }
        100%{ transform:translate(0); filter:none; }
      }`;
    document.head.appendChild(style);
    const name = document.querySelector('.hero-name');
    if (!name) return;
    name.addEventListener('mouseenter', () => { name.style.animation = 'glitch .4s steps(2) 1'; });
    name.addEventListener('animationend', () => { name.style.animation = ''; });
  }

  /* ============================================================
     DEADPOOL PEEK (ngintip dari bawah)
  ============================================================ */
  function initDpPeek() {
    const dp     = document.getElementById('dpPeek');
    const bubble = document.getElementById('dpBubble');
    if (!dp) return;

    const quotes = [
      "PSST... GUE LIAT LO DARI TADI 👀",
      "NAH INI PORTOFOLIO KEREN BANGET SIH",
      "HIRE DIA ATAU GUE YANG DATENG",
      "GUE BENERAN NGINTIP NIH",
      "SCROLL TERUS, JANGAN PERGI 😤",
      "YO, CONTACT DIA DONG!",
      "INI BUKAN DRILL. HIRE HIM.",
      "HEH. LIATIN TERUS. GUE SUKA.",
      "DEADPOOL APPROVED ✓",
      "JANGAN LUPA BINTANG 5 ⭐⭐⭐⭐⭐",
    ];

    function setQuote() { bubble.textContent = quotes[Math.floor(Math.random() * quotes.length)]; }
    setQuote();

    let timer = null;
    function peek() {
      dp.classList.add('peeking');
      setTimeout(() => dp.classList.add('peeking-more'), 800);
      timer = setTimeout(hide, 4500);
    }
    function hide() {
      dp.classList.remove('peeking', 'peeking-more');
    }

    setTimeout(peek, 3500);

    dp.addEventListener('mouseenter', () => { clearTimeout(timer); setQuote(); });
    dp.addEventListener('mouseleave', () => { timer = setTimeout(hide, 2200); });
    dp.addEventListener('click', () => {
      setQuote();
      hide();
      setTimeout(peek, Math.random() * 7000 + 4000);
    });

    // Re-peek on big scroll
    let lastY = 0;
    window.addEventListener('scroll', () => {
      if (Math.abs(window.scrollY - lastY) > 700) {
        clearTimeout(timer);
        hide();
        setTimeout(peek, 400);
        lastY = window.scrollY;
      }
    }, { passive: true });
  }

  /* ============================================================
     DEADPOOL CLIMBER (turun pake tali dari atas)
  ============================================================ */
  function initDpClimber() {
    const dp   = document.getElementById('dpClimber');
    const rope = document.getElementById('dpRope');
    if (!dp) return;

    let posY     = -160;   // current top px
    let speed    = 0.8;
    let dir      = 1;      // 1 = turun, -1 = naik
    let raf      = null;
    let running  = false;
    let paused   = false;

    dp.style.top = posY + 'px';

    function startDescent() {
      if (running) return;
      running = true;
      dir     = 1;
      posY    = -160;
      dp.style.top = posY + 'px';
      dp.style.opacity = '1';
      loop();
    }

    function loop() {
      if (paused) { raf = requestAnimationFrame(loop); return; }

      // Vary speed: slower going down, faster going back up
      speed = dir === 1
        ? 0.6 + Math.sin(posY * 0.03) * 0.3   // slow descent, slight wobble
        : 2.5;                                   // fast retract

      posY += dir * speed;
      dp.style.top = posY + 'px';

      // Reached 60% down viewport → pause 1.5s then retract
      if (posY > window.innerHeight * 0.6 && dir === 1) {
        dir = -1;
        setTimeout(() => {}, 1500); // just vibe
      }

      // Gone back above screen → stop, schedule next
      if (posY < -160 && dir === -1) {
        running = false;
        dp.style.opacity = '0';
        cancelAnimationFrame(raf);
        setTimeout(startDescent, Math.random() * 22000 + 18000);
        return;
      }

      raf = requestAnimationFrame(loop);
    }

    // Hover = pause
    dp.addEventListener('mouseenter', () => { paused = true; });
    dp.addEventListener('mouseleave', () => { paused = false; });

    // Click = quote
    dp.addEventListener('click', () => {
      const b    = document.getElementById('dpClimberBubble');
      const msgs = ['PERMISI NUMPANG!','HAMPIR NYAMPE!','JANGAN GOYANG TALINYA!','YALAH BRAY...'];
      if (b) {
        b.textContent = msgs[Math.floor(Math.random() * msgs.length)];
        b.style.opacity = '1'; b.style.transform = 'scale(1)';
        setTimeout(() => { b.style.opacity = '0'; b.style.transform = 'scale(.6)'; }, 2200);
      }
    });

    // First drop after 10s
    dp.style.opacity = '0';
    setTimeout(startDescent, 10000);
  }

  /* ============================================================
     DEADPOOL DANCER (joget di tengah bawah)
  ============================================================ */
  function initDpDancer() {
    const dancer   = document.getElementById('dpDancer');
    const trigger  = document.getElementById('dpDanceTrigger');
    const closeBtn = document.getElementById('dpDancerClose');
    const bubble   = document.getElementById('dpDancerBubble');
    if (!dancer || !trigger) return;

    const danceQuotes = [
      "AYOK GOYANG! 🕺",
      "SATU DUA TIGA EMPAT!",
      "CHIMICHANGAAA!! 🌯",
      "DEADPOOL DANCE BATTLE!",
      "GUE GAK PUNYA IZIN TAPI GUE GOYANG AJA",
      "KATANYA PORTOFOLIO SERIUS? 😂",
      "HIRE DIA SAMBIL JOGET!",
      "MAXIMUM EFFORT!! 💪",
    ];

    let dancing = false;
    let danceTimer = null;
    let autoTimer = null;

    function startDance() {
      dancer.classList.add('show', 'dancing');
      bubble.textContent = danceQuotes[Math.floor(Math.random() * danceQuotes.length)];
      dancing = true;
      // Auto stop after 8 seconds
      clearTimeout(danceTimer);
      danceTimer = setTimeout(stopDance, 8000);
    }

    function stopDance() {
      dancer.classList.remove('show', 'dancing');
      dancing = false;
      // Schedule random auto dance
      scheduleAutoDance();
    }

    function scheduleAutoDance() {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(() => {
        if (!dancing) startDance();
      }, Math.random() * 30000 + 25000);
    }

    trigger.addEventListener('click', () => {
      if (dancing) stopDance();
      else startDance();
    });

    closeBtn && closeBtn.addEventListener('click', () => {
      clearTimeout(danceTimer);
      stopDance();
    });

    // Random auto dance
    scheduleAutoDance();

    // Change quote mid dance
    dancer.addEventListener('click', () => {
      bubble.textContent = danceQuotes[Math.floor(Math.random() * danceQuotes.length)];
      bubble.style.animation = 'none';
      setTimeout(() => bubble.style.animation = '', 10);
    });
  }

  console.log('%cAKHDAN MAHYA RAFIQ C.P', 'color:#cc0000;font-size:2rem;font-weight:bold;');
  console.log('%cPortfolio © 2025 — Design by Suffocate', 'color:#6a6a6a;');

})();