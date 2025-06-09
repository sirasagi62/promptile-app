import { atom } from 'jotai';

// Define the structure for each template variable's data
export type TemplateVariableData = {
  type: string; // e.g., 'string', 'number', 'boolean', 'datetime', 'multiline'
  value: string; // The actual string value of the variable
};

// Atom to store the input values for template variables,
// now including both type and value for each variable.
export const templateInputValuesAtom = atom<Record<string, TemplateVariableData>>({});

// New atom to store the key of the variable currently being edited
export const editingVariableKeyAtom = atom<string | null>(null);
