import Mustache from 'mustache';

/**
 * Render a template string with the given answers map.
 */
export function render(templateStr, answers) {
  // Disable HTML escaping — we're rendering markdown
  Mustache.escape = (text) => text;
  return Mustache.render(templateStr, answers);
}
