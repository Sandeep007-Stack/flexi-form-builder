import type { ReactNode } from "react";

import type { FlexiField, FlexiTheme, LayoutType } from "../core/types";
import { cx } from "./utils";

interface FieldShellProps {
  field: FlexiField;
  error?: string | null;
  theme: FlexiTheme;
  layout: LayoutType;
  showRequiredStar: boolean;
  children: ReactNode;
}

export function FieldShell({
  field,
  error,
  theme,
  layout,
  showRequiredStar,
  children
}: FieldShellProps) {
  const label = (
    <label htmlFor={field.name} className={theme.label}>
      {field.label}
      {showRequiredStar && field.validation?.required ? " *" : null}
    </label>
  );

  if (field.type === "checkbox") {
    return (
      <div className={cx(theme.fieldWrapper, field.className)}>
        {children}
        {field.description ? <p className={theme.helperText}>{field.description}</p> : null}
        {error ? <p className={theme.error}>{error}</p> : null}
      </div>
    );
  }

  const control = (
    <div className={layout === "horizontal" ? theme.horizontalControl : undefined}>
      {children}
      {field.description ? <p className={theme.helperText}>{field.description}</p> : null}
      {error ? <p className={theme.error}>{error}</p> : null}
    </div>
  );

  if (layout === "horizontal") {
    return (
      <div className={cx(theme.fieldWrapper, theme.horizontalField, field.className)}>
        <div className={theme.horizontalLabel}>{label}</div>
        {control}
      </div>
    );
  }

  return (
    <div className={cx(theme.fieldWrapper, field.className)}>
      {label}
      {control}
    </div>
  );
}

export function createFieldLabel(
  field: FlexiField,
  theme: FlexiTheme,
  showRequiredStar: boolean,
) {
  return (
    <label htmlFor={field.name} className={theme.label}>
      {field.label}
      {showRequiredStar && field.validation?.required ? " *" : null}
    </label>
  );
}
