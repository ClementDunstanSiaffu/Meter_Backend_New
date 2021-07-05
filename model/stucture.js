const mongoose = require("mongoose")

const meterSchema = mongoose.Schema({
    passcode:{
        type:String
    },
    amount:{
        type:Number
    },
    unit:{
        type:Number
    },
    threshold:{
        type:Number
    },

})

mongoose.model("METER",meterSchema)