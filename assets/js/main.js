(function(){
  const isGh=location.hostname.endsWith('github.io');
  const base=isGh?location.origin+'/purity-life-cleaning':location.origin;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const path=()=>{let p=location.pathname;if(isGh)p=p.replace(/^\/purity-life-cleaning/,'');p=p.replace(/index\.html$/,'');return p.endsWith('/')?p:p+'/'};
  const u=p=>base+p;
  const cities='جدة - مكة - المدينة المنورة - الرياض - الدمام - الخبر - الجبيل';
  const citiesInline='جدة ومكة والمدينة المنورة والرياض والدمام والخبر والجبيل';
  const cityObjects=['جدة','مكة','المدينة المنورة','الرياض','الدمام','الخبر','الجبيل'].map(name=>({'@type':'City',name,addressCountry:'SA'}));
  const titleHome='شركة تنظيف منازل بجدة ومكة والمدينة والرياض | الدمام والخبر والجبيل | بيورتي لايف';
  const descHome='بيورتي لايف Purity Life شركة تنظيف منازل في جدة ومكة والمدينة المنورة والرياض والدمام والخبر والجبيل، تقدم تنظيف الفلل والشقق والكنب والسجاد والستائر والمكاتب ومكافحة الحشرات بمواد آمنة وفريق مدرب وحجز سريع عبر واتساب.';

  const icon={
    wa:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2.1 22l5-1.3A10 10 0 1 0 12 2Zm5.6 14.2c-.2.7-1.3 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.7.9c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2.1 1.3 2.4 1.4.3.1.5.1.7-.1.2-.2.7-.9.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.1.5.2.6.3v.1c0 .2 0 .7-.2 1.4Z"/></svg>',
    ph:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"/></svg>',
    home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8-1.5 1.7-.8-.7v9h-5.5v-5.5h-2.4V21H5.3v-9l-.8.7L3 11Z"/></svg>',
    srv:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2Zm6.5 10 1 3.2 3.2 1.1-3.2 1.1-1 3.2-1-3.2-3.2-1.1 3.2-1.1 1-3.2Z"/></svg>',
    blog:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5V21h1.5l10.8-10.8-1.5-1.5L4 19.5ZM5 4h11v2H5V4Zm0 4h8v2H5V8Zm0 4h5v2H5v-2Z"/></svg>',
    user:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2-8 4.5V21h16v-2.5c0-2.5-3.6-4.5-8-4.5Z"/></svg>',
    ck:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.2 16.6-4.3-4.3 1.6-1.6 2.7 2.8 8.4-8.4 1.5 1.6-9.9 9.9Z"/></svg>',
    clk:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.2 3.3 1.9-.9 1.5L11 13V6.5h2v5.7Z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm5.3-.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z"/></svg>',
    fb:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>',
    tt:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 5.8A6.2 6.2 0 0 0 20.2 7v3.2a9.2 9.2 0 0 1-3.6-.8v5.2a6.5 6.5 0 1 1-7.3-6.4v3.4a3.2 3.2 0 1 0 2.2 3V2.9h3.2c.2 1.2.8 2.2 1.9 2.9Z"/></svg>',
    sn:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4c3.1 0 5.1 2 5.1 5.1v2.2c.4.2.8.3 1.2.1.7-.3 1.2-.2 1.5.3.2.5-.1 1.1-1.1 1.5-.4.2-.8.3-1.2.4.3.9 1 1.8 2 2.4.5.3 1 .5 1.5.7.6.2.8.5.7.9-.1.5-.6.8-1.4.9-.4.1-.7.1-1 .1-.3.4-.8.7-1.5.9-.5.1-1 .2-1.6.1-.7.8-1.7 1.6-3.2 1.6-.7 0-1.2-.1-1.7-.3-.5-.1-.9-.2-1.3-.2s-.8.1-1.3.2c-.5.2-1 .3-1.7.3-1.5 0-2.5-.8-3.2-1.6-.6.1-1.1 0-1.6-.1-.7-.2-1.2-.5-1.5-.9-.3 0-.6 0-1-.1-.8-.1-1.3-.4-1.4-.9-.1-.4.1-.7.7-.9.5-.2 1-.4 1.5-.7 1-.6 1.7-1.5 2-2.4-.4-.1-.8-.2-1.2-.4-1-.4-1.3-1-.1-1.5.3-.5.8-.6 1.5-.3.4.2.8.1 1.2-.1V7.5c0-3.1 2-5.1 5.1-5.1Z"/></svg>'
  };

  function loadLightFixes(){
    document.documentElement.style.colorScheme='light only';
    let m=$('meta[name="color-scheme"]');
    if(!m){m=document.createElement('meta');m.name='color-scheme';document.head.appendChild(m)}
    m.content='light only';
    if(!$('link[data-final-mobile-fixes]')){
      const l=document.createElement('link');
      l.rel='stylesheet';l.href=u('/assets/css/final-mobile-fixes.css?v=clean-copy-1');l.dataset.finalMobileFixes='1';
      document.head.appendChild(l);
    }
  }

  function currentUrl(){return base+path();}
  function updateMeta(){
    const p=path();
    if(p==='/') document.title=titleHome;
    $$('link[rel="canonical"]').forEach(e=>e.href=currentUrl());
    $$('meta[property="og:url"]').forEach(e=>e.content=currentUrl());
    $$('meta[property="og:image"],meta[name="twitter:image"]').forEach(e=>e.content=e.content.replace('https://YOUR-DOMAIN.com',base));
    if(p==='/'){
      $$('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').forEach(e=>e.content=descHome);
      $$('meta[property="og:title"],meta[name="twitter:title"]').forEach(e=>e.content=titleHome);
    }
  }

  function updateSchema(){
    $$('script[type="application/ld+json"]').forEach(s=>{
      try{
        const d=JSON.parse(s.textContent.replace(/https:\/\/YOUR-DOMAIN\.com/g,base));
        const graph=Array.isArray(d['@graph'])?d['@graph']:[d];
        graph.forEach(x=>{
          if(Array.isArray(x['@type'])&&x['@type'].includes('CleaningService')) x['@type']='CleaningService';
          if(x['@type']==='CleaningService'||x['@type']==='LocalBusiness'){
            x.description='بيورتي لايف Purity Life شركة تنظيف منازل في '+citiesInline+' تقدم خدمات تنظيف المنازل والفلل والشقق والكنب والسجاد والستائر ومكافحة الحشرات والتنظيف العميق وتنظيف ما بعد التشطيب.';
            x.areaServed=cityObjects;
            x.serviceArea=cityObjects;
            x.address={'@type':'PostalAddress',addressCountry:'SA'};
            if(x.hasOfferCatalog){
              x.hasOfferCatalog.name='خدمات بيورتي لايف في '+citiesInline;
              (x.hasOfferCatalog.itemListElement||[]).forEach(o=>{ if(o.itemOffered) o.itemOffered.areaServed=cityObjects; });
            }
          }
          if(x['@type']==='WebPage'&&path()==='/'){
            x.name=titleHome;
            x.description=descHome;
          }
        });
        s.textContent=JSON.stringify(d);
      }catch(e){}
    });
  }

  function working(){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Riyadh',weekday:'short',hour:'2-digit',hour12:false}).formatToParts(new Date());
    const day=parts.find(x=>x.type==='weekday')?.value;
    const hour=+parts.find(x=>x.type==='hour')?.value;
    const open=['Sat','Sun','Mon','Tue','Wed','Thu'].includes(day)&&hour>=8&&hour<23;
    $$('.eyebrow').forEach(e=>{
      e.classList.add('working-pill');
      e.innerHTML='<span class="work-clock">'+icon.clk+'</span><span class="work-text">من السبت للخميس 8 ص - 11 م</span><span class="work-dot'+(open?'':' closed')+'"></span>';
    });
  }

  function homeCopy(){
    if(path()!=='/') return;
    const h1=$('.hero h1');
    const hp=$('.hero p');
    if(h1) h1.textContent='أفضل شركة تنظيف منازل وفلل وكنب وسجاد في '+citiesInline;
    if(hp) hp.textContent='بيورتي لايف Purity Life تقدم خدمات تنظيف احترافية للمنازل والفلل والشقق والكنب والسجاد والستائر ومكافحة الحشرات في '+citiesInline+' بمواد تنظيف مناسبة وفريق مدرب وحجز سريع عبر واتساب.';
    const trust=$('.trust-strip');
    if(trust){trust.innerHTML=['مواد آمنة 100%','فريق مدرب وخبرة','خدمة عملاء 24/7','أسعار تنافسية'].map(t=>'<div class="trust-chip">'+icon.ck+'<span>'+t+'</span></div>').join('');}
    $$('.section-title').forEach(box=>{
      const h=box.querySelector('h2');
      const p=box.querySelector('p:not(.kicker)');
      if(h&&/خدمات تنظيف متكاملة/.test(h.textContent)) h.textContent='خدمات تنظيف متكاملة في '+cities;
      if(p&&/حلول تنظيف|احتياجات العملاء|داخل مدينة جدة/.test(p.textContent)) p.textContent='نقدم حلول تنظيف احترافية للمنازل والفلل والشقق والمكاتب والمنشآت، مع خدمات تنظيف الكنب والسجاد والستائر والتنظيف العميق ومكافحة الحشرات داخل نطاق '+cities+'.';
      if(h&&/صور مختارة/.test(h.textContent)&&p) p.textContent='نقدم نماذج بصرية مختارة من خدمات التنظيف لتوضيح مستوى العناية بالتفاصيل وجودة التنفيذ، مع عرض منظم يساعد العميل على تكوين فكرة أوضح عن أسلوب بيورتي لايف في تنظيف المنازل والفلل والشقق والمفروشات.';
    });
  }

  function polish(){
    $$('.card-link').forEach(a=>a.textContent='معرفة المزيد');
    $$('.float-wa').forEach(a=>a.innerHTML=icon.wa);
    $$('.float-call').forEach(a=>a.innerHTML=icon.ph);
    $$('.socials a[aria-label="Instagram"]').forEach(a=>a.innerHTML=icon.ig);
    $$('.socials a[aria-label="Facebook"]').forEach(a=>a.innerHTML=icon.fb);
    $$('.socials a[aria-label="TikTok"]').forEach(a=>a.innerHTML=icon.tt);
    $$('.socials a[aria-label="Snapchat"]').forEach(a=>a.innerHTML=icon.sn);
    $$('.footer-grid>div:first-child>p').forEach(p=>p.textContent='بيورتي لايف شركة تنظيف منازل في '+citiesInline+' تقدم خدمات تنظيف شاملة للمنازل والفلل والشقق والكنب والمجالس والسجاد والموكيت والستائر، بالإضافة إلى التنظيف العميق وتنظيف المكاتب والمنشآت وتنظيف ما بعد التشطيب ومكافحة الحشرات، مع فريق مدرب ومواد مناسبة وحجز سريع عبر واتساب.');
    $$('.bottom-nav').forEach(n=>n.innerHTML='<a href="'+u('/services/')+'"><span>'+icon.srv+'</span><span>خدماتنا</span></a><a href="'+u('/blog/')+'"><span>'+icon.blog+'</span><span>المدونة</span></a><a class="is-home" href="'+u('/')+'"><span>'+icon.home+'</span><span>الرئيسية</span></a><a href="'+u('/about/')+'"><span>'+icon.user+'</span><span>من نحن</span></a><a href="'+u('/contact/')+'"><span>'+icon.ph+'</span><span>تواصل</span></a>');
  }

  function interactions(){
    const header=$('.site-header');
    const toggle=$('.menu-toggle');
    const panel=$('.mobile-panel');
    const serviceBtn=$('[data-mobile-services]');
    const serviceSub=$('.mobile-sub');
    const setHeader=()=>{ if(header) header.classList.toggle('is-scrolled', scrollY>24); };
    setHeader();
    addEventListener('scroll', setHeader, {passive:true});
    if(toggle) toggle.addEventListener('click',()=>{const open=document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',String(open));});
    if(panel) panel.addEventListener('click',e=>{if(e.target===panel){document.body.classList.remove('nav-open');if(toggle)toggle.setAttribute('aria-expanded','false');}});
    if(serviceBtn&&serviceSub) serviceBtn.addEventListener('click',()=>{const open=serviceSub.classList.toggle('open');serviceBtn.setAttribute('aria-expanded',String(open));});
    $$('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),answer=item&&item.querySelector('.faq-a');if(!item||!answer)return;const open=item.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));answer.style.maxHeight=open?answer.scrollHeight+'px':'0px';}));
    const form=$('[data-whatsapp-form]');
    if(form) form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=['طلب خدمة جديد من موقع بيورتي لايف','الاسم: '+(d.get('name')||''),'الجوال: '+(d.get('phone')||''),'الخدمة: '+(d.get('service')||''),'المدينة/الحي: '+(d.get('district')||''),'الموعد المناسب: '+(d.get('date')||''),'التفاصيل: '+(d.get('details')||'')].join('\n');open('https://wa.me/966553382299?text='+encodeURIComponent(msg),'_blank','noopener');});
  }

  loadLightFixes();
  updateMeta();
  updateSchema();
  working();
  homeCopy();
  polish();
  interactions();
})();
