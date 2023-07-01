import malaga from '../../sprint-4-images/jonas-hoss-p0R8R5IS6aA-unsplash.jpg';
import bosfor from '../../sprint-4-images/despina-galani-k5yE2uTuyys-unsplash.jpg';
import liteiniyMost from '../../sprint-4-images/hu-chen-pwuzRFG4Dm4-unsplash.jpg';
import portSochi from '../../sprint-4-images/damir-yakupov-XEj4CIoNYbk-unsplash.jpg';
import sidneiskiyOperniyTeatr from '../../sprint-4-images/photoholgic-jK9dT34TfuI-unsplash.jpg';
import cafeTravel from '../../sprint-4-images/igor-oliyarnik-Uu5aXBI1oLk-unsplash.jpg';

export const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__container-button',
    inactiveButtonClass: 'popup__container-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const initialCards = [
    {
      name: 'Малага',
      link: malaga
    },
    {
      name: 'Босфор',
      link: bosfor
    },
    {
      name: 'Литейный мост',
      link: liteiniyMost
    },
    {
      name: 'Порт Сочи',
      link: portSochi
    },
    {
      name: 'Сиднейский оперный театр',
      link: sidneiskiyOperniyTeatr
    },
    {
      name: 'Кафе Травел',
      link: cafeTravel
    }
];

export const buttonOpenFormEditProfile = document.querySelector('.profile__edit-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
