export const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__container-button',
    inactiveButtonClass: 'popup__container-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const buttonOpenFormEditProfile = document.querySelector('.profile__edit-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonOpenAvatarEditPopup = document.querySelector('.profile__pen')

export const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: '5b47a567-b4a3-46e6-966e-d1c10534cc68',
    'Content-Type': 'application/json'
  }
};
