// eslint-disable-next-line
import { renderCurrent, renderForecast, renderDropDown, renderSelection } from './render';
import { routeHandler } from './router';
import fetchCurrentWeather from './fetchCurrent';
import fetchForecastWeather from './fetchForecast';

let currentIndex = 0;
let maxIndex = 0;
let updateCurrentData;
let updateForecastData;

const handleClick = async (e, data) => {
  e.preventDefault();
  const { target } = e;
  const list = target.classList.value.split(' ');

  if (list.includes('arrow-btn')) {
    if (updateCurrentData === undefined) updateCurrentData = data;
    maxIndex = updateCurrentData.length - 1;
    currentIndex += 1;
    if (currentIndex > maxIndex) currentIndex = 0;
    renderCurrent(updateCurrentData, currentIndex);
  }

  if (list.includes('menu-btn')) {
    routeHandler(e);
  }

  if (list.includes('dropdown-item')) {
    const toggleList = target.parentNode.parentNode.classList.value.split(' ');

    if (toggleList.includes('city')) {
      updateCurrentData = await fetchCurrentWeather(target.dataset.name);
      updateForecastData = await fetchForecastWeather(target.dataset.name);
      renderSelection('city', target.dataset.name);
      renderDropDown(updateCurrentData);
      renderSelection('location', '請選擇');
    }

    if (toggleList.includes('location')) {
      renderSelection('location', target.textContent);
      const locationList = target.parentNode.parentNode.querySelectorAll('li');
      locationList.forEach((_, i) => {
        if (locationList[i].innerText === target.textContent) {
          currentIndex = i;
        }
      });
    }

    if (toggleList.includes('background')) {
      renderSelection('background', target.textContent);
    }
  }

  if (list.includes('check-btn')) {
    routeHandler(e);
    renderCurrent(updateCurrentData, currentIndex);
    renderForecast(updateForecastData);
  }
};

export default handleClick;
