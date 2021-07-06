const {helper} = require('../helpers/')
const mongoose = require('mongoose')
const Meter = mongoose.model("METER")

let token = null
let AmountA = null
let AmountB = null

exports.get_tokens = async(req,res)=>{
    const passcode = req.params
    const meter = await Meter.findOne(passcode)
    if (meter !== null){
        res.json({unit:meter.unit})
    }else{
        res.json({unit:0})
    }
}

exports.get_amount = async (req,res)=>{
    const passcode = req.params
    if (passcode == 1 || passcode == 0){
        const thatMeter = await Meter.findOne(passcode)
        const amount = thatMeter.amount
        res.status(200).json(amount)
    }else{
        res.status(200).json(0)
    }
  

}

exports.get_unit = async (req,res)=>{
    const {passcode} = req.params
    if (parseInt(passcode) == 1 || parseInt(passcode) == 0){
        const thatMeter = await Meter.findOne({passcode:parseInt(passcode)})
        const unit = thatMeter.unit
        res.json({unit:unit})
    }else{
        res.json({unit:0})
    }
   
}

exports.post_unit = async(req,res)=>{
    const obj = req.params
    if (parseInt(obj.passcode) == 1 || parseInt(obj.passcode) == 0){
        const meter = await Meter.findOne({passcode:parseInt(obj.passcode)})
        const docs = await Meter.find((err,docs)=>{return docs})
        const index = docs.findIndex((docs)=>docs.passcode == parseInt(obj.passcode))
        meter.unit = parseInt(obj.unit)
        await Meter.replaceOne(docs[index],meter)
        res.json({"status":"SUCCESS"})
    }else{
        res.json({"status":"FAILED"})
    }
   
}

exports.post_amount = async(req,res)=>{
    const obj = req.params
    if(parseInt(obj.passcode) == 1 || parseInt(obj.passcode) == 0){
        const meter = await Meter.findOne({passcode:parseInt(obj.passcode)})
        const docs = await Meter.find((err,docs)=>{return docs})
        const index = docs.findIndex((docs)=>docs.passcode == parseInt(obj.passcode))
        meter.amount = parseInt(obj.amount)
        await Meter.replaceOne(docs[index],meter)
        res.json({"status":"SUCCESS"})
    }else{
        res.json({"status":"FAILED"})
    }
    
}

exports.calculating_unit = (req,res)=>{
    const obj = req.params
    let val = null
    if (parseInt(obj.passcode) == 1 || parseInt(obj.passcode) == 0){
        if(parseInt(obj.passcode) == 1){
            val = unit_setter( parseInt(obj.passcode),AmountA,obj.amount)
        }else if (parseInt(obj.passcode) == 0){
            val = unit_setter( parseInt(obj.passcode),AmountB,obj.amount)
        }
        if (val !== false || val !== null || typeof val !== "undefined"){
            if (val.tokens !== null){
                    token = val.tokens
                    val.tokens = null
            }else{
                token = "0"
            }
            res.json({"tokens":token})
            replace_docs(parseInt(obj.passcode),val)
            
        }else{
            res.json({"tokens":"insufficient balance"})
        }
    }else{
        res.json({"tokens":"unmatch password"})
    }
    
    
}
exports.set_threshold = async(req,res)=>{
    const obj = req.params
    if(parseInt(obj.passcode) == 1 || parseInt(obj.passcode) == 0){
        const meter = await Meter.findOne({passcode:parseInt(obj.passcode)})
        const docs = await Meter.find((err,docs)=>{return docs})
        const index = docs.findIndex((docs)=>docs.passcode == parseInt(obj.passcode))
        meter.threshold = obj.threshold
        await Meter.replaceOne(docs[index],meter)
        res.json({"status":"SUCCESS"})
    }else{
        res.send({"status":"SUCCESS"})
    }
   
}

exports.get_threshold = async(req,res)=>{
    const obj = req.params
    if(parseInt(obj.passcode) == 1 || parseInt(obj.passcode) == 0){
        const meter = await Meter.findOne({passcode:parseInt(obj.passcode)})
        const threshold = meter.threshold
        res.json({"tokens":`${threshold}`})
    }else{
        res.json({"tokens":"0"})
    }
   
}

function unit_setter(passcode,meterAmount,amount){
    if(meterAmount !== null){
        if (meterAmount >= amount){
            const unit = parseInt(amount/300)
            let str_unit
            if (unit >= 100 && unit <= 999){
                str_unit = `0${unit}`
            }else{
                if (unit >= 1000){
                    str_unit = `${unit}`
                }else{
                    if (unit >=10 && unit <= 99){
                        str_unit = `00${unit}`
                    }else{
                        str_unit = `000${unit}`
                    }
                   
                }
               
            }
            let data = null
            if (passcode == 1){
                meterAStatus = true
                AmountA -= amount
                const tokens = helper.arr_for_meterA()
                data = {
                        "tokens":tokens + " " + str_unit,
                        "unit":`${unit}`,
                        "status":"okay",
                        "amount":`${amount}`,
                        "passcode":`${1}`
                        }
            }else if (passcode == 0){
                meterBStatus = true
                AmountB -= amount
                const tokens = helper.arr_for_meterB()
                data = {
                    "tokens":tokens + " " + str_unit,
                    "unit":`${unit}`,
                    "status":"okay",
                    "amount":`${amount}`,
                    "passcode":0
                }
            }
            return data
    
        }else{
            return false
        }
    }
}

async function replace_docs (passcode,val){
    const meter = await Meter.findOne({passcode:passcode})
    const docs = await Meter.find((err,docs)=>{return docs})
    const index = docs.findIndex((docs)=>docs.passcode == passcode)
    if (index !== -1){
        meter.unit = parseInt(val.unit)
        meter.amount -= parseInt(val.amount)
        await Meter.replaceOne(docs[index],meter)
    }
}

function init(){
    Meter.find((err,docs)=>{
        AmountA = docs[0].amount;
        AmountB = docs[1].amount
    })
}

init()