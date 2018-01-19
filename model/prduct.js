var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Prduct = new Schema({
    pName:String,
    pCode:String,
    Pclass:String,
    pBrand:String,
    pPrice:Number,
    pId:Number,
    judge:Number,
    creade_date: { type: Date, default: Date.now }
})
var PrductModel = mongoose.model("prduct", Prduct)

module.exports = PrductModel