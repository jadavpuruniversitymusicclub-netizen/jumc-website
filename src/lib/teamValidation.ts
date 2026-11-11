import type { MilaapCompetition } from "@/data/milaapCompetitions";

export interface TeamMemberInput {
  name: string;
  phone: string;
}

export const MIN_TEAM_MEMBERS = 2;
export const MAX_TEAM_MEMBERS = 8;

const PHONE_REGEX = /^\+?[0-9]{10,14}$/;

export function isValidPhoneNumber(phone: string): boolean {
  return PHONE_REGEX.test(phone.replace(/[\s-]/g, ""));
}

/**
 * Returns two blank member rows for team/group competitions so the Team Lead
 * sees both mandatory member slots immediately upon selection.
 */
export function createEmptyTeamMembers(
  count: number = MIN_TEAM_MEMBERS
): TeamMemberInput[] {
  return Array.from({ length: count }, () => ({ name: "", phone: "" }));
}

export function isAlwaysGroupCompetition(
  format: MilaapCompetition["format"]
): boolean {
  return format === "Group";
}

export function supportsGroupEntryOption(
  format: MilaapCompetition["format"]
): boolean {
  return format === "Group/Solo";
}

/**
 * Normalizes and validates a competition's `teamMembers` array.
 * When `required` is true, enforces at least 2 members with non-empty names
 * and valid 10-14 digit phone numbers.
 */
export function sanitizeAndValidateTeamMembers(
  rawMembers: unknown,
  required: boolean,
  eventLabel?: string
): {
  valid: boolean;
  members: TeamMemberInput[];
  error?: string;
} {
  const inputList = Array.isArray(rawMembers) ? rawMembers : [];
  const prefix = eventLabel ? `${eventLabel}: ` : "";

  const normalized: TeamMemberInput[] = [];
  for (const entry of inputList.slice(0, MAX_TEAM_MEMBERS)) {
    if (!entry || typeof entry !== "object") continue;
    const rec = entry as Record<string, unknown>;
    const memberName = String(rec.name ?? "").trim();
    const memberPhone = String(rec.phone ?? "").trim();

    if (!memberName && !memberPhone) {
      continue;
    }

    if (!memberName) {
      return {
        valid: false,
        members: [],
        error: `${prefix}Every entered team member must have a valid name.`,
      };
    }

    if (!isValidPhoneNumber(memberPhone)) {
      return {
        valid: false,
        members: [],
        error: `${prefix}Please enter a valid 10-digit phone number for team member "${memberName}".`,
      };
    }

    normalized.push({ name: memberName, phone: memberPhone });
  }

  if (required && normalized.length < MIN_TEAM_MEMBERS) {
    return {
      valid: false,
      members: [],
      error: `${prefix}At least ${MIN_TEAM_MEMBERS} team members with Names and Phone Numbers are required.`,
    };
  }

  return { valid: true, members: normalized };
}

