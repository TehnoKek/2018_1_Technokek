'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import eventTemplates from "./eventTemplates.js";
import openingWay from "./openingWay.js";


class RoutableMixin {

// -----------------------------------------------------------------------------
// CONNECT / DISCONNECT
// -----------------------------------------------------------------------------

    connectToTheWorld() {
        eventBus.on(eventTemplates.OPEN(this._name), this.open.bind(this)).
            on(eventTemplates.CLOSE(this._name), this.close.bind(this));
    }
    
    disconnectFromTheWorld() {
        eventBus.off(eventTemplates.OPEN(this._name), this.open.bind(this)).
            off(eventTemplates.CLOSE(this._name), this.close.bind(this));   
    }

    connectToParent() {
        eventBus.on(eventTemplates.OPENED(this._parentName), this.open.bind(this)).
            on(eventTemplates.CLOSED(this._parentName), this.close.bind(this));  
    }

    disconnectFromParent() {
        eventBus.off(eventTemplates.OPENED(this._parentName), this.open.bind(this)).
            off(eventTemplates.CLOSED(this._parentName), this.close.bind(this));    
    }

    // Дочерние элементы должны быть замиксованы    
    connectToChildren(...children) {
        for (let child of children) {
            child.connectToParent();
        }
    }

    disonnectFromChildren(...children) {
        for (let child of children) {
            child.disconnectFromParent();
        }
    }
    
// -----------------------------------------------------------------------------
// OPEN / CLOSE
// -----------------------------------------------------------------------------
    
    open({ 
        way = openingWay.UP,
        initiator = this._name 
    } = {}) {
        // если открыт, то родители уже открыты
        if (this._active) {
            return;
        }        
        
        // сначала открываем родителя
        if (way === openingWay.UP) {
            eventBus.call(eventTemplates.OPEN(this._parentName), arguments[0]);
        }
        
        // затем открываем себя
        this.show(); // Метод объекта, к которому применен mixin

        // в конце сигнал о том, что уже открылся
        eventBus.call(eventTemplates.OPENED(this._name), {
            way: openingWay.DOWN,
            initiator
        });
    }

    close(eventData) {
        if (!this._active) {
            return;
        }

        this.hide(); // Метод объекта, к которому применен mixin

        eventBus.call(eventTemplates.CLOSED(this._name), eventData);
    }
}

export default RoutableMixin;