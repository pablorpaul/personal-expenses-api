const ExpenseController = require('../controllers/expense.js');

class Expense {
    constructor(){
    }

    async getAll(req, res) {
        try {
            const expenses = ExpenseController.getAll();
        
            res.status(200).json({
              expenses, 
              links:[
                { 
                  "rel": "total", "method": "GET", "href": `http://localhost:3000/api/expenses/summary/total`
                },
                { 
                  "rel": "category_total", "method": "GET", "href": `http://localhost:3000/api/expenses/summary/category`
                }
              ]
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
        
            const expense = ExpenseController.getById(id);
        
            res.status(200).json(expense);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { title, amount, category, date, description } = req.body;
        
            const newExpense = ExpenseController.create(title, amount, category, date, description);
        
            res.status(201).json({
              newExpense,
              links:[
                { 
                  "rel": "self", "method": "GET", "href": `http://localhost:3000/api/expenses/${newExpense.id}`
                },
                { 
                  "rel": "total", "method": "GET", "href": `http://localhost:3000/api/expenses/summary/total`
                },
                { 
                  "rel": "category_total", "method": "GET", "href": `http://localhost:3000/api/expenses/summary/category`
                }
              ]
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, amount, category, date, description } = req.body;
        
            const expense = ExpenseController.update(Number(id), title, amount, category, date, description);
        
            res.status(200).json({
              expense, 
              links:[
                { 
                  "rel": "self", "method": "GET", "href": `http://localhost:3000/api/expenses/${expense.id}`
                },
                { 
                  "rel": "total", "method": "GET", "href": `http://localhost:3000/api/expenses/summary/total`
                },
                { 
                  "rel": "category_total", "method": "GET", "href": `http://localhost:3000/api/expenses//api/expenses/summary/category`
                }
              ]
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            
            ExpenseController.delete(id);
        
            res.status(204).json();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getTotal(req, res) {
        try {
            const total = ExpenseController.getSummaryTotal();
        
            res.status(200).json({ "total": total});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getSumByCategory(req, res) {
        try {
            const json = ExpenseController.getSummaryCategory();
        
            res.status(200).json(json);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new Expense();