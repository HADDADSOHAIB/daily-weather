const optionCountries = (countries) => `
<datalist id="countries">
  ${countries.map((country) => `<option value="${country.code}">${country.name}, ${country.flag}</option>`).join('')}
</datalist>
`;

const chooseCityCard = (countries) => `
<div class="card m-4" id="choose-city">
  <div class="card-header d-flex justify-content-center">
    <h6 class="mb-0 font-weight-bold">Choose The City</h6>
  </div>
  <div class="card-body">
    <form>
      <div class="form-group">
        <label for="country">Choose a country:</label>
        <input list="countries" type="text" class="form-control" id="country" name="country" required>
        <small class="form-text text-muted">You must select from the dropdown</small>
      </div>
      <div class="form-group">
        <label for="state">State:</label>
        <input type="text" class="form-control" id="state" name="state">
        <small class="form-text text-muted">Leave this field empty if you don't live in a state</small>
      </div>
      <div class="form-group">
        <label for="city">City:</label>
        <input type="text" class="form-control" id="city" name="city" required>
      </div>
      <button type="submit" class="btn btn-primary" id="submit">Show</button>
      ${optionCountries(countries)}
    </form>
  </div>
</div>
`;

const message = (msg) => `
<div class="alert alert-danger alert-dismissible fade show m-2" role="alert">
  ${msg}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
`;

const weatherCard = ({ city, weatherDesc, temp, pressure, humidity, visibility, wind, cloud }) => `
<div class="card m-4" id="weather">
  <div class="card-header d-flex justify-content-center">
    <h6 class="mb-0 font-weight-bold">The Weather</h6>
  </div>
  <div class="card-body">
    <div class="d-flex justify-content-around">
      <p>${city}: </p><p>${weatherDesc.main}, ${weatherDesc.description}</p>
    </div>
    <div class="d-flex justify-content-around">
      <div>
        <span class="badge badge-danger m-1">Temperature: ${Math.round(parseInt(temp - 273.15, 10))} °C</span>
      </div>
      <div>
        <span class="badge badge-dark m-1">Pressure: ${pressure} hPa</span>
      </div>
      <div>
        <span class="badge badge-info m-1">Humidity: ${humidity} %</span>
      </div>
    </div>
    <div class="d-flex justify-content-around">
      <div>
        <span class="badge badge-success m-1">Visibility: ${visibility}</span>
      </div>
      <div>
        <span class="badge badge-light m-1">Cloudiness: ${cloud} %</span>
      </div>
      <div>
        <span class="badge badge-warning m-1">Wind: ${wind.speed} m/s</span>
      </div>
    </div>
  </div>
</div>
`;
export { chooseCityCard, message, weatherCard };
