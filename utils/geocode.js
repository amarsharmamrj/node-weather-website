const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?types=poi&access_token=pk.eyJ1IjoiYW1hcnNoYXJtYW1yaiIsImEiOiJja205Zm90MTkwbmNvMm9waGZncXg5cmRuIn0.jAJOPD0AfivYwrkq-J0yVg&limit=1';

    request({ url: url, json: true }, (error, responce) => {
        if (error) {
            callback("Unable to connect to the location services !", undefined);
        } else if (responce.body.features.length === 0) {
            callback("Unable to find location. Try another search !", undefined);
        } else {
            callback(undefined, {
                latitude: responce.body.features[0].center[1],
                longitude: responce.body.features[0].center[0],
                location: responce.body.features[0].place_name
            });
        };
    });
};

module.exports = geocode;