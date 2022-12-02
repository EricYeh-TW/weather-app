import fetchWeatherForecast from './fetchForecast';
import fetchWeatherObservation from './fetchObservation';

function setInnerHtml(content) {
  this.innerHTML = content;
  return this;
}

// function observeIcon(content) {
//   const icon = ['☀', '⛅', '☁', '🌧', '⛈'];
//   const weather = ['晴', '雲', '陰', '雨', '雷'];
//   weather.map((item, index) => {
//     if (content.match(item) !== null) {
//       return icon[index];
//     }
//     return icon[0];
//   });
// }

const display = async (city = '臺北市') => {
  const observeData = await fetchWeatherObservation(city);
  const forecastData = await fetchWeatherForecast(city);
  console.log(observeData);
  console.log(forecastData);
  // time
  const today = new Date();
  const config = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  };
  const time = new Intl.DateTimeFormat('default', config).format(today);

  // current
  const currentSections = document.querySelectorAll('.current__item');
  const currentContent = {
    0: `
      <h1 class="current__city fw-normal">
        ${observeData[0].parameter[0].parameterValue + observeData[0].parameter[1].parameterValue}
      </h1>
      <p class="current__location">站別: ${observeData[0].locationName}</p>
      <p class="current__time">${time}</p>
    `,
    1: `
      <h1 class="current__temp fw-bold">${observeData[0].weatherElement[0].elementValue}°</h1>
      <p class="current__desc">${observeData[0].weatherElement[1].elementValue}</p>
    `,
  };
  currentSections.forEach((section, i) => setInnerHtml.call(section, currentContent[i]));

  // forecast
  const forecastSections = document.querySelectorAll('.forecast__item');
  forecastSections.forEach((section, index) => {
    const day = new Intl.DateTimeFormat('default', config).format(new Date().setDate(today.getDate() + index));
    const min = forecastData[0].weatherElement[2].time[index].parameter.parameterName;
    const max = forecastData[0].weatherElement[3].time[index].parameter.parameterName;
    const temp = (Number(min) + Number(max)) / 2;

    const forecastContent = `
      <h3 class="forecast__time">${day}</h3>
      <div class="forecast__content forecast__weather">
        <i>☀<span>天氣現象:</span></i>
        <p>${forecastData[0].weatherElement[0].time[index].parameter.parameterName}</p>
      </div>
      <div class="forecast__content forecast__droplet">
        <i>💧<span>降雨機率:</span></i>
        <p>${forecastData[0].weatherElement[1].time[index].parameter.parameterName}</p>
      </div>
      <div class="forecast__content forecast__temp">
        <i>🌡<span>平均溫度:</span></i>
        <p>${temp}°</p>
      </div>
    `;
    setInnerHtml.call(section, forecastContent);
  });
};

export default display;
