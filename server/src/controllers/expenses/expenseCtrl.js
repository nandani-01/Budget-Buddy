const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");

// Create Expense
const createExpCtrl = expressAsyncHandler(async (req, res) => {
    const { title, amount, description } = req.body;
    try {
        const expense = await Expense.create({
            title,
            amount,
            description,
            user: req?.user?._id,
        });
        res.status(201).json(expense); // Set status code to 201 for created resource
    } catch (error) {
        res.status(500).json({ message: error.message }); // Ensure status code is set
    }
});

// Fetch All Expenses
const fetchAllExpCtrl = expressAsyncHandler(async (req, res) => {
    const { page } = req.query;
    try {
        const expenses = await Expense.paginate({}, { limit: 10, page: Number(page), populate: "user" });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch Single Expense
const fetchExpDetailesCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findById(id).populate("user");
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
        } else {
            res.json(expense);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Expense
const updateExpCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, amount, description } = req.body;

    try {
        const expense = await Expense.findByIdAndUpdate(id, {
            title,
            description,
            amount,
        }, { new: true });
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
        } else {
            res.json(expense);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Expense
const deleteExpCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
        } else {
            res.json({ message: "Expense deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    createExpCtrl,
    fetchAllExpCtrl,
    fetchExpDetailesCtrl,
    updateExpCtrl,
    deleteExpCtrl
};
