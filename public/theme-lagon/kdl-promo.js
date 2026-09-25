/* KDL TECH — encart promo discret, commun à toutes les apps.
   Usage : <aside data-kdl-promo data-app="qr"></aside> + ce fichier (defer) + kdl-theme.css.
   - Choisit au hasard un vrai service ou une vraie app KDL TECH (jamais l'app courante : data-app).
   - 100 % local : aucune requête, aucun pistage, aucune régie externe. Seul le lien, s'il est cliqué, ouvre kdl-tech.fr.
   - Masquable 7 jours (localStorage 'kdl-promo-off').
   Offres = uniquement des faits publiés sur kdl-tech.fr (tarifs, apps). Les mettre à jour ici si le site change. */
(function () {
  var SITE = 'https://kdl-tech.fr';
  var lang = (document.documentElement.getAttribute('lang') || 'fr').slice(0, 2);
  if (['fr', 'en', 'es'].indexOf(lang) < 0) lang = 'fr';
  var i = { fr: 0, en: 1, es: 2 }[lang];
  var ETI = ['Proposé par KDL TECH', 'From KDL TECH', 'Por KDL TECH'][i];
  var MASQ = ['Masquer pendant 7 jours', 'Hide for 7 days', 'Ocultar durante 7 días'][i];
  // [id, texte FR/EN/ES, lien FR/EN/ES, action FR/EN/ES]
  var OFFRES = [
    ['depannage', ['Ordinateur lent ou en panne ? Diagnostic 30 €, offert si KDL TECH répare. Atelier aux Abymes.', 'Slow or broken computer? Diagnosis €30, free if KDL TECH repairs it. Workshop in Les Abymes.', '¿Ordenador lento o averiado? Diagnóstico 30 €, gratis si KDL TECH lo repara. Taller en Les Abymes.'],
      ['/tarifs/', '/en/prices/', '/es/precios/'], ['Voir les tarifs', 'See prices', 'Ver precios']],
    ['distance', ['Dépannage à distance sur Windows, Mac ou Linux, partout en France. Sur devis, prix annoncé avant.', 'Remote support for Windows, Mac or Linux. Quote first, price agreed before we start.', 'Asistencia remota en Windows, Mac o Linux. Presupuesto previo, precio acordado antes.'],
      ['/assistance/', '/en/remote-support/', '/es/asistencia-remota/'], ['En savoir plus', 'Learn more', 'Más información']],
    ['site', ['Un site clair pour présenter votre activité, créé et entretenu en Guadeloupe. Dès 890 €.', 'A clear website for your business, built and maintained in Guadeloupe. From €890.', 'Una web clara para su actividad, creada y mantenida en Guadalupe. Desde 890 €.'],
      ['/creation-site-web-guadeloupe/', '/en/website-design-guadeloupe/', '/es/diseno-web-guadalupe/'], ['Découvrir', 'Discover', 'Descubrir']],
    ['cyclone', ['KDL Cyclone : la veille cyclonique des Antilles, en direct et gratuite.', 'KDL Cyclone: live Caribbean hurricane watch, free.', 'KDL Cyclone: vigilancia ciclónica de las Antillas, en directo y gratis.'],
      ['/logiciels/kdl-cyclone/', '/en/software/kdl-cyclone/', '/es/programas/kdl-cyclone/'], ['Ouvrir', 'Open', 'Abrir']],
    ['protect', ['Un fichier douteux ? KDL Protect l’analyse avec l’antivirus déjà présent sur votre PC. Gratuit.', 'A suspicious file? KDL Protect scans it with the antivirus already on your PC. Free.', '¿Un archivo sospechoso? KDL Protect lo analiza con el antivirus de su PC. Gratis.'],
      ['/logiciels/kdl-protect/', '/en/software/kdl-protect/', '/es/programas/kdl-protect/'], ['Télécharger', 'Download', 'Descargar']],
    ['anti-arnaque', ['SMS ou mail suspect ? KDL Anti-arnaque vous dit si c’est une arnaque, et quoi faire. Gratuit.', 'Suspicious text or email? KDL Anti-arnaque tells you if it is a scam, and what to do. Free.', '¿SMS o correo sospechoso? KDL Anti-arnaque le dice si es una estafa y qué hacer. Gratis.'],
      ['/logiciels/kdl-anti-arnaque/', '/en/software/kdl-anti-arnaque/', '/es/programas/kdl-anti-arnaque/'], ['Télécharger', 'Download', 'Descargar']],
    ['qr', ['KDL QR : vos QR codes (lien, Wi-Fi, contact) créés dans le navigateur, rien n’est envoyé.', 'KDL QR: QR codes (link, Wi-Fi, contact) made in your browser, nothing is sent.', 'KDL QR: códigos QR (enlace, Wi-Fi, contacto) creados en su navegador, nada se envía.'],
      ['/qr/', '/qr/', '/qr/'], ['Ouvrir', 'Open', 'Abrir']],
    ['pass', ['KDL Pass : des mots de passe forts générés sur votre appareil, jamais envoyés.', 'KDL Pass: strong passwords generated on your device, never sent.', 'KDL Pass: contraseñas fuertes generadas en su dispositivo, nunca enviadas.'],
      ['/pass/', '/pass/', '/pass/'], ['Ouvrir', 'Open', 'Abrir']]
  ];

  function masque() { try { return Date.now() < +(localStorage.getItem('kdl-promo-off') || 0); } catch (e) { return false; } }

  function monter() {
    document.querySelectorAll('[data-kdl-promo]').forEach(function (el) {
      if (el.dataset.kdlPret) return;
      el.dataset.kdlPret = '1';
      if (masque()) { el.hidden = true; return; }
      var app = el.getAttribute('data-app') || '';
      var liste = OFFRES.filter(function (o) { return o[0] !== app; });
      var o = liste[Math.floor(Math.random() * liste.length)];
      el.classList.add('kdl-promo');
      el.setAttribute('aria-label', ETI);
      el.innerHTML = '<span class="kdl-promo__eti"></span><p class="kdl-promo__txt"></p><a class="kdl-promo__lien" target="_blank" rel="noopener"></a><button type="button" class="kdl-promo__x">×</button>';
      el.querySelector('.kdl-promo__eti').textContent = ETI;
      el.querySelector('.kdl-promo__txt').textContent = o[1][i];
      var a = el.querySelector('.kdl-promo__lien');
      a.textContent = o[3][i] + ' →';
      a.href = SITE + o[2][i] + '?utm_source=app-' + (app || 'kdl') + '&utm_medium=encart';
      var x = el.querySelector('.kdl-promo__x');
      x.setAttribute('aria-label', MASQ); x.title = MASQ;
      x.addEventListener('click', function () {
        try { localStorage.setItem('kdl-promo-off', String(Date.now() + 7 * 864e5)); } catch (e) {}
        el.hidden = true;
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', monter); else monter();
})();
