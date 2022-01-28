const mongoose = require("mongoose");
const {DB } = require("../config/prod")





// mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});


 mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology : true,
}).then(() => {
    console.log("database connectd succesfully");
}).catch((err)=>{
    console.log("Database not connected")
})



//mongoose.set("useCreateIndex", true);
mongoose.set('useUnifiedTopology', true);

