import '../scss/main.scss';
import * as bootstrap from 'bootstrap';

const https = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const authorization = 'CWB-A1EDD3E2-7930-40B2-A1C0-E780BA36DBE4';

async function fetchWeatherForecast() {
  let elements = ['Wx', 'PoP', 'MinT', 'MaxT'];
  const url = `${https}/F-C0032-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}`;
  let data = await fetchURL(url);
  return data;
}

async function fetchWeatherObservation() {
  let elements = ['TEMP', 'TIME', 'Weather'];
  const url = `${https}/O-A0003-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}&parameterName=CITY,TOWN`;
  let data = await fetchURL(url);
  return data;
}

const fetchURL = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

function handleClick(e) {
  let el = e.target;
  if (el.classList.value.split(' ').includes('dropdown-toggle')) return;
  display(el.dataset.name);
}

async function display(city) {
  let toggle = document.querySelector('.dropdown-toggle');
  let title = document.querySelector('.title');
  let [currentTown, currentStation, currentTemp, currentWeather] = ['town', 'station', 'temp', 'weather'].map(
    (elem) => {
      return document.querySelector(`.current__${elem}`);
    },
  );
  let observeData = await fetchWeatherObservation();
  let locationData = observeData.records.location
    .filter((data) => data.parameter[0].parameterValue === city)
    .filter((data) => data.weatherElement[0].elementValue !== '-99');

  console.log(locationData);

  toggle.innerHTML = city;
  title.innerHTML = `${city}現在氣溫及天氣預報`;
  currentTown.innerHTML = locationData[0].parameter.reduce((name, cur) => {
    return (name += cur.parameterValue);
  }, '');
  currentStation.innerHTML = `站別: ${locationData[0].locationName}`;
  currentTemp.innerHTML = `${locationData[0].weatherElement[0].elementValue} °C`;
  currentWeather.innerHTML = locationData[0].weatherElement[1].elementValue;
}

const btn = document.querySelector('.btn-group');
btn.addEventListener('click', (e) => handleClick(e));
