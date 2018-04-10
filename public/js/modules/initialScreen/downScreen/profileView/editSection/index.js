'use strict';

import View from "../../../../view/index.js";
import viewNames from "../../../../viewNames.js";
import ProfileFieldTogglerView from "../../../../toolViews/profileFieldToggle/togglerView/index.js";
import formFieldNames from "../../../../../components/formsOptions/fieldNames.js";

class EditSection extends View {
    constructor({ parentName }) {
        super({
            parentName,
            name: viewNames.EDIT_SECTION,
            tmpl: window.editsection1TmplTemplate
        });
        
        this._nicknameEditToggler = new ProfileFieldTogglerView({
            parentName: this._name,
            fieldName: formFieldNames.edit.nickname.NICKNAME
        });
        this._emailEditToggler = new ProfileFieldTogglerView({
            parentName: this._name,
            fieldName: formFieldNames.edit.email.EMAIL
        });
        this._passwordEditToggler = new ProfileFieldTogglerView({
            parentName: this._name,
            fieldName: formFieldNames.edit.password.PASSWORD
        });
    }

    render() {
        super.render();

        const togglersContainer = this._el.querySelector('.js-edit-fields-list');
        this._emailEditToggler.render().renderTo(togglersContainer);
        this._nicknameEditToggler.render().renderTo(togglersContainer);
        this._passwordEditToggler.render().renderTo(togglersContainer);

        return this;
    }
}

export default EditSection;