import type { FlexiTheme } from "../core/types";

export const tailwindTheme: FlexiTheme = {
  form: "space-y-5",
  title: "text-2xl font-semibold text-slate-900",
  description: "text-sm text-slate-600",
  fieldWrapper: "space-y-2",
  label: "block text-sm font-medium text-slate-800",
  input:
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100",
  textarea:
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100",
  select:
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100",
  checkbox: "h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500",
  checkboxLabel: "text-sm text-slate-800",
  radioGroup: "space-y-2",
  radioOption: "flex items-center gap-2 text-sm text-slate-800",
  helperText: "text-xs text-slate-500",
  error: "text-sm text-red-600",
  button:
    "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60",
  horizontalField: "grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-start",
  horizontalLabel: "pt-2",
  horizontalControl: "space-y-2",
  gridForm: "grid gap-5 md:grid-cols-2"
};
