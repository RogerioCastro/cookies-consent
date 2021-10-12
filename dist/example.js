/* eslint-disable */
const cookiesConsent = CookiesConsent({
  cookiesPolicyUrl: '#',
  privacyPolicyUrl: '#',
  version: '2',
  mainExtraClass: 'custom-main-style',
  preferencesExtraClass: 'custom-preferences-style',
  content: [
    {
      language: 'Português',
      key: 'pt',
      infoText: `
        <div>
          <h5>Nós usamos cookies</h5>
          <span>Podemos utilizá-los para análise dos nossos dados de visitantes, para melhorar o nosso site, mostrar conteúdos personalizados e para lhe proporcionar uma ótima experiência no site. Para mais informações sobre os cookies que utilizamos, leia nossa <a href="#" target="_blank">Política de Cookies</a> ou clique em <strong>Preferências</strong>.</span>
        </div>
      `,
      acceptLabel: 'Aceitar',
      acceptPreferencesLabel: 'Aceitar todos',
      rejectLabel: 'Recusar',
      rejectPreferencesLabel: 'Recusar todos',
      preferencesLabel: 'Preferências',
      saveLabel: 'Salvar preferências',
      privacyPolicyLabel: 'Política de Privacidade',
      cookiesPolicyLabel: 'Política de Cookies',
      preferencesTitle: 'Definições de privacidade',
      preferencesSubtitle: 'Gostaríamos da sua permissão para utilizar os seus dados para os seguintes fins:'
    },
    {
      language: 'English',
      key: 'en',
      infoText: `
        <div>
          <h5>We use cookies</h5>
          <span>We may use them to analyze our visitor data, to improve our website, to show you personalized content and to provide you with a great experience on the website. For more information about the cookies we use, read our <a href="#" target="_blank">Cookies Policy</a> or click on <strong>Preferences</strong>.</span>
        </div>
      `,
      acceptLabel: 'Accept',
      acceptPreferencesLabel: 'Accept all',
      rejectLabel: 'Reject',
      rejectPreferencesLabel: 'Reject all',
      preferencesLabel: 'Settings',
      saveLabel: 'Save',
      privacyPolicyLabel: 'Privacy Policy',
      cookiesPolicyLabel: 'Cookies Policy',
      preferencesTitle: 'Privacy settings',
      preferencesSubtitle: 'We would like your permission to use your data for the following purposes:'
    },
    {
      language: 'Español',
      key: 'es',
      infoText: `
        <div>
          <h5>Usamos cookies</h5>
          <span>Podemos utilizarlos para analizar los datos de nuestros visitantes, mejorar nuestro sitio web, mostrarle contenido personalizado y brindarle una gran experiencia en el sitio web. Para obtener más información sobre las cookies que utilizamos, lea nuestra <a href="#" target="_blank">Política de cookies</a> o haga clic en <strong>Preferencias</strong>.</span>
        </div>
      `,
      acceptLabel: 'Aceptar',
      acceptPreferencesLabel: 'Acepta todo',
      rejectLabel: 'Rechazar',
      rejectPreferencesLabel: 'Rechaza todo',
      preferencesLabel: 'Preferencias',
      saveLabel: 'Guarda ajustes',
      privacyPolicyLabel: 'Política de privacidad',
      cookiesPolicyLabel: 'Política de cookies',
      preferencesTitle: 'La configuración de privacidad',
      preferencesSubtitle: 'Nos gustaría su permiso para usar sus datos para los siguientes propósitos:'
    }
  ],
  preferences: [
    {
      key: 'necessary',
      value: true,
      editable: false,
      info: [
        {
          language: 'Português',
          key: 'pt',
          title: 'Necessário',
          description: `
            Estes cookies são necessários para o bom funcionamento do nosso site e não podem ser desligados no nosso sistema.
          `
        },
        {
          language: 'English',
          key: 'en',
          title: 'Necessary',
          description: `
            These cookies are required for good functionality of our website and can't be switched off in our system.
          `
        },
        {
          language: 'Español',
          key: 'es',
          title: 'Necesario',
          description: `
            Estas cookies son necesarias para una buena funcionalidad de nuestro sitio web y no se pueden desactivar en nuestro sistema.
          `
        }
      ]
    },
    {
      key: 'performance',
      value: true,
      editable: true,
      info: [
        {
          language: 'Português',
          key: 'pt',
          title: 'Desempenho',
          description: `
            Utilizamos estes cookies para fornecer informações estatísticas sobre o nosso site - eles são usados para medir e melhorar o desempenho.
          `
        },
        {
          language: 'English',
          key: 'en',
          title: 'Performance',
          description: `
            We use these cookies to provide statistical information about our website - they are used for performance measurement and improvement.
          `
        },
        {
          language: 'Español',
          key: 'es',
          title: 'Actuación',
          description: `
            Utilizamos estas cookies para proporcionar información estadística sobre nuestro sitio web; se utilizan para medir y mejorar el rendimiento.
          `
        }
      ]
    },
    {
      key: 'functional',
      value: false,
      editable: true,
      info: [
        {
          language: 'Português',
          key: 'pt',
          title: 'Funcional',
          description: `
            Utilizamos estes cookies para melhorar a funcionalidade e permitir a personalização, tais como chats ao vivo, vídeos e o uso de redes sociais.
          `
        },
        {
          language: 'English',
          key: 'en',
          title: 'Functional',
          description: `
            We use these cookies to enhance functionality and allow for personalisation, such as live chats, videos and the use of social media.
          `
        },
        {
          language: 'Español',
          key: 'es',
          title: 'Funcional',
          description: `
            Utilizamos estas cookies para mejorar la funcionalidad y permitir la personalización, como chats en vivo, videos y el uso de las redes sociales.
          `
        }
      ]
    }
  ],
  onAccept: (data) => {
    console.info('[onAccept event] =>', data)
    showDialog(data)
  },
  onReject: (data) => {
    console.info('[onReject event] =>', data)
    showDialog(data)
  },
  onPreferences: () => {
    console.info('[onPreferences event]')
  },
  onLanguage: (language) => {
    console.info('[onLanguage event] =>', language)
  },
  onSave: (data) => {
    console.info('[onSave event] =>', data)
    showDialog(data)
  },
  onAlready: (data) => {
    console.info('[onAlready event] =>', data)
    showDialog(data)
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
