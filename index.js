require('dotenv').config();
const mongoose=require("mongoose")
const express=require("express")
const connectToDB = require("./config/db");
const router = require('./routes/userRoutes');
const accountRouter = require('./routes/BankRoutes');
const ExpenseRouter = require('./routes/Expense');
const bodyParser = require('body-parser');

const app=express()
const port = process.env.PORT

app.use(bodyParser.json());
app.use(express.json())

app.use("/user",router)
app.use(accountRouter)
app.use(ExpenseRouter)
app.listen(port,async(req,res)=>{
    await connectToDB()
    console.log("server started and connect to db")
})