'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import eventTemplates from "./eventTemplates.js";

class Router {
    constructor() { 
        if (Router.__instance) {
            return Router.__instance;
        }

        this._map = {};
        this._active = '';

        Router.__instance = this;
    }

    start() {
        window.addEventListener('popstate', () => {
            this._open({path: window.location.pathname});
        });
    }

    addRoutable({ path, routableName }) {
        this._map[path] = routableName;
    }

    _open({ path }) {
        if (this._active) {
            eventBus.on(eventTemplates.CLOSED(this._active), this._deepOpen.bind(this));
            eventBus.call(eventTemplates.CLOSE(this._active), { newPath: path });
        }
        else {
            this._deepOpen({newPath: path});
        }

    }

    _deepOpen({ newPath }) {
        if (this._active) {
            eventBus.off(eventTemplates.CLOSED(this._active), this._deepOpen.bind(this));
        }

        eventBus.call(eventTemplates.OPEN(this._map[newPath]));
        this._active = this._map[newPath];
        
        if (window.location.pathname !== newPath) {
            window.history.pushState({}, '', newPath);
        }
    }
}

export default Router;