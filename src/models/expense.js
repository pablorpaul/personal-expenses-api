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
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT
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

class ExpenseModel {
    constructor() {}

    async getAll(){
        return await Expense.findAll();
    }

    async getById(id){
        return await Expense.findByPk(id);
    }

    async create(categoryId, userId, title, amount, date, description){
        return await Expense.create({ categoryId, userId, title, amount, date, description})
    }

    async update(id, categoryId, userId, title, amount, date, description) {
        const expense = await this.getById(id);

        if(!expense){
            return null;
        }

        expense.categoryId = categoryId;
        expense.userId = userId;
        expense.title = title;
        expense.amount = amount;
        expense.date = date;
        expense.description = description;

        await expense.save();
        return expense;
    }

    async deleteExpense(id) {
        const expense = await this.getById(id);

        if (!expense) {
            return null
        }

        await expense.destroy();
        return null;
    }

    async getSummaryTotal() {
        const expenses = await getAll();

        expenses.forEach(exp => total += exp.amount)

        return total.toFixed(2);
    }

    async getSumByCategory(){
        const expenses = await getAll();

        const sumCategory = expenses.reduce((acumulador, expense) => {
                if(!acumulador[expense.categoryId]){
                    acumulador[expense.categoryId] = 0;
                }

                acumulador[expense.category] += expense.amount;

                return acumulador
            }, {});

            return sumCategory;
    }
}

const expenseModel = new ExpenseModel();
expenseModel.expense = Expense;

module.exports = expenseModel;