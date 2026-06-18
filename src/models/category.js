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

async function getAll(){
    return await Category.findAll();
}

async function getById(id){
    return await Category.findByPk(id);
}

async function create(name, description){
    return await Category.create({ name, description });
}

async function update(id, name, description){
    const category = await getById(id);

    if(!category){
        return null;
    }

    category.name = name;
    category.description = description;

    await category.save();
    return category;
}

async function deleteCategory(id){
    const category = await getById(id);

    if (!category) {
        return null
    }

    await category.destroy();
    return null;
}

module.exports = { getAll, getById, create, update, deleteCategory}, Category;