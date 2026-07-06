import React, { useState } from 'react';

function ringColor(score) {
  if (score >= 80) return 'var(--green)';
  if (score >= 55) return 'var(--amber)';
  return 'var(--red)';
}

export default function Result({ prompt, score, tips, onSave, onExport }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card">
      <div className="result-head">
        <h2 style={{ margin: 0 }}><span className="dot" /> Prompt généré</h2>
        <div className="score">
          <div className="ring" style={{ '--pct': score, '--ringcolor': ringColor(score) }}>
            <span>{score}</span>
          </div>
          <div className="label">Qualité<br />/ 100</div>
        </div>
      </div>

      <pre className="output">{prompt}</pre>

      <div className="btn-row">
        <button className={'btn primary' + (copied ? ' copied' : '')} onClick={copy}>
          {copied ? '✓ Copié' : '📋 Copier'}
        </button>
        <button className="btn" onClick={() => onExport('txt')}>⬇ .txt</button>
        <button className="btn" onClick={() => onExport('md')}>⬇ .md</button>
        <button className="btn" onClick={onSave}>💾 Sauvegarder</button>
      </div>

      <div className="tips">
        <h3>Conseils pour améliorer</h3>
        {tips.length === 0 ? (
          <ul><li className="ok">✓ Prompt complet : rien à améliorer.</li></ul>
        ) : (
          <ul>{tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
        )}
      </div>
    </div>
  );
}
