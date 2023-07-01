export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._nameInput = document.querySelector('.popup__input_type_nickname');
        this._infoInput = document.querySelector('.popup__input_type_info');
    }

    getUserInfo() {
        this._object = {};
        this._object[this._nameInput.value = this._name.textContent, this._infoInput.value = this._info.textContent];
        return this._object;
    }

    setUserInfo(name) {
        this._name.textContent = name.nickName;
        this._info.textContent = name.info;
    }
}