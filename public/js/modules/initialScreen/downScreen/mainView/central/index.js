'use strict';

import View from "../../../../view/index.js";
import viewNames from "../../../../viewNames.js";
import AuthSignupCol from "./authSugnupCol/index.js";
import SingleplayCol from "./singleplayCol/index.js";
import MultiplayCol from "./multiplayCol/index.js";

class Central extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.CENTRAL,
            parentName,
            tmpl: window.centralTmplTemplate
        });

        this._authSignupCol = new AuthSignupCol({ parentName: this._name });
        this._singleplayCol = new SingleplayCol({ parentName: this._name });
        this._multiplayCol = new MultiplayCol({ parentName: this._name });
    }

    render() {
        super.render();

        const centalContainer = this._el.querySelector('.js-site-center-container');

        this._singleplayCol.render().renderTo(centalContainer);
        this._authSignupCol.render().renderTo(centalContainer);
        this._multiplayCol.render().renderTo(centalContainer);

        return this;
    }
}

export default Central;