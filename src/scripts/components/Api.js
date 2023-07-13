export default class Api {
    constructor(options) {
        this.url = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    userInfo() {
        return fetch(this.url + '/users/me', {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(this.url + '/cards', {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    editProfileInfo(newInfo) {
        return fetch(this.url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newInfo.nickName,
                about: newInfo.info
            })
        })
        .then(this._handleResponse);
    }

    createCard(data) {
        return fetch(this.url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    putLike(id) {
        return fetch(this.url + /cards/ + `${id}` + '/likes', {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    removeLike(id) {
        return fetch(this.url + /cards/ + `${id}` + '/likes', {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    updateAvatar(newAvatar) {
        return fetch(this.url + '/users/me/avatar ', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatar.avatar
            })
        })
        .then(this._handleResponse);
    }
}