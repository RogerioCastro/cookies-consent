/**
 * Cria e retorna um dos ícones disponíveis
 *
 * @param {Object} options
 * @returns {Object} Elemento SVG do ícone
 */
export default function icon (options) {

  const settings = {
    icon: null,
    className: null,
    width: null,
    height: null,
    ...options
  }

  // Verificando se o identificador necessário do ícone foi informado
  if (!settings.icon) {
    return null
  }

  /* CRIANDO O SVG PARA O ÍCONE */
  let svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgElem.setAttributeNS(null, 'viewBox', '0 0 24 24')
  if (settings.className !== null) {
    svgElem.setAttributeNS(null, 'class', settings.className)
  }
  if (settings.width !== null) {
    svgElem.setAttributeNS(null, 'width', settings.width)
  }
  if (settings.height !== null) {
    svgElem.setAttributeNS(null, 'height', settings.height)
  }
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttributeNS(null, 'fill', 'currentColor')
  path.setAttributeNS(null, 'd', getPath(settings.icon))
  svgElem.appendChild(path)

  /**
   * Retorna o path específico do ícone solicitado
   * @param {String} icon Nome do ícone a ser plotado
   * @returns Path para o ícone
   */
  function getPath (icon) {
    let path = ''
    switch (icon) {
    case 'arrow-down':
      path = 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'
      break

    case 'accept':
      path = 'M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z'
      break

    case 'reject':
      path = 'M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z'
      break

    case 'config':
      path = 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z'
      break

    case 'close':
      path = 'M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z'
      break

    case 'save':
      path = 'M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z'
      break

    default:
      break
    }

    return path
  }

  return svgElem
}
