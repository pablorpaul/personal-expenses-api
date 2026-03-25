const express = require('express');
const Expense = require('./models/expense');
const expenses = require('./data/expenses');

const app = express();
const PORT = 3000;

app.use(express.json());

// Listar despesas
app.get('/expenses', (req, res) => {
  res.status(200).json(expenses);
});

// Criar despesa
app.post('/expenses', (req, res) => {
  const { title, amount, category, date, description } = req.body;

  //Verificação das regras de negócio
  if (!title) {
    return res.status(400).json({ error: "Campos obrigatórios: title" });
  }
  if (amount < 0) {
    return res.status(400).json({ error: "Amount tem que ser maior que zero"})
  }
  const hoje = new Date();
  if (Date.parse(date) > hoje){
    return res.status(400).json({ error: "Data informada não pode ser maior que a data atual"})
  }

  //Geração do ID aleatorio
  const id = crypto.randomUUID();
  //Data atual
  const createdAt = new Date().toISOString();
  const newExpense = new Expense(id, title, amount, category, date, description, createdAt);
  
  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

// Busca pelo ID
app.get('/expenses/:id', (req, res) => {
  const { id } = req.params;

  const expense = expenses.find(exp => exp.id == id);
  //Verifica se o ID foi encontrado
  if (!expense) {
    return res.status(404).json({ error: "Despesa não encontrada." });
  }

  res.status(200).json(expense);
});

// Atualiza pelo ID
app.put('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date, description } = req.body;

  //Verifica se o ID foi encontrado
  const expense = expenses.find(exp => exp.id == id);

  if (!expense) {
    return res.status(404).json({ error: "Despesa não encontrada." });
  }

  //Verifica os valores que precisam ser alterdados.
  if (title !== undefined) expense.title = title;
  if (amount !== undefined) expense.amount = Number(amount);
  if (category !== undefined) expense.category = category;
  if (date !== undefined) expense.date = new Date(date).toISOString();
  if (description !== undefined) expense.description = description;

  res.status(200).json(expense);
});

// Remover pelo ID
app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;

  const expenseIndex = expenses.findIndex(exp => exp.id == id);

  //Verifica se o ID foi encontrado
  if (expenseIndex === -1) {
    return res.status(404).json({ error: "Despesa não encontrada." });
  }

  expenses.splice(expenseIndex, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});