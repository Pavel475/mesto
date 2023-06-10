import { Card } from './Card.js';
import { FormValidator, configFormSelector } from './FormValidator.js';

const initialCards = [
  {
    name: 'Кафе Травел',
    link: './sprint-4-images/igor-oliyarnik-Uu5aXBI1oLk-unsplash.jpg'
  },
  {
    name: 'Сиднейский оперный театр',
    link: './sprint-4-images/photoholgic-jK9dT34TfuI-unsplash.jpg'
  },
  {
    name: 'Порт Сочи',
    link: './sprint-4-images/damir-yakupov-XEj4CIoNYbk-unsplash.jpg'
  },
  {
    name: 'Литейный мост',
    link: './sprint-4-images/hu-chen-pwuzRFG4Dm4-unsplash.jpg'
  },
  {
    name: 'Босфор',
    link: './sprint-4-images/despina-galani-k5yE2uTuyys-unsplash.jpg'
  },
  {
    name: 'Малага',
    link: './sprint-4-images/jonas-hoss-p0R8R5IS6aA-unsplash.jpg'
  }
];

/*elements*/
const elementsList = document.querySelector('.elements-list');

/*profile*/
const profile = document.querySelector('.profile');
const buttonOpenFormEditProfile = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button');

/*popupEditProfile*/
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form_type_user');
const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__close-button_type_edit');
const inputName = popupEditProfile.querySelector('.popup__input_type_nickname');
const inputInfo = popupEditProfile.querySelector('.popup__input_type_info');

/*popupAddProfile*/
const popupAddProfile = document.querySelector('.popup_add-profile');
const buttonCloseAddCardPopup = popupAddProfile.querySelector('.popup__close-button_type_add');
const formAddCard = popupAddProfile.querySelector('.popup__form_type_mesto');
const inputTitle = popupAddProfile.querySelector('.popup__input_type_title');
const inputLink = popupAddProfile.querySelector('.popup__input_type_link');

/*popup-image*/
const popupImageOpen = document.querySelector('.popup_image-open');
const groupImage = popupImageOpen.querySelector('.popup__group');
const imageOpen = popupImageOpen.querySelector('.popup__image');
const textImage = popupImageOpen.querySelector('.popup__text');
const buttonCloseImagePopup = popupImageOpen.querySelector('.popup__close-button_type_image');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  popupElement.addEventListener('click', closePopupOverlay);
}

const openImagePopup = (card) => {
  imageOpen.src = card.link;
  imageOpen.alt = card.name;
  textImage.textContent = card.name;
  openPopup(popupImageOpen);
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closePopupEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  popupElement.removeEventListener('click', closePopupOverlay);
}

function clearPopupsError(formElement, onValidate) {
  const buttonForm = formElement.querySelector('.popup__container-button');
  onValidate._disableButton(buttonForm);

  const inputsList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputsList.forEach(function(inputItem) {
    const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
    onValidate._hideInputError(inputItem, errorElement);
});
}

buttonOpenFormEditProfile.addEventListener('click', function () {
    openPopup(popupEditProfile);
    inputName.value = profileTitle.textContent;
    inputInfo.value = profileSubtitle.textContent;
    clearPopupsError(formEditProfile, onValidateProfile);
});

formEditProfile.addEventListener('submit', function handleFormSubmit () {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputInfo.value;
  closePopup(popupEditProfile);
});

buttonCloseEditProfilePopup.addEventListener('click', function () {
    closePopup(popupEditProfile);
});

buttonOpenAddCardPopup.addEventListener('click', function () {
    openPopup(popupAddProfile);
    inputTitle.value = '';
    inputLink.value = '';
    clearPopupsError(formAddCard, onValidateAddCard);
});

buttonCloseImagePopup.addEventListener('click', function () {
  closePopup(popupImageOpen);
  });

buttonCloseAddCardPopup.addEventListener('click', function () {
  closePopup(popupAddProfile);
});

formAddCard.addEventListener('submit', function handleFormSubmit () {
  const name = inputTitle.value;
  const link = inputLink.value;
  const elementList = {name, link};
  const card = new Card(elementList, '.template', openImagePopup);
  const cardElement = card.createCard();
  elementsList.prepend(cardElement);
  closePopup(popupAddProfile);
});

initialCards.forEach((item) => {
  const card = new Card(item, '.template', openImagePopup);
  const cardElement = card.createCard();
  elementsList.append(cardElement);
});

const onValidateProfile = new FormValidator(configFormSelector, formEditProfile);
onValidateProfile.enableValidation();

const onValidateAddCard = new FormValidator(configFormSelector, formAddCard);
onValidateAddCard.enableValidation();