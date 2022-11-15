import { fetchWeatherForecast } from './fetchForecast';
import { fetchWeatherObservation } from './fetchObservation';

export const display = async (city = '臺北市') => {
  let toggle = document.querySelector('.dropdown-toggle');
  let title = document.querySelector('.title > span');
  let current = document.querySelector('article');
  let [firstDay, secondDay, thirdDay] = ['first', 'second', 'third'].map((elem) => {
    return document.querySelector(`.${elem}__day`);
  });
  let observeData = await fetchWeatherObservation(city);
  let forecastData = await fetchWeatherForecast(city);
  let today = new Date();
  let style = 'm-0 p-0 fw-bold';

  // title
  [toggle, title].map((elem) => (elem.innerHTML = city));

  // observe
  // prettier-ignore
  current.innerHTML = `
    <h2 class="${style} text-primary">${observeData[0].parameter.reduce((name, cur) => name += cur.parameterValue, "")}</h2>
    <small class="${style} text-dark">站別: ${observeData[0].locationName}</small>
    <h1 class="${style} temp text-primary">${observeData[0].weatherElement[0].elementValue}</h1>
    <p class="${style} fs-4 text-dark">${observeData[0].weatherElement[1].elementValue}</p>
  `;

  // forecast
  [firstDay, secondDay, thirdDay].map((elem, i) => {
    let weather = forecastData[0].weatherElement;
    let minTemp = Number(weather[2].time[i].parameter.parameterName);
    let maxTemp = Number(weather[3].time[i].parameter.parameterName);

    elem.innerHTML = `
      <th scope="row">${today.getMonth() + 1} / ${today.getDate() + i}</th>
      <td>${weather[0].time[i].parameter.parameterName}</td>
      <td class="percent">${weather[1].time[i].parameter.parameterName}</td>
      <td class="temp">${((minTemp + maxTemp) / 2).toFixed(1)}</td>
    `;
  });
};
