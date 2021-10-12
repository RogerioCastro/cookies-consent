import generateId from '../util/generateId'

/**
 * Cria o gerenciador de amazenamentos da biblioteca (em localStorage)
 *
 * @param {Object} options
 * @returns {Object} Objeto com as principais funções do gerenciador
 */
export default function storageManager (options) {

  const settings = {
    // Os dados armazenados são versionados.
    // Quando a versão é alterada um novo consentimento será solicitado
    version: '1',
    storageKey: 'cc-data',
    userId: null,
    ...options
  }

  let storage = window.localStorage
  let data = JSON.parse(storage.getItem(getKey()))
  settings.userId = settings.userId !== null ? settings.userId : data ? data.ui : generateId()

  /**
   * Retorna o objeto modelo para armazenamento dos dados
   * @param {Object} overwrites Propriedades a serem sobrescritas no modelo
   * @returns Objeto modelo
   */
  function getModel (overwrites = {}) {
    return {
      ui: settings.userId,
      version: settings.version,
      accept: null,
      reject: null,
      preferences: null,
      date: new Date(),
      ...overwrites
    }
  }

  /**
   * Retorna a chave de armazenamento no localStorage
   * @returns Chave de armazenamento
   */
  function getKey () {
    return `${settings.storageKey}-${settings.version}`
  }

  /**
   * Indica a versão a ser utilizada no armazenamento dos dados
   * @param {String|Number} v Versão do armazenamento
   */
  function setVersion (v) {
    if (typeof v !== 'undefined') {
      settings.version = v
    }
  }

  /**
   * Retorna a versão atual
   * @returns Versão
   */
  function getVersion () {
    return settings.version
  }

  /**
   * Retorna o ID do usuário atual
   * @returns ID do usuário
   */
  function getUserId () {
    return settings.userId
  }

  /**
   * Retorna se o consentimento já foi visto e respondido pelo usuário
   * @returns Indica se já foi respondido (true) ou não (false)
   */
  function already () {
    return !!storage.getItem(getKey())
  }

  /**
   * Armazena a resposta do usuário ao consentir com os cookies
   */
  function accept () {
    data = getModel({ accept: true })
    storage.setItem(getKey(), JSON.stringify(data))
  }

  /**
   * Armazena a resposta do usuário ao rejeitar os cookies
   */
  function reject () {
    data = getModel({ reject: true })
    storage.setItem(getKey(), JSON.stringify(data))
  }

  /**
   * Armazena as preferências
   * @param {[Object]} list Array das preferências a serem gravadas no formato [{ key, value }]
   */
  function preferences (list) {
    data = getModel({ preferences: list })
    storage.setItem(getKey(), JSON.stringify(data))
  }

  /**
   * Limpa as informações armazenadas
   */
  function clear () {
    storage.removeItem(getKey())
  }

  /**
   * Retorna os dados armazenados da biblioteca
   * @returns Objeto com os dados armazenados
   */
  function getData() {
    return data ? data : JSON.parse(storage.getItem(getKey()))
  }

  /**
   * Retorna todos os dados armazenados no localStorage
   * @returns Objeto com todos os valores armazenados: { key: value }
   */
  function allStorage () {
    let archive = {}
    let _keys = Object.keys(storage)
    let i = _keys.length

    while ( i-- ) {
      archive[ _keys[i] ] = storage.getItem( _keys[i] )
    }

    return archive
  }

  return {
    setVersion,
    getVersion,
    getUserId,
    getData,
    allStorage,
    already,
    accept,
    reject,
    preferences,
    clear,
    getKey
  }
}
