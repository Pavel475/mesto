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

/*template*/
const template = document.querySelector('.template').content;

/*popup-image*/
const popupImageOpen = document.querySelector('.popup_image-open');
const groupImage = popupImageOpen.querySelector('.popup__group');
const imageOpen = popupImageOpen.querySelector('.popup__image');
const textImage = popupImageOpen.querySelector('.popup__text');
const buttonCloseImagePopup = popupImageOpen.querySelector('.popup__close-button_type_image');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
};

buttonOpenFormEditProfile.addEventListener('click', function () {
    openPopup(popupEditProfile);
    inputName.value = profileTitle.textContent;
    inputInfo.value = profileSubtitle.textContent;
});

formEditProfile.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
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
});

initialCards.forEach( function (elementList) {
  elementsList.append(createCard(elementList));
});

function createCard(elementList) {
  const templateElement = template.querySelector('.element').cloneNode(true);
  const elementImage = templateElement.querySelector('.element__mask-group');
  elementImage.src = elementList.link;
  const elementText = templateElement.querySelector('.element__text');
  elementText.textContent = elementList.name;
  elementText.alt = elementList.name;

  const elementTrash = templateElement.querySelector('.element__trash-button');
  elementTrash.addEventListener('click', function () {
    templateElement.remove();
  });

  const elementHeart = templateElement.querySelector('.element__group');
  elementHeart.addEventListener('click', function () {
    elementHeart.classList.toggle('element__group_active');
  });

  elementImage.addEventListener('click', function () {
    imageOpen.src = elementList.link;
    textImage.textContent = elementList.name;
    imageOpen.alt = elementList.name;
    openPopup(popupImageOpen);
  });

  return templateElement;
};

buttonCloseImagePopup.addEventListener('click', function () {
  closePopup(popupImageOpen);
});

buttonCloseAddCardPopup.addEventListener('click', function () {
  closePopup(popupAddProfile);
});

function addCard(elementList) {
  elementsList.prepend(createCard(elementList));
}

formAddCard.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  const elementList = {name, link};
  addCard(elementList);
  closePopup(popupAddProfile);
});