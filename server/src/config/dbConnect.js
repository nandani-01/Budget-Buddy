const mongoose = require('mongoose');

const dbConnect = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/moneytracker",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`DB connected successfully`);
    } catch(error) {
        console.log(`error ${error.message}`);
    }
}

module.exports = dbConnect;