// Three Minds startup guard and live campfire asset fix.
(function(){
  const VERSION='tmh3_preflight_v5';
  if(localStorage.getItem(VERSION)!=='done'){
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && k.indexOf('tmh3_')===0) keys.push(k);
    }
    keys.forEach(k=>localStorage.removeItem(k));
    localStorage.setItem(VERSION,'done');
  }
  const fixCampfire=()=>{
    const img=document.querySelector('.campfireHero');
    if(img){
      img.src='assets/three-minds-campfire-live.webp?v=20260923';
      img.loading='eager';
      img.decoding='async';
    }
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fixCampfire,{once:true});
  else fixCampfire();
})();