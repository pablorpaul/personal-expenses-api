const { getAll, getById, create, update, deleteCategory } = require('../models/category.js');

class Category {
    constructor(){
    }

    getAll(){
        return CategoryModel.getAll();
    }

    getById(id){
        if (!id) {
            throw new Error("Missing required fields: id");
        }

        return CategoryModel.getById(id);
    }

    create(name, description){
        if(!name) {
            throw new Error("Missing required fields: title");
        }
        
        return CategoryModel.create(name, description);
    }

    update(id, name, description){
        if(!id){
            throw new Error("Missing required fields: id");
        }
        if(!name){
            throw new Error("Missing required fields: name");
        }

        const category = CategoryModel.update(id, name, description);
        if(!category){
            throw new Error("Expense not found");
        }
        return category;
    }

    delete(id){
        if(!id){
            throw new Error("Missing required fields: id");
        }

        return CategoryModel.deleteCategory(id);
    }
}

module.exports = new Category();