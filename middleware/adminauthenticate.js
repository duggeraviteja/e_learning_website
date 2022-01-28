const jwt = require("jsonwebtoken");
const adminUser = require("../db/adminUsersSchema");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const { JWT_SECRET} = require("../config/prod")



module.exports  = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
      return res.status(401).json({errorMessage : "You must log in"});
    }
    const  token = authorization.replace("adminauth","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
      if(err){
        return res.status(401).json({errorMessage :"you must be logged in"});
      }
      const { _id } =  payload;
      adminUser.findById(_id).then(userdata=>{
        details = userdata;
      }) 
      next();
    })
  }
  