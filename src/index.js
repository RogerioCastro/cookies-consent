/*
 * Cookies Consent 1.0.0
 *
 * Copyright 2021 Rogério Castro.
 * Released under the MIT license
 */
import createBottomSheet from './core/bottomSheet'
import createPreferencesDialog from './core/preferencesDialog'
import createStorageManager from './core/storageManager'
import clearComponentsObject from './util/clearComponentsObject'
import translatesObserver from './util/translatesObserver'
import storageAvailable from './util/storageAvailable'
import isHTMLElement from './util/isHTMLElement'
import sleep from './util/sleep'
import {
  ACCEPT_LABEL,
  REJECT_LABEL,
  PREFERENCES_LABEL,
  SAVE_LABEL,
  ACCEPT_PREFERENCES_LABEL,
  REJECT_PREFERENCES_LABEL,
  PRIVACY_POLICY_LABEL,
  COOKIES_POLICY_LABEL,
  PREFERENCES_TITLE,
  PREFERENCES_SUBTITLE,
  DEFAULT_VERSION,
  DEFAULT_STORAGE_KEY,
  DEFAULT_DELAY
} from './util/constants'
import './styles/main.scss'

/**
 * Inicializa a biblioteca
 * @param {Object} options Configurações gerais
 * @returns {Object}
 */
