/**
 * Verificando se um objeto é um elemento HTML
 * via: https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
export default function isHTMLElement (obj) {
  try {
    // Utilizando W3 DOM2 (funciona para FF, Opera e Chrome)
    return obj instanceof HTMLElement
  }
  catch (e) {
    // Navegadores que não possuem suporte a W3 DOM2 não têm HTMLElement
    // e um erro é gerado, terminando aqui, onde algumas propriedades que
    // todos os elementos têm são testadas (funciona no IE7)
    return (typeof obj === 'object')
      && (obj.nodeType === 1)
      && (typeof obj.style ===  'object')
      && (typeof obj.ownerDocument === 'object')
  }
}
