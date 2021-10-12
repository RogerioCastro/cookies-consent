/**
 * Função callback utilizada como observador para o Observer Pattern.
 *
 * @callback observerCallback
 * @param {*} data Objeto payload
 */

/**
 * Cria um objeto para aplicação do Observer Pattern
 * via: https://oieduardorabelo.medium.com/padr%C3%B5es-em-js-observer-pattern-bff0ecc55d01
 *
 * @returns Objeto Observer Pattern
 */
export default function observable () {

  let observers = [] // Observadores

  /**
   * Adiciona um observador
   * @param {observerCallback} fn Observador
   */
  function subscribe (fn) {
    observers.push(fn)
  }

  /**
   * Remove um observador
   * @param {observerCallback} fn Observador
   */
  function unsubscribe (fn) {
    observers = observers.filter(subscriber => subscriber !== fn)
  }

  // Notificar observadores
  /**
   * Notifica os observadores
   * @param {*} data Payload a ser entregue aos observadores
   */
  function notify (data) {
    observers.forEach(observer => observer(data))
  }

  /**
   * Limpa todos os observadores
   */
  function clear () {
    observers = []
  }

  return {
    subscribe,
    unsubscribe,
    notify,
    clear
  }
}
