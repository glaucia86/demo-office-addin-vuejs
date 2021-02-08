# Demo: Desenvolvendo um Office Add-in com VueJs & Typescript

<p align="center">
  <img src="https://i.imgsafe.org/2b/2bd8bd6f79.png"/>  
</p>

Repositório responsável pelos códigos desenvolvidos durante a palestra no evento **[2018 Global Office 365 Developer Bootcamp - Rio](https://www.eventbrite.com/e/2018-global-office-developer-bootcamp-rio-tickets-49226805701)**

## Recursos Utilizados no Desenvolvimento da Demo: :rocket:

- Visual Studio Code - **[DOWNLOAD AQUI](https://code.visualstudio.com/download?WT.mc_id=javascript-0000-gllemos)**
- Node.js - **[DONWLOAD AQUI](https://nodejs.org/en/)**
- VueJs - **[DOWNLOAD AQUI](https://vuejs.org/v2/guide/installation.html)**
- Typescript - **[DOWNLOAD AQUI](https://www.typescriptlang.org/#download-links)**
- Consumo da API - **[Alpha vantage Api](https://www.alphavantage.co/)** 

## Pré-Requisitos para a Realização da Demo: :fire:

Se faz necessário realizar os seguintes passos abaixo para que vocês possam dar continuidade a demo:

1) Possuir conhecimentos prévios em:

* **Node.js;**
* **VueJs;**
* **Conceitos de Async & Await;**
* **Conhecimentos em ES5;**
* **Typescript;**

2) Possuir conta OneDrive - **[Criar Conta Aqui](https://onedrive.live.com/)**

3) Instalar Office Yeoman Generator

```
> npm install -g yo generator-office
```

4) Instalar ou Adicionar os Certificados Autorizados na Raiz:

O Office Add-ins requerem e devem ser protegidos por SSL. Assim que, se faz necessário que se utilize os certificados gerados e que estão contidos na aplicação.
Para seguir o passo a passo para cada OS segue o link **[AQUI](https://github.com/OfficeDev/generator-office/blob/master/src/docs/ssl.md)**

Em caso de dúvidas em como adicionar esses certificados, fiquem à vontade de abrir uma ISSUE [AQUI](https://github.com/glaucia86/demo-office-addin-vuejs/issues) que estarei ajudando a todos vocês! :heart:


## Executando o Projeto Localmente: :boom:

Para executar o projeto localmente na sua máquina, se faz necessário instalar as dependências do projeto, contidos no arquivo **'package.json'**. Para isso, basta executar os comandos abaixo:

```
> npm install
```

Agora, vá até a pasta raiz do projeto e executar o comando abaixo:

```
> npm start
```

Após isso, abre uma aplicação Excel (pode ser a versão online) e clique na opção: Inserir -> Suplementos do Office (conforme segue a imagem abaixo). Inclua o seu manifesto e pronto! O Office add-in que acabou de criar já pode ser usado dentro do Excel! :smiley:

![alt text](https://i.imgsafe.org/43/4381820c9f.png)


**[MAIS INFOS AQUI](https://docs.microsoft.com/office/dev/add-ins/testing/sideload-office-add-ins-for-testing?WT.mc_id=javascript-0000-gllemos#sideload-an-office-add-in-on-office-online)**

E pronto. A sua aplicação estará sendo executada! :smile:

## Desejam Propor Melhorias no Código? Façam Pull Request!!!  :triangular_flag_on_post:

Caso queiram que eu implemente algo no código, abram uma **[Issue](https://github.com/glaucia86/demo-office-addin-vuejs/issues)** nesse repositório. Assim, todos poderão colaborar para o melhor desenvolvimento desse repositório. E sintam-se à vontade em fazer Pull Requests!!

Não esqueçam de dar uma star no repositório e claro: Apreciem sem moderação!! :heart: :heart: :heart:

