/* eslint-disable */
const cookiesConsent = CookiesConsent({
  cookiesPolicyUrl: '#',
  privacyPolicyUrl: '#',
  version: '2',
  mainExtraClass: 'custom-main-style',
  preferencesExtraClass: 'custom-preferences-style',
  acceptLabel: 'Aceitar',
  acceptPreferencesLabel: 'Aceitar todos',
  rejectLabel: 'Recusar',
  rejectPreferencesLabel: 'Recusar todos',
  preferencesLabel: 'Preferências',
  saveLabel: 'Salvar preferências',
  privacyPolicyLabel: 'Política de Privacidade',
  cookiesPolicyLabel: 'Política de Cookies',
  preferencesTitle: 'Definições de privacidade',
  preferencesSubtitle: 'Gostaríamos da sua permissão para utilizar os seus dados para os seguintes fins:',
  content: `
    <div>
      <h5>Nós usamos cookies</h5>
      <span>Podemos utilizá-los para análise dos nossos dados de visitantes, para melhorar o nosso site, mostrar conteúdos personalizados e para lhe proporcionar uma ótima experiência no site. Para mais informações sobre os cookies que utilizamos, leia nossa <a href="#" target="_blank">Política de Cookies</a> ou clique em <strong>Preferências</strong>.</span>
    </div>
  `,
  preferences: [
    {
      key: 'necessary',
      value: true,
      editable: false,
      info: {
        title: 'Necessário',
        description: `
          Estes cookies são necessários para o bom funcionamento do nosso site e não podem ser desligados no nosso sistema.
        `
      }
    },
    {
      key: 'performance',
      value: true,
      editable: true,
      info: {
        title: 'Desempenho',
        description: `
          Utilizamos estes cookies para fornecer informações estatísticas sobre o nosso site - eles são usados para medir e melhorar o desempenho.
        `
      }
    },
    {
      key: 'functional',
      value: false,
      editable: true,
      info: {
        title: 'Funcional',
        description: `
          Utilizamos estes cookies para melhorar a funcionalidade e permitir a personalização, tais como chats ao vivo, vídeos e o uso de redes sociais.
        `
      }
    }
  ],
  onAccept: (params) => {
    console.info('[onAccept event] =>', params)
    showDialog(params)
  },
  onReject: (params) => {
    console.info('[onReject event] =>', params)
    showDialog(params)
  },
  onPreferences: () => {
    console.info('[onPreferences event]')
  },
  onLanguage: (params) => {
    console.info('[onLanguage event] =>', params)
  },
  onSave: (params) => {
    console.info('[onSave event] =>', params)
    showDialog(params)
  },
  onAlready: (params) => {
    console.info('[onAlready event] =>', params)
    showDialog(params)
  }
})

function resetAndReload () {
  cookiesConsent.clearStorage()
  document.location.reload(true)
}

function showDialog (data) {
  const message = `Dados armazenados:\n${JSON.stringify(data, null, '  ')}\n\nDeseja limpar os dados e reiniciar a biblioteca?`
  if (window.confirm(message)) {
    localStorage.clear() // Não usar em produção, apenas para demonstração
    document.location.reload(true)
  }
}

// Criando o estilo customizado
// via: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
const styleEl = document.createElement('style')
document.head.appendChild(styleEl)
const styleSheet = styleEl.sheet
styleSheet.insertRule(`
  .custom-main-style {
    color: #d4c9f4;
    background-color: #070791;
  }
`)
styleSheet.insertRule(`
  .custom-preferences-style .cc-preferences-dialog-title,
  .custom-preferences-style .cc-preferences-dialog-controls {
    color: #d4c9f4 !important;
    background-color: #070791 !important;
  }
`)
