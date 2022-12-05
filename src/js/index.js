import '../scss/main.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import { locationHandler } from './router';
import handleClick from './handleClick';
import { renderCurrent, renderForecast } from './render';
import fetchForecastWeather from './fetchForecast';
import fetchCurrentWeather from './fetchCurrent';

let observeData;
let forecastData;

const fetchData = async () => {
  observeData = await fetchCurrentWeather();
  forecastData = await fetchForecastWeather();
  console.log(observeData);
  console.log(forecastData);
  renderCurrent(observeData);
  renderForecast(forecastData);
};

window.addEventListener('hashchange', () => locationHandler());
document.addEventListener('click', (e) => handleClick(e, observeData.length));

locationHandler();
fetchData();
