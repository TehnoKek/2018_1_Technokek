'use strict';

import View from "../../view/index.js";

class ButtonView extends View {
    constructor({
        parentName,
        style,
        wide = false,
        text,
        events = [],
    }) {
        super({
            name: `${parentName}/button:${text}`, 
            parentName, 
            tmpl: window.buttonviewTmplTemplate
        });

        this._events = events;        
        this._attrs = { style, text, wide };
    }

    render() {
        super.render();

        if (this._attrs.wide) {
            this._el.style.width = '100%';
        }

        this.addListeners(...this._events);
        return this;
    }

    addListeners(...events) {
        for (let event of events) {
            this._el.addEventListener(event.name, event.handler);
        }

        return this;
    }
}

export default ButtonView;