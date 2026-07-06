// KDL Prompt Studio — données statiques (profils IA, catégories, modes, options)
// Aucune donnée sensible. 100% local.

export const AI_TARGETS = [
  {
    id: 'claude',
    label: 'Claude',
    hint: 'Contexte clair, objectifs, contraintes, format, raisonnement structuré, prudence.',
    style: {
      role: "Tu es un assistant expert, rigoureux et prudent.",
      structure: ['Contexte', 'Objectif', 'Contraintes', 'Étapes de raisonnement', 'Format de sortie'],
      guidance: "Raisonne étape par étape. Signale toute hypothèse ou incertitude avant d'agir.",
    },
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    hint: 'Rôle, objectif, contexte, étapes, format final, exemples si utiles.',
    style: {
      role: "Agis en tant qu'expert du domaine concerné.",
      structure: ['Rôle', 'Objectif', 'Contexte', 'Étapes', 'Format final'],
      guidance: "Fournis une réponse structurée et directement exploitable.",
    },
  },
  {
    id: 'gemini',
    label: 'Gemini',
    hint: 'Contexte multimodal, synthèse structurée, raisonnement large.',
    style: {
      role: "Tu es un assistant analytique capable de raisonnement large et de synthèse.",
      structure: ['Contexte', 'Objectif', 'Analyse', 'Synthèse structurée', 'Format'],
      guidance: "Prends en compte le contexte multimodal si pertinent et synthétise clairement.",
    },
  },
  {
    id: 'mistral',
    label: 'Mistral',
    hint: 'Instructions courtes, précises, efficaces.',
    style: {
      role: "Tu es un assistant efficace et direct.",
      structure: ['Objectif', 'Contexte essentiel', 'Contraintes', 'Format'],
      guidance: "Va droit au but. Instructions courtes et précises.",
    },
  },
  {
    id: 'grok',
    label: 'Grok',
    hint: 'Réponse directe, factuelle, avec un ton assumé si demandé.',
    style: {
      role: "Tu es un assistant direct et factuel.",
      structure: ['Objectif', 'Contexte', 'Contraintes', 'Format'],
      guidance: "Réponds sans détour, en restant factuel et sourcé si possible.",
    },
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    hint: 'Recherche, sources, citations, synthèse factuelle.',
    style: {
      role: "Tu es un moteur de recherche-réponse factuel.",
      structure: ['Question', 'Contexte', 'Exigences de sources', 'Format de synthèse'],
      guidance: "Cite des sources fiables et vérifiables. Sépare les faits des hypothèses.",
    },
  },
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    hint: 'Contexte code, fichiers, contraintes techniques, étapes de modification.',
    style: {
      role: "Tu es un assistant de code intégré à l'éditeur.",
      structure: ['Contexte du code', 'Fichiers concernés', 'Contraintes techniques', 'Étapes de modification'],
      guidance: "Propose des modifications ciblées et compatibles avec le code existant.",
    },
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    hint: 'Autonomie, analyse du repo, modifications ciblées, tests, bilan, rollback.',
    style: {
      role: "Tu es Claude Code, un agent de développement autonome dans un dépôt.",
      structure: ['Objectif', 'Analyse du repo', 'Plan', 'Modifications ciblées', 'Tests', 'Bilan & rollback'],
      guidance: "Analyse le dépôt avant d'agir, fais des changements ciblés, lance les tests, corrige, et fournis un bilan avec plan de rollback.",
    },
  },
  {
    id: 'codex',
    label: 'Codex',
    hint: 'Tâche technique claire, fichiers attendus, tests, patchs propres.',
    style: {
      role: "Tu es un agent de génération de code produisant des patchs propres.",
      structure: ['Tâche technique', 'Fichiers attendus', 'Contraintes', 'Tests', 'Patch final'],
      guidance: "Produis des patchs propres et testés, en économisant les tokens.",
    },
  },
  {
    id: 'midjourney',
    label: 'Midjourney',
    kind: 'image',
    hint: 'Sujet, style, lumière, composition, ratio, paramètres.',
    style: {
      structure: ['Sujet', 'Style', 'Lumière', 'Composition', 'Paramètres'],
      guidance: "Prompt visuel dense en mots-clés. Ajoute les paramètres (--ar, --v, --style, --q).",
    },
  },
  {
    id: 'stable-diffusion',
    label: 'Stable Diffusion',
    kind: 'image',
    hint: 'Sujet, style, détails visuels, negative prompt, paramètres.',
    style: {
      structure: ['Sujet', 'Style', 'Détails visuels', 'Negative prompt', 'Paramètres'],
      guidance: "Prompt positif + negative prompt. Précise steps, cfg scale, sampler, seed si utile.",
    },
  },
  {
    id: 'custom',
    label: 'Autre IA personnalisée',
    hint: 'Profil générique adaptable à n\'importe quelle IA.',
    style: {
      role: "Tu es un assistant expert.",
      structure: ['Rôle', 'Objectif', 'Contexte', 'Contraintes', 'Format'],
      guidance: "Suis précisément les instructions ci-dessous.",
    },
  },
];

