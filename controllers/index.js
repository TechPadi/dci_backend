const Dci = require('../models/index')

exports.startapp =(req,res)=>{
    const {SavingsBalance,LoanBalance,investmentBalance} =req.body
    const generalData = new Dci({
        SavingsBalance,
        LoanBalance,
        investmentBalance
    })
    generalData.save((err,data)=>{
        if(err){
            res.send(err)
        }
        res.status(201).json({
            message:"Created",
            data
        })
    })
}
exports.appdata =(req,res)=>{
    Dci.find({})
    .then(response=>{
        res.status(200).json({
            message:"found ",
            response
        })
    })
    .catch(err=>{
        console.log(err)
    })
}