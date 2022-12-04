import '../scss/main.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import { locationHandler, routeHandler } from './router';
import fetchWeatherObservation from './fetchObservation';
import display from './display';

let currentNumber = 1;

window.addEventListener('hashchange', locationHandler);
locationHandler();

const menuButton = document.querySelector('.menu-btn');
menuButton.addEventListener('click', (e) => {
  e.preventDefault();
  routeHandler(e);
});

const handleClick = async (e) => {
  e.preventDefault();
  const observeData = await fetchWeatherObservation();
  const locationNumber = observeData.length;
  display(currentNumber);
  currentNumber += 1;

  if (currentNumber >= locationNumber) {
    currentNumber = 0;
  }
};

const nextStationButton = document.querySelector('.arrow-btn');
nextStationButton.addEventListener('click', (e) => handleClick(e));
