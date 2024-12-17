import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const delayInput = document.querySelector('input[name="delay"]');
    const fulfilledRadio = document.querySelector('input[name="state"][value="fulfilled"]');
    const rejectedRadio = document.querySelector('input[name="state"][value="rejected"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const delay = parseInt(delayInput.value, 10);
        let selectedState;

        if (fulfilledRadio.checked) {
            selectedState = fulfilledRadio.value;
        } else if (rejectedRadio.checked) {
            selectedState = rejectedRadio.value;
        }

        createPromise(delay, selectedState)
            .then(data => iziToast.success({ title: 'Success', message: data }))
            .catch(error => iziToast.error({ title: 'Error', message: error }))
            .finally(() => {
                delayInput.value = '';
            });
    });

    function createPromise(delay, state) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(`✅ Fulfilled promise in ${delay}ms`);
                } else {
                    reject(`❌ Rejected promise in ${delay}ms`);
                }
            }, delay);
        });
    }
});