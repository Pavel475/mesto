let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let edit = profile.querySelector('.profile__edit-button');
let close = popup.querySelector('.popup__close-button');
let inputname = popup.querySelector('.popup__input_type_nickname');
let inputinfo = popup.querySelector('.popup__input_type_info');
let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');
let submit = popup.querySelector('.popup__container-button');

edit.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    inputname.value = title.textContent;
    inputinfo.value = subtitle.textContent;
});

form.addEventListener('submit', function handleFormSubmit (evt) {
    evt.preventDefault();
    title.textContent = inputname.value;
    subtitle.textContent = inputinfo.value;
    popup.classList.remove('popup_opened');
});

close.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});
