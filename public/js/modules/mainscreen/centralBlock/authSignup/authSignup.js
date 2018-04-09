'use strict';

import AbstractForm from '../../../tools/abstractForm/abstractForm.js';
import * as Buttons from '../../../tools/buttons/buttons.js';
import * as Toggling from '../../../tools/toggling/toggling.js';
import profileModel from '../../../../models/profile/model.js';
import utiles from '../../../../components/utiles.js';
import eventBus from '../../../../components/arcitectureElements/eventBus.js';
import profileEvents from '../../../../models/profile/eventsNames.js';
import authFormConfig from '../../../../components/formsOptions/configs/auth.js';
import signupFormConfig from '../../../../components/formsOptions/configs/signup.js';

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
        authFormConfig.downButtons = [
            new Buttons.PassiveButton({
                text: 'Registration!',
                events: [
                    {
                        name: 'click',
                        handler: this.changeItems.bind(this),
                    }
                ]
            })
        ];
        authFormConfig.reciverCallback = profileModel.auth.bind(profileModel);

        signupFormConfig.downButtons = [
            new Buttons.PassiveButton({
                text: 'Login!',
                events: [
                    {
                        name: 'click',
                        handler: this.changeItems.bind(this),
                    }
                ]
            })
        ];
        signupFormConfig.reciverCallback = profileModel.signup.bind(profileModel);

        this._togglingItems = [
            new Toggling.AbstractTogglingItem({
                selector: '.js-auth-section',
                childElement: new AbstractForm(authFormConfig),
                hidden:false,
            }),
            new Toggling.AbstractTogglingItem({
                selector: '.js-signup-section',
                childElement: new AbstractForm(signupFormConfig),
                hidden:true,
            }),
        ];
    }
}

export default AuthSignup;
