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

class UserModel {
    constructor() {}

    async getUserByEmail(email) {
        return await User.findOne({ where: { email }})
    }

    async getAll(){
        return await User.findAll();
    }

    async getById(id){
        return await User.findByPk(id);
    }

    async create(name, email, password){
        return await User.create({ name, email, password })
    }

    async update(id, name, email, password) {
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

    async deleteUser(id) {
        const user = await getById(id);

        if (!user) {
            return null
        }

        await User.destroy();
        return null;
    }
}

const userModel = new UserModel();
userModel.User = User;

module.exports = userModel;