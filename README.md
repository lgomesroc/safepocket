
# Safe Pocket - Sistema de Controle de Finanças

![Venha conhecer o projeto Safe Pocket.](0479d329-8411-4a2d-b4a6-f6cdc20f1138.jpg)

**SafePocket** é um sistema de controle de finanças pessoais, permitindo o gerenciamento de receitas e despesas. Desenvolvido com **Next.js**, **TypeScript** e **Tailwind CSS**, o projeto oferece uma interface moderna e eficiente para gerenciar suas finanças.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

**SafePocket** é uma aplicação web projetada para ajudar usuários a controlar suas finanças pessoais. Com uma interface intuitiva e uma API robusta, o sistema permite que os usuários adicionem, visualizem e gerenciem suas transações financeiras.

## Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org/) - Framework React para aplicações web.
  - [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript que adiciona tipos estáticos.
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para design responsivo e moderno.
  - [Material-UI](https://mui.com/) - Biblioteca de componentes React para uma interface de usuário consistente.

- **Backend:**
  - [Node.js](https://nodejs.org/): Ambiente de execução JavaScript para construção do servidor.
  - [Express](https://expressjs.com/): Framework para criação de APIs e aplicações web no Node.js.
  - [TypeScript](https://www.typescriptlang.org/): Utilizado também no backend para garantir um código mais robusto e escalável.
  - [Prisma](https://www.prisma.io/): ORM (Object-Relational Mapping) para acesso ao banco de dados e manipulação de dados.
  - [Swagger](https://swagger.io/): Ferramenta para documentar a API e facilitar o teste das endpoints.
  - [Jest](https://jestjs.io/): Framework de testes para garantir a qualidade do código.

## Instalação e Configuração

### Pré-requisitos

Certifique-se de ter o Node.js e npm instalados em sua máquina. Você pode baixar o Node.js [aqui](https://nodejs.org/).

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/safepocket.git
cd safepocket
```

## Instalando Dependências
Para instalar as dependências do projeto, execute:

```bash
npm install
```

# Configuração do Ambiente
Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis de ambiente :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Executando o Projeto
Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Acesse a aplicação em (http://localhost:3000/).

## Estrutura do Projeto

 - `src/`: Contém o código-fonte da aplicação.
 - `app/`: Arquivos relacionados à estrutura e estilo global da aplicação.
 - `globals.css`- Estilos globais da aplicação.
 - `layout.tsx`- Layout principal da aplicação.
 - `components/`: Componentes reutilizáveis da aplicação.
 - `button.tsx`- Componente de botão.
 - `header.tsx`- Componente de cabeçalho.
 - `navbar.tsx`- Componente de barra de navegação.
 - `pages/`: Páginas da aplicação.
 - `index.tsx`- Página inicial.
 - `about.tsx`- Página sobre nós.
 - `login.tsx`- Página de login.
 - `dashboard.tsx`- Página do painel de controle.
 - `swagger.ts`: Configuração do Swagger para documentação da API.
 - `tailwind.config.ts`: Configuração do Tailwind CSS.
 - `tsconfig.json`: Configuração do TypeScript.
 - `package.json`: Gerenciador de pacotes e scripts.

## Uso
 - Página Inicial: Exibe uma visão geral e links para outras partes do sistema.
 - Página de Login: Permite aos usuários fazer login no sistema.
 - Dashboard: Exibe e permite o gerenciamento das transações financeiras do usuário.
 - Sobre Nós: Página com informações sobre o projeto.

## Contribuição
  Contribuições são bem-vindas! Se você deseja contribuir para o projeto, siga estes passos:
 - Fork o repositório.
 - Crie uma branch para a sua feature (git checkout -b minha-feature).
 - Faça as alterações e adicione commits (git commit -am 'Adiciona nova feature').
 - Faça push para a branch (git push origin minha-feature).
 - Abra um pull request.

## Licença
 Este projeto está licenciado sob a MIT License.
