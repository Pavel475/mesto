import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({popupSelector}) {
        super({popupSelector});
        this._popupText = this._popupElement.querySelector('.popup__text');
        this._popupImage = this._popupElement.querySelector('.popup__image');
    }

    open({name, link}) {
        super.open();
        this._popupText.textContent = name;
        this._popupImage.src = link;
        this._popupImage.alt = name;
    }
}