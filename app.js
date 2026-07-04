/* ============ Corelinks (corelinks.tech) — Mentor-style site ============ */
const CFG=window.SITE_CONFIG, INST=CFG.institute;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const waLink=(t='')=>`https://wa.me/${INST.whatsapp}${t?'?text='+encodeURIComponent(t):''}`;

const IC={
  network:'<path d="M9 2h6v6H9zM2 16h6v6H2zM16 16h6v6h-6zM12 8v4M12 12H5v4M12 12h7v4"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  cloud:'<path d="M17.5 19a4.5 4.5 0 0 0 0-9h-1.3A6 6 0 1 0 6 15.9"/>',
  ai:'<path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1 0 8 4 4 0 0 1-8 0 4 4 0 0 1 0-8 4 4 0 0 1 4-4z"/><path d="M12 8v8M8 12h8"/>',
  camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  windows:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16M3 12h18"/>',
  linux:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 8 4 4-4 4M13 16h5"/>',
  menu:'<path d="M3 12h18M3 6h18M3 18h18"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin:'<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  check:'<path d="M20 6 9 17l-5-5"/>', checkc:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>', plus:'<path d="M12 5v14M5 12h14"/>',
  play:'<path d="m6 3 14 9-14 9z"/>', users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.7"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/>', book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  teacher:'<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>', trending:'<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  headset:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="6" rx="2"/><rect x="17" y="14" width="5" height="6" rx="2"/><path d="M20 18v1a3 3 0 0 1-3 3h-3"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  wa:'<path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.2 2.4 1 2.4.7 2.9.6.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2z"/>',
  fb:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>', ig:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  li:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>', yt:'<path d="M22.5 7a2.8 2.8 0 0 0-2-2C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5 2.8 2.8 0 0 0 2 2c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-5 29 29 0 0 0-.5-5z"/><path d="m10 15 5-3-5-3z" fill="currentColor"/>',
};
const icon=(n,cls='')=>`<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[n]||''}</svg>`;
const CATCOLOR={cisco:'cc-blue',microsoft:'cc-cyan',cctv:'cc-red',linux:'cc-amber',cloud:'cc-cyan',security:'cc-violet',ai:'cc-green',programming:'cc-blue'};

