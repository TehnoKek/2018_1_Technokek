'use strict';

import View from "../../../view/index.js";
import viewNames from "../../../viewNames.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../../models/tabbar/eventsNames.js";

class SectionView extends View {
    constructor({
        tabModel,
        tmpl
    }) {
        super({
            parentName: viewNames.SECTIONS_BAR(tabModel.parentName),
            name: viewNames.SECTION(tabModel.parentName, tabModel.name),
            tmpl
        });

        
        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: tabModel.parentName,
            tabName: tabModel.name
        }), this._changeHidden.bind(this));

        this._attrs.tabModel = tabModel;
    }

    render() {
        return super.render();
    }

    _changeHidden(isActive) {
        if (isActive) {
            this.show();
        }
        else {
            this.hide();
        }
        return this;
    }
}

export default SectionView;