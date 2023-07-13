import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submit}) {
        super({popupSelector});
        this.form = this._popupElement.querySelector('.popup__form');
        this._inputsList = Array.from(this.form.querySelectorAll('.popup__input'));
        this._submit = submit;
        this._submitButton = this.form.querySelector('.popup__container-button');
        this._submitButtonText = this._submitButton.textContent;
        this.setEventListeners();
    }

    _getInputValues() {
        this._data = {}

        this._inputsList.forEach( (input) => {
            this._data[input.name] = input.value;
        })
        return this._data;
    }

    setInputValues(data) {
        this._inputsList.forEach( (input) => {
            input.value = data[input.name];
    })
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', () => {
            console.log('submit');
            this._submit(this._getInputValues());
        })
    }

    renderLoading(isLoading, loadingText='Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    close() {
        super.close();
        this.form.reset();
    }
}