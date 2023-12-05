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

	if (result) {
		validate = true;
	} else {
		validate = false;
	}
});

// regular expression for  validating email
function checkEmail(getEmail) {
	let email = new RegExp('^[a-z0-9]+@gmail.com$', 'i');
	const result = email.test(getEmail);
	return result;
}

// error function to show error
function showError() {
	errorMsg.classList.remove('hidden');
	emailInput.classList.add('input-error');
	setTimeout(() => {
		errorMsg.classList.add('hidden');
		emailInput.classList.remove('input-error');
		
	}, 2000);
}

subscribeBtn.addEventListener('click', validateEmail);

document.addEventListener('keyup', function (e) {
	if (e.key === 'Enter' && !newsLetter.classList.contains('hidden')) {
		validateEmail();
	} else if (e.key === 'Enter') {
		redirectToNewsletter();
	}
});

formEl.addEventListener('submit', function (e) {
	e.preventDefault();
});

function validateEmail() {
	if (emailInput.value === '') {
		errorMsg.textContent = 'Please enter email Id';
		showError();
		return;
	}

	if (!validate) {
		errorMsg.textContent = 'Valid email Required';
		showError();
		return;
	}

	toggleSection(newsLetter, successMessage);

	const emailIs = emailInput.value;

	confirmationEmail.textContent = emailIs;
}

// --------------------------------------------------------------------------------------------------------------

dismissBtn.addEventListener('click', redirectToNewsletter);

function redirectToNewsletter() {
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
