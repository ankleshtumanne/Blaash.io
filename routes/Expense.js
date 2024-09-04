const express = require('express');
const Auth = require('../middleware/Authantication');
const User = require('../modules/userModel');
const BankAccount = require('../modules/BankAccountModel');
const Expense = require('../modules/ExpenseModel');
const ExpenseRouter = express.Router();

// Add Expense to a Bank Account
ExpenseRouter.post('/api/users/:user_id/accounts/:account_id/expenses',Auth,async (req, res) => {
    const { user_id, account_id } = req.params;
    const { amount, description, category } = req.body;
    
    try {
        const user = await User.findById(user_id);
       
        if (!user) return res.status(404).send('User not found');
        // console.log("befor account")
        const account = await BankAccount.findById(account_id);
        // console.log("account",account)
        if (!account) return res.status(404).send('Account not found');
        const newExpense = new Expense({ amount, description, category, account: account._id });
        await newExpense.save();
        // const newExpense = { amount, description, category };
        account.expenses.push(newExpense._id);
        
        await account.save();
        console.log("account",account)
        res.status(201).json({msg:"successfull",newExpense});
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

ExpenseRouter.get('/api/users/:user_id/accounts/:account_id/expenses',Auth,async (req, res) => {
    const { user_id, account_id } = req.params;
    console.log("getting",account_id)
    try {
      
      const user = await User.findById(user_id);
      // console.log("user",user)
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const account = await BankAccount.findById(account_id).populate('expenses');
      console.log("acount",account.expenses)
      if (!account || account.user.toString() !== user_id)
        return res.status(404).json({ error: 'Account not found or not linked to user' });
      res.status(200).json({ expenses: account.expenses });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error', details: err.message });
    }
  });
module.exports = ExpenseRouter;