/* ---- header + footer ---- */
function navLinks(onIndex){
  const h=id=>onIndex?('#'+id):('index.html#'+id);
  return `<a href="${onIndex?'#hero':'index.html'}">Home</a>
    <a href="${h('about')}">About</a>
    <a href="${h('schedule')}">Schedule</a>
    <a href="${h('courses')}">Courses</a>
    <a href="${h('trainers')}">Trainers</a>
    <a href="${h('pricing')}">Enrollment</a>
    <a href="blog.html">Blog</a>
    <a href="${h('contact')}">Contact</a>`;
}
function injectHeader(page){
  const el=document.getElementById('site-header'); if(!el) return;
  const onIndex=(page==='home');
  el.innerHTML=`
  <div class="topbar"><div class="wrap">
    <div><a class="ti" href="tel:${esc(INST.phone)}">${icon('phone')} ${esc(INST.phone)}</a>
      <a class="ti contact-2" href="mailto:${esc(INST.email)}">${icon('mail')} ${esc(INST.email)}</a></div>
    <div class="soc">
      <a href="${INST.facebook}">${icon('fb')}</a><a href="${INST.instagram}">${icon('ig')}</a>
      <a href="${INST.linkedin}">${icon('li')}</a><a href="${INST.youtube}">${icon('yt')}</a></div>
  </div></div>
  <header class="hdr"><div class="wrap hdr-in">
    <a class="brand" href="index.html"><img src="${INST.logo}" alt="${esc(INST.name)}"></a>
    <nav class="nav" id="nav">${navLinks(onIndex)}</nav>
    <div class="hdr-cta">
      <a class="btn btn-primary" href="${onIndex?'#contact':'index.html#contact'}">Get Started</a>
      <button class="burger" id="burger" aria-label="Menu">${icon('menu')}</button>
    </div>
  </div></header>`;
  const nav=document.getElementById('nav'), b=document.getElementById('burger');
  b.onclick=()=>{ nav.classList.toggle('open'); b.innerHTML=nav.classList.contains('open')?icon('x'):icon('menu'); };
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ nav.classList.remove('open'); b.innerHTML=icon('menu'); }));
}
function injectFooter(){
  const el=document.getElementById('site-footer'); if(!el) return;
  el.innerHTML=`<footer class="ftr"><div class="wrap">
    <div class="ftr-grid">
      <div>
        <a class="brand" href="index.html"><span class="logo-chip"><img src="${INST.logo}" alt="${esc(INST.name)}"></span></a>
        <p class="ftr-p">${esc(INST.tagline)} — building Pakistan's next generation of IT professionals with hands-on training, international certifications, on-campus &amp; online worldwide.</p>
        <div class="soc2"><a href="${INST.facebook}">${icon('fb')}</a><a href="${INST.instagram}">${icon('ig')}</a><a href="${INST.linkedin}">${icon('li')}</a><a href="${INST.youtube}">${icon('yt')}</a></div>
      </div>
      <div><h4>Explore</h4><a href="index.html#about">About</a><a href="index.html#courses">Courses</a><a href="index.html#trainers">Trainers</a><a href="blog.html">Blog</a><a href="index.html#contact">Contact</a></div>
      <div><h4>Top Courses</h4><a href="index.html#courses">CCNA / CCNP</a><a href="index.html#courses">MCSE &amp; Microsoft</a><a href="index.html#courses">Ethical Hacking</a><a href="index.html#courses">AI &amp; Data Science</a><a href="index.html#courses">AI CCTV</a></div>
      <div><h4>Contact</h4><a href="tel:${esc(INST.phone)}">${icon('phone')} ${esc(INST.phone)}</a><a href="mailto:${esc(INST.email)}">${icon('mail')} ${esc(INST.email)}</a><a href="#" style="cursor:default">${icon('pin')} ${esc(INST.city)}</a></div>
    </div>
    <div class="ftr-bottom">&copy; 2026 ${esc(INST.name)} — ${esc(INST.tagline)}. All rights reserved.</div>
  </div></footer>
  <a class="wa-float" href="${waLink('Hi Corelinks, I would like to know more about your courses.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a>`;
}

