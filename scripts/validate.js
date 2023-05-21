function showInputError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function disabledButton(buttonElement, config) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, inputStatus, config) {
    if (!inputStatus) {
        disabledButton(buttonElement, config)
    } else {
        enabledButton(buttonElement, config);
    }
}


function checkInputValidity(formElement, inputElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    if (!isInputValid) {
        showInputError(inputElement, errorElement, config);
    } else {
        hideInputError(inputElement, errorElement, config);
    }
}

function setEventListeners(formElement, config) {
    const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
        disabledButton(submitButtonElement, config);
    })

    inputsList.forEach(function(inputItem) {
        inputItem.addEventListener('input', function() {
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
            checkInputValidity(formElement, inputItem, config)
        });
    })
}


function enableValidation(config) {
    const formsList = Array.from(document.querySelectorAll(config.formSelector));
    formsList.forEach(function(formItem) {
        setEventListeners(formItem, config);
    });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__container-button',
    inactiveButtonClass: 'popup__container-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(configFormSelector);