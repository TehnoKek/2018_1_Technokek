'use strict';

import View from "../view/index.js";
import viewNames from "../viewNames.js";

class InitialScreen extends View {
    constructor({ parentName }) {
        super({
            name: viewNames.INITIAL_SCREEN,
            parentName,
            tmpl: window.initialscreenTmplTemplate,
        });
    }
}

export default InitialScreen;