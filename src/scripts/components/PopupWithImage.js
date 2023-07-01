import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({popupSelector}) {
        super({popupSelector});
    }

    open({name, link}) {
        super.open();
        this._name = name;
        this._link = link;
        this._popupText = this._popupElement.querySelector('.popup__text');
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupText.textContent = this._name;
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
    }
}