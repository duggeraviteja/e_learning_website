const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;
 // const { JWT_SECRET} = require("../config/keys")

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
    },
    id: String,
    gender: String,
    dob: { 
        type: Date 
    } ,
    fav_quote: {
        type : String
    },

    email: {
        type: String,
        trim: true,
        required: true,
        index: {
            unique: true
        }
    },
    userImage: String,

    emailToken: String,

    isVerified: Boolean,

    isPaid: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: Number,
    },
    password: {
        type: String,
    },

    cpassword: {
        type: String,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastLoggedIn: {
        type: Date,
        default: Date
    },
    resetToken: String,

    expireResetToken: Date,
    otp: String,
    expireOtp: Date,

});







userSchema.methods.generateAuthToken = async function () {

    try {
        let token = jwt.sign({
            _id: this._id
        },process.env.JWT_SECRET);
        console.log(token);
        this.tokens = this.tokens.concat({
            token: token
        });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}


const User = new mongoose.model("User", userSchema);

module.exports = User;