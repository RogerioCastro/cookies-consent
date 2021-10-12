/**
 * Função para observar o redimensionamento de um elemento HTML utilizando a API ResizeObserver
 * @param {HTMLElement} element Elemento HTML a ser observado
 * @param {Function} fn Callback function que recebe a largura e altura do elemento { width, height }
 * @returns Retorna a instância ResizeObserver criada
 */
export default function resizeObserver (element, fn) {
  const ro = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect
    fn({ width, height })
  })
  ro.observe(element)
  return ro
}
