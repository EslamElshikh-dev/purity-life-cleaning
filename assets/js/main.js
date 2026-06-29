
(function(){
  const header=document.querySelector('.site-header');
  const toggle=document.querySelector('.menu-toggle');
  const panel=document.querySelector('.mobile-panel');
  const serviceBtn=document.querySelector('[data-mobile-services]');
  const serviceSub=document.querySelector('.mobile-sub');
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
