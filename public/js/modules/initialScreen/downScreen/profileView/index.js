'use strict';

import SectionView from "../../../toolViews/sections/sectionView/index.js";
import ButtonView from "../../../toolViews/buttonView/index.js";
import buttonTypes from "../../../toolViews/buttonView/types.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import profileEvents from "../../../../models/profile/eventsNames.js";

const modes = {
    SHOW: 0,
    EDIT: 1
};

class ProfileView extends SectionView {

// -----------------------------------------------------------------------
// CREATING
// -----------------------------------------------------------------------

    constructor({ tabModel }) {
        super({
            tabModel,
            tmpl: window.profileviewTmplTemplate
        });

        this._connectoToEventBus().
            _initButtons().
            _initSections();
    }

    _connectoToEventBus() {
        eventBus.on(profileEvents.AUTHORIZED(), (data) => {
            this._toShowMode()._updateTmplData(data);
        });
        eventBus.on(profileEvents.DATA_CHANGED(), this._updateTmplData.bind(this));
        eventBus.on(profileEvents.DEAUTHORIZED(), this._updateTmplData.bind(this));
        return this;
    }

    _initButtons() {
        this._editBtn = new ButtonView({
            parentName: this._name,
            text: 'Edit profile',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    this._toEditMode();
                }
            }],
            style: buttonTypes.PRIMARY
        });

        this._stopEditBtn = new ButtonView({
            text: 'To profile',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    this._toShowMode();
                }
            }],
            style: buttonTypes.PRIMARY
        });

        this._logoutBtn = new ButtonView({
            text: 'Logout',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    eventBus.call(profileEvents.LOGOUT());
                }
            }]
        });

        return this;
    }

    _initSections() {
        return this;        
    }

// -----------------------------------------------------------------------
// MODES MANIPULATION
// -----------------------------------------------------------------------    

    _toEditMode() {
        this._mode = modes.EDIT;
        return this._editElementsActive(true).
                    _showElementsActive(false);
    }

    _toShowMode() {
        this._mode = modes.SHOW;
        return this._editElementsActive(false).
                    _showElementsActive(true);
    }

    _switchMode() {
        switch(this._mode) {
            case modes.SHOW: 
                this._toShowMode();
                break;
            default:
                this._toEditMode();
                break;
        }

        return this;
    }

    _editElementsActive(val) {
        val = Boolean(val);
        const method = val ? 'show' : 'hide';
        // this._editSection[method]();
        this._stopEditBtn[method]();
        return this;
    }

    // задать свойство hidden все элементам, отвечающим за отображение пользовательской информации
    _showElementsActive(val) {
        val = Boolean(val);
        const method = val ? 'show' : 'hide';
        // this._historySection.switch(val);
        this._editBtn[method]();
        this._el.querySelector('.js-personal-info').hidden = val;
    }

// -----------------------------------------------------------------------
// DATA UPDATING
// -----------------------------------------------------------------------    

    _updateTmplData({
        email = '',
        nickname = '',
        games = 0,
        score = 0
    } = {}) {
        const fieldClasses = {
            '.js-email-field': email,
            '.js-nickname-field': nickname,
            '.js-games-field': games,
            '.js-score-field': score
        };

        for (let field of Object.keys(fieldClasses)) {
            this._updateTmplField(field, fieldClasses[field]);
        }
    }

    _updateTmplField(fieldName, value) {
        const field = this._el.querySelector(fieldName);
        field.textContent = value;
    }

// -----------------------------------------------------------------------
// RENDERING
// -----------------------------------------------------------------------    

    render() {
        super.render().
            _renderButtons().
            _renderSections().
            _switchMode();
    }

    _renderButtons() {
        const editBtnContainer = this._el.querySelector('.js-edit-btn-section');
        this._editBtn.render().renderTo(editBtnContainer);
        this._stopEditBtn.render().renderTo(editBtnContainer);
        
        const logoutBtnContainer = this._el.querySelector('.js-logout-btn-section');
        this._logoutBtn.render().renderTo(logoutBtnContainer);
        return this;
    }

    _renderSections() {
        return this;
    }
}

export default ProfileView;