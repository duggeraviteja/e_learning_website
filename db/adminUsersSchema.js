const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema ({

    name :{
       type: String, 
       trim: true,
       required: true,
      },
      id:String,
   
    email:{ 
        type: String,
        trim: true,
        required: true,
        index: { unique: true }
  },

    emailToken : String,

    isVerified : Boolean,

    mobile :{
    type: Number, 
   },
    password :{
        type: String,   
   },
  
  });
 
 
  

// userSchema.pre("save",async function(next){
//  if(this.isModified("password")){
//      this.password =await bcrypt.hash(this.password,12);
//      this.cpassword =await bcrypt.hash(this.password,12);
//  }
//  next();
// })



const adminUser = new mongoose.model("adminUser", adminSchema);

module.exports = adminUser;

