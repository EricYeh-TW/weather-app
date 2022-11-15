import '../scss/main.scss';
import * as bootstrap from 'bootstrap';

const https = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const authorization = 'CWB-A1EDD3E2-7930-40B2-A1C0-E780BA36DBE4';
let cache = '臺北市';

const fetchWeatherForecast = async (city) => {
  let elements = ['Wx', 'PoP', 'MinT', 'MaxT'];
  const url = `${https}/F-C0032-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}`;
  let data = await fetchURL(url);
  return data.records.location.filter((data) => data.locationName === city);
};

const fetchWeatherObservation = async (city) => {
  let elements = ['TEMP', 'TIME', 'Weather'];
  const url = `${https}/O-A0003-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}&parameterName=CITY,TOWN`;
  let data = await fetchURL(url);
  return data.records.location
    .filter((data) => data.parameter[0].parameterValue === city)
    .filter((data) => data.weatherElement[0].elementValue !== '-99');
};

const fetchURL = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

function handleClick(e) {
  let el = e.target;
  if (el.classList.value.split(' ').includes('dropdown-toggle')) return;
  // prevent same result
  if (cache === el.dataset.name) return;
  cache = el.dataset.name;
  display(cache);
}

const display = async (city) => {
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

const btn = document.querySelector('.btn-group');
btn.addEventListener('click', handleClick);
display(cache);
