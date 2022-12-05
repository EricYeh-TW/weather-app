const today = new Date();
const config = {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
};
const time = new Intl.DateTimeFormat('default', config).format(today);

function setInnerHtml(content) {
  this.innerHTML = content;
  return this;
}

function renderCurrent(observeData) {
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
}

function renderForecast(forecastData) {
  const forecastSections = document.querySelectorAll('.forecast__item');
  forecastSections.forEach((section, i) => {
    const day = new Intl.DateTimeFormat('default', config).format(new Date().setDate(today.getDate() + i));
    const min = forecastData[0].weatherElement[2].time[i].parameter.parameterName;
    const max = forecastData[0].weatherElement[3].time[i].parameter.parameterName;
    const temp = (Number(min) + Number(max)) / 2;

    const forecastContent = `
      <h3 class="forecast__time">${day}</h3>
      <div class="forecast__content forecast__weather">
        <i>☀<span>天氣現象:</span></i>
        <p>${forecastData[0].weatherElement[0].time[i].parameter.parameterName}</p>
      </div>
      <div class="forecast__content forecast__droplet">
        <i>💧<span>降雨機率:</span></i>
        <p>${forecastData[0].weatherElement[1].time[i].parameter.parameterName}%</p>
      </div>
      <div class="forecast__content forecast__temp">
        <i>🌡<span>平均溫度:</span></i>
        <p>${temp}°</p>
      </div>
    `;
    setInnerHtml.call(section, forecastContent);
  });
}

function renderDropDown(locationNumber) {
  const dropDown = document.querySelector('.location');
  console.log(dropDown);
  let ul = '';
  for (let i = 0; i < locationNumber; i += 1) {
    ul += '<li><button class="dropdown-item">請先選擇城市</button></li>';
  }
  console.log(ul);
  const content = `
    <h2 class="menu__title">選擇站別:</h2>
    <div class="dropdown menu__location">
      <a class="btn dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">location</a>
      <ul class="dropdown-menu">
        ${ul}
      </ul>
    </div>
  `;
  setInnerHtml.call(dropDown, content);
}

export { renderCurrent, renderForecast, renderDropDown };
