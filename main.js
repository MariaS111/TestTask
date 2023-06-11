document.addEventListener('DOMContentLoaded', function() {
    const deadline = new Date(2023, 6, 24);
    let timerId = null;
    function countdownTimer() {
        const diff = deadline - new Date();

        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    const $days = document.querySelector('.days');
    const $hours = document.querySelector('.hours');
    const $minutes = document.querySelector('.minutes');
    const $seconds = document.querySelector('.seconds');

    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);
});


const successButton = document.getElementById('success-button');
const success = document.getElementById('success');
const closeButton = document.getElementById('close-button-success');
const main_header = document.getElementById('main_header');
const main_section = document.getElementById('main_section');
const main_footer = document.getElementById('main_footer');
const emailInput = document.getElementById('email-input');
const valueElement = document.getElementById("value");
const instructionsElement = document.getElementById("instructions");
const cross = document.getElementById('close-button');
const overlay = document.createElement('div');


successButton.addEventListener('click', function() {
    if ((email !== "" && validateEmail(email))) {
        sendEmailData(email)
        const newValue = "Success!";
        const newInstructions = "You have successfully subscribed to the email newsletter";
        showScreen(newValue, newInstructions);
    } else {
        const newValue = "Error!";
        const newInstructions = "Please,try again or enter correct email!";
        showScreen(newValue, newInstructions);
    }
});

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function sendEmailData(email) {
    const data = {
        email: email
    };
    const url = '';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log("send");
            if (xhr.status === 200) {
                console.log('success');
            } else {
                console.log('error');
            }
        }
    };
    xhr.send(JSON.stringify(data));
}


function showScreen(newValue, newInstructions) {
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    success.style.display = 'block';
    main_section.style.opacity = '0.5';
    main_header.style.opacity = '0.5';
    main_footer.style.opacity = '0.5';
    valueElement.textContent = newValue;
    instructionsElement.textContent = newInstructions;
}

function closing() {
    overlay.remove()
    success.style.display = 'none';
    emailInput.value = ''
    main_section.style.opacity = '1';
    main_header.style.opacity = '1';
    main_footer.style.opacity = '1';
}

closeButton.addEventListener('click', closing);
cross.addEventListener('click', closing);
