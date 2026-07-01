const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }

})

class CategoryModel {
    constructor() {}

    async getAll(){
        return await Category.findAll();
    }

    async getById(id){
        return await Category.findByPk(id);
    }

    async create(name, description){
        return await Category.create({ name, description });
    }

    async update(id, name, description){
        const category = await this.getById(id);

        if(!category){
            return null;
        }

        category.name = name;
        category.description = description;

        await category.save();
        return category;
    }

    async deleteCategory(id){
        const category = await this.getById(id);

        if (!category) {
            return null
        }

        await category.destroy();
        return null;
    }
}

const categoryModel = new CategoryModel();
categoryModel.Category = Category;

module.exports = categoryModel;