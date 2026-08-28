document.addEventListener('DOMContentLoaded',function(){
  var header=document.querySelector('[data-header]');
  var toggle=document.querySelector('.menu-toggle');
  var nav=document.querySelector('.primary-nav');
  if(header){window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>8)},{passive:true})}
  if(toggle&&nav){toggle.addEventListener('click',function(){var open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')})})}
  var reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12});reveals.forEach(function(item){observer.observe(item)})}else{reveals.forEach(function(item){item.classList.add('is-visible')})}
  var params=new URLSearchParams(window.location.search);var requestedService=params.get('service');var serviceField=document.querySelector('#service');if(requestedService&&serviceField){var option=serviceField.querySelector('option[value="'+requestedService+'"]');if(option)serviceField.value=requestedService}
  var form=document.querySelector('[data-contact-form]');var status=document.querySelector('[data-form-status]');
  if(form&&status){form.addEventListener('submit',function(event){event.preventDefault();if(!form.checkValidity()){status.className='form-status is-error';status.textContent='Please complete the required fields so we can understand your enquiry.';form.reportValidity();return}status.className='form-status is-ready';status.textContent='Your enquiry is prepared. This static site is not connected to a backend yet, so no message has been sent.'})}
});
