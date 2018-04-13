import filterMasks from "./masks.js";

'use strict';

class Filter {
    constructor(baseRedirectPath = '') {
        if (Filter.__instance) {
            Filter.__instance._baseRedirectPath = baseRedirectPath;
            return Filter.__instance;        
        }

        this._masks = {};
        this._baseRedirectPath = baseRedirectPath;

        Filter.__instance = this;
    }

    set({
        path,
        mask = filterMasks.REDIRECT_ALL(),
        redirectPath = this.baseRedirectPath
    }) {
        if (!this._masks[path]) {
            this._masks[path] = {};
        }
        this._masks[path][mask] = redirectPath;
        return this;
    }

    check(path) {
        if (!this._masks[path]) {
            return path;
        }

        for(let checker of Object.keys(this._masks[path])) {
            if (!checker(path)) {
                return this.check(this._masks[path][checker]);
            }
        }

        return path;
    }

    set baseRedirectPath(value) {
        this._baseRedirectPath = value;
    }

    get baseRedirectPath() {
        return this._baseRedirectPath;
    }
}

const redirectFilter = new Filter();

export default redirectFilter;