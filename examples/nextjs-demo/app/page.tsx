"use client";

import { FlexiForm, type FlexiFormSchema } from "flexi-form-builder";

const formSchema: FlexiFormSchema = {
  id: "nextjs-form-demo",
  title: "Next.js Demo",
  description: "Build dynamic forms from JSON with validation and Tailwind/Bootstrap support.",
  theme: "tailwind",
  layout: "vertical",
  submitButton: {
    label: "Launch"
  },
  fields: [
    {
      name: "projectName",
      label: "Project Name",
      type: "text",
      placeholder: "Flexi Form Builder",
      validation: {
        required: true,
        minLength: 3
      }
    },
    {
      name: "email",
      label: "Owner Email",
      type: "email",
      placeholder: "owner@example.com",
      validation: {
        required: true,
        email: true
      }
    },
    {
      name: "stack",
      label: "Primary Stack",
      type: "select",
      options: [
        { label: "React", value: "react" },
        { label: "Next.js", value: "nextjs" },
        { label: "Angular", value: "angular" }
      ],
      validation: {
        required: true
      }
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Anything important about this setup?"
    }
  ]
};

export default function Page() {
  return (
    <main style={{ margin: "0 auto", maxWidth: 720, padding: "48px 20px" }}>
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
    </main>
  );
}
