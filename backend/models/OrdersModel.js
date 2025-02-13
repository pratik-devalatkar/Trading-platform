const { model } = require("mongoose");
const {OrdersSchema} =require("../schemas/OrdresSchema")

const OrdersModel = new model("order", OrdersSchema);
module.exports={OrdersModel};