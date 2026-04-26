import type { FlexiField } from "./types";

export function shouldShowField(
  field: FlexiField,
  values: Record<string, unknown>,
): boolean {
  if (!field.showWhen) {
    return true;
  }

  return values[field.showWhen.field] === field.showWhen.equals;
}
