import createRippleButton from './rippleButton'
import createElement from '../util/createElement'
import clearComponentsObject from '../util/clearComponentsObject'
import clearElementsObject from '../util/clearElementsObject'
import {
  ACCEPT_LABEL,
  REJECT_LABEL,
  PREFERENCES_LABEL,
  SAVE_LABEL,
  ACCEPT_PREFERENCES_LABEL,
  REJECT_PREFERENCES_LABEL,
} from '../util/constants'

/**
 * Componente controls (menu de botões)
 *
 * @param {Object} options
 * @returns {Object} Componente controls
 */
export default function controls (options) {

  const settings = {
    className: '',
    parentName: 'bottomSheet', // bottomSheet | preferencesDialog
    acceptLabel: ACCEPT_LABEL,
    rejectLabel: REJECT_LABEL,
    preferencesLabel: PREFERENCES_LABEL,
    acceptPreferencesLabel: ACCEPT_PREFERENCES_LABEL,
    rejectPreferencesLabel: REJECT_PREFERENCES_LABEL,
    saveLabel: SAVE_LABEL,
    showIcons: true,
    hasConfig: true,
    hasReject: true,
    onAccept: () => {},
    onReject: () => {},
    onConfig: () => {},
    onSave: () => {},
    ...options
  }
  const elements = {
    controls: null, // Container dos botões (controles)
  }
  const components = {
    btnAccept: null, // Botão Aceitar
    btnReject: null, // Botão Rejeitar
    btnConfig: null, // Botão Preferências (em bottomSheet)
    btnSave: null, // Botão Salvar preferências (em preferencesDialog)
  }

  // Container dos botões (controles)
  elements.controls = createElement('div', {
    className: settings.className
  })

  // Botão Aceitar
  components.btnAccept = createRippleButton({
    className: settings.parentName === 'preferencesDialog' ? 'cc-preferences-dialog-btn' : 'cc-bottom-sheet-btn',
    text: settings.parentName === 'preferencesDialog' ? settings.acceptPreferencesLabel : settings.acceptLabel,
    icon: settings.showIcons ? 'accept' : null,
    translateKey: settings.parentName === 'preferencesDialog' ? 'acceptPreferencesLabel' : 'acceptLabel',
    onClick: onBtnAcceptClick
  })

  // Botão Rejeitar
  components.btnReject = createRippleButton({
    className: settings.parentName === 'preferencesDialog' ? 'cc-preferences-dialog-btn' : 'cc-bottom-sheet-btn',
    text: settings.parentName === 'preferencesDialog' ? settings.rejectPreferencesLabel : settings.rejectLabel,
    icon: settings.showIcons ? 'reject' : null,
    translateKey: settings.parentName === 'preferencesDialog' ? 'rejectPreferencesLabel' : 'rejectLabel',
    onClick: onBtnRejectClick
  })

  if (settings.parentName === 'bottomSheet') {
    // Botão Preferências
    components.btnConfig = createRippleButton({
      className: 'cc-bottom-sheet-btn',
      text: settings.preferencesLabel,
      icon: settings.showIcons ? 'config' : null,
      translateKey: 'preferencesLabel',
      onClick: onBtnConfigClick
    })
  }

  if (settings.parentName === 'preferencesDialog') {
    // Botão Salvar preferências
    components.btnSave = createRippleButton({
      className: 'cc-preferences-dialog-btn',
      text: settings.saveLabel,
      icon: settings.showIcons ? 'save' : null,
      translateKey: 'saveLabel',
      onClick: onBtnSaveClick
    })
  }

  /* Inserindo os elementos aos seus containers */
  if (settings.parentName === 'preferencesDialog') {
    elements.controls.appendChild(components.btnSave.element)
  }
  elements.controls.appendChild(components.btnAccept.element)
  if (settings.parentName === 'bottomSheet' && settings.hasConfig) {
    elements.controls.appendChild(components.btnConfig.element)
  }
  settings.hasReject && elements.controls.appendChild(components.btnReject.element)

  /**
   * destrói o componente
   */
  function destroy () {
    // Limpando componentes
    clearComponentsObject(components)
    // Limpando elementos HTML
    clearElementsObject(elements)
  }

  /* Eventos (handlers) */
  /**
   * Manipula o evento click no botão Accept e dispara o evento onAccept do componente
   * @param {Object} e Evento
   */
  function onBtnAcceptClick (e) {
    e.preventDefault()
    settings.onAccept()
  }
  /**
   * Manipula o evento click no botão Reject e dispara o evento onReject do componente
   * @param {Object} e Evento
   */
  function onBtnRejectClick (e) {
    e.preventDefault()
    settings.onReject()
  }
  /**
   * Manipula o evento click no botão Config e dispara o evento onConfig do componente
   * @param {Object} e Evento
   */
  function onBtnConfigClick (e) {
    e.preventDefault()
    settings.onConfig()
  }
  /**
   * Manipula o evento click no botão Save e dispara o evento onSave do componente
   * @param {Object} e Evento
   */
  function onBtnSaveClick (e) {
    e.preventDefault()
    settings.onSave()
  }

  return {
    element: elements.controls,
    destroy
  }
}
