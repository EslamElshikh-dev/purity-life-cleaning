(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  const svg={
    wa:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2.1 22l5-1.3A10 10 0 1 0 12 2Zm5.6 14.2c-.2.7-1.3 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.7.9c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2.1 1.3 2.4 1.4.3.1.5.1.7-.1.2-.2.7-.9.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.1.5.2.6.3v.1c0 .2 0 .7-.2 1.4Z"/></svg>',
    ph:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"/></svg>',
    home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8-1.5 1.7-.8-.7v9h-5.5v-5.5h-2.4V21H5.3v-9l-.8.7L3 11Z"/></svg>',
    srv:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Zm6.5 10 1 3.2 3.2 1.1-3.2 1.1-1 3.2-1-3.2-3.2-1.1 3.2-1.1 1-3.2Z"/></svg>',
    blog:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5V21h1.5l10.8-10.8-1.5-1.5L4 19.5ZM5 4h11v2H5V4Zm0 4h8v2H5V8Zm0 4h5v2H5v-2Z"/></svg>',
    user:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2-8 4.5V21h16v-2.5c0-2.5-3.6-4.5-8-4.5Z"/></svg>'
  };

  function loadCssFallback(){
    document.documentElement.style.colorScheme='light only';
    if(!document.querySelector('meta[name="color-scheme"]')){
      const m=document.createElement('meta');
      m.name='color-scheme';
      m.content='light only';
      document.head.appendChild(m);
    }
    if(!document.querySelector('link[href*="final-mobile-fixes.css"]')){
      const l=document.createElement('link');
      l.rel='stylesheet';
      l.href='assets/css/final-mobile-fixes.css?v=runtime-stable-1';
      document.head.appendChild(l);
    }
  }

  function polishIcons(){
    $$('.float-wa').forEach(a=>a.innerHTML=svg.wa);
    $$('.float-call').forEach(a=>a.innerHTML=svg.ph);
    $$('.bottom-nav').forEach(n=>{
      n.innerHTML='<a href="services/"><span>'+svg.srv+'</span><span>خدماتنا</span></a><a href="blog/"><span>'+svg.blog+'</span><span>المدونة</span></a><a class="is-home" href="./"><span>'+svg.home+'</span><span>الرئيسية</span></a><a href="about/"><span>'+svg.user+'</span><span>من نحن</span></a><a href="contact/"><span>'+svg.ph+'</span><span>تواصل</span></a>';
    });
  }

  function headerScroll(){
    const header=$('.site-header');
    const set=()=>{ if(header) header.classList.toggle('is-scrolled', window.scrollY>24); };
    set();
    window.addEventListener('scroll', set, {passive:true});
  }

  function mobileMenu(){
    const toggle=$('.menu-toggle'), panel=$('.mobile-panel'), serviceBtn=$('[data-mobile-services]'), serviceSub=$('.mobile-sub');
    if(toggle) toggle.addEventListener('click',()=>{const open=document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',String(open));});
    if(panel) panel.addEventListener('click',e=>{if(e.target===panel){document.body.classList.remove('nav-open');if(toggle)toggle.setAttribute('aria-expanded','false');}});
    if(serviceBtn&&serviceSub) serviceBtn.addEventListener('click',()=>{const open=serviceSub.classList.toggle('open');serviceBtn.setAttribute('aria-expanded',String(open));});
  }

  function faq(){
    $$('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item'), answer=item&&item.querySelector('.faq-a');
      if(!item||!answer)return;
      const open=item.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(open));
      answer.style.maxHeight=open?answer.scrollHeight+'px':'0px';
    }));
  }

  function whatsappForm(){
    const form=$('[data-whatsapp-form]');
    if(!form) return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const d=new FormData(form);
      const msg=['طلب خدمة جديد من موقع بيورتي لايف','الاسم: '+(d.get('name')||''),'الجوال: '+(d.get('phone')||''),'الخدمة: '+(d.get('service')||''),'المدينة/الحي: '+(d.get('district')||''),'الموعد المناسب: '+(d.get('date')||''),'التفاصيل: '+(d.get('details')||'')].join('\n');
      window.open('https://wa.me/966553382299?text='+encodeURIComponent(msg),'_blank','noopener');
    });
  }

  loadCssFallback();
  polishIcons();
  headerScroll();
  mobileMenu();
  faq();
  whatsappForm();
})();
