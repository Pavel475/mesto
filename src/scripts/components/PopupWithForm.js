import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submit, loadButton}) {
        super({popupSelector});
        this.form = this._popupElement.querySelector('.popup__form');
        this._inputsList = Array.from(this.form.querySelectorAll('.popup__input'));
        this._submit = submit;
        this._submitButton = this.form.querySelector('.popup__container-button');
        this._loadButton = loadButton;
        this.setEventListeners();
    }

    _getInputValues() {
        this._data = {}

        this._inputsList.forEach( (input) => {
            this._data[input.name] = input.value;
        })
        return this._data;
    }

    setInputValues({name, info}) {
        this._inputsList.forEach( (input) => {
            if (input.name === 'nickName') {
                input.value = name;
            } else {
                input.value = info;
            }
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', () => {
            console.log('submit');
            this._submit(this._getInputValues());
        })
    }

    isLoadAddPopup(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Создание...';
            this._loadButton();
        } else {
            this._submitButton.textContent = 'Создать';
            this.close();
        }
    }

    isLoadProfileEditPopup(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
            this._loadButton();
        } else {
            this._submitButton.textContent = 'Сохранить';
            this.close();
        }
    }

    close() {
        super.close();
        this.form.reset();
    }
}