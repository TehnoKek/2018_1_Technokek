'use strict';

import eventBus from "../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../models/tabbar/eventsNames.js";
import View from "../../view/index.js";

class TabView extends View {
    constructor({
        tabModel = {},
        tabType = ''
    } = {}) {
        const parentName = `tabbarView:${tabModel.parentName}`;
        const name = `${parentName}/${tabModel.name}`;
        super({
            parentName, 
            name,
            tmpl: window.tabviewTmplTemplate
        });

        this._attrs = { tabType, tabModel };
        this._connectToEventBus();
    }

    render() {
        super.render();
        this._el.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._attrs.tabModel.active = true;
        });
        return this;
    }

    _connectToEventBus() {
        // Если состояние активности вкладки изменилось, то изменяется ее отображение
        eventBus.on(
            tabbarEvents.ACTIVE_CHANGED({
                tabbarName: this._attrs.tabModel.parentName,
                tabName: this._attrs.tabModel.name
            }), 
            this._changeActive.bind(this)
        ).on(
            tabbarEvents.AVALIABLE_CHANGED({
                tabbarName: this._attrs.tabModel.parentName,
                tabName: this._attrs.tabModel.name
            }), 
            this._changeAvaliable.bind(this)
        );
    }

    _changeActive(isActive) {
        if (!this._el) {
            return;
        }

        if (isActive) {
            this._el.classList.add('active');
        }
        else {
            this._el.classList.remove('active');
        }
    }

    _changeAvaliable(isAvaliable) {
        if (!this._el) {
            return;
        }

        if (isAvaliable) {
            this.show();
        }
        else {
            this.hide();
        }
    }
}

export default TabView;