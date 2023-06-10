export const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__container-button',
    inactiveButtonClass: 'popup__container-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export class FormValidator {
    constructor(configFormSelector, formElement) {
        this._formElement = formElement;
        this._formSelector = configFormSelector.formSelector;
        this._inputSelector = configFormSelector.inputSelector;
        this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButtonSelector = configFormSelector.submitButtonSelector;
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inactiveButtonClass = configFormSelector.inactiveButtonClass;
        this._inputErrorClass = configFormSelector.inputErrorClass;
        this._errorClass = configFormSelector.errorClass;
    }

    _showInputError(inputElement, errorElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _disableButton(buttonElement) {
        buttonElement.disabled = 'disabled';
        buttonElement.classList.add(this._inactiveButtonClass);
    }
    
    _enableButton(buttonElement) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._inactiveButtonClass);
    }

    _toggleButtonState(buttonElement, inputStatus) {
        if (!inputStatus) {
            this._disableButton(buttonElement)
        } else {
            this._enableButton(buttonElement);
        }
    }
    
    
    _checkInputValidity(formElement, inputElement) {
        const isInputValid = inputElement.validity.valid;
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
        if (!isInputValid) {
            this._showInputError(inputElement, errorElement);
        } else {
            this._hideInputError(inputElement, errorElement);
        }
    }
    
    _setEventListeners(formElement) {
        this._toggleButtonState(this._submitButtonElement, formElement.checkValidity());
        
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._disableFormButton();
        });
    
        this._inputsList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._checkFormItem(formElement, inputItem);
            });
        });
    }

    _disableFormButton() {
        this._disableButton(this._submitButtonElement);
    }

    _checkFormItem(formElement, inputItem) {
        this._toggleButtonState(this._submitButtonElement, formElement.checkValidity());
        this._checkInputValidity(formElement, inputItem);
    }

    _getForm() {
        this._setEventListeners(this._formElement);
    }

    enableValidation() {
        return this._getForm();
    }
}