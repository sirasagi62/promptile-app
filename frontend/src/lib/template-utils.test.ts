import { extractMustacheVariables } from './template-utils';


describe('extractMustacheVariables', () => {
  it('should extract a single basic variable', () => {
    const template = 'Hello, {{name}}!';
    expect(extractMustacheVariables(template)).toEqual(['name']);
  });

  it('should extract multiple basic variables', () => {
    const template = 'Hello, {{firstName}} {{lastName}}! Your age is {{age}}.';
    expect(extractMustacheVariables(template)).toEqual(['firstName', 'lastName', 'age']);
  });

  it('should extract variables with triple curly braces (unescaped HTML)', () => {
    const template = 'Content: {{{htmlContent}}}';
    expect(extractMustacheVariables(template)).toEqual(['htmlContent']);
  });

  it('should extract variables with mixed single and triple curly braces', () => {
    const template = 'Name: {{name}}, Description: {{{description}}}';
    expect(extractMustacheVariables(template)).toEqual(['name', 'description']);
  });

  it('should handle variables with leading/trailing spaces', () => {
    const template = 'Value: {{  myVar  }}';
    expect(extractMustacheVariables(template)).toEqual(['myVar']);
  });

  it('should return unique variables, even if duplicated in the template', () => {
    const template = '{{item}} and {{anotherItem}} and {{item}} again.';
    expect(extractMustacheVariables(template)).toEqual(['item', 'anotherItem']);
  });

  it('should return an empty array if no variables are present', () => {
    const template = 'This is a plain string.';
    expect(extractMustacheVariables(template)).toEqual([]);
  });

  it('should ignore Mustache section tags (# and /)', () => {
    const template = '{{#users}}User: {{name}}{{/users}}';
    expect(extractMustacheVariables(template)).toEqual(['name']);
  });

  it('should ignore Mustache inverted section tags (^)', () => {
    const template = '{{^noUsers}}No users found.{{/noUsers}}';
    expect(extractMustacheVariables(template)).toEqual([]);
  });

  it('should ignore Mustache comment tags (!)', () => {
    const template = 'Hello {{name}}! {{! This is a comment }}';
    expect(extractMustacheVariables(template)).toEqual(['name']);
  });

  it('should ignore Mustache partial tags (>)', () => {
    const template = 'Main content: {{content}} {{> footer}}';
    expect(extractMustacheVariables(template)).toEqual(['content']);
  });

  it('should handle a complex template with various tags', () => {
    const template = `
      Hello, {{user.name}}!
      {{#items}}
        Item: {{.}}, Price: {{{price}}}
      {{/items}}
      {{^items}}
        No items found.
      {{/items}}
      {{! This is a test comment }}
      Footer: {{> my_footer}}
      Total: {{totalAmount}}
    `;
    expect(extractMustacheVariables(template)).toEqual(['user.name', '.', 'price', 'totalAmount']);
  });

  it('should return an empty array for an empty string template', () => {
    const template = '';
    expect(extractMustacheVariables(template)).toEqual([]);
  });

  it('should handle variables with dots (object properties)', () => {
    const template = 'User name: {{user.profile.name}}';
    expect(extractMustacheVariables(template)).toEqual(['user.profile.name']);
  });

  it('should handle variables with hyphens', () => {
    const template = 'Product ID: {{product-id}}';
    expect(extractMustacheVariables(template)).toEqual(['product-id']);
  });
});
