'use strict';

import Toggler from "./toggler.js";
import togglingEventTemplates from "./eventTemplates.js";

class TogglerManager {
    constructor() {
        if (Toggler.__instance) {
            return Toggler.__instance;
        }

        this._togglers = {};

        Toggler.__instance = this;
    }

    add({
        name = '',
        views = [],
        nodes = []
    }) {
        if (!this._togglers[name]) {
            this._togglers[name] = new Toggler(togglingEventTemplates.TOGGLE(name));
        }

        this._togglers[name].addNodes(...nodes);
        this._togglers[name].addViews(...views);
    }

    toggle(name) {
        if (!this._togglers[name]) {
            this.add({ name });
        }
        return this._togglers[name].bindedToggle;
    }
}

const togglerManager = new TogglerManager();

export default togglerManager;