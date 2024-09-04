const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount', required: true },
  category: { type: String }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;