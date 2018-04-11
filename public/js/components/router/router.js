'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import routerEvents from "./routerEvents.js";
import redirectFilter from "../redirectFilter/filter.js";

class Router {
    constructor() { 
        if (Router.__instance) {
            return Router.__instance;
        }

        this._map = {};
        this._active = null;

        Router.__instance = this;
    }

    start() {
        window.addEventListener('popstate', () => {
            if (this._map[window.length.pathname]) {
                this.open(window.location.pathname);
            }
        });

        this.open(window.location.pathname);
    }

    register({ path, name }) {
        this._map[path] = name;
    }

    open(path) {
        if (this._active) {
            eventBus.call(routerEvents.CLOSE(this._active));    
        }

        const checkedPath = redirectFilter.check(path);
        eventBus.call(
            routerEvents.OPEN(this._map[checkedPath]), 
            { path } // на всякий случай
        );
        this._active = this._map[checkedPath];
    }
}

const router = new Router();

export default router;