const CategoryController = require('../controllers/category.js');

class Category {
    constructor(){
    }

    async getAll(req, res) {
        try {
            const categories = CategoryController.getAll();

            res.status(200).json({categorys});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);

            const category = CategoryController.getById(id);

            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { name, description } = req.body;

            const newCategory = CategoryController.create(name, description);

            res.status(201).json({ newCategory });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const category = CategoryController.update(Number(id), name, description);

            res.status(200).json({ category });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    async delete(req, res) {
        try {
            const { id } = req.params;

            CategoryController.delete(id);

            res.status(204).json();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new Category();