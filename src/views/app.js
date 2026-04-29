const express = require('express');
const ExpenseController = require('../controllers/expenses');
const expenses = require('../data/expenses');

const app = express();
const PORT = 3000;

app.use(express.json());

// Listar despesas
app.get('/api/expenses', (req, res) => {
  try {
    const expenses = ExpenseController.getAll();

    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Busca pelo ID
app.get('/api/expenses/:id', (req, res) => {
  try {
    const { id } = req.params;

    const expense = ExpenseController.getById(Number(id));

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Criar despesa
app.post('/api/expenses', (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    const newExpense = ExpenseController.create(title, amount, category, date, description);

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualiza pelo ID
app.put('/api/expenses/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date, description } = req.body;

    const expense = ExpenseController.update(Number(id), title, amount, category, date, description);

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remover pelo ID
app.delete('/api/expenses/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    ExpenseController.delete(id);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Calcular total de Despesas
app.get('/api/expenses/summary/total', (req, res) => {
  try {
    const total = ExpenseController.getSummaryTotal();

    res.status(200).json({ "total": total.toFixed(2)});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/expenses/summary/category', (req, res) => {
  try {
    const json = ExpenseController.getSummaryCategory();

    res.status(200).json(json);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});