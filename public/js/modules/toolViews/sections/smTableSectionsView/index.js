'use strict';

import View from "../../../view/index.js";
import tabbarManager from "../../../../models/tabbar/manager.js";
import TabbarView from "../../tabbarView/index.js";
import tabTypes from "../../tabbarView/types.js";
import SectionsBarView from "../sectionsBarView/index.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../../models/tabbar/eventsNames.js";

class SMTableSectionsView extends View {
    constructor({
        parentName,
        tabbarOptions
    }) {
        super({
            parentName,
            name: `smTableSectionsView:${tabbarOptions.name}`,
            tmpl: window.smtablesectionsViewTemplate,
        });

        this._tabbarOptions = tabbarOptions;
        this._tabbarModel = tabbarManager.get(tabbarOptions);
        this._initTabbar()._initSectionsBar();
    }

    _initTabbar() {
        this._tabbar = new TabbarView({
            parentName: this._name,
            tabbarOptions: this._tabbarOptions,
            tabType: tabTypes.TAB_SM
        });
        return this;
    }

    _initSectionsBar() {
        this._sections = new SectionsBarView({
            parentName: this._name,
            tabbarModel: this._tabbarModel,
            tmpl: window.smtablesectionsbarViewTemplate
        });
        return this;
    }

    render() {
        super.render();
        this._tabbar.render().renderTo(this._el);
        this._sections.render().renderTo(this._el);
        return this;
    }

    hide() {
        super.hide();
        // eventBus.call(tabbarEvents.DEACTIVATE_ALL({ tabbarName: this._tabbarModel.name }));
        return this;
    }
} 

export default SMTableSectionsView;