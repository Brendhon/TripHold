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
- **[NextAuth](https://next-auth.js.org/)**
- **[NextUI](https://nextui.org/)**
- **[Framer Motion](https://www.framer.com/motion/)**

> Veja o arquivo  **[package.json](https://github.com/Brendhon/TripHold/blob/main/package.json)**

### Utilitários
- Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**

---

##  ☁️ APIs de terceiros

As seguintes APIs foram utilizadas na construção do projeto:

- **[Countries Now](https://countriesnow.space/)**
- **[ZipCodeBase](https://zipcodebase.com/)**
- **[Rest Countries](https://restcountries.com/)**

---

## 👨‍💻 Como executar o projeto

### 💡 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
**[Git](https://git-scm.com)** e **[Node.js](https://nodejs.org/en/)**.<br> 

Clone o repositório do projeto

```bash
git clone https://github.com/Brendhon/TripHold
```

Instale as dependências

```bash
npm install
```


### 🎲 Configurando o ambiente

Para rodar localmente, crie um arquivo (.env) na raiz do projeto e coloque nele as informações de acesso no formato demostrado abaixo: 

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET={SECRET}
```

Para a variável NEXTAUTH_SECRET, você pode gerar uma chave secreta utilizando o comando abaixo:

```bash
openssl rand -base64 32
```

Caso tenha alguma dúvida, você pode acessar a documentação do [NextAuth.js](https://next-auth.js.org/getting-started/introduction) para mais informações.

É necessário criar um projeto no [Firebase](https://firebase.google.com/) e habilitar o Firestore, Storage, Authentication. Após isso, adicione as variáveis de ambiente no arquivo .env na raiz do projeto: 

```
NEXT_PUBLIC_FIREBASE_API_KEY={API_KEY}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN={AUTH_DOMAIN}
NEXT_PUBLIC_FIREBASE_PROJECT_ID={PROJECT_ID}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET={STORAGE_BUCKET}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID={MESSAGING_SENDER_ID}
NEXT_PUBLIC_FIREBASE_APP_ID={APP_ID}
```

Para utilizar o login com o Google, você deve habilitar o provedor de login com o Google no Firebase e adicionar as variáveis de ambiente no arquivo .env na raiz do projeto:

``` 
GOOGLE_CLIENT_ID={CLIENT_ID}
GOOGLE_CLIENT_SECRET={CLIENT_SECRET}
```

Como esse projeto foi construído utilizando o Next.js, é necessário atualizar o redirect_uri no arquivo de configuração do Google OAuth 2.0 para http://localhost:3000/api/auth/callback/google. Para isso, acesse o [Google Cloud Console](https://console.cloud.google.com/), vá em APIs & Services > Credenciais > OAuth 2.0 Client IDs > Selecione o Client ID > Atualize o campo "URIs de redirecionamento autorizados". 


Para utilizar a busca por CEP, é necessário criar uma conta no [ZipCodeBase](https://app.zipcodebase.com/) e adicionar a chave de acesso no arquivo .env na raiz do projeto:

```
ZIP_CODE_API_KEY={API_KEY}
```

Além disso, o deploy do projeto foi feito utilizando o [Vercel](https://vercel.com/), então é necessário criar um projeto no Vercel e adicionar as variáveis de ambiente no projeto.

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
