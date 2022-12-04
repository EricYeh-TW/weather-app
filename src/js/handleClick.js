import display from './display';
import fetchWeatherObservation from './fetchObservation';

let currentNumber = 1;

const handleClick = async () => {
  const observeData = await fetchWeatherObservation();
  const locationNumber = observeData.length;
  display(currentNumber);
  currentNumber += 1;

  if (currentNumber >= locationNumber) {
    currentNumber = 0;
  }
};

export default handleClick;
