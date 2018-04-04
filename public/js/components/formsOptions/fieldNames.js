'use strict';

const baseNames = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NICKNAME: 'nickname',
    PASSWORD_REPEAT: 'repeat-password',
    NEW_PASSWORD: 'new_password',
    NEW_PASSWORD_REPEAT: 'new_password_repeat'
};

const formFieldNames = {
    auth: {
        EMAIL: baseNames.EMAIL,
        PASSWORD: baseNames.PASSWORD
    },
    signup: {
        NICKNAME: baseNames.NICKNAME,
        EMAIL: baseNames.EMAIL,
        PASSWORD: baseNames.PASSWORD,
        PASSWORD_REPEAT: baseNames.PASSWORD_REPEAT
    },
    edit: {
        nickname: {
            NICKNAME: baseNames.NICKNAME
        },
        password: {
            PASSWORD: baseNames.PASSWORD,
            NEW_PASSWORD: baseNames.NEW_PASSWORD,
            NEW_PASSWORD_REPEAT: baseNames.NEW_PASSWORD_REPEAT
        },
        email: {
            EMAIL: baseNames.EMAIL
        }
    }
};

export default formFieldNames;