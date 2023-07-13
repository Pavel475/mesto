export default class Card {
    constructor(data, templateElement, {handleCardClick, handleDeleteClick, handleLikeClick, handleRemoveLikeClick}, currentId) {
        this._dataCard = data;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._templateElement = document.querySelector(templateElement);
        this._handleDeleteClick = handleDeleteClick;
        this._currentId = currentId;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveLikeClick = handleRemoveLikeClick;
        this._cardLikes = data.likes;
        this._id = this._dataCard._id;
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

        this._cardLike = this._element.querySelector('.element__group-button');
        this._cardTrash = this._element.querySelector('.element__trash-button');
        this._text = this._element.querySelector('.element__group-text');
        if (this._dataCard.owner._id !== this._currentId) {
            this._cardTrash.classList.add('element__trash-button_hidden');
        }

        if (this._cardLikes.some(like => like._id === this._currentId)) {
            this._cardLike.classList.toggle('element__group-button_active');
        }
        this._text.textContent = this._cardLikes.length;

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
        if (this._cardLike.classList.contains('element__group-button_active')) {
            this._handleRemoveLikeClick(this._dataCard._id);
        } else {
            this._handleLikeClick(this._dataCard._id);
        }
    }

    stateLikes(data) {
        this._cardLikes = data.likes;
        console.log(this._cardLikes);
        this._text.textContent = this._cardLikes.length;
    }

    _clickElementDelete() {
        this._handleDeleteClick(this._id, this._element);
    }

    _clickElementImage() {
        this._handleCardClick(this._dataCard);
    }

    createCard() {
        return this._renderCardsList();
    }
}