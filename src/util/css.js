/**
 * Aplica regras CSS a um elemento DOM
 * via: https://www.javascripttutorial.net/dom/css/add-styles-to-an-element/
 *
 * @param {Object} element
 * @param {Object|string} style
 */
export default function css (element, style) {
  for (const property in style) {
    element.style[property] = style[property]
  }
}
