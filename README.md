# Cookies Consent

Biblioteca para aviso amigável de utilização de *cookies* e gerenciamento do consentimento ou preferências do usuário sobre os *cookies* utilizados.

<p align="center"><img src="https://raw.githubusercontent.com/RogerioCastro/cookies-consent/main/dist/assets/images/example.png"></p>

> Veja uma **demonstração** da biblioteca, baixando o conteúdo do diretório [`/dist`](/dist) e rodando o arquivo `index.html`.

## Requisitos

Essa biblioteca utiliza [**localStorage**](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) para armazenar as opções de consentimento no navegador do usuário.

## Instalação

Baixe o arquivo de produção da biblioteca que está localizado no diretório [`/dist`](/dist) e acrescente-o à `HEAD` da página. 

```html
<head>
  ...
  <script src="cookies-consent.min.js"></script>
  ...
</head>
```

## Utilização

Ao final do corpo da página insira o script de inicialização e configuração da biblioteca.

```html
<body>
  <script>
    const cookiesConsent = CookiesConsent({
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
            description: 'Estes cookies são necessários para o bom funcionamento do nosso site e não podem ser desligados no nosso sistema.'
          }
        },
        {
          key: 'performance',
          value: true,
          editable: true,
          info: {
            title: 'Desempenho',
            description: 'Utilizamos estes cookies para fornecer informações estatísticas sobre o nosso site - eles são usados para medir e melhorar o desempenho.'
          }
        }
      ]
    });
  </script>
</body>
```

## API

```javascript
const cookiesConsent = CookiesConsent(options);
// ou
CookiesConsent(options);
```

`options` é um objeto que contém as propriedades de inicialização, configuração e manipulação de eventos da biblioteca. A única propriedade obrigatória é `content`, que pode ser uma **string** com o texto informativo sobre a utilização de *cookies* (pode ser em HTML) ou uma **array**, onde cada elemento representa um idioma.

> Informar uma **array** para a propriedade `content` automaticamente habilita a exibição do **menu de idiomas** (dropdown) nos cabeçalhos das janelas inicial e de configurações. O primeiro idioma na array será exibido inicialmente.

### Estrutura do objeto para cada idioma (quando `content` é uma *array*)

```javascript
content: [
  {
    language: 'Português', // Nome do idioma
    key: 'pt', // Código ISO 639-1 do idioma
    infoText: `
      <div>
        <h5>Nós usamos cookies</h5>
        <p>Eles são utilizados para análise dos nossos dados de visitantes, para melhorar o nosso site, mostrar conteúdos personalizados e para lhe proporcionar uma ótima experiência no site. Para mais informações sobre os cookies que utilizamos, leia nossa <a href="#" target="_blank">Política de Cookies</a>.</p>
      </div>
    `, // Texto principal (pode conter HTML)
    acceptLabel: 'Aceitar', // Rótulo do botão de aceitação (janela inicial)
    acceptPreferencesLabel: 'Aceitar todos', // Rótulo do botão de aceitação (janela de configuração)
    rejectLabel: 'Recusar', // Rótulo do botão de recusa (janela inicial)
    rejectPreferencesLabel: 'Recusar todos', // Rótulo do botão de recusa (janela de configuração)
    preferencesLabel: 'Preferências', // Rótulo do botão de configuração (janela inicial)
    saveLabel: 'Salvar preferências', // Rótulo do botão de salvamento (janela de configuração)
    privacyPolicyLabel: 'Política de Privacidade', // Rótulo do link para a Política de privacidade
    cookiesPolicyLabel: 'Política de Cookies', // Rótulo do link para a Política de cookies
    preferencesTitle: 'Definições de privacidade', // Título da janela de configuração
    preferencesSubtitle: 'Gostaríamos da sua permissão para utilizar os seus dados para os seguintes fins:' // Subtítulo da janela de configuração
  },
  // outros idiomas...
]
```

> Lista de códigos ISO 639-1 para idiomas: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

Caso não deseje suporte a vários idiomas, basta informar apenas o texto de exibição na propriedade `content`:

```javascript
content: `
  <div>
    <h5>Nós usamos cookies</h5>
    <p>Eles são utilizados para análise dos nossos dados de visitantes, para melhorar o nosso site, mostrar conteúdos personalizados e para lhe proporcionar uma ótima experiência no site. Para mais informações sobre os cookies que utilizamos, leia nossa <a href="#" target="_blank">Política de Cookies</a>.</p>
  </div>
`
```

