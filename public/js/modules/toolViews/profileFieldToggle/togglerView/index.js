'use strict';

import View from "../../../view/index.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import profileEvents from "../../../../models/profile/eventsNames.js";
import ProfileFieldView from "../infoView/index.js";
import editFormsConfig from "../../../../components/formsOptions/configs/editForms.js";
import profileModel from "../../../../models/profile/model.js";
import ProfileFieldTogglingItemView from "../togglingItemView/index.js";
import togglerManager from "../../toggler/manager.js";
import viewNames from "../../../viewNames.js";
import FormView from "../../formView/index.js";
import formFieldNames from "../../../../components/formsOptions/fieldNames.js";


class ProfileFieldTogglerView extends View {
    constructor({
        parentName,
        fieldName
    }) {
        super({
            tmpl: window.profilefieldtogglerViewTemplate,
            name: viewNames.PROFILE_FIELD_TOGGLER(fieldName),
            parentName
        });

        this._initViewChild(fieldName).
            _initFormChild(fieldName);

        eventBus.on(profileEvents.DATA_CHANGED(), this._toViewMode.bind(this));
    }

    _initViewChild(fieldName) {
        const viewChildInner = new ProfileFieldView({
            fieldName,
            parentName: this._name
        });
        this._viewChild = new ProfileFieldTogglingItemView({
            parentName: this._name,
            child: viewChildInner,
            togglingBtnText: 'Edit',
            togglingBtnListener: togglerManager.toggle(this._name),

        });

        return this;
    }

    _initFormChild(fieldName) {
        const formsOptions = editFormsConfig[fieldName];
        formsOptions.tmpl = window.editmodeTmplTemplate;
        formsOptions.fieldTmpl = window.editinputTmplTemplate;

        switch (fieldName) {
            case formFieldNames.edit.email.EMAIL:
                formsOptions.reciverCallback = profileModel.changeEmail.bind(profileModel);
                break;
            case formFieldNames.edit.nickname.NICKNAME:
                formsOptions.reciverCallback = profileModel.changeNickname.bind(profileModel);
                break;
            case formFieldNames.edit.password.PASSWORD:
                formsOptions.reciverCallback = profileModel.changePassword.bind(profileModel);
                break;
            default:
                break;
        }

        const formChildInner = new FormView(formsOptions);
        this._formChild = new ProfileFieldTogglingItemView({
            parentName: this._name,
            child: formChildInner,
            togglingBtnText: 'Cancel',
            togglingBtnListener: togglerManager.toggle(this._name)
        });

        return this;
    }

    render() {
        super.render();

        this._formChild.render().renderTo(this._el);
        this._viewChild.render().renderTo(this._el);

        console.log('render: ', this._name, this._formChild, this._viewChild);

        togglerManager.add({
            name: this._name,
            nodes: [],
            views: [
                this._formChild,
                this._viewChild
            ]
        });

        console.log(this._name);   

        return this._toViewMode();
    }

    _toViewMode() {
        this._formChild.hide();
        this._viewChild.show();
        return this;
    }
}

export default ProfileFieldTogglerView;