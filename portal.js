/* ============================================================
   Corelinks — Student Portal (corelinks.tech)
   Students sign in with the email + password created for them in the
   management app. Same Supabase project as the public site enquiries.
   ============================================================ */
(function(){
  'use strict';
  var CFG = window.SITE_CONFIG || {};
  var SB = null;
  function sb(){ if(!SB && window.supabase && CFG.supabase) SB = window.supabase.createClient(CFG.supabase.url, CFG.supabase.key); return SB; }
  function root(){ return document.getElementById('portalRoot'); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function initials(name){ return String(name||'S').trim().split(/\s+/).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase(); }

  function showLogin(msg){
    root().innerHTML =
      '<div class="portal-card">' +
        '<h1>Student Portal</h1>' +
        '<p class="portal-sub">Sign in to access your tutorials and practice.</p>' +
        (msg ? '<div class="pf-err" style="display:block">'+esc(msg)+'</div>' : '<div class="pf-err" id="plErr"></div>') +
        '<form id="plForm">' +
          '<div class="pf-row"><label>Email</label><input id="plEmail" type="email" autocomplete="username" placeholder="your email or rollno@corelinks.app"></div>' +
          '<div class="pf-row"><label>Password</label><input id="plPass" type="password" autocomplete="current-password" placeholder="Your password"></div>' +
          '<button class="btn btn-primary pf-btn" id="plBtn" type="submit">Sign in</button>' +
        '</form>' +
        '<p class="portal-sub" style="margin:16px 0 0;font-size:13px">Don\'t have a login? Ask the Corelinks reception/your instructor to set one up for you.</p>' +
      '</div>';
    if(msg){ /* already shown */ }
    var form = document.getElementById('plForm');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      doLogin();
    });
  }

  function errBox(text){
    var el = document.getElementById('plErr');
    if(el){ el.textContent = text; el.style.display = 'block'; }
  }

  async function doLogin(){
    var email = (document.getElementById('plEmail').value||'').trim();
    var pass  = document.getElementById('plPass').value||'';
    if(!email){ return errBox('Please enter your email.'); }
    if(!pass){ return errBox('Please enter your password.'); }
    // allow a plain username -> username@corelinks.app (same convention as the app)
    if(email.indexOf('@') === -1){ email = email.toLowerCase().replace(/\s+/g,'') + '@corelinks.app'; }
    var btn = document.getElementById('plBtn');
    btn.disabled = true; btn.textContent = 'Signing in…';
    try{
      var res = await sb().auth.signInWithPassword({ email: email, password: pass });
      if(res.error) throw res.error;
      showPortal();
    }catch(ex){
      errBox((ex && ex.message) ? ex.message : 'Could not sign in. Check your email and password.');
      btn.disabled = false; btn.textContent = 'Sign in';
    }
  }

  async function showPortal(){
    root().innerHTML = '<div class="portal-card"><p class="portal-sub" style="margin:0">Loading your portal…</p></div>';
    try{
      var ures = await sb().auth.getUser();
      var user = ures && ures.data && ures.data.user;
      if(!user){ return showLogin(); }
      var prof = (await sb().from('profiles').select('full_name, email, role').eq('id', user.id).maybeSingle()).data;
      var stu  = (await sb().from('students').select('id, full_name, roll_no, email, photo_url').eq('profile_id', user.id).maybeSingle()).data;
      var name = (stu && stu.full_name) || (prof && prof.full_name) || user.email || 'Student';
      var avatar = (stu && stu.photo_url) ? '<img src="'+esc(stu.photo_url)+'" alt="">' : esc(initials(name));

      // Access gate: a student may use the portal only while an enrolled class is ongoing.
      if(stu){
        try{
          var acc = (await sb().rpc('my_portal_access')).data;
          if(acc && acc.found && acc.active === false){ return showAccessEnded(name); }
        }catch(e){ /* RPC missing or error -> fail-soft, allow access */ }
      }

      if(!stu){
        // Logged in, but not linked to a student record (e.g. a staff/teacher login)
        root().innerHTML =
          '<div class="portal-card">' +
            '<h1>Hello, '+esc(name)+'</h1>' +
            '<p class="portal-sub">This login isn\'t linked to a student profile, so there\'s nothing to show in the student portal.</p>' +
            '<div class="portal-note">If you\'re a student, please contact Corelinks so your login can be linked to your student record.</div>' +
            '<p style="margin-top:18px"><button class="link-btn" id="plOut">Sign out</button></p>' +
          '</div>';
      }else{
        root().innerHTML =
          '<div class="portal-card">' +
            '<div class="portal-head">' +
              '<div class="portal-avatar">'+avatar+'</div>' +
              '<div><h1 style="margin:0">Welcome, '+esc(name)+' 👋</h1>' +
              '<p class="portal-sub" style="margin:2px 0 0">Your Corelinks learning portal</p></div>' +
            '</div>' +
            '<div class="portal-meta">' +
              (stu.roll_no ? '<div class="rr"><span>Roll No</span><b>'+esc(stu.roll_no)+'</b></div>' : '') +
              (stu.email ? '<div class="rr"><span>Email</span><b>'+esc(stu.email)+'</b></div>' : '') +
            '</div>' +
            '<p style="margin-top:16px"><button class="link-btn" id="plOut">Sign out</button></p>' +
          '</div>' +
          '<div class="portal-card" style="margin-top:16px">' +
            '<h2 style="font-family:\'Poppins\',sans-serif;font-size:19px;margin:0 0 4px">Learning Materials</h2>' +
            '<p class="portal-sub" style="margin:0 0 14px">Books, lab manuals and notes for your courses.</p>' +
            '<div id="spMaterials"><p class="portal-sub" style="margin:0">Loading…</p></div>' +
          '</div>' +
          '<div class="portal-card" style="margin-top:16px">' +
            '<h2 style="font-family:\'Poppins\',sans-serif;font-size:19px;margin:0 0 4px">Labs &amp; Tutorials</h2>' +
            '<p class="portal-sub" style="margin:0 0 14px">Hands-on labs and lessons for your courses.</p>' +
            '<div id="spLessons"><p class="portal-sub" style="margin:0">Loading…</p></div>' +
          '</div>';
        loadMaterials();
        loadLessons();
      }
      var out = document.getElementById('plOut');
      if(out) out.addEventListener('click', logout);
    }catch(ex){
      root().innerHTML = '<div class="portal-card"><p class="portal-sub">Something went wrong loading your portal. Please try again.</p><p><button class="link-btn" id="plOut">Sign out</button></p></div>';
      var o = document.getElementById('plOut'); if(o) o.addEventListener('click', logout);
    }
  }

  function fmtBytes(n){ n=Number(n||0); if(!n) return ''; var u=['B','KB','MB','GB'], i=Math.floor(Math.log(n)/Math.log(1024)); return (n/Math.pow(1024,i)).toFixed(i?1:0)+' '+u[i]; }
  async function loadMaterials(){
    var el=document.getElementById('spMaterials'); if(!el) return;
    try{
      var res=await sb().rpc('my_materials');
      if(res && res.error){ el.innerHTML='<p class="portal-sub" style="margin:0">Materials aren\'t available yet.</p>'; return; }
      var rows=(res && res.data) ? res.data : [];
      if(!rows.length){ el.innerHTML='<p class="portal-sub" style="margin:0">No materials have been added for your course(s) yet.</p>'; return; }
      var byCourse={};
      rows.forEach(function(r){ var k=r.course_name||'General'; (byCourse[k]=byCourse[k]||[]).push(r); });
      var html='';
      Object.keys(byCourse).forEach(function(course){
        html+='<div style="margin-bottom:14px"><div style="font-weight:700;color:#0f1b2d;margin-bottom:6px">'+esc(course)+'</div>';
        byCourse[course].forEach(function(r){
          var kind=({book:'Book',lab_manual:'Lab Manual',notes:'Notes',other:'File'})[r.kind]||'File';
          var icon=(r.kind==='lab_manual')?'🧪':(r.kind==='notes')?'📝':'📘';
          html+='<a href="'+esc(r.file_url||'#')+'" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:12px;padding:11px 12px;border:1px solid #e6ebf3;border-radius:10px;text-decoration:none;color:#0f1b2d;margin-bottom:8px">'+
            '<span style="width:34px;height:34px;border-radius:8px;background:#eef4ff;display:flex;align-items:center;justify-content:center;flex:none">'+icon+'</span>'+
            '<span style="flex:1;min-width:0"><b style="display:block">'+esc(r.title||r.file_name||'Material')+'</b>'+
              '<span style="color:#64748b;font-size:12.5px">'+esc(kind)+(r.file_size?(' · '+fmtBytes(r.file_size)):'')+'</span></span>'+
            '<span style="color:#2563eb;font-weight:600;font-size:13px">Open &#8599;</span></a>';
        });
        html+='</div>';
      });
      el.innerHTML=html;
    }catch(ex){ el.innerHTML='<p class="portal-sub" style="margin:0">Could not load materials right now.</p>'; }
  }
  async function loadLessons(){
    var el=document.getElementById('spLessons'); if(!el) return;
    try{
      var res=await sb().rpc('my_lessons');
      if(res && res.error){ el.innerHTML='<p class="portal-sub" style="margin:0">Lessons aren\'t available yet.</p>'; return; }
      var rows=(res && res.data) ? res.data : [];
      if(!rows.length){ el.innerHTML='<p class="portal-sub" style="margin:0">No labs or lessons have been added for your course(s) yet.</p>'; return; }
      var byCourse={};
      rows.forEach(function(r){ var k=r.course_name||'General'; (byCourse[k]=byCourse[k]||[]).push(r); });
      var html='';
      Object.keys(byCourse).forEach(function(course){
        html+='<div style="margin-bottom:14px"><div style="font-weight:700;color:#0f1b2d;margin-bottom:6px">'+esc(course)+'</div>';
        byCourse[course].forEach(function(r){
          html+='<button type="button" data-lesson="'+esc(r.id)+'" style="width:100%;text-align:left;display:flex;align-items:center;gap:12px;padding:11px 12px;border:1px solid #e6ebf3;border-radius:10px;background:#fff;cursor:pointer;margin-bottom:8px;font:inherit;color:#0f1b2d">'+
            '<span style="width:34px;height:34px;border-radius:8px;background:#eef4ff;display:flex;align-items:center;justify-content:center;flex:none">'+(r.kind==='lab'?'🧪':'📗')+'</span>'+
            '<span style="flex:1;min-width:0"><b style="display:block">'+esc(r.title||'Lesson')+'</b>'+
              (r.summary?'<span style="color:#64748b;font-size:12.5px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(r.summary)+'</span>':'')+'</span>'+
            '<span style="color:#2563eb;font-weight:600;font-size:13px">Open &#8599;</span></button>';
        });
        html+='</div>';
      });
      el.innerHTML=html;
      el.querySelectorAll('[data-lesson]').forEach(function(b){ b.addEventListener('click', function(){ openLesson(b.getAttribute('data-lesson')); }); });
    }catch(ex){ el.innerHTML='<p class="portal-sub" style="margin:0">Could not load lessons right now.</p>'; }
  }
  async function openLesson(id){
    window.scrollTo(0,0);
    root().innerHTML='<div class="portal-card"><p class="portal-sub" style="margin:0">Loading…</p></div>';
    function back(){ showPortal(); }
    try{
      var res=await sb().rpc('my_lesson', { p_id: id });
      var r=(res && res.data && res.data.length) ? res.data[0] : null;
      if(!r){
        root().innerHTML='<div class="portal-card"><p class="portal-sub">This lesson isn\'t available.</p><p><button class="link-btn" id="lsnBack">&#8592; Back</button></p></div>';
      }else{
        root().innerHTML=
          '<div class="portal-card">'+
            '<p style="margin:0 0 10px"><button class="link-btn" id="lsnBack">&#8592; Back to portal</button></p>'+
            '<h1 style="font-family:\'Poppins\',sans-serif;font-size:22px;margin:0 0 12px">'+esc(r.title||'Lesson')+'</h1>'+
            '<div class="lesson-body">'+(r.body||'<p>No content.</p>')+'</div>'+
            '<p style="margin-top:18px"><button class="link-btn" id="lsnBack2">&#8592; Back to portal</button></p>'+
          '</div>';
      }
    }catch(ex){
      root().innerHTML='<div class="portal-card"><p class="portal-sub">Could not load this lesson.</p><p><button class="link-btn" id="lsnBack">&#8592; Back</button></p></div>';
    }
    ['lsnBack','lsnBack2'].forEach(function(bid){ var b=document.getElementById(bid); if(b) b.addEventListener('click', back); });
  }
  function showAccessEnded(name){
    root().innerHTML =
      '<div class="portal-card">' +
        '<h1>Access ended</h1>' +
        '<p class="portal-sub">Hi '+esc(name)+', your portal access has ended because your enrolled course(s) have been completed.</p>' +
        '<div class="portal-note">To regain access, please enrol in a new class at Corelinks. Contact us if you think this is a mistake.</div>' +
        '<p style="margin-top:18px"><button class="link-btn" id="plOut">Sign out</button></p>' +
      '</div>';
    var out = document.getElementById('plOut'); if(out) out.addEventListener('click', logout);
    try{ sb().auth.signOut(); }catch(e){}
  }

  async function logout(){
    try{ await sb().auth.signOut(); }catch(e){}
    showLogin('You have been signed out.');
  }

  async function boot(){
    if(!sb()){ root().innerHTML = '<div class="portal-card"><p class="portal-sub">Portal is temporarily unavailable.</p></div>'; return; }
    try{
      var s = (await sb().auth.getSession()).data.session;
      if(s){ showPortal(); } else { showLogin(); }
    }catch(ex){ showLogin(); }
  }

  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', boot); }
  else { boot(); }
})();
