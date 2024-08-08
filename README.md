<h1 align="center">
    <img src="./public/Logo.png" width="300px;" alt="logo"/>
</h1>

---

## ✈️ Sobre o projeto

Este é um projeto desenvolvido para aprimorar o conhecimento em [Next.js](https://nextjs.org/) e [React](https://pt-br.reactjs.org/). A aplicação permite organizar suas viagens, possibilitando adicionar, editar e excluir viagens e suas respectivas atividades.

---

## 💻 Tecnologias

As seguintes tecnologias foram utilizadas na construção do projeto:

- **[Next.js](https://nextjs.org/)**
- **[React Icons](https://react-icons.github.io/react-icons/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Firestore](https://firebase.google.com/docs/firestore)**

> Veja o arquivo  **[package.json](https://github.com/Brendhon/TripHold/blob/main/package.json)**

### Utilitários
- Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**

---

## 👨‍💻 Como executar o projeto

### 💡 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
**[Git](https://git-scm.com)** e **[Node.js](https://nodejs.org/en/)**.<br> 

Clone o repositório do projeto

```bash
git clone https://github.com/Brendhon/PalApi.git
```

Instale as dependências

```bash
npm install
```


### 🎲 Configurando o ambiente

Para rodar localmente, crie um arquivo (.env) na raiz do projeto e coloque nele as informações de acesso (username, password e name) no formato demostrado abaixo: 
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET={SECRET}

GOOGLE_CLIENT_ID={CLIENT_ID}
GOOGLE_CLIENT_SECRET={CLIENT_SECRET}
```

Para as variáveis GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET, você deve criar um projeto no [Google Cloud Platform](https://console.cloud.google.com/) e habilitar a API de autenticação do Google.

Já para a variável NEXTAUTH_SECRET, você pode gerar uma chave secreta utilizando o comando abaixo:

```bash
openssl rand -base64 32
```

Caso tenha alguma dúvida, você pode acessar a documentação do [NextAuth.js](https://next-auth.js.org/getting-started/introduction) para mais informações.

---

### ⚽ Rodando o projeto 


Com isso o projeto já estará pronto para ser executado.

Execute a aplicação em modo de desenvolvimento

```bash
npm run dev
```

O servidor iniciará na porta:3000 - acesse http://localhost:3000

---

## 👥 Autor
<img style="border-radius: 20%;" src="https://avatars1.githubusercontent.com/u/52840078?s=400&u=67bc81db89b5abf12cf592e0c610426afd3a02f4&v=4" width="120px;" alt="autor"/><br>
**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
[![Gmail Badge](https://img.shields.io/badge/-brendhon.e.c.m@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:brendhon.e.c.m@gmail.com)](mailto:brendhon.e.c.m@gmail.com)
---