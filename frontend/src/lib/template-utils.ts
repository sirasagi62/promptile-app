import { TemplateVariableData } from "@/atoms"; // Import TemplateVariableData type

/**
 * Extracts unique variable names from a Mustache template string.
 * It identifies variables enclosed in `{{...}}` or `{{{...}}}` tags,
 * excluding special Mustache tags like sections, comments, or partials.
 *
 * @param template The Mustache template string.
 * @returns An array of unique variable names found in the template.
 */
export function extractMustacheVariables(template: string): string[] {
  const variables = new Set<string>();
  // Regex to find all Mustache tags: {{...}}
  // It captures the content inside the tags.
  // The `?` after `[^{}]+` makes it non-greedy, matching the smallest possible string.
  const regex = /\{\{?([^{}]+?)\}\}/g;
  let match;

  while ((match = regex.exec(template)) !== null) {
    const content = match[1].trim();

    // Exclude special Mustache tags:
    // # (section start), ^ (inverted section start), / (section end),
    // ! (comment), > (partial)
    if (content.length > 0 && !['#', '^', '/', '!', '>'].includes(content[0])) {
      variables.add(content);
    }
  }

  return Array.from(variables);
}

export type TemplateSegment =
  | { type: 'text'; content: string }
  | { type: 'variable'; name: string; value: string; variableType: string }; // Added variableType

/**
 * Processes a Handlebars template string to identify and segment
 * plain text and substituted variable parts.
 *
 * @param template The Handlebars template string.
 * @param variableDataMap A record of variable names to their full data (type and value).
 * @returns An array of TemplateSegment objects.
 */
export function processTemplateForDisplay(
  template: string,
  variableDataMap: Record<string, TemplateVariableData> // Changed parameter type
): TemplateSegment[] {
  const segments: TemplateSegment[] = [];
  const regex = /\{\{?([^{}]+?)\}\}/g; // Matches {{var}} or {{{var}}}
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(template)) !== null) {
    const fullMatch = match[0]; // e.g., "{{variableName}}"
    const variableName = match[1].trim(); // e.g., "variableName"
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    // Add preceding plain text segment
    if (matchStart > lastIndex) {
      segments.push({ type: 'text', content: template.substring(lastIndex, matchStart) });
    }

    // Check if it's a special Handlebars tag (e.g., #, /, !, >)
    if (variableName.length > 0 && ['#', '^', '/', '!', '>'].includes(variableName[0])) {
      // Treat special Handlebars tags as plain text for display purposes
      segments.push({ type: 'text', content: fullMatch });
    } else {
      // Add variable segment
      const variableData = variableDataMap[variableName];
      const substitutedValue = variableData?.value || ''; // Use empty string if variable not found
      const variableType = variableData?.type || 'unknown'; // Get the type from variableDataMap
      segments.push({ type: 'variable', name: variableName, value: substitutedValue, variableType: variableType }); // Include variableType
    }

    lastIndex = matchEnd;
  }

  // Add any remaining plain text after the last match
  if (lastIndex < template.length) {
    segments.push({ type: 'text', content: template.substring(lastIndex) });
  }

  return segments;
}
