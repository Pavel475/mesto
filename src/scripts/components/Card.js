export default class Card {
    constructor(data, templateElement, {handleCardClick}) {
        this._dataCard = data;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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
        this._cardText = this._element.querySelector('.element__text');
        this._cardImage = this._element.querySelector('.element__mask-group');
        this._cardText.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._cardLike = this._element.querySelector('.element__group');
        this._cardTrash = this._element.querySelector('.element__trash-button');

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {
            this._clickElementHeart();
        });

        this._cardTrash.addEventListener('click', () => {
            this._clickElementDelete();
        });
        
        this._cardImage.addEventListener('click', () => {
            this._clickElementImage();
        });
    }

    _clickElementHeart() {
        this._cardLike.classList.toggle('element__group_active');
    }

    _clickElementDelete() {
        this._element.remove();
    }

    _clickElementImage() {
        this._handleCardClick(this._dataCard);
    }

    createCard() {
        return this._renderCardsList();
    }
}