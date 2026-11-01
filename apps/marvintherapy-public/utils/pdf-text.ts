import type { PDFFont } from 'pdf-lib';

// pdf-lib's standard fonts only support WinAnsi and throw on anything else
// (newlines and tabs from textareas, emoji, non-Latin scripts), so normalise
// user input before drawing it.
export const toPdfSafeText = (text: string, font: PDFFont): string => {
  const supported = new Set(font.getCharacterSet());
  return Array.from(text.replace(/\s+/g, ' '))
    .map((char) => (supported.has(char.codePointAt(0) ?? 0) ? char : '?'))
    .join('');
};

export const toPdfSafeValues = <T extends { [K in keyof T]: string }>(values: T, font: PDFFont): T =>
  Object.fromEntries(
    Object.entries<string>(values).map(([key, value]) => [key, toPdfSafeText(value, font)])
  ) as T;
