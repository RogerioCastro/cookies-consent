
import { createPopper } from '@popperjs/core'
import createOverlay from './overlay'
import createSelectLanguage from './selectLanguage'
import createToggleSwitch from './toggleSwitch'
import createControls from './controls'
import createLink from './link'
import createIcon from './icon'
import clearComponentsObject from '../util/clearComponentsObject'
import clearElementsObject from '../util/clearElementsObject'
import translatesObserver from '../util/translatesObserver'
import translateElements from '../util/translateElements'
import resizeObserver from '../util/resizeObserver'
import createElement from '../util/createElement'
import getWindowSize from '../util/getWindowSize'
import addClass from '../util/addClass'
import removeClass from '../util/removeClass'
import {
  SAVE_LABEL,
  ACCEPT_PREFERENCES_LABEL,
  REJECT_PREFERENCES_LABEL,
  PRIVACY_POLICY_LABEL,
  COOKIES_POLICY_LABEL,
  PREFERENCES_TITLE,
  PREFERENCES_SUBTITLE
} from '../util/constants'
import css from '../util/css'

/**
 * Componente diálogo de Preferências (preferencesDialog)
 *
 * @param {Object} options
 * @returns {Object} Componente preferencesDialog
 */
export default function preferencesDialog (options) {

  // Idioma a ser utilizado
  let lang = options.languages.length ? options.languages[options.languageIndex].key : null
  let winSize = getWindowSize()
  let observer = null // Para observar o redimensionamento da página

  const settings = {
    container: document.body,
    content: null,
    preferences: [],
    acceptLabel: ACCEPT_PREFERENCES_LABEL,
    rejectLabel: REJECT_PREFERENCES_LABEL,
    saveLabel: SAVE_LABEL,
    preferencesTitle: PREFERENCES_TITLE,
    preferencesSubtitle: PREFERENCES_SUBTITLE,
    privacyPolicyLabel: PRIVACY_POLICY_LABEL,
    privacyPolicyUrl: null,
    cookiesPolicyLabel: COOKIES_POLICY_LABEL,
    cookiesPolicyUrl: null,
    class: 'cc-preferences-dialog',
    extraClass: null,
    hasReject: false,
    languages: [],
    languageIndex: 0,
    showIcons: true,
    onAccept: () => {},
    onReject: () => {},
    onSave: () => {},
    ...options
  }
  const elements = {
    dialog: null, // Elemento principal (dialog)
    dialogContainer: null, // Container interno da dialog
    header: null, // Cabeçalho (toolbar)
    closeIcon: null, // Botão FECHAR (ícone)
    title: null, // Barra de título
    preferencesTitle: null, // Título
    preferencesSubtitle: null, // Subtítulo
    policiesContainer: null, // Container para os links das políticas
    content: null, // Container central (conteúdos)
    preferenceElements: [], // Elementos das preferências
    virtualElement: { // Elemento virtual para o popper simular um diálogo
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        top: winSize.height / 2,
        left: winSize.width / 2,
        bottom: winSize.height / 2,
        right: winSize.width / 2
      }),
    }
  }
  const components = {
    overlay: null, // Fundo clicável
    controls: null, // Componente controls (menu de botões)
    cookiesPolicy: null, // Política de cookies (link)
    privacyPolicy: null, // Política de privacidade (link)
    selectLanguage: null, // Seleção de idioma
    preferenceInputs: [], // Elementos dos inputs
  }

  /* CRIAÇÃO DOS ELEMENTOS */
  // Fundo clicável
  components.overlay = createOverlay({
    onClick: hide
  })
  // Elemento principal (dialog)
  elements.dialog = createElement('div', {
    className: settings.class + (settings.extraClass ? ` ${settings.extraClass}` : '')
  })
  // Container interno da dialog
  elements.dialogContainer = createElement('div', {
    className: 'cc-preferences-dialog-container'
  })
  // Cabeçalho (toolbar)
  elements.header = createElement('div', {
    className: 'cc-preferences-dialog-header'
  })
  // Seleção de idioma
  if (settings.languages.length) {
    components.selectLanguage = createSelectLanguage({
      container: settings.container,
      languages: settings.languages,
      selected: settings.languages.length ? settings.languageIndex : null
    })
    css(components.selectLanguage.element, { color: '#7b7b8a' })
  } else {
    elements.header.style['justify-content'] = 'flex-end'
  }
  // Botão FECHAR
  elements.closeIcon = createIcon({ icon: 'close', className: 'cc-preferences-dialog-close' })
  // Barra de título
  elements.title = createElement('div', {
    className: 'cc-preferences-dialog-title'
  })
  // Título
  elements.preferencesTitle = createElement('div', {
    innerHTML: `<span data-cc-key="preferencesTitle">${settings.preferencesTitle}</span>`
  })
  // Subtítulo
  elements.preferencesSubtitle = createElement('div', {
    className: 'cc-preferences-dialog-subtitle',
    innerHTML: `<span data-cc-key="preferencesSubtitle">${settings.preferencesSubtitle}</span>`
  })
  // Container para os links das políticas
  elements.policiesContainer = createElement('div', {
    className: 'cc-preferences-dialog-policies'
  })
  // Política de cookies
  components.cookiesPolicy = createLink({
    url: settings.cookiesPolicyUrl,
    text: settings.cookiesPolicyLabel,
    translateKey: 'cookiesPolicyLabel'
  })
  // Política de privacidade
  components.privacyPolicy = createLink({
    url: settings.privacyPolicyUrl,
    text: settings.privacyPolicyLabel,
    translateKey: 'cookiesPolicyLabel'
  })
  // Container central (conteúdos)
  elements.content = createElement('div', {
    className: 'cc-preferences-dialog-content'
  })
  // Componente controls (menu de botões)
  components.controls = createControls({
    parentName: 'preferencesDialog',
    className: 'cc-preferences-dialog-controls',
    acceptLabel: settings.acceptLabel,
    rejectLabel: settings.rejectLabel,
    saveLabel: settings.saveLabel,
    showIcons: settings.showIcons,
    hasReject: settings.hasReject,
    onAccept: onBtnAcceptClick,
    onReject: onBtnRejectClick,
    onSave: onBtnSaveClick
  })

  /* CRIANDO E INSERINDO AS OPÇÕES CONFIGURÁVEIS */
  elements.content.appendChild(elements.preferencesSubtitle)
  // Elementos dos controles de preferências
  settings.preferences.forEach((preference, i) => {
    let _info = Array.isArray(preference.info) ? preference.info.find(c => c.key === lang) : preference.info
    elements.preferenceElements[i] = createElement('div', {
      className: 'cc-preferences-dialog-item',
      innerHTML: `
        <h5 class="cc-preferences-dialog-item-title">${_info.title}</h5>
        <div class="cc-preferences-dialog-item-group">
          <span class="cc-preferences-dialog-item-desc">${_info.description}</span>
          <div class="cc-preferences-dialog-item-switch"></div>
        </div>
      `
    })
    components.preferenceInputs[i] = createToggleSwitch({
      value: preference.value,
      disabled: !preference.editable
    })
    // Inserindo controle no container de conteúdo
    elements.content.appendChild(elements.preferenceElements[i])
    let switchContainer = elements.preferenceElements[i].querySelector('.cc-preferences-dialog-item-switch')
    switchContainer.appendChild(components.preferenceInputs[i].element)
  })

  /* INSERINDO OS ELEMENTOS EM SEUS CONTAINERS */
  components.selectLanguage && elements.header.appendChild(components.selectLanguage.element)
  elements.header.appendChild(elements.closeIcon)
  elements.dialogContainer.appendChild(elements.header)
  elements.title.appendChild(elements.preferencesTitle)
  elements.policiesContainer.appendChild(components.cookiesPolicy.element)
  elements.policiesContainer.appendChild(components.privacyPolicy.element)
  elements.title.appendChild(elements.policiesContainer)
  elements.dialogContainer.appendChild(elements.title)
  elements.dialogContainer.appendChild(elements.content)
  elements.dialogContainer.appendChild(components.controls.element)
  elements.dialog.appendChild(elements.dialogContainer)
  settings.container.appendChild(components.overlay.element)
  settings.container.appendChild(elements.dialog)

  // Forçando uma primeira tradução para o idioma atual
  // e adicionando o observador de mudança de idioma
  if (settings.languages.length) {
    // Traduzindo elementos gerais
    translateElements(elements.dialog, settings.content[settings.languageIndex])
    translatesObserver.subscribe(translatePreferencesDialog)
  }

  // Iniciando o popper
  const popper = createPopper(elements.virtualElement, elements.dialog, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: ({ popper }) => {
            // Centralizando o popper verticalmente
            return [0, -(popper.height / 2)]
          },
        },
      }
    ],
  })

  /**
   * Exibe o popover
   */
  function show () {
    // Exibindo
    components.overlay.show()
    elements.dialog.setAttribute('data-show', '')
    // Evitando o scroll da página abaixo do diálogo
    // via: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    addClass(document.body, 'cc-dialog-open')
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
    components.overlay.hide()
    elements.dialog.removeAttribute('data-show')
    // Resetando os valores não salvos
    resetUnsavedValues()
    // Voltando o scroll da página abaixo do diálogo
    removeClass(document.body, 'cc-dialog-open')
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
   * Restaura valores não salvos
   */
  function resetUnsavedValues () {
    settings.preferences.forEach((preference, i) => {
      components.preferenceInputs[i].checked(preference.value)
      components.preferenceInputs[i].disabled(!preference.editable)
    })
  }

  /**
   * Traduz o conteúdo para o idioma selecionado
   * @param {Object} language Idioma
   */
  function translatePreferencesDialog (language) {
    lang = settings.languages[language.index].key
    settings.languageIndex = language.index
    // Traduzindo elementos gerais
    translateElements(elements.dialog, settings.content[settings.languageIndex])
    // Traduzindo as opções de preferências
    settings.preferences.forEach((preference, i) => {
      let _info = Array.isArray(preference.info) ? preference.info.find(c => c.key === lang) : preference.info
      let titleElement = elements.preferenceElements[i].querySelector('.cc-preferences-dialog-item-title')
      let contentElement = elements.preferenceElements[i].querySelector('.cc-preferences-dialog-item-desc')
      titleElement.textContent = _info.title
      contentElement.innerHTML = _info.description
    })
  }

  /**
   * destrói o componente
   */
  function destroy () {
    popper.destroy()
    if (observer) {
      observer.disconnect()
    }
    // Limpando componentes
    clearComponentsObject(components)
    // Limpando elementos HTML
    clearElementsObject(elements)
  }

  /* EVENTOS (HANDLERS) */
  /**
   * Manipula o evento click no botão Accept e dispara o evento onAccept do componente
   */
  function onBtnAcceptClick () {
    hide()
    settings.onAccept()
  }
  /**
   * Manipula o evento click no botão Reject e dispara o evento onReject do componente
   */
  function onBtnRejectClick () {
    hide()
    settings.onReject()
  }
  /**
   * Manipula o evento click no botão Save e dispara o evento onSave do componente
   */
  function onBtnSaveClick () {
    let preferences = []
    settings.preferences.forEach((preference, i) => {
      preferences.push({
        key: preference.key,
        value: components.preferenceInputs[i].getValue()
      })
    })
    hide()
    settings.onSave(preferences)
  }

  /* EVENTOS (LISTENERS) */
  elements.closeIcon.addEventListener('click', hide, false)
  observer = resizeObserver(settings.container, () => {
    winSize = getWindowSize()
  })

  return {
    element: elements.dialog,
    destroy,
    show,
    hide
  }
}
