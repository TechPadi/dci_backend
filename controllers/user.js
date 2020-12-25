const bcrypt = require('bcrypt')
const User = require('../models/user/User')
const nodeMailer = require('nodemailer')
const securePin = require("secure-pin");
const jwt=require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const {SEND_GRID_API_KEY} =require("../config")

const {SECRET_KEY} =require("../config");
const { response } = require('express');
// console.log(SECRET_KEY) 
exports.alluser=(req,res,next)=>{
  User.find({},(err,user)=>{
    res.send(user)
  })
}
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
          messageofknow:req.body.messageofknow
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!',
              user
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    );
  };

exports.updatePersonalDetails = (req, res, next) => {
  const {fullname,phonenumber,occupation,gender} = req.body

  User.findByIdAndUpdate(req.params.id,{fullname,phonenumber,occupation,gender}, (err, user)=>{
    if (err) return next(err);
    res.status(200).send({
        user,
        message: "Update Successful"
    });
    })
};

exports.verify=(req,res,next)=>{
  let accesscode =securePin.generatePinSync(4);
  sgMail.setApiKey(SEND_GRID_API_KEY)
  const msg = {
    to: req.body.email,
    from: 'emmanueltech2019@gmail.com', // Use the email address or domain you verified above
    subject: 'Dci verification',
    text: 'verificetion code',
    html: `<h1>Your DCi verification code </h1>:<h2>${accesscode}</h2><br/>`,
  };
  (async () => {
    try {
      await sgMail.send(msg)
      .then(response=>{
        User.findOne({email:req.body.email})
        .then(user=>{
          user.accesscode=accesscode
          user.save()
          res.send(response)
        })
      })
    } catch (error) {
      console.error(error);
   
      if (error.response) {
        console.error(error.response.body)
        res.json({
          message:"error occured",
          message1:error.response.body,
          error:error
        })
      }
    }
  })();


}
exports.getverified=(req,res,next)=>{
  const {email,accesscode} = req.body
  User.findOne({email},(err,user)=>{
    if(err) console.log(err)
    if(user.accesscode){
      if(user.accesscode===accesscode){
        user.verified=true
        user.emailverified=true
        user.save()
        .then(response=>{
          res.json({
            status:true,
            message:"Verification successful",
            user
          })
        })
        .catch(err=>{
          res.send({
            message:"Incorrect verification code"
          })
        })
      }
      else{
        res.json({
          message:"Incorrect verification code"
        })
      }
    }
    else{
      res.json({
        status:false,
        message:"An Error Occured",
        success:false
      })
    }
    
  })
}

exports.login=(req,res,next)=>{
  const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err){
            return res.status(500)
            .json({
                message:"login error",
                status:false
            })
        }
        if(!user){
            return res.status(404)
            .json({
                message:"user does not exist",
                status:false
            })
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(403).json({
                 message: 'login invalid',
                 status:false,
             });
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, {expiresIn: "86400s"});


        res.status(200).json({
        user,
        message: 'Authenticated',
        token,
        });
        
    })
}
exports.dashboarduser=(req,res,next)=>{
  User.findOne({ _id: req.params.id })
  .then(user=>{
      jwt.verify(req.token,SECRET_KEY,(err,authData)=>{
          if (err) {
              res.sendStatus(403);
          } else {
              res.json({
                  message: 'successfully access protected route',
                  authData,
                  user,
              });
          }
      })
  })
  .catch(err=>{
      res.send(err)
  })
}
exports.updateDetails1=(req,res,next)=>{
    const {MaritalStatus,DateOfBirth,ResidentialAddress,NearestBusStop,CityTown,State,Nationality} =req.body;
    User.findByIdAndUpdate({_id:req.params.id},{MaritalStatus,DateOfBirth,ResidentialAddress,NearestBusStop,CityTown,State,Nationality},(err,user)=>{
      if(err) throw next(err)
      res.json({
        message:"updated successfull",
        user,
        status:true
      })
    })

}
exports.updateDetails2=(req,res,next)=>{
    const {referralsId,referralsName,identificationMeans,identificationNo,nameOfOrgnisation,lga,stateOfOrigin,idimage} =req.body;
    User.findByIdAndUpdate({_id:req.params.id},{referralsId,referralsName,identificationMeans,identificationNo,nameOfOrgnisation,lga,stateOfOrigin,idimage},(err,user)=>{
      if(err) throw next(err)
      res.json({
        message:"updated successfull",
        user,
        status:true
      })
    })

}
exports.uploadimage=(req,res,next)=>{
    User.findByIdAndUpdate({_id:req.params.id},{image: req.file,upToDate:true},(err,user)=>{
      if(err) throw next(err)
      res.json({
        message:"updated successfull",
        user,
        file:req.file,
        status:true
      })
    })
}



exports.updateEmail=(req,res,next)=>{
    User.findById({_id:req.params.id},(err,user)=>{
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(403).json({
                 message: 'incorrect password',
                 status:false,
             });
        }
        else{
          user.email=req.body.email
          user.save()
          .then(response=>{
            res.json({
              status:true,
              message:"email changed",
              response,user,
            })
          })
        }
    })
}
exports.deleteaccount=(req,res,next)=>{
  User.findOneAndDelete(req.params.id, err => {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
}