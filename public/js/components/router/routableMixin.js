'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import eventTemplates from "./eventTemplates.js";
import openingWay from "./openingWay.js";

class RoutableMixin {

// -----------------------------------------------------------------------------
// ASSIGN
// -----------------------------------------------------------------------------

    assign({
        base = {},
        routableName = '',
        opened = false
    } = {}) {
        Object.assign(base.prototype, this);
        this._routableName = routableName;
        this.routableParentName = ''; // По дефолту корневой
        this._opened = opened;
    }

// -----------------------------------------------------------------------------
// CONNECT / DISCONNECT
// -----------------------------------------------------------------------------

    connectToTheWorld() {
        eventBus.on(eventTemplates.OPEN(this._routableName), this.open.bind(this));
        eventBus.on(eventTemplates.CLOSE(this._routableName), this.close.bind(this));
    }
    
    disconnectFromTheWorld() {
        eventBus.off(eventTemplates.OPEN(this._routableName), this.open.bind(this));
        eventBus.off(eventTemplates.CLOSE(this._routableName), this.close.bind(this));   
    }

    _connectToParent() {
        eventBus.on(eventTemplates.OPENED(this._routableParentName), this.open.bind(this));
        eventBus.on(eventTemplates.CLOSED(this._routableParentName), this.close.bind(this));  
    }

    _disconnectFromParent() {
        eventBus.off(eventTemplates.OPENED(this._routableParentName), this.open.bind(this));
        eventBus.off(eventTemplates.CLOSED(this._routableParentName), this.close.bind(this));    
    }

    // Дочерние элементы должны быть замиксованы    
    connectToChildren({ children = [] } = {}) {
        for (let child of children) {
            child.routableParentName = this._routableName;
        }
    }
    
// -----------------------------------------------------------------------------
// GETTERS / SETTERS
// -----------------------------------------------------------------------------

    get routableName() {
        return this._routableName;
    }

    set routableParentName(name) {
        this.disconnectFromParent();
        this._routableParentName = name;
        this.connectToParent();
    }

    get routableParentName() {
        return this._routableParentName;
    }

    get opened() {
        return this._opened;
    }

// -----------------------------------------------------------------------------
// Собственно, функционал
// -----------------------------------------------------------------------------

    // если открыт, то родители тоже открыты
    open({ way = openingWay.UP } = {}) {
        // сначала открываем родителя
        if (!this._opened && way === openingWay.UP) {
            eventBus.call(eventTemplates.OPEN(this._parentName), {
                way: openingWay.UP
            });
        }
        
        // затем открываем себя
        this._openMe(); // Метод объекта, к которому применен mixin
        this._opened = true;

        // в конце событие для того, чтобы открылись дети
        eventBus.call(eventTemplates.OPENED(this._routableName), {
            way: openingWay.DOWN
        });
    }

    // если закрывается, дети тоже закрываются
    close() {
        this._closeMe(); // Метод объекта, к которому применен mixin
        this._opened = false;

        eventBus.call(eventTemplates.CLOSED(this._routableName));
    }
}

export default RoutableMixin;