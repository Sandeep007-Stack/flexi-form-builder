import type { ChangeEvent } from "react";

import type { FlexiFieldRenderProps } from "../../core/types";
import { cx } from "../utils";

interface CheckboxFieldProps extends FlexiFieldRenderProps {
  layout: "vertical" | "horizontal" | "grid";
}

export function CheckboxField({
  field,
  value,
  error,
  theme,
  onChange,
  onBlur
}: CheckboxFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={cx(theme.fieldWrapper, field.className)}>
      <div className={field.type === "checkbox" && theme.checkboxLabel === "form-check-label" ? "form-check" : "flex items-start gap-2"}>
        <input
          id={field.name}
          name={field.name}
          type="checkbox"
          checked={Boolean(value)}
          className={cx(theme.checkbox, field.inputClassName)}
          disabled={field.disabled}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <label htmlFor={field.name} className={theme.checkboxLabel}>
          {field.label}
        </label>
      </div>
      {field.description ? <p className={theme.helperText}>{field.description}</p> : null}
      {error ? <p className={theme.error}>{error}</p> : null}
    </div>
  );
}
