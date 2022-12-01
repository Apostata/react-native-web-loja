# Store
Exemplo de um front simples de uma Loja em React Native Web (Android, IOS e WEb)
**Por todo o processo a seguir de confuguração e estilização do app, fortemente recomento usar o Flutter**

Criação do projeto:
utilizei o create react native web app (recomendado):
[create-react-native-web-app](https://www.npmjs.com/package/create-react-native-web-app)

`npx crnwa {nome_do_projeto}`
ou
`npx create-react-native-web-app {nome_do_projeto}`

*npx* é para utilizar sem instalar, poderiamos também installar globalmente o crmwa: 
`npm i crnwa -g`
ou
`npm i create-react-native-web-app -g`

e depois:
`npm crnwa {nome_do_projeto}`
ou
`npm create-react-native-web-app {nome_do_projeto}`

## Setup Projeto
Instalar o [Android studio](https://developer.android.com/studio?hl=pt)
para rodar a versão Web já vai estar tranquilo.
para rodar no android ou IOS siga o [Setup do ambiente React native](https://reactnative.dev/docs/environment-setup)

### Usando Typescript (Opcional):
`npm install -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer @tsconfig/react-native`
ou 
`yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer @tsconfig/react-native`

1. Criar o arquivo `tsconfig.json` na raiz do Projeto:
```json
{
  "extends": "@tsconfig/react-native/tsconfig.json"
}
```

2. Criar o arquivo de configuração do jest(Ambiente de teste) para usar typescript (Opcional):
```js
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

```
### Usando Material design (Opcional)

tem que botar o react-app-rewired

instalar o [Ract-native-paper](https://callstack.github.io/react-native-paper/index.html)

`npm install react-native-paper@5.0.0-rc.10`
ou
`yarn add react-native-paper@5.0.0-rc.10`

atualizar o `babel.config.js` para:

```js
module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {
        unstable_disableES6Transforms: true,
      },
    ],
    ['@babel/preset-env', {targets: {node: 'current'}}],
    ['@babel/preset-react', {targets: {node: 'current'}}],
  ],

  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};

```
para usar os icones do material deveremos instalar os vector-icons (próximo tópico)


### Adicionando Vector icons (Opcional)
instalar o [react-native-vect-icons](https://www.npmjs.com/package/react-native-vector-icons)

[lista dos icones](https://oblador.github.io/react-native-vector-icons/)

`npm i react-native-vector-icons`
ou
`yarn add react-native-vector-icons`

### ANdroid:
adicionar a linha `apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"` ao arquivo `/android/app/build.gradle`
só isso:

### Web:
por padrão o webpack(que funciona por baixo dos panos) não irá reconhecer os arquivos para transpilar o vector icons. então adicionaremos um arquivo com o EXATO nome `config-overrides.js` na raiz do projeto:
```js
module.exports = function override(config, env) {
	config.module.rules.push({
		test: /\.js$/,
		exclude: /node_modules[/\\](?!react-native-vector-icons)/,
		use: {
			loader: 'babel-loader',
			options: {
				// Disable reading babel configuration
				babelrc: false,
				configFile: false,

				// The configuration for compilation
				presets: [
					['@babel/preset-env', { corejs: '3.21.1', useBuiltIns: 'usage' }],
					'@babel/preset-react',
					'@babel/preset-flow',
					'@babel/preset-typescript',
				],
				plugins: [
					'@babel/plugin-proposal-class-properties',
					'@babel/plugin-proposal-object-rest-spread',
				],
			},
		},
	});

	return config;
};
```

#### Carregando o icones
Criar um arquivo para carregamento dos icones:
```js
import Ionicons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

const IoniconsStyles = `@font-face {
  src: url(${Ionicons});
  font-family: MaterialCommunityIcons;
}`;

const style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
	style.styleSheet.cssText = IoniconsStyles;
} else {
	style.appendChild(document.createTextNode(IoniconsStyles));
}
document.head.appendChild(style);

```
importar os icones no arquivo `/src/index.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as PaperProvider} from 'react-native-paper';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './material_icons'; //para usar os icones do material

ReactDOM.render(
	<PaperProvider>
		<App />
	</PaperProvider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

## usando UUID para gerar ifd unicos
web vai funciona por padrão, para android:
tem que instalar a lib `uuid` e `react-native-get-random-values`
import `react-native-get-random-values` no app.tsx ou app.js


## usando stringToLocale:
web vai funciona por padrão, para android:
instalar o polyfill: `number-to-locale-string-polyfill`
import `react-native-get-random-values` no app.tsx ou app.js

