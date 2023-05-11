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
let list = document.querySelector('.elements-list');

/*profile*/
let profile = document.querySelector('.profile');
let edit = profile.querySelector('.profile__edit-button');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let add = profile.querySelector('.profile__add-button');

/*popup*/
let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let close = popup.querySelector('.popup__close-button');
let inputname = popup.querySelector('.popup__input_type_nickname');
let inputinfo = popup.querySelector('.popup__input_type_info');
let submit = popup.querySelector('.popup__container-button');
let heading = popup.querySelector('.popup__container-heading');

/*addpopup*/
let addpopup = document.querySelector('.popup__add');
let addclose = addpopup.querySelector('.popup__close-button');
let addform = addpopup.querySelector('.popup__form');
let inputtitle = addpopup.querySelector('.popup__input_type_title');
let inputlink = addpopup.querySelector('.popup__input_type_link');

/*template*/
const template = document.querySelector('.template').content;

/*popup-image*/
const popimage = document.querySelector('.popup-image');
const popgroup = popimage.querySelector('.popup-image__group');
const image = popimage.querySelector('.popup-image__image');
const poptext = popimage.querySelector('.popup-image__text');
const imagebutton = popimage.querySelector('.popup-image__button');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
};

edit.addEventListener('click', function () {
    openPopup(popup);
    inputname.value = title.textContent;
    inputinfo.value = subtitle.textContent;
});

form.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
  title.textContent = inputname.value;
  subtitle.textContent = inputinfo.value;
  closePopup(popup);
});

close.addEventListener('click', function () {
    closePopup(popup);
});


add.addEventListener('click', function () {
    openPopup(addpopup);
    inputtitle.value = '';
    inputlink.value = '';
});

initialCards.forEach( function (elem) {
  list.append(createCard(elem));
});

function createCard(elem) {
  const tempelement = template.querySelector('.element').cloneNode(true);
  tempelement.querySelector('.element__mask-group').src = elem.link;
  tempelement.querySelector('.element__text').textContent = elem.name;
  tempelement.querySelector('.element__text').alt = elem.name;

  const trash = tempelement.querySelector('.element__trash-button');
  trash.addEventListener('click', function () {
    tempelement.remove();
  });

  const heart = tempelement.querySelector('.element__group');
  heart.addEventListener('click', function () {
    heart.classList.toggle('element__group_active');
  });

  const tempimage = tempelement.querySelector('.element__mask-group');
  tempimage.addEventListener('click', function () {
    image.src = elem.link;
    poptext.textContent = elem.name;
    image.alt = elem.name;
    openPopup(popimage);
  });

  return tempelement;
};

imagebutton.addEventListener('click', function () {
  closePopup(popimage);
});

addclose.addEventListener('click', function () {
    closePopup(addpopup);
});

function addCard(elem) {
  list.prepend(createCard(elem));
}

addform.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
  const name = inputtitle.value;
  const link = inputlink.value;
  const elem = {name, link};
  addCard(elem);
  closePopup(addpopup);
});