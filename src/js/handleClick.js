import { renderCurrent, renderForecast, renderDropDown } from './render';
import { routeHandler } from './router';

let currentNumber = 1;

const handleArrowBtn = async (data, number) => {
  renderCurrent(data, currentNumber);
  currentNumber += 1;

  if (currentNumber >= number) {
    currentNumber = 0;
  }
};

function handleClick(e, data) {
  e.preventDefault();
  const { target } = e;
  const list = target.classList.value.split(' ');
  console.log(data.length);

  if (list.includes('arrow-btn')) {
    handleArrowBtn(data, data.length);
  }

  if (list.includes('menu-btn')) {
    routeHandler(e);
  }

  if (list.includes('menu__selection')) {
    routeHandler(e);
    renderCurrent();
    renderForecast();
  }

  if (list.includes('dropdown-item')) {
    renderDropDown(data.length);
  }
}

export default handleClick;
