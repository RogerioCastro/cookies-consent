import createElement from '../util/createElement'
import clearElementsObject from '../util/clearElementsObject'

/**
 * Componente Toggle Switch
 * via: https://www.w3schools.com/howto/howto_css_switch.asp
 *
 * @param {Object} options
 * @returns {Object} Componente Toggle Switch
 */
export default function toggleSwitch (options) {

  const settings = {
    value: false,
    disabled: false,
    class: 'cc-toggle-switch',
    onClick: () => {},
    onChange: () => {},
    ...options
  }
  const elements = {
    main: createElement('label', {
      className: settings.class
    }),
    input: createElement('input', {
      type: 'checkbox'
    }),
    slider: createElement('span', {
      className: 'slider'
    })
  }

  // Setando os valores iniciais
  checked(settings.value)
  disabled(settings.disabled)

  // Inserindo os elementos em seus containers
  elements.main.appendChild(elements.input)
  elements.main.appendChild(elements.slider)

  /**
   * Marca ou desmarca o componente
   * @param {Boolean} value Indica se será checado ou não
   * @returns undefined
   */
  function checked (value = true) {
    settings.value = elements.input.checked = value
  }

  /**
   * Habilita ou desabilita o componente
   * @param {Boolean} value Indica se será desabilitado ou não
   * @returns undefined
   */
  function disabled (value = true) {
    elements.input.disabled = value
  }

  /**
   * Retorna o valor atual do componente
   * @returns Valor do input: marcado (true) ou não (false)
   */
  function getValue () {
    return settings.value
  }

  /**
   * destrói o componente
   */
  function destroy () {
    // Limpando elementos HTML
    clearElementsObject(elements)
  }

  /* Eventos (handlers) */
  /**
   * Manipula o evento input no elemento input e dispara o evento onChange do componente
   * @param {Object} e Evento
   */
  function onChange (e) {
    e.preventDefault()
    settings.value = e.target.checked
    settings.onChange(settings.value)
  }

  /* Eventos (listeners) */
  elements.input.addEventListener('input', onChange, false)

  return {
    element: elements.main,
    getValue,
    checked,
    disabled,
    destroy
  }
}
