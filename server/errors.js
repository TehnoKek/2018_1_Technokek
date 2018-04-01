'use strict';

class Error {
    constructor({
        code,
        text
    } = {}) {
        this.code = code;
        this.text = text;
    }

    get data() {
        return {
            code: this.code,
            text: this.text
        };
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
            REQUIRED_FIELD: {
                code: 1001,
                text: 'This field is required',
            },
            USER_ALREADY_EXISTS: {
                code: 1011,
                text: 'This user already exists',
            },
            INCORRECT_EMAIL: {
                code: 1012,
                text: 'Incorrect email address',
            },
            NICKNAME_TAKEN: {
                code: 1013,
                text: 'This nickname is already taken',
            },
            PASSWORD_TOO_SHORT: {
                code: 1014,
                text: 'The minimum length is 8 characters',
            },
            INCORRECT_USER_DATA: {
                code: 1015,
                text: 'Incorrect registration data',
            },
            INCORRECT_PASSWORD: {
                code: 1016,
                text: 'Incorrect password',
            },
            INCORRECT_EMAIL_OR_PASSWORD: {
                code: 1021,
                text: 'Incorrect email or password',
            },
            LOGOUT_FAILD: {
                code: 1031,
                text: 'Logout faild',
            }
        };
    }
}

const errors = new Errors();

exports.errors = errors;

// export default errors;