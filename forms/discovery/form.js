(function(){
  /* ===================================================================
     EMBER & FRAMES form submit mechanism
     To enable email + Google Drive saving, deploy EmberFrames_Form_Backend.gs
     as a Web App and paste its /exec URL between the quotes below.
     Left blank, the form still autosaves and lets clients download/email
     their answers, so nothing is lost.
  =================================================================== */
  window.EF_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwVlgWJqd8LacgMfff_mQgj8GGulJB51bNCzWO9n9FqarwOgoKWJsUyh13M9RDohCBN/exec";

  var FORM_ID   = "discovery";
  var FORM_NAME = "Brand Discovery Questionnaire";
  var STORAGE   = "ef_" + FORM_ID + "_draft";
  var TEAM      = ["hello@emberandframes.com"];
  var form = document.getElementById(FORM_ID);
  var LOADED = Date.now();
  var draftRestored = false;

  /* Copyright year is filled here so no file carries a value that goes stale. */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Each field pairs a plain <label> with its control. That reads correctly on
     screen but is not programmatically associated, so a screen reader announces
     the control with no name. Wire every pair once, here, rather than hand-
     maintaining an id on every field. */
  (function linkLabels() {
    var seq = 0;
    Array.prototype.forEach.call(document.querySelectorAll("label"), function (lab) {
      if (lab.getAttribute("for") || lab.querySelector("input,select,textarea")) return;
      var scope = lab.parentNode;
      if (!scope) return;
      var ctrl = scope.querySelector("input:not([type=radio]):not([type=checkbox]):not([type=hidden]),select,textarea");
      if (!ctrl || ctrl === lab) return;
      if (!ctrl.id) ctrl.id = "ef-f-" + (ctrl.name || "field") + "-" + (++seq);
      lab.setAttribute("for", ctrl.id);
    });
  })();

  function els(){ return Array.prototype.slice.call(form.querySelectorAll('input,textarea,select')); }
  function labelFor(el){ if(el.id){ var l=form.querySelector('label[for="'+el.id+'"]'); if(l) return l.textContent.trim(); } return el.value||'on'; }

  function collect(){
    var d={};
    els().forEach(function(el){
      if(!el.name) return;
      if(el.type==='radio'){ if(el.checked) d[el.name]=labelFor(el); }
      else if(el.type==='checkbox'){ if(el.checked){ (d[el.name]=d[el.name]||[]).push(el.value||labelFor(el)); } }
      else if(el.value!=='') d[el.name]=el.value;
    });
    return d;
  }

  function save(){ try{ localStorage.setItem(STORAGE, JSON.stringify(collect())); }catch(e){} }
  function restore(){
    var raw; try{ raw=localStorage.getItem(STORAGE); }catch(e){} if(!raw) return;
    var d; try{ d=JSON.parse(raw); }catch(e){ return; }
    els().forEach(function(el){
      if(!el.name || !(el.name in d)) return; var v=d[el.name];
      if(el.type==='radio'){ if(labelFor(el)===v) el.checked=true; }
      else if(el.type==='checkbox'){ if(Array.isArray(v)&&v.indexOf(el.value||labelFor(el))>-1) el.checked=true; }
      else el.value=v;
    });
    draftRestored=true;
    setStatus('Draft restored from this device. Your earlier answers are back.','busy');
  }
  form.addEventListener('input',save); form.addEventListener('change',save);

  function pretty(k){ return k.replace(/_/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();}); }
  function qLabel(name){ var el=form.querySelector('[name="'+name+'"]'); if(el){ var q=el.closest('.q,.field'); if(q){ var l=q.querySelector('label'); if(l) return l.textContent.trim(); } } return pretty(name); }
  function asText(d){
    var out=[FORM_NAME,'Ember & Frames · '+new Date().toLocaleString(),'',''];
    Object.keys(d).forEach(function(k){ if(k==='form'||k==='client'||k==='ef_hp'||k==='ef_elapsed') return; var v=d[k]; if(Array.isArray(v)) v=v.join(', '); out.push(qLabel(k)); out.push(String(v)); out.push(''); });
    return out.join('\n');
  }
  function fileName(d){ var n=(d.brand||d.name||'client').replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,''); return 'EmberFrames-'+FORM_ID+'-'+n+'.txt'; }

  function download(){ var d=collect(); var b=new Blob([asText(d)],{type:'text/plain;charset=utf-8'}); var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=fileName(d); document.body.appendChild(a); a.click(); a.remove(); }

  /* Seconds spent on the page, which the backend uses to spot a script. Omitted when a
     saved draft was restored, because a returning client can legitimately submit at once. */
  function payload(){ var d=collect(); d.form=FORM_NAME; d.client=d.brand||d.name||''; if(!draftRestored) d.ef_elapsed=Math.round((Date.now()-LOADED)/1000); return d; }

  function submit(){
    var d=payload();
    if(!d.client){ setStatus('Please add your name or brand near the top so we know whose answers these are.','busy'); return; }
    if(window.EFPixel) window.EFPixel.track('Lead',{content_name:FORM_NAME,content_category:'Questionnaire'},{email:d.email,phone:d.phone});
    setStatus('Sending your answers','busy');
    if(window.EF_FORM_ENDPOINT){
      /* mode:'no-cors' makes the response opaque, so a rejection here does NOT mean the POST
         failed. Apps Script answers /exec with a redirect, and the browser can reject after the
         server has already accepted and saved the submission. Falling back to a download plus a
         mail draft at that point asks the client to send us answers we already have. Only the
         offline copy of this form, which carries no endpoint, still falls back. */
      fetch(window.EF_FORM_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d)})
        .then(function(){ sent(true); }).catch(function(){ sent(false); });
    } else { fallback(d); }
  }
  /* The saved draft is cleared only when the request actually resolved, so an unconfirmed send
     leaves the client's answers on their device rather than throwing them away. */
  function sent(confirmed){
    if(confirmed){ try{ localStorage.removeItem(STORAGE); }catch(e){} setStatus('Your answers have been submitted. Thank you. We will be in touch shortly.','ok'); return; }
    setStatus('We could not confirm this submission. Your answers are still saved on this device. Please check your connection and contact us before sending again.','busy');
  }
  function fallback(d){
    var IS_MOBILE=/Android|iPhone|iPad|iPod|Mobile|Silk/i.test(navigator.userAgent||'');
    var full=asText(d);
    try{ if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(full); } }catch(e){}
    if(!IS_MOBILE){ download(); }
    var subject=encodeURIComponent(FORM_NAME+': '+(d.client||''));
    var intro=IS_MOBILE
      ? 'Hi Ember & Frames,\n\nHere are my '+FORM_NAME+' answers (also copied to my clipboard).\n\n'
      : 'Hi Ember & Frames,\n\nMy '+FORM_NAME+' answers have downloaded to my device as '+fileName(d)+'. My full answers are also below.\n\n';
    var body=encodeURIComponent(intro+full.slice(0,1600));
    var openMail=function(){ window.location.href='mailto:'+TEAM.join(',')+'?subject='+subject+'&body='+body; };
    if(IS_MOBILE){ openMail(); } else { setTimeout(openMail,400); }
    setStatus(IS_MOBILE
      ? 'Your answers are copied to your clipboard and an email draft has opened. Just hit send, or paste them into an email to '+TEAM.join(' / ')+'.'
      : 'Your answers were downloaded and an email draft opened. Hit send, or attach the file and email it to '+TEAM.join(' / ')+'.','ok');
  }

  var statusEl;
  function setStatus(msg,kind){ statusEl=statusEl||document.getElementById('ef-status'); if(statusEl){ statusEl.textContent=msg; statusEl.className='ef-status '+(kind||''); statusEl.style.display='block'; statusEl.scrollIntoView({behavior:'smooth',block:'nearest'}); } }

  window.efSubmit=submit; window.efDownload=download;
  window.clearForm=function(){ if(confirm('Clear all answers?')){ form.reset(); try{localStorage.removeItem(STORAGE);}catch(e){} if(statusEl) statusEl.style.display='none'; } };

  restore();


  function on(id, fn){ var el=document.getElementById(id); if(el) el.addEventListener('click', fn); }
  on('ef-btn-submit', submit);
  on('ef-btn-download', download);
  on('ef-btn-print', function(){ window.print(); });
  on('ef-btn-clear', window.clearForm);
})();
