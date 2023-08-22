import Notiflix from 'notiflix';

//
const form = document.querySelector('.form');

//
form.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();

  const delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);
  createPromises(delay, step, amount);
}

//
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//
function createPromises(firstDelay, step, amount) {
  let currentDelay = firstDelay;
  let currentPosition = 1;

  for (let i = 0; i < amount; i += 1) {
    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    currentPosition += 1;
    currentDelay += step;
  }
}
