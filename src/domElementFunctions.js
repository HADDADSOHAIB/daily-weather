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
        <input type="text" class="form-control" id="state" name="state" required>
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
export { chooseCityCard, message };
