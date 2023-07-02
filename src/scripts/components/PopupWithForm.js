import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submit}) {
        super({popupSelector});
        this.form = this._popupElement.querySelector('.popup__form');
        this._inputsList = Array.from(this.form.querySelectorAll('.popup__input'));
        this._submit = submit;
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
            this._submit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this.form.reset();
    }
}