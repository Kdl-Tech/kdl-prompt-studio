import React from 'react';
import { getAI } from '../lib/generator.js';

function fmtDate(iso) {
  try { return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }); }
  catch { return iso; }
}

export default function History({ items, onCopy, onEdit, onDelete, onClear }) {
  return (
    <div className="card">
      <h2 style={{ justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="dot" /> Historique local</span>
        {items.length > 0 && (
          <button className="btn ghost danger" style={{ padding: '4px 10px', fontSize: 12 }} onClick={onClear}>Tout effacer</button>
        )}
      </h2>

      {items.length === 0 ? (
        <div className="empty">Aucun prompt sauvegardé pour l'instant. Génère puis clique sur « Sauvegarder ».</div>
      ) : (
        items.map((e) => (
          <div key={e.id} className="hist-item">
            <div className="hist-top">
              <span className="h-title">{e.title}</span>
              <span className="tag">{getAI(e.ai).label}</span>
              <span className="hist-meta">{fmtDate(e.date)}</span>
            </div>
            <div className="hist-meta" style={{ marginTop: 3 }}>{e.category}</div>
            <div className="hist-actions">
              <button className="btn" onClick={() => onCopy(e.prompt)}>Copier</button>
              <button className="btn" onClick={() => onEdit(e)}>Modifier</button>
              <button className="btn danger" onClick={() => onDelete(e.id)}>Supprimer</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
