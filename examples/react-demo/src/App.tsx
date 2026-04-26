import { FlexiForm, type FlexiFormSchema } from "flexi-form-builder";

const schema: FlexiFormSchema = {
  id: "user-registration-form",
  title: "User Registration",
  description: "Create a new user account with schema-driven fields and validation.",
  theme: "tailwind",
  layout: "grid",
  submitButton: {
    label: "Create Account"
  },
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
      placeholder: "18",
      validation: {
        required: true,
        min: 18,
        max: 60
      }
    },
    {
      name: "accountType",
      label: "Account Type",
      type: "radio",
      options: [
        { label: "Personal", value: "personal" },
        { label: "Business", value: "business" }
      ],
      defaultValue: "personal",
      validation: {
        required: true
      }
    },
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      placeholder: "Enter company name",
      showWhen: {
        field: "accountType",
        equals: "business"
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
      name: "bio",
      label: "Short Bio",
      type: "textarea",
      placeholder: "Tell us a little about yourself"
    },
    {
      name: "terms",
      label: "I accept the terms and conditions",
      type: "checkbox",
      validation: {
        required: true,
        message: "You must accept the terms to continue"
      }
    }
  ]
};

export function App() {
  return (
    <main className="demo-shell">
      <section className="demo-card">
        <div className="demo-copy">
          <p className="eyebrow">Flexi Form Builder</p>
          <h1>One schema. Multiple styles. Dynamic forms for modern frontend apps.</h1>
          <p>
            This Vite demo shows the `0.1.0` MVP: schema-based fields, built-in
            validation, conditional rendering, and Tailwind-style theme classes.
          </p>
        </div>

        <FlexiForm
          schema={schema}
          config={{
            theme: "tailwind",
            validationMode: "onBlur",
            disableSubmitUntilValid: true
          }}
          onSubmit={(data) => {
            console.log("Submitted data:", data);
            alert(`Submitted:\n${JSON.stringify(data, null, 2)}`);
          }}
        />
      </section>
    </main>
  );
}
