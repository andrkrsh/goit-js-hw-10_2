import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

const links = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    mins: document.querySelector('span[data-minutes]'),
    secs: document.querySelector('span[data-seconds]'),
};

let selectedDate;
let intervalId;
links.start.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        console.log(selectedDates[0]);

        if (selectedDates[0] < new Date()) {
            iziToast.error({
                title: "error",
                message: "pick date in the future"
            });
            return;
        }
        else {
            links.start.disabled = false;
        }
    },
};
flatpickr('#datetime-picker', options);


links.start.addEventListener('click', () => {
    intervalId = setInterval(() => {
        const timer = selectedDate - new Date();

        if (timer <= 0) {
            clearInterval(intervalId);
            links.input.disabled = false;
            return;
        }

        const result = convertMs(timer)
        viewOfTimer(result);

    }, 1000)

    links.input.disabled = true;
    links.start.disabled = true;
})



function viewOfTimer({ days, hours, minutes, seconds }) {
    links.days.textContent = `${days}`;
    links.hours.textContent = `${hours}`;
    links.mins.textContent = `${minutes}`;
    links.secs.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}