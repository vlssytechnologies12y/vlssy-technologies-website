function loadPartial(selector, file) {
  var target = document.querySelector(selector);
  if (!target) return Promise.resolve();
  return fetch(file)
    .then(function (response) {
      if (!response.ok) throw new Error('Unable to load ' + file);
      return response.text();
    })
    .then(function (html) {
      var template = document.createElement('template');
      template.innerHTML = html.trim();
      target.replaceWith(template.content);
    })
    .catch(function () {});
}

function setupSite() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a').forEach(function (link) {
    if (link.getAttribute('href').split('#')[0] === currentPage) link.classList.add('is-active');
  });
  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.primary-nav');
  if (header) window.addEventListener('scroll', function () { header.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }); });
  }
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: .12 });
    reveals.forEach(function (item) { observer.observe(item); });
  } else reveals.forEach(function (item) { item.classList.add('is-visible'); });
  var params = new URLSearchParams(window.location.search);
  var serviceField = document.querySelector('#service');
  var requestedService = params.get('service');
  if (requestedService && serviceField) {
    var option = serviceField.querySelector('option[value="' + requestedService + '"]');
    if (option) serviceField.value = requestedService;
  }
  var form = document.querySelector('[data-contact-form]');
  var status = document.querySelector('[data-form-status]');
  if (form && status) form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!form.checkValidity()) { status.className = 'form-status is-error'; status.textContent = 'Please complete the required fields so we can understand your enquiry.'; form.reportValidity(); return; }
    var submitButton = form.querySelector('button[type="submit"]');
    var originalLabel = submitButton ? submitButton.innerHTML : '';
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Sending...'; }
    status.className = 'form-status';
    status.textContent = '';
    var formData = new FormData(form);
    var company = String(formData.get('company') || '').trim();
    var phone = String(formData.get('phone') || '').trim();
    var selectedService = form.querySelector('#service option:checked');
    var extraDetails = [company && 'Company: ' + company, phone && 'Phone: ' + phone].filter(Boolean).join('\n');
    var message = String(formData.get('message') || '').trim();
    if (extraDetails) message = extraDetails + '\n\n' + message;
    try {
      var response = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: formData.get('name'), email: formData.get('email'), subject: selectedService ? selectedService.textContent.trim() : '', message: message }) });
      var result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Unable to send your message.');
      status.className = 'form-status is-ready';
      status.textContent = result.message || 'Your message has been sent successfully.';
      form.reset();
    } catch (error) {
      status.className = 'form-status is-error';
      status.textContent = 'We could not send your message right now. Please try again or email us directly.';
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.innerHTML = originalLabel; }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  Promise.all([loadPartial('header.site-header', 'header.html'), loadPartial('footer.site-footer', 'footer.html')]).then(setupSite);
});
