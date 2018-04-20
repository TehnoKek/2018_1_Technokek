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


    // 1) сначала открыть родителя
    // 2) затем открыть себя
    // 3) затем сигнал о том, что открылся
    open({ 
        name,
        data = { initiator: null } 
    } = {}) {
        if (!this._active) {
            this.setCallWithName(name);
            eventBus.call(routerEvents.OPEN(this._parentName), {
                initiator: this.getCallWithName()
            });
        }
        // если добрались до корня
        if (!this._active) {
            console.log('PARENT NAME IN UP', this._parentName, this.getCallWithName());
            this.show(this.getCallWithName(), data.initiator);
            eventBus.call(
                routerEvents.OPENED(this.getCallWithName()),
                { initiator: this.getCallWithName() }
            );
        }
        
        return this;
    }

    // 1) Если еще не открыт, то открыть себя
    // 2) Сигнал о том, что открылся
    openDown({
        name,
        data = { initiator: null }
    } = {}) {
        if (!this._active) {
            this.show(this.getCallWithName(), data.initiator);
        }
        eventBus.call(
            routerEvents.OPENED(this.getCallWithName()), 
            { initiator: this.getCallWithName() }
        );
        return this;
    }

    close({ name }) {
        this.setCallWithName(null);        
        if (this._active) {
            eventBus.call(routerEvents.PRE_CLOSING(name));
            this.hide();
            eventBus.call(routerEvents.CLOSE(this._parentName));
        }
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
    
    getCallWithName() {
        return this._myCallingName ? this._myCallingName : this._name;
    }

    setCallWithName(val) {
        this._myCallingName = val;
        return this;
    }
}

export default RoutableMixin;