Outra propriedade importante em `options`, embora seja opcional, é `preferences` que, quando informada, habilita o botão de acesso à janela de configurações. Trata-se de uma **array**, onde cada elemento representa uma opção (tipo de *cookie*) configurável ou não a ser exibida ao usuário.

### Estrutura do objeto para cada opção (`preferences`)

```javascript
preferences: [
  {
    key: 'necessary', // Chave de identificação da opção
    value: true, // Valor que indica se essa opção foi aceita ou não
    editable: false, // Indica se é uma opção que pode ser editada pelo usuário
    /* 'info' pode ser um objeto ou uma array (veja explicação mais adiante) */
    info: {
      title: 'Necessário', // Título de exibição da opção
      description: `
        Estes cookies são necessários para o bom funcionamento do nosso site e não podem ser desligados no nosso sistema.
      ` // Descrição da opção
    }
  },
  // outros opções...
]
```

A propriedade `info` de cada item da *array* `preferences` pode ser um **objeto**, quando não há suporte a vários idiomas, ou uma **array**, onde cada elemento representa um idioma. A quantidade e ordem dos idiomas informados aqui devem coincidir com o que foi informado na propriedade `content` de `options`.

### Estrutura do objeto para cada opção, com vários idiomas (`preferences`)

```javascript
preferences: [
  {
    key: 'necessary',
    value: true,
    editable: false,
    /* Exemplo de 'info' com suporte a vários idiomas */
    info: [
      {
        language: 'Português', // Nome do idioma
        key: 'pt', // Código ISO 639-1 do idioma
        title: 'Necessário', // Título de exibição da opção
        description: `
          Estes cookies são necessários para o bom funcionamento do nosso site e não podem ser desligados no nosso sistema.
        `
      }, // Descrição da opção
      // outros idiomas
    ]
  }
```

### Todas as opções (propriedades) do objeto `options`

