/**
 * Fornece uma forma cross-browser para obter as dimensões da tela
 * via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
 *
 * @returns {Object} Atributos largura e altura { width, height }
 */
export default function getWindowSize () {
  if (window.innerWidth !== undefined) {
    return { width: window.innerWidth, height: window.innerHeight }
  } else {
    const D = document.documentElement
    return { width: D.clientWidth, height: D.clientHeight }
  }
}
