'use strict';

import utiles from "../../components/utiles.js";
import RoutableMixin from "../../components/router/routableMixin.js";


class View {
    constructor({
        name = '',
        parentName = '',
        tmpl = utiles.noop,
    } = {}) {
        this._name = name;
        this._parentName = parentName;
        this._tmpl = tmpl;
        this._attrs = {};
        this._active = true;

        utiles.assignMixin({
            dstObject: this,
            sourceClass: RoutableMixin
        });

        this._initAllowingDependencies();
    }

    create(attrs) {
        return this.render(attrs).show();
    }

    render(attrs) {
        this._attrs = attrs || this._attrs;
        const tmplHTML = this._tmpl(this._attrs);
        this._el = utiles.htmlToElements(tmplHTML)[0];
        return this;
    }

    hide() {
        this._active = false;
        this._el.setAttribute('hidden', 'hidden');
        return this;
    }

    show() {
        this._active = true;
        this._el.removeAttribute('hidden');
        return this;
    }

    get active() {
        return this._active;
    }

    get name() {
        return this._name;
    }

    get parentName() {
        return this._parentName;
    }

    get element() {
        return this._el ? this._el : null;
    }

    renderTo(root) {
        root.appendChild(this._el);
        return this;
    }

    // здесь будут навешиваться события на eventBus
    _initAllowingDependencies() {
        return this;
    }
}

export default View;