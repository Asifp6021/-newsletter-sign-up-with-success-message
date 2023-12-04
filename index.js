const successMessage = document.querySelector('.success');
const newsLetter = document.querySelector('.newsletter');
const subscribeBtn = document.querySelector(
	'.newsletter button[aria-label="subscribe"]'
);
const dismissBtn = document.querySelector(
	'.success button[aria-label="Dismiss message"]'
);

const confirmationEmail = document.querySelector('#confirmation-email');
const emailInput = document.querySelector('.newsletter input[type="text"]');
const errorMsg = document.querySelector('.error');
const formEl = document.querySelector('form');

// ------------------------------------------------------------------------------------------

let validate = false; //managing state to show error

// grabbing input from email input box
emailInput.addEventListener('input', function (e) {
	const emailInputValue = e.target.value;
	const result = checkEmail(emailInputValue);

	if (result === true) {
		validate = true;
	} else {
		validate = false;
	}
});

// regular expression validating email
function checkEmail(getEmail) {
	let email = new RegExp('^[a-z0-9]+@gmail.com$', 'i');
	const result = email.test(getEmail);
	return result;
}

// error function to show error
function showError() {
	errorMsg.classList.remove('hidden');
	errorMsg.style.color = 'red';
	emailInput.style.border = '2px solid red';
	emailInput.style.color = 'red';
	setTimeout(() => {
		emailInput.style.border = '1.5px solid hsl(231, 7%, 60%) ';
		errorMsg.classList.add('hidden');
		emailInput.style.color = 'hsl(234, 29%, 20%)';
	}, 2000);
}

subscribeBtn.addEventListener('click', validateEmail);

document.addEventListener('keyup', function (e) {
	if (e.key === 'Enter' && !newsLetter.classList.contains('hidden')) {
		validateEmail();
	} else if (e.key === 'Enter') {
		redirectToNewletter();
	}
});

formEl.addEventListener('submit', function (e) {
	e.preventDefault();
});

function validateEmail() {
	if (emailInput.value === '') {
		errorMsg.innerText = 'Please enter email Id';
		showError();
		return;
	}

	if (validate === false) {
		errorMsg.innerText = 'Valid email Required';
		showError();
		return;
	}

	toggleSection(newsLetter, successMessage);

	const emailIs = emailInput.value;

	confirmationEmail.innerText = emailIs;
}

// --------------------------------------------------------------------------------------------------------------

dismissBtn.addEventListener('click', redirectToNewletter);

function redirectToNewletter() {
	toggleSection(successMessage, newsLetter);
	emailInput.value = '';
}

function toggleSection(newsLetter, successMessage) {
	if (!newsLetter.classList.contains('hidden')) {
		newsLetter.classList.add('hidden');
		successMessage.classList.remove('hidden');
	}
}

window.addEventListener('beforeunload', function () {
	emailInput.value = '';
});