export const CATEGORIES = [
  'Développement web',
  'Correction de bug',
  "Création d'application",
  'Cybersécurité défensive',
  'SEO',
  'Marketing',
  'Rédaction',
  'Email',
  'Business',
  'Image',
  'Vidéo',
  'Audio',
  'Automatisation',
  'Analyse de document',
  'Résumé',
  'Traduction',
  'Apprentissage',
  'Prompt système',
  'Agent autonome',
  'Assistant développeur (Claude Code / Codex)',
];

export const MODES = [
  { id: 'simple', label: 'Simple', apply: { detail: 'faible', autonomy: 'faible', tone: 'clair' } },
  { id: 'expert', label: 'Expert', apply: { detail: 'élevé', autonomy: 'moyenne', tone: 'professionnel' } },
  { id: 'dev', label: 'Développeur', apply: { detail: 'élevé', autonomy: 'moyenne', tone: 'technique', tests: true } },
  { id: 'agent', label: 'Agent autonome', apply: { detail: 'élevé', autonomy: 'maximale', tone: 'professionnel', tests: true } },
  { id: 'tokens', label: 'Économie de tokens', apply: { detail: 'faible', tone: 'concis', economy: true } },
  { id: 'secure', label: 'Sécurité maximale', apply: { detail: 'élevé', security: 'maximale', tone: 'prudent' } },
  { id: 'seo', label: 'SEO', apply: { detail: 'élevé', tone: 'professionnel', category: 'SEO' } },
  { id: 'image', label: 'Image', apply: { detail: 'élevé', tone: 'créatif', category: 'Image' } },
  { id: 'audit', label: 'Audit', apply: { detail: 'élevé', autonomy: 'faible', tone: 'rigoureux' } },
  { id: 'fix', label: 'Correction', apply: { detail: 'élevé', autonomy: 'moyenne', tone: 'technique', category: 'Correction de bug', tests: true } },
  { id: 'full', label: 'Création complète', apply: { detail: 'élevé', autonomy: 'maximale', tone: 'professionnel', tests: true, category: "Création d'application" } },
];

export const AUTONOMY = ['faible', 'moyenne', 'élevée', 'maximale'];
export const DETAIL = ['faible', 'moyen', 'élevé'];
export const SECURITY = ['standard', 'renforcée', 'maximale'];
export const TONES = ['clair', 'professionnel', 'technique', 'concis', 'créatif', 'pédagogique', 'prudent', 'rigoureux', 'amical'];
export const FORMATS = ['Texte libre', 'Liste à puces', 'Étapes numérotées', 'Markdown', 'Tableau', 'JSON', 'Code', 'Prompt image (mots-clés)'];
export const LANGS = ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Identique à la question'];

export const DEFAULT_FORM = {
  objective: '',
  context: '',
  ai: 'claude',
  category: 'Développement web',
  autonomy: 'moyenne',
  detail: 'moyen',
  tone: 'professionnel',
  format: 'Markdown',
  constraints: '',
  avoid: '',
  examples: '',
  lang: 'Français',
  wantTests: false,
  economy: false,
  security: 'standard',
};
