console.log("This is the client side js");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const summary = document.querySelector('#summary span');
const temperature = document.querySelector('#temperature span');
const dewPoint = document.querySelector('#dewPoint span');
const humidity = document.querySelector('#humidity span');
const pressure = document.querySelector('#pressure span');
const windSpeed = document.querySelector('#windSpeed span');
const visibility = document.querySelector('#visibility span');
const precPercentage = document.querySelector('#precPercentage span');

document.querySelector('#summary').style.display = 'none';
document.querySelector('#temperature').style.display = 'none';
document.querySelector('#dewPoint').style.display = 'none';
document.querySelector('#humidity').style.display = 'none';
document.querySelector('#pressure').style.display = 'none';
document.querySelector('#windSpeed').style.display = 'none';
document.querySelector('#visibility').style.display = 'none';
document.querySelector('#precPercentage').style.display = 'none';


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log('testing');

    messageOne.textContent = 'Loading..';
    summary.textContent = '';
    temperature.textContent = '';
    dewPoint.textContent = '';
    humidity.textContent = '';
    pressure.textContent = '';
    windSpeed.textContent = '';
    visibility.textContent = '';
    precPercentage.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                document.querySelector('#summary').style.display = 'inline-block';
                document.querySelector('#temperature').style.display = 'inline-block';
                document.querySelector('#dewPoint').style.display = 'inline-block';
                document.querySelector('#humidity').style.display = 'inline-block';
                document.querySelector('#pressure').style.display = 'inline-block';
                document.querySelector('#windSpeed').style.display = 'inline-block';
                document.querySelector('#visibility').style.display = 'inline-block';
                document.querySelector('#precPercentage').style.display = 'inline-block';

                console.log(data.forecast)
                messageOne.textContent = data.location;
                summary.textContent = data.forecast.summary;
                temperature.textContent = data.forecast.temperature;
                dewPoint.textContent = data.forecast.dewPoint;
                humidity.textContent = data.forecast.humidity;
                pressure.textContent = data.forecast.pressure;
                windSpeed.textContent = data.forecast.windSpeed;
                visibility.textContent = data.forecast.visibility;
                precPercentage.textContent = data.forecast.precPercentage;
            }
        });
    });



});