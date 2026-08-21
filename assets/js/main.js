(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const isGitHub=location.hostname.endsWith('github.io');
  const basePath=isGitHub?'/purity-life-cleaning/':'/';
  const abs=p=>basePath+p.replace(/^\/+/, '');

  const svg={
    wa:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2.1 22l5-1.3A10 10 0 1 0 12 2Zm5.6 14.2c-.2.7-1.3 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.7.9c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2.1 1.3 2.4 1.4.3.1.5.1.7-.1.2-.2.7-.9.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.1.5.2.6.3v.1c0 .2 0 .7-.2 1.4Z"/></svg>',
    ph:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"/></svg>',
    home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8-1.5 1.7-.8-.7v9h-5.5v-5.5h-2.4V21H5.3v-9l-.8.7L3 11Z"/></svg>',
    srv:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Zm6.5 10 1 3.2 3.2 1.1-3.2 1.1-1 3.2-1-3.2-3.2-1.1 3.2-1.1 1-3.2Z"/></svg>',
    blog:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5V21h1.5l10.8-10.8-1.5-1.5L4 19.5ZM5 4h11v2H5V4Zm0 4h8v2H5V8Zm0 4h5v2H5v-2Z"/></svg>',
    user:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2-8 4.5V21h16v-2.5c0-2.5-3.6-4.5-8-4.5Z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.35" cy="6.7" r="1.25"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14.25 8.55h3.1l.47-3.64h-3.57V2.59c0-1.05.3-1.77 1.82-1.77h1.92V.12A25 25 0 0 0 15.2 0c-2.77 0-4.67 1.69-4.67 4.8v.11H7.39v3.64h3.14V24h3.72V8.55Z"/></svg>',
    tiktok:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.1 2.7 1.6 4.24 1.77v4.03a11.2 11.2 0 0 1-4.2-.97c-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75a7.25 7.25 0 0 1-1.35 3.94 7.35 7.35 0 0 1-5.91 3.21 7.2 7.2 0 0 1-4.08-1.03 7.34 7.34 0 0 1-3.65-5.72c-.02-.5-.03-1-.01-1.49a7.4 7.4 0 0 1 2.58-4.96 7.2 7.2 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.35 3.35 0 0 0-3.02.37 3.25 3.25 0 0 0-1.5 3.34c.24 1.64 1.82 3.02 3.5 2.87a3.32 3.32 0 0 0 3.18-2.67c.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/></svg>',
    snapchat:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.35c-3.35 0-5.25 2.56-5.25 5.71 0 .78.08 1.55.16 2.21-.35.56-1.04 1.36-2.18 1.63-.4.1-.68.44-.63.85.04.36.36.61.76.68.7.13 1.4.65 1.65 1.26.16.38.05.73-.28 1.02-.39.34-1 .57-1.67.72-.38.09-.56.53-.31.85.48.62 1.35.71 2.08.76.45.03.92.22 1.22.54.58.62 1.37.92 2.18.73.6-.14 1.18-.21 1.81-.21s1.21.07 1.81.21c.81.19 1.6-.11 2.18-.73.3-.32.77-.51 1.22-.54.73-.05 1.6-.14 2.08-.76.25-.32.07-.76-.31-.85-.67-.15-1.28-.38-1.67-.72-.33-.29-.44-.64-.28-1.02.25-.61.95-1.13 1.65-1.26.4-.07.72-.32.76-.68.05-.41-.23-.75-.63-.85-1.14-.27-1.83-1.07-2.18-1.63.08-.66.16-1.43.16-2.21 0-3.15-1.9-5.71-5.25-5.71Z"/></svg>'
  };

  function showContent(){
    $$('.reveal').forEach(el=>el.classList.add('is-visible'));
  }

  function offerTicker(){
    if($('.offer-ticker')) return;
    const message='🎒 المدارس رجعت… خلّوا النظافة علينا والبداية الحلوة عليكم! احتفلوا بعودة المدارس مع خصم 25% من بيورتي لايف على تنظيف الفلل والشقق والمطابخ والمفروشات والسجاد والمساجد والمطاعم. بداية أنظف وراحة أكبر وتوفير يستاهل — احجزوا الآن قبل انتهاء العرض — 0553382299';
    const ticker=document.createElement('aside');
    ticker.className='offer-ticker';
    ticker.setAttribute('aria-label','عرض العودة للمدارس من بيورتي لايف');
    ticker.innerHTML='<a class="offer-ticker__link" href="tel:+966553382299" aria-label="'+message+'"><span class="sr-only">'+message+'</span><span class="offer-ticker__viewport" aria-hidden="true"><span class="offer-ticker__track"><span class="offer-ticker__item"><b>عودة المدارس</b><span>'+message+'</span><em>اتصل الآن</em></span><span class="offer-ticker__item"><b>عودة المدارس</b><span>'+message+'</span><em>اتصل الآن</em></span></span></span></a>';
    document.body.prepend(ticker);
    document.documentElement.classList.add('has-offer-ticker');
  }

  function trackLead(type,destination){
    const eventName=type==='phone'?'phone_call_click':'whatsapp_click';
    const payload={
      event:'purity_lead',
      lead_type:type,
      event_name:eventName,
      destination:destination,
      page_location:location.href,
      page_title:document.title
    };
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(payload);
    if(typeof window.gtag==='function'){
      window.gtag('event',eventName,{event_category:'lead',value:1,currency:'SAR'});
      const config=window.PURITY_ADS_CONFIG||{};
      const sendTo=type==='phone'?config.phoneConversion:config.whatsappConversion;
      if(sendTo) window.gtag('event','conversion',{send_to:sendTo,value:1,currency:'SAR'});
    }
  }

  function leadTracking(){
    document.addEventListener('click',event=>{
      const link=event.target.closest&&event.target.closest('a[href]');
      if(!link) return;
      const href=link.getAttribute('href')||'';
      if(href.startsWith('tel:')) trackLead('phone',href);
      else if(href.includes('wa.me/')) trackLead('whatsapp',href);
    });
  }

  function polishIcons(){
    $$('.float-wa').forEach(a=>a.innerHTML=svg.wa);
    $$('.float-call').forEach(a=>a.innerHTML=svg.ph);
    const socialIcons={Instagram:svg.instagram,Facebook:svg.facebook,TikTok:svg.tiktok,Snapchat:svg.snapchat};
    $$('.socials a').forEach(a=>{
      const network=a.getAttribute('aria-label');
      if(!socialIcons[network]) return;
      a.innerHTML=socialIcons[network];
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.title=network;
    });
    $$('.bottom-nav').forEach(n=>{
      n.innerHTML='<a href="'+abs('services/')+'"><span>'+svg.srv+'</span><span>خدماتنا</span></a><a href="'+abs('blog/')+'"><span>'+svg.blog+'</span><span>المدونة</span></a><a class="is-home" href="'+basePath+'"><span>'+svg.home+'</span><span>الرئيسية</span></a><a href="'+abs('about/')+'"><span>'+svg.user+'</span><span>من نحن</span></a><a href="'+abs('contact/')+'"><span>'+svg.ph+'</span><span>تواصل</span></a>';
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
      const destination='https://wa.me/966553382299?text='+encodeURIComponent(msg);
      trackLead('whatsapp',destination);
      window.open(destination,'_blank','noopener,noreferrer');
    });
  }

  offerTicker();
  showContent();
  polishIcons();
  headerScroll();
  mobileMenu();
  faq();
  leadTracking();
  whatsappForm();
})();
