'use strict';

import SectionView from "../../../toolViews/sections/sectionView/index.js";
import ButtonView from "../../../toolViews/buttonView/index.js";
import buttonTypes from "../../../toolViews/buttonView/types.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import profileEvents from "../../../../models/profile/eventsNames.js";
import EditSection from "./editSection/index.js";
import HistorySection from "./historySection/index.js";
import viewNames from "../../../viewNames.js";
import profileModel from "../../../../models/profile/model.js";
import router from "../../../../components/router/router.js";
import routerPaths from "../../../../components/router/routerPaths.js";
import routerEvents from "../../../../components/router/routerEvents.js";

const modes = {
    EDIT: 'edit',
    SHOW: 'show'
};

class ProfileView extends SectionView {

// -----------------------------------------------------------------------
// CREATING
// -----------------------------------------------------------------------

    constructor({ tabModel }) {
        super({
            tabModel,
            tmpl: window.profileViewTemplate
        });

        this._connectoToEventBus().
            _initButtons().
            _initSections();
    }

// -----------------------------------------------------------------------
// CREATE AND INIT
// -----------------------------------------------------------------------    

    initRoutable() {
        this._editModeName = viewNames.VIEW_MODE(this._name, modes.EDIT);
        this._showModeName = viewNames.VIEW_MODE(this._name, modes.SHOW);

        router.register({
            path: routerPaths.USER,
            name: this._showModeName
        });

        return this._initRoutableByName(this._editModeName).
            _initRoutableByName(this._showModeName);
    }

    _connectoToEventBus() {
        eventBus.on(
            profileEvents.AUTHORIZED(), (data) => {
            return this._toShowMode()._updateTmplData(data);
        }).on(
            profileEvents.DATA_CHANGED(), this._updateTmplData.bind(this)
        ).on(
            profileEvents.DEAUTHORIZED(), this._updateTmplData.bind(this)
        );
        return this;
    }

    _initButtons() {
        this._editBtn = new ButtonView({
            parentName: this._showModeName,
            text: 'Edit profile',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    eventBus.call(routerEvents.ROUTER_OPEN_PATH(
                        routerPaths.USER_EDIT
                    ));
                }
            }],
            style: buttonTypes.PRIMARY
        });

        this._logoutBtn = new ButtonView({
            parentName: this._showModeName,            
            text: 'Logout',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    eventBus.call(profileEvents.LOGOUT());
                }
            }],
            style: buttonTypes.PASSIVE
        });

        this._stopEditBtn = new ButtonView({
            parentName: this._editModeName,            
            text: 'To profile',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    eventBus.call(routerEvents.ROUTER_OPEN_PATH(
                        routerPaths.USER
                    ));
                }
            }],
            style: buttonTypes.PRIMARY
        });


        return this;
    }

    _initSections() {
        this._editSection = new EditSection({ 
            parentName: viewNames.VIEW_MODE(this._name, modes.EDIT) 
        });
        this._historySection = new HistorySection({ 
            parentName: viewNames.VIEW_MODE(this._name, modes.SHOW) 
        });
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
        // const method = val ? 'show' : 'hide';
        // this._editSection[method]();
        // this._stopEditBtn[method]();
        return this;
    }

    // задать свойство hidden все элементам, отвечающим за отображение пользовательской информации
    _showElementsActive(val) {
        val = Boolean(val);
        // const method = val ? 'show' : 'hide';
        // this._historySection[method]();
        // this._editBtn[method]();
        // this._logoutBtn[method]();
        this._el.querySelector('.js-personal-info').hidden = !val;
        return this;
    }

// -----------------------------------------------------------------------
// DATA UPDATING
// -----------------------------------------------------------------------    

    _updateTmplData({
        email = '',
        nickname = '',
        games_number = 0,
        score = 0
    } = {}) {

        const fieldClasses = {
            '.js-email-field': email,
            '.js-nickname-field': nickname,
            '.js-games-field': games_number,
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
        return super.render().
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

        const sectionsContainer = this._el.querySelector('.js-profile-center');
        this._editSection.render().renderTo(sectionsContainer);
        this._historySection.render().renderTo(sectionsContainer);
        return this;
    }

    _renderSections() {
        return this;
    }

    show(name) {
        if (super.show().allowed()) {
            if (name === this._showModeName) {
                this._toShowMode();
            }
            else {
                this._toEditMode();
            }
        }
        return this;
    }

    allowed() {
        return profileModel.authenticated;
    }
}

export default ProfileView;