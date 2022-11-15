import { fetchURL } from './fetchURL';

const https = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const authorization = 'CWB-A1EDD3E2-7930-40B2-A1C0-E780BA36DBE4';

export const fetchWeatherForecast = async (city) => {
  let elements = ['Wx', 'PoP', 'MinT', 'MaxT'];
  const url = `${https}/F-C0032-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}`;
  let data = await fetchURL(url);
  return data.records.location.filter((data) => data.locationName === city);
};
