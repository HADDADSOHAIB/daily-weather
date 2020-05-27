/* eslint-disable func-names, import/no-unresolved, prefer-arrow-callback */
import $ from 'jquery';
import data from 'country-data';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { chooseCityCard, message, weatherCard } from './domElementFunctions';
import weatherService from './weatherService';
import './style.css';
import { clearWeatherCard, clearChooseCard } from './domManipulationFunctions';

const allContries = data.countries.all.map((e) => ({
  code: e.alpha2,
  name: e.name,
  flag: e.emoji,
}));

const insertChooseCard = () => {
  let units = 'metric';

  document.querySelector('.content').insertAdjacentHTML('afterbegin', chooseCityCard(allContries));
  document.querySelector('#degree').addEventListener('click', () => {
    units = 'metric';
  });
  document.querySelector('#fernheit').addEventListener('click', () => {
    units = 'imperial';
  });

  document.querySelector('#choose-city #submit').addEventListener('click', function (e) {
    e.preventDefault();
    const validForm = document.querySelector('#choose-city form').checkValidity();
    const country = document.querySelector('#country');
    const state = document.querySelector('#state');
    const city = document.querySelector('#city');
    const validCountry = allContries.find((el) => el.code === country.value);
    if (validCountry && validForm) {
      weatherService(city.value, state.value, country.value, units).then((res) => {
        clearChooseCard();
        document.querySelector('.content').insertAdjacentHTML('afterbegin', weatherCard(res));
        document.querySelector('#weather button').addEventListener('click', function () {
          clearWeatherCard();
          insertChooseCard();
        });
        state.value = '';
        country.value = '';
        city.value = '';
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
};


insertChooseCard();
