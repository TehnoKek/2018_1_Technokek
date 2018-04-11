'use strict';

import formsOptionsTypes from "../configTypes.js";
import inputTypes from "../inputTypes.js";
import formFieldNames from "../fieldNames.js";

const nicknameFormConfig = new formsOptionsTypes.FormOptions({
    formTitle: 'Nickname',
    fields: [
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'edit-nickname',
                type: inputTypes.text,
                label: 'Nickname',
                name: formFieldNames.edit.nickname.NICKNAME,
                placeholder: 'Nickname'
            }),
        })
    ],
    submitBtnText: 'Save',
});

export default nicknameFormConfig;