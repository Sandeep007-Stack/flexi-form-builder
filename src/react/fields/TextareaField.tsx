import type { ChangeEvent } from "react";

import type { FlexiFieldRenderProps } from "../../core/types";
import { FieldShell } from "../FieldShell";
import { cx } from "../utils";

interface TextareaFieldProps extends FlexiFieldRenderProps {
  layout: "vertical" | "horizontal" | "grid";
}

export function TextareaField({
  field,
  value,
  error,
  theme,
  showRequiredStar,
  onChange,
  onBlur,
  layout
}: TextareaFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={field.name}
        name={field.name}
        rows={field.rows ?? 4}
        value={(value as string | number | readonly string[] | undefined) ?? ""}
        className={cx(theme.textarea, field.inputClassName)}
        placeholder={field.placeholder}
        disabled={field.disabled}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </FieldShell>
  );
}
