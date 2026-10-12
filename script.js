(function(){
  var pages=[].slice.call(document.querySelectorAll('.page')),tabs=[].slice.call(document.querySelectorAll('.tabs a')),toc=document.getElementById('toc'),spy=null;
  function show(){
    var h=location.hash.slice(1),tab=h.split('/')[0];
    if(!document.getElementById('page-'+tab)){tab='install';}
    pages.forEach(function(p){p.hidden=p.id!=='page-'+tab});
    tabs.forEach(function(a){a.dataset.tab===tab?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
    var heads=[].slice.call(document.querySelectorAll('#page-'+tab+' h2'));
    toc.innerHTML='';
    heads.forEach(function(h){var a=document.createElement('a');a.href='#'+tab+'/'+h.id;a.textContent=h.textContent;a.dataset.id=h.id;toc.appendChild(a)});
    document.title=document.querySelector('.tabs a[data-tab="'+tab+'"]').textContent+' - Easy Shaders Documentation';
    if(spy)spy.disconnect();
    spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){[].forEach.call(toc.children,function(a){a.classList.toggle('on',a.dataset.id===e.target.id)})}})},{rootMargin:'-90px 0px -70% 0px'});
    heads.forEach(function(h){spy.observe(h)});
    var id=h.split('/')[1],t=id&&document.getElementById(id);
    if(t){t.scrollIntoView()}else{window.scrollTo(0,0)}
  }
  toc.addEventListener('click',function(e){var a=e.target.closest('a');if(a){e.preventDefault();var id=a.dataset.id;history.replaceState(null,'',a.getAttribute('href'));document.getElementById(id).scrollIntoView()}});
  window.addEventListener('hashchange',show);show();
})();
