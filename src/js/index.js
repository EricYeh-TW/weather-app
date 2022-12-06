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

const fetchData = async (city = '臺北市') => {
  observeData = await fetchCurrentWeather(city);
  forecastData = await fetchForecastWeather(city);
  console.log(observeData);
  console.log(forecastData);
  renderCurrent(observeData);
  renderForecast(forecastData);
};

window.addEventListener('hashchange', () => locationHandler());
document.addEventListener('click', (e) => handleClick(e, observeData));

locationHandler();
fetchData();
