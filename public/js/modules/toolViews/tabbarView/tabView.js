'use strict';

import eventBus from "../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../models/tabbar/eventsNames.js";
import View from "../../view/index.js";
import viewNames from "../../viewNames.js";
import routerEvents from "../../../components/router/routerEvents.js";

class TabView extends View {
    constructor({
        tabModel = {},
        tabType = ''
    } = {}) {
        super({
            parentName: viewNames.TAB_PARENT(tabModel), 
            name: viewNames.TAB(tabModel),
            attrs: { tabType, tabModel },
            tmpl: window.tabviewTmplTemplate
        })._connectToEventBus();
    }

    render() {
        super.render();
        this._el.addEventListener('click', this._handleClick.bind(this));
        return this;
    }

    // если есть путь, то открываем его через роутер, иначе просто активируем вкладку
    _handleClick(evt) {
        evt.preventDefault();
        const path = this._attrs.tabModel.routerPath;
        if (path) {
            eventBus.call(routerEvents.ROUTER_OPEN_PATH(path));
        }
        else {
            this._attrs.tabModel.active = true;
        }
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
        return this;
    }

    allowed() {
        return this._attrs.tabModel.avaliable;
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
        if (isAvaliable) {
            this.show();
        }
        else {
            this.hide();
        }
        return this;
    }
}

export default TabView;