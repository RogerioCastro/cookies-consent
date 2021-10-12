import translatesObserver from '../util/translatesObserver'
import createElement from '../util/createElement'
import clearElement from '../util/clearElement'
import createIcon from './icon'
import createPopperMenu from './popperMenu'

/**
 * Componente selectLanguage
 *
 * @param {Object} options
 * @returns {Object} Componente selectLanguage
 */
export default function selectLanguage (options) {

  const settings = {
    container: document.body,
    languages: [],
    selected: null,
    className: 'cc-select-languages',
    onSelect: () => {},
    ...options
  }
  const elements = {
    main: createElement('div', {
      className: settings.className,
      'data-popper': 1
    }),
    selected: createElement('span', {
      className: 'cc-select-languages-selected',
      textContent: settings.languages[settings.selected].language,
      'data-popper': 1
    }),
    icon: createIcon({ icon: 'arrow-down', className: 'cc-select-languages-icon' })
  }

  // Os atributos do elemento SVG é inserido de forma diferente
  elements.icon.setAttributeNS(null, 'data-popper', 1)

  // Menu
  let popperMenu = createPopperMenu({
    container: settings.container,
    target: elements.main,
    selected: settings.selected,
    items: settings.languages,
    onSelect: onLanguageSelect
  })

  elements.main.appendChild(elements.selected)
  elements.main.appendChild(elements.icon)

  // Adicionando o observador
  translatesObserver.subscribe(translateSelectLanguage)

  /**
   * destrói o componente
   */
  function destroy () {
    popperMenu.destroy()
    popperMenu = null
    // Limpando elementos HTML
    for (const key in elements) {
      if (Object.hasOwnProperty.call(elements, key)) {
        let element = elements[key]
        clearElement(element)
        element.remove()
        element = null
      }
    }
    document.removeEventListener('click', onDocumentClick, false)
  }

  /* Eventos (handlers) */
  /**
   * Manipula o evento click no elemento de seleção de idioma
   */
  function onClick () {
    popperMenu.show()
  }
  /**
   * Manipula o evento click na página (fora do menu popper)
   * @param {Object} e Evento
   */
  function onDocumentClick (e) {
    if (!e.target.hasAttribute('data-popper')) {
      popperMenu.hide()
    }
  }
  /**
   * Manipula o evento onSelect no popperMenu e notifica o observador de mudanças de idiomas
   * @param {Object} language Idioma selecionado
   */
  function onLanguageSelect (language) {
    translatesObserver.notify(language)
  }
  /**
   * Formata o componente com o idioma selecionado
   * @param {Object} language Idioma
   */
  function translateSelectLanguage (language) {
    settings.selected = language.index
    elements.selected.textContent = settings.languages[settings.selected].language
    popperMenu.setItem(language)
  }

  /* Eventos (listeners) */
  elements.main.addEventListener('click', onClick, false)
  document.addEventListener('click', onDocumentClick, false)

  return {
    element: elements.main,
    destroy
  }
}
