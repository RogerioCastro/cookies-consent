import hasClass from './hasClass'

/**
 * Insere uma classe a um elemento, caso ela já não esteja no elemento
 * via: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
 *
 * @param {Object} el Elemento HTML
 * @param {String} className Nome da classe
 */
export default function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else if (!hasClass(el, className)) {
    el.className += ` ${className}`
  }
}
