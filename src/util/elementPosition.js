/**
 * Retorna as propriedades top e left de um elemento em relação ao documento
 *
 * @param {Object} el
 * @returns {Object} Retorna { top, left }
 */
export default function elementPosition (el) {
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  }
}
