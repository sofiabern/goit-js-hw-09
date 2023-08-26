import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.value');

let selectedDate;
let timerStarted = false; // Флаг, що показує, чи таймер був запущений
let countdownInterval; // Зберігатиме посилання на інтервал

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};
const fp = flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  if (!selectedDate) {
    return;
  }
  const currentTime = new Date();
  const timeDifference = selectedDate - currentTime;
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    startBtn.disabled = false;
    Notiflix.Notify.success('Timer has ended!');
    timerFields[0].textContent = '00';
    timerFields[1].textContent = '00';
    timerFields[2].textContent = '00';
    timerFields[3].textContent = '00';
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}
// Обробник натискання на кнопку старту
startBtn.addEventListener('click', onClickHandler);
function onClickHandler() {
  if (timerStarted) {
    return;
  }
  timerStarted = true;
  // Заблокувати календар після запуску таймера
  startBtn.disabled = true;
  input.disabled = true;
  // input.classList.add('disabled');
  // Очистити попередній інтервал (якщо він був)
  clearInterval(countdownInterval);
  // Запустити таймер
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}
