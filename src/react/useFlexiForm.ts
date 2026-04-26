import { useEffect, useMemo, useState } from "react";

import { getInitialValues, shouldShowField, validateField } from "../core";
import type { FlexiField, FlexiFormConfig, FlexiFormSchema, ValidationMode } from "../core/types";

interface UseFlexiFormOptions {
  schema: FlexiFormSchema;
  config?: FlexiFormConfig;
  onChange?: (data: Record<string, unknown>) => void;
}

export function useFlexiForm({ schema, config, onChange }: UseFlexiFormOptions) {
  const validationMode: ValidationMode = config?.validationMode ?? "onSubmit";
  const [values, setValues] = useState<Record<string, unknown>>(() => getInitialValues(schema));
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setValues(getInitialValues(schema));
    setErrors({});
    setTouched({});
  }, [schema]);

  useEffect(() => {
    onChange?.(values);
  }, [onChange, values]);

  const visibleFields = useMemo(
    () => schema.fields.filter((field) => shouldShowField(field, values)),
    [schema.fields, values],
  );

  const validateSingleField = (field: FlexiField, value: unknown) => {
    const nextError = validateField(value, field.validation);
    setErrors((currentErrors) => ({ ...currentErrors, [field.name]: nextError }));
    return nextError;
  };

  const setFieldValue = (field: FlexiField, value: unknown) => {
    setValues((currentValues) => ({ ...currentValues, [field.name]: value }));

    if (validationMode === "onChange") {
      validateSingleField(field, value);
    }
  };

  const setFieldTouched = (field: FlexiField) => {
    setTouched((currentTouched) => ({ ...currentTouched, [field.name]: true }));

    if (validationMode === "onBlur") {
      validateSingleField(field, values[field.name]);
    }
  };

  const validateVisibleFields = () => {
    const nextErrors = visibleFields.reduce<Record<string, string | null>>((accumulator, field) => {
      accumulator[field.name] = validateField(values[field.name], field.validation);
      return accumulator;
    }, {});

    setErrors(nextErrors);
    setTouched(
      visibleFields.reduce<Record<string, boolean>>((accumulator, field) => {
        accumulator[field.name] = true;
        return accumulator;
      }, {}),
    );

    return !Object.values(nextErrors).some(Boolean);
  };

  const isValid = visibleFields.every((field) => !validateField(values[field.name], field.validation));

  return {
    errors,
    isValid,
    touched,
    values,
    visibleFields,
    setFieldTouched,
    setFieldValue,
    validateVisibleFields
  };
}
