const errorText = document.querySelector('.error');
const louder = document.querySelector('.loader');
const weather = document.querySelector('.weather');
const form = document.querySelector('form');
const textInput = document.querySelector('form input');
const loc = document.querySelector('.location');
const country = document.querySelector('.country');
const city = document.querySelector('.city');
const localTime = document.querySelector('.local-time');
const temp = document.querySelector('.temp');
const weatherIcon = document.querySelector('.icon');
const condition = document.querySelector('.condition');
const feelsLike = document.querySelector('.feels-like');
const humadity = document.querySelector('.humadity');
const lastUpdated = document.querySelector('.last-updated');
let errorMessage = '';

const getWeather = async(cityName) => {
    try {
        louder.style.display = 'block';
        weather.style.display = 'none';
        errorText.style.display = 'none';

        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=e957e17266c3460b94d162206211405&q=${cityName}&aqi=no`);
        const data = await res.json();
        if (data.error) {
            errorMessage = data.error.message;
        }
        country.innerHTML = data.location.country;
        city.innerHTML = data.location.name;
        localTime.innerHTML = data.location.localtime;
        temp.innerHTML = data.current.temp_f + '˚F';
        weatherIcon.setAttribute('src', data.current.condition.icon);
        condition.innerHTML = data.current.condition.text;
        feelsLike.innerHTML = data.current.feelslike_f;
        humadity.innerHTML = data.current.humidity;
        lastUpdated.innerHTML = data.current.last_updated;
        weather.style.display = 'block';
        louder.style.display = 'none';
    } catch (error) {
        louder.style.display = 'none';
        weather.style.display = 'none';
        errorText.style.display = 'block';
        errorText.innerHTML = errorMessage;
        setTimeout(() => {
            errorText.style.display = 'none';
        }, 2000);
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather(textInput.value.trim());
    textInput.value = '';
})