/* eslint-disable prefer-arrow-callback */
import $ from 'jquery';
import data from 'country-data';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { chooseCityCard, message } from './domElementFunctions';
import './style.css';

const allContries = data.countries.all.map((e) => ({
  code: e.alpha2,
  name: e.name,
  flag: e.emoji,
}));

document.querySelector('.content').insertAdjacentHTML('afterbegin', chooseCityCard(allContries));
document.querySelector('#choose-city #submit').addEventListener('click', async function (e) {
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
    state.value = '';
    country.value = '';
    city.value = '';

    const apiKey = '5d11c0834bf383929d17b0a9c78b7214';
    const weather = await axios.get(`api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${apiKey}`);

    console.log(weather);
  } else if (!validForm) {
    document.querySelector('.content').insertAdjacentHTML('afterbegin', message('All field are required'));
    $('.alert').alert();
  } else if (!validCountry) {
    document.querySelector('.content').insertAdjacentHTML('afterbegin', message('Choose a country from the dropdown'));
    $('.alert').alert();
  }
});
