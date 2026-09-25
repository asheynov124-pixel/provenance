import type { Room, Work } from "../data/types";

const HIDE_RE = /coffin|mummy|sarcophagus|tomb|burial|funerary|arms and armor/i;

export function shouldHideGraphic(work: Work, room?: Room): boolean {
  if (work.hideGraphic) return true;
  if (room?.hideGraphicDefault) return true;
  const type = work.type.trim().toLowerCase();
  if (type === "funerary equipment" || type === "arms and armor") return true;
  return HIDE_RE.test(`${work.title} ${work.type} ${work.department} ${work.tombstone}`);
}
