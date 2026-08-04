<div align="center">

# ✍️ KDL Prompt Studio

**Turn a vague goal into a precise, structured prompt — tuned per AI (Claude, ChatGPT, Gemini, Mistral, Midjourney…). Runs entirely in your browser.**

[![License: MIT](https://img.shields.io/badge/License-MIT-1F5278.svg)](LICENSE)
[![100% local](https://img.shields.io/badge/Data-never%20leaves%20browser-22c55e.svg)](#privacy)
[![No API key](https://img.shields.io/badge/API%20key-not%20required-blue.svg)]()
[![Live demo](https://img.shields.io/badge/Live-kdl--tech.fr-1F5278.svg)](https://kdl-tech.fr/prompt-studio/)

**▶ Try it live: [kdl-tech.fr/prompt-studio](https://kdl-tech.fr/prompt-studio/)**

*🇫🇷 [Documentation française complète plus bas](#-documentation-française)*

</div>

---

## What it does

"Write me something good" is not a prompt. This tool walks you through what
actually makes a prompt work — goal, context, constraints, output format,
autonomy level, tone, safety — and generates a **structured prompt you can copy
straight out**, adapted to the target model's own conventions.

It also grades the result **out of 100** and tells you what is still missing.

### Features

- **Per-AI prompt profiles** — Claude, ChatGPT, Gemini, Mistral, Grok, Perplexity,
  Copilot, Claude Code, Codex, Midjourney, Stable Diffusion, or a custom target
- **20+ task types** — web dev, bug fixing, defensive security, SEO, marketing,
  copywriting, image generation, summarizing, system prompts, autonomous agents
- **11 ready-made modes** — Simple, Expert, Developer, Autonomous agent, Token-thrifty,
  Maximum safety, SEO, Image, Audit, Fix, Full build
- **15 editable templates** and an **automatic optimizer** (instruction order,
  safety constraints, format, token economy)
- **Image prompts** with negative prompt and parameters (Midjourney / Stable Diffusion)
- **Quality score /100** with actionable advice
- **Local history** (localStorage), export to clipboard, `.txt` or `.md`
- Dark, responsive UI

## Privacy

No API key, no account, no backend, no telemetry. Everything is computed in the
browser and your prompts stay in `localStorage`. You can run it fully offline by
serving the built folder yourself.

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # static build, host it anywhere
```

## Contributing

The most valuable contributions are **new per-model profiles** and template
improvements — if you have a prompt structure that reliably works on a given
model, open a PR. ⭐ helps others find it.

---

<a id="-documentation-française"></a>

## 🇫🇷 Documentation française

**Générateur local de prompts précis et optimisés pour différentes IA** — Claude, ChatGPT, Gemini, Mistral, Grok, Perplexity, Copilot, Claude Code, Codex, Midjourney, Stable Diffusion, et toute autre IA personnalisée.

App gratuite **KDL TECH** · code source public (MIT) · **100% local, aucune donnée envoyée**.

🔗 **App en ligne : https://kdl-tech.fr/prompt-studio/**

---

## 🎯 Présentation

KDL Prompt Studio transforme un simple objectif en un **prompt structuré, précis et directement copiable**, adapté au style de l'IA cible. Fini les prompts vagues du type « fais-moi un bon truc » : l'app vous guide (objectif, contexte, contraintes, format, autonomie, sécurité, ton…) et génère un prompt exploitable immédiatement, avec une **note de qualité /100** et des **conseils d'amélioration**.

Tout fonctionne dans le navigateur. Aucune clé API, aucun service payant, aucune donnée envoyée à un serveur.

## ✨ Fonctionnalités

- **Choix de l'IA cible** avec un profil de prompt adapté à chaque IA (rôle, structure, démarche).
- **20+ types de tâches** (dev web, correction de bug, cybersécurité défensive, SEO, marketing, rédaction, image, résumé, prompt système, agent autonome…).
- **Formulaire guidé complet** : objectif, contexte, autonomie, détail, ton, format, contraintes, à éviter, exemples, langue, tests, économie de tokens, sécurité.
- **11 modes prêts à l'emploi** : Simple, Expert, Développeur, Agent autonome, Économie de tokens, Sécurité maximale, SEO, Image, Audit, Correction, Création complète.
- **Optimisation automatique** : ordre des instructions, contraintes de sécurité, autonomie, format, économie de tokens.
- **Bibliothèque de 15 templates** modifiables (coder une app, corriger un bug, auditer un site, image, mail pro, business plan, prompt système, Claude Code autonome, Codex, etc.).
- **Prompts image** avec negative prompt et paramètres (Midjourney / Stable Diffusion).
- **Note de qualité /100** + conseils actionnables.
- **Historique local** (localStorage) : copier / modifier / supprimer.
- **Export** : presse-papiers, `.txt`, `.md`.
- **Interface sombre, moderne et responsive** (mobile / desktop).

## 🚀 Utilisation

- **En ligne (rien à installer)** : https://kdl-tech.fr/prompt-studio/
- **En local** : voir ci-dessous.

## 🛠️ Installation & lancement local

Prérequis : **Node.js 18+**.

```bash
npm install
npm run dev
```

Puis ouvrez l'URL affichée (par défaut `http://localhost:5180`).

### Autres commandes

```bash
npm run build     # build de production dans dist/
npm run preview   # prévisualise le build
npm test          # lance les tests (Vitest)
```

## 🗂️ Structure du projet

```
kdl-prompt-studio/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx            # point d'entrée React
│   ├── App.jsx             # orchestration de l'UI et de l'état
│   ├── styles.css          # thème sombre KDL
│   ├── lib/
│   │   ├── data.js         # profils IA, catégories, modes, options
│   │   ├── generator.js    # moteur : buildPrompt, scorePrompt, conseils
│   │   ├── templates.js    # bibliothèque de templates
│   │   └── history.js      # historique local (localStorage)
│   └── components/
│       ├── Form.jsx        # formulaire guidé
│       ├── Result.jsx      # prompt généré, score, export
│       ├── Templates.jsx   # bibliothèque
│       └── History.jsx     # historique
├── test/
│   └── generator.test.js   # tests du moteur
├── LICENSE                 # MIT
└── README.md
```

## 🔒 Confidentialité

- Traitement **100% local** dans le navigateur.
- **Aucun** prompt n'est envoyé à un service externe.
- **Aucune** clé API, aucun secret, aucun tracker.
- L'historique est stocké uniquement dans le `localStorage` de votre navigateur.

## ⚠️ Limites

- L'app **génère** des prompts ; elle **n'appelle pas** les IA (par choix : gratuit, local, sans clé API). Copiez le prompt dans l'IA de votre choix.
- Les profils IA reflètent des bonnes pratiques générales, à ajuster selon les évolutions de chaque IA.
- L'historique est lié au navigateur/appareil (pas de synchronisation cloud).

## 🛣️ Roadmap

- Import/export de l'historique (JSON).
- Variables réutilisables dans les templates.
- Éditeur de templates personnalisés persistés.
- Comparaison côte à côte de deux profils IA.
- Version PWA installable hors-ligne.

## 📄 Licence

MIT — libre d'utilisation, de modification et de distribution. © 2026 KDL TECH — Karim DeLucia.

---

<div align="center">

**Other tools by [KDL TECH](https://kdl-tech.fr)** — an independent computer repair
and software workshop in Guadeloupe 🇬🇵

[Anti-arnaque](https://github.com/Kdl-Tech/kdl-anti-arnaque) ·
[Privacy Dev Browser](https://github.com/Kdl-Tech/kdl-privacy-dev-browser) ·
[Prompt Studio](https://github.com/Kdl-Tech/kdl-prompt-studio) ·
[DNS Shield](https://github.com/Kdl-Tech/kdl-dns-shield) ·
[Security Free](https://github.com/Kdl-Tech/kdl-security-free) ·
[MAIA Conky](https://github.com/Kdl-Tech/maia-conky)

</div>
