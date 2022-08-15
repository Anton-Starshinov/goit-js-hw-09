import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};
const fp = flatpickr('#datetime-picker', { ...options });

startBtn.addEventListener('click', () => {
  const timerId = setInterval(() => {
    const currentDate = Date.now();
    const startTime = fp.selectedDates[0];
    let deltaDate = startTime - currentDate;
    const dateComponents = convertMs(deltaDate);

    if (deltaDate < 0) {
      return clearInterval(timerId);
    }

    daysEl.textContent = dateComponents.days;
    hoursEl.textContent = dateComponents.hours;
    minutesEl.textContent = dateComponents.minutes;
    secondsEl.textContent = dateComponents.seconds;
  }, 1000);
});

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
