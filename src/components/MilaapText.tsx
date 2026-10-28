import React from 'react';

interface MilaapTextProps {
  children?: React.ReactNode;
  className?: string;
  glow?: boolean;
  gradient?: boolean;
}

export default function MilaapText({
  children = 'milaap',
  className = '',
  glow = false,
  gradient = false,
}: MilaapTextProps) {
  return (
    <span
      className={`font-samarkan MilaapFont lowercase tracking-normal inline-block ${
        gradient ? 'gold-text-gradient' : ''
      } ${glow ? 'gold-glow' : ''} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Utility to replace occurrences of 'milaap' or 'Milaap' in text strings with a Samarkan-styled span.
 */
export function formatMilaapText(text: string, customClass: string = '') {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/(milaap)/gi);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.toLowerCase() === 'milaap') {
      return (
        <span
          key={i}
          className={`font-samarkan MilaapFont lowercase tracking-normal ${customClass}`}
        >
          milaap
        </span>
      );
    }
    return part;
  });
}
