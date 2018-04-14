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

        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._attrs.tabModel.parentName,
            tabName: this._attrs.tabModel.name
        }), this._changeHidden.bind(this));
    }

    // initRoutable() {
    //     if (this._attrs.tabModel.routerPath) {
    //         router.register({ 
    //             path: this._attrs.tabModel.routerPath,
    //             name: this._name
    //         });
    //     }

    //     this._initRoutableByName(this._name);

    //     eventBus.on(
    //         tabbarEvents.ACTIVE_CHANGED({
    //             tabbarName: this._attrs.tabModel.parentName,
    //             tabName: this._attrs.tabModel.name
    //         }), (isActive) => {
    //             if (isActive) {
    //                 this.open({name: this._name});
    //             }
    //             else {
    //                 this.close({name: this._name});
    //             }
    //             return this;
    //         }
    //     );

    //     return this;
    // }

    _changeHidden(isActive) {
        if (this._attrs.tabModel.active) {
            this.show();
        }
        else {
            this.hide();
        }

        return this;
    }

    // _callOpenCloseCallback(isActive) {
    //     if (isActive) {
    //         this._onOpenCallback();
    //     }
    //     else {
    //         this._onCloseCallback();
    //     }
    //     return this;
    // }

    render() {
        super.render();
        return this;
    }
}

export default SectionView;