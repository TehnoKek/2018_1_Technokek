'use strict';

import utils from '../../../../components/utiles.js';
import AbstractForm from '../../../tools/abstractForm/abstractForm.js';
import * as Buttons from '../../../tools/buttons/buttons.js';
import * as Toggling from '../../../tools/toggling/toggling.js';
import profileModel from '../../../../models/profile/model.js';
import utiles from '../../../../components/utiles.js';
import eventBus from '../../../../components/arcitectureElements/eventBus.js';
import profileEvents from '../../../../models/profile/eventsNames.js';
import authFormConfig from '../../../../components/formsOptions/configs/auth.js';
import signupFormConfig from '../../../../components/formsOptions/configs/signup.js';
import formsOptionsTypes from '../../../../components/formsOptions/configTypes.js';


class AuthSignupFormContainer extends Toggling.AbstractTogglingItem {
    constructor({
        selector = '', 
        togglingHandler = utils.noop, 
        childFormOptions = new formsOptionsTypes.FormOptions(), 
        hidden = true,
        changeBtnText = '',
        reciverCallback = utiles.noop
    } = {}) {
        childFormOptions.downButtons = [
            new Buttons.PassiveButton({
                text: changeBtnText,
                events: [
                    {
                        name: 'click',
                        handler: togglingHandler
                    }
                ]
            })
        ];
        childFormOptions.reciverCallback = reciverCallback;

        super({
            selector,
            childElement: new AbstractForm(childFormOptions),
            hidden,
        });        
    }

    toggle() {
        super.toggle();
        if (this._el.hidden) {
            this._child.reset();
        }
    }
}


class AuthSignup extends Toggling.AbstractToggler {
   
    clear() {
        this._el.innerHTML = '';
    }

    render() {
        const template = window.authsignupTmplTemplate();        
        const elements = utiles.htmlToElements(template);

        while (elements.length) {
            this._el.appendChild(elements[0]);
        }

        if (!this._togglingItems) {
            this._createForms();
        }

        for (let item of this._togglingItems) {
            item.render();
        }

        eventBus.on(profileEvents.DEAUTHORIZED(), () => {
            this._el.hidden = false;
        });
        eventBus.on(profileEvents.AUTHORIZED(), () => {
            this._el.hidden = true;
        });
    }

    _createForms() {
        this._togglingItems = [
            new AuthSignupFormContainer({
                selector: '.js-auth-section',
                togglingHandler: this.changeItems.bind(this),
                childFormOptions: authFormConfig,
                reciverCallback: profileModel.auth.bind(profileModel),
                hidden: false,
                changeBtnText: 'Registration!'
            }),

            new AuthSignupFormContainer({
                selector: '.js-signup-section',
                togglingHandler: this.changeItems.bind(this),
                childFormOptions: signupFormConfig,
                reciverCallback: profileModel.signup.bind(profileModel),
                hidden: true,
                changeBtnText: 'Login!'
            })
        ];
    }
}

export default AuthSignup;
