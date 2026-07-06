import { describe, it, expect } from 'vitest';
import { buildPrompt, scorePrompt, applyMode, autoTitle, getAI } from '../src/lib/generator.js';
import { DEFAULT_FORM, MODES, AI_TARGETS } from '../src/lib/data.js';
import { TEMPLATES } from '../src/lib/templates.js';

const base = { ...DEFAULT_FORM, objective: 'Créer une landing page responsive pour un service KDL.' };

describe('buildPrompt — texte', () => {
  it('génère un prompt structuré avec objectif et format', () => {
    const p = buildPrompt(base);
    expect(p).toContain('# Objectif');
    expect(p).toContain('landing page responsive');
    expect(p).toContain('# Format de sortie');
  });

  it('inclut le rôle du profil IA', () => {
    const p = buildPrompt({ ...base, ai: 'claude' });
    expect(p).toContain('# Rôle');
  });

  it('ajoute les contraintes de sécurité maximale', () => {
    const p = buildPrompt({ ...base, security: 'maximale' });
    expect(p.toLowerCase()).toContain('sécurité maximale');
  });

  it('ajoute une section tests quand demandé', () => {
    const p = buildPrompt({ ...base, wantTests: true });
    expect(p).toContain('# Tests & validation');
  });

  it('mode économie de tokens raccourcit (pas de démarche détaillée)', () => {
    const full = buildPrompt({ ...base });
    const eco = buildPrompt({ ...base, economy: true });
    expect(full).toContain('# Démarche attendue');
    expect(eco).not.toContain('# Démarche attendue');
  });
});

describe('buildPrompt — image', () => {
  it('Stable Diffusion inclut un negative prompt', () => {
    const p = buildPrompt({ ...base, ai: 'stable-diffusion', avoid: 'blurry' });
    expect(p).toContain('Negative prompt:');
  });

  it('Midjourney inclut des paramètres --ar', () => {
    const p = buildPrompt({ ...base, ai: 'midjourney' });
    expect(p).toContain('--ar');
  });
});

describe('scorePrompt', () => {
  it('donne un score bas pour un formulaire vide', () => {
    const { score } = scorePrompt(DEFAULT_FORM);
    expect(score).toBeLessThan(50);
  });

  it('donne un score élevé pour un formulaire complet', () => {
    const { score, tips } = scorePrompt({
      ...base,
      objective: 'Créer une landing page responsive et accessible pour un service de dépannage informatique KDL TECH.',
      context: 'Public : particuliers. Stack : HTML/CSS/JS.',
      constraints: 'Aucune dépendance payante.',
      examples: 'Style proche de kdl-tech.fr.',
      security: 'renforcée',
      wantTests: true,
    });
    expect(score).toBeGreaterThanOrEqual(80);
    expect(Array.isArray(tips)).toBe(true);
  });

  it('retourne des conseils actionnables', () => {
    const { tips } = scorePrompt(DEFAULT_FORM);
    expect(tips.length).toBeGreaterThan(0);
  });
});

describe('applyMode', () => {
  it('applique le mode agent autonome', () => {
    const agent = MODES.find((m) => m.id === 'agent');
    const f = applyMode(base, agent);
    expect(f.autonomy).toBe('maximale');
    expect(f.tests).toBe(true);
  });
});

describe('templates & profils', () => {
  it('chaque template référence une IA valide et génère un prompt', () => {
    for (const t of TEMPLATES) {
      const ai = AI_TARGETS.find((a) => a.id === t.form.ai);
      expect(ai, `IA inconnue: ${t.form.ai}`).toBeTruthy();
      const p = buildPrompt({ ...DEFAULT_FORM, ...t.form });
      expect(p.length).toBeGreaterThan(20);
    }
  });

  it('getAI retombe sur custom si id inconnu', () => {
    expect(getAI('nope').id).toBe('custom');
  });
});

describe('autoTitle', () => {
  it('tronque les titres longs', () => {
    const t = autoTitle({ ...base, objective: 'x'.repeat(120) });
    expect(t.length).toBeLessThanOrEqual(60);
  });
});
