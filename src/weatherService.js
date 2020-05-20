import axios from 'axios';

const processResponse = (res) => ({
  city: res.data.name,
  weatherDesc: res.data.weather[0],
  temp: res.data.main.temp,
  pressure: res.data.main.pressure,
  humidity: res.data.main.humidity,
  visibility: (res.data.visibility ? res.data.visibility : 'Not available'),
  wind: res.data.wind,
  cloud: res.data.clouds.all,
  rain: (res.data.rain ? res.data.rain : undefined),
  snow: (res.data.snow ? res.data.snow : undefined),
});

const getWeather = (city, state, country) => {
  let searchString = `${city.trim().split(' ').join('+')},`;
  if (state.trim() !== '') {
    searchString += `${state ? state.trim().split(' ').join('+') : ''},`;
  }
  searchString += `${country.trim()}`;

  const apiKey = '5d11c0834bf383929d17b0a9c78b7214';
  return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${apiKey}`)
    .then((res) => processResponse(res));
};

export default getWeather;
