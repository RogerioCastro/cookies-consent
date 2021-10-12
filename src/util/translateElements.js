/**
 * Traduz elementos gerais que possuem o atributo 'data-cc-key', que especifica
 * a chave de tradução do elemento
 *
 * @param {Object} container Container HTML onde os elementos serão procurados
 * @param {Object} content Objeto de conteúdo com as traduções para o idioma atual
 */
export default function translateElements (container, content) {
  const translatables = container.querySelectorAll('[data-cc-key]')
  translatables.forEach(el => el.textContent = content[el.dataset.ccKey] || el.textContent)
}
