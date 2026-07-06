import React, { useMemo, useState, useEffect } from 'react';
import { DEFAULT_FORM, MODES } from './lib/data.js';
import { buildPrompt, scorePrompt, applyMode, autoTitle } from './lib/generator.js';
import { getHistory, saveEntry, deleteEntry, clearHistory } from './lib/history.js';
import Form from './components/Form.jsx';
import Result from './components/Result.jsx';
import Templates from './components/Templates.jsx';
import History from './components/History.jsx';

function download(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [activeMode, setActiveMode] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => { setHistory(getHistory()); }, []);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const prompt = useMemo(() => buildPrompt(form), [form]);
  const { score, tips } = useMemo(() => scorePrompt(form), [form]);

  function pickMode(mode) {
    setActiveMode(mode.id === activeMode ? null : mode.id);
    if (mode.id !== activeMode) setForm((f) => applyMode(f, mode));
  }

  function pickTemplate(t) {
    setForm((f) => ({ ...DEFAULT_FORM, ...t.form }));
    setActiveMode(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function save() {
    const entry = saveEntry({
      title: autoTitle(form),
      ai: form.ai,
      category: form.category,
      prompt,
      form,
    });
    setHistory((h) => [entry, ...h]);
  }

  function exportFile(kind) {
    const name = autoTitle(form).replace(/[^\w\-À-ÿ ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 40) || 'prompt';
    download(`${name}.${kind}`, prompt);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
  }

  function editEntry(e) {
    setForm({ ...DEFAULT_FORM, ...e.form });
    setActiveMode(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function delEntry(id) { setHistory(deleteEntry(id)); }
  function clearAll() { setHistory(clearHistory()); }
  function reset() { setForm(DEFAULT_FORM); setActiveMode(null); }

  return (
    <div className="app">
      <div className="header">
        <div className="logo">K</div>
        <div>
          <h1>KDL Prompt Studio</h1>
          <div className="sub">Générateur local de prompts précis pour Claude, ChatGPT, Gemini, Codex, Midjourney & autres IA.</div>
        </div>
        <span className="badge-free">Gratuit</span>
      </div>

      <div className="privacy">🔒 <b>Traitement local</b> — aucune donnée envoyée. Tout reste dans votre navigateur.</div>

      <div className="modes">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={'chip' + (activeMode === m.id ? ' active' : '')}
            onClick={() => pickMode(m)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid">
        <Form form={form} setField={setField} onReset={reset} />
        <Result prompt={prompt} score={score} tips={tips} onSave={save} onExport={exportFile} />
      </div>

      <div className="bottom">
        <Templates onPick={pickTemplate} />
      </div>
      <div className="bottom">
        <History items={history} onCopy={copyText} onEdit={editEntry} onDelete={delEntry} onClear={clearAll} />
      </div>

      <div className="footer">
        KDL Prompt Studio — app gratuite <a href="https://kdl-tech.fr" target="_blank" rel="noreferrer">KDL TECH</a> · code source public (MIT) · 100% local.
      </div>
    </div>
  );
}
