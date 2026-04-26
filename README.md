# Flexi Form Builder

Flexi Form Builder is a schema-based dynamic form builder for React, Next.js, and future Angular support. It allows developers to create forms using JSON configuration with built-in validation, Tailwind CSS, Bootstrap, and custom styling support.

One schema. Multiple styles. Dynamic forms for modern frontend apps.

## Features

- Schema-based form generation
- React and Next.js ready
- Tailwind, Bootstrap, and custom theme support
- Layout options: `vertical`, `horizontal`, `grid`
- Built-in validation engine
- Conditional field rendering with `showWhen`
- Custom field component support
- TypeScript-first API
- GitHub-install-friendly single-package MVP structure

## Installation

Install directly from GitHub:

```bash
npm install github:your-username/flexi-form-builder
```

Install from a branch:

```bash
npm install github:your-username/flexi-form-builder#main
```

Install from a tag:

```bash
npm install github:your-username/flexi-form-builder#v1.0.0
```

Install from a private repository URL:

```bash
npm install git+https://github.com/your-username/flexi-form-builder.git
```

If you plan to distribute directly from GitHub, build the package before tagging or commit the generated `dist/` output as part of your release workflow.

## Quick Start

```tsx
import { FlexiForm, type FlexiFormSchema } from "flexi-form-builder";

const schema: FlexiFormSchema = {
  theme: "tailwind",
  layout: "vertical",
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      validation: {
        required: true,
        minLength: 3
      }
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: {
        required: true,
        email: true
      }
    }
  ]
};

export function Example() {
  return (
    <FlexiForm
      schema={schema}
      onSubmit={(data) => {
        console.log(data);
      }}
    />
  );
}
```

## Next.js Usage

```tsx
"use client";

import { FlexiForm } from "flexi-form-builder";

export default function Page() {
  return (
    <FlexiForm
      schema={formSchema}
      config={{
        theme: "tailwind",
        validationMode: "onSubmit"
      }}
      onSubmit={(data) => {
        console.log("Form Data:", data);
      }}
    />
  );
}
```

## Schema Example

```ts
const formSchema = {
  id: "user-registration-form",
  title: "User Registration",
  description: "Create a new user account",
  theme: "tailwind",
  layout: "vertical",
  submitButton: {
    label: "Create Account",
    className: "bg-blue-600 text-white px-4 py-2 rounded"
  },
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      defaultValue: "",
      validation: {
        required: true,
        minLength: 3,
        message: "Full name must be at least 3 characters"
      }
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter email",
      validation: {
        required: true,
        email: true
      }
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      validation: {
        required: true,
        min: 18,
        max: 60
      }
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" }
      ],
      validation: {
        required: true
      }
    },
    {
      name: "terms",
      label: "I accept terms and conditions",
      type: "checkbox",
      validation: {
        required: true
      }
    }
  ]
};
```

## Config

```ts
const config = {
  theme: "tailwind",
  layout: "vertical",
  validationMode: "onChange",
  showRequiredStar: true,
  disableSubmitUntilValid: true
};
```

## Field Types

Supported now:

- `text`
- `email`
- `number`
- `password`
- `textarea`
- `select`
- `radio`
- `checkbox`
- `date`
- `file`

## Validation Guide

Supported now:

- `required`
- `minLength`
- `maxLength`
- `min`
- `max`
- `email`
- `pattern`
- `message`
- `patternMessage`

Example:

```ts
validation: {
  required: true,
  minLength: 3,
  pattern: "^[A-Za-z ]+$",
  patternMessage: "Only letters and spaces are allowed"
}
```

## Theme System

Built-in themes:

- `tailwind`
- `bootstrap`
- `custom`

Example:

```ts
<FlexiForm
  schema={schema}
  config={{ theme: "bootstrap" }}
  onSubmit={(data) => console.log(data)}
/>
```

Tailwind theme shape:

```ts
export const tailwindTheme = {
  form: "space-y-5",
  label: "block text-sm font-medium text-slate-800",
  input: "w-full rounded-md border border-slate-300 bg-white px-3 py-2",
  error: "text-sm text-red-600",
  button: "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
};
```

You can also pass `themeOverrides` to tune class names per theme without forking the package.

## Conditional Fields

```ts
{
  name: "companyName",
  label: "Company Name",
  type: "text",
  showWhen: {
    field: "accountType",
    equals: "business"
  }
}
```

## Custom Fields

```tsx
<FlexiForm
  schema={schema}
  customFields={{
    phone: PhoneInputComponent,
    richText: RichTextEditor
  }}
  onSubmit={(data) => console.log(data)}
/>
```

Custom field schema:

```ts
{
  name: "phone",
  label: "Phone Number",
  type: "phone"
}
```

## Tailwind Setup

The package ships class names only. Add Tailwind CSS to your host app and ensure your app scans your own files for class usage.

## Bootstrap Setup

Import Bootstrap in your host app, for example:

```ts
import "bootstrap/dist/css/bootstrap.min.css";
```

## Development

```bash
npm install
npm run build
```

Project structure:

```txt
flexi-form-builder/
  src/
    core/
    react/
    themes/
  examples/
    nextjs-demo/
    react-demo/
  package.json
  README.md
```

## Roadmap

### Phase 1 - React + Next.js MVP

- Core schema
- React renderer
- Tailwind theme
- Bootstrap theme
- Basic validation
- Example Next.js app
- GitHub install support

### Phase 2 - Advanced fields

- File upload polish
- Multi-select
- Date range
- Repeatable fields
- Nested fields
- Conditional fields expansion
- Custom fields ecosystem

### Phase 3 - Angular support

- Angular dynamic component
- Reactive forms
- Angular validators
- Bootstrap/Tailwind support
- Angular demo

### Phase 4 - Visual builder

- Drag and drop form builder
- Field settings panel
- Live preview
- Export JSON schema
- Import JSON schema

### Phase 5 - Pro features

- Multi-step forms
- Wizard forms
- API submit
- Draft save
- localStorage persistence
- Form analytics
- Role-based fields

## License

MIT
