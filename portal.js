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
            '<div class="portal-note">📚 Your tutorials and hands-on practice for your courses will appear here soon.</div>' +
            '<p style="margin-top:18px"><button class="link-btn" id="plOut">Sign out</button></p>' +
          '</div>';
      }
      var out = document.getElementById('plOut');
      if(out) out.addEventListener('click', logout);
    }catch(ex){
      root().innerHTML = '<div class="portal-card"><p class="portal-sub">Something went wrong loading your portal. Please try again.</p><p><button class="link-btn" id="plOut">Sign out</button></p></div>';
      var o = document.getElementById('plOut'); if(o) o.addEventListener('click', logout);
    }
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
