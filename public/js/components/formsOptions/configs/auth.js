'use strict';

import formsOptionsTypes from "../configTypes.js";
import inputTypes from "../inputTypes.js";
import formFieldNames from "../fieldNames.js";

const authFormConfig = new formsOptionsTypes.FormOptions({
    formTitle: 'Login',
    fields: [
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'auth-email',
                type: inputTypes.email,
                label: 'Email',
                name: formFieldNames.auth.EMAIL,
                placeholder: 'Email'
            }),
        }),
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'auth-password',
                type: inputTypes.password,
                label: 'Password',
                name: formFieldNames.auth.PASSWORD,
                placeholder: 'Password'
            })
        })
    ],
    submitBtnText: 'Login!',
});

export default authFormConfig;