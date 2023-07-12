import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {
    constructor({popupSelector, submit, loadButton}) {
        super({popupSelector});
        this.form = this._popupElement.querySelector('.popup__form');
        this._inputForm = this.form.querySelector('.popup__input');
        this._avatar = document.querySelector('.profile__avatar');
        this._submitButton = this.form.querySelector('.popup__container-button');
        this._loadButton = loadButton;
        this._submit = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._inputForm.value);
        })
    }

    getAvatar(image) {
        this._avatar.src = image;
    }

    setAvatar(newAvatar) {
        this._avatar.src = newAvatar;
        return this._avatar.src;
    }

    isLoadProfileAvatarPopup(isLoading) {
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