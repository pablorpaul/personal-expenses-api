const UserModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class User {
    constructor(){
    }

    replacePassword(password) {
        return '*'.repeat(password.lenght);
    }

    async login(email, password){
        const user = await UserModel.getUserByEmail(email);

        if (!user || user.password !== password) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            authConfig.jwt.secret,
            { expiresIn: authConfig.jwt.expiresIn }
        );

        return {
            token,
            user: this.mapPublicUser(user)
        };
    }

    mapUser(user) {
        const userData = user.dataValues || user;

        return {
            ...userData,
            password:this.replacePassword(userData.password)
        };
    }

    mapPublicUser(user){
        const mapped = this.mapUser(user);

        return {
            id: mapped.id,
            email: mapped.email
        }

    }

    getAll(){
        return UserModel.getAll();
    }

    getById(id){
        if(!id) {
            throw new Error("Missing required fields: id");
        }

        return UserModel.getById(id);
    }

    async create(name, email, password){
        if(!name) {
            throw new Error("Missing required fields: name");
        }
        if(!email) {
            throw new Error("Missing required fields: email");
        }
        if(!password) {
            throw new Error("Missing required fields: password");
        }

        return await UserModel.create(name, email, password);
    }

    update(id, name, email, password){
        if(!id){
            throw new Error("Missing required fields: id");
        }
        if(!name) {
            throw new Error("Missing required fields: name");
        }
        if(!email) {
            throw new Error("Missing required fields: email");
        }
        if(!password) {
            throw new Error("Missing required fields: password");
        }

        return UserModel.update(id, name, email, password);
    }

    delete(id){
        if (!id){
            throw new Error("Missing required fields: id");
        }
        return UserModel.deleteUser(id);
    }
}

module.exports = new User()