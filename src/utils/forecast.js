const request = require('request')

const forecast = (latitude, longitude, callback) => {
     const url = `https://api.darksky.net/forecast/64a13a6aa3357cf01ac5c50318dd526a/${latitude},${longitude}`
     request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect weather services', undefined)
        } else if(body.error){
          callback('Unable to find location', undefined)
        } else {
          callback(undefined, `${body.daily.data[0].summary}it is currently ${body.currently.temperature} degree out there there is a ${body.currently.precipProbability}% chance of rain`)
        }
     })


}


module.exports = forecast