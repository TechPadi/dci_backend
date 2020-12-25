const {model,Schema} = require("mongoose")
const uniqueValidator =require("mongoose-unique-validator")

const TransferSchema = new Schema({
    Payerdetails:{
        type:String,
        required:true
    },
    DCIdetails:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    }
})

TransferSchema.plugin(uniqueValidator)
const Transfer =model("transfers",TransferSchema)
module.exports =Transfer