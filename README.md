<h1 align="center">
    <img src="./public/dark-logo.svg" width="300px;" alt="logo"/>
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
- **[React Email](https://www.npmjs.com/package/react-email)**
- **[Ngrok](https://ngrok.com/)**
- **[Resend](https://resend.com/)**

> Veja o arquivo  **[package.json](https://github.com/Brendhon/TripHold/blob/main/package.json)**

### Utilitários
- Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**

---

##  ☁️ APIs de terceiros

As seguintes APIs foram utilizadas na construção do projeto:

- **[Countries Now](https://countriesnow.space/)**
- **[ZipCodeBase](https://zipcodebase.com/)**
- **[Rest Countries](https://restcountries.com/)**
- **[TripAdvisor](https://www.tripadvisor.com/developers)**

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

Outras informações que devem ser adicionadas no arquivo .env são as credenciais da conta de serviço do Firebase, para que seja possível enviar e-mails de confirmação de cadastro e redefinição de senha. Para isso, acesse o Firebase Console > Project Settings > Service Accounts > Generate new private key. Após isso, adicione as variáveis de ambiente no arquivo .env na raiz do projeto:

```
FIREBASE_ADMIN_PROJECT_ID={PROJECT_ID}
FIREBASE_ADMIN_PRIVATE_KEY={PRIVATE_KEY}
FIREBASE_ADMIN_CLIENT_EMAIL={CLIENT_EMAIL}
```

Para utilizar a busca por CEP, é necessário criar uma conta no [ZipCodeBase](https://app.zipcodebase.com/) e adicionar a chave de acesso no arquivo .env na raiz do projeto:

```
ZIP_CODE_API_KEY={API_KEY}
```

Além disso, o deploy do projeto foi feito utilizando o [Vercel](https://vercel.com/), então é necessário criar um projeto no Vercel e adicionar as variáveis de ambiente no projeto.

Para habilitar o envio de e-mails, é necessário criar uma conta no [Resend](https://resend.com/) e adicionar a chave de acesso no arquivo .env na raiz do projeto, além disso, é necessário adicionar o e-mail de envio no arquivo .env na raiz do projeto:

```
RESEND_API_KEY={API_KEY}
RESEND_FROM_EMAIL={EMAIL}
```

Caso não adicione um e-mail de envio, o e-mail padrão será o e-mail de suporte do Resend, ou seja, não será possível enviar emails para os usuários.

É necessário criar uma conta de desenvolvedor no [TripAdvisor](https://www.tripadvisor.com/developers) e adicionar a chave de acesso no arquivo .env na raiz do projeto para que seja possível buscar informações sobre as atividades de um determinado local:

```
TRIP_ADVISOR_API_KEY={API_KEY}
```

## Proxy

Por questões de segurança, algumas APIs de terceiros utilizadas no projeto exigem que domínios autorizados sejam configurados. Para contornar essa limitação e permitir o uso dessas APIs durante o desenvolvimento local, é necessário configurar um proxy reverso. Uma solução popular para isso é o uso do [ngrok](https://ngrok.com/). 

Após instalar o ngrok, adicione no arquivo .env na raiz do projeto o domínio gerado pelo ngrok:

```
NGROK_CUSTOM_DOMAIN={DOMAIN}
```

Por padrão, o ngrok expõe a aplicação local na porta 3000, mas é possível alterar essa porta. Para isso, adicione a variável de ambiente no arquivo .env na raiz do projeto:

```
NGROK_PORT={PORT}
```

Obs: 
- Caso tenha dúvidas sobre como configurar o ngrok, acesse a [documentação](https://ngrok.com/docs).
- É possível que antivírus ou firewall bloqueiem o acesso do ngrok à internet. Caso isso ocorra, é necessário liberar o acesso do ngrok à internet.

---

### ⚽ Rodando o projeto 


Com isso o projeto já estará pronto para ser executado.

Execute a aplicação em modo de desenvolvimento

```bash
npm run dev
```

O servidor iniciará no domino configurado no arquivo .env.

---

## 👥 Autor
<img style="border-radius: 20%;" src="https://avatars1.githubusercontent.com/u/52840078?s=400&u=67bc81db89b5abf12cf592e0c610426afd3a02f4&v=4" width="120px;" alt="autor"/><br>
**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
[![Gmail Badge](https://img.shields.io/badge/-brendhon.e.c.m@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:brendhon.e.c.m@gmail.com)](mailto:brendhon.e.c.m@gmail.com)
---
