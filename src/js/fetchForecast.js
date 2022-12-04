import fetchURL from './fetchURL';

const https = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const authorization = 'CWB-A1EDD3E2-7930-40B2-A1C0-E780BA36DBE4';

const fetchWeatherForecast = async (city = '臺北市') => {
  const elements = ['Wx', 'PoP', 'MinT', 'MaxT'];
  const url = `${https}/F-C0032-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}`;
  const result = await fetchURL(url);
  return result.records.location.filter((data) => data.locationName === city);
};

export default fetchWeatherForecast;
