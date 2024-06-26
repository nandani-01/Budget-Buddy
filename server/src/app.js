const express = require('express')
const dbConnect = require('./config/dbConnect');
const cors = require('cors')
const { errorHandler,notfound } = require('./middlewares/errorMiddleware');


const userRoute = require('./routes/users/usersRoute');
const incomeRoute = require('./routes/income/incomeRoute');
const expenseRoute = require('./routes/expenses/expenseRoute');


const app = express();


dbConnect();


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json({msg:"Welcome EXPENSE tracker API"});
})

//user routes
app.use("/api/users", userRoute);

//income routes
app.use('/api/income',incomeRoute);

//expense routes
app.use('/api/expenses',expenseRoute);

//errorahandler
app.use(notfound);
app.use(errorHandler);

module.exports = app;

