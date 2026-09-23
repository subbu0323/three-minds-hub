// Three Minds startup guard and live campfire asset fix.
(function(){
  const VERSION='tmh3_preflight_v4';
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
      img.src='https://raw.githubusercontent.com/subbu0323/three-minds-hub/main/assets/three-minds-campfire.webp?v=4';
      img.loading='eager';
      img.decoding='async';
    }
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fixCampfire,{once:true});
  else fixCampfire();
})();