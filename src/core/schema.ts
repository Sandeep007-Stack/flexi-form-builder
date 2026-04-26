import type { FlexiField, FlexiFormSchema } from "./types";

export function getInitialValues(schema: FlexiFormSchema): Record<string, unknown> {
  return schema.fields.reduce<Record<string, unknown>>((accumulator, field) => {
    accumulator[field.name] = getDefaultValue(field);
    return accumulator;
  }, {});
}

export function getDefaultValue(field: FlexiField): unknown {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }

  if (field.type === "checkbox") {
    return false;
  }

  if (field.type === "file") {
    return null;
  }

  return "";
}
