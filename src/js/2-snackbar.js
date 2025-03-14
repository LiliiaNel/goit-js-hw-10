import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.getElementById("delay");
const successInput = document.querySelector(".input-fulfilled");
const failedInput = document.querySelector(".input-rejected");
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = delayInput.valueAsNumber;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(successInput.checked);
            if (successInput.checked) {
                resolve(delay);
            } else if (failedInput.checked) {
                reject(delay);
            }
        }, delay);
    });
    promise.then(value => {
        console.log(value);
        iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`,
            messageColor: '#fff',
            messageSize: '16px',
            messageLineHeight: '1.5',
            backgroundColor: '#59a10d',
            close: false,
            position: 'topRight',
            timeout: 5000,
        });
    })
        .catch(error => {
            console.log(error);
            iziToast.error({
                title: '',
                message: `Rejected promise in ${delay}ms`,
                messageColor: '#fff',
                messageSize: '16px',
                messageLineHeight: '1.5',
                backgroundColor: '#ef4040',
                close: false,
                position: 'topRight',
                timeout: 5000,
        });
	});

});
	



