const ExpenseModel = require('../models/expense');

class Expense {
    constructor(){
    }

    getAll(){
        return ExpenseModel.getAll();
    }

    getById(id){
        if (!id) {
            throw new Error("Missing required fields");
        }

        return ExpenseModel.getById(id);
    }

    create(title, amount, category, date, description){
        if (!title) {
            throw new Error("Campos obrigatórios: title");
        }
        if (amount < 0) {
            throw new Error("Erro: Amount tem que ser maior que zero");
        }
        const hoje = new Date();
        if (Date.parse(date) > hoje){
            throw new Error("Erro: Data informada não pode ser maior que a data atual");
        }
        return ExpenseModel.create(title, amount, category, date, description);
    }

    update(id, title, amount, category, date, description){
        if (!id){
            throw new Error("Missing required fields");
        }
        if (!title) {
            throw new Error("Campos obrigatórios: title");
        }
        if (amount < 0) {
            throw new Error("Erro: Amount tem que ser maior que zero");
        }
        const hoje = new Date();
        if (Date.parse(date) > hoje){
            throw new Error("Erro: Data informada não pode ser maior que a data atual");
        }
        const expense = ExpenseModel.update(id, title, amount, category, date, description);
        if(!expense){
            throw new Error("Despesa não encontrada");
        }
        return expense;
    }

    delete(id){
        if (!id){
            throw new Error("Missing required fields");
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