// UI: nav toggle, year, mock preview image crossfade & auto-advance, label filled handling
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', ()=> {
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // Footer year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Preview setup: images already in markup, map titles & auto-cycle
  const previewItems = [
    { title: 'Kofi Station — Coffee Management' , key: '0' },
    { title: 'Little Earthlings — Educational App', key: '1' }
  ];
  let previewIndex = 0;
  const mockImages = document.querySelectorAll('.mock-img');
  const mockTitleEl = document.querySelector('.mock-title');
  const dots = document.querySelectorAll('.dot');

  // Initialize: ensure only the first image is active
  function showPreview(i){
    if(!mockImages.length) return;
    mockImages.forEach(img => {
      const k = img.getAttribute('data-key');
      img.classList.toggle('active', Number(k) === i);
    });
    // update title (always visible)
    if(mockTitleEl) mockTitleEl.textContent = previewItems[i].title || '';
    // dots
    dots.forEach(d => d.classList.toggle('active', Number(d.getAttribute('data-key')) === i));
    previewIndex = i;
  }

  // Dot click
  dots.forEach(d => d.addEventListener('click', () => {
    const key = Number(d.getAttribute('data-key'));
    if(Number.isFinite(key)) showPreview(key);
    resetAuto();
  }));

  // Auto-advance
  let autoTimer = null;
  function nextPreview(){ showPreview((previewIndex + 1) % previewItems.length); }
  function startAuto(){ stopAuto(); autoTimer = setInterval(nextPreview, 5000); }
  function stopAuto(){ if(autoTimer) clearInterval(autoTimer); autoTimer = null; }
  function resetAuto(){ stopAuto(); startAuto(); }

  if(mockImages.length){
    // hide extra dots if any (safe-guard)
    dots.forEach((d, idx) => { d.style.display = idx < previewItems.length ? 'inline-block' : 'none'; });
    showPreview(0);
    startAuto();

    const mockScreen = document.querySelector('.mock-screen');
    mockScreen && mockScreen.addEventListener('mouseenter', stopAuto);
    mockScreen && mockScreen.addEventListener('mouseleave', startAuto);
  }

  // Contact form demo handler + label filled toggles
  const form = document.getElementById('contact-form');
  if(form) form.addEventListener('submit', (e)=> {
    e.preventDefault();
    alert('Thanks! This is a demo form. Replace handler to send messages.');
    form.reset();
    document.querySelectorAll('.contact-form label').forEach(l => l.classList.remove('filled'));
  });

  // Floating labels: add .filled when input has value
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  inputs.forEach(input => {
    const parent = input.closest('label');
    if(parent && input.value.trim() !== '') parent.classList.add('filled');
    input.addEventListener('input', () => {
      if(!parent) return;
      input.value.trim() !== '' ? parent.classList.add('filled') : parent.classList.remove('filled');
    });
    input.addEventListener('focus', () => parent && parent.classList.add('filled'));
    input.addEventListener('blur', () => {
      if(!parent) return;
      if(input.value.trim() === '') parent.classList.remove('filled');
    });
  });

});