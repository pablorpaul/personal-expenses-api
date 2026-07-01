const CategoryModel = require('./category');
const ExpenseModel = require('./expense');
const UserModel = require('./user')

const Category = CategoryModel.Category;
const Expense = ExpenseModel.Expense;
const User = UserModel.User

Category.hasMany(Expense, {
    foreignKey: 'categoryId',
    as: 'expenses'
});

Expense.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'categories'
});

User.hasMany(Expense, {
    foreignKey: 'userId',
    as: 'expenses'
});

Expense.belongsTo(User, {
    foreignKey: 'userId',
    as: 'users'
})