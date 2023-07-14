export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this.name = document.querySelector(nameSelector);
        this.info = document.querySelector(infoSelector);
        this.avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._object = {};
        this._object.nickName = this.name.textContent;
        this._object.info = this.info.textContent;
        return this._object;
    }

    setUserInfo(data) {
        if (data.name !== undefined) {
            this.name.textContent = data.name;
        }
        if (data.about !== undefined) {
            this.info.textContent = data.about;
        }
        if (data.avatar !== undefined) {
            this.avatar.src = data.avatar;
        }
    }
}