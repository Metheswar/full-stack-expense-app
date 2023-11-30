// controllers/expenseController.js
const Expense = require('../models/expense');

exports.createExpense = async (req, res) => {
  try {
    const { description, amount } = req.body;
    const newExpense = await Expense.create({ description, amount });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
