'use strict';

import View from "../../view/index.js";

import * as constrs from '../../../components/constraints.js';

class FormFieldView extends View {
    
    constructor({
        name = '',
        parentName = '',
        tmpl = window.fieldviewTmplTemplate,
        
        constraints = [ 
            new constrs.Required()
        ],
        options = {
            type: '',
            id: '',
            name: '',
            label: '',
            placeholder: '',
            value: ''
        },
        messages = {
            error: '',
            message: ''
        },
    } = {}) {
        super({
            name, 
            parentName, 
            tmpl
        });

        this._constraints = constraints;
        this._attrs = { options, messages };
    }

// ----------------------------------------------------------------------------
// getters
// ----------------------------------------------------------------------------

    get element() {
        return this._el;
    }

    get fieldName() {
        return this._attrs.options.name;
    }

    get value() {
        return this._el.querySelector('input').value;
    }

    get error() {
        return this._getSelectorTextContent('.js-field-error');
    }

    get message() {
        return this._getSelectorTextContent('.js-field-message');
    }

// ----------------------------------------------------------------------------
// setters
// ----------------------------------------------------------------------------

    set value(val) {
        this._el.querySelector('input').value = val;
    }

    set error(val) {
        this._setSelectorTextContent('.js-field-error', val);
    }

    set message(val) {
        this._setSelectorTextContent('.js-field-message', val);
    }

    reset() {
        this.value = '';
        this.error = '';
        this.message = '';
    }

// ----------------------------------------------------------------------------
// validation
// ----------------------------------------------------------------------------
    
    validate() {
        this.error = '';

        let isValid = true;

        for (let constraint of this._constraints) {
            if (!constraint.check(this.value)) {
                this.error = constraint.text;
                isValid = false;
            }
        }

        return isValid;
    }

// ----------------------------------------------------------------------------
// private
// ----------------------------------------------------------------------------

    _getSelectorTextContent(selector) {
        return this._el.querySelector(selector).textContent;
    }

    _setSelectorTextContent(selector, newValue) {
        this._el.querySelector(selector).textContent = newValue;
    }
}

export default FormFieldView;