const clearWeatherCard = () => {
  if (document.querySelector('#weather')) {
    document.querySelector('#weather').parentElement.removeChild(document.querySelector('#weather'));
  }
};

const clearChooseCard = () => {
  if (document.querySelector('#choose-city')) {
    document.querySelector('#choose-city').parentElement.removeChild(document.querySelector('#choose-city'));
  }
};

export { clearWeatherCard, clearChooseCard };
