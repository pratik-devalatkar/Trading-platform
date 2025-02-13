
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

const cookieParser = require("cookie-parser");
//const authRoute = require("./Routes/AuthRoute");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");

const PORT = 3000;
const url = process.env.MONGO_URL;

// app.get("/", async(req,res)=>{
//     // allHoldings= await HoldingsModel.find({});
//     // res.json(allHoldings); 
//     res.send("dasda");
// })
app.use(
    cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());

//app.use("/", authRoute);

app.get("/allHoldings", async (req, res) => {
    allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
})

app.get("/allPositions", async (req, res) => {
    allPositions = await PositionsModel.find({});
    res.json(allPositions);
})
app.get("/allOrders", async (req, res) => {
    allOrders = await OrdersModel.find({});
    res.json(allOrders);
})
app.post("/newOrder", async (req, res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    })
    newOrder.save();
    res.send("order saved");
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    // mongoose.connect(url);
    // console.log("connected to db");
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).
        then(() => {
            console.log("Mongoose server has started")
        })
        .catch((err) => {
            console.error(err)
        })
});
