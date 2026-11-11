"use client";

import React from "react";
import { Phone, Plus, Trash2, User, Users } from "lucide-react";
import {
  MAX_TEAM_MEMBERS,
  MIN_TEAM_MEMBERS,
  isValidPhoneNumber,
  type TeamMemberInput,
} from "@/lib/teamValidation";

interface TeamMembersFieldArrayProps {
  members: TeamMemberInput[];
  onChange: (nextMembers: TeamMemberInput[]) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export default function TeamMembersFieldArray({
  members,
  onChange,
  required = true,
  disabled = false,
  error,
}: TeamMembersFieldArrayProps) {
  const validCount = members.filter(
    (m) => m.name.trim().length > 0 && isValidPhoneNumber(m.phone.trim())
  ).length;
  const meetsMinimum = !required || validCount >= MIN_TEAM_MEMBERS;

  const updateMember = (
    idx: number,
    field: keyof TeamMemberInput,
    value: string
  ) => {
    const next = members.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    onChange(next);
  };

  const handleAddMember = () => {
    if (disabled || members.length >= MAX_TEAM_MEMBERS) return;
    onChange([...members, { name: "", phone: "" }]);
  };

  const handleRemoveMember = (idx: number) => {
    if (disabled) return;
    if (required && members.length <= MIN_TEAM_MEMBERS) return;
    onChange(members.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3 rounded-2xl bg-black/45 border border-amber-500/25 p-3.5 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-200">
            Team Members {required ? "(Min 2 Required)" : "(Optional)"}
          </span>
        </div>

        {required && (
          <span
            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
              meetsMinimum
                ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                : "bg-amber-950/70 text-amber-300 border-amber-500/40"
            }`}
          >
            {validCount} / {MIN_TEAM_MEMBERS} Min Ready
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        {members.map((member, idx) => {
          const canRemove = !required || members.length > MIN_TEAM_MEMBERS;
          const isMandatoryRow = required && idx < MIN_TEAM_MEMBERS;

          return (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center rounded-xl bg-white/[0.03] border border-white/10 p-2.5"
            >
              <div className="sm:col-span-5 relative">
                <User className="w-3.5 h-3.5 text-amber-400/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={member.name}
                  disabled={disabled}
                  onChange={(e) => updateMember(idx, "name", e.target.value)}
                  placeholder={
                    isMandatoryRow
                      ? `Member ${idx + 1} Full Name *`
                      : `Member ${idx + 1} Full Name`
                  }
                  className="w-full pl-8 pr-3 py-2 rounded-lg text-xs text-white bg-black/50 border border-white/15 focus:border-amber-400 outline-none placeholder:text-slate-500 disabled:opacity-50"
                />
              </div>

              <div className="sm:col-span-6 relative">
                <Phone className="w-3.5 h-3.5 text-amber-400/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  value={member.phone}
                  disabled={disabled}
                  onChange={(e) => updateMember(idx, "phone", e.target.value)}
                  placeholder={
                    isMandatoryRow
                      ? `Member ${idx + 1} 10-Digit Phone *`
                      : `Member ${idx + 1} Phone`
                  }
                  className="w-full pl-8 pr-3 py-2 rounded-lg text-xs text-white bg-black/50 border border-white/15 focus:border-amber-400 outline-none placeholder:text-slate-500 disabled:opacity-50"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end">
                {canRemove ? (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => handleRemoveMember(idx)}
                    title="Remove team member"
                    aria-label={`Remove team member ${idx + 1}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span
                    title="Required team member"
                    className="text-[10px] font-mono text-amber-400/70 px-1.5 select-none"
                  >
                    #{idx + 1}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {members.length < MAX_TEAM_MEMBERS && (
        <button
          type="button"
          disabled={disabled}
          onClick={handleAddMember}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Team Member</span>
        </button>
      )}

      {error && (
        <p className="text-[11px] text-rose-400 font-medium leading-snug">
          {error}
        </p>
      )}
    </div>
  );
}