/* ---- courses ---- */
let CUR_CAT='all';
function courseCard(c,cat){
  const cc=CATCOLOR[cat.id]||'cc-blue';
  return `<div class="course reveal">
    <div class="course-top ${cc}">${icon(cat.icon)}<span class="course-cat">${esc(cat.title.split('&')[0].trim())}</span><span class="course-lvl">${esc(c.level)}</span></div>
    <div class="course-b"><h3>${esc(c.name)}</h3><p>${esc(c.desc)}</p>
      <div class="course-meta"><span>${icon('clock')}${esc(c.duration)}</span>
        <a href="index.html#contact" onclick="prefillCourse('${esc(c.name).replace(/'/g,"")}')" class="btn btn-outline" style="padding:7px 18px;font-size:13px">Enquire</a></div>
    </div></div>`;
}
function renderFilters(){
  const el=document.getElementById('filters'); if(!el) return;
  el.innerHTML=`<button class="chip active" data-cat="all">All</button>`+(window.COURSE_CATALOG||[]).map(c=>`<button class="chip" data-cat="${c.id}">${esc(c.title.split('&')[0].trim())}</button>`).join('');
  el.querySelectorAll('.chip').forEach(ch=>ch.onclick=()=>{CUR_CAT=ch.dataset.cat;el.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');renderCourses();});
}
function renderCourses(){
  const el=document.getElementById('courses-grid'); if(!el) return;
  let out=[];
  (window.COURSE_CATALOG||[]).forEach(cat=>{ if(CUR_CAT!=='all'&&CUR_CAT!==cat.id) return; cat.courses.forEach(c=>out.push(courseCard(c,cat))); });
  el.innerHTML=out.join(''); revealInit();
}
function prefillCourse(name){ const s=document.getElementById('eCourse'); if(s){ [...s.options].forEach(o=>{ if(o.value===name)o.selected=true; }); } }
window.prefillCourse=prefillCourse;

/* ---- trainers ---- */
const TRAINERS=[
  {n:'Sami Ullah',r:'Cisco Instructor',s:'CCNA · CCNP · CCIE',c:'cc-blue',i:'SU'},
  {n:'Usman Khan',r:'Microsoft Expert',s:'MCSE · Azure · Windows Server',c:'cc-cyan',i:'UK'},
  {n:'Fahad Ullah',r:'Security Analyst',s:'Ethical Hacking · Cyber Security',c:'cc-violet',i:'FU'},
  {n:'Imran Khan',r:'AI & Surveillance',s:'AI CCTV · Data Science',c:'cc-red',i:'IK'},
  {n:'Bilal Ahmed',r:'Cloud Architect',s:'AWS · Azure · DevOps',c:'cc-green',i:'BA'},
  {n:'Muhammad Awais',r:'Network Engineer',s:'Enterprise Networking',c:'cc-amber',i:'MA'},
];
function renderTrainers(){
  const el=document.getElementById('trainers-grid'); if(!el) return;
  el.innerHTML=TRAINERS.map(t=>`<div class="trainer reveal">
    <div class="ph ${t.c}"><span class="av">${t.i}</span></div>
    <div class="trainer-b"><h3>${esc(t.n)}</h3><div class="role">${esc(t.r)}</div><p>${esc(t.s)}</p></div></div>`).join('');
}

/* ---- upcoming batches (Supabase-driven, sample fallback) ---- */
const SAMPLE_UPCOMING=[
  {course:'CCNA (Routing & Switching)',instructor:'Sami Ullah',timing:'06:00 PM – 08:00 PM',start_date:'2026-08-04',mode:'On-campus',seats:'Few seats left'},
  {course:'CCNP Enterprise',instructor:'Muhammad Awais',timing:'04:00 PM – 06:00 PM',start_date:'2026-08-11',mode:'Online & On-campus'},
  {course:'MCSE (Microsoft)',instructor:'Usman Khan',timing:'05:00 PM – 07:00 PM',start_date:'2026-08-18',mode:'On-campus'},
  {course:'AI CCTV & Video Analytics',instructor:'Imran Khan',timing:'11:00 AM – 01:00 PM',start_date:'2026-08-20',mode:'On-campus',seats:'Limited seats'},
  {course:'Certified Ethical Hacking',instructor:'Fahad Ullah',timing:'07:00 PM – 09:00 PM',start_date:'2026-08-25',mode:'Online'},
  {course:'AWS Cloud (Associate)',instructor:'Bilal Ahmed',timing:'08:00 PM – 10:00 PM',start_date:'2026-09-01',mode:'Online'},
];
function modeBadge(m){ m=m||'On-campus'; const on=/online/i.test(m),camp=/campus/i.test(m); const cls=(on&&camp)?'both':(on?'online':'campus'); return `<span class="mode ${cls}">${esc(m)}</span>`; }
function ucTable(rows){
  return `<div class="uc-wrap"><table class="uc-table"><thead><tr><th>Course</th><th>Instructor</th><th>Timing</th><th>Starting</th><th>Mode</th></tr></thead>
    <tbody>${rows.map(r=>`<tr><td class="uc-course">${esc(r.course)}${r.seats?`<span class="uc-seats">${esc(r.seats)}</span>`:''}</td><td>${esc(r.instructor||'—')}</td><td class="uc-nowrap">${esc(r.timing||'—')}</td><td class="uc-nowrap">${fmtDate(r.start_date)}</td><td>${modeBadge(r.mode)}</td></tr>`).join('')}</tbody></table></div>`;
}
async function renderUpcoming(){
  const wrap=document.getElementById('upcoming'); if(!wrap) return;
  wrap.innerHTML=ucTable(SAMPLE_UPCOMING);        // show instantly, never hangs on "Loading…"
  const c=sb(); if(!c) return;
  try{ const {data,error}=await c.from('v_web_classes').select('course,instructor,timing,start_date,mode').order('start_date',{ascending:true}).limit(10);
    if(!error && data && data.length) wrap.innerHTML=ucTable(data);   // upgrade to live schedule (published classes from the app)
  }catch(e){}
}

/* ---- blog ---- */
function stripTags(s){ return String(s).replace(/<[^>]*>/g,'').replace(/&amp;/g,'&'); }
const _MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(iso){ if(!iso) return ''; const p=String(iso).slice(0,10).split('-'); return p.length<3?iso:(p[2]+' '+_MON[(+p[1])-1]+' '+p[0]); }
function postCard(p){
  const cc={blue:'cc-blue',green:'cc-green',violet:'cc-violet',cyan:'cc-cyan',amber:'cc-amber'}[p.color]||'cc-blue';
  return `<a class="post reveal" href="article.html?p=${encodeURIComponent(p.slug)}">
    <div class="pt ${cc}">${icon(p.icon||'book')}<span class="pcat">${esc(p.category||'Article')}</span></div>
    <div class="pb"><div class="pm">${fmtDate(p.date)} · ${esc(p.read||'')}</div><h3>${p.title}</h3><p>${p.excerpt}</p><span class="more">Read article →</span></div></a>`;
}
function renderBlogTeaser(){ const el=document.getElementById('blogteaser'); if(!el) return;
  const posts=(window.BLOG_POSTS||[]).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,3);
  el.innerHTML=posts.map(postCard).join(''); }
function renderBlogList(){ const el=document.getElementById('bloglist'); if(!el) return;
  const posts=(window.BLOG_POSTS||[]).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  el.innerHTML=posts.length?posts.map(postCard).join(''):'<p class="center">Articles coming soon.</p>'; }
function renderArticle(){
  const el=document.getElementById('article'); if(!el) return;
  const slug=new URLSearchParams(location.search).get('p'), posts=window.BLOG_POSTS||[], p=posts.find(x=>x.slug===slug);
  if(!p){ el.innerHTML=`<div class="wrap" style="padding:70px 0;text-align:center"><h1>Article not found</h1><a class="btn btn-primary" href="blog.html">← Back to Blog</a></div>`; return; }
  document.title=stripTags(p.title)+' | '+INST.name+' Blog';
  const md=document.querySelector('meta[name=description]'); if(md) md.content=p.excerpt;
  const related=posts.filter(x=>x.slug!==p.slug).slice(0,3);
  el.innerHTML=`<div class="phero"><div class="wrap"><div class="crumbs"><a href="index.html">Home</a> › <a href="blog.html">Blog</a> › ${esc(p.category||'')}</div><h1 style="max-width:840px;margin:0 auto">${p.title}</h1><p style="margin-top:10px;color:#c9cffb">${fmtDate(p.date)} · ${esc(p.read||'')} · By ${esc(p.author||INST.name)}</p></div></div>
    <div class="wrap"><div class="article-body">${p.content}<div class="article-cta"><h3>Want to learn this with expert guidance?</h3><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><a class="btn btn-primary btn-lg" href="index.html#courses">Browse Courses</a><a class="btn btn-wa btn-lg" href="${waLink()}" target="_blank" rel="noopener">${icon('wa')} WhatsApp Us</a></div></div></div>
    ${related.length?`<div class="sec" style="padding-top:10px"><div class="center stitle"><h2>More Articles</h2></div><div class="grid g-3">${related.map(postCard).join('')}</div></div>`:''}</div>`;
  const base=(CFG.site&&CFG.site.url||'').replace(/\/$/,'');
  const ld={"@context":"https://schema.org","@type":"BlogPosting",headline:stripTags(p.title),description:p.excerpt,datePublished:p.date,dateModified:p.date,author:{"@type":"Organization",name:INST.name},publisher:{"@type":"Organization",name:INST.name,logo:{"@type":"ImageObject",url:base+'/assets/logo.png'}},mainEntityOfPage:base+'/article.html?p='+p.slug};
  const s=document.createElement('script'); s.type='application/ld+json'; s.textContent=JSON.stringify(ld); document.head.appendChild(s);
  revealInit();
}

/* ---- FAQ ---- */
function wireFAQ(){ document.querySelectorAll('.faq-item .faq-q').forEach(q=>q.onclick=()=>q.parentElement.classList.toggle('open')); }

/* ---- contact form + country codes ---- */
const COUNTRIES=[['PK','Pakistan','+92'],['AF','Afghanistan','+93'],['AU','Australia','+61'],['BH','Bahrain','+973'],['BD','Bangladesh','+880'],['CA','Canada','+1'],['CN','China','+86'],['EG','Egypt','+20'],['FR','France','+33'],['DE','Germany','+49'],['IN','India','+91'],['ID','Indonesia','+62'],['IR','Iran','+98'],['IQ','Iraq','+964'],['IE','Ireland','+353'],['IT','Italy','+39'],['JP','Japan','+81'],['JO','Jordan','+962'],['KW','Kuwait','+965'],['MY','Malaysia','+60'],['NL','Netherlands','+31'],['NZ','New Zealand','+64'],['OM','Oman','+968'],['PH','Philippines','+63'],['QA','Qatar','+974'],['SA','Saudi Arabia','+966'],['SG','Singapore','+65'],['ZA','South Africa','+27'],['ES','Spain','+34'],['LK','Sri Lanka','+94'],['SE','Sweden','+46'],['CH','Switzerland','+41'],['TR','Turkey','+90'],['AE','United Arab Emirates','+971'],['GB','United Kingdom','+44'],['US','United States','+1'],['YE','Yemen','+967']];
function flagEmoji(iso){ return iso.toUpperCase().replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt(0))); }
function buildCountryOptions(id){ const s=document.getElementById(id); if(!s) return;
  s.innerHTML=COUNTRIES.map(c=>`<option value="${c[2]}" ${c[0]==='PK'?'selected':''}>${flagEmoji(c[0])} ${esc(c[1])} (${c[2]})</option>`).join(''); }
