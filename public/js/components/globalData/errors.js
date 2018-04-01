'use strict';

class Error {
    constructor({
        code,
        text
    } = {}) {
        this._code = code;
        this._text = text;
    }

    get data() {
        return {
            code: this._code,
            text: this._text
        };
    }

    get code() {
        return this._code;
    }

    get text() {
        return this._text;
    }
}

class Errors {
    get common() {
        return {
            NOT_AUTHORIZED: new Error({
                code: 401,
                text: 'User not authorized'
            }),
            NOT_FOUND: new Error({
                code: 404,
                text: 'Data not found'
            })
        };
    }

    get forms() {
        return {
            REQUIRED_FIELD: new Error({
                code: 1001,
                text: 'This field is required',
            }),
            USER_ALREADY_EXISTS: new Error({
                code: 1011,
                text: 'This user already exists',
            }),
            INCORRECT_EMAIL: new Error({
                code: 1012,
                text: 'Incorrect email address',
            }),
            NICKNAME_TAKEN: new Error({
                code: 1013,
                text: 'This nickname is already taken',
            }),
            PASSWORD_TOO_SHORT: new Error({
                code: 1014,
                text: 'The minimum length is 8 characters',
            }),
            INCORRECT_USER_DATA: new Error({
                code: 1015,
                text: 'Incorrect registration data',
            }),
            INCORRECT_PASSWORD: new Error({
                code: 1016,
                text: 'Incorrect password',
            }),
            INCORRECT_EMAIL_OR_PASSWORD: new Error({
                code: 1021,
                text: 'Incorrect email or password',
            }),
            LOGOUT_FAILD: new Error({
                code: 1031,
                text: 'Logout faild',
            })
        };
    }
}

const errors = new Errors();

export default errors;