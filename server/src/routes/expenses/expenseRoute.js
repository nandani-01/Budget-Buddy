const express = require("express");
const { createExpCtrl,
    fetchAllExpCtrl ,
    fetchExpDetailesCtrl,
    updateExpCtrl,
     deleteExpCtrl} = require("../../controllers/expenses/expenseCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");

const expenseRoute = express.Router();

expenseRoute.post("/",authMiddleware,createExpCtrl);
expenseRoute.get("/",authMiddleware,fetchAllExpCtrl);
expenseRoute.get("/:id",authMiddleware,fetchExpDetailesCtrl);
expenseRoute.put("/:id",authMiddleware,updateExpCtrl);
expenseRoute.delete("/:id",authMiddleware,deleteExpCtrl);


module.exports = expenseRoute;