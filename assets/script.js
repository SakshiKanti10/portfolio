// Small interactive helpers: typewriter, accessible filters, persistent state
const roles = ['AI Engineer', 'Full-Stack Developer', 'Software Engineer'];
let ri = 0, ci = 0, deleting = false;
const typeEl = document.getElementById('type');
let tickActive = true;

function tick(){
  if(!typeEl || !tickActive) return;
  const full = roles[ri];
  if(!deleting){
    typeEl.textContent = full.slice(0, ci+1);
    ci++;
    if(ci===full.length){ deleting = true; setTimeout(tick, 900); return }
  } else {
    typeEl.textContent = full.slice(0, ci-1);
    ci--;
    if(ci===0){ deleting=false; ri=(ri+1)%roles.length }
  }
  setTimeout(tick, deleting?80:120);
}
tick();

// Pause typewriter when hero is off-screen to save cycles
if(window.IntersectionObserver && typeEl){
  const hero = document.querySelector('section');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=> tickActive = e.isIntersecting);
    if(tickActive) tick();
  },{threshold:0.1});
  if(hero) obs.observe(hero);
}

// Project filtering with accessibility + persistent selection
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
function applyFilter(f){
  document.querySelectorAll('.project-card').forEach(card=>{
    const tech = card.getAttribute('data-tech')||'';
    card.style.display = (f==='all' || tech.includes(f)) ? '' : 'none';
  });
  filterButtons.forEach(b=>{
    const val = b.getAttribute('data-filter');
    b.setAttribute('aria-pressed', val===f?'true':'false');
  });
  try{ localStorage.setItem('portfolio.filter', f) }catch(e){}
}

filterButtons.forEach(btn=>{
  btn.setAttribute('role','button');
  btn.setAttribute('tabindex','0');
  btn.setAttribute('aria-pressed','false');
  btn.addEventListener('click', ()=> applyFilter(btn.getAttribute('data-filter')));
  btn.addEventListener('keydown', (ev)=>{
    if(ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); btn.click(); }
  });
});

// restore last filter
const last = (function(){try{return localStorage.getItem('portfolio.filter')}catch(e){return null}})();
applyFilter(last||'all');

// Smooth nav link focus handling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      const target = document.querySelector(href);
      if(target){ target.focus({preventScroll:true}); }
    }
  });
});

// Contact form — opens mail client with prefilled values
function sendMail(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent('Portfolio contact from '+(name||email));
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:sakshiikantii@gmail.com?subject=${subject}&body=${body}`;
  return false;
}

// Modal for projects
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalLink = document.getElementById('modal-link');
const modalClose = document.getElementById('modal-close');
const modalClose2 = document.getElementById('modal-close-2');

function openModal(data){
  if(!modal) return;
  modalTitle.textContent = data.title || '';
  modalDesc.textContent = data.desc || '';
  modalTech.textContent = data.tech ? 'Tech: '+data.tech : '';
  modalLink.href = data.link || '#';
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  if(!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}

document.querySelectorAll('.view-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    openModal({
      title: btn.dataset.title,
      desc: btn.dataset.desc,
      tech: btn.dataset.tech,
      link: btn.dataset.link
    });
  });
});
if(modalClose) modalClose.addEventListener('click', closeModal);
if(modalClose2) modalClose2.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// Keep this file for future enhancements. The current portfolio page is fully styled and functional without relying on this script.
console.log('Portfolio script loaded. No active features at the moment.');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(t){
  if(t==='dark') document.body.classList.add('dark'), localStorage.setItem('portfolio.theme','dark');
  else document.body.classList.remove('dark'), localStorage.setItem('portfolio.theme','light');
}
const savedTheme = (function(){try{return localStorage.getItem('portfolio.theme')}catch(e){return null}})();
applyTheme(savedTheme||'light');
if(themeToggle) themeToggle.addEventListener('click', ()=> applyTheme(document.body.classList.contains('dark')?'light':'dark'));

// Enhanced contact form: submit to Formspree if FORM_ENDPOINT set in window.FORM_ENDPOINT
const contactForm = document.querySelector('form[onsubmit^="return sendMail"]');
if(contactForm){
  contactForm.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const endpoint = window.FORM_ENDPOINT || null;
    if(endpoint && endpoint.startsWith('https://')){
      try{
        const res = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,message})});
        if(res.ok) alert('Message sent — thank you!'); else alert('Submission failed — using email fallback');
      }catch(e){ alert('Submission failed — using email fallback') }
    }
    // fallback to mailto
    const subject = encodeURIComponent('Portfolio contact from '+(name||email));
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:sakshiikantii@gmail.com?subject=${subject}&body=${body}`;
  });
}

