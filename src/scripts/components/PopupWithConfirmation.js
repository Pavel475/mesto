import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
    constructor({popupSelector, submit}) {
        super({popupSelector});
        this._submit = submit;
        this._form = this._popupElement.querySelector('.popup__form');
        this.setEventListeners();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._id);
            this.close();
            this._element.remove();
        })
    }
}