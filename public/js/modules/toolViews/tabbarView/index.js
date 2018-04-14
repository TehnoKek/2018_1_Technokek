'use strict';

import tabbarManager from "../../../models/tabbar/manager.js";
import tabTypes from "./types.js";
import View from "../../view/index.js";
import TabView from "./tabView.js";
import viewNames from "../../viewNames.js";

class TabbarView extends View {
    constructor({
        parentName = '',
        tabbarOptions = {},
        tabType = tabTypes.TAB_LG
    } = {}) {
        super({
            parentName,
            name: viewNames.TABBAR(tabbarManager.get(tabbarOptions)),
            tmpl: window.tabbarviewTmplTemplate,
        });

        this._tabbarModel = tabbarManager.get(tabbarOptions);
        this._tabs = this._tabbarModel.tabs.map((tabModel) => 
            new TabView({ tabModel, tabType })
        );
    }

    render() { 
        super.render();
        for (let tab of this._tabs) {
            tab.render().renderTo(this._el);
        }
        return this;
    }

    get element() {
        return this._el;
    }
}

export default TabbarView;