const expressAsyncHandler = require("express-async-handler");
const Income = require("../../model/Income");


//create 
const createIncCtrl = expressAsyncHandler(async (req,res)=>{
    const {title, amount , description,user} = req.body;
    try {
        const income = await Income.create({
            title,
            amount,
            description,
            user
        });
        res.json(income);
    } catch (error) {
        res.json(error);
    }
})


//fetch all income
const fetchAllIncCtrl = expressAsyncHandler(async (req,res)=>{
    const {page} = req.query;
    try {
        const income = await Income.paginate({}, {limit:10, page: Number(page),populate:"user"});
        res.json(income);
    } catch (error) {
        res.json(error);
    }
})


//fetch single income
const fetchIncDetailesCtrl = expressAsyncHandler(async (req,res)=>{
    const {id} = req?.params
    const {title, amount , description} = req.body;
    try {
        const income = await Income.find(id);
        res.json(income);
    } catch (error) {
        res.json(error);
    }
})


//update income
const updateIncCtrl = expressAsyncHandler(async (req,res)=>{
    const {id} = req?.params;
    const {title, amount , description} = req.body;

    try {
        const income = await Income.findByIdAndUpdate(id,{
            title,
            description,
            amount,
        },
        {new: true}
    );
    res.json(income);
    } catch (error) {
        res.json(error);
    }

});

//delete income
const deleteIncCtrl = expressAsyncHandler(async (req,res)=>{
    const {id} = req?.params;

    try {
        const income = await Income.findByIdAndDelete(id);
    res.json(income);
    } catch (error) {
        res.json(error);
    }

});

module.exports = {createIncCtrl, fetchAllIncCtrl,fetchIncDetailesCtrl, updateIncCtrl,deleteIncCtrl};