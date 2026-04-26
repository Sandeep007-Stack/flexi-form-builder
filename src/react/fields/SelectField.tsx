import type { ChangeEvent } from "react";

import type { FlexiFieldRenderProps } from "../../core/types";
import { FieldShell } from "../FieldShell";
import { cx } from "../utils";

interface SelectFieldProps extends FlexiFieldRenderProps {
  layout: "vertical" | "horizontal" | "grid";
}

export function SelectField({
  field,
  value,
  error,
  theme,
  showRequiredStar,
  onChange,
  onBlur,
  layout
}: SelectFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
      <select
        id={field.name}
        name={field.name}
        value={(value as string | number | undefined) ?? ""}
        className={cx(theme.select, field.inputClassName)}
        disabled={field.disabled}
        onChange={handleChange}
        onBlur={onBlur}
      >
        <option value="">{field.placeholder ?? `Select ${field.label}`}</option>
        {field.options?.map((option) => (
          <option key={`${field.name}-${option.value}`} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
