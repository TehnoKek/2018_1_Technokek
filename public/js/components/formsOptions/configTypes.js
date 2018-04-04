'use strict';

import utiles from "../utiles.js";

class FormFieldOptions {
    constructor({
        type = '',
        id = '',
        name = '',
        label = '',
        placeholder = '',
        value = ''
    } = {}) {
        Object.assign(this, arguments[0]);
    }
}

class FormFieldMessages {
    constructor({
        error = '',
        message = ''
    } = {}) {
        Object.assign(this, arguments[0]);
    }
}

class FormField {
    constructor ({
        options = new FormFieldOptions(),
        templateFunction = utiles.noop,
        messages = new FormFieldMessages(),
        constraints = []
    }) {
        Object.assign(this, arguments[0]);
    }
}

class FormOptions {
    constructor({
        formTitle = '',
        fields = [],
        submitBtnText = '',
        downButtons = [],
        constraintsMixins = [],
        reciverCallback = utiles.noop
    } = {}) {
        Object.assign(this, arguments[0]);
    }
}

const formsOptionsTypes = {
    field: {
        Options: FormFieldOptions,
        Messages: FormFieldMessages,
        Base: FormField
    },
    FormOptions
};

export default formsOptionsTypes;