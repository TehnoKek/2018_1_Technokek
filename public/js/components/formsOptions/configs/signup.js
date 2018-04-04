'use strict';

import formsOptionsTypes from "../configTypes.js";
import inputTypes from "../inputTypes.js";
import formFieldNames from "../fieldNames.js";
import formMixins from "../../formConstraints/formMixins.js";

const signupFormConfig = new formsOptionsTypes.FormOptions({
    formTitle: 'Registration',
    fields: [
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'signup-nickname',
                type: inputTypes.text,
                label: 'Nickaname',
                name: formFieldNames.signup.NICKNAME,
                placeholder: 'Nickname'
            }),
        }),
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'signup-email',
                type: inputTypes.email,
                label: 'Email',
                name: formFieldNames.signup.EMAIL,
                placeholder: 'Email'
            }),
        }),
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'signup-password',
                type: inputTypes.password,
                label: 'Password',
                name: formFieldNames.signup.PASSWORD,
                placeholder: 'Password'
            })
        }),
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'signup-password-repeat',
                type: inputTypes.password,
                label: 'Repeat password',
                name: formFieldNames.signup.PASSWORD_REPEAT,
                placeholder: 'Repeat password'
            })
        })
    ],
    submitBtnText: 'Register!',
    constraintsMixins: [
        new formMixins.MatchPasswordsMixin(
            formFieldNames.PASSWORD,
            formFieldNames.PASSWORD_REPEAT
        )
    ]
});

export default signupFormConfig;