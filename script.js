/* =========================================
   TERMINAL INTRO
========================================= */
const lines = ['t1','t2','t3','t4','t5','t6'];
let lineIndex = 0;

function showNextLine() {
  if (lineIndex < lines.length) {
    const el = document.getElementById(lines[lineIndex]);
    if (el) el.classList.add('visible');
    lineIndex++;
    const delay = lineIndex === lines.length ? 700 : 350;
    setTimeout(showNextLine, delay);
  } else {
    // Fade out terminal, show site
    setTimeout(() => {
      const terminal = document.getElementById('terminal');
      terminal.classList.add('fade-out');
      setTimeout(() => {
        terminal.style.display = 'none';
        document.getElementById('main-nav').classList.add('visible');
        document.querySelector('.hero').classList.add('visible');
        initTyping();
        initScrollReveal();
      }, 600);
    }, 400);
  }
}

showNextLine();

/* =========================================
   TYPING EFFECT
========================================= */
function initTyping() {
  const roles = ['Backend Developer', 'AI / ML Enthusiast', 'Problem Solver', 'Python Engineer'];
  let i = 0, j = 0;
  const el = document.querySelector('.typing');
  if (!el) return;

  function type() {
    if (j < roles[i].length) {
      el.textContent += roles[i][j++];
      setTimeout(type, 75);
    } else {
      setTimeout(erase, 1400);
    }
  }

  function erase() {
    if (j > 0) {
      el.textContent = roles[i].substring(0, --j);
      setTimeout(erase, 40);
    } else {
      i = (i + 1) % roles.length;
      setTimeout(type, 350);
    }
  }

  type();
}

/* =========================================
   SCROLL REVEAL
========================================= */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-title, .section-label, .about-text, .skills-grid, ' +
    '.timeline-item, .project-featured, .mini-card, .contact-item, ' +
    '.hero-stats, .about-badges'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* =========================================
   ACTIVE NAV ON SCROLL
========================================= */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.links a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
});

/* =========================================
   SMOOTH SCROLL FOR NAV LINKS
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
