/**
 * Remove todos os elementos dentro de outro elemento HTML informado
 * @param {Object} parent HTMLElement a ser limpo
 */
export default function clearElement (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}
