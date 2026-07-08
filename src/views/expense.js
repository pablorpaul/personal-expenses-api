const ExpenseController = require('../controllers/expense.js');

class Expense {
    constructor(){
    }

    async getAll(req, res) {
        try {
            const expenses = await ExpenseController.getAll();
        
            res.status(200).json(expenses);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
        
            const expense = await ExpenseController.getById(id);
        
            res.status(200).json(expense);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { categoryId, userId, title, amount, date, description } = req.body;
        
            const newExpense = await ExpenseController.create(categoryId, userId, title, amount, date, description);
        
            res.status(201).json({newExpense});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { categoryId, userId, title, amount, date, description } = req.body;
        
            const expense = await ExpenseController.update(Number(id), categoryId, userId, title, amount, date, description);
        
            res.status(200).json({expense});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            
            await ExpenseController.delete(id);
        
            res.status(204).json();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getTotal(req, res) {
        try {
            const total = await ExpenseController.getSummaryTotal();
        
            res.status(200).json({ "total": total});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getSumByCategory(req, res) {
        try {
            const sumByCategory = await ExpenseController.getSumByCategory();
        
            res.status(200).json(sumByCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getCount(req, res) {
        try {
            const count = await ExpenseController.getCount();
        
            res.status(200).json({ "count": count });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new Expense();