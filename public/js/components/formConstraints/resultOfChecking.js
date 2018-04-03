'use strict';

import GLOBAL_FORM_ERROR from "./globalFormError.js";

class FormConstraintResultOfChecking {
    constructor({
        success = true,
        targetField = GLOBAL_FORM_ERROR,
        text = ''
    } = {}) {
        this._data = arguments[0];
    }
    
    get success() {
        return this._data.success;
    }

    get targetField() {
        return this._data.targetField;
    }

    get text() {
        return this._data.text;
    }
}

const resultOfChecking = {
    FormConstraintResultOfChecking
};

export default resultOfChecking;