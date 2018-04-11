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
        state = {},
        way = treeWay.UP,
    } = {}) {
        // если открыт, то родители уже открыты
        if (this._active) {
            return;
        }        
        
        // сначала открываем родителя
        if (way === treeWay.UP) {
            eventBus.call(routerEvents.OPEN(this._parentName), { way: treeWay.UP });
        }
        
        this.show(state); // Метод объекта, к которому применен mixin
        eventBus.call(routerEvents.OPENED(name), { way: treeWay.DOWN });
        
        return this;
    }

    close({
        name = '',
        state = {},
        way = treeWay.UP,
    } = {}) {
        
        if (!this._active) {
            return;
        }
        
        if (way === treeWay.DOWN) {
            eventBus.call(routerEvents.PRE_CLOSING(name), { way: treeWay.DOWN });
        }

        this.hide(state); // Метод объекта, к которому применен mixin
        eventBus.call(routerEvents.CLOSE(this._parentName), { way: treeWay.UP });
        
        return this;
    }

    // базовая реализация
    initRoutable() {
        this.connect({
            name: this._name,
            onOpenCallback: ({ way = treeWay.UP }) => {
                this.open({
                    name: this._name,
                    way,
                });
            },
            onCloseCallback: ({ way = treeWay.UP }) => {
                this.close({
                    name: this._name,
                    way
                });
            }
        });
    }
}

export default RoutableMixin;