| Propriedade | Tipo | Descrição |
| ----------- | ---- | --------- |
| `content` | `string|array` | Conteúdo a ser exibido na janela inicial. Essa é a única propriedade **obrigatória** e pode ser uma **string** ou, em caso de suporte a vários idiomas, uma **array**, onde cada elemento representa um idioma (veja exemplo acima). O conteúdo pode conter HTML. Valor padrão: `null`. |
| `preferences` | `array` | Opções configuráveis ou não a serem apresentadas na janela de configurações. Trata-se de uma **array**, onde cada elemento representa uma opção de configuração (veja exemplo acima). Valor padrão: `null`. |
| `container` | `HTMLElement` | Elemento HTML onde os elementos da biblioteca serão inseridos. Valor padrão: `document.body`. |
| `mainExtraClass` | `string` | Nome da classe CSS a ser adicionada à janela inicial para customizações. Valor padrão: `null`. |
| `preferencesExtraClass` | `string` | Nome da classe CSS a ser adicionada à janela de configuração para customizações. Valor padrão: `null`. |
| `hasReject` | `boolean` | Habilita ou desabilita a exibição do botão **Recusar**. Valor padrão: `true`. |
| `showIcons` | `boolean` | Habilita ou desabilita a exibição de ícones nos botões. Valor padrão: `true`. |
| `delay` | `number` | Tempo, em milissegundos, para a apresentação do aviso de cookies após o carregamento da página (janela inicial). Valor padrão: `1000`. |
| `userId` | `string` | Pode ser utilizada para identificar o usuário atual no armazenamento local dos dados da biblioteca. Se não for informado a biblioteca irá gerar um ID (estilo ObjectId/MongoDB) para armazenamento das informações no navegador. Valor padrão: `null`. |
| `version` | `string` | Indica a versão atual da instância (*string*) e é utilizada na chave de armazenamento dos dados da biblioteca. Quando essa versão é alterada um novo consentimento será solicitado ao usuário. Essa opção pode ser útil quando há atualização nas políticas de cookies e é necessário que o usuário conceda um novo consentimento. Valor padrão: `'v1'`. |
| `storageKey` | `string` | Chave a ser utilizada para o armazemento local dos dados da biblioteca. A chave completa é uma concatenação desta propriedade, hífen e a propriedade `version`, exemplo: `'cc-data-v1'`. Valor padrão: `'cc-data'`. |
| `acceptLabel` | `string` | Rótulo padrão a ser exibido no botão de aceitação, na janela inicial, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Aceitar'`. |
| `rejectLabel` | `string` | Rótulo padrão a ser exibido no botão de recusa, na janela inicial, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Recusar'`. |
| `preferencesLabel` | `string` | Rótulo padrão a ser exibido no botão de configuração, na janela inicial, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Configurações'`. |
| `acceptPreferencesLabel` | `string` | Rótulo padrão a ser exibido no botão de aceitação, na janela de configurações, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Aceitar todos'`. |
| `rejectPreferencesLabel` | `string` | Rótulo padrão a ser exibido no botão de recusa, na janela de configurações, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Recusar todos'`. |
| `saveLabel` | `string` | Rótulo padrão a ser exibido no botão de salvamento, na janela de configurações, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Salvar preferências'`. |
| `preferencesTitle` | `string` | Título padrão a ser exibido na janela de configurações, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Definições de privacidade'`. |
| `preferencesSubtitle` | `string` | Subtítulo padrão a ser exibido na janela de configurações, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Gostaríamos da sua permissão para utilizar os seus dados para os seguintes fins:'`. |
| `privacyPolicyLabel` | `string` | Rótulo padrão a ser exibido no link para a Política de privacidade, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Política de privacidade'`. |
| `privacyPolicyUrl` | `string` | URL do link para a Política de privacidade. Caso não seja informado o link não será exibido. Valor padrão: `null`. |
| `cookiesPolicyLabel` | `string` | Rótulo padrão a ser exibido no link para a Política de cookies, caso o suporte a vários idiomas não esteja habilitado. Valor padrão: `'Política de cookies'`. |
| `cookiesPolicyUrl` | `string` | URL do link para a Política de cookies. Caso não seja informado o link não será exibido. Valor padrão: `null`. |
| `onAccept` | `function` | Função executada quando o usuário clica em aceitar, tanto na janela inicial quanto na janela de configurações. Essa função recebe como argumento um objeto com os dados gerais armazenados pela biblioteca. Formato: `callback({ ui, version, accept, reject, preferences, date })`. |
| `onReject` | `function` | Função executada quando o usuário clica em recusar, tanto na janela inicial quanto na janela de configurações. Essa função recebe como argumento um objeto com os dados gerais armazenados pela biblioteca. Formato: `callback({ ui, version, accept, reject, preferences, date })`. |
| `onPreferences` | `function` | Função executada quando o usuário clica no botão de configuração, na janela inicial. Essa função não recebe nenhum argumento. |
| `onLanguage` | `function` | Função executada quando o usuário escolhe um idioma, tanto na janela inicial quanto na janela de configurações. Essa função recebe como argumento um objeto com os dados do idioma escolhido. Formato: `callback({ index, key, language })`. |
| `onSave` | `function` | Função executada quando o usuário clica em salvar, na janela de configurações. Essa função recebe como argumento um objeto com os dados gerais armazenados pela biblioteca. Formato: `callback({ ui, version, accept, reject, preferences, date })`. |
| `onAlready` | `function` | Função executada na inicialização da biblioteca, quando o usuário já possui informações armazenadas em seu navegador, indicando que este já visualizou e respondeu ao consentimento. Essa função recebe como argumento um objeto com os dados gerais armazenados pela biblioteca. Formato: `callback({ ui, version, accept, reject, preferences, date })`. |

A chamada da função `CookiesConsent(options)` inicializa e executa a biblioteca, mas também retorna um objeto que pode ser utilizado para acessar algumas funcionalidades da instância.

### Propriedades do objeto retornado (instância)

| Propriedade | Tipo | Descrição |
| ----------- | ---- | --------- |
| `getData` | `function` | Função que retorna um objeto com os dados armazenados pelo biblioteca no `localStorage` do navegador. Modelo do objeto: `{ ui, version, accept, reject, preferences, date }`. Esse objeto também é fornecido como argumento das *callbacks* dos eventos: `onAccept`, `onReject`, `onSave` e `onAlready`. Veja o detalhamento desse objeto a seguir. |
| `getUserId` | `function` | Função que retorna o ID do usuário (*string*), fornecido previamente via `options` ou gerado pela biblioteca. |
| `getOption` | `function` | Função que retorna o valor de uma opção (configuração) pelo seu nome. Se o nome não existir nas configurações (veja `options`) o retorno será `undefined`. Exemplo: `cookiesConsent.getOption('version')`. |
| `clearStorage` | `function` | Função que limpa os dados armazenados pelo biblioteca no navegador do usuário. Apaga somente os dados armazenados com a versão atual (`options.version`). |
| `getStorageKey` | `function` | Função que retorna a chave (*string*) utilizada para armazenamento dos dados da biblioteca. |
| `getLanguages` | `function` | Função que retorna a lista de idiomas (*array*), quando for o caso. Cada elemento do *array* retornado tem o formato `{ index, key, language }`. |
| `destroy` | `function` | Função que remove do DOM os elementos HTML criados pela instância. |

