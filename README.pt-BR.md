# Furniro E-Commerce | Desafio Compass UOL

[Português](README.pt-BR.md) | [English](README.md)

<div align="center">

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Zustand](https://img.shields.io/badge/Zustand-%23443E38.svg?style=for-the-badge&logo=react&logoColor=white)
  ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
  ![Zod](https://img.shields.io/badge/zod-%233068B7.svg?style=for-the-badge&logo=zod&logoColor=white)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

  <br/>

  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![TypeORM](https://img.shields.io/badge/TypeORM-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
  ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
  ![Swagger](https://img.shields.io/badge/Swagger-%2385EA2D.svg?style=for-the-badge&logo=swagger&logoColor=black)

</div>

---

## Sobre o projeto

Este projeto foi desenvolvido como parte do **Desafio 3** do Programa de Bolsas da Compass UOL. Ele consiste em uma recriação fiel do **Furniro**, uma interface moderna de e-commerce de móveis, totalmente integrada a uma API REST personalizada.

O objetivo foi entregar uma aplicação full stack robusta, escalável e responsiva, garantindo bom desempenho e uma experiência intuitiva para o usuário, seguindo os protótipos fornecidos no Figma e as regras de negócio definidas.

---

## Funcionalidades

- **Listagem dinâmica de produtos:** paginação no servidor, filtro por categoria, busca e ordenação por preço.
- **Página individual do produto:** detalhes do produto e cálculo dinâmico do preço de acordo com as variações de tamanho e cor selecionadas.
- **Autenticação e rotas protegidas:** cadastro e login seguros com JWT, com persistência da sessão. Rotas protegidas para `/checkout` e `/contact`.
- **Formulários e integração com ViaCEP:** validação dos formulários com React Hook Form e Zod, além do preenchimento automático do endereço ao informar o CEP.
- **Gerenciamento avançado de estado:** carrinho de compras global utilizando Zustand, com persistência no Local Storage e sidebar interativa.
- **Fluxo de checkout e contato:** processo interativo de compra, seleção de pagamento e mensagens de feedback após a finalização do pedido.
- **API REST personalizada:** construída do zero com Node.js, Express e TypeORM, substituindo o `json-server` e oferecendo dados relacionais, autenticação e documentação com Swagger.
- **Totalmente responsivo:** abordagem mobile-first com Tailwind CSS para uma boa experiência em diferentes dispositivos.

---

## Arquitetura e tecnologias

O repositório está organizado como um monorepo com dois diretórios principais:

### Front-end (`/front-end`)

Construído para oferecer velocidade, segurança de tipos e uma boa experiência de uso.

- React.js com Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- React Hook Form
- Zod
- React Hot Toast
- Splide.js

### Back-end (`/back-end`)

Uma API REST responsável pela autenticação, pelos dados relacionais e pela documentação interativa.

- Node.js e Express.js
- TypeScript
- TypeORM e SQLite
- JSON Web Token (JWT)
- Bcrypt.js
- Swagger UI (OpenAPI 3.0)

---

## Como executar

### Pré-requisitos

Certifique-se de ter o **Node.js (versão 18 ou superior)** e o **npm** instalados.

### 1. Clone o repositório

```bash
git clone https://github.com/alanaagne/furniro-all.git
```

### 2. Execute o back-end (API)

O back-end utiliza um banco SQLite. Ao iniciar o servidor em modo de desenvolvimento, o arquivo `db.json` é carregado automaticamente para inserir os produtos iniciais no banco.

```bash
cd back-end
npm install
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

### 3. Execute o front-end

Abra outro terminal na raiz do projeto e execute:

```bash
cd front-end
npm install
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

Acesse esse endereço no navegador para explorar o **Furniro**.

### Documentação da API

A API está documentada com Swagger UI e pode ser acessada em:

```text
http://localhost:3000/docs
```

---

## Estrutura do projeto

Para facilitar a manutenção, o projeto segue uma organização por responsabilidades:

```text
📦 back-end
┣ 📂 public # Imagens utilizadas nos produtos
┣ 📂 src
┣ 📂 controllers # Manipuladores das requisições
┣ 📂 database # Configuração do banco e scripts de seed
┣ 📂 docs # Configuração da documentação Swagger
┣ 📂 dtos # Validação das requisições e tipagem das respostas
┣ 📂 entities # Modelos do TypeORM
┣ 📂 routes # Definição das rotas da API
┣ 📂 services # Regras de negócio e acesso aos dados
┣ 📂 shared # Middlewares e utilitários compartilhados
┣ 🗄️ furniro.sqlite # Banco de dados SQLite local
┗ 📜 server.ts # Ponto de entrada do servidor
┗ 📜 db.json # Dados dos produtos usados no seed

📦 front-end
┣ 📂 src
┣ 📂 api # Integração com a API e configuração do cliente HTTP
┣ 📂 assets # Imagens e recursos visuais do projeto
┣ 📂 components # Componentes reutilizáveis
┣ 📂 pages # Componentes das páginas da aplicação
┣ 📂 store # Gerenciamento de estado global
┣ 📂 types # Interfaces e definições de tipos
┣ 📂 utils # Funções utilitárias e formatação de preços
┣ 📜 App.tsx # Rotas e layout principal
┣ 📜 index.css # Estilos globais
┗ 📜 main.tsx # Inicialização da aplicação
```

---

## Equipe

Até a fase 2, este projeto foi desenvolvido por:

- Alana Ágne Brandão Rocha
- Brunno Felipe Bezerra
- Gustavo Siqueira De Lima
- Lucas Folharini
- Pedro Lucas Galdino Leite

A fase 3 foi desenvolvida por:

- Alana Ágne Brandão Rocha

---

## Experiência de desenvolvimento

Evoluir uma base de código existente apresenta desafios, pois é necessário compreender as decisões arquiteturais tomadas pela equipe para entregar novas funcionalidades de forma compatível.

Ao mesmo tempo, conhecer diferentes abordagens técnicas e encontrar maneiras de alinhá-las foi uma experiência muito enriquecedora. Como eu já conhecia o projeto desde a primeira fase, tive mais familiaridade com sua estrutura e consegui trabalhar de forma mais produtiva durante a terceira fase.

---

## Agradecimentos

Desenvolvido com dedicação para o **Programa de Bolsas da Compass UOL**.
