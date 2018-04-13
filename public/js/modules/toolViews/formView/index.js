'use strict';

import View from "../../view/index.js";
import utiles from "../../../components/utiles.js";
import FormFieldView from "../formFieldView/index.js";
import GLOBAL_FORM_ERROR from "../../../components/formConstraints/globalFormError.js";
import ButtonView from "../buttonView/index.js";
import buttonTypes from "../buttonView/types.js";
import viewNames from "../../viewNames.js";

class FormView extends View {
    constructor({
        name,
        parentName,
        formTitle,
        fields,
        submitBtnText = 'Submit',
        reciverCallback = utiles.noop,
        downButtons = [],
        tmpl = window.formviewTmplTemplate,
        fieldTmpl = window.formfieldviewTmplTemplate,
        constraintsMixins = []
    }) {
        super({
            name: viewNames.FORM(name),
            parentName,
            tmpl
        });

        console.log(`FORM: ${this._name}`);

        this._connectToConstraints(constraintsMixins).
            _initFields(fields, fieldTmpl).
            _initSubmitButton(submitBtnText).
            _setDownButtons(downButtons).
            _setReciverCallback(reciverCallback);

        this._attrs = {
            formTitle,
        };
    }

    _connectToConstraints(constraints) {
        this._constraints = constraints;
        for (let constraint of this._constraints) {
            constraint.connectToForm(this);
        }
        return this;
    }

    _initSubmitButton(submitBtnText) {
        this._submitBtn = new ButtonView({
            parentName: this._name,
            style: buttonTypes.PRIMARY,
            text: submitBtnText,
            events: [{
                name: 'click',
                handler: this._processSubmit.bind(this)
            }]
        });
        return this;
    }

    _initFields(fields, fieldTmpl) {
        this._fields = fields.map((option) => {
            option.tmpl = fieldTmpl;
            option.parentName = this._name;
            return new FormFieldView(option);
        });
        return this;
    }

    _setReciverCallback(callback) {
        this._reciverCallback = callback;
        return this;
    }

    _setDownButtons(downButtons) {
        this._downButtons = downButtons;
        return this;
    }

// ---------------------------------------------------------------------------------
// RENDERING
// ---------------------------------------------------------------------------------

    render() {
        return super.render().
            _insertFields().
            _insertDownButtons();
    }

    _insertFields() {
        const fieldsContainer = this._el.querySelector('.js-fields-section');
        
        for (let field of this._fields) {
            field.render().renderTo(fieldsContainer);
        }

        return this;
    }

    _insertDownButtons() {
        const downButtonsContainer = this._el.querySelector('.js-form-submit-section');
        this._submitBtn.render().renderTo(downButtonsContainer);

        for (let button of this._downButtons) {
            button.render().renderTo(downButtonsContainer);
        }

        return this;
    }

// --------------------------------------------------------------------------
// TEMPLATE OUTPUT AND MANIPULATION
// --------------------------------------------------------------------------

    reset() {
        this._el.reset();

        for (let field of this._fields) {
            field.reset();
        }

        this._resetErrors();        
    }

    _resetErrors() {
        const errorContainer = this._el.querySelector('.js-common-errors');
        errorContainer.textContent = '';
    }

    setValues(values) {
        this.reset();
        
        for (let val of values) {
            const input = this._el.querySelector(`input[name='${val.name}']`);
            input.value = val.value;
        }
    }

    _outputErrors(errors) {
        this._outputGlobalError(errors.global);

        for (let errorName of Object.keys(errors.fields)) {
            this._outputFieldError(errorName, errors.fields[errorName]);
        }
    }

    _outputGlobalError(errors = []) {
        const errorContainer = this._el.querySelector('.js-common-errors');
        for (let error of errors) {
            errorContainer.textContent = error.text;
        }
    }

    _outputFieldError(fieldName, errors = []) {
        const field = this._getFieldByName(fieldName);
        field.reset();
        for (let error of errors) {
            field.error = error.text; 
        }
    }

    _getFieldByName(name) {
        for (let field of this._fields) {
            if (field.fieldName === name) {
                return field;
            }
        }
    }

// --------------------------------------------------------------------------
// VALIDATION
// --------------------------------------------------------------------------

    _isValid() {
        let valid = true;
        
        for (let field of this._fields) {
            const res = field.validate();
            valid = valid && res;
        }

        if (valid) {
            for (let constraint of this._constraints) {
                const resultOfChecking = constraint.check();
                this._setResultOfCheckingConstraint(resultOfChecking);
                valid = valid && resultOfChecking.success;
            }
        }

        return valid;
    }

    _setResultOfCheckingConstraint(result) {
        if (result.success) {
            return;
        }

        if (result.targetField === GLOBAL_FORM_ERROR) {
            this._outputGlobalError([
                { text: result.text }
            ]);
        }
        else {
            this._outputFieldError(result.targetField, [{
                text: result.text
            }]);
        }
    }

// --------------------------------------------------------------------------
// EJECTING
// --------------------------------------------------------------------------

    _processSubmit(evt) {
        evt.preventDefault();

        if (this._isValid()) {
            this._ejectData();
        }
    }

    _ejectData() {
        const formdata = this._fields.reduce((allFields, field) => {
            allFields[field.fieldName] = this._el.elements[field.fieldName].value;
            return allFields;
        }, {});

        this.reset();
        this._reciverCallback({
            data: formdata,
            callback: this._responceHandler.bind(this)
        });
    }

    _responceHandler({
        successful = false,
        errors = {
            global: [],
            fields: {}
        }
    }) {
        if (successful) {
            this.reset();
        }
        else {
            this._outputErrors(errors);
        }
    }
}

export default FormView;
