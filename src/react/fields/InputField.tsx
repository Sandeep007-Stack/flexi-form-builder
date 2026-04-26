import type { ChangeEvent } from "react";

import type { FlexiFieldRenderProps } from "../../core/types";
import { FieldShell } from "../FieldShell";
import { cx } from "../utils";

interface InputFieldProps extends FlexiFieldRenderProps {
  layout: "vertical" | "horizontal" | "grid";
}

export function InputField({
  field,
  value,
  error,
  theme,
  showRequiredStar,
  onChange,
  onBlur,
  layout
}: InputFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (field.type === "file") {
      onChange(event.target.files);
      return;
    }

    if (field.type === "number") {
      onChange(event.target.value === "" ? "" : Number(event.target.value));
      return;
    }

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
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={field.type === "file" ? undefined : (value as string | number | readonly string[] | undefined)}
        className={cx(theme.input, field.inputClassName)}
        placeholder={field.placeholder}
        disabled={field.disabled}
        accept={field.accept}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </FieldShell>
  );
}
