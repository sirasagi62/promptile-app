import * as React from "react";
import { StringInput } from "./input-fields/StringInput";
import { NumberInput } from "./input-fields/NumberInput";
import { DateTimeInput } from "./input-fields/DateTimeInput";
import { MultiLineStringInput } from "./input-fields/MultiLineStringInput";
import { TemplateVariableData } from "@/atoms";
import { Combobox } from "@/components/ui/combobox";
import { PROGRAMMING_LANGUAGE_OPTIONS } from "@/lib/variable-types";

interface VariableInputProps {
  variableName: string;
  data: TemplateVariableData;
  onChange: (variableName: string, newData: TemplateVariableData) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function VariableInput({
  variableName,
  data,
  onChange,
  onFocus,
  onBlur,
}: VariableInputProps) {
  const commonInputProps = {
    id: `input-${variableName}`,
    onFocus: onFocus,
    onBlur: onBlur,
  };

  const handleTextOrNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(variableName, { type: data.type, value: e.target.value });
  };

  const handleComboboxChange = (newValue: string) => {
    onChange(variableName, { type: data.type, value: newValue });
  }

  switch (data.type) {
    case "string":
      return (
        <StringInput
          value={data.value}
          onChange={handleTextOrNumberInputChange}
          placeholder={`Enter ${variableName}`}
          {...commonInputProps}
        />
      );
    case "string-multi-line":
      return (
        <MultiLineStringInput
          value={data.value}
          onChange={handleTextOrNumberInputChange}
          placeholder={`Enter ${variableName}`}
          {...commonInputProps}
        />
      );
    case "number":
      return (
        <NumberInput
          value={data.value}
          onChange={handleTextOrNumberInputChange}
          placeholder={`Enter ${variableName}`}
          {...commonInputProps}
        />
      );
    case "datetime":
      return (
        <DateTimeInput
          value={data.value}
          onChange={handleTextOrNumberInputChange}
          placeholder={`Enter ${variableName}`}
          {...commonInputProps}
        />
      );
    case "programming-language":
      return (
        <Combobox
          options={PROGRAMMING_LANGUAGE_OPTIONS}
          value={data.value}
          onValueChange={handleComboboxChange}
          placeholder={`Select ${variableName} language`}
          className="w-full"
          {...commonInputProps}
        />
      );
    case "array": // Treat array as multi-line string for now (e.g., JSON or comma-separated)
    default: // Fallback for unknown types
      return (
        <MultiLineStringInput // Using MultiLineStringInput as a general fallback for complex types
          value={data.value}
          onChange={handleTextOrNumberInputChange}
          placeholder={`Enter ${variableName} (type: ${data.type})`}
          {...commonInputProps}
        />
      );
  }
}
