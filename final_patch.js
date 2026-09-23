(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const K='tmh3_';
function patch(){
  const title=$('#login h1'); if(title) title.textContent='Welcome back 😊';
  const flag=document.querySelector('.flagIndia'); if(flag){flag.style.position='relative';const st=document.createElement('style');st.textContent='.flagIndia:after{display:none!important}.flagIndia svg{display:block!important}';document.head.appendChild(st)}
  const who=$('#who'); if(who){const last=localStorage.getItem('tmh3_last_member'); if(last && who.querySelector(`option[value="${last}"]`)) who.value=last; who.style.minHeight='46px';who.style.paddingRight='42px';who.style.fontSize='15px';who.style.borderRadius='14px';}
  const pass=$('#pass'); if(pass){pass.style.minHeight='46px';pass.style.borderRadius='14px'}
  const remember=$('#rememberMe'); if(remember){remember.closest('#rememberRow')?.style.setProperty('margin-top','2px')}
  const signin=$('#signin'); if(signin && !signin.dataset.finalPatch){signin.dataset.finalPatch='1';signin.addEventListener('click',()=>{setTimeout(()=>{const m=$('#who')?.value;if($('#rememberMe')?.checked&&m){localStorage.setItem('tmh3_last_member',m);localStorage.setItem('tmh3_remember','1')}else{localStorage.removeItem('tmh3_last_member');localStorage.removeItem('tmh3_remember')}},150)})}
  if(window.members){const id=localStorage.getItem(K+'cur');const grid=$('#profilesGrid');if(grid&&id){const card=[...grid.children].find(c=>c.querySelector('.avatar')&&c.querySelector('h4')?.textContent===window.members.find(m=>m.id===id)?.name);if(card)grid.prepend(card)}}
  const menu=$('#menu'); $$('#menu a').forEach(a=>{if(!a.dataset.finalPatch){a.dataset.finalPatch='1';a.addEventListener('click',()=>menu?.classList.remove('open'))}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();
new MutationObserver(patch).observe(document.body,{childList:true,subtree:true});
})();