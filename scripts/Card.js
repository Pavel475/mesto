export class Card {
    constructor(data, templateElement, openImagePopup) {
        this._dataCard = data;
        this._name = data.name;
        this._link = data.link;
        this._onCardClick = openImagePopup;
        this._templateElement = document.querySelector(templateElement);
    }

    _getTemplate() {
        const cardElement = this._templateElement
          .content
          .cloneNode(true)
          .children[0];
      
        return cardElement;
    }

    _renderCardsList() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__mask-group').src = this._link;
        this._element.querySelector('.element__mask-group').alt = this._name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__group').addEventListener('click', () => {
            this._clickElementHeart();
        });

        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._clickElementDelete();
        });
        
        this._element.querySelector('.element__mask-group').addEventListener('click', () => {
            this._clickElementImage();
        });
    }

    _clickElementHeart() {
        this._element.querySelector('.element__group').classList.toggle('element__group_active');
    }

    _clickElementDelete() {
        this._element.remove();
    }

    _clickElementImage() {
        this._onCardClick(this._dataCard);
    }

    createCard() {
        return this._renderCardsList();
    }
}