function buildCourseOptions(id){ const s=document.getElementById(id); if(!s) return;
  let o='<option value="">— Select a course —</option>';
  (window.COURSE_CATALOG||[]).forEach(cat=>{ o+=`<optgroup label="${esc(cat.title)}">`+cat.courses.map(c=>`<option>${esc(c.name)}</option>`).join('')+'</optgroup>'; });
  s.innerHTML=o+'<option>Other / Not sure yet</option>'; }
let SB=null; function sb(){ if(!SB&&window.supabase) SB=window.supabase.createClient(CFG.supabase.url,CFG.supabase.key); return SB; }
function wireEnquiry(){
  const f=document.getElementById('enquiryForm'); if(!f) return;
  buildCourseOptions('eCourse'); buildCountryOptions('eCode');
  f.onsubmit=async e=>{
    e.preventDefault(); const msg=document.getElementById('formMsg'), btn=f.querySelector('button[type=submit]');
    const num=f.ePhone.value.trim().replace(/^0+/,''), code=f.eCode?f.eCode.value:'';
    const payload={name:f.eName.value.trim(),phone:(code?code+' ':'')+num,email:f.eEmail.value.trim()||null,course:f.eCourse.value||null,message:f.eMessage.value.trim()||null};
    if(!payload.name||!num){ msg.className='form-msg err'; msg.textContent='Please enter your name and phone number.'; return; }
    btn.disabled=true; const t=btn.textContent; btn.textContent='Sending…';
    try{ const c=sb(); if(c){ const {error}=await c.from('enquiries').insert(payload); if(error) throw error; }
      msg.className='form-msg ok'; msg.textContent='✅ Thank you, '+payload.name+'! Your enquiry has been received — our team will contact you shortly.'; f.reset(); buildCourseOptions('eCourse'); buildCountryOptions('eCode');
    }catch(err){ msg.className='form-msg err'; msg.innerHTML='Could not submit right now. Please <a href="'+waLink('Enquiry: '+payload.name)+'" target="_blank">message us on WhatsApp</a> instead.'; }
    finally{ btn.disabled=false; btn.textContent=t; }
  };
}

