const User = require("../models/user/User");
const Transfer = require("../models/investmentPlan/Transfer/Transfer");

exports.proof=(req,res,next)=>{
    User.findOneAndUpdate({_id:req.params.id},{transferDets:req.body},(err,user)=>{
        if(err) res.send(err)
        else{
           res.json({
             message:"Success",
             user
        })
        }
    })
}