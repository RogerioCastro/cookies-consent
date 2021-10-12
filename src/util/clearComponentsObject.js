/**
 * Executa a função destroy de todos os componentes de um objeto e
 * atribui valor NULL às propriedades do objeto
 *
 * @param {Object} obj Objeto a ser limpo
 */
export default function clearComponentsObject (obj) {
  // Limpando componentes do objeto
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      let element = obj[key]
      if (Array.isArray(element)) {
        element.forEach(e => {
          e.destroy()
        })
      } else {
        element && element.destroy()
      }
      element = null
    }
  }
}
