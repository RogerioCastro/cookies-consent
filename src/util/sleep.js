/**
 * Função que aguarda um determinado tempo para devolver a promise e
 * pode ser utilizada para aplicar um delay à execução de instruções.
 * Exemplo: sleep(2000).then(() => { console.log('Hello world!') })
 *
 * @param {integer} ms - Tempo em milissegundos.
 *
 * @returns {Promise} Promise.
 */
export default function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
