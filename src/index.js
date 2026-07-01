const express = require('express');
const Expense = require('../src/views/expense.js');
const Categories = require('../src/views/category.js');
const Users = require('../src/views/user.js');
const { sequelize } = require('./models/db');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/expenses', authMiddleware, Expense.getAll);
app.get('/api/expenses/:id', authMiddleware, Expense.getById);
app.post('/api/expenses', authMiddleware, Expense.create);
app.put('/api/expenses/:id', authMiddleware, Expense.update);
app.delete('/api/expenses/:id', authMiddleware, Expense.delete);
app.get('/api/expenses/summary/total', authMiddleware, Expense.getTotal);
app.get('/api/expenses/summary/category', authMiddleware, Expense.getSumByCategory);

app.get('/api/categories', authMiddleware, Categories.getAll);
app.get('/api/categories/:id', authMiddleware, Categories.getById);
app.post('/api/categories', authMiddleware, Categories.create);
app.put('/api/categories/:id', authMiddleware, Categories.update);
app.delete('/api/categories/:id', authMiddleware, Categories.delete);

app.post('/api/users/login', Users.login)
app.post('/api/users', Users.create);

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Conexâo com o banco de dados estabelecida com sucesso.');
        app.listen(PORT, () => {
            console.info(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Nâo foi possível conectar ao banco de dados:', error);
    }
}

main();