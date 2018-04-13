'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import treeWay from "./treeWay.js";
import routerEvents from "./routerEvents.js";
import utiles from "../utiles.js";


class RoutableMixin {

// -----------------------------------------------------------------------------
// CONNECT / DISCONNECT
// -----------------------------------------------------------------------------
    
    // name и callback передаются, т.к. они в различных состояниях могут иметь различные значения
    connect({ name, onOpenCallback, onOpenedCallback, onCloseCallback }) {
        eventBus.on(routerEvents.OPEN(name), onOpenCallback).
            on(routerEvents.OPENED(this._parentName), onOpenedCallback).
            on(routerEvents.CLOSE(name), onCloseCallback).
            on(routerEvents.PRE_CLOSING(name), onCloseCallback);
        return this;
    }

    disconnect({ name, onOpenCallback, onOpenedCallback, onCloseCallback }) {
        eventBus.off(routerEvents.OPEN(name), onOpenCallback).
            off(routerEvents.OPENED(this._parentName), onOpenedCallback).
            off(routerEvents.CLOSE(name), onCloseCallback).
            off(routerEvents.PRE_CLOSING(this._parentName), onCloseCallback);
        return this;
    }
    
// -----------------------------------------------------------------------------
// OPEN / CLOSE
// -----------------------------------------------------------------------------
    
    open({
        comeFrom = null,
        name = this._name,
    } = {}) {
        console.log(`>>> OPEN; come from: ${comeFrom}, me: ${name}`);
        eventBus.call(routerEvents.OPEN(this._parentName), {
            comeFrom: name,
            name: this._parentName,
        });
        console.log(`show me: ${name}`);
        this.show(name);

        
        eventBus.call(routerEvents.OPENED(name));


        return this;
    }

    openDown() {
        if (this._active) {
            return this;
        }


        //if (prevComeFrom !== this.name || prevComeFrom === null) { 
        console.log(`show me: ${this._name}`);
        this.show(this._name);
        console.log(`>>> OPEN DOWN; me: ${this._name}`);
        eventBus.call(routerEvents.OPENED(this._name));
        //}
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
            onOpenCallback: this.open.bind(this), // this._onCallbacks.OPEN[name].bind(this),
            onOpenedCallback: this.openDown.bind(this),
            onCloseCallback: this.close.bind(this) // this._onCallbacks.CLOSE[name].bind(this)
        });
        return this;
    }
}

export default RoutableMixin;