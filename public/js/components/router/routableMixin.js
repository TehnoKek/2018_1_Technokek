'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import routerEvents from "./routerEvents.js";


class RoutableMixin {

// -----------------------------------------------------------------------------
// CONNECT / DISCONNECT
// -----------------------------------------------------------------------------
    
    // name и callback передаются, т.к. они в различных состояниях могут иметь различные значения
    connect({ name, onOpenCallback, onOpenedCallback, onCloseCallback }) {

        console.log(`CONNECT: ${name} => ${this._parentName}`);

        eventBus.on(routerEvents.OPEN(name), onOpenCallback).
            on(routerEvents.OPENED(this._parentName), onOpenedCallback).
            on(routerEvents.CLOSE(name), onCloseCallback).
            on(routerEvents.PRE_CLOSING(this._parentName), onCloseCallback);
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

    open({ name }) {
        if (this._active) {
            this._myCallingName = null;
            return this;
        }
        
        this._myCallingName = name;
        eventBus.call(routerEvents.OPEN(this._parentName), {cameFrom: name});

        if (!this._active) {
            const callWithName = this._myCallingName ? this._myCallingName : this._name;
            this.show(callWithName);
            eventBus.call(routerEvents.OPENED(callWithName));
            this._myCallingName = null;
        }
        return this;
    }

    openDown() {
        if (this._active) {
            const callWithName = this._myCallingName ? this._myCallingName : this._name;
            eventBus.call(routerEvents.OPENED(callWithName));
            return this;
        }

        const callWithName = this._myCallingName ? this._myCallingName : this._name;        
        this.show(callWithName);
        eventBus.call(routerEvents.OPENED(callWithName));        
    
        this._myCallingName = null;
        return this;
    }

    close() {
        if (!this._active) {
            this._myCallingName = null;
            return this;
        }

        if (this._active) {
            eventBus.call(routerEvents.PRE_CLOSING(this._name));
            this.hide();
        }
        eventBus.call(routerEvents.CLOSE(this._parentName));
              
        this._myCallingName = null;
        return this;
    }

    // базовая реализация
    initRoutable() {
        return this._initRoutableByName(this._name);
    }

    _initRoutableByName(name) {
        this[`_onOpenCallback:${name}`] = (data = {}) => {
            this.open({name, data});
        };
        this[`_onOpenedCallback:${name}`] = (data = {}) => {
            this.openDown({name, data});
        };
        this[`_onCloseCallback:${name}`] = (data = {}) => {
            this.close({name, data});
        };

        this.connect({
            name,
            onOpenCallback: this[`_onOpenCallback:${name}`].bind(this),
            onOpenedCallback: this[`_onOpenedCallback:${name}`].bind(this),
            onCloseCallback: this[`_onCloseCallback:${name}`].bind(this)
        });
        return this;
    }
}

export default RoutableMixin;