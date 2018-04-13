'use strict';

import View from "../view/index.js";
import viewNames from "../viewNames.js";
// import MainScreen from "./mainScreen/index.js";
import SectionsBarView from "../toolViews/sections/sectionsBarView/index.js";
import tabbarManager from "../../models/tabbar/manager.js";
import tabbarsOptions from "../../components/globalData/tabbarsOptions.js";
import router from "../../components/router/router.js";
import routerPaths from "../../components/router/routerPaths.js";
import TabbarView from "../toolViews/tabbarView/index.js";
import tabTypes from "../toolViews/tabbarView/types.js";

class InitialScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.INITIAL_SCREEN,
            parentName,
            tmpl: window.initialscreenTmplTemplate,
        });

        // this._mainScreen = new MainScreen({ parentName: this.name });
        this._tabbar = new TabbarView({ parentName: this._name, tabType: tabTypes.TAB_LG, tabbarOptions: tabbarsOptions.MAIN });
        this._downScreen = new SectionsBarView({ 
            parentName: this.name,
            tabbarModel: tabbarManager.get(tabbarsOptions.MAIN),
            tmpl: window.downscreen1TmplTemplate 
        });        
    }

    render() {
        super.render();

        this._tabbar.render().renderTo(this._el);
        this._downScreen.render().renderTo(this._el);
        
        return this;
    }
}

export default InitialScreen;
