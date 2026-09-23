// Lightweight startup guard: clears legacy Three Minds browser data once without reloading the page.
(function(){
  const VERSION='tmh3_preflight_v3';
  if(localStorage.getItem(VERSION)==='done') return;
  const keys=[];
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k && k.indexOf('tmh3_')===0) keys.push(k);
  }
  keys.forEach(k=>localStorage.removeItem(k));
  localStorage.setItem(VERSION,'done');
})();