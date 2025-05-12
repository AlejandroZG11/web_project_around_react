import React from "react";

export class Api extends React.Component {
    constructor(props) {
        super(props);
        this._baseUrl = props.baseUrl;
        this._headers = props.headers;
    }

    // Cambiado de getInitialCards a getCardList
    getCardList() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    // Espera 'name' y 'about' como argumentos separados
    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    // Espera un objeto con propiedades 'name' y 'link'
    addCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    // Espera un objeto con propiedad 'avatar'
    editAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: avatar }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    addLikes(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    removeLikes(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? 'PUT' : 'DELETE';
        // Asegúrate que la URL sea /cards/likes/:cardId o /cards/:cardId/likes según tu API
        // El código original usaba /cards/:cardId/likes, lo mantendré así.
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method,
            headers: this._headers,
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`❌ Error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("✅ Card actualizada desde el servidor:", data);
                return data;
            });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }
}

export const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "410a769a-c4fc-431d-ae52-dff1b88ee80d", // Recuerda manejar tokens de autorización de forma segura
        "Content-Type": "application/json",
    },
});

export default api;