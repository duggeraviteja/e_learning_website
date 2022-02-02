const express = require("express");
const mongoose = require("mongoose");
const User = require("../db/userSchema");
const adminUser = require("../db/adminUsersSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const adminauthenticate = require("../middleware/adminauthenticate");
const cookieParser = require("cookie-parser");
const router = express.Router();
const multer = require('multer');
const Image = "../db/booksSchema";
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const Books = require("../db/booksSchema");
const {
  response
} = require("express");
const ObjectId = require('mongodb').ObjectId;

// const { SENDGRID_KEY,JWT_SECRET} = require("../config/keys")

// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const passport = require("passport");



const transport = nodemailer.createTransport(sendgrid({
  auth: {
    api_key: process.env.SENDGRID_KEY
  }
}));


router.get("/logout", (req, res) => {

  res.clearCookie("jwtoken", {
    path: "/"
  });

  res.status(200).send("logout");
  // res.redirect('/login');

});


router.get('/all-books', async (req, res) => {
  await Books.find({}, (err, element) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          errorMessage: " Eroor Occured"
        });
      } else {
        return res.json(element);
      }
    })
    .sort({
      uploaded: -1
    });
});

router.get('/books/:id', async (req, res) => {

  await Books.findById(req.params.id, (err, element) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        errorMessage: " Eroor Occured"
      });
    } else {
      return res.json(element);
    }
  })


});


router.get("/del", (req, res) => {
  Books.remove({});

  res.json("sucessfully deleted all documents ----");
})



router.get("/profile", authenticate, (req, res) => {
  return res.json(req.details);
});

router.put("/like", authenticate, async (req, res) => {

  const user = req.details;

  await Books.findByIdAndUpdate(req.body.likedId, {

    $push: {
      likes: user._id
    },
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        errorMessage: err
      })
    }
    return res.json(result);
  })

})


router.put("/unlike", authenticate, (req, res) => {
  const user = req.details;
  Books.findByIdAndUpdate(req.body.likedId, {
    $pull: {
      likes: user._id
    }
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({
        errorMessage: err
      })
    }
    return res.json(result);
  })

})



router.put("/comment", authenticate, (req, res) => {
  const user = req.details;



  const newComment = {
    text: req.body.value,
    postedBy: user._id,
    name: user.username,
    uploadedDate: Date.now()
  }
  Books.findByIdAndUpdate(req.body.likedId, {
      $push: {
        comments: newComment
      }
    }, {
      new: true
    })
    .populate("comments.postedBy ", "_id username")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({
          errorMessage: err
        })
      }
      return res.json(result);
    })

})



router.post("/forgot-password", function (req, res) {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('hex');

    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            errorMessage: "User does not exist  with email"
          });
        }
        user.resetToken = token;
        user.expireResetToken = Date.now() + 3600000
        user.save().then((result) => {
          transport.sendMail({
            to: user.email,
            from: "duggeraviteja@gmail.com",
            subject: "Reset your Password ",
            html: `<h2> Your requested for password reset.</h2> 
          <h3>click on the below link to Reset your password  </h3>
         <a href="http://localhost:3000/forgot-password/${token}"> reset password  </a> <br />,
         <h4> <b> Note: </b> this Link only valid for 24Hours. </h4> `

          });
          res.json({
            message: "Check your email.A password reset link sent your email"
          })
        })
      })
  })
})

router.post("/new-password", async (req, res) => {
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  if (!password || !cpassword || password !== cpassword) {
    return res.json({
      errorMessage: "Password mismached"
    })
  }

  const sentToken = req.body.token;

  await User.findOne({
      resetToken: sentToken
    })
    .then(async user => {

      if (!user) {
        return res.status(422).json({
          errorMessage: "Try again Session Expired "
        });
      }
      newpassword = bcrypt.hash(password, 12);
      conformpassword = bcrypt.hash(cpassword, 12);

      user.password = await newpassword;
      user.cpassword = await conformpassword;
      user.resetToken = undefined;
      user.expireResetToken = undefined;

      user.save()
        .then((savedUser) => {
          return res.json({
            message: ` ${savedUser.email} your password updated succesfully`
          })
        })
    }).catch(err => {
      console.log(error);
    })

});



