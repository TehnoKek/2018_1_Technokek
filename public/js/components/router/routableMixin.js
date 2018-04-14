'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import treeWay from "./treeWay.js";
import routerEvents from "./routerEvents.js";
import utiles from "../utiles.js";
import router from "./router.js";


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
        name, 
        data = {
            cameFrom: null,
        } 
    } = {}) {
        if (this._active) {
            return this;
        }
        
        this._myCallingName = name;
        eventBus.call(routerEvents.OPEN(this._parentName), {cameFrom: name});

        if (this._myCallingName) {
            console.log(`show ${this._myCallingName} from: ${data.cameFrom}`);            
            this.show(this._myCallingName);
            eventBus.call(routerEvents.OPENED(this._myCallingName));
        }
        else {
            console.log(`show ${this._name} from: ${data.cameFrom}`);            
            this.show(this._name);
            eventBus.call(routerEvents.OPENED(this._name));
        }
        this._myCallingName = null;

        return this;
    }

    openDown({ 
        name, 
        data = {}
    } = {}) {
        if (this._active) {
            return this;
        }

        if (this._myCallingName) {
            console.log(`show down ${this._myCallingName}`);
            this.show(this._myCallingName);
            eventBus.call(routerEvents.OPENED(this._myCallingName));        
        }
        else {
            console.log(`open down ${this._name}`);
            this.show(this._name);        
            eventBus.call(routerEvents.OPENED(this._name));
        }
        this._myCallingName = null;
        return this;
    }

    close({ 
        name, 
        data 
    } = {}) {
    
        return this;
    }

    // базовая реализация
    initRoutable() {
        console.log(`call base: initRoutable(${this.name})`);
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