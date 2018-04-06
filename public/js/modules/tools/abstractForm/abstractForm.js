'use strict';

import * as Buttons from '../buttons/buttons.js';
import utiles from '../../../components/utiles.js';
import * as constrs from '../../../components/constraints.js';
import GLOBAL_FORM_ERROR from '../../../components/formConstraints/globalFormError.js';

class Field {
    
    constructor({
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
        templateFunction = window.fieldTmplTemplate,
        constraints = [ 
            new constrs.Required()
        ]
    } = {}) {
        this._constraints = constraints;
        this._options = options;
        this._messages = messages;
        this._templateFunction = templateFunction;
    }

// ----------------------------------------------------------------------------
// getters
// ----------------------------------------------------------------------------

    render() {
        const template = this._templateFunction({ 
            field: this._options,
            messages: this._messages
        });
        this._el = utiles.htmlToElements(template)[0];
    } 

    get element() {
        return this._el;
    }

    get name() {
        return this._options.name;
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

    set templateFunction(value) {
        this._templateFunction = value;
    }

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

class AbstractForm {
    constructor({
        formTitle = '',
        fields = [],
        submitBtnText = 'Submit',
        reciverCallback = utiles.noop,
        downButtons = [],
        templateFunction = window.abstractformTmplTemplate,
        fieldTemplateFunction = window.fieldTmplTemplate,
        constraintsMixins = []
    } = {}) {
        this._connectToConstraints(constraintsMixins);

        const template = templateFunction({ formTitle });
        this._el = utiles.htmlToElements(template)[0];

        this._submitBtn = new Buttons.PrimaryButton({
            text: submitBtnText,
            events: [{
                name: 'click',
                handler: this._processSubmit.bind(this)
            }]
        });
        this._fields = fields.map((option) => {
            const field = new Field(option);
            field.templateFunction = fieldTemplateFunction;
            return field;
        });
        this._downButtons = downButtons;
        this._reciverCallback = reciverCallback;
    }

    render() {
        this._insertDownButtons();
        this._insertFields();
    }

    get element() {
        return this._el;
    }

    get buttons() {
        return this._downButtons;
    }

    reset() {
        this._el.reset();

        for (let field of this._fields) {
            field.reset();
        }

        this._resetErrors();
    }

    setValues(values) {
        this.reset();
        
        for (let val of values) {
            const input = this._el.querySelector(`input[name='${val.name}']`);
            input.value = val.value;
        }
    }

    // Добавляет примеси валидации к форме
    _connectToConstraints(constraints) {
        this._constraints = constraints;
        for (let constraint of this._constraints) {
            constraint.connectToForm(this);
        }
    }

    // Валидация формы
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

    // Добавляет в шаблон результат проверки ограничения
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

    // Отправляет данные формы в соответствующий callback
    _ejectData() {    
        const formdata = this._fields.reduce((allFields, field) => {
            allFields[field.name] = this._el.elements[field.name].value;
            return allFields;
        }, {});

        this.reset();
        this._reciverCallback({
            data: formdata,
            callback: this._responceHandler.bind(this)
        });
    }

    // callback для получения результата выполнения формы
    _responceHandler({
        successful = false,
        errors = {
            global: [],
            fields: {}
        }
    } = {}) {
        if (successful) {
            this.reset();
        }
        else {
            this._outputErrors(errors);
        } 
    }

    // Вывод ошибок в форму
    _outputErrors(errors) {
        this._outputGlobalError(errors.global);

        for (let errorName of Object.keys(errors.fields)) {
            this._outputFieldError(errorName, errors.fields[errorName]);
        }
    }

    // Выводит в шаблон глобальную ошибку
    _outputGlobalError(errors = []) {
        const errorContainer = this._el.querySelector('.js-common-errors');
        for (let error of errors) {
            errorContainer.textContent = error.text;
        }
    }

    // Выводит в шаблон ошибку поля
    _outputFieldError(fieldName, errors = []) {
        const field = this._getFieldByName(fieldName);
        field.reset();
        for (let error of errors) {
            field.error = error.text; 
        }
    }

    // сбрасывает глобальные ошибки
    _resetErrors() {
        const errorContainer = this._el.querySelector('.js-common-errors');
        errorContainer.textContent = '';
    }

    // на событие отправки формы
    _processSubmit(evt) {
        evt.preventDefault();
        
        if (this._isValid()) {
            this._ejectData();
        }
    }

    _insertDownButtons() {
        const downButtonsContainer = this._el.querySelector('.js-form-submit-section');
        
        downButtonsContainer.appendChild(this._submitBtn.element);

        for (let button of this._downButtons) {
            downButtonsContainer.appendChild(button.element);
        }
    }

    _insertFields() {
        const fieldsSelector = this._el.querySelector('.js-fields-section');

        for (let field of this._fields) {
            field.render();
            fieldsSelector.appendChild(field.element);
        }
    }

    _getFieldByName(name) {
        for (let field of this._fields) {
            if (field.name === name) {
                return field;
            }
        }
    }
}

export default AbstractForm;