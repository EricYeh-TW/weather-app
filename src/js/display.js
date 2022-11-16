import fetchWeatherForecast from './fetchForecast';
import fetchWeatherObservation from './fetchObservation';

function setInnerHtml(content) {
  this.innerHTML = content;
  return this;
}

const display = async (city = '臺北市') => {
  const toggle = document.querySelector('.dropdown-toggle');
  const title = document.querySelector('.title > span');
  const current = document.querySelector('article');
  // prettier-ignore
  const [firstDay, secondDay, thirdDay] = ['first', 'second', 'third'].map((elem) => document.querySelector(`.${elem}__day`));
  const observeData = await fetchWeatherObservation(city);
  const forecastData = await fetchWeatherForecast(city);
  const today = new Date();
  const style = 'm-0 p-0 fw-bold';

  // title
  [toggle, title].map((element) => setInnerHtml.call(element, city));

  // observe
  [current].map((element) => {
    const data = observeData[0];
    const h2 = data.parameter[0].parameterValue + data.parameter[1].parameterValue;
    const content = `
      <h2 class="${style} text-primary">${h2}</h2>
      <small class="${style} text-dark">站別: ${data.locationName}</small>
      <h1 class="${style} temp text-primary">${data.weatherElement[0].elementValue}</h1>
      <p class="${style} fs-4 text-dark">${data.weatherElement[1].elementValue}</p>
    `;
    return setInnerHtml.call(element, content);
  });

  // forecast
  [firstDay, secondDay, thirdDay].map((element, i) => {
    const weather = forecastData[0].weatherElement;
    const minTemp = Number(weather[2].time[i].parameter.parameterName);
    const maxTemp = Number(weather[3].time[i].parameter.parameterName);
    const content = `
      <th scope="row">${today.getMonth() + 1} / ${today.getDate() + i}</th>
      <td>${weather[0].time[i].parameter.parameterName}</td>
      <td class="percent">${weather[1].time[i].parameter.parameterName}</td>
      <td class="temp">${((minTemp + maxTemp) / 2).toFixed(1)}</td>
    `;

    return setInnerHtml.call(element, content);
  });
};

export default display;
