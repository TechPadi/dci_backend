const {Schema,model} = require("mongoose")
const  uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    phonenumber:{
        type:String,
        required:true,
        trim:true
    },
    residentialAddress:{
        type:String,
        required:true,
        trim:true
    },
    nearestBusStop:{
        type:String,
        required:true,
        trim:true
    },
    town:{
        type:String,
        required:true,
        trim:true
    },
    State:{
        type:String,
        required:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
        trim:true
    },
    DateOfBirth:{
        type:String,
        required:true,
        trim:true
    },
    idNumber:{
        type:String,
        required:true,
        trim:true
    },
    idType:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    AdminType:{
        type:String,
        default:"admin"
    },
    activityLogs:[
        {
            type: Object,
        } 
    ]
    // activityLogs:[
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Logs"
    //     } 
    // ]

},{ timestamps: true })

AdminSchema.plugin(uniqueValidator);
module.exports=model("admin",AdminSchema);

