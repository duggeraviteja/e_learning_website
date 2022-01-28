// Step 3 - this is the code for ./models.js

const mongoose = require('mongoose');
const {ObjectId } = mongoose.Schema.Types ;

const booksSchema = new mongoose.Schema({
    title: String,
    author: String,
    book : String,
    bookImage: String,
    
    likes:[ {
        type: ObjectId, ref : "User",
    }],
    comments :[{
        text : String,
        postedBy: {type :ObjectId ,ref:"User"},
        name: String,
        uploadedDate : {
            type: Date,
            default: Date.now()
        }
    }

    ],

    
    uploaded: {
        type: Date,
        default: Date.now()
    }

});

//Image is a model which has a schema imageSchema

Books = new mongoose.model('Books', booksSchema);


module.exports = Books;