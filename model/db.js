const mongoose = require("mongoose")
const uri = "mongodb+srv://Clement:Cle*1995@cluster0-my6sq.mongodb.net/Meter?retryWrites=true&w=majority"
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
require('./stucture')