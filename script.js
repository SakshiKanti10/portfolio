const header = document.querySelector('nav');
const links = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const mobileMenu = document.getElementById('mobile-menu');
const menuToggle = document.getElementById('menu-toggle');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const revealElements = document.querySelectorAll('.reveal');
const skillFills = document.querySelectorAll('.progress-fill');
const counterItems = document.querySelectorAll('[data-target]');
const typeText = document.getElementById('type-text');
const phrases = ['web applications', 'AI-powered solutions', 'scalable platforms', 'user experiences'];
let phraseIndex = 0;
let charIndex = 0;
let typingForward = true;
let isDeleting = false;

const hero = document.querySelector('.hero');
const orbElements = document.querySelectorAll('.orb');
const cards = document.querySelectorAll('.project-card');

function updateHeader() {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

function setActiveLink() {
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href='#${id}']`);
    if (top >= -100 && top <= window.innerHeight / 2) {
      links.forEach((item) => item.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typeText.textContent = current.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    typeText.textContent = current.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 60 : 90);
}

let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counterItems.forEach((item) => {
    const target = +item.dataset.target;
    const duration = 1800;
    const increment = target / (duration / 30);
    let current = 0;
    const updateCount = () => {
      current += increment;
      if (current < target) {
        item.textContent = `${Math.ceil(current)}+`;
        requestAnimationFrame(updateCount);
      } else {
        item.textContent = `${target}+`;
      }
    };
    updateCount();
  });
}

function animateSkillBars() {
  skillFills.forEach((fill) => {
    const width = fill.dataset.width;
    fill.style.width = width;
  });
}

function createObserver() {
  const options = { threshold: 0.16 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.closest('.skills')) {
          animateSkillBars();
        }
        if (entry.target.closest('.hero')) {
          animateCounters();
        }
      }
    });
  }, options);

  revealElements.forEach((element) => observer.observe(element));
}

function handleCursor(e) {
  const x = e.clientX;
  const y = e.clientY;
  cursorDot.style.opacity = '1';
  cursorRing.style.opacity = '1';
  cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  cursorRing.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function hideCursor() {
  cursorDot.style.opacity = '0';
  cursorRing.style.opacity = '0';
}

function attachCursorHover() {
  document.querySelectorAll('a, button, .btn-cta, .social-pill, .project-action, .contact-pill, .btn-github').forEach((item) => {
    item.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
  });
}

function handleOrbs(e) {
  const x = (window.innerWidth / 2 - e.clientX) / 32;
  const y = (window.innerHeight / 2 - e.clientY) / 32;
  orbElements.forEach((orb, index) => {
    const factor = index + 1;
    orb.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
  });
}

function cardTilt(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const midX = rect.width / 2;
  const midY = rect.height / 2;
  const rotateY = ((x - midX) / midX) * 6;
  const rotateX = ((midY - y) / midY) * 6;
  card.style.transform = `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-6px)`;
}

function resetCard(event) {
  event.currentTarget.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
}

window.addEventListener('scroll', () => {
  updateHeader();
  setActiveLink();
});

window.addEventListener('mousemove', (event) => {
  if (window.innerWidth > 900) {
    handleCursor(event);
    handleOrbs(event);
  }
});

window.addEventListener('mouseleave', hideCursor);

window.addEventListener('DOMContentLoaded', () => {
  typeLoop();
  createObserver();
  attachCursorHover();
  links.forEach((link) => link.addEventListener('click', closeMobileMenu));
  menuToggle.addEventListener('click', toggleMobileMenu);
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', cardTilt);
    card.addEventListener('mouseleave', resetCard);
  });
  document.addEventListener('touchstart', hideCursor, { passive: true });
});
