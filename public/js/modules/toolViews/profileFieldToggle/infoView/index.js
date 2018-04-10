'use strict';

import View from "../../../view/index.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import profileEvents from "../../../../models/profile/eventsNames.js";
import profileModel from "../../../../models/profile/model.js";
import editFormsConfig from "../../../../components/formsOptions/configs/editForms.js";
import viewNames from "../../../viewNames.js";

class ProfileFieldView extends View {
    constructor({ 
        fieldName,
        parentName,
    } = {}) {
        
        super({
            name: viewNames.PROFILE_FEILD_INFO(fieldName),
            parentName,
            tmpl: window.profilefieldinfoViewTemplate
        });
        this._attrs = { 
            label: editFormsConfig[fieldName].formTitle,
            fieldName
        };
        eventBus.on(profileEvents.DATA_CHANGED(), this._reloadValue.bind(this));
        eventBus.on(profileEvents.AUTHORIZED(), this._reloadValue.bind(this));
    }

    render() {
        return super.render()._reloadValue();
    }

    _reloadValue() {
        this._el.querySelector('.js-field-value').textContent = profileModel.get(this._attrs.fieldName);
        return this;
    }
}

export default ProfileFieldView;