'use strict';

import View from "../../../../view/index.js";
import viewNames from "../../../../viewNames.js";
import FormView from "../../../../toolViews/formView/index.js";
import authFormConfig from "../../../../../components/formsOptions/configs/auth.js";
import signupFormConfig from "../../../../../components/formsOptions/configs/signup.js";
import profileModel from "../../../../../models/profile/model.js";
import ButtonView from "../../../../toolViews/buttonView/index.js";
import buttonTypes from "../../../../toolViews/buttonView/types.js";
import togglerManager from "../../../../toolViews/toggler/manager.js";
import eventBus from "../../../../../components/arcitectureElements/eventBus.js";
import router from "../../../../../components/router/router.js";
import routerPaths from "../../../../../components/router/routerPaths.js";
import profileEvents from "/js/models/profile/eventsNames.js";
const modes = {
    AUTH: 'auth',
    SIGNUP: 'signup'
};

class AuthSignupCol extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.AUTH_SIGNUP_COL,
            parentName,
            tmpl: window.authsignupcolTmplTemplate
        });

        this._initAuthForm().
            _initSignupForm();
    }

    _initAuthForm() {
        authFormConfig.name = viewNames.AUTH_FORM;
        authFormConfig.parentName = this._authName;
        authFormConfig.reciverCallback = profileModel.auth.bind(profileModel);
        authFormConfig.downButtons = [
            new ButtonView({
                parentName: this._authName,
                text: 'Registration!',
                events: [{
                    name: 'click',
                    handler: togglerManager.toggle(this._name)
                }],
                style: buttonTypes.PASSIVE
            })
        ];

        this._authForm = new FormView(authFormConfig);
        return this;
    }

    _initSignupForm() {
        signupFormConfig.name = viewNames.SIGNUP_FORM;
        signupFormConfig.parentName = this._signupName;
        signupFormConfig.reciverCallback = profileModel.signup.bind(profileModel);
        signupFormConfig.downButtons = [
            new ButtonView({
                parentName: this._signupName,
                text: 'Login!',
                events: [{
                    name: 'click',
                    handler: togglerManager.toggle(this._name)
                }],
                style: buttonTypes.PASSIVE
            })
        ];

        this._signupForm = new FormView(signupFormConfig);
        return this;
    }

    render() {
        super.render();

        this._authFormContainer = this._el.querySelector('.js-auth-form-container');
        this._authForm.render().renderTo(this._authFormContainer);
        this._authFormContainer.hidden = false;

        this._signupFormContainer = this._el.querySelector('.js-signup-form-container');
        this._signupForm.render().renderTo(this._signupFormContainer);
        this._signupFormContainer.hidden = true;


        togglerManager.add({
            name: this._name,
            nodes: [
                this._authFormContainer,
                this._signupFormContainer
            ]
        });

        return this;
    }

    _initAllowingDependencies() {

        eventBus.on(profileEvents.AUTHORIZED(), this.hide.bind(this)).
            on(profileEvents.DEAUTHORIZED(), this.show.bind(this));

        return this;
    }

    show(name) {
        super.show();
        if (name === this._signupName) {
            if (this._authFormContainer.hidden) {
                togglerManager.toggle(this._name);
            }
        }
        else {
            if (this._signupFormContainer.hidden) {
                togglerManager.toggle(this._name);
            }
        }
        return this;
    }
}

export default AuthSignupCol;