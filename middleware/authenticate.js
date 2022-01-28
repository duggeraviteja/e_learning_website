const jwt = require("jsonwebtoken");
const User = require("../db/userSchema");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const express = require("express");
const { JWT_SECRET}  = require("../config/prod");




module.exports  = (req,res,next)=>{
  const {authorization} = req.headers;
  if(!authorization){
    return res.status(401).json({errorMessage : "You must log in"});
  }
  const  token = authorization.replace("Bearer","");
  jwt.verify(token,JWT_SECRET,(err,payload)=>{
    if(err){
      return res.status(401).json({errorMessage :"you must be logged in"});
    }
    const { _id } =  payload;
    User.findById(_id).then(userdata=>{
       req.details = userdata;
       next();
    }) 
 
  })
}

