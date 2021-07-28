const mongoose = require("mongoose")

const meterSchema = mongoose.Schema({
    passcode:{
        type:Number
    },
    amount:{
        type:Number
    },
    unit:{
        type:Number
    },
    meterUnit:{
        type:Number
    },
    threshold:{
        type:Number
    },

})

mongoose.model("METER",meterSchema)