/**
 * Verifica a existência de uma classe CSS em um elemento
 * via: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
 *
 * @param {Object} el Elemento HTML
 * @param {String} className Nome da classe
 */
export default function hasClass (el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  }
  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
