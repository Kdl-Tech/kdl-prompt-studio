import React from 'react';
import { AI_TARGETS, CATEGORIES, AUTONOMY, DETAIL, SECURITY, TONES, FORMATS, LANGS } from '../lib/data.js';
import { getAI } from '../lib/generator.js';

export default function Form({ form, setField, onReset }) {
  const ai = getAI(form.ai);
  return (
    <div className="card">
      <h2><span className="dot" /> Générateur</h2>

      <div className="field">
        <label>Objectif principal</label>
        <textarea
          value={form.objective}
          onChange={(e) => setField('objective', e.target.value)}
          placeholder="Ex : Créer une landing page responsive pour un service de dépannage informatique."
        />
      </div>

      <div className="field">
        <label>Contexte</label>
        <textarea
          value={form.context}
          onChange={(e) => setField('context', e.target.value)}
          placeholder="Public visé, stack, contraintes existantes, ce qui a déjà été fait…"
        />
      </div>

      <div className="row">
        <div className="field">
          <label>IA cible</label>
          <select value={form.ai} onChange={(e) => setField('ai', e.target.value)}>
            {AI_TARGETS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Type de tâche</label>
          <select value={form.category} onChange={(e) => setField('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="ai-hint">💡 {ai.hint}</div>

      <div className="row" style={{ marginTop: 12 }}>
        <div className="field">
          <label>Niveau d'autonomie</label>
          <select value={form.autonomy} onChange={(e) => setField('autonomy', e.target.value)}>
            {AUTONOMY.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Niveau de détail</label>
          <select value={form.detail} onChange={(e) => setField('detail', e.target.value)}>
            {DETAIL.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>Ton</label>
          <select value={form.tone} onChange={(e) => setField('tone', e.target.value)}>
            {TONES.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Format de sortie</label>
          <select value={form.format} onChange={(e) => setField('format', e.target.value)}>
            {FORMATS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>Langue de sortie</label>
          <select value={form.lang} onChange={(e) => setField('lang', e.target.value)}>
            {LANGS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Niveau de sécurité</label>
          <select value={form.security} onChange={(e) => setField('security', e.target.value)}>
            {SECURITY.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <label>Contraintes (une par ligne)</label>
        <textarea
          value={form.constraints}
          onChange={(e) => setField('constraints', e.target.value)}
          placeholder={"Ex : Aucune dépendance payante.\nCode commenté.\nCompatible mobile."}
        />
      </div>

      <div className="field">
        <label>À éviter (une par ligne)</label>
        <textarea
          value={form.avoid}
          onChange={(e) => setField('avoid', e.target.value)}
          placeholder={"Ex : jargon inutile\nréponses vagues"}
        />
      </div>

      <div className="field">
        <label>Exemples / références (optionnel)</label>
        <textarea
          value={form.examples}
          onChange={(e) => setField('examples', e.target.value)}
          placeholder="Colle un exemple de style, un extrait, une référence…"
        />
      </div>

      <div className="checks">
        <label className="check">
          <input type="checkbox" checked={form.wantTests} onChange={(e) => setField('wantTests', e.target.checked)} />
          Demander tests / validation
        </label>
        <label className="check">
          <input type="checkbox" checked={form.economy} onChange={(e) => setField('economy', e.target.checked)} />
          Mode économie de tokens
        </label>
      </div>

      <div className="btn-row" style={{ marginTop: 14 }}>
        <button className="btn ghost" onClick={onReset}>↺ Réinitialiser</button>
      </div>
    </div>
  );
}
