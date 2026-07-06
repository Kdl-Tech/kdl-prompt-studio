import React from 'react';
import { TEMPLATES } from '../lib/templates.js';
import { getAI } from '../lib/generator.js';

export default function Templates({ onPick }) {
  return (
    <div className="card">
      <h2><span className="dot" /> Bibliothèque de templates</h2>
      <div className="tpl-grid">
        {TEMPLATES.map((t) => (
          <button key={t.id} className="tpl" onClick={() => onPick(t)}>
            <div className="t">{t.title}</div>
            <div className="m">{getAI(t.form.ai).label} · {t.form.category}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