router.get("/verify-email", async function (req, res, next) {
  try {
    const user = await User.findOne({
      emailToken: req.query.token
    });
    if (!user) {
      res.status(400).json({
        errorMessage: "invalid token or token may be expied."
      });
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();

    res.redirect("http://localhost:3000/");



  } catch (error) {
    console.log(error);
    res.json({
      errorMessage: " Error occured"
    });
  }
})


router.post("/register", async (req, res) => {
  try {

    let {
      username,
      email,
      mobile,
      password,
      cpassword
    } = req.body;

    // validation

    if (!email || !password || !cpassword || !mobile)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter all required fields."
        });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== cpassword)
      return res.status(400).json({
        errorMessage: "passpord mismatched",
      });

    // const existingUser = await User.findOne({ email:email });

    const existingUser = await User.findOne({
      email
    })
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = 12;
    password = await bcrypt.hash(password, salt);
    cpassword = await bcrypt.hash(cpassword, salt);

    // save a new user account to the db

    const emailToken = crypto.randomBytes(64).toString('hex');
    const optverification = Math.floor(100000 + Math.random() * 900000);

    const isVerified = false;

    const newUser = new User({
      username,
      email,
      mobile,
      password,
      cpassword,
      emailToken,
      isVerified
    });

    await newUser.save().then((result) => {
      if (result) {
        transport.sendMail({
          to: newUser.email,
          from: "duggeraviteja@gmail.com",
          subject: "Registration Sucessfully completed . verify Your email ",
          html: `<h1> Welcome we hope you are doing great.</h1> <h1> ${optverification} </h1>`
        })
        return res.json({
          message: "sucessfully registered."
        });
      } else {
        return res.json({
          errorMessage: "error"
        });
      }
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      errorMessage: "error"
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter all required fields."
        });

    const existingUser = await User.findOne({
      email
    });
    if (!existingUser)
      return res.status(401).json({
        errorMessage: "Wrong email or password."
      });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({
        errorMessage: "Wrong email or password."
      });

    // sign the token

    const token = jwt.sign({
      _id: existingUser._id
    }, process.env.JWT_SECRET)

    //res.send(existingUser);  
    return res.json({
      token,
      user: existingUser
    });

    // send the token in a HTTP-only cookie

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //   })
    //   .send();

  } catch (err) {
    // console.error(err);
    return res.status(500).json({
      errorMessage: "Connection Error"
    });
  }
});

router.post("/updateUser", authenticate, async (req, res) => {
  try {
    const user = req.details;

    let {
      username,
      mobile,
      gender,
      dob,
      fav_quote
    } = req.body;




    let email = user.email;
    const filter = {
      email
    };


    const update = {
      username: username,
      mobile: mobile,
      dob: dob,
      gender: gender,
      fav_quote: fav_quote
    };

    let doc = await User.findOneAndUpdate(filter, update, {
      new: true
    });


    return res.json({
      message: "Sucessfully updated Profile."
    });

  } catch (err) {
    return res.json({
      errorMessage: `Failed updated Profile.${err}`
    });
  }

})




router.post("/search", async (req, res) => {

  let pattern = new RegExp("^" + req.body.query);

  Books.find({
      title: pattern
    }).limit(5).sort({
      uploaded: -1
    })
    .then((records) => {

      return res.json(records);
    }).catch((error => {
      return res.json({
        errorMessage: "No Book Found with given Query.",
      });
    }))


  // Books.find({
  //   $text :{
  //     $search:q
  //     }
  //   },
  // {
  //    _id : 0,
  //   _v:0,
  // },function(err,data){
  //   console.log(data);

  //   res.send(data);
  // });




});





router.post("/admin-register", async (req, res) => {
  try {

    let {
      name,
      email,
      mobile,
      password
    } = req.body;

    // validation

    if (!email || !password || !name || !mobile)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter all required fields."
        });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });



    // const existingUser = await User.findOne({ email:email });

    const existingUser = await adminUser.findOne({
      email
    })
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    password = await bcrypt.hash(password, 12);

    // sava admin
    const newAdmin = new adminUser({
      name,
      email,
      mobile,
      password
    });

    await newAdmin.save().then((result) => {
      if (result) {
        return res.json({
          message: "sucessfully registered."
        });
      } else {
        return res.json({
          errorMessage: "error"
        });
      }
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      errorMessage: "error"
    });
  }
});




router.post("/admin-login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter all required fields."
        });

    const existingUser = await adminUser.findOne({
      email
    });
    if (!existingUser)
      return res.status(401).json({
        errorMessage: "Wrong email or password."
      });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({
        errorMessage: "Wrong email or password."
      });

    // sign the token

    const token = jwt.sign({
      _id: existingUser._id
    }, JWT_SECRET)
    // console.log(token);

    //res.send(existingUser);  
    return res.json({
      token,
      user: existingUser
    });

    // send the token in a HTTP-only cookie

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //   })
    // .send();
  } catch (err) {
    // console.error(err);
    return res.status(500).json({
      errorMessage: "Connection Error"
    });
  }
});



router.post("/loginwithgoogle", async (req, res) => {

  const user = req.body;
  const email = user.data.email;


  const existingUser = await User.findOne({
    email
  });

  if (existingUser) {

    const token = jwt.sign({
      _id: existingUser._id
    }, JWT_SECRET)

    //res.send(existingUser);  
    return res.json({
      token,
      user: existingUser
    });
  }




  const newUser = new User({
    username: user.data.name,
    email: user.data.email,
    userImage: user.data.imageUrl
  })

  await newUser.save().then((result) => {
    if (result) {
      transport.sendMail({
        to: newUser.email,
        from: "duggeraviteja@gmail.com",
        subject: "Registration Sucessfully completed  ",
        html: `<h1> Welcome we hope you are doing great. ThankYou for Registering with US</h1>`
      })
      return res.json({
        message: "sucessfully LoggdedIn"
      });
    } else {
      return res.json({
        errorMessage: "Failed to Login"
      });
    }
  })


})














module.exports = router;