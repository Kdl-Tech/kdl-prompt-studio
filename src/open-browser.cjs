// KDL — ouvre l'URL locale dans le navigateur par défaut (Windows / macOS / Linux).
// But : quand on lance l'exécutable, l'app s'ouvre toute seule au lieu d'afficher
// juste une adresse dans une fenêtre. Aucune dépendance externe.
const { spawn } = require('child_process');

function ouvrirNavigateur(url) {
  // Échappatoire pour serveurs headless / tests / CI.
  if (process.env.KDL_NO_BROWSER === '1') return;
  try {
    const p = process.platform;
    let cmd, args, opts = { detached: true, stdio: 'ignore' };
    if (p === 'win32') {
      // cmd start : le premier "" est le titre de fenêtre (obligatoire si URL entre guillemets).
      cmd = 'cmd'; args = ['/c', 'start', '', url];
    } else if (p === 'darwin') {
      cmd = 'open'; args = [url];
    } else {
      cmd = 'xdg-open'; args = [url];
    }
    const child = spawn(cmd, args, opts);
    child.on('error', () => {}); // navigateur introuvable : on n'empêche pas le serveur de tourner
    child.unref();
  } catch (_) { /* jamais bloquer le démarrage du serveur */ }
}

module.exports = { ouvrirNavigateur };
