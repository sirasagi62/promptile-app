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
