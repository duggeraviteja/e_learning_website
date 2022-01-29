require('dotenv').config();
const express = require("express");
const app = express();
const session = require('express-session');
const cookieParser = require("cookie-parser");
var cors = require('cors');
const multer = require('multer');

const crypto = require('crypto');
const {
  cloudinary
} = require('./db/cloudnary')

const fs = require('fs');
const path = require('path');

const Books = require("./db/booksSchema");






const authenticate = require("./middleware/authenticate");
// const adminauthenticate = require("../middleware/adminauthenticate");

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

require("./db/conn");




const User = require("./db/userSchema");


var storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.filename === "bookImage") {
      cb(null, 'images');
    } else {
      cb(null, 'uploads');
    }

  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


let upload = multer({
  storage: storage
});








app.put("/profileimage", authenticate, upload.single('userimage'), async (req, res) => {



  try {


    const image = req.file;

    if (image.mimetype !== 'image/png' && image.mimetype !== 'image/jpg' && image.mimetype !== 'image/jpeg') {
      return res.json({
        errorMessage: " Failed to update. Only png/jpg/jpeg/svg type files "
      });
    }


    if (image.size > 2097152) // 2 MiB for bytes.
    {
      return res.json({
        errorMessage: " File must be Less then 2MB"
      });
    }

    const profileImage = await cloudinary.uploader.upload(req.file.path, {
      folder: 'ProfileImages',
      use_filename: true
    })

    await User.findByIdAndUpdate({
        _id: req.details._id
      }, {

        userImage: profileImage.secure_url

      }, {
        new: true
      })
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({
            errorMessage: err
          })
        }
        return res.json(result);
      })

  } catch (err) {
    return res.status(422).json({
      errorMessage: err
    })
  }


})

app.post("/img", upload.single("img"), async (req, res) => {



  const profile = await cloudinary.uploader.upload(first, {
    folder: 'books',
    use_filename: true
  })

  const r = await cloudinary.uploader.upload(req.file.path)
  // console.log(req.file.path);
  // console.log(r.secure_url);
  res.send(r.secure_url);

})




app.post("/uploadbooks", async function (req, res) {


  upload.fields([{
    name: 'book'
  }, {
    name: 'bookImage'
  }])(req, res, error => async () => {
    if (error) {
      return res.status(500).json({
        errorMessage: `upload error: ${error}`
      });
    }
    let files = req.files
    // console.log(files.length);

    // let first = files.book[0].path;
    // let second = files.bookImage[0].path;


    console.log(files.book[0].path);
    console.log(files.bookImage[0].path);




    if (!req.body.title && !req.body.author) {
      return res.status(402).json({
        errorMessage: " Please fill all the deatils..."
      });
    }


    const bookurl = await cloudinary.uploader.upload(files.book[0].path, {
      folder: 'books',
      use_filename: true
    })


    const bookimgurl = await cloudinary.uploader.upload(files.bookImage[0].path, {
      folder: 'bookImages',
      use_filename: true
    })





    const newBook = new Books({
      title: req.body.title,
      author: req.body.author,
      book: bookurl.secure_url,
      bookImage: bookimgurl.secure_url,
      upload: Date.now
    });





    await newBook.save().then(result => {
      if (result) {
        return res.status(200).json({
          message: " uploaded Sucessfully "
        });
      } else {
        return res.status(401).json({
          errorMessage: " Failed to upload the books"
        });
      }
    })







  })
})






  








app.use(require('./router/auth'));



if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}



app.listen(process.env.PORT || 3001, function () {
  console.log("Server started on port ", process.env.PORT);

});