const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

async function getAll(){
    return await User.findAll();
}

async function getById(id){
    return await User.findByPk(id);
}

async function create(name, email, password){
    return await User.create({ name, email, password })
}

async function update(id, name, email, password) {
    const user = await getById(id);

    if(!user){
        return null;
    }

    user.title = title;
    user.amount = amount;
    user.category = category;
    user.date = date;
    user.description = description;

    await user.save();
    return user;
}

async function deleteUser(id) {
    const user = await getById(id);

    if (!user) {
        return null
    }

    await User.destroy();
    return null;
}

module.exports = { getAll, getById, create, update, deleteUser }, User;