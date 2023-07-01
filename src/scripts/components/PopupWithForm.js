import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submit}) {
        super({popupSelector});
        this.form = this._popupElement.querySelector('.popup__form');
        this.inputsList = Array.from(this.form.querySelectorAll('.popup__input'));
        this._submit = submit;
    }

    _getInputValues() {
        this._data = {}

        this.inputsList.forEach( (input) => {
            this._data[input.name] = input.value;
        })
        return this._data;
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