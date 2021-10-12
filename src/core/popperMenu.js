import { createPopper } from '@popperjs/core'
import createElement from '../util/createElement'
import clearElement from '../util/clearElement'
import addClass from '../util/addClass'
import removeClass from '../util/removeClass'
// import css from '../util/css'

/**
 * Componente popperMenu
 * Utilizando Popper positioning engine (https://popper.js.org/)
 *
 * @param {Object} options
 * @returns {Object} Componente popperMenu
 */
export default function popperMenu (options) {

  const settings = {
    container: document.body,
    class: 'cc-popper-menu',
    target: null,
    selected: 0,
    items: [],
    offset: [0, 8],
    onSelect: () => {},
    ...options
  }
  const elements = {
    menu: createElement('div', {
      className: settings.class,
      'data-popper': 1
    }),
    itemsElements: []
  }

  // Itens do menu
  settings.items.forEach((item, i) => {
    elements.itemsElements[item.index] = createElement('div', {
      className: 'cc-popper-menu-item' + (i === settings.selected ? ' active' : ''),
      'data-popper': 1,
      textContent: item.language
    })
    elements.itemsElements[item.index].addEventListener('click', onItemClick.bind(this, item), false)
    elements.menu.appendChild(elements.itemsElements[i])
  })

  // Inserindo o popover no container
  settings.container.appendChild(elements.menu)

  // Iniciando o popover
  const popper = createPopper(settings.target, elements.menu, {
    placement: 'right',
    modifiers: [
      // Offset necessária para a utilização da 'arrow'
      {
        name: 'offset',
        options: {
          offset: settings.offset,
        },
      },
    ],
  })

  /**
   * Exibe o popover
   */
  function show () {
    // Exibindo
    elements.menu.setAttribute('data-show', '')
    // Habilitando os eventos da instância (performance)
    // via: https://popper.js.org/docs/v2/tutorial/#performance
    popper.setOptions((popperOptions) => ({
      ...popperOptions,
      modifiers: [
        ...popperOptions.modifiers,
        { name: 'eventListeners', enabled: true }
      ]
    }))
    // Atualizando a instância
    popper.update()
  }

  /**
   * Oculta o popover
   */
  function hide () {
    // Ocultando
    elements.menu.removeAttribute('data-show')
    // Desabilitando os eventos da instância (performance)
    // via: https://popper.js.org/docs/v2/tutorial/#performance
    popper.setOptions((popperOptions) => ({
      ...popperOptions,
      modifiers: [
        ...popperOptions.modifiers,
        { name: 'eventListeners', enabled: false }
      ]
    }))
  }

  /**
   * destrói o componente
   */
  function destroy () {
    popper.destroy()
    // Limpando elementos HTML
    for (const key in elements) {
      if (Object.hasOwnProperty.call(elements, key)) {
        let element = elements[key]
        if (Array.isArray(element)) {
          element.forEach(e => {
            clearElement(e)
            e.remove()
          })
        } else {
          clearElement(element)
          element.remove()
        }
        element = null
      }
    }
  }

  /* EVENTOS (HANDLERS) */
  /**
   * Manipula o evento click no item
   * e dispara o evento onSelect do componente
   * @param {Object} e Evento
   */
  function onItemClick (item, e) {
    e.preventDefault()
    settings.selected = item.index
    elements.itemsElements.forEach(el => removeClass(el, 'active'))
    addClass(elements.itemsElements[item.index], 'active')
    hide()
    settings.onSelect(item)
  }

  /**
   * Seleciona um idioma no componente
   * @param {Object} item Idioma a ser selecionada
   */
  function setItem (item) {
    settings.selected = item.index
    elements.itemsElements.forEach(el => removeClass(el, 'active'))
    addClass(elements.itemsElements[item.index], 'active')
  }

  return {
    element: elements.menu,
    popper,
    setItem,
    destroy,
    show,
    hide
  }
}
