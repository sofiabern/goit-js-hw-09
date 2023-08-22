function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

//
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

//
btnStart.addEventListener('click', changeColorHandler);
btnStop.addEventListener('click', stopChangeHandler);

//
btnStop.disabled = true;

//
let colorChangerId = null;

function changeColorHandler() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  colorChangerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
}

//
function stopChangeHandler() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(colorChangerId);
}
