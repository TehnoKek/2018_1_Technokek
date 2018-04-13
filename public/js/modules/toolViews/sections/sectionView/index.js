'use strict';

import View from "../../../view/index.js";
import viewNames from "../../../viewNames.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../../models/tabbar/eventsNames.js";
import routerEvents from "../../../../components/router/routerEvents.js";
import treeWay from "../../../../components/router/treeWay.js";
import tabbarsOptions from "../../../../components/globalData/tabbarsOptions.js";
import router from "../../../../components/router/router.js";


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
    }

    initRoutable() {
        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._attrs.tabModel.parentName,
            tabName: this._attrs.tabModel.name
        }), this._callOpenCloseCallback.bind(this));

        eventBus.on(routerEvents.OPEN(this._name), () => {
            this._attrs.tabModel.active = true;    
        });

        this._onOpenCallback = ({ way = treeWay.UP } = {}) => {
            this.open({
                name: this._name,
                way
            });
        };

        this._onCloseCallback = ({ way = treeWay.UP } = {}) => {
            this.close({
                name: this._name,
                way
            });
        };

        return this.connect({
            name: this._name,
            onOpenCallback: this._onOpenCallback.bind(this),
            onCloseCallback: this._onCloseCallback.bind(this)
        });
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