/**
 * Generates a deterministic, human-readable Milaap Participant ID from an
 * authenticated email address (e.g., `MLP-2026-4812`).
 */
export function deriveDeterministicParticipantId(email: string): string {
  const normalized = String(email || "").toLowerCase().trim();
  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i += 1) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const suffix = String((hash >>> 0) % 9000 + 1000);
  return `MLP-2026-${suffix}`;
}