export default function CookiesConsent(options) {

  // Configurações gerais
  const settings = {
    container: document.body,
    content: null,
    preferences: null,
    mainExtraClass: null,
    preferencesExtraClass: null,
    hasReject: true,
    showIcons: true,
    delay: DEFAULT_DELAY,
    userId: null,
    version: DEFAULT_VERSION,
    storageKey: DEFAULT_STORAGE_KEY,
    acceptLabel: ACCEPT_LABEL,
    rejectLabel: REJECT_LABEL,
    preferencesLabel: PREFERENCES_LABEL,
    acceptPreferencesLabel: ACCEPT_PREFERENCES_LABEL,
    rejectPreferencesLabel: REJECT_PREFERENCES_LABEL,
    saveLabel: SAVE_LABEL,
    preferencesTitle: PREFERENCES_TITLE,
    preferencesSubtitle: PREFERENCES_SUBTITLE,
    privacyPolicyLabel: PRIVACY_POLICY_LABEL,
    privacyPolicyUrl: null,
    cookiesPolicyLabel: COOKIES_POLICY_LABEL,
    cookiesPolicyUrl: null,
    onAccept: () => {},
    onReject: () => {},
    onPreferences: () => {},
    onLanguage: () => {},
    onSave: () => {},
    onAlready: () => {},
    ...options
  }
  const components = {
    bottomSheet: null,
    preferencesDialog: null
  }
  const languages = []
  let languageIndex = 0

  // Verificando o container
  if (settings.container && typeof settings.container === 'object' && settings.container !== null && !isHTMLElement(settings.container)) {
    throw new Error('O objeto fornecido como container não é um elemento HTML válido.')
  } else if (settings.container && typeof settings.container === 'string') {
    settings.container = document.querySelector(settings.container)
    if (!settings.container) {
      throw new Error('Não há nenhum elemento para container válido com o seletor fornecido.')
    }
  }

  // Verificado o suporte a armazenamento local
  if (!storageAvailable()) {
    throw new Error('Não há suporte para armazenamento local de preferências de cookies.')
  }

  // Verificado conteúdo principal
  if (!settings.content) {
    throw new Error('Sem conteúdo textual para a janela de consentimento de cookies.')
  }

  // Iniciando o gerenciador de armazenamento local e informando a versão dos dados armazenados
  const storageManager = createStorageManager({
    version: settings.version,
    storageKey: settings.storageKey,
    userId: settings.userId
  })

  // Verificado se o consentimento já foi visualizado e respondido
  if (storageManager.already()) {
    // Consentimento já visualizado e respondido
    settings.onAlready(storageManager.getData())
  } else {
    // Verificando se o conteúdo é uma array com outros idiomas
    // e setando o idioma inicial
    if (Array.isArray(settings.content)) {
      settings.content.forEach((c, index) => {
        if (index === 0) {
          languageIndex = index
        }
        languages.push({ language: c.language, key: c.key, index })
      })
      // Inserindo o observador que dispara o evento onLanguage da biblioteca
      translatesObserver.subscribe(dispatchOnLanguage)
    }

    // Janela inicial (caixa de aviso e consentimento)
    components.bottomSheet = createBottomSheet({
      container: settings.container,
      content: settings.content,
      hasReject: settings.hasReject,
      hasConfig: settings.preferences && settings.preferences.length,
      acceptLabel: settings.acceptLabel,
      rejectLabel: settings.rejectLabel,
      preferencesLabel: settings.preferencesLabel,
      privacyPolicyLabel: settings.privacyPolicyLabel,
      privacyPolicyUrl: settings.privacyPolicyUrl,
      cookiesPolicyLabel: settings.cookiesPolicyLabel,
      cookiesPolicyUrl: settings.cookiesPolicyUrl,
      extraClass: settings.mainExtraClass,
      showIcons: settings.showIcons,
      languages,
      languageIndex,
      onAccept: onAccept,
      onReject: onReject,
      onConfig: onConfig
    })
    // Esperando um pouco para exibir a caixa de consentimento
    sleep(settings.delay).then(() => components.bottomSheet.show())

    // Criando o diálogo de preferências, se for o caso
    if (settings.preferences && settings.preferences.length) {
      components.preferencesDialog = createPreferencesDialog({
        container: settings.container,
        content: settings.content,
        preferences: settings.preferences,
        acceptLabel: settings.acceptPreferencesLabel,
        rejectLabel: settings.rejectPreferencesLabel,
        saveLabel: settings.saveLabel,
        preferencesTitle: settings.preferencesTitle,
        preferencesSubtitle: settings.preferencesSubtitle,
        privacyPolicyLabel: settings.privacyPolicyLabel,
        privacyPolicyUrl: settings.privacyPolicyUrl,
        cookiesPolicyLabel: settings.cookiesPolicyLabel,
        cookiesPolicyUrl: settings.cookiesPolicyUrl,
        hasReject: settings.hasReject,
        extraClass: settings.preferencesExtraClass,
        showIcons: settings.showIcons,
        languages,
        languageIndex,
        onAccept: onAccept,
        onReject: onReject,
        onSave: onPreferencesSave
      })
    }
  }

  /**
   * Retorna os dados armazenados no localStorage
   * @returns {Object} Dados armazenados
   */
  function getData () {
    return storageManager.getData()
  }

  /**
   * Retorna o valor de uma configuração da biblioteca (em settings)
   * @param {String} key Nome da configuração
   * @returns {*} Valor da configurações
   */
  function getOption (key) {
    if (key in settings) {
      return settings[key]
    }
    return undefined
  }

  /**
   * Retorna o ID do usuário (fornecido para a instância ou gerado pelo storageManager)
   * @returns {String} ID do usuário
   */
  function getUserId () {
    return storageManager.getUserId()
  }

  /**
   * Retorna a chave de armazenamento atual no localStorage
   * @returns {String} Chave de armazenamento no localStorage
   */
  function getStorageKey () {
    return storageManager.getKey()
  }

  /**
   * Retorna a lista de idiomas identificados na inicialização
   * @returns {[Object]} Array de idiomas no formato [{ index, key, language }]
   */
  function getLanguages () {
    return languages.length ? languages : null
  }

  /**
   * Limpa os dados armazenados pela biblioteca
   */
  function clearStorage () {
    return storageManager.clear()
  }

  /**
   * Limpando os elementos e liberando a memória na medida do possível
   */
  function destroy () {
    // Limpando componentes
    clearComponentsObject(components)
    if (translatesObserver) {
      translatesObserver.clear()
    }
  }

  /* EVENTOS (HANDLERS) */
  /**
   * Manipula o evento click no botão Accept e dispara o evento onAccept da biblioteca
   */
  function onAccept () {
    components.bottomSheet.hide()
    storageManager.accept()
    settings.onAccept(storageManager.getData())
    destroy()
  }
  /**
   * Manipula o evento click no botão Reject e dispara o evento onReject da biblioteca
   */
  function onReject () {
    components.bottomSheet.hide()
    storageManager.reject()
    settings.onReject(storageManager.getData())
    destroy()
  }
  /**
   * Manipula o evento click no botão Config e dispara o evento onConfig da biblioteca
   */
  function onConfig () {
    if (components.preferencesDialog) {
      components.preferencesDialog.show()
      settings.onPreferences()
    }
  }
  /**
   * Manipula o evento click no botão Save da janela de preferências
   * @param {[Object]} preferences Array de preferências no formato [{ key, value }]
   */
  function onPreferencesSave (preferences) {
    components.bottomSheet.hide()
    storageManager.preferences(preferences)
    settings.onSave(storageManager.getData())
    destroy()
  }
  /**
   * Dispara o evento onLanguage da biblioteca
   * @param {Object} language Idioma selecionado
   */
  function dispatchOnLanguage (language) {
    settings.onLanguage(language)
  }

  return {
    getData,
    getUserId,
    getOption,
    clearStorage,
    getStorageKey,
    getLanguages,
    destroy
  }
}
