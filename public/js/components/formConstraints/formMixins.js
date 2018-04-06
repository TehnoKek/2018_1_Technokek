'use sctrict';

import resultOfChecking from './resultOfChecking.js';
import constraintsTexts from './constraintsTexts.js';

class MatchPasswordsMixin {
    constructor(passwordFieldName, passwordRepeatFieldName) {
        this._passwordFieldName = passwordFieldName;
        this._passwordRepeatFieldName = passwordRepeatFieldName;
    }

    connectToForm(form) {
        this._form = form;
    }

    get text () {
        return constraintsTexts.passwordsDontMatch;
    }

    check() {
        const passwordField = this._form._getFieldByName(this._passwordFieldName);
        const passwordRepeatField = this._form._getFieldByName(this._passwordRepeatFieldName);
        const areMatch = passwordField.value === passwordRepeatField.value;
        
        if (!areMatch) {
            return new resultOfChecking.FormConstraintResultOfChecking({
                success: false, // просто для наглядности. ясно, что можно передать areMatch
                targetField: this._passwordRepeatFieldName,
                text: this.text
            });
        }

        return new resultOfChecking.FormConstraintResultOfChecking({
            success: true
        });
    }
}

const formMixins = {
    MatchPasswordsMixin
};

export default formMixins;