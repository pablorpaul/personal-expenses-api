const UserController = require('../controllers/user.js');

class User {
    constructor(){
    }

    async login(req, res) {
        try {
            const { email, password } = req.body || {}

            if(!email || !password) {
                return res.status(400).json({ error: 'Email e senha obrigatórios '});
            }

            const auth = await UserController.login(email, password);
            return res.json(auth);
        } catch (error) {
            console.error('Error em login', error);
            return res.status(401).json({ error: error.message });
        }
    }

    async getAll(req, res){
        try {
            const user = UserController.getAll();

            res.status(200).json(expenses);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res){
        try {
            const id = Number(req.params.id);

            const user = UserController.getById(id);

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { name, email, password } = req.body;

            const newUser = UserController.create(name, email, password);

            res.status(201).json(newUser);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const user = UserController.update(Number(id), name, email, password);

            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            UserController.delete(id);

            res.status(204).json();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new User();