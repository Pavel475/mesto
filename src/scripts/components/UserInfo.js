export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this.name = document.querySelector(nameSelector);
        this.info = document.querySelector(infoSelector);
    }

    getUserInfo() {
        this._object = {};
        this._object.name = this.name.textContent;
        this._object.info = this.info.textContent;
        return this._object;
    }

    setUserInfo(name) {
        this.name.textContent = name.nickName;
        this.info.textContent = name.info;
    }
}