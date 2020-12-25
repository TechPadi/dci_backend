const User = require('../models/user/User')


exports.loandets=(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},{loandets:req.body},(err,user)=>{
        if(err){
            res.send(err)
        }
        else{
            res.json({
                message:"added",
                status:true,
                user
            })
        }
    })
}
exports.loandocs=(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},{loandocs:req.body},(err,user)=>{
        if(err){
            res.send(err)
        }
        else{
            user.LoanRequest=true
            user.save()
            .then(response=>{
                res.json({
                    message:"added",
                    status:true,
                    user
                })

            })
        }
    })
}
function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}
exports.loandciinvestor=(req,res,next)=>{
    User.findByIdAndUpdate({_id:req.params.id},{loandets:req.body},(err,user)=>{
        if(err){

            res.send(err)
        }
        else{
            if(user.activeplan){
                if(user.activeplan===true){
                    user.LoanRequest=true
                    user.save()
                    .then(response=>{
                        res.status(201).json({
                            message:"added",
                            status:true,
                            user,
                            response
                        })
        
                    })
                }
            }
            else{
                res.status(200).json({
                    message:"an error occured make sure you are a investor ",
                    status:false
                })
            }
        }
    })
}
exports.loanactivate=(req,res,next)=>{
    User.findById({_id:req.params.id},(err,user)=>{
        if(err){
            res.send(err)
        }
        else{
            
            const dateOfLoan =new Date().toISOString().slice(0,10)
            const Interval=parseInt(user.loandets.Interval) 
            const d=new Date()
            const year=d.getFullYear()
            const month=d.getMonth()
            const day=d.getDate()
            var newDate = addMonths(new Date(year,month,day),Interval).toString()      
            const dateOfMaturity=newDate
            const LoanDateData={
                dateOfMaturity,dateOfLoan,newDate
            }
            const amountgiven=user.loandets.Lamount
            const percent=user.loandets.Percentage
            const par =(parseInt(percent)/100)*parseInt(amountgiven)
            const amountToRepay =par+parseInt(amountgiven)

            user.LoanActive=true
            user.LoanRequest=false
            user.amountToRepay=amountToRepay
            user.amountToRepayBalance=amountToRepay
            user.LoanDateData=LoanDateData

            user.save().then(response=>{
                res.json({
                    message:"activated",
                    status:true,
                })
            })
        }
    })
}

exports.paynowloan=(req,res,next)=>{
    User.findById({_id:req.params.id},(err,user)=>{
        if(err){
            res.send(err)
        }
        else{
            user.repayLoanRequest=true
            user.repayLoanRequestDets=req.body
            user.save().then(response=>{
                res.json({
                    status:true,
                })
            })
        }
    })
}

