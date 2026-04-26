import type { FieldValidation } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (typeof FileList !== "undefined" && value instanceof FileList) {
    return value.length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "boolean") {
    return value === false;
  }

  return false;
}

export function validateField(
  value: unknown,
  validation?: FieldValidation,
): string | null {
  if (!validation) {
    return null;
  }

  if (validation.required && isEmptyValue(value)) {
    return validation.message || "This field is required";
  }

  if (isEmptyValue(value)) {
    return null;
  }

  if (
    validation.minLength !== undefined &&
    typeof value === "string" &&
    value.length < validation.minLength
  ) {
    return validation.message || `Minimum ${validation.minLength} characters required`;
  }

  if (
    validation.maxLength !== undefined &&
    typeof value === "string" &&
    value.length > validation.maxLength
  ) {
    return validation.message || `Maximum ${validation.maxLength} characters allowed`;
  }

  if (validation.email && typeof value === "string" && !EMAIL_REGEX.test(value)) {
    return validation.message || "Please enter a valid email";
  }

  if (validation.pattern && typeof value === "string") {
    const regex = new RegExp(validation.pattern);
    if (!regex.test(value)) {
      return validation.patternMessage || validation.message || "Invalid format";
    }
  }

  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim() !== ""
        ? Number(value)
        : null;

  if (
    validation.min !== undefined &&
    numericValue !== null &&
    !Number.isNaN(numericValue) &&
    numericValue < validation.min
  ) {
    return validation.message || `Minimum value is ${validation.min}`;
  }

  if (
    validation.max !== undefined &&
    numericValue !== null &&
    !Number.isNaN(numericValue) &&
    numericValue > validation.max
  ) {
    return validation.message || `Maximum value is ${validation.max}`;
  }

  return null;
}
