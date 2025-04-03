const mongoose = require("mongoose");

const RecordsSchema = mongoose.Schema({
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
        default:"income",
    },
    amount:{
        required:[true, "Amount is required"],
        type: Number,
    },
    category: {
        required:[true, "category is required"],
        type: String,
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

const Records = mongoose.model("Records", RecordsSchema);

module.exports = Records;