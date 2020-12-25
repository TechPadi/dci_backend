const {model,Schema} =require("mongoose");
const  uniqueValidator = require('mongoose-unique-validator');

const SingleSubInvestmentSchema = new Schema({
    name:{
        type:String,
        required:true,
    }
})

SingleSubInvestmentSchema.plugin(uniqueValidator);
module.exports=model("singlesubInvestments",SingleSubInvestmentSchema)