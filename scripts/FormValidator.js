export class FormValidator {
    constructor(configFormSelector, formElement) {
        this._formElement = formElement;
        this._formSelector = configFormSelector.formSelector;
        this._inputsList = Array.from(this._formElement.querySelectorAll(configFormSelector.inputSelector));
        this._submitButtonSelector = configFormSelector.submitButtonSelector;
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inactiveButtonClass = configFormSelector.inactiveButtonClass;
        this._inputErrorClass = configFormSelector.inputErrorClass;
        this._errorClass = configFormSelector.errorClass;
    }

    _showInputError(inputElement) {
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = inputElement.validationMessage;
    }

    hideInputError(inputElement) {
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = inputElement.validationMessage;
    }

    disableButton() {
        this._submitButtonElement.disabled = 'disabled';
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }
    
    _enableButton() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    }

    _toggleButtonState() {
        if (!this._formElement.checkValidity()) {
            this.disableButton();
        } else {
            this._enableButton();
        }
    }
    
    
    _checkInputValidity(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._isInputValid = inputElement.validity.valid;

        if (!this._isInputValid) {
            this._showInputError(inputElement);
        } else {
            this.hideInputError(inputElement);
        }
    }
    
    _setEventListeners() {
        this._toggleButtonState();
        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._disableFormButton();
        });
    
        this._inputsList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._checkFormItem(inputItem);
            });
        });
    }

    _disableFormButton() {
        this.disableButton();
    }

    _checkFormItem(inputItem) {
        this._toggleButtonState();
        this._checkInputValidity(inputItem);
    }

    _getForm() {
        this._setEventListeners();
    }

    enableValidation() {
        return this._getForm();
    }
}