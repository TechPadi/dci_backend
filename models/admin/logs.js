const {Schema,model} = require("mongoose")
const  uniqueValidator = require('mongoose-unique-validator');

const LogsSchema = new Schema({
    log: {
        type: Object,
        default:true
      },
})


LogsSchema.plugin(uniqueValidator);
module.exports=model("Logs",LogsSchema);