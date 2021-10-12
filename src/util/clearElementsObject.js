import clearElement from './clearElement'

/**
 * Executa a função destroy de todos os componentes de um objeto e
 * atribui valor NULL às propriedades do objeto
 *
 * @param {Object} obj Objeto a ser limpo
 */
export default function clearElementsObject (obj) {
  // Limpando elementos HTML
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      let element = obj[key]
      if (Array.isArray(element)) {
        element.forEach(e => {
          clearElement(e)
          e.remove()
        })
      } else if (element.remove) {
        clearElement(element)
        element.remove()
      }
      element = null
    }
  }
}
