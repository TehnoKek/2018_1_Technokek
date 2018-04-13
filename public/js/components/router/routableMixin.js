'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import treeWay from "./treeWay.js";
import routerEvents from "./routerEvents.js";


class RoutableMixin {

// -----------------------------------------------------------------------------
// CONNECT / DISCONNECT
// -----------------------------------------------------------------------------
    
    // name и callback передаются, т.к. они в различных состояниях могут иметь различные значения
    connect({ name, onOpenCallback, onCloseCallback }) {
        eventBus.on(routerEvents.OPEN(name), onOpenCallback).
            on(routerEvents.OPENED(this._parentName), onOpenCallback).
            on(routerEvents.CLOSE(name), onCloseCallback).
            on(routerEvents.PRE_CLOSING(name), onCloseCallback);
        return this;
    }

    disconnect({ name, onOpenCallback, onCloseCallback }) {
        eventBus.off(routerEvents.OPEN(name), onOpenCallback).
            off(routerEvents.OPENED(this._parentName), onOpenCallback).
            off(routerEvents.CLOSE(name), onCloseCallback).
            off(routerEvents.PRE_CLOSING(this._parentName), onCloseCallback);
        return this;
    }
    
// -----------------------------------------------------------------------------
// OPEN / CLOSE
// -----------------------------------------------------------------------------
    
    open({ 
        name = '',
        way = treeWay.UP,
    } = {}) {
        // если открыт, то родители уже открыты
        if (this._active) {
            return;
        }   
        console.log(`>>> OPEN ${name}, way: ${way}`);     
        // сначала открываем родителя
        if (way === treeWay.UP) {
            eventBus.call(routerEvents.OPEN(this._parentName), { way: treeWay.UP });
        }
        console.log(`   ...show ${name}`);
        this.show(name);
        eventBus.call(routerEvents.OPENED(name), { way: treeWay.DOWN });
        console.log(`<<< OPENED ${name}, way: ${way}`);

        return this;
    }

    close({
        name = '',
        way = treeWay.UP,
    } = {}) {
        
        if (!this._active) {
            return;
        }
        console.log(`xxx PRE_CLOSE ${name}, way: ${way}`);
        if (way === treeWay.DOWN) {
            eventBus.call(routerEvents.PRE_CLOSING(name), { way: treeWay.DOWN });
        }
        console.log(`   ...hide ${name}`);
        this.hide(name);
        eventBus.call(routerEvents.CLOSE(this._parentName), { way: treeWay.UP });
        console.log(`xxx CLOSE ${name}, way: ${way}`);

        return this;
    }

    // базовая реализация
    initRoutable() {
        return this._initRoutableByName(this._name);
    }

    _initRoutableByName(name) {
        this.connect({
            name,
            onOpenCallback: ({ way = treeWay.UP }) => {
                this.open({
                    name,
                    way,
                });
            },
            onCloseCallback: ({ way = treeWay.UP }) => {
                this.close({
                    name,
                    way
                });
            }
        });
        return this;
    }
}

export default RoutableMixin;