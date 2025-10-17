## Sistema de Gestão de Mercado

Este projeto é um **sistema de gestão de mercado** desenvolvido utilizando **JavaScript** e **HTML** no front-end, e **Firebase** como _Backend-as-a-Service_ (BaaS). O **Firestore** é utilizado para armazenar dados de produtos e usuários, enquanto o **Firebase Functions** atua como backend, integrado com **Express** para definição de rotas. A autenticação de usuários é feita via **Firebase Auth**, e o **Hosting** local do Firebase permite testar o site e definir melhores nomenclaturas para as URIs das páginas. Todas as tecnologias do Firebase foram utilizadas através dos **Emulators,** garantindo que nada foi persistido no Firebase real durante o desenvolvimento.

## Funcionalidades Principais:

- **Cadastro**, **login** e **exibição do perfil** do usuário.
- **CRUD** completo de produtos (criar, buscar, atualizar, deletar).
- **CRUD** completo de usuários (criar, buscar, atualizar, deletar) para administradores.
- **Health check** das rotas para verificação de status ("ok").
- **Rotas de API** protegidas por token **JWT** para administradores.
- **Regras do Firestore** aplicadas para proteger dados sensíveis no front-end.

## Estrutura de Rotas:

1.  **Rotas de Produtos:**

- Todas começam com "/products".
- Necessitam do header de autorização com token de administrador.
- Rotas disponíveis:
  - `GET` /products/health -> retorna "ok".
  - `GET` /products/ -> retorna todos os produtos.
  - `GET` /products/:id -> retorna um produto específico.
  - `POST` /products/ -> cria um produto.
  - `PUT` /products/:id -> atualiza um produto.
  - `DELETE` /products/:id -> deleta um produto.

2.  **Rotas de Usuários Administrativos:**

- Todas começam com "/admin/users".
- Necessitam do header de autorização com token de administrador.
- Rotas disponíveis:
  - `GET` /admin/users/health -> retorna "ok".
  - `GET` /admin/users/ -> retorna todos os usuários.
  - `GET` /admin/users/:id -> retorna um usuário específico.
  - `POST` /admin/users/ -> cria um usuário.
  - `PUT` /admin/users/:id -> atualiza um usuário.
  - `DELETE` /admin/users/:id -> deleta um usuário.

3.  **Rotas de Usuários Gerais:**

- Começam com "/users"
- Não exigem autenticação.
- Rotas disponíveis:
  - `GET` /users/health -> retorna "ok".
  - `POST` /users/setRole/:id -> define a claim inicial `isAdmin: false` para um usuário que está se registrando pela primeira vez.

## Segurança e Regras:

- **Firestore Rules** garantem que apenas usuários cadastrados possam páginas e dados dos produtos
- Rotas administrativas exigem token **JWT** de administrador.
- Rotas públicas têm lógica interna para definir **claims** iniciais.
- Mesmo utilizando os Emulators, todas as regras de segurança são aplicadas no front-end, simulando o comportamento real do Firebase.

## Como Testar o Projeto Usando Emulators:

1.  Criar um projeto no console do Firebase.
2.  Copiar as credenciais do Firebase Config do projeto.
3.  Inserir as credenciais na constante `firebaseConfig` no arquivo `firebase.js`.
4.  Inicializar os Emulators localmente:

    - `firebase init emulators` para Auth, Firestore, Functions e Hosting.
    - Configuração padrão de portas:

      - **Auth:** 9099
      - **Firestore:** 8080
      - **Functions:** 5001
      - **Hosting:** 5000

5.  Rodar os Emulators:

    - `firebase emulators:start`
    - As **APIs** estarão disponíveis localmente conforme as rotas definidas.

6.  Para utilizar as rotas administrativas, deve ser utilizado o **JWT** de um administrador para autorização no header `Authorization` da requisição HTTP.
7.  O front-end pode interagir normalmente com os **Emulators**, incluindo **autenticação**, **Firestore** e **Functions**.
8.  Após rodar o **Emulators**, acesse o link http://localhost:5000/login no seu navegador.

## Observações Importantes:

- Todas as funcionalidades do Firebase são testadas usando os **Emulators**, garantindo que o Firebase real não seja acessado.

- O arquivo `firebaseConfig` deve ser atualizado pelo usuário que for rodar o projeto com suas próprias credenciais.

- As regras de segurança do Firestore são respeitadas no front-end.

- Para utilizar o Admin SDK (rotas administrativas), é necessário que o
  **JWT** utilizado no header seja de um usuário administrador, por isso, um usuário administrador para testes já é criado por padrão quando o **emulators** é iniciado, suas credenciais são:
  - **E-mail:** admin@gmail.com
  - **Senha:** 123456

- Acessar os arquivos `HTML` do site pelo **Live Server** ou pelo seu **path** no navegador fará o site não funcionar da maneira correta.

## Tecnologias Utilizadas:

- **Front-end:** JavaScript, HTML
- **Back-end:** Firebase Functions + Express
- **Banco de Dados:** Firestore via Emulators
- **Autenticação:** Firebase Auth via Emulators
- **Hospedagem:** Firebase Hosting via Emulators
- **Testes Locais:** Firebase Emulators (Auth, Firestore, Functions, Hosting)
