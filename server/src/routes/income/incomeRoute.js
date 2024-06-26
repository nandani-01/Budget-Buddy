const express = require("express");
const { createIncCtrl,fetchAllIncCtrl ,fetchIncDetailesCtrl,updateIncCtrl, deleteIncCtrl} = require("../../controllers/income/incomeCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");


const incomeRoute = express.Router();

incomeRoute.post("/",authMiddleware,createIncCtrl);
incomeRoute.post("/",authMiddleware,fetchAllIncCtrl);
incomeRoute.post("/:id",authMiddleware,fetchIncDetailesCtrl);
incomeRoute.put("/:id",authMiddleware,updateIncCtrl);
incomeRoute.delete("/:id",authMiddleware,deleteIncCtrl);


module.exports = incomeRoute;