/* ---- counters, scrollspy, reveal, SEO ---- */
function animateCounters(){ const box=document.querySelector('.counts'); if(!box) return; let done=false;
  const run=()=>{ if(done)return; done=true; box.querySelectorAll('.count b').forEach(b=>{ const m=b.textContent.match(/(\d+)/); if(!m)return; const tg=+m[1],sf=b.textContent.slice(m.index+m[1].length); let cur=0,st=Math.max(1,Math.ceil(tg/45)); b.textContent='0'+sf; const t=setInterval(()=>{cur+=st;if(cur>=tg){cur=tg;clearInterval(t);}b.textContent=cur+sf;},26); }); };
  if(!('IntersectionObserver'in window)){run();return;} const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)run();}),{threshold:.4}); io.observe(box); }
function scrollSpy(){ const links=[...document.querySelectorAll('#nav a[href^="#"]')]; if(!links.length) return;
  const secs=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const on=()=>{ let cur=''; secs.forEach(s=>{ if(window.scrollY>=s.offsetTop-120) cur=s.id; }); links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur)); };
  window.addEventListener('scroll',on); on(); }
function revealInit(){ const els=document.querySelectorAll('.reveal:not(.in)'); if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12}); els.forEach(e=>io.observe(e)); }
function injectSEO(){
  const base=(CFG.site&&CFG.site.url||'').replace(/\/$/,''), head=document.head;
  const file=(location.pathname.split('/').pop()||'index.html')||'index.html', pageUrl=base+'/'+(file==='index.html'?'':file), logoUrl=base+'/assets/logo.png';
  const set=(sel,mk)=>{ if(!head.querySelector(sel)) head.appendChild(mk()); };
  set('link[rel="icon"]',()=>{const l=document.createElement('link');l.rel='icon';l.href='assets/favicon.png';return l;});
  set('link[rel="canonical"]',()=>{const l=document.createElement('link');l.rel='canonical';l.href=pageUrl;return l;});
  [['og:type','website'],['og:site_name',INST.name],['og:title',document.title],['og:description',(document.querySelector('meta[name=description]')||{}).content||INST.tagline],['og:url',pageUrl],['og:image',logoUrl],['twitter:card','summary_large_image']].forEach(([k,v])=>{ if(!v)return; const at=k.startsWith('og:')?'property':'name'; if(head.querySelector(`meta[${at}="${k}"]`))return; const m=document.createElement('meta');m.setAttribute(at,k);m.content=v;head.appendChild(m); });
  const socials=[INST.facebook,INST.instagram,INST.linkedin,INST.youtube].filter(s=>s&&s!=='#');
  const courses=[]; (window.COURSE_CATALOG||[]).forEach(cat=>cat.courses.forEach(c=>courses.push({"@type":"Course",name:c.name,description:c.desc,provider:{"@type":"Organization",name:INST.name,sameAs:base}})));
  const graph={"@context":"https://schema.org","@graph":[
    {"@type":["EducationalOrganization","LocalBusiness"],"@id":base+"/#org",name:INST.name,alternateName:INST.name+" — "+INST.tagline,url:base,logo:logoUrl,image:logoUrl,telephone:INST.phone,email:INST.email,priceRange:"$$",description:"IT training center in Peshawar — CCNA, CCNP, MCSE, Cybersecurity, AI, Cloud, AI CCTV. On-campus & online 1-on-1 worldwide.",address:{"@type":"PostalAddress",streetAddress:"1st Floor, Riaz Mart, Opposite Gul Haji Plaza, Main University Road",addressLocality:"Peshawar",addressRegion:"Khyber Pakhtunkhwa",postalCode:"25000",addressCountry:"PK"},geo:{"@type":"GeoCoordinates",latitude:34.0043,longitude:71.5384},areaServed:["Peshawar","Pakistan","Worldwide (online)"],openingHours:"Mo-Sa 09:00-20:00",sameAs:socials},
    {"@type":"ItemList",name:"Courses at "+INST.name,itemListElement:courses.map((c,i)=>({"@type":"ListItem",position:i+1,item:c}))}]};
  const s=document.createElement('script'); s.type='application/ld+json'; s.textContent=JSON.stringify(graph); head.appendChild(s);
}

/* ---- boot ---- */
document.addEventListener('DOMContentLoaded',()=>{
  const page=document.body.dataset.page||'home';
  injectHeader(page); injectFooter();
  renderFilters(); renderCourses(); renderUpcoming(); renderTrainers(); renderBlogTeaser(); renderBlogList(); renderArticle();
  wireFAQ(); wireEnquiry(); animateCounters(); if(page==='home') scrollSpy();
  injectSEO(); revealInit();
  document.querySelectorAll('[data-inst=wa]').forEach(e=>e.href=waLink());
  document.querySelectorAll('[data-inst=phone]').forEach(e=>{e.textContent=INST.phone;e.href='tel:'+INST.phone;});
  document.querySelectorAll('[data-inst=email]').forEach(e=>{e.textContent=INST.email;e.href='mailto:'+INST.email;});
});
