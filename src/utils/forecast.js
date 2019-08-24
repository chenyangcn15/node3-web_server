const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/2842259294e694c9b89ca3e6486d1aeb/'+ encodeURIComponent(lat) +',' +encodeURIComponent(lon) + '?units=si&lang=zh'
    //console.log(url)
    request({url, json: true}, (error, {body}) => {
        if(error)
        {
            callback('Cant connect to the server', undefined)
        }
        else if(body.error)
        {
            callback('cant find the location', undefined)
        }
        else{
            callback(undefined, 'Summary: '  + body.daily.data[0].summary + 
                                'The current temperature is: ' + body.currently.temperature +
                                '. The chance of raining is: ' + body.currently.precipProbability + 
                                'The highest Temperature is: ' + body.daily.data[0].temperatureHigh +
                                'The lowest Temperature is: ' + body.daily.data[0].temperatureLow)
            }
    })
}

module.exports = forecast