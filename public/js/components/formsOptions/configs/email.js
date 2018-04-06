'use strict';

import formsOptionsTypes from "../configTypes.js";
import inputTypes from "../inputTypes.js";
import formFieldNames from "../fieldNames.js";

const emailFormConfig = new formsOptionsTypes.FormOptions({
    fields: [
        new formsOptionsTypes.field.Base({
            options: new formsOptionsTypes.field.Options({
                id: 'edit-email',
                type: inputTypes.email,
                label: 'Email',
                name: formFieldNames.edit.email.EMAIL,
                placeholder: 'Email'
            }),
        }),
    ],
    submitBtnText: 'Save',
});

export default emailFormConfig;