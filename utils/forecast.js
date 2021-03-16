const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9c07a43ebe10de1b03d5f69a6a1e1ea5/' + latitude + ',' + longitude + '?units=si';

    // we can use as: request({ url, json: true }, (error, {body} ) => {  for the below code
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the location services !", undefined);
        } else if (response.body.error) {
            callback("Unable to find location !", undefined);
        } else {
            callback("", response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is ' + response.body.currently.precipProbability + ' % chances of precipitation.');
        }
    });
};

module.exports = forecast;