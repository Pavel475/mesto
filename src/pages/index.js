import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import { configFormSelector, buttonOpenFormEditProfile, buttonOpenAddCardPopup, configApi, buttonOpenAvatarEditPopup } from '../scripts/utils/constants.js';

import './index.css';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';

const api = new Api(configApi);

let currentId;

Promise.all([api.getInitialCards(), api.userInfo()])
.then(([responseCard, responseUser]) => {
  currentId = responseUser._id;
  const section = new Section({items: responseCard, renderer: (card) => {
    const cardElement = createCard(card, currentId);
    section.addItem(cardElement);
  }}, '.elements-list');

  const popupConfirm = new PopupWithConfirmation({
    popupSelector: '.popup_confirm',
    submit: (id, element) => {
      api.deleteCard(id)
      .then((id) => {
        console.log(id)
        element.remove();
        popupConfirm.close();
    })
      .catch((err) => console.log(err));
    }
  })
  
  const popupAddCard = new PopupWithForm({popupSelector: '.popup_add-profile',
    submit: (name) => {
      popupAddCard.renderLoading(true);
      api.createCard(name)
      .then((cardInfo) => {
        const cardElement = createCard(cardInfo, cardInfo.owner._id);
        section.addItem(cardElement);
        popupAddCard.close();
        return cardElement;
      })
      .catch((err) => console.log(err))
      .finally(() => {popupAddCard.renderLoading(false)});
    }
  })

  buttonOpenAddCardPopup.addEventListener('click', function () {
    popupAddCard.open();
    onValidateAddCard.resetErrors();
    onValidateAddCard.disableFormButton();
  });

  const onValidateAddCard = new FormValidator(configFormSelector, popupAddCard.form);
  onValidateAddCard.enableValidation();

  buttonOpenFormEditProfile.addEventListener('click', function () {
    popupEditProfile.open();
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    onValidateProfile.resetErrors();
    onValidateProfile.disableFormButton();
  });
  
  const popupImage = new PopupWithImage({popupSelector: '.popup_image-open'});
  
  function createCard(item, currentId) {
    const card = new Card(item, '.template', {handleCardClick: (cardInfo) => {
      popupImage.open(cardInfo);
    },
    handleDeleteClick: (id, element) => {
      popupConfirm.open(id, element);
    },
    handleLikeClick: (id) => {
      api.putLike(id)
      .then((likesCard) => {
        card.stateLikes(likesCard);
        card.addLike();
      })
      .catch((err) => console.log(err));
    },
    handleRemoveLikeClick: (id) => {
      api.removeLike(id)
      .then((likesCard) => {
        card.stateLikes(likesCard);
        card.removeLike();
      })
      .catch((err) => console.log(err));
    }
  }, currentId);

   return card.createCard()
  }
  
  const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    infoSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
  });
  
  const popupEditProfile = new PopupWithForm({popupSelector: '.popup_edit-profile',
  submit: (name) => {
    popupEditProfile.renderLoading(true);
    api.editProfileInfo(name)
    .then((info) => {
      console.log(info);
      userInfo.setUserInfo(info);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {popupEditProfile.renderLoading(false)});
  }
})
  
  const onValidateProfile = new FormValidator(configFormSelector, popupEditProfile.form);
  onValidateProfile.enableValidation();
  
  popupImage.setEventListeners();

  buttonOpenAvatarEditPopup.addEventListener('click', () => {
    popupAvatar.open();
    onValidateProfileAvatar.resetErrors();
    onValidateProfileAvatar.disableFormButton();
  })

  const popupAvatar = new PopupWithForm({popupSelector: '.popup_avatar',
  submit: (newAvatar) => {
    console.log(newAvatar);
    popupAvatar.renderLoading(true);
    api.updateAvatar(newAvatar)
    .then((response) => {
      userInfo.setUserInfo(response);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {popupAvatar.renderLoading(false)});
  }
});

  const onValidateProfileAvatar = new FormValidator(configFormSelector, popupAvatar.form);
  onValidateProfileAvatar.enableValidation();

  api.userInfo()
  .then((response) => {
    userInfo.setUserInfo(response);
  })
  .catch((err) => {console.log(err)});

section.renderItems();
})
.catch((err) => {console.log(err)});