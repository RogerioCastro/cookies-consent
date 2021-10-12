
import createSelectLanguage from './selectLanguage'
import createControls from './controls'
import createLink from './link'
import clearComponentsObject from '../util/clearComponentsObject'
import clearElementsObject from '../util/clearElementsObject'
import translatesObserver from '../util/translatesObserver'
import translateElements from '../util/translateElements'
import createElement from '../util/createElement'
import sleep from '../util/sleep'
import {
  ACCEPT_LABEL,
  REJECT_LABEL,
  PREFERENCES_LABEL,
  PRIVACY_POLICY_LABEL,
  COOKIES_POLICY_LABEL
} from '../util/constants'
import css from '../util/css'

/**
 * Componente diálogo de rodapé (bottomSheet)
 *
 * @param {Object} options
 * @returns {Object} Componente bottomSheet
 */
export default function bottomSheet (options) {

  const settings = {
    container: document.body,
    content: '',
    acceptLabel: ACCEPT_LABEL,
    rejectLabel: REJECT_LABEL,
    preferencesLabel: PREFERENCES_LABEL,
    privacyPolicyLabel: PRIVACY_POLICY_LABEL,
    privacyPolicyUrl: null,
    cookiesPolicyLabel: COOKIES_POLICY_LABEL,
    cookiesPolicyUrl: null,
    class: 'cc-bottom-sheet',
    extraClass: null,
    hasReject: false,
    hasConfig: false,
    showIcons: true,
    languages: [],
    languageIndex: 0,
    onAccept: () => {},
    onReject: () => {},
    onConfig: () => {},
    ...options
  }
  const elements = {
    main: null, // Elemento principal (container)
    header: null, // Cabeçalho (container)
    policiesContainer: null, // Container para os links das políticas
    content: null, // Conteúdo (texto principal)
  }
  const components = {
    selectLanguage: null, // Seleção de idioma
    cookiesPolicy: null, // Política de cookies
    privacyPolicy: null, // Política de privacidade
    controls: null, // Componente controls (menu de botões)
  }

  /* CRIAÇÃO DOS ELEMENTOS */
  // Elemento principal (container)
  elements.main = createElement('div', {
    className: settings.class + (settings.extraClass ? ` ${settings.extraClass}` : '')
  })
  // Cabeçalho
  elements.header = createElement('div', {
    className: 'cc-bottom-sheet-header'
  })
  // Seleção de idioma
  if (settings.languages.length) {
    components.selectLanguage = createSelectLanguage({
      container: settings.container,
      languages: settings.languages,
      selected: settings.languages.length ? settings.languageIndex : null
    })
    css(components.selectLanguage.element, { color: 'rgb(180, 180, 191)' })
  }
  // Container para os links das políticas
  elements.policiesContainer = createElement('div', {
    className: 'cc-bottom-sheet-policies'
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
    translateKey: 'privacyPolicyLabel'
  })
  // Conteúdo (texto principal)
  elements.content = createElement('div', {
    className: 'cc-bottom-sheet-content',
    innerHTML: Array.isArray(settings.content) ? settings.content[settings.languageIndex].infoText : settings.content
  })
  // Componente controls (menu de botões)
  components.controls = createControls({
    parentName: 'bottomSheet',
    className: 'cc-bottom-sheet-controls',
    acceptLabel: settings.acceptLabel,
    rejectLabel: settings.rejectLabel,
    preferencesLabel: settings.preferencesLabel,
    showIcons: settings.showIcons,
    hasConfig: settings.hasConfig,
    hasReject: settings.hasReject,
    onAccept: onBtnAcceptClick,
    onReject: onBtnRejectClick,
    onConfig: onBtnConfigClick
  })

  /* INSERINDO OS ELEMENTOS EM SEUS CONTAINERS */
  if (settings.languages.length) {
    elements.header.appendChild(components.selectLanguage.element)
  } else {
    elements.header.appendChild(createElement('div'))
  }
  elements.policiesContainer.appendChild(components.cookiesPolicy.element)
  elements.policiesContainer.appendChild(components.privacyPolicy.element)
  elements.header.appendChild(elements.policiesContainer)
  if (settings.languages.length || settings.privacyPolicyUrl || settings.cookiesPolicyUrl) {
    elements.main.appendChild(elements.header)
  }
  elements.main.appendChild(elements.content)
  elements.main.appendChild(components.controls.element)
  settings.container.appendChild(elements.main)

  // Forçando uma primeira tradução para o idioma atual
  // e adicionando o observador de mudança de idioma
  if (settings.languages.length) {
    // Traduzindo elementos gerais
    translateElements(elements.main, settings.content[settings.languageIndex])
    translatesObserver.subscribe(translateBottomSheet)
  }

  /**
   * Exibe o diálogo
   */
  function show () {
    css(elements.main, { opacity: '1', bottom: '0' })
  }

  /**
   * Oculta o diálogo
   */
  function hide () {
    css(elements.main, { bottom: '-500px' })
    sleep(1000).then(() => css(elements.main, { bottom: '-2000px', opacity: '0' }))
  }

  /**
   * destrói o componente
   */
  function destroy () {
    // Limpando componentes
    clearComponentsObject(components)
    // Limpando elementos HTML
    clearElementsObject(elements)
  }

  /**
   * Traduz o conteúdo para o idioma selecionado
   * @param {Object} language Idioma
   */
  function translateBottomSheet (language) {
    // const keyLanguage = settings.languages[language.index].key
    settings.languageIndex = language.index
    // Traduzindo o texto principal para o idioma selecionado
    elements.content.innerHTML = settings.content[settings.languageIndex].infoText
    // Traduzindo elementos gerais
    translateElements(elements.main, settings.content[settings.languageIndex])
  }

  /* EVENTOS (HANDLERS) */
  /**
   * Manipula o evento click no botão Accept e dispara o evento onAccept do componente
   */
  function onBtnAcceptClick () {
    settings.onAccept()
  }
  /**
   * Manipula o evento click no botão Reject e dispara o evento onReject do componente
   */
  function onBtnRejectClick () {
    settings.onReject()
  }
  /**
   * Manipula o evento click no botão Config e dispara o evento onConfig do componente
   */
  function onBtnConfigClick () {
    settings.onConfig()
  }

  return {
    element: elements.main,
    destroy,
    show,
    hide
  }
}
