const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

const app = express()
require("dotenv").config();

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute")
const RecordRoute = require("./Routes/RecordRoute")
const protectedRoute = require("./Routes/ProtectedRoute")

const {MONGO_URL , PORT} = process.env;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


app.listen(PORT , ()=>{
    console.log(`Server is listening on port ${PORT}`)
})

app.use(cors({
    origin: ["http://localhost:3000" ], //frontend url
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


app.get("/", (req, res) => {
    res.send("Welcome to the server!");
});
  
app.use(cookieParser());
app.use(express.json());

app.use("/" ,authRoute);
app.use("/api" , protectedRoute)
app.use("/record" , RecordRoute);