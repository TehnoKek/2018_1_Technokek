'use strict';

import GLOBAL_FORM_ERROR from "./globalFormError.js";

class FormConstraintResultOfChecking {
    constructor({
        success = true,
        targetField = GLOBAL_FORM_ERROR,
        text = ''
    } = {}) {
        Object.assign(this, arguments[0]);
    }
}

const resultOfChecking = {
    FormConstraintResultOfChecking
};

export default resultOfChecking;