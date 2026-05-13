/*const expenses = require('../data/expenses');

let idCounter = 0;

class Expense {
    constructor(title, amount, category, date, description, createdAt) {
        this.id = idCounter++;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.description = description;
        this.createdAt = createdAt;
    }

    getAll(){
        return expenses;
    }

    getById(id){
        const index = expenses.findIndex(exp => exp.id == id);

        if (index === -1) {
            throw new Error("Error: Expense not found");
        }

        return expenses.find(expense => expense.id === id);
    }

    create(title, amount, category, date, description){
        //Data atual
        const createdAt = new Date().toISOString();
        const newExpense = new Expense(title, amount, category, date, description, createdAt);
  
        expenses.push(newExpense);

        return newExpense;
    }

    update(id, title, amount, category, date, description){
        const index = expenses.findIndex(exp => exp.id == id);

        if (index === -1) {
            throw new Error("Error: Expense not found");
        }
        const expense = expenses.find(expense => expense.id === id);
        //Verifica os valores que precisam ser alterdados.
        if (title) expense.title = title;
        if (amount) expense.amount = amount;
        if (category) expense.category = category;
        if (date) expense.date = new Date(date).toISOString();
        if (description) expense.description = description;

        return expense;
    }

    delete(id){
        const index = expenses.findIndex(exp => exp.id == id);

        if (index === -1) {
            throw new Error("Error: Expense not found");
        }

        expenses.splice(index, 1);

        return null
    }

    getSummaryTotal(){
        let total = 0;
        expenses.forEach(exp => total += exp.amount)

        return total.toFixed(2);
    }

    getSummaryCategory(){
        const sumCategory = expenses.reduce((acumulador, expense) => {
            if(!acumulador[expense.category]){
                acumulador[expense.category] = 0;
            }

            acumulador[expense.category] += expense.amount;

            return acumulador
        }, {});

        return sumCategory;
    }
}

module.exports = new Expense();*/

const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT
    },
    category: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATEONLY
    },
    description: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE
    }

})

async function getAll(){
    return await Expense.findAll();
}

async function getById(id){
    return await Expense.findByPk(id);
}

async function create(title, amount, category, date, description){
    return await Expense.create({ title, amount, category, date, description})
}

async function update(id, title, amount, category, date, description) {
    const expense = await getById(id);

    if(!expense){
        return null;
    }

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    expense.description = description;

    await expense.save();
    return expense;
}

async function deleteExpense(id) {
    const expense = await getById(id);

    if (!expense) {
        return null
    }

    await expense.destroy();
    return null;
}

async function getSummaryTotal() {
    const expenses = getAll();

    expenses.forEach(exp => total += exp.amount)

    return total.toFixed(2);
}

async function getSumByCategory(){
    const expenses = getAll();

    const sumCategory = expenses.reduce((acumulador, expense) => {
            if(!acumulador[expense.category]){
                acumulador[expense.category] = 0;
            }

            acumulador[expense.category] += expense.amount;

            return acumulador
        }, {});

        return sumCategory;
}

module.exports = { getAll, getById, create, update, deleteExpense }, Expense;