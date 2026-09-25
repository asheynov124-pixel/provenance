import { DEFAULT_PACK_NAME, type Visit } from "../data/types";

const KEY = "provenance.currentVisit";
const STOOD_KEY = "provenance.stoodAt";

function nid(): string {
  return `visit-${Date.now().toString(36)}`;
}

export function emptyVisit(): Visit {
  return {
    id: nid(),
    name: DEFAULT_PACK_NAME,
    startedAt: new Date().toISOString(),
    workIds: [],
  };
}

export function loadVisit(): Visit {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyVisit();
    const parsed = JSON.parse(raw) as Visit;
    if (!parsed?.id || !Array.isArray(parsed.workIds)) return emptyVisit();
    return parsed;
  } catch {
    return emptyVisit();
  }
}

export function loadStoodAt(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STOOD_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function persist(visit: Visit, stoodAt: Record<string, string>): void {
  localStorage.setItem(KEY, JSON.stringify(visit));
  localStorage.setItem(STOOD_KEY, JSON.stringify(stoodAt));
}

export function standAt(workId: string): Visit {
  const visit = loadVisit();
  const stoodAt = loadStoodAt();
  const now = new Date().toISOString();
  if (visit.workIds[visit.workIds.length - 1] !== workId) {
    visit.workIds = [...visit.workIds, workId];
  }
  stoodAt[workId] = now;
  if (!visit.startedAt) visit.startedAt = now;
  persist(visit, stoodAt);
  return visit;
}

export function removeStop(workId: string): Visit {
  const visit = loadVisit();
  visit.workIds = visit.workIds.filter((id) => id !== workId);
  persist(visit, loadStoodAt());
  return visit;
}

export function renameVisit(name: string): Visit {
  const visit = { ...loadVisit(), name: name.trim() || DEFAULT_PACK_NAME };
  persist(visit, loadStoodAt());
  return visit;
}

export function resetVisit(): Visit {
  const visit = emptyVisit();
  persist(visit, {});
  return visit;
}
