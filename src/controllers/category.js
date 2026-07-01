const CategoryModel = require('../models/category.js');

class Category {
    constructor(){
    }

    async getAll(){
        return await CategoryModel.getAll();
    }

    async getById(id){
        if (!id) {
            throw new Error("Missing required fields: id");
        }

        return await CategoryModel.getById(id);
    }

    async create(name, description){
        if(!name) {
            throw new Error("Missing required fields: title");
        }
        
        return await CategoryModel.create(name, description);
    }

    async update(id, name, description){
        if(!id){
            throw new Error("Missing required fields: id");
        }
        if(!name){
            throw new Error("Missing required fields: name");
        }

        const category = await CategoryModel.update(id, name, description);
        if(!category){
            throw new Error("Expense not found");
        }
        return category;
    }

    async delete(id){
        if(!id){
            throw new Error("Missing required fields: id");
        }

        return await CategoryModel.deleteCategory(id);
    }
}

module.exports = new Category();