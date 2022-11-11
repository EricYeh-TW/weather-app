import '../scss/main.scss';
import * as bootstrap from 'bootstrap';

const https = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const authorization = 'CWB-A1EDD3E2-7930-40B2-A1C0-E780BA36DBE4';

async function fetchWeatherForecast() {
  let elements = ['Wx', 'PoP', 'MinT', 'MaxT'];
  const url = `${https}/F-C0032-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}`;
  let data = await fetchURL(url);
  let forecastData = data.records.location;
}

async function fetchWeatherObservation() {
  let elements = ['TEMP', 'Weather'];
  const url = `${https}/O-A0003-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}&parameterName=CITY`;
  let data = await fetchURL(url);
  let observeData = data.records.location;
}

const fetchURL = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

fetchWeatherForecast();
