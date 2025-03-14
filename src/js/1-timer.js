import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector(".start-btn");
const dateInput = document.getElementById("datetime-picker");
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        close: false,
        position: 'topRight',
        timeout: 3000,
      });
        button.setAttribute('disabled', true);
    } else {
      button.removeAttribute('disabled');
    }
  }
};

flatpickr(dateInput, options);
let timer;
button.addEventListener("click", () => {
  clearInterval(timer);
  timer = setInterval(countdownInterval, 1000);
  button.setAttribute('disabled', true);
  dateInput.setAttribute('disabled', true);

});

function countdownInterval() {
  const countdownDate = new Date(userSelectedDate).getTime(); 
  const now = new Date().getTime();
  const timeLeft = countdownDate - now;
    if (timeLeft <= 0) {
    clearInterval(timer);
    button.removeAttribute('disabled');
    dateInput.removeAttribute('disabled');
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  timerDays.textContent = addLeadingZero(days); 
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0') 
};



// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}






