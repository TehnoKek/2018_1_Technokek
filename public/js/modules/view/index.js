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

        utiles.assignMixin({
            dstObject: this,
            sourceClass: RoutableMixin
        });

        

        this._active = false;
        this.close();
    }

    create(attrs) {
        return this.render(attrs).show();
    }

    render(attrs = {}) {
        const tmplHTML = this._tmpl(attrs);
        this._el = utiles.htmlToElements(tmplHTML)[0];
        this.hide();
        return this;
    }

    hide() {
        this._active = true;
        this._el.setAttribute('hidden', 'hidden');
        return this;
    }

    show() {
        this._active = false;
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

    renderTo(root) {
        root.appendChild(this._el);
        return this;
    }
}

export default View;