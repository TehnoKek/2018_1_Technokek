'use strict';

import formsOptionsTypes from "../configTypes.js";
import inputTypes from "../inputTypes.js";
import formFieldNames from "../fieldNames.js";

const nicknameFormConfig = new formsOptionsTypes.FormOptions({
    fields: [
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'edit-nickname',
                type: inputTypes.text,
                label: 'Nickaname',
                name: formFieldNames.edit.nickname.NICKNAME,
                placeholder: 'Nickname'
            }),
        })
    ],
    submitBtnText: 'Save',
});

export default nicknameFormConfig;