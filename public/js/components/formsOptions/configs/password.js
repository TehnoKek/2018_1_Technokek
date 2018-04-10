'use strict';

import formsOptionsTypes from "../configTypes.js";
import inputTypes from "../inputTypes.js";
import formFieldNames from "../fieldNames.js";
import formMixins from "../../formConstraints/formMixins.js";

const passwordFormConfig = new formsOptionsTypes.FormOptions({
    formTitle: 'Password',
    fields: [
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'edit-password',
                type: inputTypes.password,
                label: 'Password',
                name: formFieldNames.edit.password.PASSWORD,
                placeholder: 'Password'
            })
        }),
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'edit-new-password',
                type: inputTypes.password,
                label: 'New password',
                name: formFieldNames.edit.password.NEW_PASSWORD,
                placeholder: 'New password'
            })
        }),
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'edit-new-password-repeat',
                type: inputTypes.password,
                label: 'Repeat password',
                name: formFieldNames.edit.password.NEW_PASSWORD_REPEAT,
                placeholder: 'Repeat new password'
            })
        })
    ],
    submitBtnText: 'Save',
    constraintsMixins: [
        new formMixins.MatchPasswordsMixin(
            formFieldNames.edit.password.NEW_PASSWORD,
            formFieldNames.edit.password.NEW_PASSWORD_REPEAT
        )
    ]
});

export default passwordFormConfig;