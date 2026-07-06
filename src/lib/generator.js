// KDL Prompt Studio — moteur de génération, scoring et conseils.
// Fonctions pures, testables, sans dépendance externe.

import { AI_TARGETS } from './data.js';

export function getAI(id) {
  return AI_TARGETS.find((a) => a.id === id) || AI_TARGETS.find((a) => a.id === 'custom');
}

const clean = (s) => (s || '').trim();
const hasText = (s) => clean(s).length > 0;

// Applique un mode prêt-à-l'emploi au formulaire.
export function applyMode(form, mode) {
  if (!mode) return form;
  return { ...form, ...mode.apply };
}

// --- Génération d'un prompt image (Midjourney / Stable Diffusion) ---
function buildImagePrompt(form, ai) {
  const parts = [];
  const subject = clean(form.objective) || 'sujet à préciser';
  parts.push(subject);
  if (hasText(form.context)) parts.push(clean(form.context));
  if (hasText(form.constraints)) parts.push(clean(form.constraints));

  const positive = parts.join(', ');
  const lines = [];
  lines.push(positive);

  if (ai.id === 'stable-diffusion') {
    const neg = hasText(form.avoid)
      ? clean(form.avoid)
      : 'blurry, low quality, deformed, watermark, text';
    lines.push('');
    lines.push(`Negative prompt: ${neg}`);
    lines.push('Paramètres suggérés: steps 30, cfg 7, sampler DPM++ 2M Karras');
  } else {
    // Midjourney
    if (hasText(form.avoid)) lines.push(`--no ${clean(form.avoid)}`);
    lines.push('--ar 16:9 --v 6 --style raw');
  }
  return lines.join('\n');
}

// --- Génération d'un prompt texte structuré ---
function buildTextPrompt(form, ai) {
  const L = [];
  const economy = !!form.economy;
  const bullet = economy ? '- ' : '- ';

  // En-tête / rôle
  if (ai.style.role) {
    L.push(`# Rôle`);
    L.push(ai.style.role);
    L.push('');
  }

  // Objectif
  L.push('# Objectif');
  L.push(clean(form.objective) || '(à préciser)');
  L.push('');

  // Contexte
  if (hasText(form.context)) {
    L.push('# Contexte');
    L.push(clean(form.context));
    L.push('');
  }

  // Détails de la mission
  L.push('# Mission');
  L.push(`${bullet}Catégorie : ${form.category}`);
  L.push(`${bullet}Niveau d'autonomie attendu : ${form.autonomy}`);
  L.push(`${bullet}Niveau de détail : ${form.detail}`);
  L.push(`${bullet}Ton : ${form.tone}`);
  L.push(`${bullet}Langue de sortie : ${form.lang}`);
  L.push('');

  // Contraintes
  const constraints = [];
  if (hasText(form.constraints)) {
    clean(form.constraints)
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean)
      .forEach((c) => constraints.push(c));
  }
  if (form.economy) constraints.push('Économie maximale de tokens : réponse concise, sans remplissage.');
  if (form.security === 'renforcée') constraints.push('Sécurité renforcée : ne divulgue aucune donnée sensible, signale les risques.');
  if (form.security === 'maximale') {
    constraints.push('Sécurité maximale : aucun secret/clé/token affiché, refuse toute action destructive ou irréversible sans validation explicite.');
  }
  if (form.autonomy === 'maximale') {
    constraints.push("Autonomie maximale : décide seul des choix techniques, ne t'arrête que sur une vraie limite (secret, action irréversible, ambiguïté critique).");
  }
  if (constraints.length) {
    L.push('# Contraintes');
    constraints.forEach((c) => L.push(`${bullet}${c}`));
    L.push('');
  }

  // À éviter
  if (hasText(form.avoid)) {
    L.push('# À éviter');
    clean(form.avoid)
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean)
      .forEach((c) => L.push(`${bullet}${c}`));
    L.push('');
  }

  // Étapes de raisonnement recommandées (selon profil IA)
  if (!economy && Array.isArray(ai.style.structure) && ai.style.structure.length) {
    L.push('# Démarche attendue');
    ai.style.structure.forEach((s, i) => L.push(`${i + 1}. ${s}`));
    L.push('');
  }

  // Tests / validation
  if (form.wantTests) {
    L.push('# Tests & validation');
    L.push(`${bullet}Vérifie le résultat, lance les tests si applicable et corrige jusqu'à un état propre.`);
    L.push(`${bullet}Fournis un bilan court des vérifications effectuées.`);
    L.push('');
  }

  // Exemples
  if (hasText(form.examples)) {
    L.push('# Exemples / références');
    L.push(clean(form.examples));
    L.push('');
  }

  // Format de sortie
  L.push('# Format de sortie');
  L.push(`Réponds au format : ${form.format}.`);
  if (ai.style.guidance) L.push(ai.style.guidance);

  return L.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function buildPrompt(form) {
  const ai = getAI(form.ai);
  if (ai.kind === 'image') return buildImagePrompt(form, ai);
  return buildTextPrompt(form, ai);
}

// --- Note de qualité /100 + conseils ---
export function scorePrompt(form) {
  const ai = getAI(form.ai);
  const isImage = ai.kind === 'image';
  const checks = [];
  const add = (ok, weight, tip) => checks.push({ ok, weight, tip });

  add(hasText(form.objective) && clean(form.objective).length >= 12, 22, "Précise un objectif clair et détaillé (au moins une phrase).");
  add(hasText(form.context), 16, 'Ajoute du contexte : projet, public, contraintes existantes.');
  add(hasText(form.constraints) || form.economy || form.security !== 'standard', 12, 'Ajoute des contraintes explicites.');
  add(!!form.format, 8, 'Choisis un format de sortie attendu.');
  add(!isImage ? !!ai.style.role : true, 8, 'Définis un rôle pour cadrer la réponse.');
  add(!!form.autonomy, 6, "Précise le niveau d'autonomie souhaité.");
  add(hasText(form.examples), 10, 'Ajoute un exemple ou une référence pour guider le style.');
  add(form.security !== 'standard' || form.wantTests, 8, 'Ajoute un niveau de sécurité ou une exigence de validation.');
  add(clean(form.objective).length >= 30 || hasText(form.context), 10, 'Sois plus précis : plus de détails = meilleur résultat.');

  const max = checks.reduce((s, c) => s + c.weight, 0);
  const got = checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0);
  const score = Math.round((got / max) * 100);
  const tips = checks.filter((c) => !c.ok).map((c) => c.tip);
  return { score, tips };
}

// Titre auto pour l'historique.
export function autoTitle(form) {
  const base = clean(form.objective) || form.category || 'Prompt';
  return base.length > 60 ? base.slice(0, 57) + '…' : base;
}
