const express = require('express');
const accountRouter = express.Router();


const Auth = require('../middleware/Authantication');
const User = require('../modules/userModel');
const BankAccount = require('../modules/BankAccountModel');


accountRouter.post('/api/users/:user_id/accounts',Auth,async (req, res) => { //http://localhost:3002/api/users/{user_id}/accounts (replace {user_id}
  const { user_id } = req.params;
  const { accountName, accountNumber, balance } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const newAccount = new BankAccount({
      accountName,
      accountNumber,
      balance,
      user: user_id
    });
    await newAccount.save();
    user.bankAccounts.push(newAccount);
    await user.save();
    res.status(201).json({ message: 'Bank account created successfully', account: newAccount });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


module.exports = accountRouter;