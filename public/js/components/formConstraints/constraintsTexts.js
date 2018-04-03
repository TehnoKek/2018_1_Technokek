'use strict';

const constraintsTexts = {
    required: 'This field is required',
    minLength: (value) => `The minimum length is ${value} symbols`,
    maxLength: (value) => `The maximum length is ${value} symbols`,
    passwordsDontMatch: 'Passwords do not match'
};

export default constraintsTexts;