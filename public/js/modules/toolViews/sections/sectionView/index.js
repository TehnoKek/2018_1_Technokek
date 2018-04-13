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
            parentName: viewNames.SECTION_PARENT(tabModel),
            name: viewNames.SECTION(tabModel),
            tmpl,
            attrs: { tabModel }
        });

        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._attrs.tabModel.parentName,
            tabName: this._attrs.tabModel.name
        }), this._changeHidden.bind(this));
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

    _callOpenCloseCallback(isActive) {
        if (isActive) {
            this._onOpenCallback();
        }
        else {
            this._onCloseCallback();
        }
        return this;
    }

    render() {
        return super.render();
    }
}

export default SectionView;