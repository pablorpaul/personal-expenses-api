# personal-expenses-api
API para registrar as despesas pessoais.

Objetivo:
    API desenvolvidade em Node.js para gerenciamento de despesas pessoais, que permite registrar, listar,
    atualizar e remover despesas.
Tecnologias:
    Node.js
    Express
    Git
    Postman

Dependencias:
Node
Express

Iniciando a API

Baixe as dependencias com:
    npm install
E por fim execute:
    npm run dev
A seguinte mensagem deve aparecer no seu terminal:
    Servidor rodando em http://localhost:3000

Rotas da API:

    GET    | /api/expenses                  | Lista todas as despesas
    GET    | /api/expenses/:id              | Busca uma despesa pelo ID
    POST   | /api/expenses                  | Cria despesa
    PUT    | /api/expenses/:id              | Atualiza despesa
    DELETE | /api/expenses/:id              | Remove despesa
    GET    | /api/expenses/summary/total    | Soma o valor total das despesas
    GET    | /api/expenses/summary/category | Soma o valor das despesas pela categoria

A classe Expense é composta por:

    id          - Identificador único
    title       - Titulo da despesa (obrigatório)
    amount      - Valor da despesa (maior que zero)
    category    - Categoria da despesa
    date        - Data da despesa
    description - Descrição da despesa
    createdAt   - Dia em que foi inserida na API

Exemplos de requisição no Postman:

    Busca por todas as despesas:
    GET | http://localhost:3000/api/expenses

    Resultado esperado:
    Lista de despesas
    200 - OK

    Busca pela despesa com Id informado:
    GET | http://localhost:3000/api/expenses/:id <- Insira um id existente

    Resultado esperado:
    Despesa do ID informado
    200 - OK

    Cria nova despesa:
    POST | http://localhost:3000/api/expenses
    Alterar Body - raw - tipo JSON
    Insira esses dados:
    {
        "title": "Almoço de Domingo",
        "amount": 45.99,
        "category": "Alimentação",
        "date": "2024-05-20",
        "description": "Restaurante com a família"
    }

    Resultado esperado:
    201 - Created
    {
        "id":1,
        "title":"Almoço de Domingo",
        "amount":45.99,
        "category":"Alimentação",
        "date":"2024-05-20",
        "description":"Restaurante com a família","createdAt":"2026-03-24T22:56:34.298Z"
    }
    
    Atualizar despesa:
    PUT | http://localhost:3000/api/expenses/:id <- Insira um id existente
    Alterar Body - raw - tipo JSON
    Insira esses dados:
    {
        "title": "Almoço Executivo",
        "amount": 35.00
    }

    Resultado esperado:
    200 - OK
    {
        "id": 1,
        "title":"Almoço Executivo",
        "amount":35.00,
        "category":"Alimentação",
        "date":"2024-05-20",
        "description":"Restaurante com a família","createdAt":"2026-03-24T22:56:34.298Z"
    }

    Remover despesa:
    DELETE | http://localhost:3000/api/expenses/:id <- Insira um id existente

    Resultado esperado: 204 - No content

    Soma o valor total das despesas:
    GET | http://localhost:3000/api/expenses/summary/total

    Resultado esperado: 200 - Ok

    {
        "total": 229.5
    }

    Soma o valor das despesas pela categoria:
    GET | http://localhost:3000/api/expenses/summary/category

    Resultado esperado: 200 - Ok

    {
        "Alimentação": 45.9,
        "Transporte": 3098.8,
        "Carro": 750
    }
