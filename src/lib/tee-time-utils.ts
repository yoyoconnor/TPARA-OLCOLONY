/** Parse "7:00 AM" / "12:30 PM" to minutes from midnight (0-1439) */
export function timeToMinutes(timeStr: string): number {
  const match = timeStr.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  const m = match[2] ? parseInt(match[2], 10) : 0;
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

/** Minutes from midnight to "7:00 AM" style string */
export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  const ampm = h < 12 ? "AM" : "PM";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

const SLOT_INTERVAL_MINUTES = 12;

/** Generate time slot strings from firstTeeTime to lastTeeTime (inclusive), every 12 min */
export function generateTimeSlots(firstTeeTime: string, lastTeeTime: string): string[] {
  const start = timeToMinutes(firstTeeTime);
  const end = timeToMinutes(lastTeeTime);
  const slots: string[] = [];
  for (let min = start; min <= end; min += SLOT_INTERVAL_MINUTES) {
    slots.push(minutesToTime(min));
  }
  return slots;
}

/** Check if a time string (e.g. "8:00 AM") falls inside [startTime, endTime] (inclusive) */
export function timeInRange(timeStr: string, startTime: string, endTime: string): boolean {
  const t = timeToMinutes(timeStr);
  const s = timeToMinutes(startTime);
  const e = timeToMinutes(endTime);
  return t >= s && t <= e;
}
