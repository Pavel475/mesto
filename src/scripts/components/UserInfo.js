export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }

    getUserInfo() {
        this._object = {};
        this._object.name = this._name.textContent;
        this._object.info = this._info.textContent;
        return this._object;
    }

    setUserInfo(name) {
        this._name.textContent = name.nickName;
        this._info.textContent = name.info;
    }
}