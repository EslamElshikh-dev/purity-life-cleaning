(function(){
  const header=document.querySelector('.site-header');
  const toggle=document.querySelector('.menu-toggle');
  const panel=document.querySelector('.mobile-panel');
  const serviceBtn=document.querySelector('[data-mobile-services]');
  const serviceSub=document.querySelector('.mobile-sub');

  const getSiteBase=()=>{
    const isGithub=location.hostname.toLowerCase().endsWith('github.io');
    return isGithub ? location.origin + '/purity-life-cleaning' : location.origin;
  };
  const getCanonicalUrl=()=>{
    const base=getSiteBase();
    let path=location.pathname;
    if(location.hostname.toLowerCase().endsWith('github.io')) path=path.replace(/^\/purity-life-cleaning/,'');
    path=path.replace(/index\.html$/,'');
    if(!path.endsWith('/')) path+='/';
    return base + path;
  };
  const normalizeSeoUrls=()=>{
    const siteBase=getSiteBase();
    const pageUrl=getCanonicalUrl();
    document.querySelectorAll('link[rel="canonical"]').forEach(el=>el.href=pageUrl);
    document.querySelectorAll('meta[property="og:url"]').forEach(el=>el.content=pageUrl);
    document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]').forEach(el=>{el.content=el.content.replace('https://YOUR-DOMAIN.com',siteBase);});
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script=>{
      try{
        const data=JSON.parse(script.textContent.replace(/https:\/\/YOUR-DOMAIN\.com/g,siteBase));
        const graph=Array.isArray(data['@graph']) ? data['@graph'] : [data];
        graph.forEach(item=>{
          if(Array.isArray(item['@type']) && item['@type'].includes('CleaningService')) item['@type']='CleaningService';
          if((item['@type']==='CleaningService' || item['@type']==='LocalBusiness') && !item.address){
            item.address={'@type':'PostalAddress',addressLocality:'جدة',addressRegion:'مكة المكرمة',addressCountry:'SA'};
          }
        });
        script.textContent=JSON.stringify(data);
      }catch(e){
        script.textContent=script.textContent.replace(/https:\/\/YOUR-DOMAIN\.com/g,siteBase).replace('"@type":["LocalBusiness","CleaningService"]','"@type":"CleaningService"');
      }
    });
  };
  normalizeSeoUrls();

  const iconStyle=document.createElement('style');
  iconStyle.textContent=`
    .float-actions{inset-inline-start:18px!important;bottom:calc(88px + var(--safe-bottom))!important;gap:13px!important;}
    .float-btn{width:58px!important;height:58px!important;border-radius:50%!important;font-size:0!important;display:grid!important;place-items:center!important;border:2px solid rgba(255,255,255,.95)!important;overflow:visible!important;box-shadow:0 18px 38px rgba(16,32,51,.24)!important;transition:transform .22s ease,box-shadow .22s ease,filter .22s ease!important;animation:purityFloatBreath 4.4s ease-in-out infinite!important;}
    .float-btn svg{width:29px;height:29px;display:block;fill:#fff;position:relative;z-index:2;}
    .float-wa{background:#25D366!important;}
    .float-call{background:linear-gradient(135deg,#0B5FA5,#39B5FF)!important;animation-delay:.55s!important;}
    .float-btn:hover{transform:translateY(-5px) scale(1.035)!important;box-shadow:0 24px 48px rgba(16,32,51,.30)!important;filter:saturate(1.08)!important;}
    .float-btn:focus-visible{outline:3px solid rgba(57,181,255,.45)!important;outline-offset:5px!important;}
    .float-btn::after{content:''!important;position:absolute!important;inset:-8px!important;border-radius:inherit!important;z-index:-1!important;opacity:.22!important;animation:purityRingPulse 2.8s ease-out infinite!important;}
    .float-wa::after{background:#25D366!important;}
    .float-call::after{background:#0B5FA5!important;}
    .socials a{width:42px!important;height:42px!important;border-radius:15px!important;font-size:0!important;display:grid!important;place-items:center!important;overflow:hidden!important;box-shadow:0 10px 24px rgba(0,0,0,.12)!important;transition:transform .22s ease,box-shadow .22s ease,filter .22s ease!important;}
    .socials a svg{width:20px;height:20px;display:block;fill:currentColor;}
    .socials a:hover{transform:translateY(-3px)!important;box-shadow:0 16px 32px rgba(0,0,0,.18)!important;filter:saturate(1.08)!important;}
    .socials a[aria-label="Instagram"]{background:radial-gradient(circle at 30% 110%,#ffdb57 0 18%,#ff543e 38%,#c837ab 62%,#405de6 100%)!important;color:#fff!important;}
    .socials a[aria-label="Facebook"]{background:#1877F2!important;color:#fff!important;}
    .socials a[aria-label="TikTok"]{background:#111!important;color:#fff!important;}
    .socials a[aria-label="Snapchat"]{background:#FFFC00!important;color:#111!important;}
    @keyframes purityRingPulse{0%{transform:scale(.86);opacity:.26}72%{transform:scale(1.42);opacity:0}100%{transform:scale(1.42);opacity:0}}
    @keyframes purityFloatBreath{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
    @media(max-width:720px){.float-actions{bottom:calc(92px + var(--safe-bottom))!important;inset-inline-start:14px!important}.float-btn{width:52px!important;height:52px!important}.float-btn svg{width:26px;height:26px}}
    @media(prefers-reduced-motion:reduce){.float-btn,.float-btn::after{animation:none!important}}
  `;
  document.head.appendChild(iconStyle);

  const ICONS={
    whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.96L2 22l5.26-1.38a9.86 9.86 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2Zm5.82 14.17c-.24.67-1.4 1.28-1.94 1.36-.5.07-1.12.1-1.8-.11-.42-.13-.95-.31-1.64-.61-2.89-1.25-4.77-4.17-4.91-4.36-.14-.19-1.18-1.57-1.18-2.99s.75-2.12 1.01-2.41c.26-.29.57-.36.76-.36h.55c.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.44.29.14.46.12.63-.07.19-.22.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.93.29.14.48.22.55.34.07.12.07.7-.17 1.37Z"/></svg>',
    phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16.5 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5Zm5.25-3.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.89h-2.32v6.99A10 10 0 0 0 22 12Z"/></svg>',
    tiktok:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 5.82a6.16 6.16 0 0 0 3.62 1.16v3.2a9.25 9.25 0 0 1-3.62-.76v5.2c0 3.56-2.9 6.46-6.46 6.46A6.46 6.46 0 0 1 7.6 8.69c.6 0 1.18.08 1.73.24v3.38a3.18 3.18 0 1 0 2.22 3.03V2.92h3.15c.2 1.17.85 2.2 1.9 2.9Z"/></svg>',
    snapchat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.3c3.1 0 5.1 2.08 5.1 5.2v2.25c.3.16.77.28 1.18.1.65-.28 1.23-.18 1.45.29.24.5-.1 1.1-1.05 1.48-.38.15-.8.28-1.23.38.25.9.96 1.76 2.03 2.42.45.28.96.5 1.47.65.56.17.8.54.7.94-.11.46-.62.78-1.44.9-.36.06-.7.08-1.02.08-.25.43-.73.74-1.44.92-.5.13-1.04.15-1.55.1-.7.8-1.74 1.65-3.2 1.65-.67 0-1.18-.13-1.7-.26-.45-.12-.87-.22-1.3-.22s-.85.1-1.3.22c-.52.13-1.03.26-1.7.26-1.46 0-2.5-.85-3.2-1.65-.51.05-1.05.03-1.55-.1-.71-.18-1.19-.49-1.44-.92-.32 0-.66-.02-1.02-.08-.82-.12-1.33-.44-1.44-.9-.1-.4.14-.77.7-.94.51-.15 1.02-.37 1.47-.65 1.07-.66 1.78-1.52 2.03-2.42-.43-.1-.85-.23-1.23-.38-.95-.38-1.29-.98-1.05-1.48.22-.47.8-.57 1.45-.29.41.18.88.06 1.18-.1V7.5C6.9 4.38 8.9 2.3 12 2.3Z"/></svg>'
  };
  const setIcon=(selector,svg)=>document.querySelectorAll(selector).forEach(el=>{el.innerHTML=svg;el.setAttribute('role','button');});
  setIcon('.float-wa',ICONS.whatsapp);
  setIcon('.float-call',ICONS.phone);
  setIcon('.socials a[aria-label="Instagram"]',ICONS.instagram);
  setIcon('.socials a[aria-label="Facebook"]',ICONS.facebook);
  setIcon('.socials a[aria-label="TikTok"]',ICONS.tiktok);
  setIcon('.socials a[aria-label="Snapchat"]',ICONS.snapchat);

  const onScroll=()=>{ if(header){ header.classList.toggle('is-scrolled', window.scrollY>24); } };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  if(toggle){ toggle.addEventListener('click',()=>{document.body.classList.toggle('nav-open'); toggle.setAttribute('aria-expanded',document.body.classList.contains('nav-open'));}); }
  if(panel){ panel.addEventListener('click',e=>{ if(e.target===panel) document.body.classList.remove('nav-open'); }); }
  if(serviceBtn && serviceSub){ serviceBtn.addEventListener('click',()=>{ serviceSub.classList.toggle('open'); serviceBtn.setAttribute('aria-expanded', serviceSub.classList.contains('open')); }); }
  document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{ const item=btn.closest('.faq-item'); const ans=item.querySelector('.faq-a'); const open=item.classList.toggle('open'); btn.setAttribute('aria-expanded',open); ans.style.maxHeight=open ? ans.scrollHeight+'px' : '0px'; }));
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window){ const io=new IntersectionObserver((entries)=>{entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target); } });},{threshold:.12}); document.querySelectorAll('.reveal').forEach(el=>io.observe(el)); } else { document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible')); }
  const form=document.querySelector('[data-whatsapp-form]');
  if(form){ form.addEventListener('submit',e=>{ e.preventDefault(); const data=new FormData(form); const msg=['طلب خدمة جديد من موقع بيورتي لايف','الاسم: '+(data.get('name')||''),'الجوال: '+(data.get('phone')||''),'الخدمة: '+(data.get('service')||''),'الحي داخل جدة: '+(data.get('district')||''),'الموعد المناسب: '+(data.get('date')||''),'التفاصيل: '+(data.get('details')||'')].join('\n'); window.open('https://wa.me/966553382299?text='+encodeURIComponent(msg),'_blank','noopener'); }); }
})();