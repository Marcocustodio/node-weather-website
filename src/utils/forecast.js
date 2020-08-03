const request = require('request')

const forecast = (longitude,latitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=f70f1676aae42502e8bc060c99f5e8a1&query=" + longitude+ "," + latitude
    request({url, json:true}, (error , {body}) =>{
        if (error){
            callback('Unable to connect to the weather services', undefined)
        }else if (body.error){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined ,{
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            })
        }
    })
}

module.exports = forecast