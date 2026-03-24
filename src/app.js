const express = require('express');
const Expense = require('./models/expense');
const expenses = require('./data/expenses'); // Importa o array diretamente

const app = express();
const PORT = 3000;

app.use(express.json());

// ROTA: Listar despesas
app.get('/expenses', (req, res) => {
  res.status(200).json(expenses);
});

// ROTA: Criar despesa
app.post('/expenses', (req, res) => {
  const { title, amount, category, date, description } = req.body;

  // Validação básica
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ error: "Campos obrigatórios: title, amount, category, date" });
  }

  const id = expenses.length + 1;
  const createdAt = new Date().toISOString();
  const newExpense = new Expense(id, title, amount, category, date, description, createdAt);
  
  expenses.push(newExpense); // Salva no array em memória

  res.status(201).json(newExpense);
});

// ROTA: Buscar uma despesa específica pelo ID
app.get('/expenses/:id', (req, res) => {
  const { id } = req.params; // Captura o ID da URL

  // Procura no array o objeto com o ID correspondente
  const expense = expenses.find(exp => exp.id == id);

  // Se não encontrar, retorna erro 404
  if (!expense) {
    return res.status(404).json({ error: "Despesa não encontrada." });
  }

  // Se encontrar, retorna o objeto da despesa
  res.status(200).json(expense);
});

// ROTA: Atualizar uma despesa existente
app.put('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date, description } = req.body;

  // 1. Encontrar a despesa no array
  const expense = expenses.find(exp => exp.id == id);

  // 2. Se não existir, retornar 404
  if (!expense) {
    return res.status(404).json({ error: "Despesa não encontrada para atualização." });
  }

  // 3. Atualizar os campos (mantendo os valores antigos caso o campo não seja enviado)
  if (title !== undefined) expense.title = title;
  if (amount !== undefined) expense.amount = Number(amount);
  if (category !== undefined) expense.category = category;
  if (date !== undefined) expense.date = new Date(date).toISOString();
  if (description !== undefined) expense.description = description;

  // Opcional: Você pode querer atualizar uma data de 'updatedAt' aqui
  // expense.updatedAt = new Date().toISOString();

  res.status(200).json(expense);
});

// ROTA: Remover despesa por ID
app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;

  // Procuramos a despesa para saber se ela existe antes de tentar deletar
  const expenseIndex = expenses.findIndex(exp => exp.id == id);

  if (expenseIndex === -1) {
    return res.status(404).json({ error: "Despesa não encontrada." });
  }

  // Remove o item do array usando o índice encontrado
  expenses.splice(expenseIndex, 1);

  // Retornamos 204 (No Content) que é o padrão para deleções bem-sucedidas
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});