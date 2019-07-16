const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY3lhbmcxMTIiLCJhIjoiY2p3cTg3Mnd6MTUwbzQzbzhiZGpvbjVneiJ9.rlyupkoxGennvon7ae8CPg&limit=1'

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to server', undefined)
        }
        else if(response.body.features.length === 0)
        {
            callback('Unable to find a location', undefined)
        }
        else{
            callback(undefined, {lat: response.body.features[0].center[0],             
                                 lon: response.body.features[0].center[1],
                                 loc: response.body.features[0].place_name})
        }
    })
}



module.exports = geocode