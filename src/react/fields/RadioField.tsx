import type { ChangeEvent } from "react";

import type { FlexiFieldRenderProps } from "../../core/types";
import { FieldShell } from "../FieldShell";
import { cx } from "../utils";

interface RadioFieldProps extends FlexiFieldRenderProps {
  layout: "vertical" | "horizontal" | "grid";
}

export function RadioField({
  field,
  value,
  error,
  theme,
  showRequiredStar,
  onChange,
  onBlur,
  layout
}: RadioFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FieldShell
      field={field}
      error={error}
      theme={theme}
      layout={layout}
      showRequiredStar={showRequiredStar}
    >
      <div className={theme.radioGroup} role="radiogroup" aria-labelledby={field.name}>
        {field.options?.map((option) => (
          <label
            key={`${field.name}-${option.value}`}
            className={cx(theme.radioOption, theme.checkboxLabel === "form-check-label" ? undefined : "flex items-center gap-2")}
          >
            <input
              type="radio"
              name={field.name}
              value={option.value}
              checked={value === option.value}
              className={theme.checkbox}
              disabled={field.disabled || option.disabled}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </FieldShell>
  );
}
