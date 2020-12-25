const {model,Schema} =require("mongoose");
const  uniqueValidator = require('mongoose-unique-validator');
// const singleSubPlan = require("./singleSubPlan");

const SubInvestmentSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    singlesubplans:[{
        type: Schema.Types.ObjectId,
        ref: "singlesubInvestments",
    }]
})

SubInvestmentSchema.plugin(uniqueValidator);
const SubInvestments = model("subInvestments",SubInvestmentSchema)
SubInvestments.aggregate([{ $count: 'singlesubInvestments' }]);

module.exports =SubInvestments