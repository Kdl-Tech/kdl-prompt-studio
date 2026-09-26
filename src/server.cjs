#!/usr/bin/env node
/**
 * KDL Prompt Studio — serveur local.
 *
 * L'application est un site statique (React/Vite). Pour la livrer comme les
 * autres apps KDL — un fichier a telecharger, un double-clic, ca s'ouvre — on
 * sert le dossier dist/ depuis un petit serveur local et on ouvre le navigateur.
 *
 * Tout reste sur la machine : ecoute sur 127.0.0.1 uniquement, aucune donnee
 * ne sort, aucune dependance externe.
 */
'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const { ouvrirNavigateur } = require('./open-browser.cjs');

const PORT_PAR_DEFAUT = 4250;
const HOTE = '127.0.0.1';

// Sous pkg, les fichiers embarques sont lus depuis le snapshot via __dirname.
const RACINE = path.join(__dirname, '..', 'dist');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

/** Empeche de sortir de dist/ via ../ dans l'URL. */
function cheminSur(urlPath) {
  const propre = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const relatif = path.normalize(propre).replace(/^(\.\.[/\\])+/, '');
  const complet = path.join(RACINE, relatif);
  if (!complet.startsWith(RACINE)) return null;
  return complet;
}

function servir(reponse, fichier, code = 200) {
  let contenu;
  try {
    contenu = fs.readFileSync(fichier);
  } catch (_) {
    reponse.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return reponse.end('Fichier introuvable');
  }
  const type = TYPES[path.extname(fichier).toLowerCase()] || 'application/octet-stream';
  reponse.writeHead(code, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  reponse.end(contenu);
}

const serveur = http.createServer((requete, reponse) => {
  // Le build web vit sous /prompt-studio/ (kdl-tech.fr) : on accepte ce préfixe comme la racine.
  const demande = requete.url.replace(/^\/prompt-studio(?=\/|\?|$)/, '') || '/';
  let cible = cheminSur(demande === '/' || demande.startsWith('/?') ? '/index.html' : demande);
  if (!cible) {
    reponse.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return reponse.end('Chemin invalide');
  }
  // Application a page unique : toute route inconnue retombe sur index.html.
  if (!fs.existsSync(cible) || fs.statSync(cible).isDirectory()) {
    cible = path.join(RACINE, 'index.html');
  }
  servir(reponse, cible);
});

/** Si le port est pris, on essaie le suivant plutot que d'echouer. */
function demarrer(port, essaisRestants = 10) {
  serveur.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && essaisRestants > 0) {
      return demarrer(port + 1, essaisRestants - 1);
    }
    console.error('Impossible de demarrer :', err.message);
    process.exit(1);
  });
  serveur.listen(port, HOTE, () => {
    const url = `http://${HOTE}:${port}/`;
    console.log('KDL Prompt Studio');
    console.log(`  ouvert sur ${url}`);
    console.log('  Ctrl+C pour quitter.');
    ouvrirNavigateur(url);
  });
}

const portDemande = parseInt(process.env.KDL_PORT || '', 10);
demarrer(Number.isInteger(portDemande) ? portDemande : PORT_PAR_DEFAUT);
