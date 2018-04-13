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

        // eventBus.on(tabbarEvents.ACTIVE_CHANGED({
        //     tabbarName: this._attrs.tabModel.parentName,
        //     tabName: this._attrs.tabModel.name
        // }), this._changeHidden.bind(this));

        
    }

    initRoutable() {
        if (this._attrs.tabModel.routerPath) {
            router.register({ 
                path: this._attrs.tabModel.routerPath,
                name: this._name
            });
        }

        this._initRoutableByName(this._name);

        console.log(this._onCallbacks);

        eventBus.on(
            tabbarEvents.ACTIVE_CHANGED({
                tabbarName: this._attrs.tabModel.parentName,
                tabName: this._attrs.tabModel.name
            }), (isActive) => {
                if (isActive) {
                    this.open();
                    //this._onCallbacks.OPEN[this._name]();
                }
                else {
                    this.close();
                    //this._onCallbacks.CLOSE[this._name]();
                }
                return this;
            }
        );

        return this;
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