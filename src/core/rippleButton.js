import createIcon from './icon'
import createElement from '../util/createElement'
import elementPosition from '../util/elementPosition'
import clearElement from '../util/clearElement'
import css from '../util/css'

/**
 * Componente rippleButton (botão com efeito ripple - material design)
 * via: https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
 *
 * @param {Object} options
 * @returns {Object} Componente rippleButton
 */
export default function rippleButton (options) {

  const settings = {
    text: '',
    className: '',
    icon: null,
    translateKey: 'none',
    onClick: () => {},
    ...options
  }
  const elements = {
    button: createElement('button', {
      className: 'cc-ripple-button ' + settings.className
    }),
    icon: createIcon({ icon: settings.icon, className: 'svg-icon' }),
    label: createElement('span', {
      className: 'cc-ripple-button-label',
      'data-cc-key': settings.translateKey,
      textContent: settings.text
    })
  }
  if (elements.icon) {
    elements.button.appendChild(elements.icon)
  } else {
    css(elements.button, { 'justify-content': 'center' })
  }
  elements.button.appendChild(elements.label)

  /**
   * Cria o efeito ripple no botão
   * @param {Object} event Evento
   */
  function createRipple (event) {
    const button = event.currentTarget
    const position = elementPosition(button)
    const circle = createElement('span', {
      className: 'cc-ripple'
    })
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2
    css(circle, {
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${event.clientX - (position.left + radius)}px`,
      top: `${event.clientY - (position.top + radius)}px`,
    })

    const ripple = button.getElementsByClassName('cc-ripple')[0]
    if (ripple) {
      ripple.remove()
    }

    button.appendChild(circle)
  }

  /**
   * Altera o label do botão
   * @param {String} label Label do botão
   */
  function setLabel (label) {
    elements.button.querySelector('.cc-ripple-button-label').textContent = label
  }

  /**
   * destrói o componente
   */
  function destroy () {
    // Limpando elementos HTML
    for (const key in elements) {
      if (Object.hasOwnProperty.call(elements, key)) {
        let element = elements[key]
        if (element !== null) {
          clearElement(element)
          element.remove()
          element = null
        }
      }
    }
  }

  /* Eventos (handlers) */
  /**
   * Manipula o evento click no elemento e dispara o evento onClick do componente
   * @param {Object} e Evento
   */
  function onClick (e) {
    createRipple(e)
    settings.onClick(e)
  }

  /* Eventos (listeners) */
  elements.button.addEventListener('click', onClick, false)

  return {
    element: elements.button,
    setLabel,
    destroy
  }
}
