import type { ComponentType, ReactNode } from "react";

export type ThemeName = "tailwind" | "bootstrap" | "custom";
export type LayoutType = "vertical" | "horizontal" | "grid";
export type ValidationMode = "onChange" | "onBlur" | "onSubmit";

export type FieldType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "file"
  | (string & {});

export interface FieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  email?: boolean;
  pattern?: string;
  message?: string;
  patternMessage?: string;
}

export interface ShowWhenCondition {
  field: string;
  equals: string | number | boolean;
}

export interface FlexiField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  defaultValue?: unknown;
  options?: FieldOption[];
  validation?: FieldValidation;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  showWhen?: ShowWhenCondition;
  rows?: number;
  accept?: string;
}

export interface SubmitButtonConfig {
  label?: string;
  className?: string;
}

export interface FlexiFormSchema {
  id?: string;
  title?: string;
  description?: string;
  theme?: ThemeName;
  layout?: LayoutType;
  fields: FlexiField[];
  submitButton?: SubmitButtonConfig;
}

export interface FlexiFormConfig {
  theme?: ThemeName;
  layout?: LayoutType;
  validationMode?: ValidationMode;
  showRequiredStar?: boolean;
  disableSubmitUntilValid?: boolean;
  className?: string;
}

export interface FlexiTheme {
  form: string;
  title: string;
  description: string;
  fieldWrapper: string;
  label: string;
  input: string;
  textarea: string;
  select: string;
  checkbox: string;
  checkboxLabel: string;
  radioGroup: string;
  radioOption: string;
  helperText: string;
  error: string;
  button: string;
  horizontalField?: string;
  horizontalLabel?: string;
  horizontalControl?: string;
  gridForm?: string;
}

export interface FlexiFieldRenderProps {
  field: FlexiField;
  value: unknown;
  error?: string | null;
  theme: FlexiTheme;
  showRequiredStar: boolean;
  onChange: (value: unknown) => void;
  onBlur: () => void;
}

export interface CustomFieldProps extends FlexiFieldRenderProps {
  label: ReactNode;
}

export type CustomFieldComponent = ComponentType<CustomFieldProps>;

export type CustomFieldRegistry = Record<string, CustomFieldComponent>;

export interface FlexiFormProps {
  schema: FlexiFormSchema;
  config?: FlexiFormConfig;
  customFields?: CustomFieldRegistry;
  themeOverrides?: Partial<Record<ThemeName, Partial<FlexiTheme>>>;
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  onChange?: (data: Record<string, unknown>) => void;
}
