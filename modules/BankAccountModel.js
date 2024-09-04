const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }]
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);
module.exports = BankAccount;