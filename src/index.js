/* eslint-disable prefer-arrow-callback */
import $ from 'jquery';
import data from 'country-data';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { chooseCityCard, message, weatherCard } from './domElementFunctions';
import './style.css';

const allContries = data.countries.all.map((e) => ({
  code: e.alpha2,
  name: e.name,
  flag: e.emoji,
}));

document.querySelector('.content').insertAdjacentHTML('afterbegin', chooseCityCard(allContries));
document.querySelector('#choose-city #submit').addEventListener('click', function (e) {
  e.preventDefault();
  const validForm = document.querySelector('#choose-city form').checkValidity();
  const country = document.querySelector('#country');
  const state = document.querySelector('#state');
  const city = document.querySelector('#city');
  const validCountry = allContries.find((el) => el.code === country.value);
  if (validCountry && validForm) {
    let searchString = `${city.value.trim()},`;
    if (state.value.trim() !== '') {
      searchString += `${state.value.trim()},`
    }
    searchString += `${country.value.trim()}`;

    const apiKey = '5d11c0834bf383929d17b0a9c78b7214';
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${apiKey}`).then((res) => {

      state.value = '';
      country.value = '';
      city.value = '';
      console.log(res);
      const weather = res.data;
      console.log(weather);
      document.querySelector('.content').insertAdjacentHTML('afterbegin', weatherCard({
        city: weather.name,
        weatherDesc: weather.weather[0],
        temp: weather.main.temp,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        visibility: weather.visibility,
        wind: weather.wind,
        cloud: weather.clouds.all,
      }));
    }).catch((err) => {
      document.querySelector('.content').insertAdjacentHTML('afterbegin', message(err.response.data.message));
    });
  } else if (!validForm) {
    document.querySelector('.content').insertAdjacentHTML('afterbegin', message('All fields (except the state) are required'));
    $('.alert').alert();
  } else if (!validCountry) {
    document.querySelector('.content').insertAdjacentHTML('afterbegin', message('Choose a country from the dropdown'));
    $('.alert').alert();
  }
});
