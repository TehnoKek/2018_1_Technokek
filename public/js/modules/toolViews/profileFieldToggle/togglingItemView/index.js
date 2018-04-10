'use strict';

import View from "../../../view/index.js";
import utiles from "../../../../components/utiles.js";
import ButtonView from "../../buttonView/index.js";
import buttonTypes from "../../buttonView/types.js";
import viewNames from "../../../viewNames.js";

class ProfileFieldTogglingItemView extends View {
    constructor({
        parentName = '',
        fieldName = '',
        child = {},
        togglingBtnText = '',
        togglingBtnListener = utiles.noop
    } = {}) {
        super({
            parentName,
            name: viewNames.PROFILE_FIELD_CONTAINER(fieldName, togglingBtnText),
            tmpl: window.profilefieldtogglingitemViewTemplate // АААААА божечки
        });
        this._btnListener = togglingBtnListener;
        this._initChangeButton(togglingBtnText);
        this._child = child; 
    }

    _initChangeButton(btnText) {
        this._changeBtn = new ButtonView({
            parentName: this._name,
            text: btnText,
            events: [{
                name: 'click',
                handler: this._toggle.bind(this)
            }],
            style: buttonTypes.PASSIVE
        });
    }

    render() {
        super.render();
        const btnContainer = this._el.querySelector('.js-edit-container-params');
        const contentContainer = this._el.querySelector('.js-edit-container-content');
        
        
        this._changeBtn.render().renderTo(btnContainer);
        this._child.render().renderTo(contentContainer);
        return this;
    }

    _toggle(evt) {
        evt.preventDefault();
        this._btnListener();
        if (this._child.reset) {
            this._child.reset();
        }
    }
}

export default ProfileFieldTogglingItemView;