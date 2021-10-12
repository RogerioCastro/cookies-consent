import hasClass from './hasClass'

/**
 * Remove uma classe de um elemento
 * via: https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery
 *
 * @param {Object} el Elemento HTML
 * @param {String} className Nome da classe
 */
export default function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className)
  } else if (hasClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
}
