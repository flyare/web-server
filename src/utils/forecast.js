const request = require('request')              
const forecast = (latitude, longitude, callback) => {
    const URL = `https://api.darksky.net/forecast/ec082e9723c9dfe20f3be7307d6bebfa/${latitude},${longitude}`
    request({url: URL, json:true}, (error, { body }) => {
        if (error) {
            callback("Unable connect to Server.", undefined)
        } else if (body.error) {
            callback("Unable search the location.", undefined)        
        } else {
            callback(undefined, body.daily.summary)
        }
    })
}

module.exports = forecast