// KDL Prompt Studio — bibliothèque de templates modifiables.
// Chaque template pré-remplit le formulaire ; l'utilisateur peut ensuite tout éditer.

export const TEMPLATES = [
  {
    id: 'code-app',
    title: 'Coder une app complète',
    form: {
      ai: 'claude-code', category: "Création d'application", autonomy: 'maximale', detail: 'élevé',
      tone: 'professionnel', format: 'Markdown', wantTests: true, security: 'renforcée',
      objective: "Créer une application web complète, propre et maintenable.",
      context: "Stack libre mais moderne (React/Vite ou Node/Express). Fonctionnement local sans dépendance payante.",
      constraints: "Code propre et commenté au besoin.\nAucune clé API obligatoire.\nAucun service payant.",
    },
  },
  {
    id: 'fix-bug',
    title: 'Corriger un bug',
    form: {
      ai: 'claude-code', category: 'Correction de bug', autonomy: 'moyenne', detail: 'élevé',
      tone: 'technique', format: 'Markdown', wantTests: true,
      objective: "Identifier et corriger le bug décrit ci-dessous sans introduire de régression.",
      context: "Décris le comportement attendu, le comportement observé, et les étapes de reproduction.",
      constraints: "Changement minimal et ciblé.\nExplique la cause racine.\nAjoute un test qui couvre le cas.",
    },
  },
  {
    id: 'audit-site',
    title: 'Auditer un site',
    form: {
      ai: 'claude', category: 'Cybersécurité défensive', autonomy: 'faible', detail: 'élevé',
      tone: 'rigoureux', format: 'Tableau', security: 'renforcée',
      objective: "Réaliser un audit technique et sécurité (défensif) du site indiqué.",
      context: "URL / stack du site. Audit défensif uniquement, sans intrusion.",
      constraints: "Classe les problèmes par sévérité.\nPropose une correction concrète pour chaque point.",
    },
  },
  {
    id: 'seo',
    title: 'Améliorer le SEO',
    form: {
      ai: 'chatgpt', category: 'SEO', autonomy: 'moyenne', detail: 'élevé', tone: 'professionnel', format: 'Markdown',
      objective: "Améliorer le référencement naturel de la page/site indiqué.",
      context: "Sujet, cible, mots-clés visés, langue.",
      constraints: "Recommandations actionnables : title, meta, Hn, contenu, maillage, perf.",
    },
  },
  {
    id: 'image',
    title: 'Créer une image',
    form: {
      ai: 'midjourney', category: 'Image', detail: 'élevé', tone: 'créatif', format: 'Prompt image (mots-clés)',
      objective: "Illustration à décrire (sujet, ambiance, style).",
      context: "Style artistique, palette, ambiance souhaitée.",
      constraints: "Composition, lumière, cadrage.",
      avoid: "texte, watermark, déformations",
    },
  },
  {
    id: 'email',
    title: 'Rédiger un email professionnel',
    form: {
      ai: 'chatgpt', category: 'Email', autonomy: 'faible', detail: 'moyen', tone: 'professionnel', format: 'Texte libre',
      objective: "Rédiger un email professionnel clair et courtois.",
      context: "Destinataire, objectif du mail, éléments clés à transmettre.",
      constraints: "Ton adapté, concis, appel à l'action clair.",
    },
  },
  {
    id: 'business-plan',
    title: 'Créer un plan business',
    form: {
      ai: 'claude', category: 'Business', autonomy: 'moyenne', detail: 'élevé', tone: 'professionnel', format: 'Markdown',
      objective: "Élaborer un plan business synthétique pour le projet décrit.",
      context: "Idée, marché, cible, ressources disponibles.",
      constraints: "Sections : problème, solution, marché, modèle éco, go-to-market, risques.",
    },
  },
  {
    id: 'competitive',
    title: 'Analyse concurrentielle',
    form: {
      ai: 'perplexity', category: 'Business', autonomy: 'faible', detail: 'élevé', tone: 'rigoureux', format: 'Tableau',
      objective: "Analyser les principaux concurrents du produit/marché indiqué.",
      context: "Produit, secteur, zone géographique.",
      constraints: "Cite des sources.\nComparatif : forces, faiblesses, prix, positionnement.",
    },
  },
  {
    id: 'system-prompt',
    title: 'Créer un prompt système',
    form: {
      ai: 'claude', category: 'Prompt système', autonomy: 'faible', detail: 'élevé', tone: 'professionnel', format: 'Markdown',
      objective: "Rédiger un prompt système pour cadrer le comportement d'un assistant IA.",
      context: "Rôle de l'assistant, domaine, limites, ton attendu.",
      constraints: "Définir : identité, mission, règles, limites, format de réponse.",
    },
  },
  {
    id: 'claude-code-auto',
    title: 'Claude Code en autonomie',
    form: {
      ai: 'claude-code', category: 'Agent autonome', autonomy: 'maximale', detail: 'élevé',
      tone: 'professionnel', format: 'Markdown', wantTests: true, security: 'renforcée', economy: true,
      objective: "Réaliser la tâche décrite en autonomie maximale dans ce dépôt.",
      context: "Analyse le repo avant d'agir.",
      constraints: "Modifications ciblées.\nLance les tests et corrige jusqu'à un état propre.\nBackup avant modif importante.\nBilan + rollback à la fin.",
    },
  },
  {
    id: 'codex-patch',
    title: 'Codex : modifier un projet',
    form: {
      ai: 'codex', category: 'Assistant développeur (Claude Code / Codex)', autonomy: 'moyenne', detail: 'élevé',
      tone: 'technique', format: 'Code', wantTests: true, economy: true,
      objective: "Modifier le projet pour réaliser la tâche technique décrite.",
      context: "Décris les fichiers concernés et le résultat attendu.",
      constraints: "Patch propre et minimal.\nAjoute/mets à jour les tests.\nÉconomie de tokens.",
    },
  },
  {
    id: 'summarize',
    title: 'Résumer un document',
    form: {
      ai: 'claude', category: 'Résumé', autonomy: 'faible', detail: 'moyen', tone: 'clair', format: 'Liste à puces',
      objective: "Résumer fidèlement le document fourni.",
      context: "Colle le document ou son extrait ci-dessous.",
      constraints: "Reste fidèle au texte.\nDistingue faits et interprétations.\nRésumé + points clés.",
    },
  },
  {
    id: 'html-page',
    title: 'Générer une page HTML complète',
    form: {
      ai: 'claude', category: 'Développement web', autonomy: 'moyenne', detail: 'élevé', tone: 'technique', format: 'Code',
      objective: "Générer une page HTML complète, responsive et autonome (CSS/JS inline).",
      context: "Thème, sections attendues, style visuel.",
      constraints: "Un seul fichier.\nResponsive.\nAucune dépendance externe.",
    },
  },
  {
    id: 'marketing',
    title: 'Créer une stratégie marketing',
    form: {
      ai: 'chatgpt', category: 'Marketing', autonomy: 'moyenne', detail: 'élevé', tone: 'professionnel', format: 'Markdown',
      objective: "Élaborer une stratégie marketing pour le produit/service indiqué.",
      context: "Produit, cible, budget, canaux disponibles.",
      constraints: "Plan actionnable : positionnement, canaux, calendrier, KPIs.",
    },
  },
  {
    id: 'specs',
    title: 'Transformer une idée en cahier des charges',
    form: {
      ai: 'claude', category: "Création d'application", autonomy: 'moyenne', detail: 'élevé', tone: 'rigoureux', format: 'Markdown',
      objective: "Transformer l'idée décrite en cahier des charges structuré.",
      context: "Décris l'idée, les utilisateurs et les objectifs.",
      constraints: "Sections : objectifs, périmètre, fonctionnalités, contraintes, livrables, jalons.",
    },
  },
];
