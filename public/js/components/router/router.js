'use strict';

import eventBus from "../arcitectureElements/eventBus.js";
import routerEvents from "./routerEvents.js";
import redirectFilter from "../redirectFilter/filter.js";
import viewNames from "../../modules/viewNames.js";
import routerPaths from "./routerPaths.js";

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

        this.open(routerPaths.SCOREBOARD);
    }

    register({ path, name }) {
        this._map[path] = name;
        eventBus.on(routerEvents.OPENED(name), () => {
            window.history.pushState({}, '', path);
        });
        return this;
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
        
        console.log('pushState');
        
        window.history.pushState({}, '', path);
        
        console.log('----------------------------------------------------------------');
        console.log(`FINISHED: ${path}, ${this._map[checkedPath]}`);
        console.log('----------------------------------------------------------------');
        
        return this;
    }
}

const router = new Router();

export default router;