const expenses = require('../data/expenses');

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
            throw new Error("Despesa não encontrada");
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
            throw new Error("Despesa não encontrada");
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
            throw new Error("Despesa não encontrada");
        }

        expenses.splice(index, 1);

        return null
    }

    getSummaryTotal(){
        let total = 0;
        expenses.forEach(exp => total += exp.amount)

        return total;
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

module.exports = new Expense();