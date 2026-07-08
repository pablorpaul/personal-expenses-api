const ExpenseModel = require('../models/expense.js');

class Expense {
    constructor(){
    }

    async getAll(){
        return await ExpenseModel.getAll();
    }

    async getById(id){
        if (!id) {
            throw new Error("Missing required fields: id");
        }

        return await ExpenseModel.getById(id);
    }

    async create(categoryId, userId, title, amount, date, description){
        if (!title) {
            throw new Error("Missing required fields: title");
        }
        if (amount < 0) {
            throw new Error("Error: Amount must be greater than zero");
        }
        const hoje = new Date();
        if (Date.parse(date) > hoje){
            throw new Error("Error: The date entered cannot be later than the current date");
        }
        return await ExpenseModel.create(categoryId, userId, title, amount, date, description);
    }

    update(id, categoryId, userId, title, amount, date, description){
        if (!id){
            throw new Error("Missing required fields: id");
        }
        if (!title) {
            throw new Error("Missing required fields: title");
        }
        if (amount < 0) {
            throw new Error("Error: Amount must be greater than zero");
        }
        const hoje = new Date();
        if (Date.parse(date) > hoje){
            throw new Error("Error: The date entered cannot be later than the current date");
        }
        const expense = ExpenseModel.update(id, categoryId, userId, title, amount, date, description);
        if(!expense){
            throw new Error("Expense not found");
        }
        return expense;
    }

    async delete(id){
        if (!id){
            throw new Error("Missing required fields: id");
        }
        return await ExpenseModel.deleteExpense(id);
    }

    getSummaryTotal(){
        return ExpenseModel.getSummaryTotal();
    }

    async getSumByCategory(){
        return await ExpenseModel.getSumByCategory();
    }

    async getCount(){
        return await ExpenseModel.getCount();
    }
}

module.exports = new Expense();