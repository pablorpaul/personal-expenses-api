const express = require('express');
const Expense = require('../src/views/expense.js');
const Categories = require('../src/views/category.js');
const Users = require('../src/views/user.js');
const { sequelize } = require('./models/db');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/expenses', Expense.getAll);
app.get('/api/expenses/:id', Expense.getById);
app.post('/api/expenses', Expense.create);
app.put('/api/expenses/:id', Expense.update);
app.delete('/api/expenses/:id', Expense.delete);
app.get('/api/expenses/summary/total', Expense.getTotal);
app.get('/api/expenses/summary/category', Expense.getSumByCategory);

app.get('/api/categories', Categories.getAll);
app.get('/api/categories/:id', Categories.getById);
app.post('/api/categories', Categories.create);
app.put('/api/categories/:id', Categories.update);
app.delete('/api/categories/:id', Categories.delete);

app.get('/api/users', Users.getAll);
app.get('/api/users/:id', Users.getById);
app.post('/api/users', Users.create);
app.put('/api/users/:id', Users.update);
app.delete('/api/users/:id', Users.delete);

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