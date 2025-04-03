const Records = require("../Models/RecordsModel");
const jwt = require("jsonwebtoken");

module.exports.CreateRecord = async (req, res) => {
    try {
        const userId = req.user;  // Assuming `req.user` is set by your authentication middleware
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. User not found.", success: false });
        }

        const { title, amount, description, category } = req.body;
        
        if (!title || !amount || !description || !category) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Create a new record in the database
        const record = await Records.create({
            title,
            amount,
            description,
            category,
            user: userId,
        });  

        console.log("Record created:", record);
        res.status(201).json({ message: "Record successfully created", success: true, record });
    } catch (error) {
        console.error("Error creating record:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

module.exports.GetRecord = async (req, res) => {
    try {
        const transactions = await Records.find({ user: req.user }).select("title amount description category createdAt").sort({ createdAt: -1 });
    
        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found" });
        }
    
        res.status(200).json({ transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Error fetching transactions", success: false });
    }
};
module.exports.DeleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await Records.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.UpdateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, description, category } = req.body;

        const updatedTransaction = await Records.findByIdAndUpdate(
            id,
            { title, amount, description, category },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction updated successfully", updatedTransaction });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
};
