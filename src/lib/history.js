// KDL Prompt Studio — historique local (localStorage). Aucune donnée envoyée.

const KEY = 'kdl-prompt-studio.history.v1';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* quota/localStorage indisponible : on ignore silencieusement */
  }
}

export function getHistory() {
  return read();
}

export function saveEntry({ title, ai, category, prompt, form }) {
  const list = read();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    date: new Date().toISOString(),
    title,
    ai,
    category,
    prompt,
    form,
  };
  list.unshift(entry);
  write(list.slice(0, 200)); // borne raisonnable
  return entry;
}

export function deleteEntry(id) {
  write(read().filter((e) => e.id !== id));
  return read();
}

export function clearHistory() {
  write([]);
  return [];
}
