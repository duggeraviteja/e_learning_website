if(process.env.NODE_ENV === "production") {
    module.export = require("./dev")
} else {
    module.export = require("./prod")
  
}