// Add comment here
const request = require('request')

const geocode = (address, callback) => {    
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaXRwaGFuaG9hbmdkdWMiLCJhIjoiY2p6eHg1c3lhMG93NjNjcXBsa2ludjRrYSJ9.cmijTJ-wEH1E16zG3pZDCA`
    request({url: geocodeURL, json:true}, (error, {body}) => {

        debugger

        if (error) {
            callback("Unable connect to server!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to connect to location services!", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode