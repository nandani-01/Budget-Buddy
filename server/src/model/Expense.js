const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//schemas 
const expenseSchema = mongoose.Schema({
    title:{
        required:[true, "Title is required"],
        type:  String,
    },
    description:{
        required:[true, "Description is required"],
        type:  String,
    },
    type:{
        type:  String,
        default:"expense",
    },
    amount:{
        required:[true, "Amount is required"],
        type: Number,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true ,"User Id is required"],
    }
},
{
    timestamp:true,
    toJSON:{
        virtual: true,
    },
    toObject: {
        virtuals: true,
    },
}
);

expenseSchema.plugin(mongoosePaginate);
const Expense = mongoose.model("Expenses" , expenseSchema);

module.exports = Expense;