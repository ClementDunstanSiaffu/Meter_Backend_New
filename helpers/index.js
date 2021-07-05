
class Helpers{

    arr_for_meterA = ()=>{
        const tokens = [
            "1324 3310 2120",
            "4343 2132 3010",
            "2132 4334 0001"
        ]
        const n = Math.floor(Math.random()*3)
        return tokens[n]
    }

    arr_for_meterB = ()=>{
        const tokens = [
            "6575 8797 5555",
            "9787 8889 7566",
            "9876 5676 9997"
        ]
        const n = Math.floor(Math.random()*3)
        return tokens[n]
    }
}

const helper = new Helpers()
module.exports = {helper}