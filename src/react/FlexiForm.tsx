import type { FormEvent } from "react";

import type {
  CustomFieldProps,
  FlexiField,
  FlexiFormConfig,
  FlexiFormProps,
  FlexiTheme,
  LayoutType,
  ThemeName
} from "../core/types";
import { getTheme } from "../themes";
import { createFieldLabel } from "./FieldShell";
import {
  CheckboxField,
  InputField,
  RadioField,
  SelectField,
  TextareaField
} from "./fields";
import { useFlexiForm } from "./useFlexiForm";
import { cx } from "./utils";

const defaultConfig: Required<
  Pick<FlexiFormConfig, "disableSubmitUntilValid" | "layout" | "showRequiredStar" | "theme" | "validationMode">
> = {
  disableSubmitUntilValid: false,
  layout: "vertical",
  showRequiredStar: true,
  theme: "tailwind",
  validationMode: "onSubmit"
};

function resolveTheme(
  schemaTheme: ThemeName | undefined,
  configTheme: ThemeName | undefined,
  overrides: FlexiFormProps["themeOverrides"],
): FlexiTheme {
  const themeName = configTheme ?? schemaTheme ?? defaultConfig.theme;
  return {
    ...getTheme(themeName),
    ...overrides?.[themeName]
  };
}

function resolveLayout(
  schemaLayout: LayoutType | undefined,
  configLayout: LayoutType | undefined,
): LayoutType {
  return configLayout ?? schemaLayout ?? defaultConfig.layout;
}

function renderBuiltInField(
  field: FlexiField,
  props: CustomFieldProps,
  layout: LayoutType,
) {
  switch (field.type) {
    case "textarea":
      return <TextareaField {...props} layout={layout} />;
    case "select":
      return <SelectField {...props} layout={layout} />;
    case "radio":
      return <RadioField {...props} layout={layout} />;
    case "checkbox":
      return <CheckboxField {...props} layout={layout} />;
    case "text":
    case "email":
    case "number":
    case "password":
    case "date":
    case "file":
      return <InputField {...props} layout={layout} />;
    default:
      return null;
  }
}

export function FlexiForm({
  schema,
  config,
  customFields,
  themeOverrides,
  onSubmit,
  onChange
}: FlexiFormProps) {
  const mergedConfig = { ...defaultConfig, ...config };
  const theme = resolveTheme(schema.theme, mergedConfig.theme, themeOverrides);
  const layout = resolveLayout(schema.layout, mergedConfig.layout);

  const {
    errors,
    isValid,
    touched,
    values,
    visibleFields,
    setFieldTouched,
    setFieldValue,
    validateVisibleFields
  } = useFlexiForm({ schema, config: mergedConfig, onChange });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formIsValid = validateVisibleFields();
    if (!formIsValid) {
      return;
    }

    const submittedData = visibleFields.reduce<Record<string, unknown>>((accumulator, field) => {
      accumulator[field.name] = values[field.name];
      return accumulator;
    }, {});

    await onSubmit(submittedData);
  };

  const formClassName =
    layout === "grid"
      ? cx(theme.form, theme.gridForm, mergedConfig.className)
      : cx(theme.form, mergedConfig.className);

  return (
    <form id={schema.id} className={formClassName} onSubmit={handleSubmit}>
      {schema.title ? <div className={theme.title}>{schema.title}</div> : null}
      {schema.description ? <p className={theme.description}>{schema.description}</p> : null}

      {visibleFields.map((field) => {
        const label = createFieldLabel(field, theme, mergedConfig.showRequiredStar);
        const sharedProps: CustomFieldProps = {
          field,
          value: values[field.name],
          error: touched[field.name] ? errors[field.name] : null,
          theme,
          label,
          showRequiredStar: mergedConfig.showRequiredStar,
          onChange: (value) => setFieldValue(field, value),
          onBlur: () => setFieldTouched(field)
        };

        const CustomField = customFields?.[field.type];
        if (CustomField) {
          return <CustomField key={field.name} {...sharedProps} />;
        }

        const builtInField = renderBuiltInField(field, sharedProps, layout);
        if (builtInField) {
          return <div key={field.name}>{builtInField}</div>;
        }

        return (
          <div key={field.name} className={theme.error}>
            Unsupported field type: {field.type}
          </div>
        );
      })}

      <div className={layout === "horizontal" ? theme.horizontalControl : undefined}>
        <button
          type="submit"
          className={cx(theme.button, schema.submitButton?.className)}
          disabled={mergedConfig.disableSubmitUntilValid && !isValid}
        >
          {schema.submitButton?.label ?? "Submit"}
        </button>
      </div>
    </form>
  );
}
