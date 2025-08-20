# Autenticação da API Rede Alecrim

## Visão Geral
A autenticação da API Rede Alecrim é baseada em **token JWT** (JSON Web Token) e segue o padrão de autenticação via endpoints RESTful. O fluxo principal envolve:

1. **Login**: O usuário envia email e senha para o endpoint de login.
2. **Recebimento do Token**: Se as credenciais estiverem corretas, a API retorna um token JWT.
3. **Uso do Token**: O token deve ser enviado no header `Authorization` em todas as requisições autenticadas.
4. **Logout**: Basta descartar o token no front-end.

---

## Endpoints de Autenticação

### 1. Login
- **Endpoint:** `POST /auth/login`
- **Payload:**
```json
{
  "email": "usuario@dominio.com",
  "password": "senha_do_usuario"
}
```
- **Resposta de Sucesso:**
```json
{
  "access_token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@dominio.com",
    ...
  }
}
```

### 2. Registro de Usuário
- **Endpoint:** `POST /auth/register`
- **Payload:**
```json
{
  "name": "Nome Completo",
  "email": "usuario@dominio.com",
  "password": "senha",
  "role": "cargo",
  "department": "departamento",
  "admission_date": "2025-08-15",
  "active": true
}
```
- **Resposta:**
```json
{
  "id": 1,
  "name": "Nome Completo",
  "email": "usuario@dominio.com",
  ...
}
```

---

## Como Usar o Token JWT

Após o login, o token JWT deve ser enviado em todas as requisições autenticadas usando o header:

```
Authorization: Bearer <JWT_TOKEN>
```

Exemplo de requisição autenticada:
```js
fetch('https://api-redealecrim.onrender.com/api/users', {
  headers: {
    'Authorization': 'Bearer <JWT_TOKEN>',
    'Content-Type': 'application/json'
  }
});
```

---

## Fluxo Resumido para o Front-end
1. **Login:**
   - Envie email e senha para `/auth/login`.
   - Guarde o `access_token` retornado.
2. **Requisições autenticadas:**
   - Sempre envie o header `Authorization: Bearer <token>`.
3. **Logout:**
   - Remova o token do armazenamento local (localStorage, cookies, etc).

---

## Observações
- O token pode expirar. Se a API retornar erro de autenticação, solicite novo login.
- O payload e a resposta podem conter campos extras dependendo do usuário e da versão da API.
- Para endpoints públicos (ex: listagem de vagas), não é necessário enviar o token.

---

## Exemplo de Integração no Front-end
```js
// Login
const login = async (email, password) => {
  const response = await fetch('https://api-redealecrim.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('auth_token', data.access_token);
    // ...
  }
};

// Requisição autenticada
const token = localStorage.getItem('auth_token');
fetch('https://api-redealecrim.onrender.com/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

---

Dúvidas? Consulte a documentação Swagger: https://api-redealecrim.onrender.com/api/docs/
