const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//schemas 
const incomeSchema = mongoose.Schema({
    ftitle:{
        required:[true, "Title is required"],
        type:  String,
    },
    description:{
        required:[true, "Description is required"],
        type:  String,
    },
    type:{
        type:  String,
        default:"income",
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
//pagination
incomeSchema.plugin(mongoosePaginate);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;