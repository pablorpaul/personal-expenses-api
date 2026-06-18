const { getAll, getById, create, update, deleteUser } = require('../models/user.js')

class User {
    constructor(){
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

    create(name, email, password){
        if(!name) {
            throw new Error("Missing required fields: name");
        }
        if(!email) {
            throw new Error("Missing required fields: email");
        }
        if(!password) {
            throw new Error("Missing required fields: password");
        }

        return UserModel.create(name, email, password);
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