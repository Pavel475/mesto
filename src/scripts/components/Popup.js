export default class Popup {
    constructor({popupSelector}) {
        this._popupOpened = 'popup_opened';
        this._popupElement = document.querySelector(popupSelector);
        this._buttonClose = this._popupElement.querySelector('.popup__close-button');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._buttonClose.addEventListener('click', this.close.bind(this));
        this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
    }

    open() {
        this._popupElement.classList.add(this._popupOpened);
    }

    close() {
        this._popupElement.classList.remove(this._popupOpened);
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._buttonClose.removeEventListener('click', this.close.bind(this));
        this._popupElement.removeEventListener('click', this._handleOverlayClose.bind(this));
    }
}