### Dados armazenados pela biblioteca

A biblioteca armazena dados básicos do consentimento e preferências no navegador do usuário, por meio do [**localStorage**](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage). O objeto de dados armazenado é fornecido como argumento das *callbacks* dos eventos `onAccept`, `onReject`, `onSave` e `onAlready`, ou pode ser acessado na propriedade `data` da instância.

O objeto armazenado tem a seguinte estrutura:

| Propriedade | Tipo | Descrição |
| ----------- | ---- | --------- |
| `ui` | `string` | ID do usuário, fornecido via `options` ou gerado pela biblioteca no formato ObjectId (MongoDB). |
| `version` | `string` | Versão utilizada pela biblioteca para formar a chave de armazenamento local de dados, pode ser fornecida via `options`. |
| `accept` | `boolean` | Valor que indica se houve aceitação (`true`) ou `null`, quando não há uma resposta ainda ou no caso de outra opção ter sido preenchida (`reject` ou `preferences`). |
| `reject` | `boolean` | Valor que indica se houve recusa (`true`) ou `null`, quando não há uma resposta ainda ou no caso de outra opção ter sido preenchida (`accept` ou `preferences`). |
| `preferences` | `array` | Lista de objetos com os valores configurados para cada opção ou `null`, quando não há uma resposta ainda ou no caso de outra opção ter sido preenchida (`accept` ou `reject`). Cada elemento dessa *array* é um objeto no formato: `{ key, value }`. |
| `date` | `string` | Data de salvamento dos dados. |

## Customização (CSS)

A biblioteca permite a customização de estilos por meio das opções `mainExtraClass` e `preferencesExtraClass` (em `options`), que adicionam classes CSS às janelas inicial e de configurações, respectivamente.

Para facilitar a sobrescrição dos estilos utilizados, seguem as estruturas HTML das duas janelas utilizadas na biblioteca:

### Estrutura HTML da janela inicial

```html
<div class="cc-bottom-sheet mainExtraClass">
  <div class="cc-bottom-sheet-header">
    <div class="cc-select-languages"></div>
    <div class="cc-bottom-sheet-policies">
      <div class="cc-link"></div>
    </div>
  </div>
  <div class="cc-bottom-sheet-content"></div>
  <div class="cc-bottom-sheet-controls">
    <button class="cc-ripple-button cc-bottom-sheet-btn">
      <svg class="svg-icon"></svg>
      <span class="cc-ripple-button-label"></span>
    </button>
  </div>
</div>
```

### Estrutura HTML da janela de configurações

```html
<div class="cc-preferences-dialog preferencesExtraClass">
  <div class="cc-preferences-dialog-container">
    <div class="cc-preferences-dialog-header">
      <div class="cc-select-languages"></div>
      <svg class="cc-preferences-dialog-close"></svg>
    </div>
    <div class="cc-preferences-dialog-title">
      <div><span data-cc-key="preferencesTitle"></span></div>
      <div class="cc-preferences-dialog-policies">
        <div class="cc-link"></div>
      </div>
    </div>
    <div class="cc-preferences-dialog-content">
      <div class="cc-preferences-dialog-subtitle"></div>
      <div class="cc-preferences-dialog-item">
        <h5 class="cc-preferences-dialog-item-title"></h5>
        <div class="cc-preferences-dialog-item-group">
          <span class="cc-preferences-dialog-item-desc"></span>
          <div class="cc-preferences-dialog-item-switch"></div>
        </div>
      </div>
    </div>
    <div class="cc-preferences-dialog-controls">
      <button class="cc-ripple-button cc-preferences-dialog-btn">
        <svg class="svg-icon"></svg>
        <span class="cc-ripple-button-label"></span>
      </button>
    </div>
  </div>
</div>
```

## Desenvolvimento

Essa biblioteca foi desenvolvida utilizando [webpack](https://webpack.js.org/) para o empacotamento.

```bash
# Dependências
$ npm install

# Servidor de desenvolvimento (localhost:9000)
# Roda o 'index.html' do diretório '/dist'
$ npm start

# Build de produção
$ npm run build
```

> O comando `npm run build` irá gerar o arquivo de produção `cookies-consent.min.js`, no diretório [`/dist`](/dist).

## Créditos

[Popper.js](https://popper.js.org/) - Biblioteca de posicionamento de *tooltips* e *popovers*. Utilizada para a criação da janela de configurações.

[Free CSS](https://www.free-css.com/) - A página utilizada no exemplo é uma das templates gratuitas disponíveis no site.

## License

MIT &copy; Rogério Castro
