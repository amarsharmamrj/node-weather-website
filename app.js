const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

// paths
const publicDirectoryPath = path.join(__dirname, 'public/');
const partialsPath = path.join(__dirname, '/partials');

app.use(express.static(publicDirectoryPath));

// setup handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Weather', name: 'amar' });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'amar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'amar'
    });
});

app.get('/demo', (req, res) => {
    res.send({
        name: 'Andrew',
        age: 22
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send("Please provide the address in the url");
    }

    // object is passed in below callback function is destructured
    // if we pass as address=! the sever will crash becauser we have not passed the success message in ....
    // .....callback, so we will set default value for callback destructuring
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }

            // console.log(location);
            // console.log(forecastData);

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });

    // res.send({
    //     location: 'gorakhpur',
    //     forecast: 'Clear weather',
    //     address: req.query.address
    // })
});

// query string
app.get('/products', (req, res) => {
    console.log(req.query);
})

// this will work for all the routes within help path
app.get('/help/*', (req, res) => {
    res.send("This is the 404 page!");
});

// error 404 page
// this page route will always be place at bottom of all the generic routes
// first app will look for the file or route is public folder, then look for the genric routes then if none is found then it look for this wildcard route
app.get('*', (req, res) => {
    res.render('404');
});


// app.get('/weather', (req, res) => {
//     res.send([{
//             color1: 'blue',
//             color2: 'orange'
//         },
//         {
//             fruit1: 'apple',
//             fruit2: 'orange'
//         }
//     ]);
// });

app.listen(port, () => {
    console.log("App is running on the port:" + port);
});