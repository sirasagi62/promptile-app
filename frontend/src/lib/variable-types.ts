// This file is created as part of the refactoring plan to centralize variable type definitions.
// The 'typeOptions' array from variable-panel.tsx would ideally be moved here.
// However, variable-panel.tsx is a read-only file, so it cannot be updated to import from here.

export const VARIABLE_TYPE_OPTIONS = [
  { value: "string", label: "String" },
  { value: "string-multi-line", label:"StringMultiLine"},
  { value: "number", label: "Number" },
  { value: "datetime", label: "DateTime" },
  { value: "programming-language", label: "ProglammingLaunguage" },
  { value: "array", label: "Array" },
];

// You might also define a type for these options:
export type VariableTypeOption = {
  value: string;
  label: string;
};
