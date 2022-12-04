import fetchURL from './fetchURL';

const https = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const authorization = 'CWB-A1EDD3E2-7930-40B2-A1C0-E780BA36DBE4';

const fetchWeatherObservation = async (city = '臺北市') => {
  const elements = ['TEMP', 'TIME', 'Weather'];
  const url = `${https}/O-A0003-001?Authorization=${authorization}&format=JSON&elementName=${elements.join()}&parameterName=CITY,TOWN`;
  const result = await fetchURL(url);
  return result.records.location
    .filter((data) => data.parameter[0].parameterValue === city)
    .filter((data) => data.weatherElement[0].elementValue !== '-99');
};

export default fetchWeatherObservation;
