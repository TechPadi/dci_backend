const {model,Schema} =require("mongoose");
const  uniqueValidator = require('mongoose-unique-validator');

const InvestmentSchema = new Schema({
    name:{
        type:String,
    },
    subPlans:[{
        type: Schema.Types.ObjectId,
        ref: "subinvestments",
    }]
})

InvestmentSchema.plugin(uniqueValidator); 
const Investment = model("investment",InvestmentSchema)
Investment.aggregate([{ $count: 'subinvestments' }]);

module.exports =Investment