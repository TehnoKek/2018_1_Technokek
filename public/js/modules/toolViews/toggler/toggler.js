'use strict';

// можно навешивать как ноды, так и вьюшки
class Toggler {
    constructor({
        name = ''
    } = {}) {
        this._name = name;
        this._nodes = new Set();
        this._views = new Set();
    }

    get name() {
        return this._name;
    }

    get bindedToggle() {
        return this._toggle.bind(this);
    }

    addNodes(nodes) {
        for (let node of nodes) {
            this._nodes.add(node);
        }
    }

    addViews(views) {
        for (let view of views) {
            this._views.add(view);
        }
    }

    _toggle() {
        for (let node of this._nodes) {
            node.hidden = !node.hidden;
        }

        for (let view of this._views) {
            view.toggleShow();
        }
    }
}

export default Toggler;