// const {CLOUD_KEY,CLOUD_NAME,CLOUD_SECRET } =  require("../config/keys");

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_KEY,
    api_secret : process.env.CLOUD_SECRET
})


module.exports = { cloudinary};
