import createElement from '../util/createElement'
import clearElementsObject from '../util/clearElementsObject'

/**
 * Componente link
 *
 * @param {Object} options
 * @returns {Object} Componente link
 */
export default function link (options) {

  const settings = {
    className: 'cc-link',
    url: null,
    text: '',
    translateKey: '',
    ...options
  }
  const elements = {
    main: null, // Container do link
    a: null, // link
  }

  elements.main = createElement('div', {
    className: settings.className,
    style: {
      'font-size': '12px'
    }
  })
  if (settings.url) {
    elements.a = createElement('a', {
      href: settings.url,
      target: '_blank',
      innerHTML: `<span data-cc-key="${settings.translateKey}">${settings.text}</span>`
    })
    elements.main.appendChild(elements.a)
  }

  /**
   * destrói o componente
   */
  function destroy () {
    // Limpando elementos HTML
    clearElementsObject(elements)
  }

  return {
    element: elements.main,
    destroy
  }
}
