'use strict';

import View from "../view/index.js";
import viewNames from "../viewNames.js";
import MainScreen from "./mainScreen/index.js";
import SectionsBarView from "../toolViews/sections/sectionsBarView/index.js";
import tabbarManager from "../../models/tabbar/manager.js";
import tabbarsOptions from "../../components/globalData/tabbarsOptions.js";

class InitialScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.INITIAL_SCREEN,
            parentName,
            tmpl: window.initialscreenTmplTemplate,
        });

        this._mainScreen = new MainScreen({ parentName: this.name });
        this._downScreen = new SectionsBarView({ 
            parentName: this.name,
            tabbarModel: tabbarManager.get(tabbarsOptions.MAIN),
            tmpl: window.downscreen1TmplTemplate 
        });        

        //this._downScreen = new SectionsBar({ parentName: this._name });
    }

    render() {
        super.render();

        this._mainScreen.render().renderTo(this._el);
        this._downScreen.render().renderTo(this._el);
        
        // const downScreenContainer = this._el.querySelector('.js-down-screen-container');
        // this._downScreen.render().renderTo(downScreenContainer);

        return this;
    }
}

export default InitialScreen;
