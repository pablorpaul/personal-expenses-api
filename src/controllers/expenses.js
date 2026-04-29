const ExpenseModel = require('../models/expense');

class Expense {
    constructor(){
    }

    getAll(){
        return ExpenseModel.getAll();
    }

    getById(id){
        if (!id) {
            throw new Error("Missing required fields: id");
        }

        return ExpenseModel.getById(id);
    }

    create(title, amount, category, date, description){
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
        return ExpenseModel.create(title, amount, category, date, description);
    }

    update(id, title, amount, category, date, description){
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
        const expense = ExpenseModel.update(id, title, amount, category, date, description);
        if(!expense){
            throw new Error("Expense not found");
        }
        return expense;
    }

    delete(id){
        if (!id){
            throw new Error("Missing required fields: id");
        }
        return ExpenseModel.delete(id);
    }

    getSummaryTotal(){
        return ExpenseModel.getSummaryTotal();
    }

    getSummaryCategory(){
        return ExpenseModel.getSummaryCategory();
    }
}

module.exports = new Expense();