'use strict';

import View from "../../../view/index.js";
import viewNames from "../../../viewNames.js";
import eventBus from "../../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../../models/tabbar/eventsNames.js";
import router from "../../../../components/router/router.js";
import routerEvents from "../../../../components/router/routerEvents.js";

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
        if (this._attrs.tabModel.routerPath) {
            router.register({ 
                path: this._attrs.tabModel.routerPath,
                name: this._name
            });
        }
        eventBus.on(
            tabbarEvents.ACTIVE_CHANGED({
                tabbarName: this._attrs.tabModel.parentName,
                tabName: this._attrs.tabModel.name
            }), this._onActiveChanged.bind(this)
        );
        return this._initRoutableByName(this._name);
    }

    _onActiveChanged(isActive) {
        if (isActive && !this._active) {
            if (this._attrs.tabModel.routerPath) {
                eventBus.call(routerEvents.ROUTER_OPEN_PATH(this._attrs.tabModel.routerPath));
            }
            else {
                this.open({name: this._name});
            }
        }
        if (!isActive && this._active) {
            this.close({name: this._name});
        }
        return this;
    }

    show(name) {
        if (super.show().allowed()) {
            this._attrs.tabModel.active = true;
        }
        
        return this;
    }

    allowed() {
        return this._attrs.tabModel.avaliable;
    }

    _changeHidden(isActive) {
        if (this._attrs.tabModel.active) {
            this.show();
        }
        else {
            this.hide();
        }

        return this;
    }

    render() {
        super.render();
        return this;
    }
}

export default SectionView;