import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import { configFormSelector, initialCards, buttonOpenFormEditProfile, buttonOpenAddCardPopup} from '../scripts/utils/constants.js';

import './index.css';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

buttonOpenFormEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  userInfo.getUserInfo();
  onValidateProfile.resetErrors();
});

buttonOpenAddCardPopup.addEventListener('click', function () {
  popupAddCard.open();
  onValidateAddCard.resetErrors();
});

const popupImage = new PopupWithImage({popupSelector: '.popup_image-open'});

const section = new Section({items: initialCards, renderer: (card) => {
  const cardElement = createCard(card);
  section.addItem(cardElement);
}}, '.elements-list');

section.renderItems();

function createCard(item) {
  const card = new Card(item, '.template', {handleCardClick: (cardInfo) => {
    popupImage.open(cardInfo);
  }});
  const cardElement = card.createCard();
  return cardElement;
}

const popupAddCard = new PopupWithForm({popupSelector: '.popup_add-profile',
submit: (name) => {
  const cardElement = createCard(name);
  section.addItem(cardElement);
  popupAddCard.close();
}})

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle'
});

const popupEditProfile = new PopupWithForm({popupSelector: '.popup_edit-profile',
submit: (name) => {
  userInfo.setUserInfo(name);
  popupEditProfile.close();
}})

const onValidateProfile = new FormValidator(configFormSelector, popupEditProfile.form);
onValidateProfile.enableValidation();

const onValidateAddCard = new FormValidator(configFormSelector, popupAddCard.form);
onValidateAddCard.enableValidation();

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();