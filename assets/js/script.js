const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('.page-loader')?.classList.add('loaded'), 450);
});

const header = document.querySelector('.site-header');
const progressBar = document.querySelector('.scroll-progress span');
const updateScrollUI = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  header?.classList.toggle('scrolled', window.scrollY > 12);
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.program-panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    panels.forEach((panel) => panel.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.tab)?.classList.add('active');
  });
});

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    if (!counter.dataset.target) {
      observer.unobserve(counter);
      return;
    }
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased).toLocaleString('id-ID')}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(counter);
  });
}, { threshold: 0.5 });
counters.forEach((counter) => counterObserver.observe(counter));

const testimonials = [...document.querySelectorAll('.testimonial')];
let testimonialIndex = 0;
const showTestimonial = (index) => {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === testimonialIndex));
};
document.querySelector('.slider-button.next')?.addEventListener('click', () => showTestimonial(testimonialIndex + 1));
document.querySelector('.slider-button.prev')?.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
window.setInterval(() => showTestimonial(testimonialIndex + 1), 7000);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const selector = anchor.getAttribute('href');
    if (!selector || selector === '#') return;
    const target = document.querySelector(selector);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const visual = document.querySelector('.hero-visual');
if (visual && window.matchMedia('(pointer: fine)').matches) {
  visual.addEventListener('pointermove', (event) => {
    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    visual.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
  });
  visual.addEventListener('pointerleave', () => { visual.style.transform = ''; });
}

document.querySelectorAll('.button-primary, .button-light, .nav-button').forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const bounds = button.getBoundingClientRect();
    button.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    button.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  });
});
