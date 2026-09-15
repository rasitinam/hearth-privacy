// Shows the Turkish or English copy. Order of preference: ?lang= (the app
// passes its own language), the reader's last choice, then the browser.
(function () {
  function pick(code) {
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('on', el.getAttribute('data-lang') === code);
    });
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === code));
    });
    document.documentElement.lang = code;
    try { localStorage.setItem('hearth_legal_lang', code); } catch (e) {}
  }

  var query = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('hearth_legal_lang'); } catch (e) {}
  var browser = (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  var initial = query === 'tr' || query === 'en' ? query : saved === 'tr' || saved === 'en' ? saved : browser;

  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { pick(b.dataset.set); });
  });
  pick(initial);
})();
