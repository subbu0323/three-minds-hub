// Three Minds Hub: one-time clean start for the new version.
// This removes old demo/user-generated browser data once, then lets the app start fresh.
(function(){
  const RESET_KEY='tmh3_clean_start_2026_v1';
  if(localStorage.getItem(RESET_KEY)==='done') return;
  const keys=['members','posts','memories','media','files','goals','events','notes','cur','dark','remember'];
  keys.forEach(k=>localStorage.removeItem('tmh3_'+k));
  localStorage.setItem(RESET_KEY,'done');
  location.reload();
})();
