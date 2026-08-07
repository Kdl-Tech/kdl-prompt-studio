**Français** · [English](README.en.md)

# KDL Prompt Studio

Un formulaire à remplir, et en face le prompt structuré correspondant — écrit dans les
conventions du modèle que vous visez, noté sur 100, prêt à copier.

**→ Essayer en ligne : [kdl-tech.fr/prompt-studio](https://kdl-tech.fr/prompt-studio/)**
— rien à installer, rien à créer comme compte.

![Interface de KDL Prompt Studio : à gauche le formulaire rempli (objectif, contexte, IA cible Claude, contraintes), à droite le prompt Markdown généré avec les sections Rôle, Objectif, Contexte, Mission et Contraintes, et une note de qualité de 82/100](docs/screenshot-generateur.png)

## Le problème

« Écris-moi quelque chose de bien » n'est pas un prompt. Ce qui fait la différence entre
une réponse creuse et une réponse utilisable tient à des éléments qu'on oublie presque
toujours dans la précipitation : l'objectif réel, le contexte, les contraintes, le format
attendu, le niveau d'autonomie laissé au modèle, ce qu'il ne doit surtout pas faire.

Cet outil pose ces questions à votre place, et assemble la réponse.

## Ce que ça fait

| | |
|---|---|
| **12 profils d'IA** | Claude, ChatGPT, Gemini, Mistral, Grok, Perplexity, Copilot, Claude Code, Codex, Midjourney, Stable Diffusion, profil générique |
| **20 types de tâches** | développement web, correction de bug, sécurité défensive, SEO, marketing, rédaction, génération d'image, synthèse, prompts système, agents autonomes… |
| **11 modes** | Simple, Expert, Développeur, Agent autonome, Économie de tokens, Sécurité maximale, SEO, Image, Audit, Correction, Création complète |
| **15 modèles éditables** | points de départ pour les situations courantes |
| **Note /100** | avec la liste de ce qui manque encore |
| **Prompts image** | negative prompt et paramètres, à la syntaxe du générateur visé |
| **Historique local** | sauvegarde, export presse-papiers, `.txt` ou `.md` |

## Le score n'est pas décoratif

Neuf critères pondérés (`src/lib/generator.js`) : un objectif d'au moins douze
caractères vaut 22 points, le contexte 16, un exemple de référence 10, une exigence de
sécurité ou de validation 8, et ainsi de suite. Chaque critère non rempli produit la
phrase qui dit quoi ajouter — pas une jauge vague, une liste d'actions.

Sur la capture ci-dessus, 82/100 : il manque un exemple de style et une exigence de
validation. Les deux conseils affichés à droite sont exactement ces deux critères.

## Un détail qui compte : l'exclusion en génération d'image

Dire à une IA ce qu'on **ne veut pas** ne s'écrit pas de la même façon partout. Stable
Diffusion attend un champ `Negative prompt:` séparé ; Midjourney ne connaît pas ce champ
et utilise le paramètre `--no`. Coller un prompt Stable Diffusion dans Midjourney fait
donc apparaître le mot « Negative » **dans l'image**.

L'outil génère la bonne forme selon la cible : bloc `Negative prompt:` plus paramètres
d'échantillonnage pour Stable Diffusion, `--no ... --ar 16:9 --v 6 --style raw` pour
Midjourney.

## Ce que ça ne fait pas

- **Il n'appelle aucune IA.** Il fabrique le prompt ; c'est vous qui le collez chez
  Claude, ChatGPT ou ailleurs. Aucune clé API n'est demandée parce qu'aucune n'est utile.
- **Il ne juge pas votre sujet**, seulement la complétude de votre formulaire. Un prompt
  noté 100/100 sur un mauvais objectif reste un mauvais prompt.
- **Il ne synchronise rien.** L'historique vit dans le `localStorage` du navigateur : en
  changer ou vider le cache, c'est le perdre.
- **Pas de compte, pas de serveur, pas de télémétrie.** Rien à sauvegarder côté KDL, donc
  rien à fuiter.

## Installation locale

```bash
git clone https://github.com/Kdl-Tech/kdl-prompt-studio.git
cd kdl-prompt-studio
npm install
npm run dev        # http://localhost:5180
```

Pour un usage hors ligne complet, construire puis servir le dossier statique :

```bash
npm run build      # produit dist/
npx serve dist     # ou n'importe quel serveur de fichiers
```

Tests : `npm test` — 14 tests Vitest sur le générateur, le score et les modèles.

## Prérequis

Node.js 18 ou plus pour le développement. À l'usage, un navigateur récent suffit :
tout s'exécute côté client (React 18 + Vite 7), sans backend.

## Licence

MIT — voir [LICENSE](LICENSE). Utilisation libre, y compris commerciale.

---

**KDL TECH** — dépannage informatique, développement et outils logiciels.
[kdl-tech.fr](https://kdl-tech.fr)
