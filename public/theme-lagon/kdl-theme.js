/* KDL TECH — bascule clair / sombre commune au site et aux apps.
   Clair par défaut (ne suit pas le système), choix mémorisé dans localStorage 'kdl-theme'.
   Usage :
     1. dans <head>, AVANT les feuilles de style (anti-flash) :
        <script>try{document.documentElement.setAttribute('data-theme',localStorage.getItem('kdl-theme')==='dark'?'dark':'light')}catch(e){document.documentElement.setAttribute('data-theme','light')}</script>
     2. placer <span data-kdl-theme-btn></span> là où doit apparaître le bouton ;
     3. charger ce fichier (defer). Libellés FR / EN / ES selon <html lang>.
   Événement émis à chaque bascule : document 'kdl-theme' (detail = 'light' | 'dark'). */
(function () {
  var racine = document.documentElement;
  var CLE = 'kdl-theme';
  var TX = {
    fr: ['Activer le thème sombre', 'Activer le thème clair'],
    en: ['Switch to dark theme', 'Switch to light theme'],
    es: ['Activar el tema oscuro', 'Activar el tema claro']
  };
  var lang = (racine.getAttribute('lang') || 'fr').slice(0, 2);
  var L = TX[lang] || TX.fr;
  var SVG = '<svg class="soleil" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
    '<svg class="lune" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 14.6A8.3 8.3 0 0 1 9.4 3.8a8.3 8.3 0 1 0 10.8 10.8z" fill="currentColor"/></svg>';

  function lire() { try { return localStorage.getItem(CLE) === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; } }
  if (!racine.getAttribute('data-theme')) racine.setAttribute('data-theme', lire());

  function maj() {
    var sombre = racine.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.kdl-theme-btn').forEach(function (b) {
      var l = sombre ? L[1] : L[0];
      b.setAttribute('aria-label', l); b.setAttribute('title', l);
    });
  }
  function appliquer(t) {
    racine.setAttribute('data-theme', t);
    try { localStorage.setItem(CLE, t); } catch (e) {}
    maj();
    document.dispatchEvent(new CustomEvent('kdl-theme', { detail: t }));
  }
  function monter() {
    document.querySelectorAll('[data-kdl-theme-btn]').forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'kdl-theme-btn'; b.innerHTML = SVG;
      p.replaceWith(b);
    });
    document.querySelectorAll('.kdl-theme-btn').forEach(function (b) {
      if (b.dataset.kdlPret) return;
      b.dataset.kdlPret = '1';
      b.addEventListener('click', function () { appliquer(racine.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });
    });
    maj();
  }
  // Même choix d'un onglet à l'autre (site et apps sur le même domaine).
  window.addEventListener('storage', function (e) { if (e.key === CLE) { racine.setAttribute('data-theme', e.newValue === 'dark' ? 'dark' : 'light'); maj(); } });
  window.KDLTheme = { appliquer: appliquer, actuel: function () { return racine.getAttribute('data-theme'); }, monter: monter };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', monter); else monter();
})();
