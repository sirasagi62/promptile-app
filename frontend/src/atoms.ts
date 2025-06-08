import { atom } from 'jotai';

// Atom to store the input values for template variables
export const templateInputValuesAtom = atom<Record<string, string>>({});
