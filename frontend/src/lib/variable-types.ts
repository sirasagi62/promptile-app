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

export const PROGRAMMING_LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "cplusplus", label: "C++" },
  { value: "c", label: "C" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "shell", label: "Shell" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
];

export type ProgrammingLanguageOption = {
  value: string;
  label: string;
};
